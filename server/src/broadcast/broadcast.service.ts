import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Broadcast, BroadcastDocument } from './schemas/broadcast.schema';
import { EmailQueue, EmailQueueDocument } from './schemas/email-queue.schema';
import { User } from '../users/schemas/user.schema';
import { CreateBroadcastDto } from './dto/create-broadcast.dto';
import { MailerService } from '@nestjs-modules/mailer';

const STATE_ADMIN_ROLES = ['ekadmin', 'anadmin', 'ngadmin'];

@Injectable()
export class BroadcastService {
  constructor(
    @InjectModel(Broadcast.name)
    private broadcastModel: Model<BroadcastDocument>,
    @InjectModel(EmailQueue.name)
    private emailQueueModel: Model<EmailQueueDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(
    senderId: string,
    senderRole: string,
    senderState: string | undefined,
    dto: CreateBroadcastDto,
  ): Promise<Broadcast> {
    const sender = await this.userModel
      .findById(senderId)
      .select('fullName')
      .exec();
    if (!sender) throw new NotFoundException('Sender not found');

    const isStateAdmin = STATE_ADMIN_ROLES.includes(senderRole);

    const broadcast = await this.broadcastModel.create({
      title: dto.title,
      htmlBody: dto.htmlBody,
      senderId: new Types.ObjectId(senderId),
      senderName: sender.fullName,
      senderRole,
      senderState: isStateAdmin ? senderState : undefined,
      targetType: dto.targetType,
      targetActorTypes: dto.targetActorTypes ?? [],
      includeAdmins: isStateAdmin ? false : (dto.includeAdmins ?? false),
      sendEmail: dto.sendEmail ?? false,
      emailsQueued: false,
    });

    if (dto.sendEmail) {
      await this.enqueueEmails(broadcast);
    }

    return broadcast;
  }

  async findAll(
    requesterId: string,
    requesterRole: string,
    requesterState: string | undefined,
    page: number,
    limit: number,
  ) {
    const isAdmin = requesterRole === 'admin';
    const isStateAdmin = STATE_ADMIN_ROLES.includes(requesterRole);
    const isUser = requesterRole === 'user';

    let filter: Record<string, any> = {};

    if (isAdmin) {
      filter = {};
    } else if (isStateAdmin) {
      // State admins see: broadcasts from their state + platform-wide admin broadcasts
      filter = {
        $or: [
          { senderState: requesterState },
          { senderState: { $in: [null, undefined] } },
        ],
      };
    } else if (isUser) {
      const user = await this.userModel
        .findById(requesterId)
        .select('actorType registrationState')
        .exec();
      if (!user) throw new NotFoundException('User not found');

      filter = {
        $or: [
          // Admin broadcast to all users
          { senderState: { $exists: false }, targetType: 'all' },
          // Admin broadcast to this user's actor type
          {
            senderState: { $exists: false },
            targetType: 'actor_types',
            targetActorTypes: user.actorType,
          },
          // Admin broadcast that includes admins (irrelevant for regular users — skip)
          // State admin broadcast to all users in their state
          { senderState: user.registrationState, targetType: 'all' },
          // State admin broadcast to user's actor type in their state
          {
            senderState: user.registrationState,
            targetType: 'actor_types',
            targetActorTypes: user.actorType,
          },
        ],
      };
    }

    const total = await this.broadcastModel.countDocuments(filter);
    const docs = await this.broadcastModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const data = docs.map((doc) => {
      const plain = (doc.htmlBody ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const obj = doc.toObject() as Record<string, any>;
      obj.preview = plain.slice(0, 20) + (plain.length > 20 ? '…' : '');
      delete obj.htmlBody;
      return obj;
    });

    return { data, total, page, limit };
  }

  async findOne(
    id: string,
    requesterId: string,
    requesterRole: string,
    requesterState: string | undefined,
  ): Promise<Broadcast> {
    const broadcast = await this.broadcastModel.findById(id).exec();
    if (!broadcast) throw new NotFoundException('Broadcast not found');

    if (!this.canView(broadcast, requesterId, requesterRole, requesterState)) {
      throw new ForbiddenException('Access denied');
    }

    return broadcast;
  }

  private canView(
    broadcast: BroadcastDocument,
    requesterId: string,
    role: string,
    state: string | undefined,
  ): boolean {
    if (role === 'admin') return true;

    if (STATE_ADMIN_ROLES.includes(role)) {
      return !broadcast.senderState || broadcast.senderState === state;
    }

    if (role === 'user') {
      // Will be checked by the list endpoint filter; here we trust that if someone
      // calls findOne they already know about it from the list.
      return true;
    }

    return false;
  }

  private async enqueueEmails(broadcast: BroadcastDocument): Promise<void> {
    const recipients = await this.resolveRecipients(broadcast);
    if (!recipients.length) return;

    const records = recipients.map((r) => ({
      broadcastId: broadcast._id,
      recipientId: r._id,
      recipientEmail: r.email,
      recipientName: r.fullName,
      subject: broadcast.title,
      htmlBody: this.buildEmailHtml(
        broadcast.senderName,
        broadcast.title,
        broadcast.htmlBody,
      ),
      status: 'pending',
      attempts: 0,
    }));

    await this.emailQueueModel.insertMany(records);
    await this.broadcastModel.findByIdAndUpdate(broadcast._id, {
      emailsQueued: true,
    });
  }

  private async resolveRecipients(
    broadcast: BroadcastDocument,
  ): Promise<User[]> {
    const isStateAdmin = !!broadcast.senderState;
    const query: Record<string, any> = { isEmailVerified: true };

    if (isStateAdmin) {
      query.registrationState = broadcast.senderState;
      query.role = 'user';
    } else {
      const roleFilter: string[] = ['user'];
      if (broadcast.includeAdmins) {
        roleFilter.push('admin', ...STATE_ADMIN_ROLES);
      }
      query.role = { $in: roleFilter };
    }

    if (
      broadcast.targetType === 'actor_types' &&
      broadcast.targetActorTypes?.length
    ) {
      query.actorType = { $in: broadcast.targetActorTypes };
    }

    return this.userModel.find(query).select('_id email fullName').exec();
  }

  /** Process pending emails from the queue — called by cron job endpoint */
  async processPendingEmails(
    batchSize = 50,
  ): Promise<{ sent: number; failed: number }> {
    const pending = await this.emailQueueModel
      .find({ status: 'pending', attempts: { $lt: 3 } })
      .limit(batchSize)
      .exec();

    let sent = 0;
    let failed = 0;

    for (const item of pending) {
      try {
        await this.mailerService.sendMail({
          to: item.recipientEmail,
          subject: item.subject,
          html: item.htmlBody,
        });

        await this.emailQueueModel.findByIdAndUpdate(item._id, {
          status: 'sent',
          sentAt: new Date(),
          $inc: { attempts: 1 },
        });
        sent++;
      } catch (err) {
        const attempts = item.attempts + 1;
        await this.emailQueueModel.findByIdAndUpdate(item._id, {
          status: attempts >= 3 ? 'failed' : 'pending',
          lastAttemptAt: new Date(),
          error: err?.message ?? String(err),
          $inc: { attempts: 1 },
        });
        failed++;
      }
    }

    return { sent, failed };
  }

  private buildEmailHtml(
    senderName: string,
    title: string,
    body: string,
  ): string {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f6f8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <div style="background:#1a5e36;padding:28px 36px">
      <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.3px">Seed Tracker NG</div>
      <div style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-top:2px">Platform Broadcast</div>
    </div>
    <div style="padding:32px 36px">
      <h2 style="margin:0 0 20px;color:#111827;font-size:22px;font-weight:800">${title}</h2>
      <div style="color:#374151;font-size:15px;line-height:1.7">${body}</div>
    </div>
    <div style="padding:20px 36px;border-top:1px solid #f3f4f6;background:#fafafa">
      <p style="margin:0;color:#9ca3af;font-size:12px">Sent by <strong style="color:#6b7280">${senderName}</strong> via Seed Tracker NG &mdash; &copy; ${new Date().getFullYear()}</p>
    </div>
  </div>
</body>
</html>`;
  }
}

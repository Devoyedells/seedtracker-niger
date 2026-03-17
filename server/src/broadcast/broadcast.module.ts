import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Broadcast, BroadcastSchema } from './schemas/broadcast.schema';
import { EmailQueue, EmailQueueSchema } from './schemas/email-queue.schema';
import {
  BroadcastRead,
  BroadcastReadSchema,
} from './schemas/broadcast-read.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { BroadcastService } from './broadcast.service';
import { BroadcastController } from './broadcast.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Broadcast.name, schema: BroadcastSchema },
      { name: EmailQueue.name, schema: EmailQueueSchema },
      { name: BroadcastRead.name, schema: BroadcastReadSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MailModule,
    ConfigModule,
  ],
  providers: [BroadcastService],
  controllers: [BroadcastController],
})
export class BroadcastModule {}

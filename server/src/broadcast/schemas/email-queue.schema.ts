import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmailQueueDocument = EmailQueue & Document;

export type EmailStatus = 'pending' | 'sent' | 'failed';

@Schema({ timestamps: true })
export class EmailQueue extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Broadcast', required: true })
  broadcastId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipientId: Types.ObjectId;

  @Prop({ required: true })
  recipientEmail: string;

  @Prop({ required: true })
  recipientName: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  htmlBody: string;

  @Prop({
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  })
  status: EmailStatus;

  @Prop({ default: 0 })
  attempts: number;

  @Prop()
  lastAttemptAt: Date;

  @Prop()
  error: string;
}

export const EmailQueueSchema = SchemaFactory.createForClass(EmailQueue);

EmailQueueSchema.index({ status: 1, attempts: 1 });

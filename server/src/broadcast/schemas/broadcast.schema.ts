import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BroadcastDocument = Broadcast & Document;

@Schema({ timestamps: true })
export class Broadcast extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  htmlBody: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  senderRole: string;

  /** Populated for state admins — scopes the broadcast to one state */
  @Prop({ trim: true })
  senderState: string;

  /**
   * 'all'        — all users (+ optionally admins)
   * 'actor_types' — filtered by actorType
   */
  @Prop({ required: true, enum: ['all', 'actor_types'] })
  targetType: string;

  /** Only relevant when targetType = 'actor_types' */
  @Prop([String])
  targetActorTypes: string[];

  /** Admin-only: whether to also include admins as recipients */
  @Prop({ default: false })
  includeAdmins: boolean;

  @Prop({ default: false })
  sendEmail: boolean;

  /** Set to true once email-queue records have been created */
  @Prop({ default: false })
  emailsQueued: boolean;
}

export const BroadcastSchema = SchemaFactory.createForClass(Broadcast);

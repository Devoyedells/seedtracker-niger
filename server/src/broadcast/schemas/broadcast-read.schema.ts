import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BroadcastReadDocument = BroadcastRead & Document;

@Schema({ timestamps: false })
export class BroadcastRead {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Broadcast', required: true })
  broadcastId: Types.ObjectId;

  @Prop({ type: Date, default: () => new Date() })
  readAt: Date;
}

export const BroadcastReadSchema = SchemaFactory.createForClass(BroadcastRead);

// Compound unique index — one read record per user per broadcast
BroadcastReadSchema.index({ userId: 1, broadcastId: 1 }, { unique: true });

// Fast lookup: "which broadcasts has this user read?"
BroadcastReadSchema.index({ userId: 1 });

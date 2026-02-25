import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  EKADMIN = 'ekadmin',
  ANADMIN = 'anadmin',
  NGADMIN = 'ngadmin',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ trim: true })
  actorType: string;

  @Prop({ trim: true })
  registrationState: string;

  @Prop({ trim: true })
  address: string;

  @Prop()
  lat: string;

  @Prop()
  lng: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

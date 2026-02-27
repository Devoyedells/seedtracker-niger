import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
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

  // ─── Extended Profile Fields ───────────────────────────────────────

  @Prop({ trim: true })
  phone: string;

  @Prop({ trim: true })
  website: string;

  @Prop({ trim: true })
  bio: string;

  @Prop({ trim: true })
  profilePhoto: string;

  @Prop({ trim: true })
  organization: string;

  // ─── Seed Producer ─────────────────────────────────────────────────

  @Prop({ trim: true })
  licenseNumber: string;

  @Prop()
  yearsOfExperience: number;

  @Prop([String])
  seedVarieties: string[];

  @Prop([String])
  certifications: string[];

  // ─── Input Provider ────────────────────────────────────────────────

  @Prop([String])
  productsHandled: string[];

  @Prop([String])
  suppliers: string[];

  @Prop([String])
  areasOfCoverage: string[];

  // ─── Aggregator / Dealer / Processor ───────────────────────────────

  @Prop()
  storageCapacityMT: number;

  @Prop()
  processingCapacityMT: number;

  // ─── Farmer / Cooperative ──────────────────────────────────────────

  @Prop()
  farmSizeHectares: number;

  @Prop()
  farmerGroupSize: number;

  @Prop([String])
  cropsGrown: string[];

  // ─── Email Verification ─────────────────────────────────────────────

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  verificationCode: string;

  @Prop()
  verificationCodeSentAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

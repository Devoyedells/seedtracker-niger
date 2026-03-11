import { Schema } from 'mongoose';

/**
 * Atomic counter collection used to generate sequential actorIds.
 * Each document represents a counter for a state prefix (e.g. "EK", "AN", "NG").
 * Uses MongoDB's findOneAndUpdate with $inc for race-condition-safe increments.
 *
 * We use a raw schema here (not a class) because _id is a string prefix,
 * which conflicts with Mongoose Document's default ObjectId _id type.
 */
export interface CounterDoc {
  _id: string;
  seq: number;
}

export const CounterSchema = new Schema<CounterDoc>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, required: true, default: 0 },
  },
  { _id: false, collection: 'counters' },
);

/** Name constant used for MongooseModule.forFeature registration */
export const COUNTER_MODEL_NAME = 'Counter';

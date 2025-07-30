import { Document } from 'mongoose';

export interface Url extends Document {
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
  user: string;
}

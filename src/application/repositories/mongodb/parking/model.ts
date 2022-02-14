import mongoose from 'mongoose';

import { Parking } from '../../../domain/models';

const parkingSchema = new mongoose.Schema<Parking>({
  id: {
    type: Number,
    unique: true,
    index: true,
    required: true
  },
  plate: {
    type: String,
    unique: true,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: new Date()
  }
});

export const parkingModel = mongoose.model<Parking>('Parking', parkingSchema);

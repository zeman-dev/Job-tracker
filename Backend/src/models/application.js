import { Schema, model } from 'mongoose';
import { SOURCES, STATUSES, WORK_FORMATS } from '../constants/constants.js';

const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: [...STATUSES],
    },
    at: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const applicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: [...STATUSES],
      default: 'applied',
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      enum: [...SOURCES],
      default: 'other',
    },
    jobUrl: {
      type: String,
    },
    workFormat: {
      type: String,
      enum: [...WORK_FORMATS],
    },
    city: {
      type: String,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    salary: {
      from: {
        type: Number,
      },
      to: {
        type: Number,
      },
    },
    contact: {
      name: {
        type: String,
      },
      role: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    statusHistory: [statusHistorySchema],
  },
  {
    timestamps: true,
  },
);

applicationSchema.index({
  userId: 1,
  status: 1,
  order: 1,
});

export const Application = model('Application', applicationSchema);

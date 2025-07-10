import mongoose, { Schema, Model } from "mongoose";
import { IGoal, IMessage, IAnalytics } from "@/types/database";

// Goal Schema
const goalSchema = new Schema<IGoal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "MNT", "KRW", "JPY"],
      default: "USD",
    },
    deadline: {
      type: Date,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
goalSchema.index({ userId: 1, isActive: 1 });
goalSchema.index({ deadline: 1, isActive: 1 });

// Virtuals
goalSchema.virtual("progressPercentage").get(function () {
  return Math.min(
    100,
    Math.round((this.currentAmount / this.targetAmount) * 100)
  );
});

goalSchema.virtual("isExpired").get(function () {
  return this.deadline && this.deadline < new Date();
});

// Pre-save middleware
goalSchema.pre("save", function (next) {
  if (this.currentAmount >= this.targetAmount && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  }
  next();
});

// Message Schema
const messageSchema = new Schema<IMessage>(
  {
    fromName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    fromEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: {
      type: Date,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
messageSchema.index({ toUserId: 1, isRead: 1, createdAt: -1 });
messageSchema.index({ fromEmail: 1, createdAt: -1 });

// Analytics Schema
const analyticsSchema = new Schema<IAnalytics>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },

    // Daily metrics
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    donations: {
      type: Number,
      default: 0,
      min: 0,
    },
    donationAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    newSupporters: {
      type: Number,
      default: 0,
      min: 0,
    },
    messages: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Traffic sources
    sources: {
      direct: {
        type: Number,
        default: 0,
        min: 0,
      },
      social: {
        type: Number,
        default: 0,
        min: 0,
      },
      search: {
        type: Number,
        default: 0,
        min: 0,
      },
      referral: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index for user + date
analyticsSchema.index({ userId: 1, date: 1 }, { unique: true });

// Static methods
goalSchema.statics.getActiveGoals = function (userId: string) {
  return this.find({
    userId,
    isActive: true,
    $or: [{ deadline: { $exists: false } }, { deadline: { $gte: new Date() } }],
  }).sort({ createdAt: -1 });
};

messageSchema.statics.getUnreadCount = function (userId: string) {
  return this.countDocuments({ toUserId: userId, isRead: false });
};

analyticsSchema.statics.getDateRange = function (
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return this.find({
    userId,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1 });
};

// Instance methods
messageSchema.methods.markAsRead = async function () {
  this.isRead = true;
  this.readAt = new Date();
  await this.save();
};

// Create and export models
export const Goal: Model<IGoal> =
  mongoose.models.Goal || mongoose.model<IGoal>("Goal", goalSchema);
export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);
export const Analytics: Model<IAnalytics> =
  mongoose.models.Analytics ||
  mongoose.model<IAnalytics>("Analytics", analyticsSchema);

const models = { Goal, Message, Analytics };
export default models;

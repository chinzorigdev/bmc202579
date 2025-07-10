import mongoose, { Schema, Model } from "mongoose";
import { IDonation } from "@/types/database";

const donationSchema = new Schema<IDonation>(
  {
    // Amount and currency
    amount: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "MNT", "KRW", "JPY"],
      default: "USD",
    },

    // Supporter information
    supporterName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    supporterEmail: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
    supporterMessage: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    // Creator information
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    creatorUsername: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    // Payment information
    paymentId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    paymentProvider: {
      type: String,
      enum: ["stripe", "paypal", "bank", "crypto"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    // Metadata
    isPublic: {
      type: Boolean,
      default: true,
    },
    hasMessage: {
      type: Boolean,
      default: false,
    },
    isRefunded: {
      type: Boolean,
      default: false,
    },
    refundedAt: {
      type: Date,
      default: null,
    },

    // Special features
    coffeeCount: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
donationSchema.index({ creatorId: 1, createdAt: -1 });
donationSchema.index({ paymentStatus: 1, createdAt: -1 });
donationSchema.index({ supporterEmail: 1, createdAt: -1 });
donationSchema.index({ amount: -1 });
donationSchema.index({ createdAt: -1 });

// Compound indexes for analytics
donationSchema.index({ creatorId: 1, paymentStatus: 1, createdAt: -1 });
donationSchema.index({ creatorUsername: 1, isPublic: 1, createdAt: -1 });

// Virtual for display name
donationSchema.virtual("displayName").get(function () {
  if (this.isAnonymous) {
    return "Anonymous";
  }
  return this.supporterName || "Anonymous";
});

// Virtual for formatted amount
donationSchema.virtual("formattedAmount").get(function () {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  });
  return formatter.format(this.amount);
});

// Pre-save middleware
donationSchema.pre("save", function (next) {
  // Set hasMessage flag
  this.hasMessage = Boolean(this.supporterMessage);

  // Calculate coffee count (assuming $3 per coffee)
  if (!this.coffeeCount) {
    this.coffeeCount = Math.max(1, Math.floor(this.amount / 3));
  }

  next();
});

// Post-save middleware to update user stats
donationSchema.post("save", async function (doc) {
  if (doc.paymentStatus === "completed") {
    const User = mongoose.models.User;
    const user = await User.findById(doc.creatorId);
    if (user) {
      await user.updateStats();
    }
  }
});

// Static methods
donationSchema.statics.getTopDonations = function (
  creatorId: string,
  limit = 10
) {
  return this.find({
    creatorId,
    paymentStatus: "completed",
    isPublic: true,
  })
    .sort({ amount: -1 })
    .limit(limit)
    .select(
      "amount supporterName supporterMessage isAnonymous createdAt coffeeCount"
    );
};

donationSchema.statics.getRecentDonations = function (
  creatorId: string,
  limit = 10
) {
  return this.find({
    creatorId,
    paymentStatus: "completed",
    isPublic: true,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select(
      "amount supporterName supporterMessage isAnonymous createdAt coffeeCount"
    );
};

donationSchema.statics.getDonationStats = function (
  creatorId: string,
  startDate?: Date,
  endDate?: Date
) {
  const matchQuery: {
    creatorId: mongoose.Types.ObjectId;
    paymentStatus: string;
    createdAt?: { $gte?: Date; $lte?: Date };
  } = {
    creatorId: new mongoose.Types.ObjectId(creatorId),
    paymentStatus: "completed",
  };

  if (startDate || endDate) {
    matchQuery.createdAt = {};
    if (startDate) matchQuery.createdAt.$gte = startDate;
    if (endDate) matchQuery.createdAt.$lte = endDate;
  }

  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalDonations: { $sum: 1 },
        averageAmount: { $avg: "$amount" },
        uniqueSupporters: { $addToSet: "$supporterEmail" },
        totalCoffees: { $sum: "$coffeeCount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
        totalDonations: 1,
        averageAmount: { $round: ["$averageAmount", 2] },
        uniqueSupporters: { $size: "$uniqueSupporters" },
        totalCoffees: 1,
      },
    },
  ]);
};

// Instance methods
donationSchema.methods.refund = async function () {
  this.isRefunded = true;
  this.refundedAt = new Date();
  this.paymentStatus = "refunded";
  await this.save();

  // Update user stats
  const User = mongoose.models.User;
  const user = await User.findById(this.creatorId);
  if (user) {
    await user.updateStats();
  }
};

// Create and export model
const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", donationSchema);

export default Donation;

import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "@/types/database";

const socialLinksSchema = new Schema(
  {
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youtube: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    // Authentication
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      trim: true,
    },

    // Profile information
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/,
      index: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    website: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // Social links
    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },

    // Settings
    isPublic: {
      type: Boolean,
      default: true,
    },
    allowMessages: {
      type: Boolean,
      default: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "MNT", "KRW", "JPY"],
      default: "USD",
    },

    // Analytics
    totalDonations: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSupporters: {
      type: Number,
      default: 0,
      min: 0,
    },
    monthlyGoal: {
      type: Number,
      min: 0,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ totalDonations: -1 });

// Virtual for profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/profile/${this.username}`;
});

// Virtual for avatar URL (if using Gravatar or similar)
userSchema.virtual("avatarUrl").get(function () {
  return (
    this.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      this.name || this.username
    )}&background=f59e0b&color=fff`
  );
});

// Pre-save middleware
userSchema.pre("save", async function (next) {
  // Ensure username is unique and valid
  if (this.isModified("username")) {
    const existingUser = await mongoose.models.User.findOne({
      username: this.username,
      _id: { $ne: this._id },
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }
  }

  next();
});

// Static methods
userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username: username.toLowerCase() });
};

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Instance methods
userSchema.methods.generateUsername = async function (baseName: string) {
  let username = baseName.toLowerCase().replace(/[^a-z0-9_]/g, "");
  let counter = 1;

  while (await mongoose.models.User.findOne({ username })) {
    username = `${baseName}${counter}`;
    counter++;
  }

  return username;
};

userSchema.methods.updateStats = async function () {
  const Donation = mongoose.models.Donation;

  const stats = await Donation.aggregate([
    { $match: { creatorId: this._id, paymentStatus: "completed" } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalCount: { $sum: 1 },
        uniqueSupporters: { $addToSet: "$supporterEmail" },
      },
    },
  ]);

  if (stats.length > 0) {
    this.totalDonations = stats[0].totalAmount;
    this.totalSupporters = stats[0].uniqueSupporters.length;
    await this.save();
  }
};

// Create and export model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

import { Document, Types } from "mongoose";

// Base interface for all documents
export interface BaseDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// User interface
export interface IUser extends BaseDocument {
  // Authentication
  email: string;
  emailVerified?: Date;
  name?: string;
  image?: string;

  // Profile information
  username: string;
  bio?: string;
  website?: string;
  location?: string;

  // Social links
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
    linkedin?: string;
  };

  // Settings
  isPublic: boolean;
  allowMessages: boolean;
  currency: "USD" | "EUR" | "MNT" | "KRW" | "JPY";

  // Analytics
  totalDonations: number;
  totalSupporters: number;
  monthlyGoal?: number;

  // Status
  isActive: boolean;
  isVerified: boolean;
}

// Account interface (for OAuth providers)
export interface IAccount extends BaseDocument {
  userId: Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

// Session interface
export interface ISession extends BaseDocument {
  sessionToken: string;
  userId: Types.ObjectId;
  expires: Date;
}

// Donation interface
export interface IDonation extends BaseDocument {
  // Amount and currency
  amount: number;
  currency: string;

  // Supporter information
  supporterName?: string;
  supporterEmail?: string;
  supporterMessage?: string;
  isAnonymous: boolean;

  // Creator information
  creatorId: Types.ObjectId;
  creatorUsername: string;

  // Payment information
  paymentId?: string;
  paymentProvider: "stripe" | "paypal" | "bank" | "crypto";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";

  // Metadata
  isPublic: boolean;
  hasMessage: boolean;
  isRefunded: boolean;
  refundedAt?: Date;

  // Special features
  coffeeCount: number; // How many "coffees" (usually amount / 3)
}

// Goal interface
export interface IGoal extends BaseDocument {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline?: Date;
  isActive: boolean;
  isCompleted: boolean;
  completedAt?: Date;
}

// Message interface
export interface IMessage extends BaseDocument {
  fromName?: string;
  fromEmail?: string;
  toUserId: Types.ObjectId;
  subject: string;
  content: string;
  isRead: boolean;
  readAt?: Date;
  isAnonymous: boolean;
}

// Gallery/Media interface
export interface IMedia extends BaseDocument {
  userId: Types.ObjectId;
  type: "image" | "video" | "audio" | "document";
  title?: string;
  description?: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  isPublic: boolean;
}

// Analytics interface
export interface IAnalytics extends BaseDocument {
  userId: Types.ObjectId;
  date: Date;

  // Daily metrics
  views: number;
  donations: number;
  donationAmount: number;
  newSupporters: number;
  messages: number;

  // Traffic sources
  sources: {
    direct: number;
    social: number;
    search: number;
    referral: number;
  };
}

// Verification Token interface
export interface IVerificationToken extends BaseDocument {
  identifier: string;
  token: string;
  expires: Date;
}

// Webhook interface for payment processing
export interface IWebhook extends BaseDocument {
  provider: string;
  eventType: string;
  eventId: string;
  data: Record<string, unknown>;
  processed: boolean;
  processedAt?: Date;
  error?: string;
}

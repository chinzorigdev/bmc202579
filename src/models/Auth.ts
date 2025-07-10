import mongoose, { Schema, Model } from "mongoose";
import { IAccount, ISession, IVerificationToken } from "@/types/database";

// Account Schema (for OAuth providers)
const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
      index: true,
    },
    providerAccountId: {
      type: String,
      required: true,
      index: true,
    },
    refresh_token: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
    id_token: {
      type: String,
    },
    session_state: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Session Schema
const sessionSchema = new Schema<ISession>(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Verification Token Schema (for email verification)
const verificationTokenSchema = new Schema<IVerificationToken>(
  {
    identifier: {
      type: String,
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index
verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

// Auto-remove expired tokens
verificationTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

// Create and export models
export const Account: Model<IAccount> =
  mongoose.models.Account || mongoose.model<IAccount>("Account", accountSchema);
export const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);
export const VerificationToken: Model<IVerificationToken> =
  mongoose.models.VerificationToken ||
  mongoose.model<IVerificationToken>(
    "VerificationToken",
    verificationTokenSchema
  );

const authModels = { Account, Session, VerificationToken };
export default authModels;

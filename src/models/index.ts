// Export all models from a central location
export { default as User } from "./User";
export { default as Donation } from "./Donation";
export { Account, Session, VerificationToken } from "./Auth";
export { Goal, Message, Analytics } from "./Additional";

// Re-export types
export type {
  IUser,
  IDonation,
  IAccount,
  ISession,
  IVerificationToken,
  IGoal,
  IMessage,
  IAnalytics,
} from "@/types/database";

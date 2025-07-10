# MongoDB Schema Design for Buy Me a Coffee Clone

## 🚀 Quick Start with MongoDB + Mongoose

### 1. Environment Setup

```bash
# .env.local
MONGODB_URI="mongodb://localhost:27017/buymeacoffee"
# Or MongoDB Atlas
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/buymeacoffee"
```

### 2. Database Connection

The MongoDB connection is handled automatically through `src/lib/mongodb.ts` with connection pooling and hot reload support.

## 📊 Schema Design Overview

### Core Models

#### 1. **User Model** (`src/models/User.ts`)

```typescript
interface IUser {
  // Auth
  email: string;
  emailVerified?: Date;
  name?: string;
  image?: string;

  // Profile
  username: string; // Unique, URL-friendly
  bio?: string;
  website?: string;
  location?: string;
  socialLinks?: object;

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
```

**Key Features:**

- ✅ Unique username validation
- ✅ Auto-generated usernames
- ✅ Social links management
- ✅ Real-time stats updates
- ✅ Currency support

#### 2. **Donation Model** (`src/models/Donation.ts`)

```typescript
interface IDonation {
  // Amount
  amount: number;
  currency: string;
  coffeeCount: number; // Auto-calculated

  // Supporter
  supporterName?: string;
  supporterEmail?: string;
  supporterMessage?: string;
  isAnonymous: boolean;

  // Creator
  creatorId: ObjectId;
  creatorUsername: string;

  // Payment
  paymentId?: string;
  paymentProvider: "stripe" | "paypal" | "bank" | "crypto";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";

  // Features
  isPublic: boolean;
  hasMessage: boolean;
}
```

**Key Features:**

- ✅ Multi-currency support
- ✅ Anonymous donations
- ✅ Payment provider integration
- ✅ Auto coffee count calculation
- ✅ Refund handling

#### 3. **Authentication Models** (`src/models/Auth.ts`)

- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification

### Advanced Models

#### 4. **Goal Model** (`src/models/Additional.ts`)

```typescript
interface IGoal {
  userId: ObjectId;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  isActive: boolean;
  isCompleted: boolean;
}
```

#### 5. **Message Model**

```typescript
interface IMessage {
  fromName?: string;
  fromEmail?: string;
  toUserId: ObjectId;
  subject: string;
  content: string;
  isRead: boolean;
  isAnonymous: boolean;
}
```

#### 6. **Analytics Model**

```typescript
interface IAnalytics {
  userId: ObjectId;
  date: Date;
  views: number;
  donations: number;
  donationAmount: number;
  newSupporters: number;
  sources: {
    direct: number;
    social: number;
    search: number;
    referral: number;
  };
}
```

## 🔧 Database Operations

### User Operations

```typescript
import { User } from "@/models";

// Create user with auto-generated username
const user = new User({
  email: "user@example.com",
  name: "John Doe",
});
await user.save(); // Username auto-generated

// Find by username
const user = await User.findByUsername("johndoe");

// Update stats (called automatically after donations)
await user.updateStats();
```

### Donation Operations

```typescript
import { Donation } from "@/models";

// Create donation
const donation = new Donation({
  amount: 15,
  currency: "USD",
  supporterName: "Jane Supporter",
  supporterEmail: "jane@example.com",
  supporterMessage: "Great work!",
  creatorId: userId,
  creatorUsername: "creator123",
  paymentProvider: "stripe",
});
await donation.save(); // Auto-calculates coffeeCount

// Get top donations
const topDonations = await Donation.getTopDonations(creatorId, 10);

// Get donation statistics
const stats = await Donation.getDonationStats(creatorId);
```

## 📈 Advanced Features

### 1. **Real-time Analytics**

```typescript
// Daily analytics tracking
const analytics = new Analytics({
  userId,
  date: new Date(),
  views: 150,
  donations: 5,
  donationAmount: 75,
  newSupporters: 3,
});
```

### 2. **Goal Tracking**

```typescript
// Create fundraising goal
const goal = new Goal({
  userId,
  title: "New Equipment Fund",
  targetAmount: 1000,
  deadline: new Date("2024-12-31"),
});

// Progress automatically calculated
console.log(goal.progressPercentage); // 0-100%
```

### 3. **Message System**

```typescript
// Send message to creator
const message = new Message({
  fromName: "Fan",
  fromEmail: "fan@example.com",
  toUserId: creatorId,
  subject: "Love your work!",
  content: "Keep it up!",
});

// Mark as read
await message.markAsRead();
```

## 🔍 Database Indexes

### Optimized for Performance

```typescript
// User indexes
{ email: 1 }           // Login lookup
{ username: 1 }        // Profile lookup
{ totalDonations: -1 } // Top creators

// Donation indexes
{ creatorId: 1, createdAt: -1 }              // Creator's donations
{ creatorId: 1, paymentStatus: 1, createdAt: -1 } // Paid donations
{ supporterEmail: 1, createdAt: -1 }         // Supporter history

// Analytics indexes
{ userId: 1, date: 1 }  // User analytics (unique)
```

## 🛠 Development Commands

```bash
# Start MongoDB locally
mongod

# Connect to MongoDB
mongosh buymeacoffee

# View collections
show collections

# Query examples
db.users.find({ username: "johndoe" })
db.donations.find({ creatorId: ObjectId("...") }).sort({ createdAt: -1 })
```

## 🚀 Production Considerations

### 1. **MongoDB Atlas Setup**

```bash
# Connection string
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/buymeacoffee?retryWrites=true&w=majority"
```

### 2. **Indexes for Production**

```javascript
// Create indexes in production
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.donations.createIndex({ creatorId: 1, createdAt: -1 });
db.donations.createIndex({ paymentStatus: 1 });
```

### 3. **Data Validation**

- ✅ Email format validation
- ✅ Username format (alphanumeric + underscore)
- ✅ Amount minimum values
- ✅ Required field validation

### 4. **Security Features**

- ✅ Password-less authentication
- ✅ Email verification
- ✅ Anonymous donation support
- ✅ Data sanitization

## 📊 Example Queries

### User Statistics

```typescript
// Top creators by donations
const topCreators = await User.find({ isPublic: true })
  .sort({ totalDonations: -1 })
  .limit(10)
  .select("username name totalDonations totalSupporters");

// Recent supporters
const recentDonations = await Donation.find({
  creatorId,
  paymentStatus: "completed",
  isPublic: true,
})
  .sort({ createdAt: -1 })
  .limit(20);
```

### Analytics Queries

```typescript
// Monthly revenue
const monthlyStats = await Donation.aggregate([
  { $match: { creatorId, paymentStatus: "completed" } },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      revenue: { $sum: "$amount" },
      donations: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
]);
```

This MongoDB schema provides a complete, scalable foundation for your Buy Me a Coffee clone with TypeScript type safety and modern development practices! 🎉

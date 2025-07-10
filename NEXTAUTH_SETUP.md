# NextAuth.js Setup Guide for Buy Me a Coffee Clone

## 🚀 Quick Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### 2. Database Setup

Set up your PostgreSQL database and update the `DATABASE_URL` in `.env.local`:

```bash
# For local development with PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/buymeacoffee_db"

# Or use a cloud provider like Supabase, PlanetScale, or Neon
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to `.env.local`

### 4. Email Provider Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password":
   - Google Account → Security → 2-Step Verification → App passwords
3. Use this app password in `EMAIL_SERVER_PASSWORD`

### 5. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Add this to `NEXTAUTH_SECRET` in `.env.local`

### 6. Database Migration

```bash
npx prisma db push
```

## 📋 Features Implemented

### Authentication Providers

- ✅ **Google OAuth** - One-click signup/login
- ✅ **Email Magic Links** - Passwordless authentication
- ✅ **Automatic username generation** - Based on email or Google profile

### User Flow

1. **Signup Process**:

   - Step 1: Enter name and email OR use Google
   - Step 2: Choose username (buymeacoffee.com/username)
   - Email verification (if using email provider)
   - Redirect to profile setup

2. **Login Process**:
   - Email magic link OR Google OAuth
   - Automatic redirect to dashboard

### Database Schema

- ✅ **Users** with profiles and usernames
- ✅ **Sessions** and **Accounts** (NextAuth.js tables)
- ✅ **Donations** and **Support** tracking
- ✅ **Username uniqueness** and validation

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Database commands
npx prisma generate    # Generate Prisma client
npx prisma db push     # Push schema to database
npx prisma studio      # Open database viewer

# Build for production
npm run build
npm run start
```

## 🔧 Configuration Files

- `src/lib/auth.ts` - NextAuth.js configuration
- `src/lib/prisma.ts` - Database client
- `prisma/schema.prisma` - Database schema
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API routes

## 🎯 Next Steps

1. Set up your database (PostgreSQL recommended)
2. Configure Google OAuth credentials
3. Set up email provider (Gmail or SMTP)
4. Test authentication flow
5. Customize the username generation logic
6. Add profile setup page after registration

## 🐛 Troubleshooting

- **"Invalid client" error**: Check Google OAuth credentials and redirect URIs
- **Email not sending**: Verify email provider settings and app password
- **Database connection error**: Check DATABASE_URL format and database accessibility
- **Username conflicts**: The system auto-generates unique usernames, but you can customize this logic

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use strong, random secrets for production
- Set up proper CORS and redirect URI restrictions
- Consider rate limiting for auth endpoints

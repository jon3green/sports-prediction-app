# 🔐 Environment Variables Setup Guide

## Required for Production

Add these to your Vercel project settings:

### 1. Database (Required)
```bash
DATABASE_URL="your-postgres-url-here"
```
**Where to get**: Use Vercel Postgres or any PostgreSQL provider
**Current**: SQLite (dev only - won't work in production)

### 2. NextAuth (Required)
```bash
NEXTAUTH_SECRET="generate-random-32-char-string"
NEXTAUTH_URL="https://line-pointer.vercel.app"
```
**Generate secret**: Run `openssl rand -base64 32`

### 3. API Keys (Already Set ✅)
```bash
NEXT_PUBLIC_ODDS_API_KEY=9843d3412159ce8b1e28413f97f0f438
NEXT_PUBLIC_OPENWEATHER_API_KEY=7bd6ec2cf5a769925a93213c4edb4dbe
```

### 4. Vercel KV (Already Connected ✅)
```bash
KV_REST_API_URL=<vercel-auto-sets>
KV_REST_API_TOKEN=<vercel-auto-sets>
```

### 5. Sentry (Optional - for error tracking)
```bash
NEXT_PUBLIC_SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"
SENTRY_AUTH_TOKEN="your-auth-token"
```
**Where to get**: 
1. Sign up at https://sentry.io (free tier)
2. Create new project → Next.js
3. Copy DSN
4. Generate auth token in Settings → Auth Tokens

---

## Quick Setup Steps

### Option 1: Via Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable above
5. Redeploy

### Option 2: Via Vercel CLI
```bash
vercel env add NEXTAUTH_SECRET production
vercel env add NEXT_PUBLIC_SENTRY_DSN production
# ... etc
```

---

## What Happens Without Each?

| Variable | Without It | Impact |
|----------|-----------|---------|
| `DATABASE_URL` | ❌ App crashes | CRITICAL |
| `NEXTAUTH_SECRET` | ❌ Auth fails | CRITICAL |
| `NEXTAUTH_URL` | ⚠️ Auth redirects broken | HIGH |
| `NEXT_PUBLIC_SENTRY_DSN` | ⚠️ No error tracking | MEDIUM |
| `SENTRY_AUTH_TOKEN` | ℹ️ No source maps | LOW |

---

## Current Status

✅ **Already Configured:**
- Odds API key
- Weather API key  
- Vercel KV (Redis)

⚠️ **Need to Add:**
- Database URL (for production)
- NextAuth secret (for production)
- Sentry DSN (optional but recommended)

---

## Priority Order

1. **DATABASE_URL** - Switch from SQLite to Postgres
2. **NEXTAUTH_SECRET** - Secure auth
3. **NEXT_PUBLIC_SENTRY_DSN** - Error tracking (optional)

---

## Recommended: Vercel Postgres

```bash
# In Vercel Dashboard:
# 1. Go to Storage tab
# 2. Create Database → Postgres
# 3. Connect to project
# 4. DATABASE_URL auto-added ✅
```

Free tier: Perfect for your needs!

---

That's it! Once these are set, your platform is truly production-ready.


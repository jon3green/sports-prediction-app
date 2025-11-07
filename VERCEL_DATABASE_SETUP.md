# 🔧 URGENT: Fix Account Creation on Vercel

## The Problem

Account creation fails on Vercel because SQLite doesn't work in production.

## The Solution (5 Minutes)

### Step 1: Create Vercel Postgres Database

1. Go to https://vercel.com/dashboard
2. Click on your project: **line-pointer**
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Name it: `linepointer-db`
7. Click **Create**

### Step 2: Connect Database to Project

1. After database is created, click **Connect to Project**
2. Select your project: **line-pointer**
3. Check **All environments** (Production, Preview, Development)
4. Click **Connect**

✅ **DATABASE_URL is now automatically added to your environment variables!**

### Step 3: Push Database Schema

In your terminal:

```bash
# This will create all tables in production database
npx prisma db push
```

### Step 4: Redeploy (Automatic)

Vercel will automatically redeploy with the new database connection.

Wait 2 minutes, then test: https://line-pointer.vercel.app/auth/signup

---

## Alternative: Quick Fix (If you want to test NOW)

Use Vercel's free Postgres:
- **Free tier**: 256 MB storage
- **0.5 compute hours/month**
- **Perfect for your needs**

---

That's it! Account creation will work immediately after these steps.


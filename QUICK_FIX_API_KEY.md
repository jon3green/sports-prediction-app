# 🔧 Quick Fix: Add Odds API Key to Vercel

## Issue Detected

The Odds API key is not being recognized in production. This is a quick 2-minute fix!

## Fix Steps (2 Minutes)

### Option 1: Vercel Dashboard (Easiest)

1. **Go to:** https://vercel.com/jongreen716-7177s-projects/line-pointer/settings/environment-variables

2. **Add Environment Variable:**
   - **Key:** `NEXT_PUBLIC_ODDS_API_KEY`
   - **Value:** `9843d3412159ce8b1e28413f97f0f438`
   - **Environments:** ✅ Production ✅ Preview ✅ Development

3. **Click "Save"**

4. **Redeploy:**
   - Go to: https://vercel.com/jongreen716-7177s-projects/line-pointer
   - Click "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"
   - Select "Use existing Build Cache"
   - Click "Redeploy"

### Option 2: Command Line

```bash
# Navigate to project
cd /Users/jongreen/.cursor/projects/Users-jongreen-sports-prediction-app

# Add the API key
echo "NEXT_PUBLIC_ODDS_API_KEY=9843d3412159ce8b1e28413f97f0f438" >> .env

# Commit and push (Vercel will auto-deploy)
git add .env
git commit -m "fix: re-add Odds API key"
git push origin main
```

## ✅ Verification

After redeployment (takes ~2 minutes), test:

```bash
# Should return game odds, not an error
curl "https://line-pointer.vercel.app/api/games/odds?sport=nfl" | head -c 200
```

Expected: JSON with game data  
Not: `"API key is not valid"`

## 🎯 Why This Happened

When you set up Vercel KV, it triggered a redeploy. Sometimes environment variables need to be re-added after integrations are connected.

## ✅ After Fix

Once the API key is added:
- ✅ Game odds will work
- ✅ Player props will work
- ✅ Caching will work perfectly
- ✅ Site will be fully functional

---

**Quick Fix:** Just add the environment variable in the Vercel dashboard and redeploy! 🚀


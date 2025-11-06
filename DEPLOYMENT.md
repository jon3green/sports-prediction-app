# Deployment Guide

## Deploy to Vercel

Your app is ready to deploy! Follow these steps:

### Method 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project root:
```bash
cd /Users/jongreen/.cursor/projects/Users-jongreen-sports-prediction-app
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Method 2: Deploy via GitHub Integration

1. Create a new GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit: Sports prediction app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure build settings (auto-detected):
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Add Environment Variables (optional for now):
   - `NEXT_PUBLIC_ODDS_API_KEY`
   - `NEXT_PUBLIC_SPORTSDATA_API_KEY`

7. Click "Deploy"

### Method 3: Manual Deploy from Local

If you already have the Vercel project linked:

```bash
npm run build
vercel --prod
```

## Post-Deployment Steps

### 1. Test the Deployment

Once deployed, test these features:
- [ ] Home page loads correctly
- [ ] Games list displays (with mock data)
- [ ] Parlay builder works
- [ ] Stats overview shows
- [ ] Mobile responsiveness
- [ ] All navigation links work

### 2. Update Domain (Optional)

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain or use the provided vercel.app domain

### 3. Enable Analytics (Optional)

Vercel provides free analytics:
1. Go to project settings
2. Enable "Analytics" tab
3. View real-time visitor data

### 4. Set Up Monitoring

Consider adding:
- Vercel Speed Insights
- Error tracking (Sentry)
- User analytics (Google Analytics, Plausible)

## Production Checklist

Before going live with real users:

- [ ] Add real API keys for The Odds API
- [ ] Set up API rate limiting
- [ ] Add error boundaries
- [ ] Implement proper caching strategy
- [ ] Add SEO meta tags
- [ ] Create sitemap.xml
- [ ] Set up robots.txt
- [ ] Add privacy policy page
- [ ] Add terms of service
- [ ] Test across browsers
- [ ] Test on mobile devices
- [ ] Set up Continuous Deployment from GitHub
- [ ] Configure custom domain
- [ ] Set up SSL certificate (automatic with Vercel)

## API Integration for Production

### The Odds API

1. Sign up at https://the-odds-api.com/
2. Get API key (free tier: 500 requests/month)
3. Add to Vercel Environment Variables
4. Update `lib/api/sports-data.ts` to use real API

### ESPN API

Already public - no key needed. Just implement the fetch calls.

### SportsData.io

1. Sign up at https://sportsdata.io/
2. Get free tier API key
3. Add to environment variables
4. Implement in sports-data.ts

## Troubleshooting

### Build Fails

If build fails, check:
```bash
npm run build
```

Common issues:
- Missing dependencies: `npm install`
- TypeScript errors: Check `npm run lint`
- Environment variables not set

### Deployment Issues

1. Check Vercel build logs
2. Verify all dependencies are in package.json
3. Ensure Next.js version compatibility
4. Check for import errors

### Runtime Errors

1. Check Vercel Function logs
2. Verify API endpoints work
3. Check browser console for errors
4. Test with Vercel preview deployments first

## Performance Optimization

For production:

1. Enable Vercel Edge Caching
2. Optimize images with Next.js Image component
3. Implement ISR (Incremental Static Regeneration)
4. Add loading states and skeleton screens
5. Use React.lazy() for code splitting
6. Implement service worker for PWA features

## Security Best Practices

1. Never commit API keys to Git
2. Use environment variables
3. Implement rate limiting
4. Add CORS headers for API routes
5. Use HTTPS only (automatic with Vercel)
6. Implement CSP headers
7. Sanitize user inputs

## Current Deployment URL

Your app is deployed at: **https://line-pointer.vercel.app**

To update:
```bash
git add .
git commit -m "Update: [description]"
git push
```

Vercel will automatically deploy the changes.

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [The Odds API Docs](https://the-odds-api.com/liveapi/guides/v4/)


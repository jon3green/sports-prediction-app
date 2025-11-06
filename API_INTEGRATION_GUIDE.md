# API Integration Guide

## 🎯 Quick Reference: Free Sports APIs

This guide shows you exactly how to integrate real APIs into your Line Pointer app.

## 📋 Current Status

✅ **Mock Data**: Working perfectly (great for demo)
⏰ **Real APIs**: Ready to integrate (just add keys)

## 🔑 API Keys Setup

### Step 1: Get Your Free API Keys

#### The Odds API (Recommended First)
1. Go to: https://the-odds-api.com/
2. Click "Get API Key"
3. Sign up (free tier: 500 requests/month)
4. Copy your API key
5. Free tier includes:
   - 500 requests per month
   - All major sportsbooks
   - Real-time odds
   - NFL & NCAAF data

#### SportsData.io (Optional - For Stats)
1. Go to: https://sportsdata.io/
2. Select "NFL" or "NCAAF" 
3. Sign up for free trial
4. Get API key from dashboard
5. Free trial includes:
   - 1000 requests
   - Team statistics
   - Player data
   - Schedules

#### ESPN API (No Key Needed!)
- Already public
- No registration required
- Unlimited requests
- Just use the endpoints

### Step 2: Add Keys to Vercel

1. Go to: https://vercel.com/dashboard
2. Select your "line-pointer" project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:

```env
Name: NEXT_PUBLIC_ODDS_API_KEY
Value: [paste your The Odds API key]

Name: NEXT_PUBLIC_SPORTSDATA_API_KEY
Value: [paste your SportsData.io key]
```

5. Click "Save"
6. Redeploy your app

## 🔧 Code Integration

### Integration 1: The Odds API (Most Important)

**File to Edit**: `lib/api/sports-data.ts`

**Current Code** (Line ~12):
```typescript
export async function fetchGames(league?: 'NFL' | 'NCAAF'): Promise<Game[]> {
  // This would be replaced with actual API calls
  return generateMockGames(league);
}
```

**Replace With**:
```typescript
import axios from 'axios';

export async function fetchGames(league?: 'NFL' | 'NCAAF'): Promise<Game[]> {
  const apiKey = process.env.NEXT_PUBLIC_ODDS_API_KEY;
  
  // If no API key, use mock data
  if (!apiKey) {
    return generateMockGames(league);
  }

  try {
    const sport = league === 'NFL' ? 'americanfootball_nfl' : 'americanfootball_ncaaf';
    
    const response = await axios.get(
      `https://api.the-odds-api.com/v4/sports/${sport}/odds`,
      {
        params: {
          apiKey: apiKey,
          regions: 'us',
          markets: 'h2h,spreads,totals',
          oddsFormat: 'american',
        }
      }
    );

    // Transform The Odds API data to your Game type
    return transformOddsAPIData(response.data);
  } catch (error) {
    console.error('Error fetching from The Odds API:', error);
    // Fallback to mock data on error
    return generateMockGames(league);
  }
}

// Transform function
function transformOddsAPIData(apiData: any[]): Game[] {
  return apiData.map((game: any) => {
    const homeTeam = game.home_team;
    const awayTeam = game.away_team;
    
    // Get odds from first bookmaker (e.g., DraftKings)
    const bookmaker = game.bookmakers[0];
    const spreads = bookmaker?.markets.find((m: any) => m.key === 'spreads')?.outcomes || [];
    const h2h = bookmaker?.markets.find((m: any) => m.key === 'h2h')?.outcomes || [];
    const totals = bookmaker?.markets.find((m: any) => m.key === 'totals')?.outcomes || [];
    
    const homeSpread = spreads.find((o: any) => o.name === homeTeam);
    const awaySpread = spreads.find((o: any) => o.name === awayTeam);
    const homeH2H = h2h.find((o: any) => o.name === homeTeam);
    const awayH2H = h2h.find((o: any) => o.name === awayTeam);
    const over = totals.find((o: any) => o.name === 'Over');
    const under = totals.find((o: any) => o.name === 'Under');

    return {
      id: game.id,
      league: game.sport_key.includes('nfl') ? 'NFL' : 'NCAAF',
      homeTeam: {
        id: homeTeam,
        name: homeTeam,
        abbreviation: getTeamAbbreviation(homeTeam),
        record: 'N/A',
      },
      awayTeam: {
        id: awayTeam,
        name: awayTeam,
        abbreviation: getTeamAbbreviation(awayTeam),
        record: 'N/A',
      },
      date: game.commence_time,
      status: 'scheduled',
      odds: {
        spread: {
          home: homeSpread?.point || 0,
          away: awaySpread?.point || 0,
          homeOdds: homeSpread?.price || -110,
          awayOdds: awaySpread?.price || -110,
        },
        moneyline: {
          home: homeH2H?.price || -150,
          away: awayH2H?.price || 130,
        },
        total: {
          over: over?.price || -110,
          under: under?.price || -110,
          line: over?.point || 45,
        },
      },
      // Generate predictions using your ML model
      prediction: undefined, // Will be added by ML prediction engine
    };
  });
}

function getTeamAbbreviation(teamName: string): string {
  // Add logic to convert full names to abbreviations
  const abbrevMap: Record<string, string> = {
    'Kansas City Chiefs': 'KC',
    'Buffalo Bills': 'BUF',
    'San Francisco 49ers': 'SF',
    // Add more mappings
  };
  return abbrevMap[teamName] || teamName.substring(0, 3).toUpperCase();
}
```

### Integration 2: ESPN API (For Scores & Team Info)

**Add New Function** to `lib/api/sports-data.ts`:

```typescript
export async function fetchESPNScores(league: 'NFL' | 'NCAAF') {
  const sport = league === 'NFL' ? 'nfl' : 'college-football';
  
  const response = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/football/${sport}/scoreboard`
  );

  return response.data.events.map((event: any) => ({
    id: event.id,
    homeTeam: {
      name: event.competitions[0].competitors[0].team.displayName,
      score: event.competitions[0].competitors[0].score,
      logo: event.competitions[0].competitors[0].team.logo,
    },
    awayTeam: {
      name: event.competitions[0].competitors[1].team.displayName,
      score: event.competitions[0].competitors[1].score,
      logo: event.competitions[0].competitors[1].team.logo,
    },
    status: event.status.type.state,
    date: event.date,
  }));
}
```

### Integration 3: SportsData.io (For Team Stats)

**Update Function** in `lib/api/sports-data.ts`:

```typescript
export async function fetchTeamStats(teamId: string) {
  const apiKey = process.env.NEXT_PUBLIC_SPORTSDATA_API_KEY;
  
  if (!apiKey) {
    // Return mock data
    return {
      teamId,
      offense: {
        pointsPerGame: 27.5,
        yardsPerGame: 380.2,
      },
      // ... rest of mock data
    };
  }

  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/stats/json/TeamSeasonStats/2024`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
        }
      }
    );

    const teamStats = response.data.find((t: any) => t.Team === teamId);
    
    return {
      teamId,
      offense: {
        pointsPerGame: teamStats.PointsPerGame,
        yardsPerGame: teamStats.YardsPerGame,
        passingYards: teamStats.PassingYards / teamStats.Games,
        rushingYards: teamStats.RushingYards / teamStats.Games,
      },
      defense: {
        pointsAllowed: teamStats.PointsAllowedPerGame,
        yardsAllowed: teamStats.YardsAllowed / teamStats.Games,
        sacks: teamStats.Sacks / teamStats.Games,
        turnovers: teamStats.Takeaways / teamStats.Games,
      },
      recent: {
        lastFive: teamStats.Wins + '-' + teamStats.Losses,
        lastTen: teamStats.Wins + '-' + teamStats.Losses,
      }
    };
  } catch (error) {
    console.error('Error fetching team stats:', error);
    // Fallback to mock data
    return generateMockTeamStats(teamId);
  }
}
```

## 🧪 Testing API Integration

### Test Locally

1. **Add API keys to `.env.local`**:
```bash
# Create .env.local in project root
NEXT_PUBLIC_ODDS_API_KEY=your_key_here
NEXT_PUBLIC_SPORTSDATA_API_KEY=your_key_here
```

2. **Restart dev server**:
```bash
npm run dev
```

3. **Check browser console**:
- Open DevTools (F12)
- Go to Console tab
- Watch for API calls
- Check for errors

4. **Monitor API usage**:
- The Odds API: https://the-odds-api.com/account
- Check remaining requests
- Monitor rate limits

### Test in Production

1. **Add keys to Vercel** (as shown above)
2. **Deploy**: `vercel --prod`
3. **Check deployment logs**:
   - Go to Vercel dashboard
   - Click on your deployment
   - View "Functions" tab
   - Check logs for errors

## 📊 API Rate Limits

### The Odds API (Free Tier)
- **Requests**: 500/month
- **Reset**: Monthly on signup date
- **Rate limit**: No per-second limit
- **Estimate usage**: 
  - ~16 requests/day
  - Each page load = 1-2 requests
  - Cache for 5-10 minutes to save requests

### SportsData.io (Trial)
- **Requests**: 1,000 total
- **Reset**: Doesn't reset (trial only)
- **Recommendation**: Use sparingly
- **Best for**: Historical data, not real-time

### ESPN API
- **Requests**: Unlimited
- **Rate limit**: Be reasonable
- **Best for**: Live scores, team info

## 💡 Optimization Tips

### 1. Implement Caching

**Update React Query** in `components/GamesList.tsx`:

```typescript
const { data: games } = useQuery({
  queryKey: ['games', selectedLeague],
  queryFn: () => fetchGames(selectedLeague === 'ALL' ? undefined : selectedLeague),
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes
});
```

### 2. Add Server-Side Caching

**Create cache utility** in `lib/cache.ts`:

```typescript
const cache = new Map<string, { data: any; expiry: number }>();

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  return null;
}

export function setCachedData<T>(key: string, data: T, ttlMinutes: number) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMinutes * 60 * 1000,
  });
}
```

**Use in API route** (`app/api/games/route.ts`):

```typescript
import { getCachedData, setCachedData } from '@/lib/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');
  
  const cacheKey = `games-${league || 'all'}`;
  
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) {
    return NextResponse.json({ games: cached, success: true, cached: true });
  }
  
  // Fetch from API
  const games = await fetchGames(league as any);
  
  // Cache for 5 minutes
  setCachedData(cacheKey, games, 5);
  
  return NextResponse.json({ games, success: true, cached: false });
}
```

### 3. Monitor Usage

**Add usage tracking** in `lib/api/sports-data.ts`:

```typescript
let apiCallCount = 0;
let lastReset = Date.now();

function trackAPICall() {
  // Reset counter monthly
  if (Date.now() - lastReset > 30 * 24 * 60 * 60 * 1000) {
    apiCallCount = 0;
    lastReset = Date.now();
  }
  
  apiCallCount++;
  console.log(`API calls this month: ${apiCallCount}/500`);
  
  if (apiCallCount > 450) {
    console.warn('⚠️ Approaching API limit!');
  }
}
```

## 🚨 Error Handling

### Graceful Fallbacks

```typescript
export async function fetchGames(league?: 'NFL' | 'NCAAF'): Promise<Game[]> {
  try {
    // Try real API first
    return await fetchFromOddsAPI(league);
  } catch (error) {
    console.error('API Error:', error);
    
    // Check if rate limited
    if (error.response?.status === 429) {
      console.error('⚠️ Rate limit exceeded, using cached data');
      return getCachedGames(league) || generateMockGames(league);
    }
    
    // Check if unauthorized
    if (error.response?.status === 401) {
      console.error('⚠️ Invalid API key, using mock data');
      return generateMockGames(league);
    }
    
    // Generic fallback
    return generateMockGames(league);
  }
}
```

## ✅ Integration Checklist

- [ ] Get API keys from providers
- [ ] Add keys to Vercel environment variables
- [ ] Update `lib/api/sports-data.ts` with real API calls
- [ ] Add transformation functions for API responses
- [ ] Implement caching to save API calls
- [ ] Add error handling with fallbacks
- [ ] Test locally with `.env.local`
- [ ] Deploy to Vercel
- [ ] Monitor API usage in provider dashboards
- [ ] Set up alerts for rate limits
- [ ] Document any API-specific quirks
- [ ] Test error scenarios (invalid key, rate limit, etc.)

## 📞 API Support

### The Odds API
- Docs: https://the-odds-api.com/liveapi/guides/v4/
- Support: support@the-odds-api.com
- Discord: Available on website

### SportsData.io
- Docs: https://sportsdata.io/developers/api-documentation
- Support: Via website contact form

### ESPN API
- Unofficial/Public API
- No official support
- Community forums on Reddit

## 🎯 Recommended Priority

1. **Start**: Keep using mock data (works great!)
2. **Next**: Add The Odds API (most important for betting)
3. **Then**: Add ESPN API (for live scores and logos)
4. **Finally**: Add SportsData.io (for advanced stats)

## 💰 Cost Breakdown

- **The Odds API Free**: $0/month (500 requests)
- **The Odds API Paid**: $10-50/month (more requests)
- **SportsData.io Free**: $0 (1000 total requests)
- **SportsData.io Paid**: $10-100/month depending on sport
- **ESPN API**: $0 forever (public)
- **Total Cost to Start**: $0 ✅

## 🚀 You're Ready!

Your app works great with mock data AND is ready for real APIs whenever you want to add them. No rush - deploy and test first!

```bash
# Deploy with mock data (works perfectly)
vercel --prod

# Or add APIs first
# 1. Get keys
# 2. Add to Vercel
# 3. Update code
# 4. Deploy
```

Questions? Check README.md or DEPLOYMENT.md!


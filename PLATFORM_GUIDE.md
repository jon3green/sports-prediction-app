# 🏈 Line Pointer - Complete Platform Guide

## 🎯 Overview

Line Pointer is now a **comprehensive, full-stack sports betting platform** with user authentication, personalized dashboards, Hard Rock Bet odds integration, and deep player statistics analysis.

---

## ✨ New Features

### 🔐 **1. User Authentication System**

**Create Account & Sign In:**
- Secure user registration with email and password
- JWT-based session management with NextAuth.js
- Persistent login sessions
- Protected routes for authenticated features

**Pages:**
- `/auth/signin` - Sign in page
- `/auth/signup` - Create account page
- `/dashboard` - Personal dashboard (requires login)

**How to Use:**
1. Click "Sign Up" in the navigation
2. Enter email, username, and password
3. Automatically signed in after registration
4. Access your personal dashboard and betting history

---

### 📊 **2. Personal Dashboard**

**Your Betting Hub:**
- Track your betting performance in real-time
- View profit/loss statistics
- Monitor win rates and streaks
- Access complete betting history
- Performance breakdown by sport and bet type

**Features:**
- **Total P/L:** See your overall profit or loss
- **Win Rate:** Track your success percentage
- **Best Streak:** View your longest winning streak
- **Recent Bets:** Quick access to latest wagers
- **Performance Charts:** Visual breakdown by category
- **Quick Actions:** Fast navigation to key features

**Access:** Available at `/dashboard` after logging in

---

### 💰 **3. Hard Rock Bet Integration**

**Real-Time Odds from Hard Rock Bet:**
- Live odds updates from Hard Rock Bet sportsbook
- Spread, moneyline, and totals for all games
- Player props with current lines
- Automatic odds refresh

**API Integration:**
- Uses The Odds API which aggregates Hard Rock Bet odds
- Fallback to mock data for development
- Real-time updates (when API keys are configured)

**Configuration:**
```bash
# .env file
NEXT_PUBLIC_ODDS_API_KEY=your_api_key_here
HARDROCK_BET_ENABLED=true
```

**Supported Markets:**
- Spread betting
- Moneyline
- Over/Under (Totals)
- Player props (passing yards, touchdowns, etc.)

---

### 🎯 **4. Player Stats & Props**

**Deep Player Analysis:**
- Individual player statistics
- Season and career stats
- Player prop bets from Hard Rock Bet
- Position-specific filtering
- Advanced search functionality

**Available Data:**
- **QB Stats:** Passing yards, TDs, completion %
- **RB Stats:** Rushing yards, receptions, total TDs
- **WR/TE Stats:** Receiving yards, receptions, targets
- **Player Props:** Live betting lines for each stat category

**Page:** `/players`

**Features:**
- Search by player name or team
- Filter by position (QB, RB, WR, TE)
- View season stats vs. current prop lines
- One-click prop betting (Over/Under)
- Full player analysis

---

### 🎲 **5. Enhanced Parlay Builder**

**Build Smarter Parlays:**
- Add game lines AND player props to single parlay
- Mix different bet types in one ticket
- Quality scoring for each parlay
- Expected value calculations
- Real-time odds updates

**New Parlay Features:**
- Player prop integration
- Multi-sport parlays (NFL + NCAAF)
- Advanced validation
- Edge detection vs. Vegas lines
- Kelly Criterion recommendations

---

### 🗄️ **6. Database & Persistence**

**Your Data is Saved:**
- All bets tracked in database
- Betting history preserved
- Favorites and watchlists
- User preferences saved
- Session management

**Database Schema:**
- Users
- Bets
- Parlays
- Favorites
- Player Stats
- Game Data

**Technology:**
- **Development:** SQLite (local file database)
- **Production:** PostgreSQL (Vercel Postgres recommended)
- **ORM:** Prisma for type-safe database access

---

## 🚀 Quick Start Guide

### **Step 1: Initial Setup**

```bash
# Run the setup script
./setup-full-platform.sh

# Or manually:
npm install
export DATABASE_URL="file:./dev.db"
npx prisma generate
npx prisma db push
```

### **Step 2: Start Development Server**

```bash
npm run dev
```

### **Step 3: Create Your Account**

1. Open http://localhost:3000
2. Click "Sign Up" in navigation
3. Enter your details:
   - Email
   - Username
   - Password
4. You'll be automatically signed in!

### **Step 4: Explore Features**

- **Home:** Browse games and build parlays
- **Players:** View player stats and props
- **Dashboard:** Track your betting performance

---

## 📁 Project Structure

```
sports-prediction-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/    # NextAuth API routes
│   │   │   └── signup/            # Registration endpoint
│   │   ├── games/                 # Games API
│   │   └── predictions/           # Predictions API
│   ├── auth/
│   │   ├── signin/                # Sign in page
│   │   └── signup/                # Sign up page
│   ├── dashboard/                 # User dashboard
│   ├── players/                   # Player stats page
│   ├── page.tsx                   # Home page
│   ├── layout.tsx                 # Root layout
│   └── providers.tsx              # App providers
│
├── components/
│   ├── HeaderWithAuth.tsx         # Navigation with auth
│   ├── GameCard.tsx               # Individual game card
│   ├── ParlayBuilder.tsx          # Parlay creation
│   ├── BettingCalculator.tsx      # Bet calculator
│   └── ui/                        # UI components
│
├── lib/
│   ├── auth.ts                    # NextAuth configuration
│   ├── prisma.ts                  # Database client
│   ├── store.ts                   # State management
│   ├── api/
│   │   ├── hardrock-odds.ts       # Hard Rock Bet integration
│   │   ├── enhanced-ml.ts         # ML predictions
│   │   └── weather-service.ts     # Weather integration
│   └── parlay-validator.ts        # Parlay validation
│
├── prisma/
│   └── schema.prisma              # Database schema
│
└── .env                           # Environment variables
```

---

## 🔐 Authentication Flow

### **Sign Up**
```
User → Sign Up Form → API validates → Create user → Hash password → Save to DB → Auto sign in → Redirect to Dashboard
```

### **Sign In**
```
User → Sign In Form → NextAuth validates → Compare password → Create session → Redirect to Dashboard
```

### **Protected Routes**
```
User → Access Dashboard → Check session → Authenticated? → Allow access
                                        ↓ Not authenticated
                                   Redirect to Sign In
```

---

## 💾 Database Models

### **User**
- id, email, username, password (hashed)
- name, image
- favoriteTeams, notifications
- Relations: bets, parlays, favorites

### **Bet**
- betType, sport, stake, odds, potentialWin
- gameId, playerName, teamName
- betCategory, selection
- status (pending, won, lost, pushed)

### **Parlay**
- legs, stake, totalOdds, potentialWin
- qualityScore, expectedValue
- status (pending, won, lost, partial)

### **Player**
- name, team, position, number
- seasonStats, lastGameStats, careerStats
- image, teamLogo

### **Game**
- sport, week, season
- homeTeam, awayTeam, scores
- Hard Rock Bet odds (spread, moneyline, totals)

### **PlayerProp**
- playerId, playerName, team, position
- gameId, opponent
- propType, line, overOdds, underOdds
- sportsbook = "Hard Rock Bet"

---

## 🎮 User Workflows

### **1. Quick Bet Workflow**
1. Browse games on home page
2. Click betting option (spread, ML, total)
3. Bet added to parlay builder
4. Adjust stake
5. (Optional) Sign in to save bet
6. Place bet

### **2. Player Prop Workflow**
1. Navigate to /players
2. Search for player
3. View season stats
4. Check today's props from Hard Rock Bet
5. Click Over/Under to add to parlay
6. Build parlay with multiple props
7. Place bet

### **3. Dashboard Workflow**
1. Sign in to account
2. View betting performance
3. Check recent bets
4. Analyze win rates
5. Access quick actions
6. Navigate to games or players

### **4. Advanced Parlay Workflow**
1. Add multiple game lines
2. Add player props
3. Mix NFL and NCAAF
4. Check parlay quality score
5. View expected value
6. Get Kelly Criterion recommendation
7. Place optimized parlay

---

## 🔧 Environment Variables

Create `.env` file with:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
NEXT_PUBLIC_ODDS_API_KEY=your_odds_api_key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_weather_key
SPORTSDATA_IO_API_KEY=your_sportsdata_key

# Hard Rock Bet
HARDROCK_BET_ENABLED=true

# Development
NEXT_PUBLIC_USE_MOCK_DATA=true  # Set to false for real data
```

---

## 🌐 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Sign in (via NextAuth)
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### **Games**
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get specific game

### **Predictions**
- `GET /api/predictions` - Get ML predictions

### **Hard Rock Bet (Future)**
- `GET /api/odds/hardrock` - Get Hard Rock Bet odds
- `GET /api/odds/props/:gameId` - Get player props

---

## 📊 Features Comparison

| Feature | Before | Now |
|---------|--------|-----|
| Authentication | ❌ None | ✅ Full system |
| User Accounts | ❌ No | ✅ Yes |
| Bet Tracking | ❌ No | ✅ Complete history |
| Dashboard | ❌ No | ✅ Personal dashboard |
| Hard Rock Odds | ❌ Generic | ✅ Hard Rock Bet specific |
| Player Stats | ❌ No | ✅ Deep player analysis |
| Player Props | ❌ No | ✅ Full prop betting |
| Database | ❌ No | ✅ Prisma + SQLite/Postgres |
| Saved Bets | ❌ No | ✅ Persistent storage |

---

## 🎨 UI/UX Improvements

### **Navigation**
- User menu with dropdown
- Sign In / Sign Up buttons
- "Players" tab in navigation
- Dashboard quick access
- Mobile-responsive menu

### **Dashboard**
- Clean, organized layout
- Performance metrics cards
- Recent bets timeline
- Visual charts
- Quick action buttons

### **Players Page**
- Search and filter
- Position filtering
- Player cards with stats
- Prop betting interface
- Responsive grid layout

---

## 🚧 Next Steps (Optional Enhancements)

### **Immediate (Can Add):**
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Betting limits and bankroll management
- [ ] Social features (share bets, leaderboards)

### **Advanced (Future):**
- [ ] Real-time bet tracking with WebSockets
- [ ] Push notifications for bet results
- [ ] Advanced analytics and charts
- [ ] Live game tracking
- [ ] AI chat assistant for bet recommendations
- [ ] Mobile app (React Native)

---

## 💡 Tips & Best Practices

### **For Development:**
1. Use mock data first (set `NEXT_PUBLIC_USE_MOCK_DATA=true`)
2. Test authentication flow thoroughly
3. Check database with Prisma Studio: `npx prisma studio`
4. Monitor console for errors
5. Use React DevTools for debugging

### **For Production:**
1. Set strong `NEXTAUTH_SECRET`
2. Use PostgreSQL instead of SQLite
3. Configure real API keys
4. Enable SSL/HTTPS
5. Set up error monitoring (Sentry)
6. Implement rate limiting

### **For Users:**
1. Create an account to save bets
2. Check player props before game lines
3. Use quality score to optimize parlays
4. Track your performance in dashboard
5. Set betting limits responsibly

---

## 🆘 Troubleshooting

### **Database Issues**
```bash
# Reset database
rm prisma/dev.db
npx prisma db push

# View database
npx prisma studio
```

### **Authentication Issues**
```bash
# Check if NEXTAUTH_SECRET is set
echo $NEXTAUTH_SECRET

# Generate new secret
openssl rand -base64 32
```

### **Build Errors**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Resources

- **NextAuth.js:** https://next-auth.js.org/
- **Prisma:** https://www.prisma.io/docs
- **The Odds API:** https://the-odds-api.com/
- **Vercel Deployment:** https://vercel.com/docs

---

## 🎉 You're Ready!

Your comprehensive sports betting platform is complete with:
✅ User authentication
✅ Personal dashboards
✅ Hard Rock Bet odds
✅ Player statistics
✅ Betting history tracking
✅ Advanced parlay building

Start by running:
```bash
./setup-full-platform.sh && npm run dev
```

Then open http://localhost:3000 and create your account!

**Happy Betting! 🏈🎯💰**


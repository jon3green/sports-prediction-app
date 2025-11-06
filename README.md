# Line Pointer - AI Sports Predictions

An advanced sports prediction and analytics platform for NFL and NCAAF games. Built with Next.js 14, TypeScript, and machine learning algorithms to provide accurate betting insights and parlay recommendations.

## 🚀 Features

- **AI-Powered Predictions**: Machine learning models analyze historical and current data to predict game outcomes
- **Real-Time Odds**: Live betting lines including spread, moneyline, and totals
- **Smart Parlay Builder**: Build and optimize multi-leg parlays with probability calculations
- **Advanced Analytics**: Detailed breakdowns of prediction factors and team statistics
- **Modern UI**: Clean, responsive design inspired by leading sports betting platforms
- **Live Updates**: Real-time game scores and odds movements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts

## 📊 Data Sources & APIs

### Free APIs Currently Integrated (Mock Data)

1. **The Odds API** (https://the-odds-api.com/)
   - Free tier: 500 requests/month
   - Provides real-time betting odds from multiple bookmakers
   
2. **ESPN API** (Public, no key required)
   - Endpoint: `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
   - Team information, schedules, scores

3. **SportsData.io** (https://sportsdata.io/)
   - Free tier available
   - Historical stats, player data, team analytics

### Machine Learning Model

The prediction engine uses a weighted feature system considering:
- Offensive & Defensive ratings
- Recent form (last 5 games)
- Home field advantage
- Strength of schedule
- Turnover differential
- Historical head-to-head data

**Future Integration**: Production ML models using XGBoost, TensorFlow, or scikit-learn deployed on Vercel Edge Functions or AWS Lambda.

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd line-pointer-sports-predictions
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your API keys to `.env.local` (optional for development):
```env
NEXT_PUBLIC_ODDS_API_KEY=your_key_here
NEXT_PUBLIC_SPORTSDATA_API_KEY=your_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
line-pointer/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query provider
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── GameCard.tsx      # Individual game display
│   ├── GamesList.tsx     # Games list container
│   ├── ParlayBuilder.tsx # Parlay building interface
│   ├── StatsOverview.tsx # Statistics dashboard
│   └── ...
├── lib/                   # Utility functions & logic
│   ├── api/              # API integration
│   │   ├── sports-data.ts
│   │   └── ml-predictions.ts
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── store.ts          # Zustand state management
└── public/               # Static assets
```

## 🔮 Future Enhancements

### Phase 1: Enhanced Data Integration
- [ ] Real API integration with The Odds API
- [ ] ESPN API real-time data fetching
- [ ] Historical game database
- [ ] Weather data integration
- [ ] Injury reports integration

### Phase 2: Advanced ML Models
- [ ] Python backend with Flask/FastAPI
- [ ] XGBoost gradient boosting models
- [ ] LSTM neural networks for time series
- [ ] Ensemble model predictions
- [ ] Feature engineering pipeline
- [ ] Model retraining automation

### Phase 3: User Features
- [ ] User authentication (Clerk/NextAuth)
- [ ] Personal betting history tracking
- [ ] Customizable alerts & notifications
- [ ] Social features (sharing parlays)
- [ ] Leaderboards & competitions
- [ ] Premium subscription tier

### Phase 4: Additional Sports
- [ ] NBA predictions
- [ ] MLB predictions
- [ ] NHL predictions
- [ ] International soccer

### Phase 5: Advanced Analytics
- [ ] Live betting models
- [ ] Arbitrage opportunity detection
- [ ] Bankroll management tools
- [ ] Kelly Criterion calculator
- [ ] Advanced charting & visualizations

## 🎨 Design Inspiration

- **pickfinder.app**: Clean game cards, clear typography, confidence indicators
- **outlier.bet**: Modern glassmorphism, gradient accents, intuitive navigation

## 📝 API Integration Guide

### The Odds API Setup

1. Sign up at https://the-odds-api.com/
2. Get your free API key (500 requests/month)
3. Add to `.env.local`:
```env
NEXT_PUBLIC_ODDS_API_KEY=your_key_here
```

4. Update `lib/api/sports-data.ts`:
```typescript
const response = await axios.get(
  'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds',
  {
    params: {
      apiKey: process.env.NEXT_PUBLIC_ODDS_API_KEY,
      regions: 'us',
      markets: 'h2h,spreads,totals',
    }
  }
);
```

### ESPN API (No Key Required)

```typescript
const response = await axios.get(
  'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
);
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

```bash
vercel --prod
```

### Environment Variables for Production

Set these in your Vercel dashboard:
- `NEXT_PUBLIC_ODDS_API_KEY`
- `NEXT_PUBLIC_SPORTSDATA_API_KEY`
- `ML_API_ENDPOINT` (if using separate ML backend)

## ⚠️ Disclaimer

This application is for **educational and informational purposes only**. It is not intended to encourage gambling. All predictions are based on statistical models and should not be considered guaranteed outcomes. 

**Please gamble responsibly:**
- Only bet what you can afford to lose
- Gambling should be entertainment, not income
- Be aware of problem gambling resources in your area
- This tool does not facilitate actual betting transactions

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ by sports analytics enthusiasts**


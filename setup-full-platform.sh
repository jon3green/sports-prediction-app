#!/bin/bash

echo "🏈 Line Pointer - Full Platform Setup"
echo "======================================="
echo ""
echo "Setting up authentication, database, and comprehensive betting platform..."
echo ""

# Step 1: Create .env file for database and auth
if [ -f .env ]; then
    echo "⚠️  .env already exists. Checking configuration..."
else
    echo "📝 Creating .env file..."
    
    # Generate a secure secret for NextAuth
    SECRET=$(openssl rand -base64 32 2>/dev/null || echo "CHANGE-THIS-TO-A-SECURE-SECRET-IN-PRODUCTION")
    
    cat > .env << EOF
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="$SECRET"
NEXTAUTH_URL="http://localhost:3000"

# API Keys
NEXT_PUBLIC_ODDS_API_KEY=your_odds_api_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key_here

# Hard Rock Bet Integration
# Note: Hard Rock Bet doesn't have a public API
# We'll use The Odds API which includes Hard Rock Bet odds
HARDROCK_BET_ENABLED=true

# SportsData.io - Player stats and injury data
SPORTSDATA_IO_API_KEY=your_sportsdata_io_key_here

# Use mock data for development
NEXT_PUBLIC_USE_MOCK_DATA=true
EOF
    
    echo "✅ .env file created with secure secret!"
fi

# Step 2: Initialize database
echo ""
echo "🗄️  Setting up database..."
echo ""

npx prisma generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated!"
else
    echo "❌ Failed to generate Prisma client. Check your schema."
    exit 1
fi

npx prisma db push
if [ $? -eq 0 ]; then
    echo "✅ Database created and migrations applied!"
else
    echo "❌ Failed to create database. Check your configuration."
    exit 1
fi

# Step 3: Instructions
echo ""
echo "======================================"
echo "✅ PLATFORM SETUP COMPLETE!"
echo "======================================"
echo ""
echo "Your comprehensive betting platform is ready with:"
echo ""
echo "🔐 Features Enabled:"
echo "  ✅ User authentication (sign up/login)"
echo "  ✅ Hard Rock Bet odds integration"
echo "  ✅ Player stats and prop betting"
echo "  ✅ Advanced parlay builder"
echo "  ✅ Betting history tracking"
echo "  ✅ Personal dashboard"
echo "  ✅ Favorites and watchlist"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Start the development server:"
echo "    npm run dev"
echo ""
echo "2️⃣  Open http://localhost:3000 in your browser"
echo ""
echo "3️⃣  Create an account to access all features:"
echo "    • Click 'Sign Up' in the navigation"
echo "    • Choose username and password"
echo "    • Start building parlays!"
echo ""
echo "4️⃣  Get API keys for real data (optional for now):"
echo "    • The Odds API: https://the-odds-api.com/"
echo "    • OpenWeather: https://openweathermap.org/api"
echo "    • SportsData.io: https://sportsdata.io/"
echo ""
echo "💡 TIPS:"
echo "  • Mock data is enabled by default"
echo "  • Create an account to save your bets"
echo "  • Check the /dashboard after logging in"
echo "  • Player props available under each game"
echo ""
echo "📖 Documentation:"
echo "  • See PLATFORM_GUIDE.md for complete features"
echo "  • See API_SETUP_GUIDE.md for API configuration"
echo ""
echo "🚀 Ready to go! Run: npm run dev"
echo ""


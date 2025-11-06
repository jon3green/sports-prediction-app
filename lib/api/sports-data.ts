import axios from 'axios';
import { Game, Team } from '../types';

// Mock data generator for demonstration
// In production, replace with actual API calls
export async function fetchGames(league?: 'NFL' | 'NCAAF'): Promise<Game[]> {
  // This would be replaced with actual API calls to:
  // - The Odds API (https://the-odds-api.com/)
  // - ESPN API
  // - SportsData.io
  
  // For now, return mock data
  return generateMockGames(league);
}

export async function fetchTeamStats(teamId: string) {
  // Would fetch from ESPN or SportsData.io
  return {
    teamId,
    offense: {
      pointsPerGame: 27.5,
      yardsPerGame: 380.2,
      passingYards: 255.3,
      rushingYards: 124.9,
    },
    defense: {
      pointsAllowed: 21.3,
      yardsAllowed: 345.7,
      sacks: 2.8,
      turnovers: 1.2,
    },
    recent: {
      lastFive: '4-1',
      lastTen: '7-3',
    }
  };
}

export async function fetchOdds(gameId: string) {
  // Would fetch from The Odds API
  return {
    gameId,
    bookmakers: [
      {
        name: 'DraftKings',
        spread: { home: -3.5, away: 3.5, homeOdds: -110, awayOdds: -110 },
        moneyline: { home: -165, away: 145 },
        total: { over: -110, under: -110, line: 47.5 }
      }
    ]
  };
}

function generateMockGames(league?: 'NFL' | 'NCAAF'): Game[] {
  const nflTeams: Team[] = [
    { id: '1', name: 'Kansas City Chiefs', abbreviation: 'KC', record: '11-1' },
    { id: '2', name: 'Buffalo Bills', abbreviation: 'BUF', record: '9-3' },
    { id: '3', name: 'San Francisco 49ers', abbreviation: 'SF', record: '10-2' },
    { id: '4', name: 'Miami Dolphins', abbreviation: 'MIA', record: '9-3' },
    { id: '5', name: 'Philadelphia Eagles', abbreviation: 'PHI', record: '10-2' },
    { id: '6', name: 'Dallas Cowboys', abbreviation: 'DAL', record: '9-3' },
    { id: '7', name: 'Baltimore Ravens', abbreviation: 'BAL', record: '10-2' },
    { id: '8', name: 'Detroit Lions', abbreviation: 'DET', record: '9-3' },
  ];

  const ncaafTeams: Team[] = [
    { id: '101', name: 'Georgia Bulldogs', abbreviation: 'UGA', conference: 'SEC', record: '11-0' },
    { id: '102', name: 'Michigan Wolverines', abbreviation: 'MICH', conference: 'Big Ten', record: '11-0' },
    { id: '103', name: 'Washington Huskies', abbreviation: 'WASH', conference: 'Pac-12', record: '11-0' },
    { id: '104', name: 'Florida State Seminoles', abbreviation: 'FSU', conference: 'ACC', record: '11-0' },
    { id: '105', name: 'Ohio State Buckeyes', abbreviation: 'OSU', conference: 'Big Ten', record: '10-1' },
    { id: '106', name: 'Texas Longhorns', abbreviation: 'TEX', conference: 'Big 12', record: '10-1' },
    { id: '107', name: 'Alabama Crimson Tide', abbreviation: 'ALA', conference: 'SEC', record: '10-1' },
    { id: '108', name: 'Oregon Ducks', abbreviation: 'ORE', conference: 'Pac-12', record: '9-2' },
  ];

  const games: Game[] = [];
  const now = new Date();

  // Generate NFL games
  if (!league || league === 'NFL') {
    for (let i = 0; i < 4; i++) {
      const homeTeam = nflTeams[i * 2];
      const awayTeam = nflTeams[i * 2 + 1];
      const gameDate = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000);

      games.push({
        id: `nfl-${i + 1}`,
        league: 'NFL',
        homeTeam,
        awayTeam,
        date: gameDate.toISOString(),
        status: 'scheduled',
        odds: {
          spread: {
            home: -3.5,
            away: 3.5,
            homeOdds: -110,
            awayOdds: -110,
          },
          moneyline: {
            home: -165,
            away: 145,
          },
          total: {
            over: -110,
            under: -110,
            line: 47.5,
          },
        },
        prediction: {
          winner: 'home',
          confidence: 62 + Math.random() * 15,
          predictedScore: {
            home: 24 + Math.floor(Math.random() * 10),
            away: 20 + Math.floor(Math.random() * 8),
          },
          factors: [
            { name: 'Home Field Advantage', impact: 15 },
            { name: 'Recent Form', impact: 25 },
            { name: 'Head-to-Head', impact: 20 },
            { name: 'Offensive Rating', impact: 30 },
            { name: 'Defensive Rating', impact: 10 },
          ],
        },
      });
    }
  }

  // Generate NCAAF games
  if (!league || league === 'NCAAF') {
    for (let i = 0; i < 4; i++) {
      const homeTeam = ncaafTeams[i * 2];
      const awayTeam = ncaafTeams[i * 2 + 1];
      const gameDate = new Date(now.getTime() + (i + 2) * 24 * 60 * 60 * 1000);

      games.push({
        id: `ncaaf-${i + 1}`,
        league: 'NCAAF',
        homeTeam,
        awayTeam,
        date: gameDate.toISOString(),
        status: 'scheduled',
        odds: {
          spread: {
            home: -7,
            away: 7,
            homeOdds: -110,
            awayOdds: -110,
          },
          moneyline: {
            home: -280,
            away: 220,
          },
          total: {
            over: -110,
            under: -110,
            line: 52.5,
          },
        },
        prediction: {
          winner: Math.random() > 0.5 ? 'home' : 'away',
          confidence: 58 + Math.random() * 20,
          predictedScore: {
            home: 28 + Math.floor(Math.random() * 15),
            away: 24 + Math.floor(Math.random() * 12),
          },
          factors: [
            { name: 'Conference Strength', impact: 20 },
            { name: 'Recruiting Ranking', impact: 15 },
            { name: 'Coaching', impact: 18 },
            { name: 'Offensive Efficiency', impact: 27 },
            { name: 'Defensive Efficiency', impact: 20 },
          ],
        },
      });
    }
  }

  return games;
}


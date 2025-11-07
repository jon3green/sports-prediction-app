export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
  record?: string;
  conference?: string;
}

export type Sport = 'NFL' | 'NCAAF' | 'NBA' | 'MLB';

export interface Game {
  id: string;
  league: Sport;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  status: 'scheduled' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
  odds?: {
    spread: {
      home: number;
      away: number;
      homeOdds: number;
      awayOdds: number;
    };
    moneyline: {
      home: number;
      away: number;
    };
    total: {
      over: number;
      under: number;
      line: number;
    };
  };
  prediction?: {
    winner: 'home' | 'away';
    confidence: number;
    predictedScore: {
      home: number;
      away: number;
    };
    factors: {
      name: string;
      impact: number;
    }[];
  };
}

export interface ParlayLeg {
  gameId: string;
  game: Game;
  betType: 'spread' | 'moneyline' | 'total';
  selection: string;
  odds: number;
  probability: number;
}

export interface Parlay {
  id: string;
  legs: ParlayLeg[];
  totalOdds: number;
  totalProbability: number;
  potentialPayout: number;
  stake: number;
}

export interface Stat {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface MLPrediction {
  gameId: string;
  model: string;
  confidence: number;
  predictedWinner: 'home' | 'away';
  predictedSpread: number;
  predictedTotal: number;
  features: {
    [key: string]: number;
  };
}

export interface HistoricalTrend {
  teamId: string;
  games: number;
  wins: number;
  losses: number;
  avgPointsFor: number;
  avgPointsAgainst: number;
  atsRecord: string;
  overUnderRecord: string;
}


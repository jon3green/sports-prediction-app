/**
 * Player Props from The Odds API
 * Get real-time player props from Hard Rock Bet and other sportsbooks
 */

import axios from 'axios';

const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY || '9843d3412159ce8b1e28413f97f0f438';
const BASE_URL = 'https://api.the-odds-api.com/v4';

export interface PlayerProp {
  id: string;
  playerId?: string;
  playerName: string;
  team: string;
  opponent: string;
  position: string;
  gameId: string;
  gameTime: Date;
  propType: string; // 'passing_yards', 'passing_tds', 'rushing_yards', etc.
  propDescription: string; // Human-readable
  line: number;
  overOdds: number;
  underOdds: number;
  sportsbook: string;
  lastUpdate: string;
}

export interface PlayerPropsResponse {
  success: boolean;
  sport: string;
  props: PlayerProp[];
  count: number;
  error?: string;
}

/**
 * Player prop market keys supported by The Odds API
 */
export const PROP_MARKETS = {
  // Passing props
  PLAYER_PASS_YDS: 'player_pass_yds',
  PLAYER_PASS_TDS: 'player_pass_tds',
  PLAYER_PASS_COMPLETIONS: 'player_pass_completions',
  PLAYER_PASS_ATTEMPTS: 'player_pass_attempts',
  PLAYER_PASS_INTERCEPTIONS: 'player_pass_interceptions',
  PLAYER_PASS_LONGEST_COMPLETION: 'player_pass_longest_completion',
  
  // Rushing props
  PLAYER_RUSH_YDS: 'player_rush_yds',
  PLAYER_RUSH_ATTEMPTS: 'player_rush_attempts',
  PLAYER_RUSH_LONGEST: 'player_rush_longest',
  
  // Receiving props
  PLAYER_RECEPTIONS: 'player_receptions',
  PLAYER_RECEPTION_YDS: 'player_reception_yds',
  PLAYER_RECEPTION_LONGEST: 'player_reception_longest',
  
  // Touchdown props
  PLAYER_ANYTIME_TD: 'player_anytime_td',
  PLAYER_FIRST_TD: 'player_first_td',
  PLAYER_LAST_TD: 'player_last_td',
  PLAYER_2_PLUS_TD: 'player_2+_td',
  
  // Combo props
  PLAYER_RUSH_RECEPTION_YDS: 'player_rush_reception_yds',
} as const;

/**
 * Get all available player props for upcoming NFL/NCAAF games
 */
export async function getAllPlayerProps(sport: 'nfl' | 'ncaaf' = 'nfl'): Promise<PlayerPropsResponse> {
  try {
    const sportKey = sport === 'nfl' ? 'americanfootball_nfl' : 'americanfootball_ncaaf';
    
    // Get all available markets
    const markets = Object.values(PROP_MARKETS).join(',');
    
    const response = await axios.get(
      `${BASE_URL}/sports/${sportKey}/odds/`,
      {
        params: {
          apiKey: ODDS_API_KEY,
          regions: 'us',
          markets: markets,
          bookmakers: 'draftkings,fanduel,betmgm,hardrock', // Include Hard Rock Bet
          oddsFormat: 'american',
        },
        timeout: 10000,
      }
    );

    const props = transformOddsToProps(response.data, sport);

    return {
      success: true,
      sport,
      props,
      count: props.length,
    };
  } catch (error) {
    console.error('Error fetching player props:', error);
    
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        sport,
        props: [],
        count: 0,
        error: error.response.data?.message || error.message,
      };
    }

    return {
      success: false,
      sport,
      props: [],
      count: 0,
      error: 'Failed to fetch player props',
    };
  }
}

/**
 * Get player props for a specific game
 */
export async function getGamePlayerProps(
  eventId: string,
  sport: 'nfl' | 'ncaaf' = 'nfl'
): Promise<PlayerPropsResponse> {
  try {
    const sportKey = sport === 'nfl' ? 'americanfootball_nfl' : 'americanfootball_ncaaf';
    const markets = Object.values(PROP_MARKETS).join(',');
    
    const response = await axios.get(
      `${BASE_URL}/sports/${sportKey}/events/${eventId}/odds/`,
      {
        params: {
          apiKey: ODDS_API_KEY,
          regions: 'us',
          markets: markets,
          bookmakers: 'draftkings,fanduel,betmgm,hardrock',
          oddsFormat: 'american',
        },
        timeout: 10000,
      }
    );

    const props = transformOddsToProps([response.data], sport);

    return {
      success: true,
      sport,
      props,
      count: props.length,
    };
  } catch (error) {
    console.error('Error fetching game props:', error);
    
    return {
      success: false,
      sport,
      props: [],
      count: 0,
      error: 'Failed to fetch game props',
    };
  }
}

/**
 * Get props for a specific player
 */
export async function getPlayerProps(
  playerName: string,
  sport: 'nfl' | 'ncaaf' = 'nfl'
): Promise<PlayerPropsResponse> {
  const allProps = await getAllPlayerProps(sport);
  
  if (!allProps.success) {
    return allProps;
  }

  const playerProps = allProps.props.filter(prop =>
    prop.playerName.toLowerCase().includes(playerName.toLowerCase())
  );

  return {
    ...allProps,
    props: playerProps,
    count: playerProps.length,
  };
}

/**
 * Transform The Odds API response to our prop format
 */
function transformOddsToProps(events: any[], sport: string): PlayerProp[] {
  const props: PlayerProp[] = [];

  events.forEach((event: any) => {
    if (!event.bookmakers || event.bookmakers.length === 0) {
      return;
    }

    event.bookmakers.forEach((bookmaker: any) => {
      bookmaker.markets?.forEach((market: any) => {
        const propType = market.key;
        const propDescription = formatPropDescription(propType);

        // Group outcomes by player (Over/Under pairs)
        const playerOutcomes: { [key: string]: any[] } = {};
        
        market.outcomes?.forEach((outcome: any) => {
          const playerKey = outcome.description || outcome.name;
          if (!playerOutcomes[playerKey]) {
            playerOutcomes[playerKey] = [];
          }
          playerOutcomes[playerKey].push(outcome);
        });

        // Create props for each player
        Object.entries(playerOutcomes).forEach(([playerKey, outcomes]) => {
          const overOutcome = outcomes.find(o => o.name === 'Over');
          const underOutcome = outcomes.find(o => o.name === 'Under');

          if (overOutcome || underOutcome) {
            const line = overOutcome?.point || underOutcome?.point || 0;
            
            props.push({
              id: `${event.id}-${bookmaker.key}-${propType}-${playerKey}`,
              playerName: extractPlayerName(playerKey),
              team: event.home_team, // Approximate - would need team mapping
              opponent: event.away_team,
              position: guessPosition(propType),
              gameId: event.id,
              gameTime: new Date(event.commence_time),
              propType,
              propDescription,
              line,
              overOdds: overOutcome?.price || 0,
              underOdds: underOutcome?.price || 0,
              sportsbook: bookmaker.title,
              lastUpdate: bookmaker.last_update,
            });
          }
        });
      });
    });
  });

  return props;
}

/**
 * Extract clean player name from description
 */
function extractPlayerName(description: string): string {
  // Remove common suffixes like position abbreviations
  return description
    .replace(/\s+(QB|RB|WR|TE|K|P|DEF)$/i, '')
    .replace(/\s+(Over|Under)$/i, '')
    .trim();
}

/**
 * Guess player position from prop type
 */
function guessPosition(propType: string): string {
  if (propType.includes('pass')) return 'QB';
  if (propType.includes('rush') && !propType.includes('reception')) return 'RB';
  if (propType.includes('reception') || propType.includes('receptions')) return 'WR';
  if (propType.includes('td')) return 'FLEX';
  return 'FLEX';
}

/**
 * Format prop type into human-readable description
 */
function formatPropDescription(propType: string): string {
  const descriptions: { [key: string]: string } = {
    'player_pass_yds': 'Passing Yards',
    'player_pass_tds': 'Passing Touchdowns',
    'player_pass_completions': 'Pass Completions',
    'player_pass_attempts': 'Pass Attempts',
    'player_pass_interceptions': 'Interceptions',
    'player_pass_longest_completion': 'Longest Completion',
    'player_rush_yds': 'Rushing Yards',
    'player_rush_attempts': 'Rush Attempts',
    'player_rush_longest': 'Longest Rush',
    'player_receptions': 'Receptions',
    'player_reception_yds': 'Receiving Yards',
    'player_reception_longest': 'Longest Reception',
    'player_anytime_td': 'Anytime Touchdown',
    'player_first_td': 'First Touchdown',
    'player_last_td': 'Last Touchdown',
    'player_2+_td': '2+ Touchdowns',
    'player_rush_reception_yds': 'Rush + Rec Yards',
  };

  return descriptions[propType] || propType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Check API usage stats
 */
export async function checkApiUsage(): Promise<{
  requestsUsed: number;
  requestsRemaining: number;
}> {
  try {
    // The Odds API returns usage in response headers
    const response = await axios.get(
      `${BASE_URL}/sports`,
      {
        params: { apiKey: ODDS_API_KEY },
      }
    );

    return {
      requestsUsed: parseInt(response.headers['x-requests-used'] || '0'),
      requestsRemaining: parseInt(response.headers['x-requests-remaining'] || '500'),
    };
  } catch (error) {
    return {
      requestsUsed: 0,
      requestsRemaining: 0,
    };
  }
}

export default {
  getAllPlayerProps,
  getGamePlayerProps,
  getPlayerProps,
  checkApiUsage,
  PROP_MARKETS,
};


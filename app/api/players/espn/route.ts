import { NextResponse } from 'next/server';
import { ESPNService } from '@/lib/api/espn-api';

/**
 * GET /api/players/espn
 * 
 * Query parameters:
 * - sport: 'nfl' | 'ncaaf' (default: 'nfl')
 * - q: search query
 * - position: filter by position (QB, RB, WR, TE, etc.)
 * - limit: max number of players (default: 100)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport') || 'nfl';
    const query = searchParams.get('q');
    const position = searchParams.get('position');
    const limit = parseInt(searchParams.get('limit') || '100');

    let players;

    // Search by name
    if (query) {
      players = await ESPNService.searchPlayers(
        query,
        sport === 'ncaaf' ? 'college-football' : 'nfl'
      );
    }
    // Filter by position
    else if (position) {
      players = await ESPNService.getPlayersByPosition(
        position,
        sport === 'ncaaf' ? 'college-football' : 'nfl'
      );
    }
    // Get all players
    else {
      players = sport === 'ncaaf'
        ? await ESPNService.getAllNCAAFPlayers(limit)
        : await ESPNService.getAllNFLPlayers(limit);
    }

    // Apply limit
    const limitedPlayers = players.slice(0, limit);

    return NextResponse.json({
      success: true,
      count: limitedPlayers.length,
      players: limitedPlayers,
    });
  } catch (error) {
    console.error('ESPN Players API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch players from ESPN',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


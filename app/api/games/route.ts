import { NextResponse } from 'next/server';
import { fetchGames } from '@/lib/api/sports-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get('league') as 'NFL' | 'NCAAF' | null;
    
    const games = await fetchGames(league || undefined);
    
    return NextResponse.json({ games, success: true });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games', success: false },
      { status: 500 }
    );
  }
}


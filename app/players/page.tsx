'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HeaderWithAuth from '@/components/HeaderWithAuth';
import Footer from '@/components/Footer';
import { Search, TrendingUp, Target, Activity, Loader2 } from 'lucide-react';
import { ESPNPlayerStats } from '@/lib/api/espn-api';

// Mock player data for props (will be fetched from The Odds API later)
const mockPlayerProps = {
  'Patrick Mahomes': [
    { type: 'Passing Yards', line: 275.5, over: -115, under: -105 },
    { type: 'Passing TDs', line: 2.5, over: 130, under: -155 },
    { type: 'Completions', line: 24.5, over: -110, under: -110 },
  ],
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<ESPNPlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [selectedSport, setSelectedSport] = useState<'nfl' | 'ncaaf'>('nfl');

  // Fetch players on mount and when sport/position changes
  useEffect(() => {
    fetchPlayers();
  }, [selectedSport, selectedPosition]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sport: selectedSport,
        limit: '100',
      });

      if (selectedPosition !== 'ALL') {
        params.append('position', selectedPosition);
      }

      const response = await fetch(`/api/players/espn?${params}`);
      const data = await response.json();

      if (data.success) {
        setPlayers(data.players);
      } else {
        console.error('Failed to fetch players:', data.error);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    
    if (query.length > 2) {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          sport: selectedSport,
          q: query,
        });

        const response = await fetch(`/api/players/espn?${params}`);
        const data = await response.json();

        if (data.success) {
          setPlayers(data.players);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    } else if (query.length === 0) {
      fetchPlayers();
    }
  };

  const filteredPlayers = players;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <HeaderWithAuth />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Player Stats & Props</h1>
          <p className="text-gray-400">
            Deep dive into individual player statistics and betting props from Hard Rock Bet
          </p>
        </div>

        {/* Sport Selector */}
        <div className="mb-4 flex gap-2">
          <Button
            variant={selectedSport === 'nfl' ? 'default' : 'ghost'}
            onClick={() => setSelectedSport('nfl')}
            className={selectedSport === 'nfl' ? 'gradient-green' : ''}
          >
            NFL
          </Button>
          <Button
            variant={selectedSport === 'ncaaf' ? 'default' : 'ghost'}
            onClick={() => setSelectedSport('ncaaf')}
            className={selectedSport === 'ncaaf' ? 'gradient-blue' : ''}
          >
            NCAAF
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players or teams..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex gap-2">
            {['ALL', 'QB', 'RB', 'WR', 'TE'].map((pos) => (
              <Button
                key={pos}
                variant={selectedPosition === pos ? 'default' : 'ghost'}
                onClick={() => setSelectedPosition(pos)}
                className={selectedPosition === pos ? 'gradient-green' : ''}
              >
                {pos}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            <span className="ml-3 text-white">Loading players from ESPN...</span>
          </div>
        )}

        {/* Players Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="glass-morphism border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      {player.image ? (
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                          {player.jersey || player.position}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl text-white">{player.name}</CardTitle>
                        <p className="text-sm text-gray-400">{player.team.name}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge className="bg-blue-600/20 text-blue-400">{player.position}</Badge>
                          {player.jersey && (
                            <Badge className="bg-purple-600/20 text-purple-400">#{player.jersey}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {player.team.logo && (
                      <img 
                        src={player.team.logo} 
                        alt={player.team.name}
                        className="w-12 h-12 opacity-50"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Player Info */}
                  {(player.height || player.weight || player.college) && (
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {player.height && (
                        <div className="text-center">
                          <p className="text-gray-400">Height</p>
                          <p className="text-white font-semibold">{player.height}</p>
                        </div>
                      )}
                      {player.weight && (
                        <div className="text-center">
                          <p className="text-gray-400">Weight</p>
                          <p className="text-white font-semibold">{player.weight} lbs</p>
                        </div>
                      )}
                      {player.experience !== undefined && (
                        <div className="text-center">
                          <p className="text-gray-400">Exp</p>
                          <p className="text-white font-semibold">{player.experience} yrs</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Season Stats */}
                  {Object.keys(player.stats).length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Activity className="w-4 h-4" />
                        <span>2024 Season Stats</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Passing Stats */}
                        {player.stats.passing && (
                          <>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Pass Yards</p>
                              <p className="text-white font-bold">{player.stats.passing.yards?.toFixed(0) || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Pass TDs</p>
                              <p className="text-white font-bold">{player.stats.passing.touchdowns || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">INTs</p>
                              <p className="text-white font-bold">{player.stats.passing.interceptions || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Comp %</p>
                              <p className="text-white font-bold">{player.stats.passing.completionPercentage?.toFixed(1) || 0}%</p>
                            </div>
                          </>
                        )}

                        {/* Rushing Stats */}
                        {player.stats.rushing && (
                          <>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Rush Yards</p>
                              <p className="text-white font-bold">{player.stats.rushing.yards?.toFixed(0) || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Rush TDs</p>
                              <p className="text-white font-bold">{player.stats.rushing.touchdowns || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">YPC</p>
                              <p className="text-white font-bold">{player.stats.rushing.yardsPerCarry?.toFixed(1) || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Attempts</p>
                              <p className="text-white font-bold">{player.stats.rushing.attempts || 0}</p>
                            </div>
                          </>
                        )}

                        {/* Receiving Stats */}
                        {player.stats.receiving && (
                          <>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Rec Yards</p>
                              <p className="text-white font-bold">{player.stats.receiving.yards?.toFixed(0) || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Receptions</p>
                              <p className="text-white font-bold">{player.stats.receiving.receptions || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Rec TDs</p>
                              <p className="text-white font-bold">{player.stats.receiving.touchdowns || 0}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Targets</p>
                              <p className="text-white font-bold">{player.stats.receiving.targets || 0}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Player Props - Coming Soon */}
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-xs text-yellow-400 text-center">
                      📊 Player props from Hard Rock Bet coming soon! Upgrade The Odds API to unlock.
                    </p>
                  </div>

                  <Button className="w-full gradient-green flex items-center justify-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>View Full Analysis</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">No players found matching your criteria</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}


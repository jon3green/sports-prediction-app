'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import HeaderWithAuth from '@/components/HeaderWithAuth';
import Footer from '@/components/Footer';
import { Search, TrendingUp, Target, Activity } from 'lucide-react';

// Mock player data - will be replaced with real API data
const mockPlayers = [
  {
    id: 1,
    name: 'Patrick Mahomes',
    team: 'Kansas City Chiefs',
    position: 'QB',
    number: 15,
    image: 'https://via.placeholder.com/100',
    stats: {
      passingYards: 4183,
      touchdowns: 35,
      interceptions: 10,
      completion: 67.8,
    },
    props: [
      { type: 'Passing Yards', line: 275.5, over: -115, under: -105 },
      { type: 'Passing TDs', line: 2.5, over: 130, under: -155 },
      { type: 'Completions', line: 24.5, over: -110, under: -110 },
    ],
  },
  {
    id: 2,
    name: 'Josh Allen',
    team: 'Buffalo Bills',
    position: 'QB',
    number: 17,
    image: 'https://via.placeholder.com/100',
    stats: {
      passingYards: 3899,
      touchdowns: 32,
      interceptions: 14,
      completion: 64.5,
    },
    props: [
      { type: 'Passing Yards', line: 265.5, over: -105, under: -115 },
      { type: 'Passing TDs', line: 2.5, over: 115, under: -140 },
      { type: 'Rush Yards', line: 32.5, over: -110, under: -110 },
    ],
  },
  {
    id: 3,
    name: 'Christian McCaffrey',
    team: 'San Francisco 49ers',
    position: 'RB',
    number: 23,
    image: 'https://via.placeholder.com/100',
    stats: {
      rushingYards: 1459,
      touchdowns: 14,
      receptions: 67,
      receivingYards: 564,
    },
    props: [
      { type: 'Rush Yards', line: 78.5, over: -110, under: -110 },
      { type: 'Receptions', line: 4.5, over: -105, under: -115 },
      { type: 'Total TDs', line: 0.5, over: 120, under: -145 },
    ],
  },
  {
    id: 4,
    name: 'Travis Kelce',
    team: 'Kansas City Chiefs',
    position: 'TE',
    number: 87,
    image: 'https://via.placeholder.com/100',
    stats: {
      receptions: 93,
      receivingYards: 984,
      touchdowns: 5,
      targets: 121,
    },
    props: [
      { type: 'Receiving Yards', line: 67.5, over: -110, under: -110 },
      { type: 'Receptions', line: 5.5, over: -115, under: -105 },
      { type: 'TDs', line: 0.5, over: 180, under: -225 },
    ],
  },
];

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');

  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

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

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Players Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="glass-morphism border-white/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                      #{player.number}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{player.name}</CardTitle>
                      <p className="text-sm text-gray-400">{player.team}</p>
                      <Badge className="mt-1 bg-blue-600/20 text-blue-400">{player.position}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Season Stats */}
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Season Stats</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(player.stats).map(([key, value]) => (
                      <div key={key} className="p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-white font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Player Props */}
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Today's Props (Hard Rock Bet)</span>
                  </h4>
                  <div className="space-y-2">
                    {player.props.map((prop, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{prop.type}</span>
                          <span className="text-gray-400">{prop.line}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="p-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded text-green-400 text-sm transition-colors">
                            Over {prop.over > 0 ? `+${prop.over}` : prop.over}
                          </button>
                          <button className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-red-400 text-sm transition-colors">
                            Under {prop.under > 0 ? `+${prop.under}` : prop.under}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full gradient-green flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>View Full Analysis</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No players found matching your criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}


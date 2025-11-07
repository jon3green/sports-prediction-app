'use client';

import { useState } from 'react';
import { Game } from '@/lib/types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Plus, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Flame,
  Target,
  Activity
} from 'lucide-react';
import { formatDate, formatOdds, getConfidenceLevel } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

interface GameCardEnhancedProps {
  game: Game;
}

export default function GameCardEnhanced({ game }: GameCardEnhancedProps) {
  const [expanded, setExpanded] = useState(false);
  const { addParlayLeg, parlayLegs } = useStore();
  
  const isInParlay = parlayLegs.some(leg => leg.gameId === game.id);
  const confidence = game.prediction?.confidence || 50;
  const isHighConfidence = confidence >= 70;
  const isMediumConfidence = confidence >= 55 && confidence < 70;

  const handleAddToParlay = (
    betType: 'spread' | 'moneyline' | 'total',
    selection: string,
    odds: number
  ) => {
    addParlayLeg({
      gameId: game.id,
      game,
      betType,
      selection,
      odds,
      probability: confidence,
    });
  };

  // Determine if favorite
  const isFavorite = game.odds?.spread?.home && game.odds.spread.home < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Card className={`glass-premium hover-lift overflow-hidden relative ${
        isInParlay ? 'ring-2 ring-green-500/50' : ''
      }`}>
        {/* Top Accent Bar */}
        <div className={`h-1 ${
          isHighConfidence ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
          isMediumConfidence ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
          'bg-gradient-to-r from-gray-500 to-gray-600'
        }`} />

        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-white/10 border-white/20 hover:bg-white/15 smooth-transition">
                {game.league}
              </Badge>
              {isHighConfidence && (
                <Badge className="gradient-success border-0 text-white gap-1">
                  <Flame className="w-3 h-3" />
                  Hot Pick
                </Badge>
              )}
              {game.prediction?.hasStrongEdge && (
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300 gap-1">
                  <Sparkles className="w-3 h-3" />
                  Value
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(game.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{new Date(game.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="space-y-4 mb-6">
            {/* Away Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                  <span className="text-lg font-bold text-white">{game.awayTeam.abbreviation}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 smooth-transition">
                    {game.awayTeam.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">{game.awayTeam.record}</span>
                    {!isFavorite && game.odds?.moneyline && (
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        {formatOdds(game.odds.moneyline.away)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {game.awayScore !== undefined && (
                <div className="text-3xl font-bold text-white tabular-nums">
                  {game.awayScore}
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-xs font-semibold text-gray-500 px-3 py-1 rounded-full bg-white/5">
                VS
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Home Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                  <span className="text-lg font-bold text-white">{game.homeTeam.abbreviation}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 smooth-transition">
                    {game.homeTeam.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400">{game.homeTeam.record}</span>
                    {isFavorite && game.odds?.moneyline && (
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        {formatOdds(game.odds.moneyline.home)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {game.homeScore !== undefined && (
                <div className="text-3xl font-bold text-white tabular-nums">
                  {game.homeScore}
                </div>
              )}
            </div>
          </div>

          {/* Venue Info */}
          {game.venue && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <MapPin className="w-4 h-4" />
              <span>{game.venue}</span>
            </div>
          )}

          {/* ML Prediction Bar */}
          {game.prediction && (
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold text-white">ML Prediction</span>
                </div>
                <Badge className={`${
                  isHighConfidence ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  isMediumConfidence ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                } border`}>
                  {confidence}% Confidence
                </Badge>
              </div>
              
              {/* Confidence Bar */}
              <div className="progress-bar mb-2">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{game.prediction.predictedWinner}</span>
                {game.prediction.hasStrongEdge && (
                  <span className="text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Strong Value
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quick Bet Options */}
          {game.odds && (
            <div className="grid grid-cols-3 gap-3">
              {/* Spread */}
              {game.odds.spread && (
                <Button
                  onClick={() => handleAddToParlay('spread', `${game.homeTeam.abbreviation} ${game.odds!.spread!.home}`, game.odds!.spread!.homeOdds || -110)}
                  className="glass-card hover:glass-premium smooth-transition border-white/10 hover:border-green-500/50 flex flex-col items-center gap-2 h-auto py-4"
                  variant="ghost"
                >
                  <span className="text-xs text-gray-400 uppercase font-semibold">Spread</span>
                  <span className="text-lg font-bold text-white">{game.odds.spread.home > 0 ? '+' : ''}{game.odds.spread.home}</span>
                  <span className="text-xs text-gray-500">{formatOdds(game.odds.spread.homeOdds || -110)}</span>
                </Button>
              )}

              {/* Total */}
              {game.odds.total && (
                <Button
                  onClick={() => handleAddToParlay('total', `Over ${game.odds!.total!.line}`, game.odds!.total!.overOdds || -110)}
                  className="glass-card hover:glass-premium smooth-transition border-white/10 hover:border-green-500/50 flex flex-col items-center gap-2 h-auto py-4"
                  variant="ghost"
                >
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total</span>
                  <span className="text-lg font-bold text-white">{game.odds.total.line}</span>
                  <span className="text-xs text-gray-500">O/U</span>
                </Button>
              )}

              {/* Moneyline */}
              {game.odds.moneyline && (
                <Button
                  onClick={() => handleAddToParlay('moneyline', game.homeTeam.abbreviation, game.odds!.moneyline!.home || 0)}
                  className="glass-card hover:glass-premium smooth-transition border-white/10 hover:border-green-500/50 flex flex-col items-center gap-2 h-auto py-4"
                  variant="ghost"
                >
                  <span className="text-xs text-gray-400 uppercase font-semibold">ML</span>
                  <span className="text-lg font-bold text-white">{formatOdds(game.odds.moneyline.home || 0)}</span>
                  <span className="text-xs text-gray-500">Home</span>
                </Button>
              )}
            </div>
          )}

          {/* Expand Button */}
          <Button
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-4 text-gray-400 hover:text-white hover:bg-white/5 smooth-transition"
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                <span>More Details</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Expanded Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10"
            >
              <div className="p-6 space-y-4">
                {/* Team Stats Comparison */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    Team Statistics
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Points Per Game', away: 24.5, home: 28.3 },
                      { label: 'Points Allowed', away: 22.1, home: 19.8 },
                      { label: 'Yards Per Game', away: 355, home: 402 },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>{stat.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-2 bg-white/5 rounded-lg">
                            <span className="text-white font-semibold">{stat.away}</span>
                          </div>
                          <div className="text-center p-2 bg-white/5 rounded-lg">
                            <span className="text-white font-semibold">{stat.home}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather Impact */}
                {game.weather && (
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-white mb-2">Weather Impact</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{game.weather.conditions}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {game.weather.temperature}°F • Wind {game.weather.windSpeed}mph
                        </p>
                      </div>
                      <Badge className={
                        game.weather.impactPoints > 5 ? 'bg-red-500/20 text-red-400' :
                        game.weather.impactPoints > 2 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }>
                        {game.weather.impactPoints > 5 ? 'High' :
                         game.weather.impactPoints > 2 ? 'Medium' : 'Low'} Impact
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}


'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '@/lib/api/sports-data';
import { useStore } from '@/lib/store';
import GameCard from './GameCard';
import { motion } from 'framer-motion';

export default function GamesList() {
  const { selectedLeague } = useStore();

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['games', selectedLeague],
    queryFn: () => fetchGames(selectedLeague === 'ALL' ? undefined : selectedLeague),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass-morphism rounded-xl p-6 animate-pulse h-48"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-morphism rounded-xl p-8 text-center">
        <p className="text-red-500">Error loading games. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {selectedLeague === 'ALL' ? 'All Games' : selectedLeague} Predictions
        </h2>
        <span className="text-sm text-gray-400">
          {games?.length || 0} games available
        </span>
      </div>

      <div className="space-y-4">
        {games?.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


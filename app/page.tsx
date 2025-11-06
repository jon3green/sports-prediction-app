import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GamesList from '@/components/GamesList';
import ParlayBuilder from '@/components/ParlayBuilder';
import StatsOverview from '@/components/StatsOverview';
import BettingCalculator from '@/components/BettingCalculator';
import Footer from '@/components/Footer';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <Hero />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <StatsOverview />
        </Suspense>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<LoadingSkeleton />}>
              <GamesList />
            </Suspense>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Suspense fallback={<LoadingSkeleton />}>
              <ParlayBuilder />
            </Suspense>
            
            <Suspense fallback={<LoadingSkeleton />}>
              <BettingCalculator />
            </Suspense>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}


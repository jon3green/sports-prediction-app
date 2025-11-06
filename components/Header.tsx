'use client';

import { useState } from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedLeague, setSelectedLeague } = useStore();

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="gradient-green p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Line Pointer</h1>
              <p className="text-xs text-gray-400">AI Sports Predictions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={selectedLeague === 'ALL' ? 'default' : 'ghost'}
              onClick={() => setSelectedLeague('ALL')}
              className={cn(
                selectedLeague === 'ALL' && 'gradient-green'
              )}
            >
              All Games
            </Button>
            <Button
              variant={selectedLeague === 'NFL' ? 'default' : 'ghost'}
              onClick={() => setSelectedLeague('NFL')}
              className={cn(
                selectedLeague === 'NFL' && 'gradient-green'
              )}
            >
              NFL
            </Button>
            <Button
              variant={selectedLeague === 'NCAAF' ? 'default' : 'ghost'}
              onClick={() => setSelectedLeague('NCAAF')}
              className={cn(
                selectedLeague === 'NCAAF' && 'gradient-green'
              )}
            >
              NCAAF
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-2">
              <Button
                variant={selectedLeague === 'ALL' ? 'default' : 'ghost'}
                onClick={() => {
                  setSelectedLeague('ALL');
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full',
                  selectedLeague === 'ALL' && 'gradient-green'
                )}
              >
                All Games
              </Button>
              <Button
                variant={selectedLeague === 'NFL' ? 'default' : 'ghost'}
                onClick={() => {
                  setSelectedLeague('NFL');
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full',
                  selectedLeague === 'NFL' && 'gradient-green'
                )}
              >
                NFL
              </Button>
              <Button
                variant={selectedLeague === 'NCAAF' ? 'default' : 'ghost'}
                onClick={() => {
                  setSelectedLeague('NCAAF');
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full',
                  selectedLeague === 'NCAAF' && 'gradient-green'
                )}
              >
                NCAAF
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


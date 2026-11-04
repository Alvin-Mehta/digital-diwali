import React from 'react';
import { CrackerAnimationPhase } from '../types';

interface MatchstickRendererProps {
  phase: CrackerAnimationPhase;
  targetX?: number; // Target percentage coordinates (0-100)
  targetY?: number;
}

export const MatchstickRenderer: React.FC<MatchstickRendererProps> = ({
  phase,
  targetX = 50,
  targetY = 50,
}) => {
  const isVisible =
    phase === 'match_appear' ||
    phase === 'match_igniting' ||
    phase === 'fuse_burning';

  if (!isVisible) return null;

  const isFlaked = phase === 'match_igniting' || phase === 'fuse_burning';

  // Translate matchstick from right towards the fuse target
  const currentX = phase === 'match_appear' ? targetX + 15 : targetX;
  const currentY = phase === 'match_appear' ? targetY - 10 : targetY;

  return (
    <div
      className="absolute z-40 pointer-events-none transition-all duration-500 ease-out"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: 'translate(-10px, -90px) rotate(-35deg)',
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Match Flame when ignited */}
        {isFlaked && (
          <div className="absolute -top-7 flex flex-col items-center animate-match-burn">
            <div className="w-5 h-8 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full blur-[0.5px] shadow-[0_0_15px_#f59e0b]" />
            <div className="w-2 h-4 bg-white rounded-full -mt-5" />
          </div>
        )}

        {/* Match Head (Sulfur) */}
        <div
          className={`w-3.5 h-5 rounded-t-full shadow-sm transition-colors ${
            isFlaked ? 'bg-amber-900' : 'bg-red-600'
          }`}
        />

        {/* Wooden Matchstick Body */}
        <div className="w-2 h-24 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 rounded-b-sm border-x border-amber-400/40" />
      </div>
    </div>
  );
};


import React from 'react';
import { CrackerStageProps, CrackerThumbnailProps } from '../types';
import { FlowerPotIllustration } from './assets/FlowerPotIllustration';

export const FlowerPotThumbnail: React.FC<CrackerThumbnailProps> = ({ isSelected }) => {
  return (
    <div className={`p-2 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
      <FlowerPotIllustration size={68} />
    </div>
  );
};

export const FlowerPotCracker: React.FC<CrackerStageProps> = ({ phase, progress }) => {
  const isFuseBurning = phase === 'fuse_burning';
  const isErupting = phase === 'active' || phase === 'peak';

  // Ground vibration and pot glow calculation during peak fountain
  const shakeOffset = isErupting ? Math.sin(progress * 80) * 1.5 : 0;

  return (
    <div className="relative flex flex-col items-center justify-end w-full h-full pb-8 pointer-events-none">
      {/* Background Fountain Ambient Light */}
      {isErupting && (
        <div
          className="absolute bottom-16 w-64 h-96 bg-gradient-to-t from-gold-500/40 via-festive-orange/30 to-transparent blur-3xl pointer-events-none"
          style={{
            transform: `scale(${0.6 + progress * 0.7})`,
            opacity: Math.min(1, (1 - progress) * 2),
          }}
        />
      )}

      <div
        className="transition-transform"
        style={{
          transform: `translateX(${shakeOffset}px)`,
        }}
      >
        <FlowerPotIllustration
          size={160}
          isFuseBurning={isFuseBurning}
          isErupting={isErupting}
        />
      </div>
    </div>
  );
};


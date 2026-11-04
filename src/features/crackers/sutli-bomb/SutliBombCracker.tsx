import React from 'react';
import { CrackerStageProps, CrackerThumbnailProps } from '../types';
import { SutliBombIllustration } from './assets/SutliBombIllustration';

export const SutliBombThumbnail: React.FC<CrackerThumbnailProps> = ({ isSelected }) => {
  return (
    <div className={`p-2 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
      <SutliBombIllustration size={68} />
    </div>
  );
};

export const SutliBombCracker: React.FC<CrackerStageProps> = ({ phase, progress }) => {
  const isFuseBurning = phase === 'fuse_burning';
  const isDetonating = phase === 'active' || phase === 'peak';

  // Suspense pause and screen flash animation
  let opacity = 1;
  let scale = 1;

  if (isDetonating) {
    // Immediate blast explosion: bomb disintegrates into debris
    opacity = Math.max(0, 1 - progress * 8);
    scale = 1 + progress * 0.4;
  }

  return (
    <div className="relative flex flex-col items-center justify-end w-full h-full pb-10 pointer-events-none">
      {/* Blinding Screen Flash Bloom on Detonation */}
      {isDetonating && progress < 0.35 && (
        <div
          className="fixed inset-0 bg-white/70 pointer-events-none z-50 transition-opacity"
          style={{ opacity: 1 - progress * 2.8 }}
        />
      )}

      <div
        className="transition-transform"
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <SutliBombIllustration
          size={140}
          isFuseBurning={isFuseBurning}
        />
      </div>
    </div>
  );
};


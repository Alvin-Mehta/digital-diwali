import React from 'react';
import { CrackerStageProps, CrackerThumbnailProps } from '../types';
import { ChakriIllustration } from './assets/ChakriIllustration';

export const ChakriThumbnail: React.FC<CrackerThumbnailProps> = ({ isSelected }) => {
  return (
    <div className={`p-2 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
      <ChakriIllustration size={68} />
    </div>
  );
};

export const ChakriCracker: React.FC<CrackerStageProps> = ({ phase, progress }) => {
  const isFuseBurning = phase === 'fuse_burning';
  const isSpinning = phase === 'active' || phase === 'peak';

  // Rotation and erratic ground skittering physics
  let rotationDeg = 0;
  let offsetX = 0;
  let offsetY = 0;

  if (isSpinning) {
    // Non-linear acceleration and deceleration
    const speedCurve = Math.sin(progress * Math.PI);
    rotationDeg = progress * 2800;
    offsetX = Math.sin(progress * 14) * 22 * speedCurve;
    offsetY = Math.cos(progress * 12) * 12 * speedCurve;
  }

  const chakriSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 115 : 140;

  return (
    <div className="relative flex flex-col items-center justify-end w-full h-full pb-6 sm:pb-10 pointer-events-none">
      {/* Dynamic Ground Light Ring */}
      {isSpinning && (
        <div
          className="absolute bottom-4 sm:bottom-6 w-36 sm:w-48 h-20 sm:h-24 rounded-full bg-emerald-500/25 blur-2xl pointer-events-none"
          style={{
            transform: `scale(${1 + Math.sin(progress * Math.PI) * 0.8})`,
          }}
        />
      )}

      <div
        className="transition-transform duration-75"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        <ChakriIllustration
          size={chakriSize}
          isFuseBurning={isFuseBurning}
          rotationDeg={rotationDeg}
        />
      </div>
    </div>
  );
};


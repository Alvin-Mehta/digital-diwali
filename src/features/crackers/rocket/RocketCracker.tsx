import React from 'react';
import { CrackerStageProps, CrackerThumbnailProps } from '../types';
import { RocketIllustration } from './assets/RocketIllustration';

export const RocketThumbnail: React.FC<CrackerThumbnailProps> = ({ isSelected }) => {
  return (
    <div className={`p-2 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
      <RocketIllustration size={72} />
    </div>
  );
};

export const RocketCracker: React.FC<CrackerStageProps> = ({ phase, progress }) => {
  const isFuseBurning = phase === 'fuse_burning';
  const isAscending = phase === 'active';
  const isBursting = phase === 'peak' || phase === 'decay';

  // Rocket ascent physics calculation
  let translateY = 0;
  let opacity = 1;
  let scale = 1;

  if (isAscending) {
    // Accelerate upwards
    translateY = -progress * 420;
    scale = Math.max(0.6, 1 - progress * 0.4);
  } else if (isBursting) {
    // Detonated in the sky
    translateY = -420;
    opacity = Math.max(0, 1 - progress * 4); // Disappear quickly on burst
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full pointer-events-none">
      <div
        className="transition-transform duration-75 ease-out flex flex-col items-center"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
        }}
      >
        <RocketIllustration size={180} isFuseBurning={isFuseBurning} />

        {/* Rocket exhaust flame while ascending */}
        {isAscending && (
          <div className="flex flex-col items-center -mt-6">
            <div className="w-3 h-8 bg-gradient-to-b from-amber-200 via-orange-500 to-transparent rounded-full animate-pulse blur-[1px]" />
            <div className="w-1.5 h-4 bg-white rounded-full -mt-7" />
          </div>
        )}
      </div>
    </div>
  );
};


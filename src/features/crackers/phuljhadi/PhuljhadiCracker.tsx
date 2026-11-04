import React from 'react';
import { CrackerStageProps, CrackerThumbnailProps } from '../types';
import { PhuljhadiIllustration } from './assets/PhuljhadiIllustration';

export const PhuljhadiThumbnail: React.FC<CrackerThumbnailProps> = ({ isSelected }) => {
  return (
    <div className={`p-2 flex items-center justify-center transition-transform ${isSelected ? 'scale-110' : ''}`}>
      <PhuljhadiIllustration size={72} />
    </div>
  );
};

export const PhuljhadiCracker: React.FC<CrackerStageProps> = ({ phase, progress }) => {
  const isFuseBurning = phase === 'fuse_burning';
  const isSparkling = phase === 'active' || phase === 'peak';

  // Handheld natural subtle waving motion
  const waveAngle = isSparkling ? Math.sin(progress * 18) * 4 : 0;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full pointer-events-none">
      {/* Radiant Spark Ambient Light */}
      {isSparkling && (
        <div
          className="absolute w-56 h-56 rounded-full bg-amber-400/35 blur-3xl pointer-events-none"
          style={{
            transform: `scale(${0.8 + Math.random() * 0.4})`,
            top: `${15 + progress * 35}%`,
          }}
        />
      )}

      <div
        className="transition-transform duration-75"
        style={{
          transform: `rotate(${waveAngle}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        <PhuljhadiIllustration
          size={210}
          isFuseBurning={isFuseBurning}
          isSparkling={isSparkling}
          burnProgress={isSparkling ? progress : 0}
        />
      </div>
    </div>
  );
};


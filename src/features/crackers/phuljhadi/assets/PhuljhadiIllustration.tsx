import React from 'react';

interface PhuljhadiIllustrationProps {
  size?: number;
  className?: string;
  isFuseBurning?: boolean;
  isSparkling?: boolean;
  burnProgress?: number; // 0.0 to 1.0 (consumes the chemical coating)
}

export const PhuljhadiIllustration: React.FC<PhuljhadiIllustrationProps> = ({
  size = 200,
  className = '',
  isFuseBurning = false,
  isSparkling = false,
  burnProgress = 0,
}) => {
  // Height of chemical coating burning down
  const totalCoatingHeight = 85;
  const consumedHeight = totalCoatingHeight * burnProgress;
  const currentSparkY = 25 + consumedHeight;

  return (
    <svg
      width={size * 0.35}
      height={size}
      viewBox="0 0 70 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_8px_20px_rgba(245,158,11,0.3)] ${className}`}
    >
      <defs>
        <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="50%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>

        <linearGradient id="pyroCoating" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="35%" stopColor="#4B5563" />
          <stop offset="70%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>

      {/* Main Steel Wire Backbone */}
      <rect x="33.5" y="15" width="3" height="175" rx="1.5" fill="url(#wireGrad)" />

      {/* Bottom Handle Section */}
      <rect x="32" y="145" width="6" height="45" rx="3" fill="#D97706" opacity="0.8" />

      {/* Chemical Pyro Coating (shrinks as it burns) */}
      <rect
        x="30"
        y={25 + consumedHeight}
        width="10"
        height={Math.max(0, totalCoatingHeight - consumedHeight)}
        rx="4"
        fill="url(#pyroCoating)"
        stroke="#1F2937"
        strokeWidth="1"
      />

      {/* Subtle Granular Texture Dots on Coating */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={32 + (i % 3) * 3}
          cy={35 + i * 5}
          r="0.8"
          fill="#D1D5DB"
          opacity={35 + i * 5 > currentSparkY ? 0.6 : 0}
        />
      ))}

      {/* Tip Fuse / Ignition Spark */}
      {isFuseBurning && (
        <g className="animate-pulse">
          <circle cx="35" cy="25" r="4" fill="#FFFBEB" />
          <circle cx="35" cy="25" r="7" fill="#F59E0B" opacity="0.6" />
        </g>
      )}

      {/* Burning Eruption Point */}
      {isSparkling && (
        <g>
          <circle cx="35" cy={currentSparkY} r="6" fill="#FFFBEB" className="animate-ping" />
          <circle cx="35" cy={currentSparkY} r="4" fill="#FCD34D" />
          <circle cx="35" cy={currentSparkY} r="2" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );
};


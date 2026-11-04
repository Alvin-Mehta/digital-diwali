import React from 'react';

interface SutliBombIllustrationProps {
  size?: number;
  className?: string;
  isFuseBurning?: boolean;
}

export const SutliBombIllustration: React.FC<SutliBombIllustrationProps> = ({
  size = 150,
  className = '',
  isFuseBurning = false,
}) => {
  return (
    <svg
      width={size * 0.9}
      height={size}
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_8px_20px_rgba(239,68,68,0.3)] ${className}`}
    >
      <defs>
        <radialGradient id="bombGreenGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="40%" stopColor="#16A34A" />
          <stop offset="85%" stopColor="#14532D" />
          <stop offset="100%" stopColor="#052E16" />
        </radialGradient>

        <linearGradient id="twinePattern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="50%" stopColor="#854D0E" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>
      </defs>

      {/* Braided Cord Fuse */}
      <path
        d="M70 55 Q62 35 74 15"
        stroke="#D97706"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Fuse Sparks */}
      {isFuseBurning && (
        <g className="animate-pulse">
          <circle cx="74" cy="15" r="4.5" fill="#FFFBEB" />
          <circle cx="74" cy="15" r="8" fill="#EF4444" opacity="0.6" />
          <circle cx="78" cy="12" r="2" fill="#FCD34D" />
          <circle cx="70" cy="18" r="1.5" fill="#FF6B00" />
        </g>
      )}

      {/* Rounded Cuboid Twine Bomb Core */}
      <rect
        x="25"
        y="50"
        width="90"
        height="90"
        rx="22"
        fill="url(#bombGreenGrad)"
        stroke="#052E16"
        strokeWidth="2"
      />

      {/* Cross-Hatched Jute Twine Wrapping Lines */}
      {[-20, 0, 20, 40, 60, 80].map((offset, i) => (
        <path
          key={`diag1-${i}`}
          d={`M${25 + offset} 50 L${65 + offset} 140`}
          stroke="url(#twinePattern)"
          strokeWidth="2.2"
          opacity="0.8"
        />
      ))}

      {[-20, 0, 20, 40, 60, 80].map((offset, i) => (
        <path
          key={`diag2-${i}`}
          d={`M${115 - offset} 50 L${75 - offset} 140`}
          stroke="url(#twinePattern)"
          strokeWidth="2.2"
          opacity="0.8"
        />
      ))}

      {/* Horizontal Twine Tie Band */}
      <rect x="25" y="85" width="90" height="20" fill="#DC2626" opacity="0.95" />
      <rect x="25" y="88" width="90" height="3" fill="#FCD34D" />
      <rect x="25" y="99" width="90" height="3" fill="#FCD34D" />

      {/* Brand Stamp: "555 BOMB" */}
      <text
        x="70"
        y="99"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#FFFBEB"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        555 BOMB
      </text>
    </svg>
  );
};


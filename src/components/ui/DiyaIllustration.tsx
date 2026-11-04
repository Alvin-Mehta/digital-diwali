import React from 'react';

interface DiyaProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const DiyaIllustration: React.FC<DiyaProps> = ({
  size = 64,
  className = '',
  glow = true,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute -top-3 w-8 h-8 rounded-full bg-gold-400/40 blur-md animate-diya-flicker pointer-events-none"
          style={{ width: size * 0.5, height: size * 0.5 }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FCD34D" />
            <stop offset="80%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="clayBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="40%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Diya Flame with flickering class */}
        <g className="animate-diya-flicker origin-bottom" style={{ transformOrigin: '32px 34px' }}>
          {/* Outer Flame Glow */}
          <path
            d="M32 4 C38 15 45 23 42 33 C40 39 35 42 32 42 C29 42 24 39 22 33 C19 23 26 15 32 4 Z"
            fill="url(#flameInner)"
            opacity="0.9"
          />
          {/* Inner Bright Core */}
          <path
            d="M32 12 C35 18 38 24 36 31 C35 34 33 36 32 36 C31 36 29 34 28 31 C26 24 29 18 32 12 Z"
            fill="#FFFBEB"
          />
        </g>

        {/* Clay Diya Body */}
        <path
          d="M8 38 C12 53 52 53 56 38 C50 42 38 44 32 44 C26 44 14 42 8 38 Z"
          fill="url(#clayBase)"
          stroke="#92400E"
          strokeWidth="1"
        />

        {/* Diya Rim */}
        <ellipse cx="32" cy="38" rx="24" ry="5.5" fill="url(#rimGlow)" />
        <ellipse cx="32" cy="39.5" rx="20.5" ry="3.8" fill="#78350F" />

        {/* Front Ornamental Carving Dots */}
        <circle cx="24" cy="46" r="1.2" fill="#FCD34D" />
        <circle cx="32" cy="47" r="1.5" fill="#FCD34D" />
        <circle cx="40" cy="46" r="1.2" fill="#FCD34D" />
      </svg>
    </div>
  );
};


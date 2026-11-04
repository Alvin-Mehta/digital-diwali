import React from 'react';

interface FlowerPotIllustrationProps {
  size?: number;
  className?: string;
  isFuseBurning?: boolean;
  isErupting?: boolean;
}

export const FlowerPotIllustration: React.FC<FlowerPotIllustrationProps> = ({
  size = 180,
  className = '',
  isFuseBurning = false,
  isErupting = false,
}) => {
  return (
    <svg
      width={size * 0.75}
      height={size}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_8px_20px_rgba(245,158,11,0.3)] ${className}`}
    >
      <defs>
        <linearGradient id="anarClayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="40%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>

        <linearGradient id="anarFoilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Top Fuse Cord */}
      <path
        d="M60 40 Q55 25 62 15"
        stroke="#D97706"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Burning Fuse Spark */}
      {isFuseBurning && (
        <g className="animate-pulse">
          <circle cx="62" cy="15" r="4" fill="#FFFBEB" />
          <circle cx="62" cy="15" r="7" fill="#F59E0B" opacity="0.6" />
          <circle cx="58" cy="18" r="1.5" fill="#EF4444" />
          <circle cx="65" cy="12" r="1.5" fill="#FCD34D" />
        </g>
      )}

      {/* Eruption nozzle glow */}
      {isErupting && (
        <ellipse cx="60" cy="40" rx="14" ry="6" fill="#FFFBEB" className="animate-ping" />
      )}

      {/* Main Conical Body */}
      <polygon
        points="60,40 102,145 18,145"
        fill="url(#anarClayGrad)"
        stroke="#9A3412"
        strokeWidth="1.5"
      />

      {/* Terracotta Base Rim */}
      <ellipse cx="60" cy="145" rx="42" ry="10" fill="#7C2D12" stroke="#431407" strokeWidth="1.5" />
      <ellipse cx="60" cy="143" rx="39" ry="8" fill="#9A3412" />

      {/* Top Ornate Foil Wrap */}
      <polygon points="60,40 76,75 44,75" fill="url(#anarFoilGrad)" />

      {/* Festive Geometric Bands */}
      <path d="M37 90 L83 90" stroke="#FDE68A" strokeWidth="3" />
      <path d="M32 105 L88 105" stroke="#15803D" strokeWidth="4" />
      <path d="M26 122 L94 122" stroke="#EF4444" strokeWidth="3" />

      {/* Central Diya / Flower Emblem */}
      <circle cx="60" cy="114" r="5" fill="#FFFBEB" />
      <circle cx="60" cy="114" r="2" fill="#EA580C" />
    </svg>
  );
};


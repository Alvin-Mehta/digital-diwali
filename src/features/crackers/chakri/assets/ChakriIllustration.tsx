import React from 'react';

interface ChakriIllustrationProps {
  size?: number;
  className?: string;
  isFuseBurning?: boolean;
  rotationDeg?: number;
}

export const ChakriIllustration: React.FC<ChakriIllustrationProps> = ({
  size = 160,
  className = '',
  isFuseBurning = false,
  rotationDeg = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_4px_16px_rgba(245,158,11,0.3)] ${className}`}
    >
      <defs>
        <radialGradient id="chakriGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="85%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>

      {/* Rotating Wheel Group */}
      <g
        style={{
          transformOrigin: '80px 80px',
          transform: `rotate(${rotationDeg}deg)`,
        }}
      >
        {/* Outer Circular Disk */}
        <circle cx="80" cy="80" r="65" fill="url(#chakriGrad)" stroke="#B45309" strokeWidth="2" />

        {/* Concentric Decorative Rings */}
        <circle cx="80" cy="80" r="52" stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="6 4" />
        <circle cx="80" cy="80" r="40" stroke="#FFFBEB" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="28" fill="#15803D" stroke="#FCD34D" strokeWidth="2" />

        {/* Coiled Spiral Arms */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <path
            key={i}
            d="M80 80 Q95 60 118 70"
            stroke={i % 2 === 0 ? '#FCD34D' : '#FFFBEB'}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${deg} 80 80)`}
          />
        ))}

        {/* Center Metal Axle Hub */}
        <circle cx="80" cy="80" r="12" fill="#D97706" stroke="#FFFBEB" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="5" fill="#451A03" />

        {/* Tangential Nozzle Fuse */}
        <path
          d="M135 60 Q145 50 148 38"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {isFuseBurning && (
          <g className="animate-pulse">
            <circle cx="148" cy="38" r="4" fill="#FFFBEB" />
            <circle cx="148" cy="38" r="7" fill="#F59E0B" opacity="0.6" />
            <circle cx="152" cy="35" r="1.5" fill="#EF4444" />
          </g>
        )}
      </g>
    </svg>
  );
};


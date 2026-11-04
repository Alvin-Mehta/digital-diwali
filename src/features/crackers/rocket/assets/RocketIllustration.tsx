import React from 'react';

interface RocketIllustrationProps {
  size?: number;
  className?: string;
  isFuseBurning?: boolean;
}

export const RocketIllustration: React.FC<RocketIllustrationProps> = ({
  size = 200,
  className = '',
  isFuseBurning = false,
}) => {
  return (
    <svg
      width={size * 0.4}
      height={size}
      viewBox="0 0 80 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_8px_20px_rgba(245,158,11,0.3)] ${className}`}
    >
      <defs>
        <linearGradient id="rocketCone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id="bambooStick" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="50%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
      </defs>

      {/* Wooden Guidance Bamboo Stick */}
      <rect x="42" y="70" width="3.5" height="125" rx="1.5" fill="url(#bambooStick)" />

      {/* Aerodynamic Conical Nose Cap */}
      <polygon points="35,15 50,45 20,45" fill="url(#rocketCone)" />
      <polygon points="35,15 35,45 20,45" fill="#EF4444" opacity="0.6" />

      {/* Main Cylindrical Gunpowder Chamber */}
      <rect x="20" y="45" width="30" height="70" rx="3" fill="url(#rocketBody)" stroke="#B45309" strokeWidth="1" />

      {/* Festive Wrapper Patterns */}
      <rect x="20" y="55" width="30" height="6" fill="#991B1B" />
      <rect x="20" y="65" width="30" height="4" fill="#FCD34D" />
      <rect x="20" y="90" width="30" height="12" fill="#15803D" />

      {/* Diya / Star icon on rocket cylinder */}
      <circle cx="35" cy="80" r="4" fill="#FFFBEB" />
      <path d="M35 74 L37 79 L41 80 L37 81 L35 86 L33 81 L29 80 L33 79 Z" fill="#F59E0B" />

      {/* Bottom Nozzle */}
      <polygon points="25,115 45,115 41,122 29,122" fill="#78350F" />

      {/* Fuse Cord */}
      <path
        d="M35 122 Q40 132 32 142"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Burning Fuse Sparks */}
      {isFuseBurning && (
        <g className="animate-pulse">
          <circle cx="32" cy="142" r="3.5" fill="#FFFBEB" />
          <circle cx="32" cy="142" r="6" fill="#F59E0B" opacity="0.6" />
          <circle cx="30" cy="145" r="1.5" fill="#FF6B00" />
          <circle cx="35" cy="140" r="1.5" fill="#FCD34D" />
        </g>
      )}
    </svg>
  );
};


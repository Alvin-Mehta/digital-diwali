import React from 'react';

interface FestiveLanternProps {
  size?: number;
  className?: string;
  color?: string;
}

export const FestiveLantern: React.FC<FestiveLanternProps> = ({
  size = 56,
  className = '',
  color = '#F59E0B',
}) => {
  return (
    <div className={`inline-flex flex-col items-center animate-float-gentle ${className}`}>
      {/* Hanging string */}
      <div className="w-[1px] h-6 bg-gradient-to-b from-gold-400 to-gold-600" />

      {/* Hexagonal Kandeel / Lantern */}
      <svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 60 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]"
      >
        <defs>
          <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor={color} />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Central Rhombus / Diamond */}
        <polygon points="30,10 50,35 30,60 10,35" fill="url(#lanternGrad)" stroke="#FDE68A" strokeWidth="1.5" />

        {/* Inner Star Pattern */}
        <polygon points="30,20 42,35 30,50 18,35" fill="#FFFBEB" opacity="0.4" />

        {/* Corner Triangles */}
        <polygon points="30,10 50,35 55,20" fill="#EA580C" opacity="0.8" />
        <polygon points="30,10 10,35 5,20" fill="#EA580C" opacity="0.8" />
        <polygon points="30,60 50,35 55,50" fill="#EA580C" opacity="0.8" />
        <polygon points="30,60 10,35 5,50" fill="#EA580C" opacity="0.8" />

        {/* Hanging Tassels */}
        {[18, 24, 30, 36, 42].map((x, i) => (
          <path
            key={i}
            d={`M${x} 60 Q${x + (i % 2 === 0 ? 2 : -2)} 75 ${x} 88`}
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
};


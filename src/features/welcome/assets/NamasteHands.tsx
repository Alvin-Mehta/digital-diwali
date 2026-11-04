import React from 'react';

interface NamasteHandsProps {
  className?: string;
  size?: number;
}

export const NamasteHands: React.FC<NamasteHandsProps> = ({ className = '', size = 260 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Background Radiance Bloom */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-500/20 via-festive-orange/30 to-gold-300/20 blur-3xl animate-pulse" />

      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_10px_25px_rgba(245,158,11,0.35)]"
      >
        <defs>
          <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.3" />
            <stop offset="60%" stop-color="#FCD34D" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="handSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A" />
            <stop offset="50%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#D97706" />
          </linearGradient>

          <linearGradient id="bangleGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFFBEB" />
            <stop offset="40%" stop-color="#F59E0B" />
            <stop offset="70%" stop-color="#FF6B00" />
            <stop offset="100%" stop-color="#D97706" />
          </linearGradient>

          <linearGradient id="bangleRuby" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#EF4444" />
            <stop offset="50%" stop-color="#991B1B" />
            <stop offset="100%" stop-color="#EF4444" />
          </linearGradient>
        </defs>

        {/* Aura Ring Mandala */}
        <circle cx="120" cy="120" r="105" fill="url(#auraGrad)" />
        <circle cx="120" cy="120" r="100" stroke="#F59E0B" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="4 6" />
        <circle cx="120" cy="120" r="85" stroke="#FCD34D" stroke-opacity="0.2" stroke-width="1" />

        {/* Lotus Petal Rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <path
            key={i}
            d="M120 18 C124 28 124 35 120 42 C116 35 116 28 120 18 Z"
            fill="#FCD34D"
            fillOpacity="0.4"
            transform={`rotate(${deg} 120 120)`}
          />
        ))}

        {/* Left Hand Silhouette */}
        <path
          d="M120 62 C115 65 106 82 104 105 C102 122 105 142 98 165 C95 174 90 182 82 195 L118 195 C119 180 120 150 120 100 Z"
          fill="url(#handSkinGrad)"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* Right Hand Silhouette */}
        <path
          d="M120 62 C125 65 134 82 136 105 C138 122 135 142 142 165 C145 174 150 182 158 195 L122 195 C121 180 120 150 120 100 Z"
          fill="url(#handSkinGrad)"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* Joined Fingers Seam */}
        <path d="M120 62 L120 170" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mehendi / Henna Lotus Motif in center */}
        <circle cx="120" cy="118" r="4" fill="#991B1B" />
        <path d="M120 108 C123 113 123 116 120 118 C117 116 117 113 120 108 Z" fill="#991B1B" />
        <path d="M128 118 C123 121 120 121 120 118 C120 115 123 115 128 118 Z" fill="#991B1B" />
        <path d="M112 118 C117 121 120 121 120 118 C120 115 117 115 112 118 Z" fill="#991B1B" />
        <path d="M120 128 C123 123 123 120 120 118 C117 120 117 123 120 128 Z" fill="#991B1B" />

        {/* Left Wrist Bangles */}
        <rect x="80" y="172" width="40" height="4" rx="2" fill="url(#bangleGold)" />
        <rect x="78" y="178" width="42" height="3" rx="1.5" fill="url(#bangleRuby)" />
        <rect x="76" y="183" width="44" height="4" rx="2" fill="url(#bangleGold)" />

        {/* Right Wrist Bangles */}
        <rect x="120" y="172" width="40" height="4" rx="2" fill="url(#bangleGold)" />
        <rect x="120" y="178" width="42" height="3" rx="1.5" fill="url(#bangleRuby)" />
        <rect x="120" y="183" width="44" height="4" rx="2" fill="url(#bangleGold)" />
      </svg>
    </div>
  );
};


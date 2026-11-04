import React from 'react';
import { Crown } from 'lucide-react';

interface AvatarProps {
  name: string;
  isHost?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AVATAR_GRADIENTS = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-700',
  'from-rose-500 to-red-700',
  'from-purple-500 to-indigo-700',
  'from-yellow-400 to-amber-600',
];

export const Avatar: React.FC<AvatarProps> = ({
  name,
  isHost = false,
  size = 'md',
  className = '',
}) => {
  // Deterministic color from name
  const charCodeSum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradient = AVATAR_GRADIENTS[charCodeSum % AVATAR_GRADIENTS.length];
  const initial = (name[0] || 'U').toUpperCase();

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr ${gradient} text-white font-bold flex items-center justify-center border border-white/20 shadow-sm`}
        title={`${name} ${isHost ? '(Host)' : ''}`}
      >
        {initial}
      </div>

      {isHost && (
        <span
          className="absolute -top-1.5 -right-1 bg-gold-500 text-bg-deep p-0.5 rounded-full shadow-sm"
          title="Celebration Host"
        >
          <Crown size={10} className="stroke-[3]" />
        </span>
      )}
    </div>
  );
};


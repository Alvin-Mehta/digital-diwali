import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'crimson' | 'violet';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    crimson: 'bg-red-500/15 text-red-400 border-red-500/30',
    violet: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};


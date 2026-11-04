import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'festive' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 active:scale-95 disabled:pointer-events-none disabled:opacity-50';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-gold-500 to-amber-600 text-bg-deep shadow-md hover:from-gold-400 hover:to-amber-500 hover:shadow-festive',
    festive:
      'bg-gradient-to-r from-festive-orange via-gold-500 to-amber-500 text-bg-deep font-bold tracking-wide shadow-glow hover:brightness-110 hover:shadow-festive animate-pulse-gold',
    secondary:
      'bg-bg-surface text-text-primary border border-border-medium hover:bg-bg-elevated hover:border-gold-500/50',
    ghost:
      'bg-transparent text-text-secondary hover:text-gold-400 hover:bg-bg-surface/50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};


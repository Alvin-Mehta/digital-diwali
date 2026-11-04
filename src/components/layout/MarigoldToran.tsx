import React from 'react';

export const MarigoldToran: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden flex justify-between items-center px-2 pointer-events-none select-none ${className}`}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center -mt-2">
          {/* Mango Leaf */}
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path
              d="M12 0 C18 10 22 18 12 28 C2 18 6 10 12 0 Z"
              fill={i % 2 === 0 ? '#15803D' : '#166534'}
              opacity="0.85"
            />
          </svg>
          {/* Marigold Flower Head */}
          <div
            className={`w-4 h-4 rounded-full -mt-2 shadow-sm ${
              i % 3 === 0
                ? 'bg-amber-400 border border-amber-300'
                : i % 3 === 1
                ? 'bg-orange-500 border border-orange-400'
                : 'bg-yellow-400 border border-yellow-300'
            }`}
          />
        </div>
      ))}
    </div>
  );
};


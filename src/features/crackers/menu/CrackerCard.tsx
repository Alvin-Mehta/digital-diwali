import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CrackerDefinition } from '../types';
import { Badge } from '../../../components/ui/Badge';

interface CrackerCardProps {
  cracker: CrackerDefinition;
  isSelected: boolean;
  onSelect: (cracker: CrackerDefinition) => void;
  disabled?: boolean;
}

export const CrackerCard: React.FC<CrackerCardProps> = ({
  cracker,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  const Thumb = cracker.ThumbnailComponent;

  const categoryBadges: Record<string, { label: string; variant: 'gold' | 'emerald' | 'crimson' | 'violet' }> = {
    aerial: { label: 'Aerial Rocket', variant: 'crimson' },
    fountain: { label: 'Fountain Anar', variant: 'gold' },
    ground: { label: 'Ground Chakri', variant: 'emerald' },
    sound: { label: 'Sound Bomb', variant: 'crimson' },
    handheld: { label: 'Handheld Sparkler', variant: 'violet' },
  };

  const badge = categoryBadges[cracker.category] || { label: 'Cracker', variant: 'gold' };

  return (
    <button
      onClick={() => onSelect(cracker)}
      disabled={disabled}
      role="radio"
      aria-checked={isSelected}
      className={`group relative w-full text-left rounded-2xl p-3.5 transition-all duration-200 border flex items-center gap-3.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
        isSelected
          ? 'bg-bg-elevated/90 border-gold-500 shadow-festive ring-1 ring-gold-500/50'
          : 'bg-bg-surface/70 border-gold-500/15 hover:bg-bg-surface hover:border-gold-500/40 hover:shadow-md'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Selected Indicator Checkmark */}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 text-gold-400">
          <CheckCircle2 size={16} />
        </div>
      )}

      {/* Cracker Thumbnail Vector Graphic */}
      <div className="w-16 h-16 rounded-xl bg-bg-deep/70 border border-gold-500/20 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-gold-500/40 transition-colors">
        <Thumb isSelected={isSelected} />
      </div>

      {/* Cracker Metadata */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={badge.variant}>{badge.label}</Badge>
          {cracker.hindiName && (
            <span className="text-[10px] text-text-muted truncate hidden sm:inline">
              {cracker.hindiName}
            </span>
          )}
        </div>

        <h3 className="font-festive text-sm sm:text-base font-bold text-text-primary group-hover:text-gold-300 transition-colors truncate">
          {cracker.name}
        </h3>

        <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
          {cracker.tagline}
        </p>
      </div>
    </button>
  );
};

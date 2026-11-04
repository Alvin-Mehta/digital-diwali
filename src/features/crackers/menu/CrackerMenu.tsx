import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { CrackerDefinition } from '../types';
import { CrackerCard } from './CrackerCard';

interface CrackerMenuProps {
  crackers: CrackerDefinition[];
  selectedCracker: CrackerDefinition;
  onSelectCracker: (cracker: CrackerDefinition) => void;
  isIgniting: boolean;
}

export const CrackerMenu: React.FC<CrackerMenuProps> = ({
  crackers,
  selectedCracker,
  onSelectCracker,
  isIgniting,
}) => {
  return (
    <div className="w-full h-full flex flex-col glass-panel border-r border-gold-500/15 overflow-hidden">
      {/* Header Greeting */}
      <div className="p-4 border-b border-gold-500/15">
        <div className="flex items-center gap-2 mb-1">
          <Flame size={16} className="text-festive-orange animate-pulse" />
          <h2 className="font-festive text-base font-bold text-gold-400">
            Cracker Arsenal
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          Choose a digital firecracker to load onto your celebration stage.
        </p>
      </div>

      {/* Cracker Cards Scrollable List */}
      <div
        role="radiogroup"
        aria-label="Diwali Crackers Selection"
        className="flex-1 overflow-y-auto p-3.5 space-y-2.5"
      >
        {crackers.map((c) => (
          <CrackerCard
            key={c.id}
            cracker={c}
            isSelected={c.id === selectedCracker.id}
            onSelect={onSelectCracker}
            disabled={isIgniting}
          />
        ))}
      </div>

      {/* Safety & Eco-Friendly Banner */}
      <div className="p-3 bg-bg-surface/50 border-t border-gold-500/10 flex items-center gap-2 text-[11px] text-text-muted">
        <Sparkles size={14} className="text-emerald-400 shrink-0" />
        <span>100% Zero Pollution &bull; Safe for pets &amp; elderly</span>
      </div>
    </div>
  );
};


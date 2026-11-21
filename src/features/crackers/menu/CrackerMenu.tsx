import React, { useState, useMemo } from 'react';
import { Flame, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { CrackerDefinition } from '../types';
import { CrackerCard } from './CrackerCard';

interface CrackerMenuProps {
  crackers: CrackerDefinition[];
  selectedCracker: CrackerDefinition;
  onSelectCracker: (cracker: CrackerDefinition) => void;
  isIgniting: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onIgnite?: () => void;
}

type CategoryTab = 'all' | 'aerial' | 'fountain' | 'ground' | 'sound' | 'handheld';

interface CategoryFilterItem {
  id: CategoryTab;
  label: string;
}

const CATEGORY_TABS: CategoryFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'aerial', label: 'Aerial' },
  { id: 'fountain', label: 'Fountain' },
  { id: 'ground', label: 'Ground' },
  { id: 'sound', label: 'Sound' },
  { id: 'handheld', label: 'Sparkler' },
];

export const CrackerMenu: React.FC<CrackerMenuProps> = ({
  crackers,
  selectedCracker,
  onSelectCracker,
  isIgniting,
  isMuted = false,
  onToggleMute,
  onIgnite,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');

  // Filter crackers based on active segmented pill tab
  const filteredCrackers = useMemo(() => {
    if (activeTab === 'all') return crackers;
    return crackers.filter((c) => c.category === activeTab);
  }, [crackers, activeTab]);

  return (
    <div className="w-full h-full flex flex-col bg-[#090314]/90 backdrop-blur-2xl border-r border-white/[0.06] overflow-hidden select-none">
      {/* Studio Header (Apple / Samsung Flagship Aesthetic) */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent shrink-0">
        <div className="flex items-center justify-between mb-2">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-gold-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
              PYROTECHNIC ARSENAL
            </span>
          </div>

          {/* Gamified Live State Indicator */}
          {isIgniting ? (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-festive-orange/20 border border-festive-orange/40 text-festive-orange text-[10px] font-bold tracking-wider uppercase animate-pulse">
              <Flame size={11} />
              <span>DETONATING</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ARMED &bull; 5 READY</span>
            </div>
          )}
        </div>

        {/* Headline & Progress Counter */}
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-festive text-lg sm:text-xl font-black text-white tracking-wide">
            Cracker Studio
          </h2>
          <span className="text-xs font-mono text-gold-400 font-bold">
            0{crackers.findIndex((c) => c.id === selectedCracker.id) + 1} / 0{crackers.length}
          </span>
        </div>

        {/* Apple iOS / Samsung One UI Segmented Pill Filter */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1 px-2.5 rounded-xl text-[11px] font-semibold transition-all duration-200 whitespace-nowrap text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-400 to-amber-500 text-bg-deep font-bold shadow-md shadow-gold-500/20 scale-[1.02]'
                    : 'text-text-muted hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cracker Showcase Cards Stack */}
      <div
        role="radiogroup"
        aria-label="Diwali Crackers Selection"
        className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar"
      >
        {filteredCrackers.map((c) => (
          <CrackerCard
            key={c.id}
            cracker={c}
            isSelected={c.id === selectedCracker.id}
            onSelect={onSelectCracker}
            disabled={isIgniting}
          />
        ))}
      </div>

      {/* Bottom Studio Controller Dock (Screenshots 3 & 4) */}
      <div className="p-4 mx-3.5 mb-3.5 rounded-3xl bg-gradient-to-b from-[#180b33]/90 to-[#0e0420]/95 border border-white/[0.08] shadow-2xl flex flex-col gap-3 shrink-0">
        {/* Interactive Audio Synthesizer Switch (iOS/Samsung Style) */}
        {onToggleMute && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                  !isMuted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/[0.05] text-text-muted border border-white/10'
                }`}
              >
                {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  Audio Synthesizer
                </p>
                <p className="text-[10px] text-text-muted">
                  {!isMuted ? 'Live spatial sound active' : 'Audio muted'}
                </p>
              </div>
            </div>

            {/* iOS/Samsung Pill Toggle Switch */}
            <button
              onClick={onToggleMute}
              role="switch"
              aria-checked={!isMuted}
              aria-label="Toggle Audio SFX"
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center ${
                !isMuted ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  !isMuted ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        )}

        {/* Stage Armed Status & Quick Detonate Button */}
        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                STAGE ARMED
              </span>
              <span className="text-xs font-bold text-gold-300 truncate block">
                {selectedCracker.name}
              </span>
            </div>
          </div>

          {onIgnite && (
            <button
              onClick={onIgnite}
              disabled={isIgniting}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isIgniting
                  ? 'bg-festive-orange/30 text-festive-orange border border-festive-orange/40 cursor-not-allowed animate-pulse'
                  : 'bg-gradient-to-r from-gold-500 to-amber-600 text-bg-deep hover:brightness-110 shadow-festive'
              }`}
            >
              <Flame size={13} className={isIgniting ? 'animate-bounce' : ''} />
              <span>{isIgniting ? 'BURSTING' : 'IGNITE'}</span>
            </button>
          )}
        </div>

        {/* Eco & Safety Certification Bar */}
        <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck size={12} className="shrink-0" />
            <span>100% Zero Carbon &bull; Pet Safe</span>
          </div>
          <span className="font-mono text-text-dim text-[9px]">4K DIGITAL VFX</span>
        </div>
      </div>
    </div>
  );
};

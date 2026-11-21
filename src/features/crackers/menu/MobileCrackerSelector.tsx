import React, { useRef, useEffect, useState } from 'react';
import { ChevronUp, X, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { CrackerDefinition } from '../types';
import { CrackerCard } from './CrackerCard';

interface MobileCrackerSelectorProps {
  crackers: CrackerDefinition[];
  selectedCracker: CrackerDefinition;
  onSelectCracker: (cracker: CrackerDefinition) => void;
  isIgniting: boolean;
}

export const MobileCrackerSelector: React.FC<MobileCrackerSelectorProps> = ({
  crackers,
  selectedCracker,
  onSelectCracker,
  isIgniting,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll the selected cracker into view
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const selectedEl = scrollContainerRef.current.querySelector(
      `[data-cracker-id="${selectedCracker.id}"]`
    );
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedCracker.id]);

  return (
    <>
      {/* Floating Pill Dock on Mobile (Samsung/Apple Aesthetic) */}
      <div className="w-full bg-[#0b0417]/95 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 z-20">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-gold-400 uppercase">
              ARSENAL
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] font-mono text-text-muted">
              0{crackers.findIndex((c) => c.id === selectedCracker.id) + 1} / 0{crackers.length}
            </span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-[11px] text-gold-400 flex items-center gap-1 hover:text-gold-300 font-semibold py-0.5 px-2.5 rounded-full bg-white/[0.05] border border-white/10 active:scale-95 transition-all"
          >
            <span>All 5 Items</span>
            <ChevronUp size={12} />
          </button>
        </div>

        {/* Scrollable Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {crackers.map((c, idx) => {
            const isSelected = c.id === selectedCracker.id;
            const Thumb = c.ThumbnailComponent;
            return (
              <button
                key={c.id}
                data-cracker-id={c.id}
                onClick={() => onSelectCracker(c)}
                disabled={isIgniting}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-2xl border transition-all text-left select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500/20 via-[#22123f] to-[#120826] border-gold-400/90 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-gold-400/40'
                    : 'bg-[#150a2b]/70 border-white/[0.08] text-text-muted hover:border-gold-500/30'
                } ${isIgniting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#090314] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <Thumb isSelected={isSelected} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-bold text-text-dim">
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-xs font-bold leading-tight font-festive ${
                      isSelected ? 'text-gold-300' : 'text-white'
                    }`}
                  >
                    {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                  </span>
                  <span className="text-[9px] text-text-muted capitalize">
                    {c.category} &bull; {(c.durationMs / 1000).toFixed(1)}s
                  </span>
                </div>
                {isSelected && (
                  <Check size={13} className="text-gold-400 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full iOS/Apple Style Drawer / Bottom Sheet */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative z-10 w-full max-h-[85vh] flex flex-col rounded-t-[32px] bg-[#0c041c]/95 border-t border-white/[0.1] p-4 sm:p-5 shadow-2xl backdrop-blur-2xl">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Sparkles size={11} className="text-gold-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    CURATED ARSENAL
                  </span>
                </div>
                <h3 className="font-festive text-lg font-bold text-white">
                  Select Cracker
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-white bg-white/[0.05] border border-white/10"
                aria-label="Close drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cracker List in Drawer using CrackerCard */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-1 min-h-0 custom-scrollbar">
              {crackers.map((c) => (
                <CrackerCard
                  key={c.id}
                  cracker={c}
                  isSelected={c.id === selectedCracker.id}
                  onSelect={(selected) => {
                    onSelectCracker(selected);
                    setIsDrawerOpen(false);
                  }}
                  disabled={isIgniting}
                />
              ))}
            </div>

            {/* Eco Banner in Drawer */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck size={14} />
              <span>100% Zero Emission &bull; Virtual Celebration VFX</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

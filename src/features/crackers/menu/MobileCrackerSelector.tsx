import React, { useRef, useEffect, useState } from 'react';
import { ChevronUp, X, Sparkles, Check } from 'lucide-react';
import { CrackerDefinition } from '../types';
import { Badge } from '../../../components/ui/Badge';

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
      {/* Horizontal Carousel Bar (Sticky at bottom above action button or compact tray) */}
      <div className="w-full bg-bg-deep/90 backdrop-blur-md border-t border-gold-500/20 px-3 py-2 z-20">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider">
              Select Cracker
            </span>
            <span className="text-[10px] text-text-dim">
              ({crackers.findIndex((c) => c.id === selectedCracker.id) + 1}/{crackers.length})
            </span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-[11px] text-gold-400 flex items-center gap-0.5 hover:text-gold-300 font-semibold py-0.5 px-2 rounded-md bg-bg-surface border border-gold-500/20"
          >
            <span>Details</span>
            <ChevronUp size={12} />
          </button>
        </div>

        {/* Scrollable Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {crackers.map((c) => {
            const isSelected = c.id === selectedCracker.id;
            const Thumb = c.ThumbnailComponent;
            return (
              <button
                key={c.id}
                data-cracker-id={c.id}
                onClick={() => onSelectCracker(c)}
                disabled={isIgniting}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-left select-none ${
                  isSelected
                    ? 'bg-bg-elevated border-gold-400 ring-1 ring-gold-400 shadow-festive'
                    : 'bg-bg-surface/80 border-gold-500/15 text-text-muted hover:border-gold-500/40'
                } ${isIgniting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <div className="w-8 h-8 rounded-lg bg-bg-deep/80 flex items-center justify-center shrink-0">
                  <Thumb isSelected={isSelected} />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold leading-tight ${
                      isSelected ? 'text-gold-300' : 'text-text-primary'
                    }`}
                  >
                    {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                  </span>
                  <span className="text-[9px] text-text-dim capitalize">
                    {c.category}
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

      {/* Full Mobile Drawer / Bottom Sheet */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative z-10 w-full max-h-[80vh] flex flex-col rounded-t-3xl bg-bg-deep border-t border-gold-500/30 p-5 shadow-2xl animate-float-gentle">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-gold-500/30 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-festive text-lg font-bold text-gold-400">
                  Cracker Collection
                </h3>
                <p className="text-xs text-text-muted">
                  Choose a cracker to celebrate with
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-white bg-bg-surface border border-gold-500/20"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cracker List in Drawer */}
            <div className="overflow-y-auto space-y-2.5 pr-1">
              {crackers.map((c) => {
                const isSelected = c.id === selectedCracker.id;
                const Thumb = c.ThumbnailComponent;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCracker(c);
                      setIsDrawerOpen(false);
                    }}
                    disabled={isIgniting}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-bg-elevated border-gold-400 ring-1 ring-gold-400 shadow-festive'
                        : 'bg-bg-surface/70 border-gold-500/15 hover:bg-bg-surface'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-bg-deep/80 border border-gold-500/20 flex items-center justify-center shrink-0">
                      <Thumb isSelected={isSelected} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge variant="gold">{c.category}</Badge>
                        {c.hindiName && (
                          <span className="text-[10px] text-text-muted truncate">
                            {c.hindiName}
                          </span>
                        )}
                      </div>
                      <h4 className="font-festive text-sm font-bold text-text-primary truncate">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-text-muted line-clamp-1">
                        {c.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Eco Banner */}
            <div className="mt-4 pt-3 border-t border-gold-500/10 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400">
              <Sparkles size={13} />
              <span>100% Zero Pollution Digital Fireworks</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

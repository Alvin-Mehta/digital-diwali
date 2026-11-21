import React from 'react';
import { ArrowUpRight, Clock, Sparkles, Volume2, Check } from 'lucide-react';
import { CrackerDefinition } from '../types';

interface CrackerCardProps {
  cracker: CrackerDefinition;
  isSelected: boolean;
  onSelect: (cracker: CrackerDefinition) => void;
  disabled?: boolean;
}

interface CrackerVisualMeta {
  index: string;
  categoryTag: string;
  shortHindi: string;
  soundLabel: string;
  powerRating: number; // 1 to 5
  spotlightClass: string;
  borderHighlight: string;
  accentBadge: string;
}

const CRACKER_METAS: Record<string, CrackerVisualMeta> = {
  rocket: {
    index: '01',
    categoryTag: 'AERIAL ROCKET',
    shortHindi: 'आकाश बाण',
    soundLabel: 'Whoosh & Bang',
    powerRating: 4,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.35)_0%,rgba(239,68,68,0.1)_50%,transparent_75%)]',
    borderHighlight: 'group-hover:border-orange-500/50',
    accentBadge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  },
  'flower-pot': {
    index: '02',
    categoryTag: 'GOLDEN FOUNTAIN',
    shortHindi: 'शाही अनार',
    soundLabel: 'Golden Cascade',
    powerRating: 5,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.35)_0%,rgba(252,211,77,0.1)_50%,transparent_75%)]',
    borderHighlight: 'group-hover:border-gold-400/50',
    accentBadge: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
  },
  chakri: {
    index: '03',
    categoryTag: 'GROUND SPINNER',
    shortHindi: 'ज़मीन चकरी',
    soundLabel: 'Emerald Whir',
    powerRating: 3,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35)_0%,rgba(20,184,166,0.1)_50%,transparent_75%)]',
    borderHighlight: 'group-hover:border-emerald-400/50',
    accentBadge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  'sutli-bomb': {
    index: '04',
    categoryTag: 'SONIC DETONATOR',
    shortHindi: 'सुतली बम',
    soundLabel: 'Sonic Bass Boom',
    powerRating: 5,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35)_0%,rgba(153,27,27,0.15)_50%,transparent_75%)]',
    borderHighlight: 'group-hover:border-red-500/50',
    accentBadge: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
  phuljhadi: {
    index: '05',
    categoryTag: 'STARDUST SPARKLER',
    shortHindi: 'फूलझड़ी',
    soundLabel: 'Starry Crackle',
    powerRating: 2,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.35)_0%,rgba(168,85,247,0.1)_50%,transparent_75%)]',
    borderHighlight: 'group-hover:border-pink-400/50',
    accentBadge: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  },
};

export const CrackerCard: React.FC<CrackerCardProps> = ({
  cracker,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  const Thumb = cracker.ThumbnailComponent;
  const meta: CrackerVisualMeta = CRACKER_METAS[cracker.id] || {
    index: '00',
    categoryTag: cracker.category.toUpperCase(),
    shortHindi: cracker.hindiName || '',
    soundLabel: 'Festive Sound',
    powerRating: 3,
    spotlightClass: 'bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.25)_0%,transparent_70%)]',
    borderHighlight: 'group-hover:border-gold-400/50',
    accentBadge: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
  };

  const durationSec = (cracker.durationMs / 1000).toFixed(1);

  return (
    <button
      onClick={() => onSelect(cracker)}
      disabled={disabled}
      role="radio"
      aria-checked={isSelected}
      className={`group relative w-full text-left rounded-3xl p-4 transition-all duration-300 border flex flex-col gap-3 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-br from-gold-500/[0.18] via-[#1e0e38]/95 to-[#0e041e]/98 border-gold-400/90 shadow-[0_8px_32px_rgba(245,158,11,0.22)] ring-1 ring-gold-400/50'
          : 'bg-[#120726]/60 hover:bg-[#1a0c35]/85 border-white/[0.08] hover:border-gold-500/40 hover:shadow-xl hover:-translate-y-1'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}`}
    >
      {/* Top Specular Rim Light (Apple Hardware Chamfered Edge) */}
      <div
        className={`absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
        }`}
      />

      {/* Header Row: Index Pill, Category Tag & Circular Action Badge */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {/* Index Monospace Badge */}
          <span className="font-mono text-[10px] font-bold text-text-muted/60 tracking-wider">
            {meta.index}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          {/* Minimalist Category Pill */}
          <span className="text-[10px] font-extrabold tracking-widest text-text-muted group-hover:text-gold-300 uppercase transition-colors">
            {meta.categoryTag}
          </span>
          {meta.shortHindi && (
            <span className="text-[11px] text-text-muted/40 font-serif hidden xs:inline">
              • {meta.shortHindi}
            </span>
          )}
        </div>

        {/* Circular Action Badge (Inspired by Screenshot 1 & 3) */}
        {isSelected ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] font-black tracking-widest text-gold-300 uppercase px-2 py-0.5 rounded-full bg-gold-400/15 border border-gold-400/40 animate-pulse">
              ARMED
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 text-bg-deep flex items-center justify-center shadow-festive transition-transform group-hover:scale-110">
              <Check size={14} strokeWidth={3} />
            </div>
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 text-text-muted/60 group-hover:text-gold-300 group-hover:border-gold-500/40 group-hover:bg-gold-500/10 flex items-center justify-center transition-all duration-200 shrink-0 group-hover:scale-110">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Center Row: Hero Spotlight Pedestal & Typography */}
      <div className="flex items-center gap-4 w-full">
        {/* Showcase Pedestal Box */}
        <div
          className={`relative w-[76px] h-[76px] sm:w-[82px] sm:h-[82px] rounded-2xl bg-[#080214]/90 border border-white/[0.08] ${meta.borderHighlight} flex items-center justify-center shrink-0 overflow-hidden shadow-inner transition-colors duration-300`}
        >
          {/* Elemental Ambient Radial Spotlight */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${meta.spotlightClass} ${
              isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-90'
            }`}
          />
          {/* Top Glass Sheen */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Cracker Artwork with 3D hover float */}
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <Thumb isSelected={isSelected} />
          </div>
        </div>

        {/* Title, Hindi Name & Clean Tagline */}
        <div className="flex-1 min-w-0">
          <h3 className="font-festive text-base sm:text-lg font-bold text-white group-hover:text-gold-300 transition-colors leading-snug truncate">
            {cracker.name}
          </h3>
          <p className="text-xs text-text-muted/80 line-clamp-1 mt-0.5 font-sans leading-normal">
            {cracker.tagline}
          </p>

          {/* Gamified Specs Bar (Intensity Pips, Duration, Audio Signature) */}
          <div className="flex items-center gap-2.5 mt-2.5 text-[10px] text-text-muted/70 flex-wrap">
            {/* Power Level Pips */}
            <div className="flex items-center gap-1" title={`Detonation Power: ${meta.powerRating}/5`}>
              <span className="text-[9px] font-mono text-text-dim">PWR</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      lvl <= meta.powerRating
                        ? isSelected
                          ? 'bg-gold-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]'
                          : 'bg-gold-500/80'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>

            <span className="text-white/20">•</span>

            {/* Duration */}
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-gold-400/80" />
              <span className="font-medium text-text-secondary">{durationSec}s</span>
            </div>

            <span className="text-white/20">•</span>

            {/* Particle Sparks */}
            <div className="flex items-center gap-1">
              <Sparkles size={11} className="text-festive-orange" />
              <span>{cracker.particles.count}</span>
            </div>

            <span className="text-white/20 hidden xs:inline">•</span>

            {/* Audio Profile */}
            <div className="items-center gap-1 hidden xs:flex truncate">
              <Volume2 size={11} className="text-emerald-400/80 shrink-0" />
              <span className="truncate">{meta.soundLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

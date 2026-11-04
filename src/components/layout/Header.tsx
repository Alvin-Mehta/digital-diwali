import React from 'react';
import { Volume2, VolumeX, UserPlus, Users, Sparkles } from 'lucide-react';
import { DiyaIllustration } from '../ui/DiyaIllustration';
import { Button } from '../ui/Button';

interface HeaderProps {
  participantCount: number;
  maxParticipants: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenInviteModal: () => void;
  onOpenWelcome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  participantCount,
  maxParticipants,
  isMuted,
  onToggleMute,
  onOpenInviteModal,
  onOpenWelcome,
}) => {
  return (
    <header className="relative z-40 w-full border-b border-gold-500/15 glass-panel px-4 py-2.5 flex items-center justify-between">
      {/* Brand & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenWelcome}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          title="Replay Diwali Greeting"
        >
          <DiyaIllustration size={38} />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-festive text-lg md:text-xl font-bold text-gold-gradient tracking-wide">
                Digital Diwali
              </h1>
              <Sparkles size={14} className="text-gold-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-text-muted hidden sm:block">
              Virtual Celebration Playground
            </p>
          </div>
        </button>
      </div>

      {/* Center / Right Control Hub */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Participants Status Pill */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-surface border border-gold-500/20 text-xs text-text-secondary"
          title={`${participantCount} of ${maxParticipants} maximum participants connected`}
        >
          <Users size={13} className="text-gold-400" />
          <span className="font-semibold text-gold-300 tabular-nums">
            {participantCount}
          </span>
          <span className="text-text-dim text-[10px]">/ {maxParticipants}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
        </div>

        {/* Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2 rounded-xl bg-bg-surface border border-gold-500/20 text-text-secondary hover:text-gold-400 hover:border-gold-500/40 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX size={18} className="text-red-400" />
          ) : (
            <Volume2 size={18} className="text-gold-400" />
          )}
        </button>

        {/* Invite Friends Button */}
        <Button
          variant="primary"
          size="sm"
          icon={<UserPlus size={15} />}
          onClick={onOpenInviteModal}
          className="shadow-md"
        >
          <span className="hidden sm:inline">Invite Friends</span>
          <span className="sm:hidden">Invite</span>
        </Button>
      </div>
    </header>
  );
};


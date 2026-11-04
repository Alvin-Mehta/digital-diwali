import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { CrackerDefinition } from '../crackers/types';
import { CrackerEngine } from '../crackers/engine/CrackerEngine';
import { Button } from '../../components/ui/Button';
import { DiyaIllustration } from '../../components/ui/DiyaIllustration';
import { Participant } from '../../types';
import { Avatar } from '../../components/ui/Avatar';

interface CelebrationStageProps {
  cracker: CrackerDefinition;
  isIgniting: boolean;
  onIgnite: () => void;
  onAnimationComplete: () => void;
  isMuted: boolean;
  participants: Participant[];
  currentUserId?: string;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({
  cracker,
  isIgniting,
  onIgnite,
  onAnimationComplete,
  isMuted,
  participants,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-bg-deep via-bg-base to-bg-surface select-none">
      {/* Festive Background Lighting & Courtyard Floor */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky Ambient Nebula Glow */}
        <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-festive-orange/10 blur-3xl pointer-events-none" />

        {/* Floor Rangoli Ground Plane Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-bg-elevated/60 to-transparent border-t border-gold-500/10" />

        {/* Decorative Ground Courtyard Diyas */}
        <div className="absolute bottom-6 left-8 hidden sm:block">
          <DiyaIllustration size={48} />
        </div>
        <div className="absolute bottom-6 right-8 hidden sm:block">
          <DiyaIllustration size={48} />
        </div>
      </div>

      {/* Top Participant Status Strip */}
      <div className="relative z-20 w-full px-6 pt-4 flex items-center justify-between">
        {/* Active Cracker Title Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface/80 border border-gold-500/20 backdrop-blur-md">
          <Sparkles size={14} className="text-gold-400" />
          <span className="text-xs font-semibold text-gold-300">
            {cracker.name}
          </span>
        </div>

        {/* Participant Avatars Tray */}
        <div className="flex items-center gap-1.5 bg-bg-surface/80 px-2.5 py-1 rounded-full border border-gold-500/20 backdrop-blur-md">
          <span className="text-[11px] text-text-muted mr-1 hidden sm:inline">
            Celebrants:
          </span>
          <div className="flex -space-x-1.5">
            {participants.map((p) => (
              <Avatar
                key={p.id}
                name={p.name}
                isHost={p.isHost}
                size="sm"
                className="hover:z-10 transition-transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4">
        <CrackerEngine
          cracker={cracker}
          isIgniting={isIgniting}
          onAnimationComplete={onAnimationComplete}
          isMuted={isMuted}
        />
      </div>

      {/* Bottom Action Bar: "LIGHT THE CRACKER" */}
      <div className="relative z-30 w-full p-6 flex flex-col items-center justify-center bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent">
        <Button
          variant="festive"
          size="xl"
          icon={<Flame size={24} className={isIgniting ? 'animate-bounce' : 'animate-pulse'} />}
          onClick={onIgnite}
          disabled={isIgniting}
          className="min-w-[260px] sm:min-w-[320px] shadow-2xl py-4 text-base sm:text-lg font-black tracking-wider transition-all"
        >
          {isIgniting ? 'BURSTING IN PROGRESS...' : 'LIGHT THE CRACKER'}
        </Button>

        <p className="text-[11px] text-text-muted mt-2">
          {isIgniting
            ? 'Hold tight! Experiencing the synchronized detonation...'
            : 'Click to strike the match and ignite the fuse'}
        </p>
      </div>
    </div>
  );
};

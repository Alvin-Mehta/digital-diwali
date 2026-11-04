import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { NamasteHands } from './assets/NamasteHands';
import { DiyaIllustration } from '../../components/ui/DiyaIllustration';
import { FestiveLantern } from '../../components/layout/FestiveLantern';
import { MarigoldToran } from '../../components/layout/MarigoldToran';
import { Button } from '../../components/ui/Button';

interface WelcomeScreenProps {
  onDismiss: () => void;
  autoDismissSeconds?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onDismiss,
  autoDismissSeconds = 15,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(autoDismissSeconds);

  // 15-second countdown timer
  useEffect(() => {
    // Check user reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Shorter duration or instant dismiss
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDismiss]);

  const progressPercent = ((autoDismissSeconds - secondsRemaining) / autoDismissSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-bg-deep overflow-y-auto overflow-x-hidden select-none px-4 py-4 sm:py-6 min-h-[100dvh]">
      {/* Ambient Fireworks & Sparkles Dust in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-festive-orange/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-festive-pink/10 blur-3xl" />
      </div>

      {/* Top Hanging Toran Garland */}
      <div className="w-full absolute top-0 left-0 right-0 z-20">
        <MarigoldToran />
      </div>

      {/* Decorative Hanging Kandeel Lanterns */}
      <div className="absolute top-6 left-6 hidden md:block">
        <FestiveLantern size={48} color="#FF6B00" />
      </div>
      <div className="absolute top-6 right-6 hidden md:block">
        <FestiveLantern size={48} color="#F59E0B" />
      </div>

      {/* Top Countdown Bar & Skip Intro CTA */}
      <div className="w-full max-w-xl flex items-center justify-between mt-3 sm:mt-4 relative z-30">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Auto-entering in:</span>
          <span className="text-sm font-bold text-gold-300 tabular-nums">
            {secondsRemaining}s
          </span>
          {/* Circular / Line Progress */}
          <div className="w-20 sm:w-24 h-1.5 bg-bg-surface rounded-full overflow-hidden border border-gold-500/20">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-festive-orange transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface border border-gold-500/30 text-xs font-semibold text-gold-300 hover:text-white hover:border-gold-400 transition-colors active:scale-95"
        >
          <span>Skip Intro</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Centerpiece Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-3 sm:my-4 relative z-30 max-w-3xl">
        {/* Namaste Folded Hands Centerpiece with Divine Glow */}
        <div className="mb-3 sm:mb-6 transform hover:scale-105 transition-transform duration-500">
          <NamasteHands size={typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 230} />
        </div>

        {/* Flanking Festive Diyas */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-3 sm:mb-5">
          <DiyaIllustration size={42} className="sm:scale-125" />
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <DiyaIllustration size={42} className="sm:scale-125" />
        </div>

        {/* Festive Greetings Typography */}
        <h1 className="font-festive text-3xl sm:text-5xl md:text-6xl font-black text-festive-gradient tracking-wider drop-shadow-[0_4px_24px_rgba(245,158,11,0.5)] mb-2 sm:mb-3">
          HAPPY DIWALI
        </h1>

        <p className="font-sans text-lg sm:text-2xl font-semibold text-gold-300 tracking-wide drop-shadow-sm mb-2 sm:mb-4">
          Let’s make this Diwali Digital!
        </p>

        <p className="text-xs sm:text-base text-text-secondary max-w-md mx-auto mb-5 sm:mb-8 leading-relaxed px-2">
          Celebrate the Festival of Lights with eco-friendly digital crackers, realistic fireworks, synchronized sounds, and shared multiplayer rooms.
        </p>

        {/* Primary CTA */}
        <Button
          variant="festive"
          size="lg"
          icon={<Sparkles size={18} />}
          onClick={onDismiss}
          className="shadow-2xl text-bg-deep font-black px-6 py-3.5 sm:px-8 sm:py-4 sm:text-lg"
        >
          ENTER CELEBRATION
        </Button>
      </div>

      {/* Bottom Footer Note with Audio Hint */}
      <div className="relative z-30 flex items-center gap-2 text-[11px] sm:text-xs text-text-muted pb-1">
        <Volume2 size={13} className="text-gold-500 shrink-0" />
        <span>Click anywhere to activate festive sound effects</span>
      </div>
    </div>
  );
};


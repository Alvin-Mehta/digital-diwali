import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CrackerDefinition, CrackerAnimationPhase } from '../types';
import { ParticlePool } from '../../../utils/canvasUtils';
import { MatchstickRenderer } from './MatchstickRenderer';

interface CrackerEngineProps {
  cracker: CrackerDefinition;
  isIgniting: boolean;
  onAnimationComplete: () => void;
  isMuted: boolean;
}

export const CrackerEngine: React.FC<CrackerEngineProps> = ({
  cracker,
  isIgniting,
  onAnimationComplete,
  isMuted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poolRef = useRef<ParticlePool>(new ParticlePool(900));
  const [phase, setPhase] = useState<CrackerAnimationPhase>('idle');
  const [progress, setProgress] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Resize canvas to match display size
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  // Main animation frame loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      poolRef.current.updateAndRender(ctx);

      if (isRunning) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle ignition sequence state machine
  useEffect(() => {
    if (!isIgniting) {
      setPhase('idle');
      setProgress(0);
      poolRef.current.clear();
      return;
    }

    startTimeRef.current = Date.now();
    const duration = cracker.durationMs;
    const pool = poolRef.current;

    const matchAppearDuration = 450;
    const matchIgniteDuration = 300;
    const fuseBurnDuration = 800;
    const leadIn = matchAppearDuration + matchIgniteDuration + fuseBurnDuration; // ~1550ms
    const activeDuration = duration - leadIn;

    setPhase('match_appear');

    // Timer 1: Match strike
    const t1 = setTimeout(() => {
      setPhase('match_igniting');
      if (!isMuted) cracker.audioProfile.onMatchStrike();
    }, matchAppearDuration);

    // Timer 2: Fuse burning
    const t2 = setTimeout(() => {
      setPhase('fuse_burning');
      if (!isMuted) cracker.audioProfile.onFuseBurn();
    }, matchAppearDuration + matchIgniteDuration);

    // Interval for emitting sparks along fuse
    const fuseInterval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const originX = (canvas.width * cracker.fusePosition.x) / 100;
      const originY = (canvas.height * cracker.fusePosition.y) / 100;

      for (let i = 0; i < 4; i++) {
        pool.emit(originX, originY, {
          colors: ['#FFFBEB', '#FDE68A', '#F59E0B', '#FF6B00'],
          speedMin: 2,
          speedMax: 6,
          gravity: 0.1,
          sizeMin: 1.5,
          sizeMax: 3.5,
          lifeMin: 15,
          lifeMax: 30,
        });
      }
    }, 45);

    // Timer 3: Detonation / Eruption
    const t3 = setTimeout(() => {
      clearInterval(fuseInterval);
      setPhase('active');
      if (!isMuted) {
        if (cracker.audioProfile.onLaunch) cracker.audioProfile.onLaunch();
        cracker.audioProfile.onDetonate();
      }
    }, leadIn);

    // Dynamic particle emission during active and peak phases
    let activeInterval: NodeJS.Timeout | null = null;
    const tActiveEmit = setTimeout(() => {
      activeInterval = setInterval(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pConfig = cracker.particles;

        if (cracker.id === 'rocket') {
          // Smoke and tail trail while ascending
          const originX = canvas.width * 0.5;
          const originY = canvas.height * 0.7;
          pool.emit(originX, originY, {
            colors: ['#F59E0B', '#EF4444', '#78350F'],
            speedMin: 1,
            speedMax: 4,
            angleMin: 70,
            angleMax: 110,
            gravity: 0.05,
            sizeMin: 2,
            sizeMax: 5,
            lifeMin: 20,
            lifeMax: 40,
            shape: 'smoke',
          });
        } else if (cracker.id === 'flower-pot') {
          // Dense vertical fountain cone
          const originX = canvas.width * 0.5;
          const originY = canvas.height * 0.72;
          for (let i = 0; i < 18; i++) {
            pool.emit(originX, originY, {
              colors: pConfig.colors,
              speedMin: pConfig.speedMin,
              speedMax: pConfig.speedMax,
              angleMin: 235,
              angleMax: 305, // Upward cone
              gravity: pConfig.gravity,
              drag: pConfig.drag,
              sizeMin: pConfig.sizeMin,
              sizeMax: pConfig.sizeMax,
              lifeMin: pConfig.lifeMinMs / 16,
              lifeMax: pConfig.lifeMaxMs / 16,
              shape: 'spark',
            });
          }
        } else if (cracker.id === 'chakri') {
          // Circular 360 centrifugal emission
          const originX = canvas.width * 0.5;
          const originY = canvas.height * 0.82;
          for (let i = 0; i < 14; i++) {
            pool.emit(originX, originY, {
              colors: pConfig.colors,
              speedMin: pConfig.speedMin,
              speedMax: pConfig.speedMax,
              angleMin: 0,
              angleMax: 360,
              gravity: pConfig.gravity,
              drag: pConfig.drag,
              sizeMin: pConfig.sizeMin,
              sizeMax: pConfig.sizeMax,
              lifeMin: pConfig.lifeMinMs / 16,
              lifeMax: pConfig.lifeMaxMs / 16,
              shape: 'spark',
            });
          }
        } else if (cracker.id === 'phuljhadi') {
          // Handheld branching sparkling
          const originX = canvas.width * 0.5;
          const originY = canvas.height * 0.45;
          for (let i = 0; i < 12; i++) {
            pool.emit(originX, originY, {
              colors: pConfig.colors,
              speedMin: pConfig.speedMin,
              speedMax: pConfig.speedMax,
              angleMin: 0,
              angleMax: 360,
              gravity: pConfig.gravity,
              drag: pConfig.drag,
              sizeMin: pConfig.sizeMin,
              sizeMax: pConfig.sizeMax,
              lifeMin: pConfig.lifeMinMs / 16,
              lifeMax: pConfig.lifeMaxMs / 16,
              shape: 'spark',
            });
          }
        }
      }, 35);
    }, leadIn);

    // Climax burst for rocket and sutli bomb
    const tBurst = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (cracker.id === 'rocket') {
        // High altitude radial firework explosion
        const burstX = canvas.width * 0.5;
        const burstY = canvas.height * 0.22;
        for (let i = 0; i < 240; i++) {
          pool.emit(burstX, burstY, {
            colors: cracker.particles.colors,
            speedMin: 3,
            speedMax: 14,
            angleMin: 0,
            angleMax: 360,
            gravity: 0.1,
            drag: 0.96,
            sizeMin: 2,
            sizeMax: 5,
            lifeMin: 45,
            lifeMax: 90,
            shape: 'spark',
          });
        }
      } else if (cracker.id === 'sutli-bomb') {
        // Massive ground concussive blast
        const burstX = canvas.width * 0.5;
        const burstY = canvas.height * 0.8;
        for (let i = 0; i < 220; i++) {
          pool.emit(burstX, burstY, {
            colors: ['#FFFBEB', '#F59E0B', '#EF4444', '#DC2626', '#4B5563'],
            speedMin: 6,
            speedMax: 20,
            angleMin: 0,
            angleMax: 360,
            gravity: 0.2,
            drag: 0.94,
            sizeMin: 3,
            sizeMax: 7,
            lifeMin: 30,
            lifeMax: 70,
            shape: 'spark',
          });
        }
      }
    }, leadIn + (cracker.id === 'rocket' ? 950 : 250));

    // Progress update loop
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(1, Math.max(0, (elapsed - leadIn) / activeDuration));
      setProgress(p);

      if (p >= 0.85) {
        setPhase('decay');
      } else if (p >= 0.5) {
        setPhase('peak');
      }
    }, 25);

    // Completion Timer
    const tEnd = setTimeout(() => {
      clearInterval(fuseInterval);
      clearInterval(progressTimer);
      if (activeInterval) clearInterval(activeInterval);

      setPhase('completed');
      setTimeout(() => {
        setPhase('idle');
        pool.clear();
        onAnimationComplete();
      }, 400);
    }, duration);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tBurst);
      clearTimeout(tActiveEmit);
      clearTimeout(tEnd);
      clearInterval(fuseInterval);
      clearInterval(progressTimer);
      if (activeInterval) clearInterval(activeInterval);
    };
  }, [isIgniting, cracker, isMuted, onAnimationComplete]);

  const StageComp = cracker.StageComponent;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Canvas for Spark & Smoke Particle Simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
      />

      {/* Cracker Stage Visual SVG Component */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <StageComp
          phase={phase}
          progress={progress}
          isMuted={isMuted}
        />
      </div>

      {/* Animated Matchstick Arrival & Flame Strike */}
      <MatchstickRenderer
        phase={phase}
        targetX={cracker.fusePosition.x}
        targetY={cracker.fusePosition.y}
      />
    </div>
  );
};

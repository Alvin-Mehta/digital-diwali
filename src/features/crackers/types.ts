import React from 'react';
import { CrackerCategory } from '../../types';

export type CrackerAnimationPhase =
  | 'idle'
  | 'match_appear'
  | 'match_igniting'
  | 'fuse_burning'
  | 'active'
  | 'peak'
  | 'decay'
  | 'completed';

export interface ParticleConfig {
  count: number;
  colors: string[];
  speedMin: number;
  speedMax: number;
  gravity: number;
  drag: number;
  lifeMinMs: number;
  lifeMaxMs: number;
  sizeMin: number;
  sizeMax: number;
  glow?: boolean;
  shape?: 'circle' | 'star' | 'spark' | 'smoke';
}

export interface CrackerConfig {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  description: string;
  category: CrackerCategory;
  durationMs: number;
  fusePosition: {
    // Relative coordinates in percent (0 - 100) on the cracker container
    x: number;
    y: number;
  };
  particles: ParticleConfig;
}

export interface CrackerStageProps {
  phase: CrackerAnimationPhase;
  progress: number; // 0.0 to 1.0
  isMuted: boolean;
  onFuseBurn?: () => void;
  onDetonate?: () => void;
}

export interface CrackerThumbnailProps {
  className?: string;
  isSelected?: boolean;
}

export interface ICrackerAudioProfile {
  onMatchStrike: () => void;
  onFuseBurn: () => void;
  onLaunch?: () => void;
  onDetonate: () => void;
  onDecay?: () => void;
  cleanup?: () => void;
}

export interface CrackerDefinition extends CrackerConfig {
  ThumbnailComponent: React.FC<CrackerThumbnailProps>;
  StageComponent: React.FC<CrackerStageProps>;
  audioProfile: ICrackerAudioProfile;
  createParticles?: (
    canvas: HTMLCanvasElement,
    originX: number,
    originY: number,
    phase: CrackerAnimationPhase
  ) => void;
}


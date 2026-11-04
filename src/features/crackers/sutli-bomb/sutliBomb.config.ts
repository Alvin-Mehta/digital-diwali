import { CrackerConfig } from '../types';

export const sutliBombConfig: CrackerConfig = {
  id: 'sutli-bomb',
  name: 'Thunder Sutli Bomb',
  hindiName: 'थंडर सुतली बम (धमाका)',
  tagline: 'High-impact explosive boom with dramatic flash and screen-shake',
  description: 'The heavyweight king of traditional Diwali sound crackers. Tightly hand-wound in green biodegradable jute rope twine. Generates intense suspense as the fuse fizzes down, culminating in an earth-shattering boom and billowing smoke plume.',
  category: 'sound',
  durationMs: 3800,
  fusePosition: {
    x: 50,
    y: 18, // Top fuse cord
  },
  particles: {
    count: 280,
    colors: ['#FFFBEB', '#F59E0B', '#EF4444', '#DC2626', '#78350F', '#6B7280'],
    speedMin: 6,
    speedMax: 20,
    gravity: 0.22,
    drag: 0.94,
    lifeMinMs: 30,
    lifeMaxMs: 65,
    sizeMin: 3,
    sizeMax: 8,
    glow: true,
    shape: 'spark',
  },
};


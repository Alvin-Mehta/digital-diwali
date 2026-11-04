import { CrackerConfig } from '../types';

export const chakriConfig: CrackerConfig = {
  id: 'chakri',
  name: 'Zameen Chakri (Ground Spinner)',
  hindiName: 'ज़मीन चकरी (फिरकी)',
  tagline: 'High-speed spinning wheel casting radiant circular rings',
  description: 'A circular ground wheel tightly coiled with pyrotechnic mixture. When lighted, centrifugal force sends it spinning furiously across the floor, spewing vibrant concentric circles of white-hot and emerald sparks.',
  category: 'ground',
  durationMs: 4400,
  fusePosition: {
    x: 75,
    y: 35, // Outer ring fuse
  },
  particles: {
    count: 380,
    colors: ['#FFFBEB', '#FCD34D', '#10B981', '#14B8A6', '#F59E0B', '#EF4444', '#EC4899'],
    speedMin: 4,
    speedMax: 15,
    gravity: 0.05,
    drag: 0.95,
    lifeMinMs: 25,
    lifeMaxMs: 60,
    sizeMin: 1.5,
    sizeMax: 4,
    glow: true,
    shape: 'spark',
  },
};


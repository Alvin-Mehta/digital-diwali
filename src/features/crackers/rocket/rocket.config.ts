import { CrackerConfig } from '../types';

export const rocketConfig: CrackerConfig = {
  id: 'rocket',
  name: 'Aakash Baan Rocket',
  hindiName: 'आकाश बाण रॉकेट',
  tagline: 'High-altitude soaring rocket with radiant firework bursts',
  description: 'A traditional festival rocket mounted on a slender bamboo stick. Ignites with a hiss, whooshes high into the night sky, and bursts into a shower of golden glitter and colored stars.',
  category: 'aerial',
  durationMs: 4200,
  fusePosition: {
    x: 50,
    y: 82, // Fuse is near the base of the rocket cylinder
  },
  particles: {
    count: 320,
    colors: ['#FCD34D', '#F59E0B', '#FF6B00', '#EF4444', '#EC4899', '#10B981', '#FFFBEB'],
    speedMin: 4,
    speedMax: 14,
    gravity: 0.12,
    drag: 0.97,
    lifeMinMs: 40,
    lifeMaxMs: 85,
    sizeMin: 2,
    sizeMax: 5,
    glow: true,
    shape: 'spark',
  },
};


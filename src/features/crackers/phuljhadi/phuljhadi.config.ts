import { CrackerConfig } from '../types';

export const phuljhadiConfig: CrackerConfig = {
  id: 'phuljhadi',
  name: 'Golden Phuljhadi (Sparkler)',
  hindiName: 'स्वर्ण फूलझड़ी (फुलझड़ी)',
  tagline: 'Handheld handheld sparkler sparkling with continuous starry embers',
  description: 'The gentlest, most nostalgic celebratory sparkler. Held in hand, it radiates branching dendritic stars in gleaming gold, silver, and crimson hues with joyful rhythmic crackles.',
  category: 'handheld',
  durationMs: 5000,
  fusePosition: {
    x: 50,
    y: 12, // Tip of the coated chemical body
  },
  particles: {
    count: 360,
    colors: ['#FFFBEB', '#FDE68A', '#FCD34D', '#F59E0B', '#FF6B00', '#EC4899', '#A855F7'],
    speedMin: 2,
    speedMax: 10,
    gravity: 0.08,
    drag: 0.96,
    lifeMinMs: 30,
    lifeMaxMs: 70,
    sizeMin: 1.5,
    sizeMax: 4,
    glow: true,
    shape: 'spark',
  },
};


import { CrackerConfig } from '../types';

export const flowerPotConfig: CrackerConfig = {
  id: 'flower-pot',
  name: 'Royal Anar (Flower Pot)',
  hindiName: 'शाही अनार (फूलझड़ी गमला)',
  tagline: 'Fountain of sparkling golden and multicolor cascades',
  description: 'A traditional terracotta cone packed with fine metal powders. Upon lighting, it erupts into an ascending volcanic fountain of brilliant golden sparks, silver glitter, and color stars reaching up to 10 feet high.',
  category: 'fountain',
  durationMs: 4600,
  fusePosition: {
    x: 50,
    y: 20, // Top peak of the cone
  },
  particles: {
    count: 450,
    colors: ['#FFFBEB', '#FDE68A', '#FCD34D', '#F59E0B', '#FF6B00', '#EF4444', '#EC4899'],
    speedMin: 5,
    speedMax: 16,
    gravity: 0.18,
    drag: 0.96,
    lifeMinMs: 35,
    lifeMaxMs: 75,
    sizeMin: 2,
    sizeMax: 4.5,
    glow: true,
    shape: 'spark',
  },
};


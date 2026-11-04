import { CrackerDefinition } from './types';
import { rocketCracker } from './rocket';
import { flowerPotCracker } from './flower-pot';
import { chakriCracker } from './chakri';
import { sutliBombCracker } from './sutli-bomb';
import { phuljhadiCracker } from './phuljhadi';

export const crackerRegistry: CrackerDefinition[] = [
  rocketCracker,
  flowerPotCracker,
  chakriCracker,
  sutliBombCracker,
  phuljhadiCracker,
];

export function getCrackerById(id: string): CrackerDefinition | undefined {
  return crackerRegistry.find((c) => c.id === id);
}

export function getDefaultCracker(): CrackerDefinition {
  return crackerRegistry[0];
}


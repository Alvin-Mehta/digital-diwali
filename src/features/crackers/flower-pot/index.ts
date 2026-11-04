import { CrackerDefinition } from '../types';
import { flowerPotConfig } from './flowerPot.config';
import { flowerPotAudio } from './flowerPot.audio';
import { FlowerPotCracker, FlowerPotThumbnail } from './FlowerPotCracker';

export const flowerPotCracker: CrackerDefinition = {
  ...flowerPotConfig,
  ThumbnailComponent: FlowerPotThumbnail,
  StageComponent: FlowerPotCracker,
  audioProfile: flowerPotAudio,
};


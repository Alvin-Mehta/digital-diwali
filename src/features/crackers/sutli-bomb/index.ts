import { CrackerDefinition } from '../types';
import { sutliBombConfig } from './sutliBomb.config';
import { sutliBombAudio } from './sutliBomb.audio';
import { SutliBombCracker, SutliBombThumbnail } from './SutliBombCracker';

export const sutliBombCracker: CrackerDefinition = {
  ...sutliBombConfig,
  ThumbnailComponent: SutliBombThumbnail,
  StageComponent: SutliBombCracker,
  audioProfile: sutliBombAudio,
};


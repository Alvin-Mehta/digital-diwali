import { CrackerDefinition } from '../types';
import { phuljhadiConfig } from './phuljhadi.config';
import { phuljhadiAudio } from './phuljhadi.audio';
import { PhuljhadiCracker, PhuljhadiThumbnail } from './PhuljhadiCracker';

export const phuljhadiCracker: CrackerDefinition = {
  ...phuljhadiConfig,
  ThumbnailComponent: PhuljhadiThumbnail,
  StageComponent: PhuljhadiCracker,
  audioProfile: phuljhadiAudio,
};


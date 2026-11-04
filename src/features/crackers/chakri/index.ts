import { CrackerDefinition } from '../types';
import { chakriConfig } from './chakri.config';
import { chakriAudio } from './chakri.audio';
import { ChakriCracker, ChakriThumbnail } from './ChakriCracker';

export const chakriCracker: CrackerDefinition = {
  ...chakriConfig,
  ThumbnailComponent: ChakriThumbnail,
  StageComponent: ChakriCracker,
  audioProfile: chakriAudio,
};


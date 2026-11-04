import { CrackerDefinition } from '../types';
import { rocketConfig } from './rocket.config';
import { rocketAudio } from './rocket.audio';
import { RocketCracker, RocketThumbnail } from './RocketCracker';

export const rocketCracker: CrackerDefinition = {
  ...rocketConfig,
  ThumbnailComponent: RocketThumbnail,
  StageComponent: RocketCracker,
  audioProfile: rocketAudio,
};


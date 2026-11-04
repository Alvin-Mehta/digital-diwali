import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const rocketAudio: ICrackerAudioProfile = {
  onMatchStrike: () => {
    audioManager.playMatchStrike();
  },
  onFuseBurn: () => {
    audioManager.playFuseBurn(800);
  },
  onLaunch: () => {
    audioManager.playRocketLaunch();
  },
  onDetonate: () => {
    audioManager.playFireworkBurst();
  },
};


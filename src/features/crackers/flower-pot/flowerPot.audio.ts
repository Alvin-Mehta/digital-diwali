import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const flowerPotAudio: ICrackerAudioProfile = {
  onMatchStrike: () => {
    audioManager.playMatchStrike();
  },
  onFuseBurn: () => {
    audioManager.playFuseBurn(800);
  },
  onDetonate: () => {
    audioManager.playAnarFountain(3500);
  },
};


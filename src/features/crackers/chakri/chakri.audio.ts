import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const chakriAudio: ICrackerAudioProfile = {
  onMatchStrike: () => {
    audioManager.playMatchStrike();
  },
  onFuseBurn: () => {
    audioManager.playFuseBurn(800);
  },
  onDetonate: () => {
    audioManager.playChakriSpin(3600);
  },
};


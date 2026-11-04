import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const phuljhadiAudio: ICrackerAudioProfile = {
  onMatchStrike: () => {
    audioManager.playMatchStrike();
  },
  onFuseBurn: () => {
    audioManager.playFuseBurn(600);
  },
  onDetonate: () => {
    audioManager.playPhuljhadiSizzle(4200);
  },
};


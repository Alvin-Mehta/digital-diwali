import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const sutliBombAudio: ICrackerAudioProfile = {
  onMatchStrike: () => {
    audioManager.playMatchStrike();
  },
  onFuseBurn: () => {
    audioManager.playFuseBurn(1000);
  },
  onDetonate: () => {
    audioManager.playBombDetonate();
  },
};


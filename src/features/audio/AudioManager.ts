import { audioSynthesizer } from './AudioSynthesizer';

class AudioManager {
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('digital_diwali_muted');
      this.isMuted = saved === 'true';
      audioSynthesizer.setMuted(this.isMuted);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    audioSynthesizer.setMuted(this.isMuted);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('digital_diwali_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    audioSynthesizer.setMuted(muted);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('digital_diwali_muted', String(muted));
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Common Cracker Audio Cues
  public playMatchStrike(): void {
    audioSynthesizer.playMatchStrike();
  }

  public playFuseBurn(durationMs: number = 800): void {
    audioSynthesizer.playFuseBurn(durationMs);
  }

  // Cracker-specific cues
  public playRocketLaunch(): void {
    audioSynthesizer.playRocketLaunch();
  }

  public playFireworkBurst(): void {
    audioSynthesizer.playFireworkBurst();
  }

  public playAnarFountain(durationMs: number = 3200): void {
    audioSynthesizer.playAnarFountain(durationMs);
  }

  public playChakriSpin(durationMs: number = 3500): void {
    audioSynthesizer.playChakriSpin(durationMs);
  }

  public playBombDetonate(): void {
    audioSynthesizer.playBombDetonate();
  }

  public playPhuljhadiSizzle(durationMs: number = 4000): void {
    audioSynthesizer.playPhuljhadiSizzle(durationMs);
  }
}

export const audioManager = new AudioManager();


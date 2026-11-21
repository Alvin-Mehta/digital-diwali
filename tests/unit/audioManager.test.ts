import { describe, it, expect, beforeEach } from 'vitest';
import { audioManager } from '../../src/features/audio/AudioManager';

describe('AudioManager Subsystem', () => {
  beforeEach(() => {
    audioManager.setMuted(false);
  });

  it('should toggle mute state cleanly', () => {
    expect(audioManager.getMuted()).toBe(false);
    const muted = audioManager.toggleMute();
    expect(muted).toBe(true);
    expect(audioManager.getMuted()).toBe(true);

    const unmuted = audioManager.toggleMute();
    expect(unmuted).toBe(false);
    expect(audioManager.getMuted()).toBe(false);
  });

  it('should expose audio triggers without throwing errors', () => {
    expect(() => audioManager.playMatchStrike()).not.toThrow();
    expect(() => audioManager.playFuseBurn(500)).not.toThrow();
    expect(() => audioManager.playRocketLaunch()).not.toThrow();
    expect(() => audioManager.playFireworkBurst()).not.toThrow();
    expect(() => audioManager.playAnarFountain(1000)).not.toThrow();
    expect(() => audioManager.playChakriSpin(1000)).not.toThrow();
    expect(() => audioManager.playBombDetonate()).not.toThrow();
    expect(() => audioManager.playPhuljhadiSizzle(1000)).not.toThrow();
    expect(() => audioManager.playNamasteChime()).not.toThrow();
    expect(() => audioManager.playDiyaIgnite()).not.toThrow();
    expect(() => audioManager.playFairyTwinkle()).not.toThrow();
  });
});


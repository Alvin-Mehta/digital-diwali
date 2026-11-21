// Procedural Web Audio API Sound Synthesizer
// Generates realistic firecracker soundscapes entirely in browser without external dependencies.

export class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.7;
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Helper: Creates a buffer of white noise
   */
  private createNoiseBuffer(durationSeconds: number): AudioBuffer | null {
    const ctx = this.initContext();
    if (!ctx) return null;

    const bufferSize = ctx.sampleRate * durationSeconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Matchstick strike sound: Crisp friction scratch
   */
  public playMatchStrike(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const noiseBuffer = this.createNoiseBuffer(0.2);
    if (!noiseBuffer) return;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Bandpass filter centered at 2.5 kHz
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2500, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.2);
  }

  /**
   * Fuse burning sound: Fizzing sulfur crackle
   */
  public playFuseBurn(durationMs: number = 800): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const durationSec = durationMs / 1000;
    const noiseBuffer = this.createNoiseBuffer(durationSec);
    if (!noiseBuffer) return;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Highpass filter for fizzing sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, ctx.currentTime);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.setValueAtTime(0.25, now + durationSec - 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + durationSec);
  }

  /**
   * Rocket Launch: Ascending whistle + whoosh
   */
  public playRocketLaunch(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.85);

    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.35, now + 0.2);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.85);

    // Filtered noise for rocket exhaust whoosh
    const noiseBuffer = this.createNoiseBuffer(0.85);
    if (noiseBuffer) {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1800, now + 0.85);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.1, now);
      noiseGain.gain.linearRampToValueAtTime(0.4, now + 0.3);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.85);
    }
  }

  /**
   * Rocket / Firework Detonation: Deep thump followed by glittering crackles
   */
  public playFireworkBurst(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;

    // Sub-bass thump
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);

    // Sparkle trail noise
    const noiseBuffer = this.createNoiseBuffer(1.4);
    if (noiseBuffer) {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2000, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now + 0.05);
      noise.stop(now + 1.4);
    }
  }

  /**
   * Flower Pot (Anar) Fountain: Swelling crackling sound
   */
  public playAnarFountain(durationMs: number = 3200): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const durationSec = durationMs / 1000;
    const noiseBuffer = this.createNoiseBuffer(durationSec);
    if (!noiseBuffer) return;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.linearRampToValueAtTime(3600, now + durationSec * 0.7);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.55, now + durationSec * 0.5); // Peak fountain
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + durationSec);
  }

  /**
   * Chakri (Ground Spinner): Whirring, accelerating, and decelerating pitch
   */
  public playChakriSpin(durationMs: number = 3500): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const durationSec = durationMs / 1000;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';

    // Accelerate then decelerate
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(480, now + durationSec * 0.45);
    osc.frequency.exponentialRampToValueAtTime(80, now + durationSec);

    oscGain.gain.setValueAtTime(0.05, now);
    oscGain.gain.linearRampToValueAtTime(0.35, now + durationSec * 0.4);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + durationSec);
  }

  /**
   * Sutli Bomb: Suspense pause and massive heavy blast wave
   */
  public playBombDetonate(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;

    // Ultra-low sub-frequency chest punch
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.8);

    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + 0.8);

    // Shockwave transient crack
    const noiseBuffer = this.createNoiseBuffer(0.9);
    if (noiseBuffer) {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.9);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.9, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.9);
    }
  }

  /**
   * Phuljhadi (Hand Sparkler): Continuous sparkling sizzle
   */
  public playPhuljhadiSizzle(durationMs: number = 4000): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const durationSec = durationMs / 1000;
    const noiseBuffer = this.createNoiseBuffer(durationSec);
    if (!noiseBuffer) return;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(4500, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
    gain.gain.setValueAtTime(0.28, now + durationSec - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + durationSec);
  }

  /**
   * Welcome Sequence: Sacred Divine Chime when Namaste hands join
   * Warm harmonic resonant bell / singing bowl chord (C#5, G#5, C#6)
   */
  public playNamasteChime(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    // Harmonic frequencies in Raag Yaman fifths: 554.37 (C#5), 830.61 (G#5), 1108.73 (C#6)
    const freqs = [554.37, 830.61, 1108.73];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      const peakGain = 0.22 / (idx + 1);
      oscGain.gain.setValueAtTime(0.001, now + idx * 0.04);
      oscGain.gain.linearRampToValueAtTime(peakGain, now + idx * 0.04 + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain!);

      osc.start(now + idx * 0.04);
      osc.stop(now + 2.8);
    });
  }

  /**
   * Welcome Sequence: Soft warm ignition flame puff when a Diya lights up
   */
  public playDiyaIgnite(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    oscGain.gain.setValueAtTime(0.001, now);
    oscGain.gain.linearRampToValueAtTime(0.12, now + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Welcome Sequence: Subtle celestial sparkle for fairy lights
   */
  public playFairyTwinkle(): void {
    const ctx = this.initContext();
    if (!ctx || !this.masterGain || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    const randFreq = 1400 + Math.random() * 600;
    osc.frequency.setValueAtTime(randFreq, now);

    oscGain.gain.setValueAtTime(0.001, now);
    oscGain.gain.linearRampToValueAtTime(0.06, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }
}

export const audioSynthesizer = new AudioSynthesizer();


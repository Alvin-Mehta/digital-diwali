# Audio Architecture & Procedural Sound Synthesis

## 1. Design Philosophy

Sound is fundamental to the emotional experience of Diwali. Hearing the fizzing of a sulfur fuse, the whistle of a climbing rocket, the crackle of a phuljhadi sparkler, or the reverberant boom of a sutli bomb delivers the visceral joy of celebration.

Rather than relying purely on external MP3 audio files—which can fail due to network drops, latency, CORS issues, or missing files—**Digital Diwali implements an advanced hybrid audio engine**:
1. **Procedural Web Audio API Synthesizers:** Generate authentic, low-latency, dynamic sound waves entirely in-browser using mathematical oscillators, noise generators, biquad filters, and gain envelopes.
2. **Audio Buffer Cache (Preloaded Audio):** Supports sampled recordings when available.
3. **Graceful Zero-Crash Fallback:** If audio fails or is muted by the user, the visual simulation runs uninterrupted.

---

## 2. Web Audio Synthesizer Specifications

### 2.1 Matchstick Strike
- **Mechanism:** A 0.15s burst of band-pass filtered white noise (center frequency 2.4 kHz, Q = 2.0) with an immediate linear attack and exponential decay.
- **Audio Profile:** Crisp, raspy friction scratch.

### 2.2 Fuse Burning
- **Mechanism:** Continuous looping noise with randomized high-frequency pops.
- **Audio Profile:** High-pass filter (3 kHz), rapid intermittent gain spikes (every 40-70ms), mimicking sparking sulfur.

### 2.3 Rocket
- **Ignition & Lift-off:** Low-pass filtered noise with increasing cutoff (200 Hz -> 1200 Hz) combined with a sine oscillator gliding from 300 Hz to 1200 Hz with exponential gain curve (whoosh/whistle).
- **Burst / Detonation:** Instant high-impact impulse (low sine wave 80 Hz decaying to 30 Hz with sub-bass distortion), followed by a 1.8s wash of crackling white noise simulating cascading glitter stars.

### 2.4 Flower Pot (Anar)
- **Fountain Crackle:** Cascading multi-band noise filters (1 kHz, 3 kHz, 6 kHz) pulsing with variable intensity, swelling from low amplitude to full crescendo over 2.5s, then fading out smoothly over 1s.

### 2.5 Chakri (Ground Wheel)
- **Whirring & Spin:** Fast Frequency Modulation (FM) oscillator (carrier 180 Hz, modulator 40 Hz) paired with pink noise. Cutoff and gain track rotational velocity (revving up to 450 Hz, then decelerating).

### 2.6 Sutli Bomb
- **Suspense Pause:** 0.6s near-silence following the fuse burnout.
- **Detonation:** Dual-stage blast:
  - Stage 1: Ultra-fast attack (2ms), high-energy transient clip.
  - Stage 2: Deep 50 Hz sub-bass sine wave with exponential decay over 1.4s, simulating acoustic room pressure and reverberant echo.

### 2.7 Phuljhadi (Hand Sparkler)
- **Sizzle:** High-frequency sparkling texture using twin parallel band-pass filters (4.5 kHz and 8 kHz) with stochastic micro-clicks (random pulses at 25-40 Hz).

---

## 3. Autoplay Compliance & Volume Policy

- Modern browsers (Chrome, Safari, Firefox) restrict audio autoplay until an explicit user interaction occurs.
- The `AudioManager` initializes the `AudioContext` in `suspended` state.
- On any interaction (e.g. clicking "Enter Celebration", "Skip Intro", or selecting a cracker), `audioContext.resume()` is triggered.
- A global mute button in the header allows users to instantly silence all sound. Volume preferences are preserved in `sessionStorage`.


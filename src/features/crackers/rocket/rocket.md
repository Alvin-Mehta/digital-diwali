# Cracker Documentation: Aakash Baan Rocket

## 1. Overview
The Aakash Baan Rocket is a classic aerial firecracker mounted on a wooden stabilization rod. It ascends rapidly into the sky leaving a glowing smoke trail before detonating into an expansive multi-color firework bloom.

## 2. Animation Phases
1. **Idle:** Rocket rests in its bottle/stand on the celebration stage.
2. **Ignite:** Matchstick touches the bottom fuse.
3. **Fuse Burning:** Embers sizzle along the fuse cord.
4. **Ascent:** Rocket accelerates vertically toward the top boundary (`translateY` goes from 0 to -420px). Exhaust flame emits behind it.
5. **Peak Detonation:** Rocket body disappears as radial Canvas particles burst in 360-degree glittering streams.
6. **Decay:** Particles drift with gravity and drag, fading into soft smoke embers.

## 3. Audio Choreography
- Match strike: Friction scratch (2.5 kHz).
- Fuse: High-frequency sulfur fizz (800ms).
- Launch: Ascending whistle sweep (280 Hz -> 1400 Hz) + exhaust noise.
- Detonation: Sub-bass boom (160 Hz -> 30 Hz) + cascading glitter sparkle wash.


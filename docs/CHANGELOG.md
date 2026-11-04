# Changelog

All notable changes to the **Digital Diwali** platform will be documented in this file.

---

## [1.0.0] - Initial Production Release

### Added
- **Welcome Screen:** 15-second intro with Namaste folded hands SVG illustration, diya flames, festive typography, circular progress bar, and "Skip Intro" button.
- **Two-Column Festive Layout:** 30% left-hand Cracker Selection Menu and 70% right-hand Celebration Stage.
- **Centralized Cracker Engine:** Deterministic state machine coordinating matchstick arrival, flame ignition, fuse burning, particle emission, climax burst, and decay.
- **HTML5 Canvas 2D Particle Engine:** Object-pooled particle simulator supporting 900+ simultaneous sparks, smoke puffs, and firework willow trails at 60 FPS.
- **Web Audio API Procedural Synthesizer:** Zero-dependency, offline, low-latency procedural sound generation for match strikes, sulfur fuses, rocket whooshes, firework bursts, fountain crackles, chakri whirls, and sub-bass bomb booms.
- **Individual Cracker Modules (All 5 traditional crackers):**
  1. `rocket` (Aakash Baan Rocket)
  2. `flower-pot` (Royal Anar)
  3. `chakri` (Zameen Chakri Ground Spinner)
  4. `sutli-bomb` (Thunder Sutli Bomb)
  5. `phuljhadi` (Golden Phuljhadi Sparkler)
- **Multiplayer Architecture (Socket.IO):**
  - Session creation with shareable links (`/celebrate/:sessionId`).
  - Strict 5-person room capacity limit enforcement.
  - Rejection of 6th participant with friendly `FullRoomModal`.
  - Authoritative synchronized cracker selection and ignition across all connected peers.
  - Host election and graceful participant disconnection/reconnection handling.
- **Design System & Tokens:**
  - Complete design tokens in `tokens.css`, `typography.css`, `animations.css`, and `global.css`.
  - Responsive mobile drawer and horizontal selector adaptations.
- **Automated Tests:**
  - Vitest test suite covering cracker registry, audio manager, session services, and room manager capacity rules.


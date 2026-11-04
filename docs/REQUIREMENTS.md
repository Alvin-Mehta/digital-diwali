# Functional & Technical Requirements Specification

---

## 1. Functional Requirements

### 1.1 Welcome & Introduction Experience (FR-100)
- **FR-101 (Hero Greeting):** Must display bold, festive typography: *"HAPPY DIWALI"* and subtitle *"Let's make this Diwali Digital!"*.
- **FR-102 (Traditional Visuals):** Centerpiece must feature an authentic SVG illustration of folded hands (Namaste / Anjali Mudra), flanked by glowing diyas, decorative lights, and ambient starry particle dust.
- **FR-103 (Entrance Animation):** UI elements must transition in smoothly with staggered fade and scale-in animations.
- **FR-104 (Auto & Manual Dismissal):** The welcome screen must automatically transition to the celebration stage after 15 seconds, complete with a visual progress bar or countdown. A prominent *"Skip Intro"* button must dismiss it instantly.
- **FR-105 (Audio Consent & Reduced Motion):** Background audio must NOT auto-play on load without user interaction. The system must query `prefers-reduced-motion` and disable intensive ambient movement if requested.

### 1.2 Layout & Navigation (FR-200)
- **FR-201 (Desktop Two-Column Grid):**
  - Left panel: Cracker Selection Menu occupying ~30% width.
  - Right panel: Celebration Stage occupying ~70% width.
- **FR-202 (Responsive Mobile Layout):** On viewports `< 768px`, the cracker selection must adapt into an accessible horizontal swipeable drawer / carousel or bottom sheet, reserving full viewport height for the celebration stage without page overflow.
- **FR-203 (Header & Controls):** Global header must house the Digital Diwali logo, audio mute/unmute toggle, room participant pill, and *"Invite Friends"* CTA button.

### 1.3 Cracker Engine & Interaction System (FR-300)
- **FR-301 (Cracker Registry):** Support dynamic registration of modular cracker packs implementing `CrackerDefinition` and `CrackerAnimation`.
- **FR-302 (Primary Action):** Display a prominent, celebratory action button: **"LIGHT THE CRACKER"**.
- **FR-303 (State Machine Orchestration):** The ignition cycle must enforce strict sequential states:
  `IDLE` -> `MATCH_APPEAR` -> `MATCH_APPROACH` -> `FUSE_IGNITING` -> `FUSE_BURNING` -> `CRACKER_ACTIVE` -> `EXPLODING` -> `DECAY` -> `COMPLETED` -> `IDLE`.
- **FR-304 (Duplicate Protection):** While an animation is active, the ignition trigger must be locked and disabled across all clients in the room. Double-clicking or spamming must be cleanly rejected.
- **FR-305 (Particle Rendering):** Particles for sparks, smoke, and explosions must be rendered via an optimized HTML5 Canvas 2D engine with object pooling to guarantee 60 FPS performance.
- **FR-306 (Cracker Catalog):** Must support at least 5 distinct crackers:
  1. *Rocket*
  2. *Flower Pot (Anar)*
  3. *Chakri*
  4. *Sutli Bomb*
  5. *Phuljhadi*

### 1.4 Audio Architecture (FR-400)
- **FR-401 (Sound Synthesis & Loading):** Employ a dual-mode audio engine: high-precision Web Audio API procedural synthesis (guaranteed 100% offline, zero-latency, cross-platform) coupled with preloaded audio asset support.
- **FR-402 (Individual Sound Sequences):** Each cracker must provide dedicated audio events for match ignition, fuse burning, flight/spin/whistle, blast/crackling, and reverberant decay. Generic shared explosions are strictly forbidden.
- **FR-403 (Global Audio Controls):** Global master volume and instant mute/unmute toggle with persisted state in `sessionStorage` or local state. Audio context must wake cleanly on first user gesture.

### 1.5 Multiplayer & Real-Time Synchronization (FR-500)
- **FR-501 (Session Creation):** Landing on `/` generates a cryptographically random session token (e.g. `diwali-room-xxxx`) and redirects to `/celebrate/:sessionId`.
- **FR-502 (Host Authority & Identity):** The room creator is assigned host privileges and an avatar identity.
- **FR-503 (Room Capacity Enforcement):** Strict server-enforced limit of 5 simultaneous participants per room (1 Host + up to 4 Guests). The 6th connection attempt must be cleanly rejected with error code `ROOM_FULL` and guidance to launch their own room.
- **FR-504 (Real-Time Synchronized Events):** Cracker selection, ignition triggers, match movement, and animation start must broadcast via Socket.IO with server timestamps `t_start` to ensure synchronized playback across all devices.
- **FR-505 (Graceful Reconnection & Teardown):** Temporary network drops must trigger auto-reconnection. Empty rooms must be garbage-collected after an idle timeout (e.g. 1 hour).

---

## 2. Non-Functional Requirements

### 2.1 Performance
- **Target Frame Rate:** Sustained 60 FPS during heavy multi-particle emissions (up to 800 active particles).
- **Latency:** Server event broadcast round-trip under 80ms on standard broadband / 4G.
- **Bundle Size:** Initial client bundle < 350 KB gzipped (utilizing tree shaking and code splitting).
- **Zero Memory Leaks:** Complete cancellation of `requestAnimationFrame` loops, unbinding of event listeners, and disposal of particle pools when resetting or switching crackers.

### 2.2 Accessibility (WCAG 2.2 AA)
- Semantic HTML tags (`<header>`, `<main>`, `<aside>`, `<button>`, `<dialog>`).
- Full keyboard operability (Tab order, Enter/Space for triggers, Escape to close modals).
- Visible focus rings with high-contrast amber/gold outline (`focus-visible:ring-2 focus-visible:ring-amber-400`).
- ARIA live regions for announcing cracker ignition, burst status, and participant join/leave alerts.
- Respect for OS-level `prefers-reduced-motion` media queries.

### 2.3 Security
- Input sanitization on participant nicknames (length limits, HTML entity escaping).
- WebSocket rate limiting to prevent ignition spamming (cooldown period matching cracker duration + 1000ms buffer).
- Session tokens generated via `crypto.randomUUID()` or collision-resistant nanoid.
- Authoritative server state for room occupancy (frontend cannot tamper with participant count).


# Technical Architecture: Digital Diwali

```
+-------------------------------------------------------------------------------+
|                             CLIENT APPLICATION                                |
|  (React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion / Canvas 2D)   |
|                                                                               |
|  +-------------------+  +--------------------------------------------------+  |
|  | Cracker Menu (30%)|  | Celebration Stage (70%)                          |  |
|  |  - Cards Grid     |  |  - Canvas Particle Layer (Particles, Smoke)      |  |
|  |  - Preview Thumb  |  |  - Cracker Visual & Matchstick Motion            |  |
|  |  - Stats & Tags   |  |  - "LIGHT THE CRACKER" Action Bar                |  |
|  +-------------------+  +--------------------------------------------------+  |
|                                                                               |
|  +---------------------+  +----------------------+  +----------------------+  |
|  |   Cracker Engine    |  | Audio Manager Engine |  |  Multiplayer Client  |  |
|  |  - State Machine    |  |  - Web Audio Synth   |  |  - Socket.IO Client  |  |
|  |  - Particle Pools   |  |  - Procedural FX     |  |  - Room State Sync   |  |
|  |  - Timeline Sync    |  |  - Master Mute/Gain  |  |  - Drift Compensator |  |
|  +---------------------+  +----------------------+  +----------------------+  |
+-------------------------------------------------------------------------------+
                                        |  WebSocket (Socket.IO JSON Events)
                                        v
+-------------------------------------------------------------------------------+
|                             BACKEND SERVER                                    |
|                       (Node.js + Express + Socket.IO)                         |
|                                                                               |
|  +-------------------------+  +--------------------------------------------+  |
|  | Session & Room Manager  |  | Event Coordinator                          |  |
|  |  - Capacity Enforcer    |  |  - cracker:select (broadcaster)            |  |
|  |    (Max 5 limit)        |  |  - cracker:ignite (timestamped sync)       |  |
|  |  - Host election        |  |  - cracker:reset                           |  |
|  |  - TTL garbage collect  |  |  - Rate-limit anti-spam filter             |  |
|  +-------------------------+  +--------------------------------------------+  |
+-------------------------------------------------------------------------------+
```

---

## 1. System Topology & Technology Stack

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18 + TypeScript** | Strict type safety, component modularity, hooks for reactive animations and state synchronization. |
| **Build System** | **Vite** | Blazing-fast HMR, optimized ES modules, native TypeScript compilation, low production bundle overhead. |
| **Styling & Design System**| **Tailwind CSS + CSS Custom Properties** | Unified festive tokens (colors, gradients, shadows, glowing filters, typographic scales). |
| **Graphics & Animation** | **HTML5 Canvas 2D + Framer Motion** | Canvas 2D delivers 60 FPS particle simulations for sparks and debris without DOM thrashing; Framer Motion handles UI state transitions. |
| **Sound System** | **Web Audio API + Howler.js** | Pure procedural synthesis (noise buffers, envelope filters, frequency modulation) ensures zero dependency on external sound files, 100% offline capability, zero latency, and precise event scheduling. |
| **Backend & Real-Time** | **Node.js + Express + Socket.IO** | Bi-directional low-latency room communication, event fanout, authoritative participant counting, and cross-client synchronization. |
| **Testing** | **Vitest + React Testing Library** | Lightning-fast unit and component test runner matching Vite configuration. |

---

## 2. Cracker Engine Architecture

Every digital cracker conforms to strict modular boundaries:

```typescript
// Core interface contract for all cracker packs
export interface CrackerDefinition {
  id: string;                         // Unique cracker slug (e.g., 'rocket', 'chakri')
  name: string;                       // Display name (e.g., 'Aakash Baan Rocket')
  tagline: string;                    // Short descriptive subtitle
  category: 'aerial' | 'ground' | 'fountain' | 'handheld' | 'sound';
  durationMs: number;                 // Total sequence duration in milliseconds
  thumbnailSvg: React.FC<SvgProps>;   // Vector illustration for menu card
  stageSvg: React.FC<StageSvgProps>;  // Vector illustration on celebration stage
  animationTimeline: ICrackerTimeline; // Detailed timeline choreography
  audioProfile: ICrackerAudioProfile;  // Synthesizer / sample mapping
  particleConfig: ParticleConfig;     // Emitter rates, colors, physics velocity
}
```

### 2.1 State Machine Lifecycle
The engine coordinates the following finite states:
1. `IDLE`: Cracker is resting on stage; ignition button active; ambient sparkle enabled.
2. `PREPARING`: Ignition event received (locally or via socket); button locked.
3. `MATCH_APPROACH`: Vector matchstick descends toward fuse (duration: 600ms).
4. `MATCH_IGNITE`: Match head bursts into flame with audible friction strike (250ms).
5. `FUSE_BURNING`: Flame touches fuse; ember sparks spray along the fuse line (800ms).
6. `DETONATING`: Cracker launches / spins / erupts; primary particle emitters activate.
7. `EXPLODING`: Secondary burst or peak intensity reached (fireworks spread, sound blast).
8. `DECAY`: Smoke lingers, embers fade under gravity and air drag (1200ms).
9. `COMPLETED`: Canvas cleared; state resets to `IDLE`; button re-enabled.

---

## 3. Real-Time Multiplayer Protocol

### 3.1 Event Contracts
All Socket.IO payloads are strongly typed:

```typescript
export interface RoomState {
  roomId: string;
  hostId: string;
  participants: Participant[];
  selectedCrackerId: string;
  ignitionState: {
    status: 'idle' | 'igniting' | 'active';
    crackerId: string | null;
    ignitedBy: string | null;
    timestamp: number;
    durationMs: number;
  };
}

export interface Participant {
  id: string;
  socketId: string;
  name: string;
  avatarSeed: string;
  isHost: boolean;
  joinedAt: number;
}
```

### 3.2 Capacity Rule Enforcement (Max 5)
When a client requests `room:join`:
1. Server checks `room.participants.length`.
2. If `room.participants.length >= 5`, connection is rejected with `{ success: false, reason: 'ROOM_FULL', maxCapacity: 5 }`.
3. Client displays the full room dialog offering to generate an individual room.
4. If allowed, participant is added and `room:participant-joined` is broadcast to peers.

---

## 4. Audio Engine Architecture

To eliminate reliance on external media hosting and prevent network dropouts or CORS blocks, the audio subsystem combines:
1. **Procedural Web Audio Synthesizer:**
   - **White/Pink Noise Generators:** Shaped with high-pass and band-pass biquad filters to synthesize match strikes, fuse fizzing, and continuous sparkler crackles.
   - **FM Frequency Modulators:** Low-frequency sine sweeps for rocket launches and whistling ascents.
   - **Multi-stage Sub-bass Explosions:** Exponential decay gain envelopes combined with distorted sub-bass oscillators to create chest-thumping bomb detonations.
   - **Reverb Convolver / Delay:** Simulates open-air festival acoustics.
2. **Audio Buffer Asset Cache:**
   - Preloaded fallback sound files stored in `/public/audio/`.
3. **Autoplay Compliance:**
   - AudioContext initializes in `suspended` state.
   - Resumes seamlessly on the first click (e.g. clicking "Enter Celebration", "Skip Intro", or any menu item).


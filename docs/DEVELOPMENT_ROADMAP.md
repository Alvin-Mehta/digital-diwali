# Digital Diwali — Development Roadmap & Milestone Tracker

---

## Roadmap Overview

| Phase | Milestone Description | Target Status | Verification Criteria |
| :--- | :--- | :---: | :--- |
| **Phase 1** | Product Analysis & Technical Architecture | **DONE** | Documentation complete (`docs/*`). Requirements, architecture, and roadmap finalized. |
| **Phase 2** | Design System & Visual Asset Foundation | **IN PROGRESS** | Design tokens, color palette, typography, local vector illustrations (SVGs) for crackers, diyas, matchstick, hands. |
| **Phase 3** | Application Scaffolding & Shared UI Components | **PENDING** | Vite + React + TypeScript + Tailwind, Express + Socket.IO server, shared buttons, modals, badges, layout shell. |
| **Phase 4** | Welcome Screen & Main Celebration Layout | **PENDING** | 15s welcome intro with skip button, 30%/70% responsive split layout, cracker menu, celebration stage. |
| **Phase 5** | Cracker Engine & Individual Cracker Modules | **PENDING** | Timeline engine, Canvas particle physics, Web Audio procedural synth, all 5 crackers fully authored with unique effects. |
| **Phase 6** | Real-Time Multiplayer System | **PENDING** | Socket.IO room lifecycle, 5-person cap enforcement, real-time cracker sync, share modal & clipboard link. |
| **Phase 7** | Polish, Accessibility & Optimization | **PENDING** | 60 FPS particle pool tuning, WCAG 2.2 AA audit, keyboard navigation, reduced motion fallback, responsive polish. |
| **Phase 8** | Testing, Documentation & Production Verification | **PENDING** | Unit tests passing, integration tests, full build verification, deployment guide. |

---

## Detailed Task Breakdown

### Phase 1: Product Analysis (Completed)
- [x] Analyze all user requirements and architectural constraints.
- [x] Draft `docs/PROJECT_OVERVIEW.md`.
- [x] Draft `docs/REQUIREMENTS.md`.
- [x] Draft `docs/TECHNICAL_ARCHITECTURE.md`.
- [x] Draft `docs/DEVELOPMENT_ROADMAP.md`.
- [x] Draft `docs/FOLDER_STRUCTURE.md`.

### Phase 2: Design System & Visual Planning
- [ ] Create `design/README.md`, `design/design-system.md`, `design/color-palette.md`, `design/typography.md`.
- [ ] Create `design/component-guidelines.md`, `design/animation-guidelines.md`, `design/interaction-flows.md`, `design/assets-inventory.md`.
- [ ] Implement design tokens in `src/styles/tokens.css`, `typography.css`, `animations.css`, `global.css`.
- [ ] Author custom, high-fidelity SVGs:
  - Folded hands (Namaste / Anjali Mudra)
  - Diya with glowing flame animation
  - Matchstick with strike tip and flame
  - Aakash Baan Rocket (stick, cone, casing, fuse)
  - Flower Pot / Anar (clay pot, ornamental band, peak fuse)
  - Chakri (spiraling Catherine wheel, igniter fuse, color rings)
  - Sutli Bomb (green jute-wound cuboid/sphere with red label and woven cord fuse)
  - Phuljhadi (metal wire sparkler with textured pyro coating)
  - Hanging festive lanterns and marigold garlands

### Phase 3: Application Foundation
- [ ] Initialize `package.json` with dependencies (`react`, `react-dom`, `lucide-react`, `socket.io-client`, `express`, `socket.io`, `tailwindcss`, `vite`, `typescript`, `vitest`).
- [ ] Configure `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `postcss.config.js`.
- [ ] Build shared UI primitives (`Button`, `Modal`, `Badge`, `Avatar`, `Tooltip`, `Card`, `Slider`).
- [ ] Establish application state store (Zustand or React Context with reducer pattern).

### Phase 4: Welcome & Main Interface
- [ ] Build `WelcomeScreen` component with 15-second auto-transition, visual countdown circle/bar, and "Skip Intro" trigger.
- [ ] Build desktop two-column grid (30% cracker selector / 70% celebration stage).
- [ ] Build responsive mobile drawer / horizontal carousel for cracker selection.
- [ ] Implement header with Digital Diwali branding, room participant badge, audio mute toggle, and "Invite Friends" CTA.

### Phase 5: Cracker Engine & Cracker Modules
- [ ] Build `CrackerEngine`: orchestrator for matchstick motion, fuse burning, particle canvas, and audio sync.
- [ ] Implement high-performance 2D Canvas particle system with pre-allocated memory pools (sparks, stars, smoke, embers).
- [ ] Implement `AudioManager` utilizing Web Audio API procedural synthesis (white noise, band-pass filters, FM sweeps, exponential gain envelopes).
- [ ] Implement Cracker 1: **Rocket** (ascent, smoke trail, high-altitude colorful burst).
- [ ] Implement Cracker 2: **Flower Pot (Anar)** (continuous vertical spark fountain with color stages).
- [ ] Implement Cracker 3: **Chakri** (rotational acceleration, dynamic centrifugal sparks, color shifts, slowdown).
- [ ] Implement Cracker 4: **Sutli Bomb** (fuse sizzle, dramatic silence pause, explosive screen flash, debris particles).
- [ ] Implement Cracker 5: **Phuljhadi** (sparkler body, branching multi-directional embers, burn-down effect).
- [ ] Author individual documentation (`rocket.md`, `flowerPot.md`, etc.) in each cracker feature folder.

### Phase 6: Multiplayer & Real-Time Sync
- [ ] Build Node.js + Express + Socket.IO server (`server/index.ts`).
- [ ] Implement room management logic with strict 5-participant limit.
- [ ] Implement `room:join`, `room:state`, `cracker:select`, `cracker:ignite`, `room:leave`.
- [ ] Implement synchronized timestamp scheduling for simultaneous cracker playback.
- [ ] Build `InviteFriendsModal` with shareable link, one-click copy, and participant listing.

### Phase 7: Polish & Optimization
- [ ] Ensure 60 FPS on particle renders across mobile and desktop.
- [ ] Screen-reader accessibility (ARIA live announcements).
- [ ] Keyboard navigation (Tab index, Enter key to light cracker).
- [ ] Prefers-reduced-motion support.

### Phase 8: Testing & Verification
- [ ] Write unit tests for cracker registry, audio manager, and room management.
- [ ] Write integration tests for Socket.IO room capacity and cracker synchronization.
- [ ] Verify production build (`npm run build`).
- [ ] Complete `README.md` and verify all guidelines.


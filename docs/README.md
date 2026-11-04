# Digital Diwali — Documentation Hub

Welcome to the technical and architectural documentation for **Digital Diwali**, a modern, gamified, real-time multiplayer web platform for celebrating Diwali digitally through interactive crackers, synchronized animations, procedural and preloaded audio, and collaborative celebratory spaces.

---

## 📚 Documentation Index

1. [Project Overview](./PROJECT_OVERVIEW.md)
   - Core concept, target audience, key user journeys, feature matrix, and emotional design goals.
2. [Functional & Non-Functional Requirements](./REQUIREMENTS.md)
   - Detailed functional requirements, security boundaries, performance SLAs, accessibility targets (WCAG 2.2 AA), and edge cases.
3. [Technical Architecture](./TECHNICAL_ARCHITECTURE.md)
   - High-level system architecture, frontend and backend tech stack, cracker engine design, particle physics, state machines, Web Audio architecture, and Socket.IO multiplayer protocol.
4. [Development Roadmap](./DEVELOPMENT_ROADMAP.md)
   - Phased implementation schedule, milestones, verification criteria, and progress tracking.
5. [Folder Structure Architecture](./FOLDER_STRUCTURE.md)
   - Complete directory taxonomy following feature-sliced modular engineering principles.
6. [Multiplayer Architecture](./MULTIPLAYER_ARCHITECTURE.md)
   - Room lifecycle, capacity enforcement (max 5 participants), event protocol, and synchronization timing.
7. [Cracker Development Guide](./CRACKER_DEVELOPMENT_GUIDE.md)
   - Comprehensive handbook for authoring, configuring, styling, and registering new digital crackers without modifying the core engine.
8. [Animation System Architecture](./ANIMATION_SYSTEM.md)
   - State machine, timeline coordination, matchstick ignition sequence, Canvas 2D particle simulation, and frame-budget management.
9. [Audio Architecture](./AUDIO_ARCHITECTURE.md)
   - Web Audio API hybrid synthesis and audio buffer management, mute control, autoplay compliance, and cracker audio mapping.
10. [Testing & QA Guidelines](./TESTING_GUIDELINES.md)
    - Unit, integration, and end-to-end testing strategies, assertions, and verification criteria.

---

## 🎯 Architectural Principles

- **Modularity:** Every cracker is an isolated, autonomous feature package consisting of its component, animation timeline, sound synthesis profile, configuration constants, styles, and unit documentation.
- **Server Authority:** Session integrity, room participant ceilings (hard limit of 5), and ignition sequence sequencing are strictly managed by the backend.
- **Self-Sufficiency & Zero Fragility:** The application does not rely on third-party CDNs or brittle external audio/image links. All visual assets (festive SVGs) and audio effects (high-fidelity Web Audio API synthesizers + preloaded buffers) are packaged locally.
- **Performance First:** Particle engines run on a dedicated HTML5 Canvas with memory pooling to guarantee steady 60 FPS even on mid-tier mobile hardware.


# 🪔 Digital Diwali — Interactive Multiplayer Celebration Portal

> **"HAPPY DIWALI — Let’s make this Diwali Digital!"**  
> An eco-friendly, gamified virtual playground bringing the visual spectacle, crackling sounds, and communal warmth of Diwali into a real-time multiplayer web experience.

---

## ✨ Features

- **🙏 Welcome Entrance Screen:**
  - 15-second timed entrance featuring an authentic Namaste folded-hands illustration, glowing terracotta diyas, marigold toran, festive lanterns, and a "Skip Intro" option.
  - Automatic reduced-motion compliance and non-intrusive sound activation on user interaction.
- **🎆 Two-Column Festive Layout:**
  - **Left Section (30%):** Cracker Selection Menu with preview thumbnails, categories, sensory taglines, and active selection rings.
  - **Right Section (70%):** Virtual Celebration Stage with ambient courtyard lighting, matchstick animation, particle canvas, and "LIGHT THE CRACKER" CTA.
  - Fully responsive layout adapting into mobile drawer/carousel with zero horizontal overflow.
- **🎇 5 Independent Cracker Modules:**
  1. **Aakash Baan Rocket:** Ascends into the night sky with a trailing exhaust flame before detonating into a glittering firework shell.
  2. **Royal Anar (Flower Pot):** Volcanic cone erupting into an ascending fountain of golden, emerald, and crimson sparks.
  3. **Zameen Chakri (Ground Spinner):** Whirling pyrotechnic wheel skittering across the floor with high-speed centrifugal sparks.
  4. **Thunder Sutli Bomb:** Jute twine-wrapped bomb building anticipation through a sizzling fuse, silent pause, and screen-shaking concussive blast.
  5. **Golden Phuljhadi (Handheld Sparkler):** Dazzling hand sparkler burning down while spraying starry branching sparks.
- **🔊 Procedural Web Audio API Sound Design:**
  - 100% offline, zero-latency procedural sound synthesis for match friction strikes, sulfur fuses, rocket whooshes, bomb detonations, and sparkler sizzles.
  - Global master volume control and instant mute toggle with persisted session settings.
- **👥 Real-Time Multiplayer Rooms (Max 5 Users):**
  - Instant unique session generation (`/celebrate/:sessionId`) without user login walls.
  - One-click shareable invitation links with native Web Share API support and clipboard copy.
  - Strict server-enforced limit of 5 participants per room; friendly guidance for the 6th visitor to start their own session.
  - Synchronized cracker selection, matchstick travel, and explosion timing via Socket.IO.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript (Strict Mode), Vite, Tailwind CSS, Lucide Icons |
| **Graphics & Physics**| HTML5 Canvas 2D (Object-pooled particle engine with additive blending), Vector SVGs |
| **Audio Subsystem** | Web Audio API (Noise generators, Biquad filters, FM oscillators, Gain envelopes) |
| **Backend & Real-Time**| Node.js, Express, Socket.IO |
| **Testing** | Vitest, React Testing Library |

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
```bash
# Clone or navigate to the repository
cd "Digital Diwali"

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the project root (optional for local dev):
```env
VITE_SERVER_URL=http://localhost:3001
PORT=3001
```

### 4. Running the Application
To run the full stack (Frontend + Multiplayer WebSocket Server):

```bash
# Terminal 1: Start the Real-Time Multiplayer Server
npm run server

# Terminal 2: Start the Vite Frontend Development Server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing

Run the automated unit and integration test suites:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- Cracker registry integrity & module contracts
- Audio manager mute state and triggers
- Session token generation & participant utilities
- Socket.IO Room Manager: capacity enforcement (max 5 limit), host migration, and ignition synchronization

---

## 📦 Production Build

```bash
# Typecheck & build the optimized static bundle
npm run build

# Preview the production build locally
npm run preview
```

The production output is generated in `/dist` (~77 KB gzipped JS, ~7 KB gzipped CSS) with high cache efficiency and zero external runtime asset dependencies.

---

## 📖 Architectural Documentation Hub

Comprehensive engineering guides are available in the [`docs/`](./docs/README.md) and [`design/`](./design/README.md) folders:
- [Project Overview](./docs/PROJECT_OVERVIEW.md)
- [Requirements Specification](./docs/REQUIREMENTS.md)
- [Technical Architecture](./docs/TECHNICAL_ARCHITECTURE.md)
- [Multiplayer Architecture](./docs/MULTIPLAYER_ARCHITECTURE.md)
- [Audio Architecture](./docs/AUDIO_ARCHITECTURE.md)
- [Cracker Development Guide](./docs/CRACKER_DEVELOPMENT_GUIDE.md)
- [Animation System Architecture](./docs/ANIMATION_SYSTEM.md)
- [Design System & Color Tokens](./design/design-system.md)
- [Assets Inventory](./design/assets-inventory.md)
- [Changelog](./docs/CHANGELOG.md)

---

## 🪔 Happy Digital Diwali!
May this digital celebration illuminate your celebrations with joy, prosperity, and light!


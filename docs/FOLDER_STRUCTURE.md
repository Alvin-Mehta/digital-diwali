# Folder Structure Architecture: Digital Diwali

This project adheres to a strict feature-sliced and modular domain architecture. No god-components or monolithic files are permitted.

```
digital-diwali/
├── public/
│   ├── assets/
│   │   ├── patterns/             # Rangoli and geometric decorative SVG patterns
│   │   └── textures/             # Background textures and gradients
│   ├── illustrations/            # Static standalone SVGs (folded hands, toran, etc.)
│   └── audio/                    # Fallback audio assets
│
├── src/
│   ├── app/                      # Application root, provider wrappers, layout routing
│   │   ├── App.tsx
│   │   └── routes.tsx
│   │
│   ├── components/               # Domain-agnostic reusable UI components
│   │   ├── common/               # Notification toasts, countdown bars, error banners
│   │   ├── layout/               # Header, Footer, SplitContainer, MobileDrawer
│   │   ├── modals/               # InviteModal, FullRoomModal, SettingsModal
│   │   └── ui/                   # Button, Card, Badge, Avatar, Slider, Switch, Tooltip
│   │
│   ├── features/                 # Modular domain features
│   │   ├── welcome/              # Full-screen 15s entrance experience
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── WelcomeVisual.tsx
│   │   │   └── useWelcomeTimer.ts
│   │   │
│   │   ├── crackers/             # Autonomous cracker modules & engine
│   │   │   ├── engine/           # Centralized animation & particle orchestrator
│   │   │   │   ├── CrackerEngine.ts
│   │   │   │   ├── ParticleSystem.ts
│   │   │   │   ├── MatchstickRenderer.tsx
│   │   │   │   ├── FuseRenderer.tsx
│   │   │   │   └── types.ts
│   │   │   ├── crackerRegistry.ts# Dynamic registry of all available crackers
│   │   │   ├── types.ts          # Common CrackerDefinition & timeline interfaces
│   │   │   │
│   │   │   ├── rocket/           # Rocket cracker feature package
│   │   │   │   ├── index.ts
│   │   │   │   ├── RocketCracker.tsx
│   │   │   │   ├── rocket.animation.ts
│   │   │   │   ├── rocket.audio.ts
│   │   │   │   ├── rocket.config.ts
│   │   │   │   ├── rocket.styles.css
│   │   │   │   ├── rocket.md
│   │   │   │   └── assets/       # Vector SVGs (rocket stick, cone, payload)
│   │   │   │
│   │   │   ├── flower-pot/       # Flower Pot / Anar feature package
│   │   │   │   ├── index.ts
│   │   │   │   ├── FlowerPotCracker.tsx
│   │   │   │   ├── flowerPot.animation.ts
│   │   │   │   ├── flowerPot.audio.ts
│   │   │   │   ├── flowerPot.config.ts
│   │   │   │   ├── flowerPot.styles.css
│   │   │   │   ├── flowerPot.md
│   │   │   │   └── assets/
│   │   │   │
│   │   │   ├── chakri/           # Ground Spinner (Chakri) feature package
│   │   │   │   ├── index.ts
│   │   │   │   ├── ChakriCracker.tsx
│   │   │   │   ├── chakri.animation.ts
│   │   │   │   ├── chakri.audio.ts
│   │   │   │   ├── chakri.config.ts
│   │   │   │   ├── chakri.styles.css
│   │   │   │   ├── chakri.md
│   │   │   │   └── assets/
│   │   │   │
│   │   │   ├── sutli-bomb/       # Sutli Bomb feature package
│   │   │   │   ├── index.ts
│   │   │   │   ├── SutliBombCracker.tsx
│   │   │   │   ├── sutliBomb.animation.ts
│   │   │   │   ├── sutliBomb.audio.ts
│   │   │   │   ├── sutliBomb.config.ts
│   │   │   │   ├── sutliBomb.styles.css
│   │   │   │   ├── sutliBomb.md
│   │   │   │   └── assets/
│   │   │   │
│   │   │   └── phuljhadi/        # Hand Sparkler (Phuljhadi) feature package
│   │   │       ├── index.ts
│   │   │       ├── PhuljhadiCracker.tsx
│   │   │       ├── phuljhadi.animation.ts
│   │   │       ├── phuljhadi.audio.ts
│   │   │       ├── phuljhadi.config.ts
│   │   │       ├── phuljhadi.styles.css
│   │   │       ├── phuljhadi.md
│   │   │       └── assets/
│   │   │
│   │   ├── celebration/          # Stage container & ambient festive background
│   │   │   ├── CelebrationStage.tsx
│   │   │   ├── StageBackground.tsx
│   │   │   └── LightingControls.tsx
│   │   │
│   │   ├── multiplayer/          # Real-time synchronization layer
│   │   │   ├── MultiplayerProvider.tsx
│   │   │   ├── socketClient.ts
│   │   │   ├── useMultiplayer.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── participants/         # Participant avatars & active lobby display
│   │   │   ├── ParticipantList.tsx
│   │   │   ├── ParticipantAvatar.tsx
│   │   │   └── ParticipantBadge.tsx
│   │   │
│   │   └── audio/                # Centralized Web Audio synthesis & manager
│   │       ├── AudioManager.ts
│   │       ├── AudioSynthesizer.ts
│   │       ├── SoundBank.ts
│   │       └── useAudio.ts
│   │
│   ├── hooks/                    # Reusable React hooks
│   │   ├── useWindowSize.ts
│   │   ├── usePrefersReducedMotion.ts
│   │   └── useClipboard.ts
│   │
│   ├── services/                 # API, Session generation & storage utilities
│   │   └── sessionService.ts
│   │
│   ├── stores/                   # State stores (Room & Cracker state)
│   │   └── celebrationStore.ts
│   │
│   ├── styles/                   # Unified design system tokens & globals
│   │   ├── tokens.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── global.css
│   │
│   ├── types/                    # Shared TypeScript interfaces & types
│   │   └── index.ts
│   │
│   ├── utils/                    # Math, Canvas, color & string helpers
│   │   ├── canvasUtils.ts
│   │   ├── colorUtils.ts
│   │   └── mathUtils.ts
│   │
│   └── main.tsx                  # React DOM mount point
│
├── server/                       # Express + Socket.IO real-time multiplayer server
│   ├── index.ts                  # Server entry point and HTTP/WS initialization
│   ├── rooms/                    # Room lifecycle, state, and capacity manager
│   │   ├── RoomManager.ts
│   │   └── types.ts
│   ├── socket/                   # Socket event handlers
│   │   ├── connectionHandler.ts
│   │   ├── roomHandler.ts
│   │   └── crackerHandler.ts
│   ├── services/                 # Session verification & cleanup cron
│   │   └── sessionCleanupService.ts
│   └── middleware/               # Rate-limiting & payload validation
│       └── rateLimiter.ts
│
├── design/                       # Design system documentation & asset specifications
│   ├── README.md
│   ├── design-system.md
│   ├── color-palette.md
│   ├── typography.md
│   ├── component-guidelines.md
│   ├── animation-guidelines.md
│   ├── interaction-flows.md
│   └── assets-inventory.md
│
├── docs/                         # Architecture, engineering, and API docs
│   ├── README.md
│   ├── PROJECT_OVERVIEW.md
│   ├── REQUIREMENTS.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── FOLDER_STRUCTURE.md
│   ├── MULTIPLAYER_ARCHITECTURE.md
│   ├── AUDIO_ARCHITECTURE.md
│   ├── CRACKER_DEVELOPMENT_GUIDE.md
│   ├── ANIMATION_SYSTEM.md
│   ├── TESTING_GUIDELINES.md
│   └── DEVELOPMENT_ROADMAP.md
│
├── tests/                        # Automated unit, integration, and e2e test suites
│   ├── unit/
│   │   ├── crackerRegistry.test.ts
│   │   ├── audioManager.test.ts
│   │   └── sessionService.test.ts
│   └── integration/
│       ├── roomCapacity.test.ts
│       └── crackerSync.test.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```


# Cracker Development Guide

This guide details the procedure for authoring, styling, configuring, and registering a new cracker in Digital Diwali.
The architecture is strictly decoupled: **adding a new cracker requires zero changes to the central animation engine**.

---

## 1. Directory Blueprint

To add a new cracker (e.g. `bijli-bomb`), create a dedicated folder under `src/features/crackers/`:

```
src/features/crackers/bijli-bomb/
├── index.ts                  # Public export point
├── BijliBombCracker.tsx      # SVG component displayed on the celebration stage
├── bijliBomb.animation.ts    # Timeline orchestration & state hooks
├── bijliBomb.audio.ts        # Sound sequence & synthesizer parameters
├── bijliBomb.config.ts       # Cracker metadata, durations, particle physics
├── bijliBomb.styles.css      # Scoped styling and keyframe animations
├── bijliBomb.md              # Dedicated cracker documentation
└── assets/                   # Local vector assets (SVG icons, parts)
```

---

## 2. Step-by-Step Implementation

### Step 2.1: Define Configuration (`*.config.ts`)
```typescript
import { CrackerConfig } from '../types';

export const bijliBombConfig: CrackerConfig = {
  id: 'bijli-bomb',
  name: 'Bijli Bomb',
  tagline: 'Rapid-fire crackling string of festival sparks',
  category: 'sound',
  durationMs: 4200,
  fusePosition: { x: 50, y: 35 }, // Percent coordinates on stage relative to cracker
  particles: {
    sparkCount: 250,
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    particleLifeMs: 600,
    speed: { min: 4, max: 12 },
    gravity: 0.15,
  }
};
```

### Step 2.2: Implement Audio Sequence (`*.audio.ts`)
```typescript
import { ICrackerAudioProfile } from '../types';
import { audioManager } from '../../audio/AudioManager';

export const bijliBombAudio: ICrackerAudioProfile = {
  onIgnite: () => audioManager.playMatchStrike(),
  onFuseBurn: () => audioManager.playFuseBurn(800),
  onBurst: () => {
    // Trigger procedural rapid-fire crackles
    audioManager.playRapidCrackles(2500);
  },
  onDecay: () => audioManager.playDecayReverb(),
};
```

### Step 2.3: Build Vector Component (`*Cracker.tsx`)
Create a high-fidelity SVG illustration representing the cracker in resting and active states. Provide props for `stageState` (`'idle' | 'igniting' | 'burning' | 'active' | 'decay'`).

### Step 2.4: Register in `crackerRegistry.ts`
Import your configuration, component, and audio profile, and add it to the registry array:

```typescript
import { bijliBombConfig } from './bijli-bomb/bijliBomb.config';
import { BijliBombCracker } from './bijli-bomb/BijliBombCracker';
import { bijliBombAudio } from './bijli-bomb/bijliBomb.audio';

// Append to crackerRegistry array
export const crackerRegistry: CrackerDefinition[] = [
  // ...existing crackers
  {
    ...bijliBombConfig,
    component: BijliBombCracker,
    audioProfile: bijliBombAudio,
  }
];
```

That's it! The new cracker will automatically appear in the Cracker Menu with its illustration, load onto the celebration stage, respond to "LIGHT THE CRACKER", and synchronize across multiplayer sessions.


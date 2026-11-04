# Assets Inventory & Local Delivery Ledger

All assets used in **Digital Diwali** are strictly packaged locally. No external image CDNs or unverified third-party audio streams are utilized.

---

## 1. Vector Illustrations (SVG)

| Asset ID | File Path | Usage Description | Format |
| :--- | :--- | :--- | :--- |
| `art-namaste` | `/src/features/welcome/assets/NamasteHands.tsx` | Central folded-hands illustration for Welcome screen with golden bracelets and rangoli aura | SVG (JSX) |
| `art-diya` | `/src/components/ui/DiyaIllustration.tsx` | Traditional terracotta Diya with animated flickering flame | SVG (JSX) |
| `art-matchstick` | `/src/features/crackers/engine/MatchstickRenderer.tsx` | Wooden matchstick with red/black sulfur head and ignition flame | SVG (JSX) |
| `art-rocket` | `/src/features/crackers/rocket/assets/RocketIllustration.tsx` | Traditional Indian cylindrical rocket with conical nose, wooden stabilization stick, and fuse | SVG (JSX) |
| `art-anar` | `/src/features/crackers/flower-pot/assets/FlowerPotIllustration.tsx` | Conical terracotta flower pot (Anar) with colorful decorative geometric wrappers | SVG (JSX) |
| `art-chakri` | `/src/features/crackers/chakri/assets/ChakriIllustration.tsx` | Circular Catherine wheel (Chakri) with radial concentric spiral patterns and fuse | SVG (JSX) |
| `art-sutli-bomb` | `/src/features/crackers/sutli-bomb/assets/SutliBombIllustration.tsx` | Jute twine wound green bomb with red paper band and woven cord fuse | SVG (JSX) |
| `art-phuljhadi` | `/src/features/crackers/phuljhadi/assets/PhuljhadiIllustration.tsx` | Steel wire sparkler coated with grey-black combustible chemical compound | SVG (JSX) |
| `art-lantern` | `/src/components/layout/FestiveLantern.tsx` | Traditional hanging Indian Kandeel / Akasha Deepa lanterns | SVG (JSX) |
| `art-toran` | `/src/components/layout/MarigoldToran.tsx` | Marigold flower and mango leaf garland along top borders | SVG (JSX) |

---

## 2. Procedural & Fallback Audio Assets

| Sound ID | Engine Trigger | Synthesizer Architecture | Fallback File |
| :--- | :--- | :--- | :--- |
| `snd-match-strike` | Matchstick contact | Band-pass filtered white noise burst (2.4 kHz) | `/public/audio/common/match-ignite.mp3` |
| `snd-fuse-burn` | Fuse ember travel | High-pass filtered noise with stochastic gain pulses (3.2 kHz) | `/public/audio/common/fuse.mp3` |
| `snd-rocket-launch`| Rocket lift-off | Pitch-ascending sine oscillator (300-1200 Hz) + filtered whoosh | `/public/audio/crackers/rocket/launch.mp3` |
| `snd-rocket-burst` | Sky detonation | Sub-bass impact (60 Hz) + cascading shimmer noise | `/public/audio/crackers/rocket/explosion.mp3` |
| `snd-anar-fountain`| Flower pot eruption| Multi-band continuous sparkler crackles with swelling amplitude | `/public/audio/crackers/flower-pot/fountain.mp3` |
| `snd-chakri-spin`  | Ground wheel whirl | FM synthesizer (180 Hz carrier, 40 Hz mod) with speed modulation | `/public/audio/crackers/chakri/rotation.mp3` |
| `snd-bomb-detonate`| Sutli bomb blast   | Hard-clipped impulse transient + deep 45 Hz sub-bass decay | `/public/audio/crackers/sutli-bomb/explosion.mp3` |
| `snd-phuljhadi`    | Sparkler sizzle    | Parallel high-frequency stochastic tick generators (5-8 kHz) | `/public/audio/crackers/phuljhadi/crackling.mp3` |


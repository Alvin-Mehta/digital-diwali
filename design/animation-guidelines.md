# Animation Guidelines & Motion Choreography

## 1. Core Motion Values
- **Cultural Spirit:** Warm, rhythmic, explosive, and celebratory like a festive evening.
- **Physical Plausibility:** Gravity, air drag, rotational momentum, and sparks fading into smoke.
- **Predictable Timing:** Animations must have explicit beginning, climax, and decay phases.

---

## 2. Motion Timing Tokens
- `duration-fast`: `150ms` (Button presses, hover micro-interactions)
- `duration-normal`: `300ms` (Modal open/close, card selection transitions)
- `duration-deliberate`: `600ms` (Matchstick entrance, drawer reveal)
- `duration-fuse`: `1000ms` (Fuse burning travel)
- `easing-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Bouncy joyous element appearances)
- `easing-smooth`: `cubic-bezier(0.4, 0, 0.2, 1)` (Interface panels)

---

## 3. Cracker Motion Specifications

| Cracker | Climax Duration | Emitter Type | Particle Behavior |
| :--- | :---: | :--- | :--- |
| **Rocket** | 3.5s | Point -> Radial | Ascending trail (smoke + sparks) followed by spherical shell explosion with cascading willow trails. |
| **Flower Pot (Anar)** | 4.0s | Cone Fountain | Dense vertical spray of high-velocity golden embers spreading into a glittering arch and drifting down. |
| **Chakri** | 4.5s | Tangential Ring | High-speed circular centrifugal emission with randomized spiral arms, accelerating and decelerating smoothly. |
| **Sutli Bomb** | 3.2s | Shockwave / Burst | Suspenseful pause after fuse; instant shockwave ring, flash bloom, and dense high-velocity smoke chunks. |
| **Phuljhadi** | 5.0s | Branching Star | Multi-directional branching sparks radiating from a central point, sputtering with micro-bursts and ember tails. |

---

## 4. Reduced-Motion Considerations
When `prefers-reduced-motion: reduce` is detected:
- Screen transitions become simple crossfades (`opacity` only, zero translation/scaling).
- Particle counts are reduced to lightweight symbolic embers.
- Ambient background particle drift and Diya flickering are halted.


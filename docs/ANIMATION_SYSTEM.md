# Animation System Architecture

## 1. Engine Core Overview

The Digital Diwali animation system is built to balance cinematic visual spectacle with steady 60 FPS performance. It relies on a three-tier rendering pipeline:

1. **DOM / SVG Layer (Framer Motion & SVG Filters):**
   - Renders the celebration stage, cracker casings, glow filters, decorative lanterns, and matchstick movement.
2. **Canvas 2D Particle Layer (HTML5 Canvas):**
   - High-throughput physics simulation for sparks, firework shells, explosive shockwaves, smoke plumes, and ember fallout.
3. **Timeline State Machine Orchestrator:**
   - Central deterministic scheduler that transitions states and triggers audio cues with microsecond precision.

```
       +---------------------------------------------+
       |           CRACKER TIMELINE ENGINE           |
       |  (Deterministic State Machine & Scheduler)  |
       +----------------------+----------------------+
                              |
            +-----------------+-----------------+
            |                                   |
            v                                   v
+-----------------------+           +-----------------------+
|   SVG Vector Stage    |           |   Canvas 2D Engine    |
| - Cracker body        |           | - 500-1000 particles  |
| - Matchstick travel   |           | - Object Pooling      |
| - Fuse burn glow      |           | - Physics (drag/grav) |
+-----------------------+           +-----------------------+
```

---

## 2. Matchstick Ignition Choreography

Every cracker ignition follows a synchronized physical choreography:

1. **Trigger ($t = 0\text{ms}$):**
   - Action button is disabled; sound engine pre-warmed.
2. **Matchstick Entrance ($t = 50\text{ms} - 550\text{ms}$):**
   - A wooden matchstick with a sulfur head slides into view from the right margin towards the cracker's fuse coordinates.
3. **Strike & Flame Ignition ($t = 550\text{ms} - 800\text{ms}$):**
   - Match head flashes with a burst of orange flame; matchstrike audio triggers.
4. **Fuse Sparking ($t = 800\text{ms} - 1600\text{ms}$):**
   - Flame touches the fuse. Ember particles begin spewing outward along the fuse curve; fuse burning audio plays.
   - Matchstick smoothly retreats and fades out.
5. **Cracker Action ($t = 1600\text{ms}+$):**
   - Cracker enters its unique detonation sequence.

---

## 3. High-Performance Particle System

### 3.1 Object Pooling
To prevent garbage collection pauses during intensive bursts:
- Pre-allocated pool of 1,200 `Particle` instances initialized at startup.
- Expired particles are recycled back to the pool rather than re-instantiated.

### 3.2 Physics Model
Each particle update computes:
$$x_{t+1} = x_t + v_x$$
$$y_{t+1} = y_t + v_y$$
$$v_x = v_x \times \text{drag}$$
$$v_y = (v_y \times \text{drag}) + \text{gravity}$$
$$\alpha_{t+1} = \alpha_t - \text{decay}$$

### 3.3 Visual Blending
- Canvas context utilizes `globalCompositeOperation = 'lighter'` (additive blending) during spark explosions to produce radiant glowing light blooms without heavy GPU shader overhead.


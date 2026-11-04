# Interaction Flows & User State Diagrams

## 1. Welcome Screen Transition Flow

```
[User Lands on Site]
        │
        ▼
[Welcome Screen Displays]
  - Festive Typography ("HAPPY DIWALI")
  - Namaste Folded Hands Illustration
  - Glowing Diyas & Sparkles
  - 15-Second Progress Indicator
        │
        ├─────────────────────────────┬──────────────────────────────┐
        │                             │                              │
        ▼                             ▼                              ▼
(15s Timer Elapses)          (User Clicks "Skip Intro")      (Reduced Motion Active)
        │                             │                              │
        └─────────────────────────────┴──────────────────────────────┘
                                      │
                                      ▼
                        [Smooth Transition to Main Stage]
```

---

## 2. Cracker Selection & Burst Flow

```
[Stage Ready / Idle]
        │
        ▼
[User Selects Cracker from Left Menu]
  - Card Highlights
  - Stage Illustration Updates to Selected Cracker
  - Cracker Configuration & Sound Profile Loaded
        │
        ▼
[User Clicks "LIGHT THE CRACKER"]
  - Button Disables (Text: "BURSTING...")
  - Matchstick Appears & Approaches Fuse (600ms)
  - Matchstick Strikes & Ignites (250ms, Strike Audio)
  - Fuse Burns with Spark Trails (800ms, Sizzle Audio)
  - Cracker Animation Sequence Executes (Launch / Spin / Fountain / Blast)
  - Synchronized Canvas Particles Emit (Sparks, Smoke, Firework Shells)
  - Climax Detonation & Audio Reverberation
  - Particles Decay & Smoke Clears
        │
        ▼
[Stage Resets to Ready State]
  - Button Re-enables
  - Cracker Ready to Burst Again
```

---

## 3. Multiplayer Invitation & Joining Flow

```
[Host Clicks "Invite Friends"]
        │
        ▼
[Invitation Modal Opens]
  - Displays Unique Room Link: /celebrate/diwali-xxxx
  - Shows Active Participants (e.g. 1 / 5)
  - Host Clicks "Copy Invitation Link" (Toast: "Link copied!")
        │
        ▼
[Friend Opens Link in Browser]
        │
        ├─────────────────────────────────────────────────┐
        │                                                 │
        ▼                                                 ▼
(Room has < 5 Participants)                     (Room has 5 Participants)
        │                                                 │
        ▼                                                 ▼
[Friend Joins Room]                             [Room Full Modal Displays]
  - Room State Synchronized                       - "This celebration is full! (Max 5)"
  - Host & Existing Peers receive notification    - CTA: "Start Your Own Celebration"
  - Everyone sees cracker bursts in real-time
```


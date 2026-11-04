# Testing & Quality Assurance Guidelines

## 1. Testing Philosophy

Digital Diwali combines interactive physics simulations, Web Audio, and real-time WebSockets. A multi-tier testing strategy guarantees reliability across all three domains:

- **Unit Tests:** Verify cracker registry integrity, state machine transitions, audio synthesis calculations, and session utility functions.
- **Integration Tests:** Verify WebSocket room lifecycle, 5-participant limit enforcement, and event broadcast synchronization.
- **Visual & Audio Verification:** Verify canvas rendering bounds, aspect ratios, sound playback on user interaction, and responsive layouts across desktop and mobile.

---

## 2. Test Execution Commands

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Run test coverage report
npm run test:coverage
```

---

## 3. Key Test Scenarios

### 3.1 Cracker Registry Tests
- Registry must export at least 5 crackers: `rocket`, `flower-pot`, `chakri`, `sutli-bomb`, `phuljhadi`.
- Every cracker entry must contain: `id`, `name`, `durationMs > 0`, `component`, `audioProfile`, and `particleConfig`.
- No duplicate cracker IDs are permitted.

### 3.2 Multiplayer Room Ceiling Tests (Max 5 Users)
- Sockets 1 through 5 connecting to room `diwali-test-room` must receive `room:joined` with proper `participantCount`.
- Socket 6 attempting connection must receive `room:error` with code `ROOM_CAPACITY_REACHED`.
- When Socket 3 leaves, Socket 6 should subsequently be able to connect successfully.

### 3.3 Cracker Ignition Synchronization
- When Participant A emits `cracker:ignite`, all connected peers (B, C, D) must receive `cracker:ignited` with matching `crackerId` and server timestamp.
- Attempting to emit `cracker:ignite` while an active sequence is in progress must be rejected by the server to prevent race conditions.

### 3.4 Accessibility & Reduced Motion
- When `prefers-reduced-motion: reduce` is active, particle count must drop to minimal levels, and background animation loops must halt.


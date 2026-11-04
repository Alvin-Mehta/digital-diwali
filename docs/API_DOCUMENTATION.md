# API Documentation & WebSocket Protocol

## 1. HTTP Endpoints

### `GET /health`
- **Description:** Verifies service health and availability.
- **Response:**
  ```json
  {
    "status": "ok",
    "service": "digital-diwali-multiplayer"
  }
  ```

---

## 2. Real-Time WebSocket Protocol (Socket.IO)

### 2.1 Connection Handshake
Clients connect to the Socket.IO server at port `3001` or the configured `VITE_SERVER_URL`.

### 2.2 Client-to-Server Events

#### `room:join`
Sent when a visitor enters a celebration room.
- **Payload:**
  ```typescript
  {
    roomId: string;        // e.g. "diwali-spark-8492"
    participantId: string; // Persistent client ID
    name: string;          // Chosen or generated nickname
  }
  ```

#### `cracker:select`
Sent when a participant switches the active cracker on stage.
- **Payload:**
  ```typescript
  {
    roomId: string;
    crackerId: string;     // e.g. "rocket", "chakri"
  }
  ```

#### `cracker:ignite`
Sent when a participant clicks "LIGHT THE CRACKER".
- **Payload:**
  ```typescript
  {
    roomId: string;
    crackerId: string;
    participantId: string;
    durationMs: number;
  }
  ```

#### `cracker:completed`
Sent when the animation timeline finishes and the stage is ready for another cracker.
- **Payload:**
  ```typescript
  {
    roomId: string;
  }
  ```

---

## 3. Server-to-Client Broadcast Events

#### `room:joined`
Emitted back to the joining socket with the room's current state.
- **Payload:**
  ```typescript
  {
    room: RoomState;
    you: Participant;
  }
  ```

#### `room:participant-joined`
Emitted to all other peers when a new celebrant enters.
- **Payload:**
  ```typescript
  {
    participant: Participant;
    participants: Participant[];
  }
  ```

#### `room:error`
Emitted if connection or capacity rules are violated.
- **Payload:**
  ```typescript
  {
    code: "ROOM_CAPACITY_REACHED" | "UNKNOWN_ERROR";
    message: string;
    maxCapacity: number;
  }
  ```

#### `cracker:selected`
Broadcast to all peers in the room when a cracker is changed.
- **Payload:**
  ```typescript
  {
    crackerId: string;
  }
  ```

#### `cracker:ignited`
Broadcast to all peers with authoritative server timestamp to coordinate synchronization.
- **Payload:**
  ```typescript
  {
    crackerId: string;
    ignitedBy: string;
    ignitedByName: string;
    serverTimestamp: number;
    durationMs: number;
  }
  ```

#### `cracker:reset`
Broadcast when the stage returns to its idle, replay-ready state.


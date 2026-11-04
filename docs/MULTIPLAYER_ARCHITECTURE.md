# Multiplayer Architecture & Real-Time Synchronization

## 1. Overview & Room Topology

The Digital Diwali multiplayer platform allows groups of up to 5 friends to celebrate in a shared private virtual space.
Real-time coordination is driven by an authoritative Node.js server powered by **Socket.IO**.

```
   [Host Client]              [Friend 1]              [Friend 2..4]
         |                         |                         |
         +--------------------+----+-------------------------+
                              |
                     WebSocket Connection
                              |
                              v
                  [Authoritative Socket Server]
                   - Room State (Max 5 users)
                   - Cracker Synchronization
                   - Time Offset Compensation
```

---

## 2. Room Lifecycle & Capacity Management

### 2.1 Creation & Session Identifiers
- Sessions use URL slugs formatted as `diwali-xxxx-xxxx` (e.g. `diwali-spark-8492` or cryptographically random 12-char hex).
- The client that requests creation or first joins an uninitialized room becomes the `Host`.

### 2.2 Strict Participant Ceiling (Max 5 Users)
- **Hard Limit:** Exactly 5 simultaneous connected sockets are permitted per room.
- When socket 6 emits `room:join`, the server runs:
  ```typescript
  if (room.participants.size >= 5) {
    socket.emit('room:error', {
      code: 'ROOM_CAPACITY_REACHED',
      message: 'This celebration room is full! (Max 5 participants). You can create your own digital celebration.',
      maxCapacity: 5
    });
    return;
  }
  ```
- The client receives this and renders a dedicated modal explaining the capacity limit with a single click to create their own celebration.

### 2.3 Host Migration & Disconnection
- If the host disconnects:
  - The server holds a 15-second grace period for quick reconnects.
  - If the host fails to reconnect, host status automatically passes to the next oldest connected participant.
  - `room:host-changed` is broadcast to remaining peers.
- If all participants leave, the room enters a 10-minute idle TTL state before being removed from server memory.

---

## 3. Real-Time Event Dictionary

| Event Name | Direction | Payload | Description |
| :--- | :---: | :--- | :--- |
| `room:join` | Client -> Server | `{ roomId: string, nickname?: string, avatar?: string }` | Request to join a specific celebration room. |
| `room:joined` | Server -> Client | `{ room: RoomState, you: Participant }` | Sent to the joining client with current room state. |
| `room:participant-joined` | Server -> Room | `{ participant: Participant }` | Broadcast to all other peers in the room. |
| `room:participant-left` | Server -> Room | `{ participantId: string, newHostId?: string }` | Broadcast when a peer disconnects or leaves. |
| `room:error` | Server -> Client | `{ code: string, message: string }` | Sent on room full or invalid room state. |
| `cracker:select` | Client -> Server | `{ crackerId: string }` | Host/Guest switches the active cracker on stage. |
| `cracker:selected` | Server -> Room | `{ crackerId: string, selectedBy: string }` | Broadcast to synchronize cracker display. |
| `cracker:ignite` | Client -> Server | `{ crackerId: string }` | Request to light the current cracker. |
| `cracker:ignited` | Server -> Room | `{ crackerId: string, ignitedBy: string, serverTimestamp: number, durationMs: number }` | Authoritative ignition broadcast; all clients trigger animations. |
| `cracker:completed` | Server -> Room | `{ crackerId: string }` | Broadcast when sequence ends and stage returns to ready state. |

---

## 4. Clock Synchronization & Drift Compensation

To guarantee that fireworks detonate and sounds strike simultaneously across devices:
1. `cracker:ignited` transmits `serverTimestamp: Date.now()`.
2. Clients measure connection latency during handshake (`roundTripTime / 2`).
3. Client animation engine adjusts the start delay:
   $$\text{targetStart} = \text{serverTimestamp} + \text{SCHEDULED\_OFFSET\_MS} - \text{clientClockDelta}$$
   This ensures that despite slight network variance, all participants see the match strike and hear the detonation at the exact same moment.


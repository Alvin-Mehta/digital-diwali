import { RoomState, Participant, IgnitionEventPayload } from './types';

export class RoomManager {
  private rooms: Map<string, RoomState> = new Map();
  public readonly MAX_CAPACITY = 5;

  public getRoom(roomId: string): RoomState | undefined {
    return this.rooms.get(roomId);
  }

  public getOrCreateRoom(roomId: string, initialHostId?: string): RoomState {
    let room = this.rooms.get(roomId);
    if (!room) {
      room = {
        roomId,
        hostId: initialHostId || '',
        participants: [],
        selectedCrackerId: 'rocket',
        isIgniting: false,
        activeIgnition: null,
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
      };
      this.rooms.set(roomId, room);
    }
    return room;
  }

  public joinRoom(
    roomId: string,
    participant: { id: string; socketId: string; name: string }
  ): { success: boolean; reason?: string; room?: RoomState; participant?: Participant } {
    const room = this.getOrCreateRoom(roomId, participant.id);

    // Enforce 5-person ceiling
    const existingIndex = room.participants.findIndex((p) => p.id === participant.id);
    if (existingIndex === -1 && room.participants.length >= this.MAX_CAPACITY) {
      return {
        success: false,
        reason: 'ROOM_CAPACITY_REACHED',
      };
    }

    const isHost = room.participants.length === 0 || room.hostId === participant.id;
    if (isHost && !room.hostId) {
      room.hostId = participant.id;
    }

    const newParticipant: Participant = {
      id: participant.id,
      socketId: participant.socketId,
      name: participant.name,
      avatarSeed: participant.id,
      isHost,
      joinedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      // Reconnected participant
      room.participants[existingIndex] = {
        ...room.participants[existingIndex],
        socketId: participant.socketId,
        name: participant.name,
      };
    } else {
      room.participants.push(newParticipant);
    }

    room.lastActiveAt = Date.now();
    return { success: true, room, participant: newParticipant };
  }

  public leaveRoom(
    socketId: string
  ): { roomId: string; participantId: string; newHostId?: string; roomEmpty: boolean } | null {
    for (const [roomId, room] of this.rooms.entries()) {
      const index = room.participants.findIndex((p) => p.socketId === socketId);
      if (index !== -1) {
        const leaving = room.participants[index];
        room.participants.splice(index, 1);
        room.lastActiveAt = Date.now();

        let newHostId: string | undefined;

        // If host left, elect next oldest participant
        if (room.hostId === leaving.id && room.participants.length > 0) {
          room.participants[0].isHost = true;
          room.hostId = room.participants[0].id;
          newHostId = room.hostId;
        }

        const roomEmpty = room.participants.length === 0;
        return {
          roomId,
          participantId: leaving.id,
          newHostId,
          roomEmpty,
        };
      }
    }
    return null;
  }

  public selectCracker(roomId: string, crackerId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room || room.isIgniting) return false;
    room.selectedCrackerId = crackerId;
    room.lastActiveAt = Date.now();
    return true;
  }

  public igniteCracker(
    roomId: string,
    crackerId: string,
    ignitedBy: string,
    durationMs: number
  ): IgnitionEventPayload | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    // Prevent duplicate ignition while an animation is in flight
    if (room.isIgniting) return null;

    const igniter = room.participants.find((p) => p.id === ignitedBy);
    const igniterName = igniter ? igniter.name : 'A Celebrant';

    const payload: IgnitionEventPayload = {
      crackerId,
      ignitedBy,
      ignitedByName: igniterName,
      serverTimestamp: Date.now(),
      durationMs,
    };

    room.isIgniting = true;
    room.activeIgnition = payload;
    room.lastActiveAt = Date.now();

    return payload;
  }

  public completeCracker(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.isIgniting = false;
    room.activeIgnition = null;
    room.lastActiveAt = Date.now();
  }

  public cleanupAbandonedRooms(ttlMs: number = 3600000): number {
    const now = Date.now();
    let cleaned = 0;
    for (const [roomId, room] of this.rooms.entries()) {
      if (room.participants.length === 0 && now - room.lastActiveAt > ttlMs) {
        this.rooms.delete(roomId);
        cleaned++;
      }
    }
    return cleaned;
  }
}

export const roomManager = new RoomManager();


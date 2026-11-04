import { describe, it, expect, beforeEach } from 'vitest';
import { RoomManager } from '../../server/rooms/RoomManager';

describe('RoomManager Integration & Capacity Enforcement', () => {
  let roomManager: RoomManager;
  const testRoomId = 'diwali-test-room';

  beforeEach(() => {
    roomManager = new RoomManager();
  });

  it('first participant to join becomes the room host', () => {
    const result = roomManager.joinRoom(testRoomId, {
      id: 'user-1',
      socketId: 'sock-1',
      name: 'Host Friend',
    });

    expect(result.success).toBe(true);
    expect(result.participant?.isHost).toBe(true);
    expect(result.room?.hostId).toBe('user-1');
    expect(result.room?.participants).toHaveLength(1);
  });

  it('allows up to 5 participants in a single celebration room', () => {
    for (let i = 1; i <= 5; i++) {
      const res = roomManager.joinRoom(testRoomId, {
        id: `user-${i}`,
        socketId: `sock-${i}`,
        name: `Friend ${i}`,
      });
      expect(res.success).toBe(true);
    }

    const room = roomManager.getRoom(testRoomId);
    expect(room?.participants).toHaveLength(5);
  });

  it('strictly rejects the 6th participant when room reaches maximum capacity of 5', () => {
    // Fill to 5 participants
    for (let i = 1; i <= 5; i++) {
      roomManager.joinRoom(testRoomId, {
        id: `user-${i}`,
        socketId: `sock-${i}`,
        name: `Friend ${i}`,
      });
    }

    // 6th participant attempt
    const overflowResult = roomManager.joinRoom(testRoomId, {
      id: 'user-6',
      socketId: 'sock-6',
      name: 'Overflow Friend',
    });

    expect(overflowResult.success).toBe(false);
    expect(overflowResult.reason).toBe('ROOM_CAPACITY_REACHED');

    const room = roomManager.getRoom(testRoomId);
    expect(room?.participants).toHaveLength(5);
  });

  it('elects a new host when existing host leaves', () => {
    roomManager.joinRoom(testRoomId, { id: 'host-1', socketId: 'sock-h1', name: 'Original Host' });
    roomManager.joinRoom(testRoomId, { id: 'guest-2', socketId: 'sock-g2', name: 'Guest 2' });

    const leaveRes = roomManager.leaveRoom('sock-h1');
    expect(leaveRes?.roomId).toBe(testRoomId);
    expect(leaveRes?.participantId).toBe('host-1');
    expect(leaveRes?.newHostId).toBe('guest-2');

    const room = roomManager.getRoom(testRoomId);
    expect(room?.hostId).toBe('guest-2');
    expect(room?.participants[0].isHost).toBe(true);
  });

  it('synchronizes cracker selection and ignition state', () => {
    roomManager.joinRoom(testRoomId, { id: 'user-1', socketId: 'sock-1', name: 'Celebrant' });

    // Select chakri
    const selected = roomManager.selectCracker(testRoomId, 'chakri');
    expect(selected).toBe(true);
    expect(roomManager.getRoom(testRoomId)?.selectedCrackerId).toBe('chakri');

    // Ignite cracker
    const payload = roomManager.igniteCracker(testRoomId, 'chakri', 'user-1', 4000);
    expect(payload).not.toBeNull();
    expect(payload?.crackerId).toBe('chakri');
    expect(payload?.ignitedBy).toBe('user-1');
    expect(roomManager.getRoom(testRoomId)?.isIgniting).toBe(true);

    // Duplicate ignition while in-flight must be rejected
    const duplicatePayload = roomManager.igniteCracker(testRoomId, 'chakri', 'user-1', 4000);
    expect(duplicatePayload).toBeNull();

    // Complete cracker
    roomManager.completeCracker(testRoomId);
    expect(roomManager.getRoom(testRoomId)?.isIgniting).toBe(false);
  });
});


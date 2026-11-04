import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Participant, IgnitionEventPayload } from '../../types';
import { getOrCreateParticipantId, getOrCreateNickname } from '../../services/sessionService';

interface UseMultiplayerProps {
  roomId: string;
  selectedCrackerId: string;
  onRemoteSelectCracker: (crackerId: string) => void;
  onRemoteIgnite: (payload: IgnitionEventPayload) => void;
  onRemoteReset: () => void;
}

export function useMultiplayer({
  roomId,
  selectedCrackerId: _selectedCrackerId,
  onRemoteSelectCracker,
  onRemoteIgnite,
  onRemoteReset,
}: UseMultiplayerProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRoomFull, setIsRoomFull] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const participantId = useRef(getOrCreateParticipantId()).current;
  const nickname = useRef(getOrCreateNickname()).current;

  // Initialize socket connection
  useEffect(() => {
    // Attempt local or environment server connection
    const socketUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    const socket = io(socketUrl, {
      reconnectionAttempts: 4,
      timeout: 3000,
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      setIsRoomFull(false);
      setErrorMessage(null);

      // Join room
      socket.emit('room:join', {
        roomId,
        participantId,
        name: nickname,
      });
    });

    socket.on('room:joined', (data: { room: { participants: Participant[] }; you: Participant }) => {
      setParticipants(data.room.participants);
    });

    socket.on(
      'room:participant-joined',
      (data: { participant: Participant; participants: Participant[] }) => {
        setParticipants(data.participants);
      }
    );

    socket.on('room:participant-left', (data: { participantId: string; newHostId?: string }) => {
      setParticipants((prev) =>
        prev
          .filter((p) => p.id !== data.participantId)
          .map((p) => (p.id === data.newHostId ? { ...p, isHost: true } : p))
      );
    });

    socket.on('room:error', (error: { code: string; message: string }) => {
      if (error.code === 'ROOM_CAPACITY_REACHED') {
        setIsRoomFull(true);
      }
      setErrorMessage(error.message);
    });

    socket.on('cracker:selected', (data: { crackerId: string }) => {
      onRemoteSelectCracker(data.crackerId);
    });

    socket.on('cracker:ignited', (payload: IgnitionEventPayload) => {
      onRemoteIgnite(payload);
    });

    socket.on('cracker:reset', () => {
      onRemoteReset();
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
      // Fallback: Populate local self-participant so solo play always works
      setParticipants([
        {
          id: participantId,
          name: nickname,
          avatarSeed: participantId,
          isHost: true,
          joinedAt: Date.now(),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, participantId, nickname, onRemoteSelectCracker, onRemoteIgnite, onRemoteReset]);

  // Actions
  const emitSelectCracker = useCallback(
    (crackerId: string) => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('cracker:select', { roomId, crackerId });
      }
    },
    [roomId]
  );

  const emitIgnite = useCallback(
    (crackerId: string, durationMs: number) => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('cracker:ignite', {
          roomId,
          crackerId,
          participantId,
          durationMs,
        });
      }
    },
    [roomId, participantId]
  );

  const emitComplete = useCallback(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('cracker:completed', { roomId });
    }
  }, [roomId]);

  return {
    participants,
    isConnected,
    isRoomFull,
    setIsRoomFull,
    errorMessage,
    emitSelectCracker,
    emitIgnite,
    emitComplete,
    currentUserId: participantId,
  };
}

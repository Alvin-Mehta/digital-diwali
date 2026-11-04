// Shared TypeScript Interfaces & Types

export type ScreenState = 'welcome' | 'celebration';

export type CrackerCategory = 'aerial' | 'fountain' | 'ground' | 'sound' | 'handheld';

export interface Participant {
  id: string;
  socketId?: string;
  name: string;
  avatarSeed: string;
  isHost: boolean;
  joinedAt: number;
}

export interface IgnitionEventPayload {
  crackerId: string;
  ignitedBy: string;
  ignitedByName: string;
  serverTimestamp: number;
  durationMs: number;
}

export interface RoomState {
  roomId: string;
  hostId: string;
  participants: Participant[];
  selectedCrackerId: string;
  isIgniting: boolean;
  activeIgnition: IgnitionEventPayload | null;
  createdAt: number;
}


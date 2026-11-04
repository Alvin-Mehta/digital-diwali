import { describe, it, expect } from 'vitest';
import { generateSessionId, getOrCreateParticipantId, getOrCreateNickname } from '../../src/services/sessionService';

describe('Session Utilities', () => {
  it('should generate valid format session IDs', () => {
    const s1 = generateSessionId();
    const s2 = generateSessionId();
    expect(s1).toMatch(/^diwali-[a-z0-9]{8}$/);
    expect(s2).toMatch(/^diwali-[a-z0-9]{8}$/);
    expect(s1).not.toBe(s2);
  });

  it('should create or retrieve participant ID', () => {
    const id = getOrCreateParticipantId();
    expect(id).toBeDefined();
    expect(id.length).toBeGreaterThan(4);
  });

  it('should generate festive nickname', () => {
    const nickname = getOrCreateNickname();
    expect(nickname).toBeDefined();
    expect(typeof nickname).toBe('string');
    expect(nickname.length).toBeGreaterThan(1);
  });
});


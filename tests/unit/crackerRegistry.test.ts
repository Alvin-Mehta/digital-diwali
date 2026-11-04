import { describe, it, expect } from 'vitest';
import { crackerRegistry, getCrackerById, getDefaultCracker } from '../../src/features/crackers';

describe('Cracker Registry', () => {
  it('should export all 5 core traditional crackers', () => {
    expect(crackerRegistry).toHaveLength(5);
    const ids = crackerRegistry.map((c) => c.id);
    expect(ids).toContain('rocket');
    expect(ids).toContain('flower-pot');
    expect(ids).toContain('chakri');
    expect(ids).toContain('sutli-bomb');
    expect(ids).toContain('phuljhadi');
  });

  it('each cracker must implement strict contract specifications', () => {
    crackerRegistry.forEach((cracker) => {
      expect(cracker.id).toBeDefined();
      expect(cracker.name).toBeDefined();
      expect(cracker.durationMs).toBeGreaterThan(2000);
      expect(cracker.category).toBeDefined();
      expect(cracker.fusePosition).toBeDefined();
      expect(cracker.fusePosition.x).toBeGreaterThanOrEqual(0);
      expect(cracker.fusePosition.x).toBeLessThanOrEqual(100);
      expect(cracker.fusePosition.y).toBeGreaterThanOrEqual(0);
      expect(cracker.fusePosition.y).toBeLessThanOrEqual(100);

      // Components
      expect(cracker.ThumbnailComponent).toBeDefined();
      expect(cracker.StageComponent).toBeDefined();

      // Audio profile
      expect(cracker.audioProfile).toBeDefined();
      expect(typeof cracker.audioProfile.onMatchStrike).toBe('function');
      expect(typeof cracker.audioProfile.onFuseBurn).toBe('function');
      expect(typeof cracker.audioProfile.onDetonate).toBe('function');

      // Particle configuration
      expect(cracker.particles.count).toBeGreaterThan(100);
      expect(cracker.particles.colors.length).toBeGreaterThan(2);
    });
  });

  it('should lookup cracker by id', () => {
    const rocket = getCrackerById('rocket');
    expect(rocket).toBeDefined();
    expect(rocket?.name).toContain('Rocket');

    const nonExistent = getCrackerById('phantom');
    expect(nonExistent).toBeUndefined();
  });

  it('should return a default cracker', () => {
    const defaultCracker = getDefaultCracker();
    expect(defaultCracker).toBeDefined();
    expect(defaultCracker.id).toBe('rocket');
  });
});


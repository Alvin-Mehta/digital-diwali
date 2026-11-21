import { describe, it, expect } from 'vitest';
import { landingVideoConfig } from '../../src/features/welcome/landing-video/landingVideo.config';

export function getCurrentScene(timeSeconds: number): {
  sceneIndex: 1 | 2 | 3 | 4;
  sceneName: string;
} {
  const t = Math.max(0, Math.min(landingVideoConfig.durationSeconds, timeSeconds));
  if (t < landingVideoConfig.scenes.handsComingTogether.endSec) {
    return { sceneIndex: 1, sceneName: landingVideoConfig.scenes.handsComingTogether.name };
  }
  if (t < landingVideoConfig.scenes.goldenNamasteText.endSec) {
    return { sceneIndex: 2, sceneName: landingVideoConfig.scenes.goldenNamasteText.name };
  }
  if (t < landingVideoConfig.scenes.diyasLightingUp.endSec) {
    return { sceneIndex: 3, sceneName: landingVideoConfig.scenes.diyasLightingUp.name };
  }
  return { sceneIndex: 4, sceneName: landingVideoConfig.scenes.festiveDiwaliLights.name };
}

export function getDiyaIgnitionProgress(
  diyaIndex: number,
  timeSeconds: number,
  diyaIgnitionTimes: number[]
): number {
  const igniteTime = diyaIgnitionTimes[diyaIndex];
  if (timeSeconds < igniteTime) return 0;
  const elapsed = timeSeconds - igniteTime;
  return Math.min(1, elapsed / 0.4);
}

describe('Landing Video Illustration Timeline & Config', () => {
  it('has exact 10 second maximum duration and scene boundaries', () => {
    expect(landingVideoConfig.durationSeconds).toBe(10.0);
    expect(landingVideoConfig.scenes.handsComingTogether.endSec).toBe(3.0);
    expect(landingVideoConfig.scenes.goldenNamasteText.endSec).toBe(4.5);
    expect(landingVideoConfig.scenes.diyasLightingUp.endSec).toBe(7.0);
    expect(landingVideoConfig.scenes.festiveDiwaliLights.endSec).toBe(10.0);
  });

  it('correctly maps timestamps to scenes', () => {
    expect(getCurrentScene(0).sceneIndex).toBe(1);
    expect(getCurrentScene(1.5).sceneIndex).toBe(1);
    expect(getCurrentScene(2.9).sceneIndex).toBe(1);
    expect(getCurrentScene(3.0).sceneIndex).toBe(2);
    expect(getCurrentScene(4.0).sceneIndex).toBe(2);
    expect(getCurrentScene(4.49).sceneIndex).toBe(2);
    expect(getCurrentScene(4.5).sceneIndex).toBe(3);
    expect(getCurrentScene(5.5).sceneIndex).toBe(3);
    expect(getCurrentScene(6.99).sceneIndex).toBe(3);
    expect(getCurrentScene(7.0).sceneIndex).toBe(4);
    expect(getCurrentScene(8.5).sceneIndex).toBe(4);
    expect(getCurrentScene(10.0).sceneIndex).toBe(4);
  });

  it('correctly manages sequential diya ignition from center outwards', () => {
    const ignitionTimes = landingVideoConfig.diyaPairs.map((d) => d.igniteAt);
    expect(ignitionTimes).toEqual([4.6, 5.2, 5.8, 6.4]);

    // At t = 4.0, all unlit
    expect(getDiyaIgnitionProgress(0, 4.0, ignitionTimes)).toBe(0);
    expect(getDiyaIgnitionProgress(1, 4.0, ignitionTimes)).toBe(0);
    expect(getDiyaIgnitionProgress(2, 4.0, ignitionTimes)).toBe(0);
    expect(getDiyaIgnitionProgress(3, 4.0, ignitionTimes)).toBe(0);

    // At t = 5.0, Diya 0 is fully lit, Diya 1 is unlit (starts at 5.2)
    expect(getDiyaIgnitionProgress(0, 5.0, ignitionTimes)).toBe(1);
    expect(getDiyaIgnitionProgress(1, 5.0, ignitionTimes)).toBe(0);

    // At t = 6.0, Diya 0 and 1 are fully lit, Diya 2 is midway lit (0.5), Diya 3 unlit
    expect(getDiyaIgnitionProgress(0, 6.0, ignitionTimes)).toBe(1);
    expect(getDiyaIgnitionProgress(1, 6.0, ignitionTimes)).toBe(1);
    expect(getDiyaIgnitionProgress(2, 6.0, ignitionTimes)).toBeCloseTo(0.5, 2);
    expect(getDiyaIgnitionProgress(3, 6.0, ignitionTimes)).toBe(0);

    // At t = 6.3, Diya 2 is fully lit
    expect(getDiyaIgnitionProgress(2, 6.3, ignitionTimes)).toBe(1);

    // At t = 7.0, all 4 are fully lit
    expect(getDiyaIgnitionProgress(3, 7.0, ignitionTimes)).toBe(1);
  });
});

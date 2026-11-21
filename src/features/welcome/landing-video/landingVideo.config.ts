/**
 * Digital Diwali - Welcome Landing Video Configuration
 *
 * Defines the deterministic 10-second timeline, scene thresholds,
 * symmetrical diya layout, and visual styling tokens.
 */

export interface SceneTiming {
  id: number;
  name: string;
  startSec: number;
  endSec: number;
}

export interface DiyaPairConfig {
  leftX: number;
  rightX: number;
  y: number;
  scale: number;
  igniteAt: number;
}

export interface LandingVideoConfig {
  videoSrcMp4: string;
  videoSrcWebm: string;
  durationSeconds: number;
  canvasWidth: number;
  canvasHeight: number;
  scenes: {
    handsComingTogether: SceneTiming;
    goldenNamasteText: SceneTiming;
    diyasLightingUp: SceneTiming;
    festiveDiwaliLights: SceneTiming;
  };
  diyaPairs: DiyaPairConfig[];
  colors: {
    bgCenter: string;
    bgMid: string;
    bgEdge: string;
    goldSpecular: string;
    goldBright: string;
    goldWarm: string;
    goldAmber: string;
    goldDeep: string;
    goldShadow: string;
    flameWhite: string;
    flameGold: string;
    flameOrange: string;
    flameRed: string;
  };
}

export const landingVideoConfig: LandingVideoConfig = {
  videoSrcMp4: '/welcome-video.mp4',
  videoSrcWebm: '/welcome-video.webm',
  durationSeconds: 10.0,
  canvasWidth: 1920,
  canvasHeight: 1080,
  scenes: {
    handsComingTogether: {
      id: 1,
      name: 'Hands Coming Together (Namaskar Mudra)',
      startSec: 0.0,
      endSec: 3.0,
    },
    goldenNamasteText: {
      id: 2,
      name: 'Golden Namaste Text ("नमस्ते")',
      startSec: 3.0,
      endSec: 4.5,
    },
    diyasLightingUp: {
      id: 3,
      name: 'Diyas Lighting Up Sequentially',
      startSec: 4.5,
      endSec: 7.0,
    },
    festiveDiwaliLights: {
      id: 4,
      name: 'Festive Diwali Lights & Grand Illumination',
      startSec: 7.0,
      endSec: 10.0,
    },
  },
  // 4 symmetrical pairs of diyas (from inner closest to center outward)
  diyaPairs: [
    { leftX: 730, rightX: 1190, y: 700, scale: 0.95, igniteAt: 4.6 },
    { leftX: 570, rightX: 1350, y: 740, scale: 1.0, igniteAt: 5.2 },
    { leftX: 410, rightX: 1510, y: 780, scale: 1.05, igniteAt: 5.8 },
    { leftX: 250, rightX: 1670, y: 820, scale: 1.1, igniteAt: 6.4 },
  ],
  colors: {
    bgCenter: '#3d0a2c',
    bgMid: '#220419',
    bgEdge: '#0a010d',
    goldSpecular: '#FFFBEB',
    goldBright: '#FDE68A',
    goldWarm: '#FCD34D',
    goldAmber: '#F59E0B',
    goldDeep: '#D97706',
    goldShadow: '#78350F',
    flameWhite: '#FFFFFF',
    flameGold: '#FCD34D',
    flameOrange: '#FF6B00',
    flameRed: '#EF4444',
  },
};

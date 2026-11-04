import { degToRad, randomRange, randomChoice } from './mathUtils';

export interface IParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  shape: 'circle' | 'spark' | 'smoke' | 'star';
  life: number;
  maxLife: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

export class ParticlePool {
  private pool: IParticle[] = [];
  private maxParticles: number;

  constructor(maxParticles: number = 1000) {
    this.maxParticles = maxParticles;
    for (let i = 0; i < maxParticles; i++) {
      this.pool.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        gravity: 0.1,
        drag: 0.98,
        color: '#F59E0B',
        size: 2,
        alpha: 1,
        decay: 0.02,
        shape: 'spark',
        life: 0,
        maxLife: 60,
        trail: [],
      });
    }
  }

  public emit(
    x: number,
    y: number,
    options: {
      vx?: number;
      vy?: number;
      speedMin?: number;
      speedMax?: number;
      angleMin?: number;
      angleMax?: number;
      color?: string;
      colors?: string[];
      gravity?: number;
      drag?: number;
      sizeMin?: number;
      sizeMax?: number;
      shape?: 'circle' | 'spark' | 'smoke' | 'star';
      lifeMin?: number;
      lifeMax?: number;
      enableTrail?: boolean;
    } = {}
  ): IParticle | null {
    // Find first inactive particle
    const p = this.pool.find((item) => !item.active);
    if (!p) return null;

    p.active = true;
    p.x = x;
    p.y = y;

    if (options.vx !== undefined && options.vy !== undefined) {
      p.vx = options.vx;
      p.vy = options.vy;
    } else {
      const angle = degToRad(
        randomRange(options.angleMin ?? 0, options.angleMax ?? 360)
      );
      const speed = randomRange(options.speedMin ?? 3, options.speedMax ?? 8);
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
    }

    p.gravity = options.gravity ?? 0.15;
    p.drag = options.drag ?? 0.98;
    p.color = options.color || (options.colors ? randomChoice(options.colors) : '#F59E0B');
    p.size = randomRange(options.sizeMin ?? 2, options.sizeMax ?? 4);
    p.alpha = 1;
    p.shape = options.shape ?? 'spark';
    p.maxLife = Math.floor(randomRange(options.lifeMin ?? 30, options.lifeMax ?? 70));
    p.life = p.maxLife;
    p.decay = 1 / p.maxLife;
    p.trail = [];

    return p;
  }

  public updateAndRender(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.pool[i];
      if (!p.active) continue;

      // Update physics
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.life--;
      p.alpha = Math.max(0, p.life / p.maxLife);

      if (p.life <= 0 || p.alpha <= 0.01) {
        p.active = false;
        continue;
      }

      // Draw particle
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'spark') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(1, p.size / 2);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
        ctx.stroke();
      } else if (p.shape === 'smoke') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  public clear(): void {
    for (let i = 0; i < this.maxParticles; i++) {
      this.pool[i].active = false;
    }
  }
}

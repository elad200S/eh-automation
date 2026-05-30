import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

const TOTAL_DUR = 5.2;
const MAX_PS    = 480;

type PType = 'spark' | 'flame_lg' | 'flame_md' | 'flame_sm' | 'trail' | 'ember';

interface P {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number; hue: number; lit: number;
  type: PType;
}

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const textEl = textRef.current!;

    const CX = W / 2;
    const CY = H * 0.48;

    // ── Fireball ─────────────────────────────────────────────────
    const fb = { x: CX, y: -110, r: 48 };

    // ── Shockwave rings ──────────────────────────────────────────
    const rings: { r: number; targetR: number; a: number; w: number }[] = [];

    // ── Particles ────────────────────────────────────────────────
    const ps: P[] = [];

    const push = (p: P) => { if (ps.length < MAX_PS) ps.push(p); };

    const addTrail = () => {
      const isGreen = Math.random() > 0.42;
      push({
        x: fb.x + (Math.random() - 0.5) * fb.r * 1.6,
        y: fb.y + (Math.random() - 0.5) * fb.r * 1.6,
        vx: (Math.random() - 0.5) * 1.8,
        vy:  Math.random() * 2.4 + 0.5,
        life: 0.3 + Math.random() * 0.22,
        maxLife: 0.3 + Math.random() * 0.22,
        r: Math.random() * 12 + 6,
        hue: isGreen ? 150 + Math.random() * 24 : 28 + Math.random() * 20,
        lit: isGreen ? 52 : 62,
        type: 'trail',
      });
    };

    const addEmber = () => {
      const a = Math.random() * Math.PI * 2;
      const d = fb.r + Math.random() * 24;
      push({
        x: fb.x + Math.cos(a) * d, y: fb.y + Math.sin(a) * d,
        vx: Math.cos(a) * 2.2, vy: Math.sin(a) * 2.2 - 0.8,
        life: 0.14 + Math.random() * 0.1,
        maxLife: 0.14 + Math.random() * 0.1,
        r: Math.random() * 5 + 2,
        hue: Math.random() > 0.4 ? 158 : 36,
        lit: 68, type: 'ember',
      });
    };

    const addSpark = (x: number, y: number) => {
      const a  = Math.random() * Math.PI * 2;
      const sp = Math.random() * 9 + 2.5;
      const g  = Math.random() > 0.5;
      push({
        x, y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - Math.random() * 2.5,
        life: 0.45 + Math.random() * 0.9,
        maxLife: 0.45 + Math.random() * 0.9,
        r: Math.random() * 5 + 1.5,
        hue: g ? 150 + Math.random() * 24 : 26 + Math.random() * 26,
        lit: 68, type: 'spark',
      });
    };

    const addFlame = (x0: number, tW: number, type: PType) => {
      const x = x0 + Math.random() * tW;
      let r: number, life: number, hue: number, lit: number, vy: number;

      if (type === 'flame_lg') {
        r = Math.random() * 18 + 14; life = 0.6 + Math.random() * 0.55;
        vy = -(Math.random() * 2.8 + 2.2);
        hue = Math.random() > 0.45 ? 150 + Math.random() * 22 : 28 + Math.random() * 20;
        lit = hue > 100 ? 52 : 60;
      } else if (type === 'flame_md') {
        r = Math.random() * 9 + 6; life = 0.32 + Math.random() * 0.38;
        vy = -(Math.random() * 4 + 2.8);
        hue = Math.random() > 0.4 ? 150 + Math.random() * 24 : 26 + Math.random() * 22;
        lit = hue > 100 ? 56 : 64;
      } else {
        r = Math.random() * 4 + 2; life = 0.14 + Math.random() * 0.2;
        vy = -(Math.random() * 6 + 4.5);
        hue = Math.random() > 0.3 ? 155 : 44 + Math.random() * 20;
        lit = 72;
      }

      push({
        x: x + (Math.random() - 0.5) * 10, y: CY + 22,
        vx: (Math.random() - 0.5) * 1.2, vy,
        life, maxLife: life, r, hue, lit, type,
      });
    };

    let startTime = 0;
    let rafId     = 0;
    let impacted  = false;
    let textShown = false;
    let frame     = 0;

    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;
      frame++;

      ctx.clearRect(0, 0, W, H);

      // ── HEAT COLUMN (post-impact atmosphere) ─────────────────
      if (t > 1.2 && t < 4.0) {
        const age  = t - 1.2;
        const colA = age < 0.4
          ? (age / 0.4) * 0.22
          : Math.max(0, 0.22 - (age - 0.4) / 2.4 * 0.22);
        const cW = Math.min(W * 0.72, 600);
        const cX = (W - cW) / 2;
        const grad = ctx.createLinearGradient(cX, CY - H * 0.45, cX, CY + 80);
        grad.addColorStop(0, 'rgba(16,185,129,0)');
        grad.addColorStop(0.55, `rgba(16,185,129,${colA})`);
        grad.addColorStop(1, 'rgba(16,185,129,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(cX, CY - H * 0.45, cW, H * 0.45 + 80);
      }

      // ── FIREBALL DESCENT (0.1 → 1.2s) ────────────────────────
      if (t < 1.2) {
        const raw  = Math.max(0, (t - 0.08) / 1.12);
        const ease = 1 - Math.pow(1 - Math.min(raw, 1), 2.5);
        fb.y = -110 + (CY + 110) * ease;

        if (t > 0.08 && frame % 2 === 0) {
          for (let k = 0; k < 10; k++) addTrail();
          for (let k = 0; k < 4; k++)  addEmber();
        }
      }

      // ── IMPACT (t ≈ 1.2s) ────────────────────────────────────
      if (t >= 1.2 && !impacted) {
        impacted = true;
        fb.y = CY;

        // 280 explosion sparks
        for (let k = 0; k < 280; k++) addSpark(fb.x, fb.y);

        // 3 expanding shockwave rings
        rings.push(
          { r: 0, targetR: W * 0.38, a: 0.75, w: 3.5 },
          { r: 0, targetR: W * 0.54, a: 0.48, w: 2   },
          { r: 0, targetR: W * 0.72, a: 0.26, w: 1.5 },
        );

        // Screen shake
        if (rootRef.current) {
          const el = rootRef.current;
          gsap.timeline()
            .to(el, { x: -12, y: 8,  duration: 0.06, ease: 'none' })
            .to(el, { x: 10,  y: -6, duration: 0.06, ease: 'none' })
            .to(el, { x: -7,  y: 5,  duration: 0.06, ease: 'none' })
            .to(el, { x: 5,   y: -3, duration: 0.06, ease: 'none' })
            .to(el, { x: -3,  y: 2,  duration: 0.06, ease: 'none' })
            .to(el, { x: 0,   y: 0,  duration: 0.06, ease: 'none' });
        }

        // Text ignition
        if (!textShown) {
          textShown = true;
          gsap.fromTo(textEl,
            { opacity: 0, scale: 1.18, filter: 'blur(22px) brightness(6)' },
            { opacity: 1, scale: 1,    filter: 'blur(0px)  brightness(1)',
              duration: 1.1, delay: 0.12, ease: 'power2.out' }
          );
        }
      }

      // ── FIREBALL RENDER ───────────────────────────────────────
      if (t < 2.6) {
        const age  = Math.max(t - 1.2, 0);
        const fbA  = t < 1.2 ? 1 : Math.max(0, 1 - age / 1.4);
        const r    = fb.r * (t < 1.2 ? 1 : Math.max(0.05, 1 - age / 1.15));

        if (fbA > 0.01) {
          // Wide atmospheric halo
          const halo = ctx.createRadialGradient(fb.x, fb.y, 0, fb.x, fb.y, r * 7);
          halo.addColorStop(0,   `rgba(16,185,129,${0.38 * fbA})`);
          halo.addColorStop(0.4, `rgba(16,185,129,${0.10 * fbA})`);
          halo.addColorStop(1,   'rgba(16,185,129,0)');
          ctx.fillStyle = halo;
          ctx.beginPath(); ctx.arc(fb.x, fb.y, r * 7, 0, Math.PI * 2); ctx.fill();

          // Bright core
          const core = ctx.createRadialGradient(fb.x, fb.y, 0, fb.x, fb.y, r);
          core.addColorStop(0,    `rgba(255,255,255,${fbA})`);
          core.addColorStop(0.22, `rgba(220,255,232,${0.98 * fbA})`);
          core.addColorStop(0.6,  `rgba(16,185,129,${0.92 * fbA})`);
          core.addColorStop(1,    'rgba(4,120,87,0)');
          ctx.fillStyle = core;
          ctx.beginPath(); ctx.arc(fb.x, fb.y, r, 0, Math.PI * 2); ctx.fill();
        }
      }

      // ── SHOCKWAVE RINGS ───────────────────────────────────────
      for (const sw of rings) {
        const speed = (sw.targetR - sw.r) * 0.13 + 4;
        sw.r    = Math.min(sw.r + speed, sw.targetR);
        sw.a   *= 0.865;
        if (sw.a < 0.008) continue;
        ctx.strokeStyle = `rgba(16,185,129,${sw.a})`;
        ctx.lineWidth   = sw.w;
        ctx.beginPath();
        ctx.arc(fb.x, CY, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── IMPACT FLASH ──────────────────────────────────────────
      if (t > 1.2 && t < 1.75) {
        const age    = t - 1.2;
        const flashA = Math.max(0, 0.65 - age / 0.55 * 0.65);
        const radial = ctx.createRadialGradient(fb.x, CY, 0, fb.x, CY, W * 0.72);
        radial.addColorStop(0,    `rgba(230,255,245,${flashA})`);
        radial.addColorStop(0.28, `rgba(16,185,129,${flashA * 0.75})`);
        radial.addColorStop(1,    'rgba(16,185,129,0)');
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, W, H);
      }

      // ── SPAWN FLAMES ──────────────────────────────────────────
      if (t > 1.3 && t < 3.8 && frame % 2 === 0) {
        const tW = Math.min(W * 0.68, 540);
        const x0 = (W - tW) / 2;

        const intensity = t < 2.1 ? 1.0 : t < 3.0 ? 0.75 : 0.35;

        for (let k = 0; k < Math.round(5 * intensity);  k++) addFlame(x0, tW, 'flame_lg');
        for (let k = 0; k < Math.round(8 * intensity);  k++) addFlame(x0, tW, 'flame_md');
        for (let k = 0; k < Math.round(6 * intensity);  k++) addFlame(x0, tW, 'flame_sm');
      }

      // ── UPDATE + DRAW PARTICLES ───────────────────────────────
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];

        if (p.type === 'spark') {
          p.vy += 0.14; p.vx *= 0.966;
        } else if (p.type.startsWith('flame')) {
          p.vy -= 0.05 + (p.type === 'flame_lg' ? 0.01 : 0);
          p.vx += (Math.random() - 0.5) * 0.26;
          p.r  *= 0.989;
        } else {
          p.vx *= 0.88; p.vy *= 0.88;
        }

        p.x += p.vx; p.y += p.vy;
        p.life -= 1 / (p.maxLife * 60);
        if (p.life <= 0) { ps.splice(i, 1); continue; }

        const pct = p.life / p.maxLife;

        if (p.type.startsWith('flame')) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0,    `hsla(${p.hue},98%,${p.lit + 15}%,${pct * 0.62})`);
          g.addColorStop(0.45, `hsla(${p.hue},98%,${p.lit}%,${pct * 0.38})`);
          g.addColorStop(1,    `hsla(${p.hue},95%,${p.lit - 20}%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = pct * (p.type === 'trail' ? 0.52 : 0.88);
          ctx.fillStyle   = `hsl(${p.hue},95%,${p.lit}%)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * pct + 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // ── FADE OUT ──────────────────────────────────────────────
      if (t > 4.3) {
        const a = Math.min((t - 4.3) / 0.8, 1);
        ctx.globalAlpha = a;
        ctx.fillStyle   = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }

      if (t < TOTAL_DUR) {
        rafId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(rafId);
        setRemoved(true);
        onComplete();
      }
    };

    gsap.to(textEl, { opacity: 0, filter: 'blur(10px)', duration: 0.7, delay: 4.4 });

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(textEl);
      if (rootRef.current) gsap.killTweensOf(rootRef.current);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">

      {/* CRT scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
      }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

      {/* Text */}
      <div ref={textRef} style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0,
      }}>
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: 'clamp(26px, 4.8vw, 62px)',
          letterSpacing: '0.05em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textShadow: [
            '0 0 16px rgba(16,185,129,1)',
            '0 0 36px rgba(16,185,129,0.72)',
            '0 0 72px rgba(16,185,129,0.38)',
            '0 0 120px rgba(16,185,129,0.18)',
          ].join(', '),
        }}>
          EH Automation
        </span>
      </div>

    </div>
  );
};

export default IntroScreen;

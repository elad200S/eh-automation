import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

const TOTAL_DUR = 4.4;
const MAX_PS    = 320;

type PType = 'spark' | 'flame' | 'trail' | 'ember';
interface P {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number; hue: number;
  type: PType;
}

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const textEl = textRef.current!;

    // Fireball
    const fb = { x: W / 2, y: -85, radius: 28 };
    const fbTargetY = H * 0.47;

    const ps: P[] = [];

    const add = (
      x: number, y: number,
      vx: number, vy: number,
      life: number, r: number,
      hue: number, type: PType
    ) => {
      if (ps.length >= MAX_PS) return;
      ps.push({ x, y, vx, vy, life, maxLife: life, r, hue, type });
    };

    let startTime = 0;
    let rafId     = 0;
    let impacted  = false;
    let frame     = 0;

    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;
      frame++;

      ctx.clearRect(0, 0, W, H);

      // ── 1. FALLING FIREBALL (0 → 0.72s) ──────────────────────
      if (t < 0.72) {
        const prog = Math.min(t / 0.72, 1);
        const ease = 1 - Math.pow(1 - prog, 2.6);
        fb.y = -85 + (fbTargetY + 85) * ease;

        if (frame % 2 === 0) {
          for (let k = 0; k < 4; k++) {
            add(
              fb.x + (Math.random() - 0.5) * fb.radius,
              fb.y + (Math.random() - 0.5) * fb.radius,
              (Math.random() - 0.5) * 1.4,
              Math.random() * 1.8 + 0.4,
              0.22 + Math.random() * 0.16,
              Math.random() * 9 + 4,
              Math.random() > 0.55 ? 155 + Math.random() * 20 : 32 + Math.random() * 16,
              'trail'
            );
          }
          // Orbiting embers
          for (let k = 0; k < 2; k++) {
            const a = Math.random() * Math.PI * 2;
            const d = fb.radius + Math.random() * 16;
            add(
              fb.x + Math.cos(a) * d, fb.y + Math.sin(a) * d,
              Math.cos(a) * 1.8, Math.sin(a) * 1.8 - 0.6,
              0.15 + Math.random() * 0.12, Math.random() * 4 + 1.5,
              Math.random() > 0.4 ? 160 : 36,
              'ember'
            );
          }
        }
      }

      // ── 2. IMPACT (t ≈ 0.72s) ────────────────────────────────
      if (t >= 0.72 && !impacted) {
        impacted = true;
        fb.y = fbTargetY;

        // 140 explosion sparks
        for (let k = 0; k < 140; k++) {
          const a = Math.random() * Math.PI * 2;
          const sp = Math.random() * 7 + 2;
          add(
            fb.x + (Math.random() - 0.5) * 10,
            fb.y + (Math.random() - 0.5) * 10,
            Math.cos(a) * sp, Math.sin(a) * sp - 1.8,
            0.45 + Math.random() * 0.75,
            Math.random() * 4 + 1,
            Math.random() > 0.45 ? 152 + Math.random() * 22 : 28 + Math.random() * 22,
            'spark'
          );
        }

        // Ignite text: orange-hot → cool green-white
        gsap.fromTo(textEl,
          {
            opacity: 0,
            filter: 'blur(14px) brightness(3) hue-rotate(130deg)',
            scale: 1.1,
          },
          {
            opacity: 1,
            filter: 'blur(0px) brightness(1) hue-rotate(0deg)',
            scale: 1,
            duration: 1.1,
            delay: 0.08,
            ease: 'power2.out',
          }
        );
      }

      // ── 3. DRAW FIREBALL ──────────────────────────────────────
      if (t < 2.2) {
        const age      = Math.max(t - 0.72, 0);
        const fbAlpha  = t < 0.72 ? 1 : Math.max(0, 1 - age / 1.48);
        const fbRadius = t < 0.72 ? fb.radius : fb.radius * Math.max(0.1, 1 - age / 1.1);

        if (fbAlpha > 0.01) {
          // Atmospheric halo
          const halo = ctx.createRadialGradient(fb.x, fb.y, 0, fb.x, fb.y, fbRadius * 5.5);
          halo.addColorStop(0,   `rgba(16,185,129,${0.3  * fbAlpha})`);
          halo.addColorStop(0.5, `rgba(16,185,129,${0.08 * fbAlpha})`);
          halo.addColorStop(1,   'rgba(16,185,129,0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(fb.x, fb.y, fbRadius * 5.5, 0, Math.PI * 2);
          ctx.fill();

          // Core
          const core = ctx.createRadialGradient(fb.x, fb.y, 0, fb.x, fb.y, fbRadius);
          core.addColorStop(0,   `rgba(255,255,255,${fbAlpha})`);
          core.addColorStop(0.3, `rgba(187,247,208,${0.97 * fbAlpha})`);
          core.addColorStop(0.65,`rgba(16,185,129,${0.88 * fbAlpha})`);
          core.addColorStop(1,   'rgba(4,120,87,0)');
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(fb.x, fb.y, fbRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 4. SHOCKWAVE RING ─────────────────────────────────────
      if (t > 0.72 && t < 1.08) {
        const age  = t - 0.72;
        const rRad = (age / 0.36) * W * 0.32;
        const rAlpha = Math.max(0, 1 - age / 0.36) * 0.38;
        ctx.strokeStyle = `rgba(16,185,129,${rAlpha})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(fb.x, fb.y, rRad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── 5. IMPACT FLASH ───────────────────────────────────────
      if (t > 0.72 && t < 1.05) {
        const age    = t - 0.72;
        const flashA = Math.max(0, 0.28 - age / 1.16);
        const radial = ctx.createRadialGradient(fb.x, fb.y, 0, fb.x, fb.y, W * 0.55);
        radial.addColorStop(0,   `rgba(210,255,235,${flashA})`);
        radial.addColorStop(0.35,`rgba(16,185,129,${flashA * 0.6})`);
        radial.addColorStop(1,   'rgba(16,185,129,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 6. SPAWN TEXT FLAMES ──────────────────────────────────
      if (t > 1.05 && t < 3.15 && frame % 2 === 0) {
        const tW = Math.min(W * 0.66, 520);
        const x0 = (W - tW) / 2;
        const density = t < 1.9 ? 6 : t < 2.7 ? 4 : 2;
        for (let k = 0; k < density; k++) {
          add(
            x0 + Math.random() * tW,
            H * 0.5 + 16,
            (Math.random() - 0.5) * 0.9,
            -(Math.random() * 3.0 + 1.8),
            0.32 + Math.random() * 0.42,
            Math.random() * 11 + 5,
            Math.random() > 0.52 ? 152 + Math.random() * 22 : 30 + Math.random() * 18,
            'flame'
          );
        }
      }

      // ── 7. UPDATE + DRAW PARTICLES ────────────────────────────
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];

        if (p.type === 'spark') {
          p.vy += 0.13; p.vx *= 0.97;
        } else if (p.type === 'flame') {
          p.vy -= 0.05;
          p.vx += (Math.random() - 0.5) * 0.18;
          p.r  *= 0.993;
        } else {
          p.vx *= 0.91; p.vy *= 0.91;
        }

        p.x += p.vx; p.y += p.vy;
        p.life -= 1 / (p.maxLife * 60);
        if (p.life <= 0) { ps.splice(i, 1); continue; }

        const pct = p.life / p.maxLife;

        if (p.type === 'flame') {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          const l = p.hue > 100 ? 55 : 62;
          g.addColorStop(0, `hsla(${p.hue},95%,${l}%,${pct * 0.52})`);
          g.addColorStop(0.55, `hsla(${p.hue},95%,${l - 12}%,${pct * 0.28})`);
          g.addColorStop(1,   `hsla(${p.hue},95%,${l - 20}%,0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = pct * (p.type === 'trail' ? 0.6 : 0.88);
          ctx.fillStyle   = `hsl(${p.hue},90%,65%)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * pct + 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // ── 8. FADE OUT ───────────────────────────────────────────
      if (t > 3.5) {
        const a = Math.min((t - 3.5) / 0.8, 1);
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

    // Fade text out before the black overlay covers it
    gsap.to(textEl, {
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.65,
      delay: 3.55,
    });

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(textEl);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">

      {/* CRT scan lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
      }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

      {/* Text — appears via GSAP */}
      <div
        ref={textRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: 'clamp(26px, 4.8vw, 62px)',
          letterSpacing: '0.05em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textShadow: [
            '0 0 18px rgba(16,185,129,0.95)',
            '0 0 38px rgba(16,185,129,0.55)',
            '0 0 70px rgba(16,185,129,0.25)',
          ].join(', '),
        }}>
          EH Automation
        </span>
      </div>

    </div>
  );
};

export default IntroScreen;

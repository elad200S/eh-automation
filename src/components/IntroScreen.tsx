import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

const TOTAL_DUR = 5.2;
const N = 24; // flame count around ring

// Draw one flame shape using bezier curves — like a real flame silhouette
function drawFlame(
  ctx: CanvasRenderingContext2D,
  bx: number, by: number,
  w: number, h: number,
  lean: number,
) {
  const hw  = w  * 0.5;
  const tip = { x: bx + lean, y: by - h };
  ctx.beginPath();
  ctx.moveTo(bx - hw, by);
  ctx.bezierCurveTo(
    bx - hw,              by - h * 0.3,
    tip.x - hw * 0.35,   by - h * 0.72,
    tip.x,               tip.y,
  );
  ctx.bezierCurveTo(
    tip.x + hw * 0.35,   by - h * 0.72,
    bx + hw,              by - h * 0.3,
    bx + hw,              by,
  );
  ctx.closePath();
}

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const W  = window.innerWidth;
    const H  = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width  = W;
    canvas.height = H;
    const ctx    = canvas.getContext('2d')!;
    const textEl = textRef.current!;

    const CX = W / 2;
    const CY = H / 2;
    const RING_R = Math.min(W, H) * 0.22;

    // Per-flame random personality
    const ph  = Array.from({ length: N }, () => Math.random() * Math.PI * 2);
    const hSd = Array.from({ length: N }, () => 0.75 + Math.random() * 0.5);
    const wSd = Array.from({ length: N }, () => 0.80 + Math.random() * 0.4);

    // Spark particles
    interface Spark { x: number; y: number; vx: number; vy: number; life: number; }
    const sparks: Spark[] = [];
    const addSpark = (x: number, y: number) => {
      sparks.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 3 + 1.5),
        life: 1,
      });
    };

    let t0 = 0, raf = 0, textShown = false, frame = 0;

    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;
      frame++;

      // Global intensity
      const intensity =
        t < 0.25 ? 0 :
        t < 1.3  ? (t - 0.25) / 1.05 :
        t < 3.2  ? 1 :
        t < 4.3  ? 1 - (t - 3.2) / 1.1 :
        0;

      // Slow "breath" on top
      const breath = 1 + Math.sin(t * 1.8) * 0.06;

      // Text reveal
      if (!textShown && t > 1.1) {
        textShown = true;
        gsap.fromTo(textEl,
          { opacity: 0, filter: 'blur(18px) brightness(4)', scale: 1.1 },
          { opacity: 1, filter: 'blur(0px) brightness(1)', scale: 1,
            duration: 0.95, ease: 'power2.out' },
        );
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      if (intensity > 0.01) {
        // ── Ambient glow (ring halo) ─────────────────────────────
        const ambient = ctx.createRadialGradient(CX, CY, RING_R * 0.5, CX, CY, RING_R * 2.4);
        ambient.addColorStop(0,   `rgba(16,185,129,${0.10 * intensity})`);
        ambient.addColorStop(0.45,`rgba(16,185,129,${0.14 * intensity})`);
        ambient.addColorStop(1,   'rgba(16,185,129,0)');
        ctx.fillStyle = ambient;
        ctx.beginPath();
        ctx.arc(CX, CY, RING_R * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // ── Hot ring circle ──────────────────────────────────────
        ctx.save();
        ctx.shadowColor = `rgba(150,255,190,${0.9 * intensity})`;
        ctx.shadowBlur  = 10;
        ctx.strokeStyle = `rgba(200,255,220,${0.7 * intensity})`;
        ctx.lineWidth   = 2.5;
        ctx.beginPath();
        ctx.arc(CX, CY, RING_R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // ── Flames ───────────────────────────────────────────────
        for (let i = 0; i < N; i++) {
          const angle = (i / N) * Math.PI * 2;
          const bx    = CX + Math.cos(angle) * RING_R;
          const by    = CY + Math.sin(angle) * RING_R;

          const p = ph[i];
          // Multi-frequency flicker for organic movement
          const flicker =
            Math.sin(t * 4.2 + p)        * 0.20 +
            Math.sin(t * 7.8 + p * 1.9)  * 0.12 +
            Math.sin(t * 13.1 + p * 0.7) * 0.06;

          const maxH = RING_R * 1.15 * breath;
          const h    = maxH * intensity * hSd[i] * (1 + flicker);
          const w    = RING_R * 0.19 * wSd[i];
          const lean = Math.sin(t * 2.4 + p * 1.2) * w * 0.55;

          if (h < 2) continue;

          // ── Outer flame layer (wide, semi-transparent) ─────────
          ctx.save();
          ctx.globalAlpha = 0.45 * intensity;
          drawFlame(ctx, bx, by, w * 1.6, h * 1.12, lean * 1.3);
          const gO = ctx.createLinearGradient(bx, by, bx + lean * 0.4, by - h * 1.12);
          gO.addColorStop(0,   'rgba(50,255,160,0.9)');
          gO.addColorStop(0.4, 'rgba(16,185,129,0.6)');
          gO.addColorStop(0.8, 'rgba(0,120,70,0.2)');
          gO.addColorStop(1,   'rgba(0,80,40,0)');
          ctx.fillStyle = gO;
          ctx.fill();
          ctx.restore();

          // ── Inner flame (hot core — white→green) ───────────────
          ctx.save();
          ctx.globalAlpha = 0.9 * intensity;
          drawFlame(ctx, bx, by, w, h, lean);
          const gI = ctx.createLinearGradient(bx, by, bx + lean * 0.35, by - h);
          gI.addColorStop(0,    'rgba(255,255,230,1)');
          gI.addColorStop(0.12, 'rgba(200,255,215,0.98)');
          gI.addColorStop(0.35, 'rgba(50,230,140,0.9)');
          gI.addColorStop(0.65, 'rgba(16,185,129,0.65)');
          gI.addColorStop(0.88, 'rgba(0,140,80,0.25)');
          gI.addColorStop(1,    'rgba(0,80,40,0)');
          ctx.fillStyle = gI;
          ctx.fill();
          ctx.restore();

          // ── Ember glow at base ─────────────────────────────────
          ctx.save();
          ctx.globalAlpha = 0.7 * intensity;
          const gB = ctx.createRadialGradient(bx, by, 0, bx, by, w * 1.4);
          gB.addColorStop(0, 'rgba(220,255,235,0.95)');
          gB.addColorStop(0.5,'rgba(16,185,129,0.5)');
          gB.addColorStop(1, 'rgba(16,185,129,0)');
          ctx.fillStyle = gB;
          ctx.beginPath();
          ctx.arc(bx, by, w * 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Occasionally spawn sparks
          if (frame % 4 === 0 && Math.random() < 0.25 * intensity) {
            addSpark(bx + lean * 0.5, by - h * 0.85);
          }
        }

        // ── Sparks ───────────────────────────────────────────────
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x  += s.vx; s.y += s.vy; s.vy -= 0.04;
          s.life -= 0.022;
          if (s.life <= 0) { sparks.splice(i, 1); continue; }
          ctx.save();
          ctx.globalAlpha = s.life * 0.9;
          ctx.fillStyle   = `hsl(152,90%,${55 + s.life * 25}%)`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.life * 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Fade to black ────────────────────────────────────────
      if (t > 4.35) {
        const a = Math.min((t - 4.35) / 0.72, 1);
        ctx.globalAlpha = a;
        ctx.fillStyle   = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }

      if (t < TOTAL_DUR) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        setRemoved(true);
        onComplete();
      }
    };

    gsap.to(textEl, { opacity: 0, filter: 'blur(10px)', duration: 0.65, delay: 4.45 });

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      gsap.killTweensOf(textEl);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
      }} />

      {/* Fire canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      />

      {/* Text in center of fire ring */}
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
          fontSize: 'clamp(20px, 3.8vw, 52px)',
          letterSpacing: '0.06em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textShadow: [
            '0 0 4px #000',
            '0 0 10px #000',
            '0 0 20px rgba(16,185,129,1)',
            '0 0 42px rgba(16,185,129,0.75)',
            '0 0 80px rgba(16,185,129,0.4)',
          ].join(', '),
        }}>
          EH Automation
        </span>
      </div>
    </div>
  );
};

export default IntroScreen;

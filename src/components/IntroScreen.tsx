import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'intro_played';
const TARGET_TEXT = 'EH Automation';
const GLOW_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#10b981', '#34d399', '#a5f3fc'];
const CODE_CHARS = '01アイABCDEF{}[]<>|@#$%^&*█▓░◈∆⊗ΛΣΠ';

// Timing
const WIPE_DUR       = 1.4;   // left-to-right video reveal
const CONVERGE_START = 1.05;  // particles start after wipe begins
const CONVERGE_DUR   = 1.2;
const MAX_DELAY      = 0.2;
const ALL_DONE       = CONVERGE_START + MAX_DELAY + CONVERGE_DUR; // ~2.45s
const HOLD           = 0.35;
const TOTAL_DUR      = ALL_DONE + HOLD;                           // ~2.8s

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function textFontSize(W: number) {
  return Math.min(Math.max(W * 0.05, 26), 64);
}

function sampleTextPixels(text: string, W: number, H: number) {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.font = `bold ${textFontSize(W)}px "IBM Plex Mono", monospace`;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, H / 2);
  const d = ctx.getImageData(0, 0, W, H).data;
  const pts: { x: number; y: number }[] = [];
  const step = 2;
  for (let y = 0; y < H; y += step)
    for (let x = 0; x < W; x += step)
      if (d[(y * W + x) * 4 + 3] > 100) pts.push({ x, y });
  return pts;
}

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef       = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const sweepRef      = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);
  const started = useRef(false);
  const rafId   = useRef(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // ── Atmospheric floating code particles ──────────────────────────────────
    const floaters = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      a: Math.random() * 0.4 + 0.08, da: (Math.random() - 0.5) * 0.01,
      size: Math.random() < 0.3 ? 10 : 7,
      ch: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
      col: GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)],
    }));

    // ── Holographic light traces ─────────────────────────────────────────────
    const traces = [
      { triggerAt: 0.5,  y: H * 0.38, speed: W * 1.6, progress: -1, opa: 0.07 },
      { triggerAt: 0.9,  y: H * 0.52, speed: W * 1.9, progress: -1, opa: 0.05 },
      { triggerAt: 1.2,  y: H * 0.46, speed: W * 1.4, progress: -1, opa: 0.06 },
    ];

    // ── Converging text particles ────────────────────────────────────────────
    let textParticles: {
      sx: number; sy: number; tx: number; ty: number;
      delay: number; size: number; col: string;
    }[] = [];

    const setupParticles = () => {
      const pixels = sampleTextPixels(TARGET_TEXT, W, H);
      textParticles = pixels
        .sort(() => Math.random() - 0.5)
        .map(p => ({
          sx: Math.random() * W, sy: Math.random() * H,
          tx: p.x, ty: p.y,
          delay: Math.random() * MAX_DELAY,
          size: 2.2,
          col: GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)],
        }));
    };

    // ── Main draw loop ───────────────────────────────────────────────────────
    let startTime: number | null = null;

    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;

      ctx.clearRect(0, 0, W, H);

      // Digital noise
      for (let i = 0; i < 180; i++) {
        ctx.globalAlpha = Math.random() * 0.018;
        ctx.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#fff';
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }

      // Holographic traces
      traces.forEach(tr => {
        if (elapsed < tr.triggerAt) return;
        if (tr.progress < 0) tr.progress = 0;
        tr.progress += tr.speed / 60 / W;
        const x = tr.progress * W * 1.2 - W * 0.1;
        const len = W * 0.18;
        const grad = ctx.createLinearGradient(x - len, 0, x + len, 0);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(6,182,212,${tr.opa})`);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fillRect(x - len, tr.y - 0.5, len * 2, 1);
      });

      // Atmospheric floaters
      const floatA = Math.min(elapsed / 0.4, 1);
      floaters.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.a += p.da;
        if (p.a <= 0.05 || p.a >= 0.55) p.da *= -1;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.globalAlpha = p.a * floatA * 0.65;
        ctx.fillStyle = p.col;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.ch, p.x, p.y);
      });

      // Converging text particles
      textParticles.forEach(p => {
        const raw = (elapsed - CONVERGE_START - p.delay) / CONVERGE_DUR;
        const prog = Math.min(Math.max(raw, 0), 1);
        if (prog === 0) return;
        const ease = easeOutCubic(prog);
        const x = p.sx + (p.tx - p.sx) * ease;
        const y = p.sy + (p.ty - p.sy) * ease;
        const baseA = prog < 0.25 ? (prog / 0.25) : 1;

        if (prog > 0.6) {
          ctx.globalAlpha = (prog - 0.6) / 0.4 * 0.12;
          ctx.shadowBlur = 8; ctx.shadowColor = p.col;
          ctx.fillStyle = '#a5f3fc';
          const gs = p.size * 3;
          ctx.fillRect(x - gs / 2, y - gs / 2, gs, gs);
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = baseA * 0.9;
        ctx.fillStyle = p.col;
        ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size);

        if (prog > 0.85) {
          ctx.globalAlpha = (prog - 0.85) / 0.15 * 0.08;
          ctx.shadowBlur = 12; ctx.shadowColor = '#22d3ee';
          ctx.fillStyle = '#22d3ee';
          ctx.fillRect(x - 1, y - 1, 2, 2);
          ctx.shadowBlur = 0;
        }
      });

      if (elapsed < TOTAL_DUR) rafId.current = requestAnimationFrame(draw);
    };

    // ── Start sequence ───────────────────────────────────────────────────────
    const run = () => {
      if (started.current) return;
      started.current = true;

      // Light sweep
      if (sweepRef.current)
        gsap.fromTo(sweepRef.current,
          { x: '-100%' }, { x: '280%', duration: TOTAL_DUR * 0.9, delay: 0.1, ease: 'power1.inOut' });

      // Canvas draw loop
      rafId.current = requestAnimationFrame(draw);

      // Fade out and done
      gsap.to(rootRef.current, {
        opacity: 0, duration: 0.85, delay: TOTAL_DUR, ease: 'power2.out',
        onComplete: () => { cancelAnimationFrame(rafId.current); setRemoved(true); onComplete(); },
      });
    };

    document.fonts.load(`bold 64px "IBM Plex Mono"`).finally(() => {
      setupParticles();
      run();
    });

    return () => {
      cancelAnimationFrame(rafId.current);
      gsap.killTweensOf(rootRef.current);
      gsap.killTweensOf(sweepRef.current);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">

      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.09) 2px, rgba(0,0,0,0.09) 4px)',
      }} />

      {/* Holographic light sweep */}
      <div ref={sweepRef} style={{
        position: 'absolute', top: 0, bottom: 0, width: '20%', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.08) 50%, transparent)',
        transform: 'translateX(-100%)',
      }} />

      {/* Particle animation canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

    </div>
  );
};

export default IntroScreen;
export { STORAGE_KEY as INTRO_STORAGE_KEY };

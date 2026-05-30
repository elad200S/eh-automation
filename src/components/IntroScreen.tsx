import { useEffect, useRef, useState } from 'react';

export const INTRO_STORAGE_KEY = 'intro_played';

const TOTAL_DUR = 5.0;
const SEGS = 512; // angular segments for organic burn edge

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const CX = W / 2;
    const CY = H / 2;
    // MAX_R must reach all 4 corners
    const MAX_R = Math.sqrt(CX * CX + CY * CY) + 60;

    // ── Pre-render text to offscreen canvas ──────────────────────
    const textOff = document.createElement('canvas');
    textOff.width = W; textOff.height = H;
    const tCtx   = textOff.getContext('2d')!;

    const paintText = () => {
      tCtx.clearRect(0, 0, W, H);
      const fs = Math.min(Math.max(W * 0.048, 26), 62);
      tCtx.font          = `700 ${fs}px "IBM Plex Mono", monospace`;
      tCtx.textAlign     = 'center';
      tCtx.textBaseline  = 'middle';
      // Wide green glow
      tCtx.shadowColor = 'rgba(16,185,129,1)';
      tCtx.shadowBlur  = 45;
      tCtx.fillStyle   = 'rgba(16,185,129,0.45)';
      tCtx.fillText('EH Automation', CX, CY);
      // Tight bright glow + white text
      tCtx.shadowBlur  = 18;
      tCtx.fillStyle   = '#fff';
      tCtx.fillText('EH Automation', CX, CY);
      tCtx.shadowBlur  = 0;
    };
    document.fonts.load(`700 62px "IBM Plex Mono"`).finally(paintText);

    // ── Organic noise for irregular burn edge ─────────────────────
    // Each segment has an amplitude offset from the base burn radius
    const amp = new Float32Array(SEGS);
    const vel = new Float32Array(SEGS);
    for (let i = 0; i < SEGS; i++) {
      amp[i] = (Math.random() - 0.5) * 30;
      vel[i] = (Math.random() - 0.5) * 0.25;
    }

    let t0 = 0, raf = 0;

    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;

      // ── Animate edge noise ───────────────────────────────────
      for (let i = 0; i < SEGS; i++) {
        vel[i] += (Math.random() - 0.5) * 0.17;
        vel[i] *= 0.93;
        amp[i] += vel[i];
        amp[i]  = Math.max(-55, Math.min(55, amp[i]));
      }

      // ── Burn radius — expands from 0 to MAX_R ────────────────
      const burnR =
        t < 0.2  ? 0 :
        t < 2.7  ? ((t - 0.2) / 2.5) * MAX_R :
        MAX_R;

      // ── Initial fireball (before burn starts) ────────────────
      const fbR =
        t < 0.25 ? 26 + Math.sin(t * 30) * 5 :
        t < 0.45 ? 31 + (t - 0.25) / 0.2 * 10 :
        Math.max(0, 41 - (t - 0.45) * 130);

      // ── Build organic burn Path2D ─────────────────────────────
      const burnPath = new Path2D();
      for (let i = 0; i < SEGS; i++) {
        const a = (i / SEGS) * Math.PI * 2;
        const r = Math.max(0, burnR + amp[i]);
        const x = CX + Math.cos(a) * r;
        const y = CY + Math.sin(a) * r;
        i === 0 ? burnPath.moveTo(x, y) : burnPath.lineTo(x, y);
      }
      burnPath.closePath();

      // ── Clear ─────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      if (burnR > 1) {
        // Edge glow fades as fire reaches screen edges
        const eFade = burnR > MAX_R * 0.80
          ? Math.max(0, 1 - (burnR - MAX_R * 0.80) / (MAX_R * 0.20))
          : 1;

        // ── Fire edge — 3 stroke layers (drawn BEFORE mask) ─────
        // The mask will cover the glow OUTSIDE the burn area,
        // leaving only the inward-facing ember glow on the burned edge.

        // 1) Wide amber halo
        ctx.shadowColor = `rgba(255,110,10,${0.65 * eFade})`;
        ctx.shadowBlur  = 36;
        ctx.strokeStyle = `rgba(255,130,20,${0.28 * eFade})`;
        ctx.lineWidth   = 14;
        ctx.stroke(burnPath);

        // 2) Orange-gold mid
        ctx.shadowColor = `rgba(255,195,45,${0.85 * eFade})`;
        ctx.shadowBlur  = 18;
        ctx.strokeStyle = `rgba(255,205,65,${0.7 * eFade})`;
        ctx.lineWidth   = 7;
        ctx.stroke(burnPath);

        // 3) White-hot inner edge
        ctx.shadowColor = `rgba(255,255,210,${eFade})`;
        ctx.shadowBlur  = 6;
        ctx.strokeStyle = `rgba(255,255,240,${0.95 * eFade})`;
        ctx.lineWidth   = 2.5;
        ctx.stroke(burnPath);

        ctx.shadowBlur = 0;

        // ── Reveal text clipped to burned area ───────────────────
        ctx.save();
        ctx.clip(burnPath);
        ctx.drawImage(textOff, 0, 0);
        ctx.restore();

        // ── Black mask: covers everything OUTSIDE burn path ──────
        // Uses even-odd rule: outer-rect(1) + burnPath(1) = 2 (even, not filled)
        // outside burnPath but inside rect = 1 (odd, filled black)
        const mask = new Path2D();
        mask.rect(0, 0, W, H);
        mask.addPath(burnPath);
        ctx.fillStyle = '#000';
        ctx.fill(mask, 'evenodd');
      }

      // ── Fireball glows on top of everything ───────────────────
      if (fbR > 0.5) {
        ctx.shadowBlur = 0;

        const halo = ctx.createRadialGradient(CX, CY, 0, CX, CY, fbR * 5.5);
        halo.addColorStop(0,   'rgba(16,185,129,0.5)');
        halo.addColorStop(0.5, 'rgba(16,185,129,0.12)');
        halo.addColorStop(1,   'rgba(16,185,129,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(CX, CY, fbR * 5.5, 0, Math.PI * 2);
        ctx.fill();

        const core = ctx.createRadialGradient(CX, CY, 0, CX, CY, fbR);
        core.addColorStop(0,   'rgba(255,255,255,0.98)');
        core.addColorStop(0.28,'rgba(210,255,225,0.93)');
        core.addColorStop(0.65,'rgba(16,185,129,0.88)');
        core.addColorStop(1,   'rgba(4,120,87,0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(CX, CY, fbR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Fade to black ─────────────────────────────────────────
      if (t > 4.15) {
        const a = Math.min((t - 4.15) / 0.72, 1);
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

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">
      {/* CRT scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
      }} />
      {/* Single canvas handles everything */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      />
    </div>
  );
};

export default IntroScreen;

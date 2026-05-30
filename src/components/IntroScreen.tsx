import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

const TOTAL_DUR = 5.4;

// ── Fire colour palette ───────────────────────────────────────────
// Each entry: [r, g, b, a]  for values 0-255
function buildPalette(phase: number): Uint8ClampedArray {
  // phase 0 = orange/classic fire  |  phase 1 = green/brand fire
  const d = new Uint8ClampedArray(256 * 4);

  for (let i = 0; i < 256; i++) {
    let or: number, og: number, ob: number; // orange palette
    let gr: number, gg: number, gb: number; // green palette
    let a: number;

    if (i === 0) { d[i*4+3]=0; continue; }

    // ── orange fire ──────────────────────────────────────────────
    if (i < 55) {
      const t = i/55;
      or=Math.round(t*160); og=Math.round(t*10); ob=0; a=Math.round(t*230);
    } else if (i < 140) {
      const t=(i-55)/85;
      or=Math.round(160+t*95); og=Math.round(10+t*120); ob=0; a=255;
    } else if (i < 215) {
      const t=(i-140)/75;
      or=255; og=Math.round(130+t*105); ob=Math.round(t*55); a=255;
    } else {
      const t=(i-215)/40;
      or=255; og=255; ob=Math.round(55+t*200); a=255;
    }

    // ── green fire ───────────────────────────────────────────────
    if (i < 55) {
      const t = i/55;
      gr=0; gg=Math.round(t*110); gb=Math.round(t*25); a=Math.round(t*230);
    } else if (i < 140) {
      const t=(i-55)/85;
      gr=0; gg=Math.round(110+t*75); gb=Math.round(25+t*55); a=255;
    } else if (i < 215) {
      const t=(i-140)/75;
      gr=Math.round(t*70); gg=Math.round(185+t*55); gb=Math.round(80+t*100); a=255;
    } else {
      const t=(i-215)/40;
      gr=Math.round(70+t*185); gg=255; gb=Math.round(180+t*75); a=255;
    }

    const p = Math.min(phase, 1);
    d[i*4]   = Math.round(or + (gr-or)*p);
    d[i*4+1] = Math.round(og + (gg-og)*p);
    d[i*4+2] = Math.round(ob + (gb-ob)*p);
    d[i*4+3] = a;
  }
  return d;
}

// ── Classic demoscene fire step ───────────────────────────────────
function stepFire(buf: Uint8Array, fw: number, fh: number, intensity: number) {
  // Propagate: each cell = average of 4 cells below it, minus small decay
  for (let y = 0; y < fh - 1; y++) {
    for (let x = 0; x < fw; x++) {
      const b0 = buf[(y+1)*fw + x];
      const b1 = buf[(y+1)*fw + Math.max(x-1, 0)];
      const b2 = buf[(y+1)*fw + Math.min(x+1, fw-1)];
      const b3 = y+2 < fh ? buf[(y+2)*fw + x] : b0;
      const avg = (b0 + b1 + b2 + b3) >> 2;
      buf[y*fw + x] = avg < 2 ? 0 : avg - (Math.random() > 0.55 ? 2 : 1);
    }
  }

  // Fuel: bottom 3 rows, random hot cells driven by intensity
  for (let dy = 0; dy < 3; dy++) {
    const row = fh - 1 - dy;
    for (let x = 0; x < fw; x++) {
      const n = Math.random();
      if (dy === 0) {
        buf[row*fw+x] = n < intensity ? Math.round(210 + n*45) : Math.round(n * 120 * intensity);
      } else {
        buf[row*fw+x] = n < intensity*0.85 ? Math.round(190 + n*50) : buf[row*fw+x];
      }
    }
  }
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
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const textEl = textRef.current!;

    // ── Fire buffer dimensions ────────────────────────────────────
    const SCALE = Math.max(4, Math.round(Math.min(W, H) / 140));
    const FW = Math.ceil(W / SCALE) + 2;
    const FH = Math.ceil(H / SCALE) + 2;

    const buf = new Uint8Array(FW * FH);

    // Offscreen canvas for fire texture
    const off    = document.createElement('canvas');
    off.width    = FW;
    off.height   = FH;
    const offCtx = off.getContext('2d')!;
    const img    = offCtx.createImageData(FW, FH);

    let pal       = buildPalette(0);
    let startTime = 0;
    let rafId     = 0;
    let frame     = 0;
    let textShown = false;

    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;
      frame++;

      // ── Fire intensity over time ────────────────────────────────
      const intensity =
        t < 0.2 ? 0 :
        t < 1.1 ? (t - 0.2) / 0.9 :     // ramp up
        t < 2.8 ? 1.0 :                   // full burn
        t < 4.2 ? 1 - (t - 2.8) / 1.4 : // die down
        0;

      // ── Palette phase: orange → green ──────────────────────────
      const phase =
        t < 1.4 ? 0 :
        t < 2.8 ? (t - 1.4) / 1.4 :
        1;
      if (frame % 8 === 0) pal = buildPalette(phase);

      // ── Show text ──────────────────────────────────────────────
      if (!textShown && t > 0.9) {
        textShown = true;
        gsap.fromTo(textEl,
          { opacity: 0, filter: 'blur(24px) brightness(6)', scale: 1.14 },
          { opacity: 1, filter: 'blur(0px)  brightness(1)', scale: 1,
            duration: 1.0, ease: 'power2.out' }
        );
      }

      // ── Step fire simulation ────────────────────────────────────
      stepFire(buf, FW, FH, intensity);

      // ── Render buffer → image data ──────────────────────────────
      const d = img.data;
      for (let i = 0, n = FW * FH; i < n; i++) {
        const pi = buf[i] * 4;
        const di = i * 4;
        d[di]   = pal[pi];
        d[di+1] = pal[pi+1];
        d[di+2] = pal[pi+2];
        d[di+3] = pal[pi+3];
      }
      offCtx.putImageData(img, 0, 0);

      // ── Draw fire scaled to full screen ─────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingEnabled  = true;
      ctx.imageSmoothingQuality  = 'high';
      ctx.drawImage(off, 0, 0, W, H);

      // ── Fade to black ──────────────────────────────────────────
      if (t > 4.5) {
        const a = Math.min((t - 4.5) / 0.75, 1);
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

    gsap.to(textEl, { opacity: 0, filter: 'blur(12px)', duration: 0.7, delay: 4.6 });

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(textEl);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden" aria-hidden="true">

      {/* Fire canvas — covers entire screen */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      />

      {/* Text — floats above the fire */}
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
          letterSpacing: '0.06em',
          color: '#fff',
          whiteSpace: 'nowrap',
          textShadow: [
            '0 0 4px #000',
            '0 0 8px #000',
            '0 0 18px rgba(16,185,129,1)',
            '0 0 38px rgba(16,185,129,0.8)',
            '0 0 75px rgba(16,185,129,0.45)',
            '0 0 130px rgba(16,185,129,0.2)',
          ].join(', '),
        }}>
          EH Automation
        </span>
      </div>

    </div>
  );
};

export default IntroScreen;

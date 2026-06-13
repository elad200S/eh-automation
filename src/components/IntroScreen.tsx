import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

// 3×3 grid — formation order per brief
const FORMATION = [
  { row: 0, col: 0, delay: 0.00 },
  { row: 0, col: 1, delay: 0.10 },
  { row: 0, col: 2, delay: 0.20 },
  { row: 1, col: 0, delay: 0.36 },
  { row: 1, col: 1, delay: 0.50 },
  { row: 1, col: 2, delay: 0.63 },
  { row: 2, col: 0, delay: 0.76 },
  { row: 2, col: 1, delay: 0.87 },
  { row: 2, col: 2, delay: 0.97 },
];

const SQ  = 44; // square px
const GAP = 5;

// Draw a bezier-curve flame shape (organic, not a circle)
function drawFlame(
  ctx: CanvasRenderingContext2D,
  bx: number, by: number,
  w: number, h: number, lean: number,
) {
  const hw = w * 0.5;
  ctx.beginPath();
  ctx.moveTo(bx - hw, by);
  ctx.bezierCurveTo(bx - hw, by - h * 0.3, bx - hw * 0.3 + lean * 0.6, by - h * 0.75, bx + lean, by - h);
  ctx.bezierCurveTo(bx + hw * 0.3 + lean * 0.6, by - h * 0.75, bx + hw, by - h * 0.3, bx + hw, by);
  ctx.closePath();
}

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);

  const phaseRef  = useRef<'ball'|'impact'|'fire'|'polish'|'exit'>('ball');
  const [phase, _set] = useState(phaseRef.current);
  const setPhase = (p: typeof phaseRef.current) => {
    if (phaseRef.current === p) return;
    phaseRef.current = p;
    _set(p);
  };

  const [removed, setRemoved] = useState(false);

  // ── Canvas: energy ball → shockwave → green fire (frames 1/2/3) ──
  useEffect(() => {
    const W  = window.innerWidth;
    const H  = window.innerHeight;
    const c  = canvasRef.current!;
    c.width  = W; c.height = H;
    const ctx = c.getContext('2d')!;
    const CX = W / 2, CY = H / 2;

    // Fire ring radius (encircles the 3×3 logo grid)
    const RING_R = Math.min(W, H) * 0.20;

    // Ambient particles (always visible)
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
      r: Math.random() * 1.3 + 0.2, a: Math.random() * 0.28 + 0.07,
    }));

    // Post-impact sparks
    type Sp = { x: number; y: number; vx: number; vy: number; life: number };
    const sparks: Sp[] = [];

    // Bezier flames (fire ring phase)
    type Fl = {
      x: number; y: number; vx: number; vy: number;
      life: number; w: number; h: number; lean: number; hue: number;
      angle: number;
    };
    const fls: Fl[] = [];
    let ff = 0; // flame frame counter

    let t0 = 0, raf = 0;

    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;
      ff++;

      ctx.clearRect(0, 0, W, H);

      // ── Ambient floating particles ──────────────────────────────
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.fillStyle   = '#0BB870';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      // ── Scene 1 — Energy core falls (frame 1) ──────────────────
      if (t < 0.7) {
        const ease = 1 - Math.pow(1 - Math.min(t / 0.7, 1), 2.2);
        const by   = -90 + (CY + 90) * ease;

        // Plasma trail (4 ghost layers — motion blur)
        for (let k = 4; k >= 1; k--) {
          const ty = by + k * 22;
          const tg = ctx.createRadialGradient(CX, ty, 0, CX, ty, 32);
          tg.addColorStop(0, `rgba(11,184,112,${0.16 / k})`);
          tg.addColorStop(1, 'rgba(11,184,112,0)');
          ctx.fillStyle = tg;
          ctx.beginPath(); ctx.arc(CX, ty, 32, 0, Math.PI * 2); ctx.fill();
        }
        // Soft bloom
        const gA = ctx.createRadialGradient(CX, by, 0, CX, by, 100);
        gA.addColorStop(0,   'rgba(11,184,112,0.32)');
        gA.addColorStop(0.5, 'rgba(34,201,160,0.10)');
        gA.addColorStop(1,   'rgba(11,184,112,0)');
        ctx.fillStyle = gA; ctx.beginPath(); ctx.arc(CX, by, 100, 0, Math.PI * 2); ctx.fill();
        // White-hot core
        const gC = ctx.createRadialGradient(CX, by, 0, CX, by, 22);
        gC.addColorStop(0,    'rgba(255,255,255,0.98)');
        gC.addColorStop(0.18, 'rgba(210,255,240,0.95)');
        gC.addColorStop(0.55, 'rgba(11,184,112,0.90)');
        gC.addColorStop(1,    'rgba(7,125,115,0)');
        ctx.fillStyle = gC; ctx.beginPath(); ctx.arc(CX, by, 22, 0, Math.PI * 2); ctx.fill();
      }

      // Trigger impact
      if (t >= 0.7 && phaseRef.current === 'ball') {
        setPhase('impact');
        for (let k = 0; k < 65; k++) {
          const a  = Math.random() * Math.PI * 2;
          const sp = Math.random() * 8 + 2;
          sparks.push({ x: CX, y: CY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 1 });
        }
      }

      // ── Scene 2 — Impact / shockwave ───────────────────────────
      if (t >= 0.7 && t < 1.15) {
        const age = t - 0.7;
        // Flash
        const fA = Math.max(0, 0.55 - age / 0.3 * 0.55);
        if (fA > 0) {
          const fg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 260);
          fg.addColorStop(0,   `rgba(200,255,235,${fA})`);
          fg.addColorStop(0.4, `rgba(11,184,112,${fA * 0.5})`);
          fg.addColorStop(1,   'rgba(11,184,112,0)');
          ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
        }
        // Shockwave rings
        const swR  = Math.min(age / 0.45 * W * 0.44, W * 0.44);
        const swA  = Math.max(0, 1 - age / 0.5);
        ctx.shadowColor = '#4FE0C4'; ctx.shadowBlur = 10;
        ctx.strokeStyle = `rgba(79,224,196,${swA * 0.65})`; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(CX, CY, swR, 0, Math.PI * 2); ctx.stroke();
        if (swR > 30) {
          ctx.strokeStyle = `rgba(34,201,160,${swA * 0.38})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(CX, CY, swR * 0.55, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }
      if (t >= 0.9 && phaseRef.current === 'impact') setPhase('fire');

      // Sparks decay
      for (let k = sparks.length - 1; k >= 0; k--) {
        const s = sparks[k];
        s.x += s.vx; s.y += s.vy; s.vy += 0.14; s.vx *= 0.97;
        s.life -= 0.028;
        if (s.life <= 0) { sparks.splice(k, 1); continue; }
        ctx.globalAlpha = s.life * 0.8;
        ctx.fillStyle   = s.life > 0.55 ? '#4FE0C4' : '#0BB870';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.life * 2.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── Scenes 3-4 — Green fire RING around logo ───────────────
      const ph = phaseRef.current;
      if (ph === 'fire' || ph === 'polish') {
        const fireAge  = Math.max(0, t - 0.9);
        const hueShift = Math.min(fireAge / 1.6, 1);
        const intensity = ph === 'polish'
          ? Math.max(0, 1 - (t - 2.5) / 0.85)
          : Math.min(fireAge / 0.55, 1);

        // ── Ring core: outer glow → mid → white-hot edge ──────────
        ctx.save();
        // Outermost soft halo
        ctx.shadowColor = '#0BB870';
        ctx.shadowBlur  = 55 * intensity;
        ctx.strokeStyle = `rgba(11,184,112,${0.12 * intensity})`;
        ctx.lineWidth   = 38;
        ctx.beginPath(); ctx.arc(CX, CY, RING_R, 0, Math.PI * 2); ctx.stroke();

        // Mid glow
        ctx.shadowBlur  = 28 * intensity;
        ctx.strokeStyle = `rgba(34,201,160,${0.42 * intensity})`;
        ctx.lineWidth   = 16;
        ctx.beginPath(); ctx.arc(CX, CY, RING_R, 0, Math.PI * 2); ctx.stroke();

        // Bright inner band
        ctx.shadowBlur  = 14 * intensity;
        ctx.strokeStyle = `rgba(79,224,196,${0.75 * intensity})`;
        ctx.lineWidth   = 6;
        ctx.beginPath(); ctx.arc(CX, CY, RING_R, 0, Math.PI * 2); ctx.stroke();

        // White-hot core line
        ctx.shadowBlur  = 8 * intensity;
        ctx.strokeStyle = `rgba(220,255,245,${0.92 * intensity})`;
        ctx.lineWidth   = 2;
        ctx.beginPath(); ctx.arc(CX, CY, RING_R, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();

        // ── Spawn organic flames along the ring ────────────────────
        if (ff % 2 === 0 && intensity > 0.04) {
          const density = Math.round(11 * intensity);
          for (let k = 0; k < density; k++) {
            const ang   = Math.random() * Math.PI * 2;
            const sx    = CX + Math.cos(ang) * RING_R;
            const sy    = CY + Math.sin(ang) * RING_R;
            const baseH = 100 + hueShift * 35;           // 100(yellow-green) → 135(green)
            const spd   = Math.random() * 2.4 + 1.4;
            fls.push({
              x: sx, y: sy,
              vx: Math.cos(ang) * spd,
              vy: Math.sin(ang) * spd,
              life: 1,
              w:    Math.random() * 18 + 8,
              h:    Math.random() * 62 + 34,
              lean: (Math.random() - 0.5) * 8,
              hue:  baseH + (Math.random() - 0.5) * 24,
              angle: ang,
            });
          }
        }

        // ── Update + draw flames (rotated radially outward) ────────
        for (let k = fls.length - 1; k >= 0; k--) {
          const f = fls[k];
          f.x += f.vx; f.y += f.vy;
          f.vx *= 0.975; f.vy *= 0.975;
          f.vx += (Math.random() - 0.5) * 0.20;
          f.h  *= 0.992; f.w *= 0.997;
          f.life -= 1 / (0.48 * 60);
          if (f.life <= 0) { fls.splice(k, 1); continue; }

          const pct = f.life;
          const lit = 55;

          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.angle + Math.PI / 2); // align flame tip to radial direction
          ctx.globalAlpha = pct * 0.78 * intensity;
          drawFlame(ctx, 0, 0, f.w, f.h * pct, f.lean);
          const fg = ctx.createLinearGradient(0, 0, f.lean * 0.3, -f.h);
          fg.addColorStop(0,    `hsla(${f.hue},100%,${lit + 18}%,1)`);
          fg.addColorStop(0.3,  `hsla(${f.hue},100%,${lit}%,0.88)`);
          fg.addColorStop(0.68, `hsla(${f.hue},90%,${lit - 12}%,0.42)`);
          fg.addColorStop(1,    `hsla(${f.hue},80%,${lit - 22}%,0)`);
          ctx.fillStyle = fg; ctx.fill();
          ctx.restore();
        }

        // ── Floor reflection beneath the ring ─────────────────────
        const reflY  = CY + RING_R;
        const reflH  = RING_R * 0.35;
        const reflGr = ctx.createLinearGradient(CX, reflY, CX, reflY + reflH);
        reflGr.addColorStop(0, `rgba(11,184,112,${0.28 * intensity})`);
        reflGr.addColorStop(1, 'rgba(11,184,112,0)');
        ctx.fillStyle = reflGr;
        ctx.beginPath();
        ctx.ellipse(CX, reflY, RING_R * 0.9, reflH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Persistent center glow (fades after fire)
      if (ph !== 'ball') {
        const ga = ph === 'impact' ? 0.14 : ph === 'fire' ? 0.09 : 0.05;
        const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 165);
        cg.addColorStop(0, `rgba(11,184,112,${ga})`);
        cg.addColorStop(1, 'rgba(11,184,112,0)');
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(CX, CY, 165, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phase chain
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'fire')   t = setTimeout(() => setPhase('polish'), 1600);
    if (phase === 'polish') t = setTimeout(() => setPhase('exit'),   850);
    return () => clearTimeout(t);
  }, [phase]);

  // Scene 6 — logo → navbar top-right
  useEffect(() => {
    if (phase !== 'exit') return;
    const el = logoRef.current;
    if (!el) return;
    const W = window.innerWidth, H = window.innerHeight;
    gsap.to(el, {
      x: W / 2 - 52, y: -(H / 2 - 24),
      scale: 0.18, opacity: 0,
      duration: 0.75, ease: 'power2.inOut',
      onComplete: () => { setRemoved(true); onComplete(); },
    });
  }, [phase, onComplete]);

  if (removed) return null;

  const inFire   = phase === 'fire'   || phase === 'polish' || phase === 'exit';
  const inPolish = phase === 'polish' || phase === 'exit';

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: '#050B0D' }}>

      {/* Tech grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(11,184,112,0.45) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(11,184,112,0.45) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '52px 52px',
        opacity: 0.042,
      }} />

      {/* Canvas — energy ball, shockwave, bezier flames */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Logo container — centered, GSAP moves it in scene 6 */}
      <div
        ref={logoRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* ── 3×3 grid icon (frame 3 → frame 5) ─────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(3, ${SQ}px)`,
          gridTemplateRows: `repeat(3, ${SQ}px)`,
          gap: GAP,
        }}>
          {FORMATION.map(({ row, col, delay }) => (
            <motion.div
              key={`${row}-${col}`}
              initial={{ scale: 0, opacity: 0, filter: 'blur(18px)' }}
              animate={inFire ? {
                scale:   1,
                opacity: 1,
                filter:  'blur(0px)',
                boxShadow: inPolish
                  ? [
                    '0 0 18px rgba(11,184,112,0.9)',
                    '0 0 36px rgba(11,184,112,0.4)',
                    'inset 0 0 10px rgba(255,255,255,0.14)',
                  ].join(', ')
                  : '0 0 10px rgba(255,140,30,0.55), 0 0 20px rgba(11,184,112,0.35)',
              } : {}}
              transition={{
                duration: 0.34,
                delay:    0.9 + delay,
                ease:     [0.22, 1, 0.36, 1],
              }}
              style={{
                width:        SQ,
                height:       SQ,
                borderRadius: 8,
                background:   'linear-gradient(135deg, #0BB870 0%, #22C9A0 52%, #4FE0C4 100%)',
                border:       inPolish
                  ? '1px solid rgba(79,224,196,0.55)'
                  : '1px solid rgba(255,140,30,0.30)',
              }}
            />
          ))}
        </div>

        {/* ── Text reveal (frame 3 → frame 5) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
          animate={inFire ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.45, delay: 2.05, ease: 'easeOut' }}
          style={{
            marginTop: 18,
            fontFamily:    '"IBM Plex Mono", monospace',
            fontWeight:    400,
            fontSize:      'clamp(13px, 2.2vw, 26px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         '#fff',
            // Frame 5: clean neon green text-shadow
            textShadow: [
              '0 0 14px rgba(11,184,112,0.95)',
              '0 0 30px rgba(11,184,112,0.5)',
            ].join(', '),
          }}
        >
          EH automation
        </motion.div>
      </div>
    </div>
  );
};

export default IntroScreen;

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
  const [fireFrame, setFireFrame] = useState(0);

  // ── Canvas: energy ball → shockwave → green fire (frames 1/2/3) ──
  useEffect(() => {
    const W  = window.innerWidth;
    const H  = window.innerHeight;
    const c  = canvasRef.current!;
    c.width  = W; c.height = H;
    const ctx = c.getContext('2d')!;
    const CX = W / 2, CY = H / 2;

    // Ambient particles (always visible)
    const pts = Array.from({ length: 38 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
      r: Math.random() * 1.3 + 0.2, a: Math.random() * 0.28 + 0.07,
    }));

    // Post-impact sparks
    type Sp = { x: number; y: number; vx: number; vy: number; life: number };
    const sparks: Sp[] = [];

    let t0 = 0, raf = 0;

    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;

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

      // Persistent center glow (fades after fire)
      const ph = phaseRef.current;
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

  // Sprite sheet animation — 8 frames at 10fps
  useEffect(() => {
    const active = phase === 'fire' || phase === 'polish' || phase === 'exit';
    if (!active) { setFireFrame(0); return; }
    const id = setInterval(() => setFireFrame(f => (f + 1) % 8), 150);
    return () => clearInterval(id);
  }, [phase]);

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

      {/* Canvas — energy ball, shockwave */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Fire ball — falls from top to center, disappears on impact */}
      <motion.div
        className="absolute inset-0 z-[12] flex items-center justify-center pointer-events-none"
        initial={{ y: '-55vh', opacity: 0, scale: 0.5 }}
        animate={{
          y:       0,
          opacity: inFire ? 0 : 1,
          scale:   phase === 'impact' ? 1.5 : 1,
        }}
        transition={{
          y:       { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.25 },
          scale:   { duration: 0.2 },
        }}
      >
        <img
          src="/fire-ball.png"
          alt=""
          style={{ width: 'clamp(80px, 10vw, 120px)', height: 'clamp(80px, 10vw, 120px)', mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* Fire ring sprite animation — 4×2 grid, 8 frames at 10fps */}
      <motion.div
        className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inFire ? { opacity: phase === 'exit' ? 0 : 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          width:               'min(520px, 82vw)',
          height:              'min(520px, 82vw)',
          backgroundImage:     'url(/fire-ring-sprite.png)',
          backgroundSize:      '400% 200%',
          backgroundPosition:  `${(fireFrame % 4) * (100 / 3)}% ${Math.floor(fireFrame / 4) * 100}%`,
          backgroundRepeat:    'no-repeat',
          mixBlendMode:        'screen',
        }} />
      </motion.div>

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

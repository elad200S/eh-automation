import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export const INTRO_STORAGE_KEY = 'intro_played';

// ── Logo grid: 3×3 squares with staggered formation delays ─────────
// Scene 3 starts at t=0.9s; delays below are relative to that start
const FORMATION: { row: number; col: number; delay: number }[] = [
  { row: 0, col: 0, delay: 0.00 }, // 1
  { row: 0, col: 1, delay: 0.10 }, // 2
  { row: 0, col: 2, delay: 0.20 }, // 3
  { row: 1, col: 0, delay: 0.36 }, // 4 — slight pause
  { row: 1, col: 1, delay: 0.52 }, // 5
  { row: 1, col: 2, delay: 0.63 }, // 6
  { row: 2, col: 0, delay: 0.76 }, // 7
  { row: 2, col: 1, delay: 0.86 }, // 8
  { row: 2, col: 2, delay: 0.96 }, // 9
];

const SQ  = 44; // square side px
const GAP = 5;  // gap px

interface IntroScreenProps { onComplete: () => void; }

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);

  // Shared phase ref (no stale closures in RAF) + state for React renders
  const phaseRef = useRef<'ball' | 'impact' | 'form' | 'polish' | 'text' | 'exit'>('ball');
  const [phase, _setPhase] = useState(phaseRef.current);
  const setPhase = (p: typeof phaseRef.current) => {
    if (phaseRef.current === p) return;
    phaseRef.current = p;
    _setPhase(p);
  };

  const [removed, setRemoved] = useState(false);

  // ── Canvas: energy ball + shockwave + particles ─────────────────
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = canvasRef.current!;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const CX = W / 2, CY = H / 2;

    // Background micro-particles
    const micro = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.3 + 0.2,
      a: Math.random() * 0.35 + 0.08,
    }));

    // Spark particles (post-impact)
    type Sp = { x: number; y: number; vx: number; vy: number; life: number; };
    const sparks: Sp[] = [];

    let t0 = 0, raf = 0;
    // Energy ball y-position (driven by RAF)
    let ballY = -90;

    const draw = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;

      ctx.clearRect(0, 0, W, H);

      // ── Background micro-particles ─────────────────────────────
      micro.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.fillStyle   = '#0BB870';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      // ── Scene 1: Energy ball falls (0 → 0.7s) ─────────────────
      if (t < 0.7) {
        const prog = t / 0.7;
        const ease = 1 - Math.pow(1 - prog, 2.2); // ease-in
        ballY = -90 + (CY + 90) * ease;

        // Motion-blur trail (4 ghost frames)
        for (let k = 4; k >= 1; k--) {
          const gy = ballY + k * 20;
          const ga = 0.15 / k;
          const gg = ctx.createRadialGradient(CX, gy, 0, CX, gy, 28);
          gg.addColorStop(0, `rgba(11,184,112,${ga * 3})`);
          gg.addColorStop(1, 'rgba(11,184,112,0)');
          ctx.fillStyle = gg;
          ctx.beginPath(); ctx.arc(CX, gy, 28, 0, Math.PI * 2); ctx.fill();
        }

        // Wide atmospheric glow
        const gA = ctx.createRadialGradient(CX, ballY, 0, CX, ballY, 90);
        gA.addColorStop(0, 'rgba(11,184,112,0.30)');
        gA.addColorStop(0.5,'rgba(34,201,160,0.10)');
        gA.addColorStop(1, 'rgba(11,184,112,0)');
        ctx.fillStyle = gA;
        ctx.beginPath(); ctx.arc(CX, ballY, 90, 0, Math.PI * 2); ctx.fill();

        // Ball core (white-hot center → emerald)
        const gC = ctx.createRadialGradient(CX, ballY, 0, CX, ballY, 22);
        gC.addColorStop(0,   'rgba(255,255,255,0.98)');
        gC.addColorStop(0.18,'rgba(210,255,240,0.95)');
        gC.addColorStop(0.55,'rgba(11,184,112,0.90)');
        gC.addColorStop(1,   'rgba(7,125,115,0)');
        ctx.fillStyle = gC;
        ctx.beginPath(); ctx.arc(CX, ballY, 22, 0, Math.PI * 2); ctx.fill();
      }

      // ── Scene 1→2 trigger ─────────────────────────────────────
      if (t >= 0.7 && phaseRef.current === 'ball') {
        setPhase('impact');
        ballY = CY;
        for (let k = 0; k < 60; k++) {
          const a = Math.random() * Math.PI * 2;
          const sp = Math.random() * 8 + 2;
          sparks.push({ x: CX, y: CY, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp - 1, life: 1 });
        }
      }

      // ── Scene 2: Impact (0.7–0.9s) ────────────────────────────
      if (t >= 0.7 && t < 1.4) {
        const age = t - 0.7;

        // Expanding shockwave ring
        const swR = Math.min(age / 0.4 * W * 0.4, W * 0.4);
        const swA = Math.max(0, 1 - age / 0.5);
        ctx.strokeStyle = `rgba(79,224,196,${swA * 0.65})`;
        ctx.lineWidth   = 2.5;
        ctx.shadowColor = '#4FE0C4';
        ctx.shadowBlur  = 10;
        ctx.beginPath(); ctx.arc(CX, CY, swR, 0, Math.PI * 2); ctx.stroke();
        // Second inner ring
        if (swR > 20) {
          ctx.strokeStyle = `rgba(34,201,160,${swA * 0.35})`;
          ctx.lineWidth   = 1.5;
          ctx.beginPath(); ctx.arc(CX, CY, swR * 0.55, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.shadowBlur = 0;

        // Impact flash
        const flashA = Math.max(0, 0.5 - age / 0.25 * 0.5);
        if (flashA > 0) {
          const fg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 220);
          fg.addColorStop(0,   `rgba(200,255,235,${flashA})`);
          fg.addColorStop(0.35,`rgba(11,184,112,${flashA * 0.55})`);
          fg.addColorStop(1,   'rgba(11,184,112,0)');
          ctx.fillStyle = fg;
          ctx.fillRect(0, 0, W, H);
        }
      }

      // ── Scene 2→3 trigger ─────────────────────────────────────
      if (t >= 0.9 && phaseRef.current === 'impact') {
        setPhase('form');
      }

      // ── Sparks (decay over time) ───────────────────────────────
      for (let k = sparks.length - 1; k >= 0; k--) {
        const s = sparks[k];
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.14; s.vx *= 0.97;
        s.life -= 0.028;
        if (s.life <= 0) { sparks.splice(k, 1); continue; }
        ctx.globalAlpha = s.life * 0.8;
        ctx.fillStyle   = s.life > 0.5 ? '#4FE0C4' : '#0BB870';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.life * 2.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── Persistent center glow (scenes 2–5) ───────────────────
      if (phaseRef.current !== 'ball') {
        const gA = phaseRef.current === 'impact' ? 0.16 : 0.09;
        const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 170);
        cg.addColorStop(0, `rgba(11,184,112,${gA})`);
        cg.addColorStop(0.5, `rgba(11,184,112,${gA * 0.4})`);
        cg.addColorStop(1, 'rgba(11,184,112,0)');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(CX, CY, 170, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Phase chain (React side) ────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'form')   timer = setTimeout(() => setPhase('polish'), 1000);
    if (phase === 'polish') timer = setTimeout(() => setPhase('text'),   500);
    if (phase === 'text')   timer = setTimeout(() => setPhase('exit'),   400);
    return () => clearTimeout(timer);
  }, [phase]);

  // ── Scene 6: Logo → navbar (GSAP) ──────────────────────────────
  useEffect(() => {
    if (phase !== 'exit') return;
    const el  = logoRef.current;
    if (!el)  return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Target: top-right corner (RTL navbar logo position)
    const targetX =  W / 2 - 52;   // ≈ 52px from right edge
    const targetY = -(H / 2 - 24); // ≈ 24px from top

    gsap.to(el, {
      x: targetX, y: targetY,
      scale: 0.18,
      opacity: 0,
      duration: 0.78,
      ease: 'power2.inOut',
      onComplete: () => { setRemoved(true); onComplete(); },
    });
  }, [phase, onComplete]);

  if (removed) return null;

  const inForm   = phase === 'form' || phase === 'polish' || phase === 'text' || phase === 'exit';
  const inPolish = phase === 'polish' || phase === 'text' || phase === 'exit';
  const inText   = phase === 'text'  || phase === 'exit';

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ background: '#050B0D' }}>

      {/* Tech grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(11,184,112,0.45) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(11,184,112,0.45) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '52px 52px',
        opacity: 0.045,
      }} />

      {/* Canvas: energy ball, shockwave, sparks, particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Logo + text: centered, GSAP moves it in scene 6 */}
      <div
        ref={logoRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* 3×3 logo grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(3, ${SQ}px)`,
            gridTemplateRows: `repeat(3, ${SQ}px)`,
            gap: GAP,
          }}
        >
          {FORMATION.map(({ row, col, delay }) => (
            <motion.div
              key={`${row}-${col}`}
              initial={{ scale: 0, opacity: 0, filter: 'blur(18px)' }}
              animate={inForm ? {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                boxShadow: inPolish
                  ? [
                    '0 0 14px rgba(11,184,112,0.75)',
                    '0 0 28px rgba(11,184,112,0.35)',
                    'inset 0 0 10px rgba(255,255,255,0.12)',
                  ].join(', ')
                  : '0 0 6px rgba(11,184,112,0.4)',
              } : {}}
              transition={{
                duration: 0.36,
                delay: 0.9 + delay, // 0.9s offset = after scenes 1+2
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: SQ, height: SQ,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #0BB870 0%, #22C9A0 52%, #4FE0C4 100%)',
                backdropFilter: 'blur(6px)',
                border: inPolish ? '1px solid rgba(79,224,196,0.5)' : '1px solid rgba(11,184,112,0.2)',
              }}
            />
          ))}
        </div>

        {/* "EH automation" text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          style={{
            marginTop: 18,
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 400,
            fontSize: 'clamp(13px, 2.2vw, 26px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: [
              '0 0 14px rgba(11,184,112,0.9)',
              '0 0 30px rgba(11,184,112,0.45)',
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

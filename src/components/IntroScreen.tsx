import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'intro_played';

const IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
];

const TARGET_TEXT = 'EH Automation';
const SCRAMBLE_CHARS = '01アイウABCDEF{}[]<>|@#$%^&*█▓░◈∆⊗ΛΣΠ';
const PARTICLE_COLORS = ['#06b6d4', '#22d3ee', '#10b981', '#67e8f9', '#34d399'];
const PARTICLE_CODE = '01アABCDEF{}[]<>|@#$%^&*█▓░◈∆⊗ΛΣΠ';

interface IntroScreenProps {
  onComplete: () => void;
}

function scramble(el: HTMLSpanElement, target: string, delay: number, duration: number) {
  let raf = 0;
  let start: number | null = null;

  const tick = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const locked = Math.floor(p * target.length);
    let out = '';
    for (let i = 0; i < target.length; i++) {
      out += (i < locked || target[i] === ' ')
        ? target[i]
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(tick);
    else el.textContent = target;
  };

  const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
  return () => { clearTimeout(t); cancelAnimationFrame(raf); };
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);
  const started = useRef(false);
  const rafId = useRef(0);
  const masterAlpha = useRef({ v: 0 });

  // Set scrambled text before first paint to avoid flash of real text
  useLayoutEffect(() => {
    if (textRef.current) {
      textRef.current.textContent = Array.from(TARGET_TEXT)
        .map(c => c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
        .join('');
    }
  }, []);

  useEffect(() => {
    if (!rootRef.current || !stripRef.current) return;

    // === Canvas: floating code particles ===
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      a: Math.random() * 0.45 + 0.1,
      da: (Math.random() - 0.5) * 0.012,
      size: Math.random() < 0.3 ? 11 : 8,
      ch: PARTICLE_CODE[Math.floor(Math.random() * PARTICLE_CODE.length)],
      col: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const drawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ma = masterAlpha.current.v;
      if (ma > 0) {
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          p.a += p.da;
          if (p.a <= 0.05 || p.a >= 0.6) p.da *= -1;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          ctx.globalAlpha = p.a * ma;
          ctx.fillStyle = p.col;
          ctx.font = `${p.size}px monospace`;
          ctx.fillText(p.ch, p.x, p.y);
        });
      }
      rafId.current = requestAnimationFrame(drawCanvas);
    };
    rafId.current = requestAnimationFrame(drawCanvas);

    // === Main animation sequence ===
    let cleanupScramble = () => {};

    const run = () => {
      if (started.current) return;
      started.current = true;

      // Fade in canvas particles at 300ms
      gsap.to(masterAlpha.current, { v: 1, duration: 0.8, delay: 0.3 });

      // Light sweep across images
      if (sweepRef.current) {
        gsap.fromTo(sweepRef.current,
          { x: '-100%' },
          { x: '280%', duration: 2.6, delay: 0.15, ease: 'power1.inOut' }
        );
      }

      // Text scramble: starts 500ms in, runs for 1.6s
      if (textRef.current) {
        cleanupScramble = scramble(textRef.current, TARGET_TEXT, 500, 1600);
      }

      // Glow builds after scramble fully resolves (500 + 1600 = 2100ms)
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = 'text-shadow 1.1s ease-out';
          textRef.current.style.textShadow =
            '0 0 18px rgba(6,182,212,0.95), 0 0 38px rgba(6,182,212,0.55), 0 0 70px rgba(6,182,212,0.3), 0 0 120px rgba(6,182,212,0.12)';
        }
      }, 2100);

      // Strip animation, then fade out
      gsap.fromTo(
        stripRef.current,
        { x: '0%' },
        {
          x: '-50%',
          duration: 2.8,
          ease: 'power2.inOut',
          onComplete: () => {
            cancelAnimationFrame(rafId.current);
            gsap.to(rootRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => { setRemoved(true); onComplete(); },
            });
          },
        }
      );
    };

    // Preload images then run, fallback at 1.5s
    let loaded = 0;
    const fallback = setTimeout(run, 1500);
    IMAGES.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (++loaded >= IMAGES.length) { clearTimeout(fallback); run(); }
      };
      img.src = src;
    });

    return () => {
      clearTimeout(fallback);
      cleanupScramble();
      cancelAnimationFrame(rafId.current);
      gsap.killTweensOf(stripRef.current);
      gsap.killTweensOf(rootRef.current);
      gsap.killTweensOf(masterAlpha.current);
      gsap.killTweensOf(sweepRef.current);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Image strip — darker to emphasize text */}
      <div ref={stripRef} style={{ display: 'flex', width: '200%', position: 'absolute', top: 0 }}>
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: '300px', height: '100vh' }}>
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.38 }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
      }} />

      {/* Light sweep */}
      <div ref={sweepRef} style={{
        position: 'absolute', top: 0, bottom: 0, width: '22%', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.07) 50%, transparent 100%)',
        transform: 'translateX(-100%)',
      }} />

      {/* Floating code particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

      {/* Brand name reveal */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span
          ref={textRef}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(1.6rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.14em',
            textShadow: '0 0 2px rgba(6,182,212,0.15)',
          }}
        />
      </div>
    </div>
  );
};

export default IntroScreen;
export { STORAGE_KEY as INTRO_STORAGE_KEY };

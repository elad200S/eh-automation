import { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';

const CORE_SIZE = 600;
const R_OUTER = CORE_SIZE / 2 - 4;   // 296 — just inside outer ring
const R_MID = 212;
const R_INNER = 128;

// Returns pixel coords relative to a container of containerW x containerH
const dot = (containerW: number, containerH: number, radius: number, angleDeg: number) => {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    left: containerW / 2 + radius * Math.cos(rad),
    top:  containerH / 2 + radius * Math.sin(rad),
  };
};

const AiEnergyCore = forwardRef<HTMLDivElement>((_, ref) => {
  const mouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mouseRef.current) return;

    // Gentle float
    gsap.to(mouseRef.current, {
      y: -14,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Mouse tilt — desktop only
    if (!window.matchMedia('(hover: hover)').matches) return;
    const xTo = gsap.quickTo(mouseRef.current, 'rotateY', { duration: 1.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(mouseRef.current, 'rotateX', { duration: 1.6, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight * 0.45) / (window.innerHeight / 2);
      xTo(dx * 7);
      yTo(-dy * 7);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute"
      style={{
        width: CORE_SIZE,
        height: CORE_SIZE,
        left: '50%',
        top: '42%',
        marginLeft: -(CORE_SIZE / 2),
        marginTop: -(CORE_SIZE / 2),
        perspective: '900px',
      }}
    >
      <div
        ref={mouseRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >

        {/* ── Outer ring — slow CW, dashed ────────── */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px dashed rgba(16,185,129,0.2)',
            animation: 'spinCW 30s linear infinite',
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const p = dot(CORE_SIZE, CORE_SIZE, R_OUTER, a);
            const isCardinal = a % 90 === 0;
            return (
              <div
                key={a}
                className="absolute"
                style={{ left: p.left, top: p.top, transform: 'translate(-50%,-50%)' }}
              >
                <div style={{
                  width:  isCardinal ? 6 : 3,
                  height: isCardinal ? 6 : 3,
                  borderRadius: '50%',
                  background: isCardinal ? 'hsl(160,84%,39%)' : 'rgba(16,185,129,0.4)',
                  boxShadow: isCardinal ? '0 0 10px rgba(16,185,129,0.6)' : 'none',
                }} />
              </div>
            );
          })}
        </div>

        {/* ── Middle ring — CCW, 4 orbit particles ── */}
        <div
          className="absolute rounded-full"
          style={{
            width: R_MID * 2,
            height: R_MID * 2,
            left: CORE_SIZE / 2 - R_MID,
            top:  CORE_SIZE / 2 - R_MID,
            border: '1px solid rgba(16,185,129,0.13)',
            animation: 'spinCCW 18s linear infinite',
          }}
        >
          {[0, 90, 180, 270].map((a, i) => {
            const p = dot(R_MID * 2, R_MID * 2, R_MID, a);
            const isCyan = i % 2 !== 0;
            return (
              <div
                key={a}
                className="absolute"
                style={{ left: p.left, top: p.top, transform: 'translate(-50%,-50%)' }}
              >
                <div style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: isCyan ? '#06b6d4' : 'hsl(160,84%,39%)',
                  boxShadow: isCyan
                    ? '0 0 14px rgba(6,182,212,0.8), 0 0 4px rgba(6,182,212,1)'
                    : '0 0 14px rgba(16,185,129,0.8), 0 0 4px rgba(16,185,129,1)',
                }} />
              </div>
            );
          })}
        </div>

        {/* ── Inner ring — fast CW ─────────────────── */}
        <div
          className="absolute rounded-full"
          style={{
            width: R_INNER * 2,
            height: R_INNER * 2,
            left: CORE_SIZE / 2 - R_INNER,
            top:  CORE_SIZE / 2 - R_INNER,
            border: '1.5px solid rgba(16,185,129,0.22)',
            animation: 'spinCW 10s linear infinite',
          }}
        />

        {/* ── Data lines — radiate from center ─────── */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <div
            key={a}
            className="absolute"
            style={{
              width: 1,
              height: 100,
              background: 'linear-gradient(to bottom, rgba(16,185,129,0.28), transparent)',
              left: '50%',
              top: '50%',
              transformOrigin: '50% 0',
              transform: `translateX(-50%) rotate(${a}deg)`,
            }}
          />
        ))}

        {/* ── Core glow orb ───────────────────────── */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: 160,
            height: 160,
            left: CORE_SIZE / 2 - 80,
            top:  CORE_SIZE / 2 - 80,
            background: 'radial-gradient(circle at 42% 38%, rgba(6,182,212,0.28), rgba(16,185,129,0.14) 45%, transparent 70%)',
            boxShadow: '0 0 70px rgba(16,185,129,0.35), 0 0 140px rgba(16,185,129,0.15), 0 0 200px rgba(6,182,212,0.08)',
            animation: 'corePulse 3.5s ease-in-out infinite',
          }}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.85), rgba(16,185,129,0.65) 50%, transparent)',
            boxShadow: '0 0 28px rgba(6,182,212,0.65), 0 0 56px rgba(16,185,129,0.4), 0 0 90px rgba(16,185,129,0.2)',
          }} />
        </div>

      </div>
    </div>
  );
});

AiEnergyCore.displayName = 'AiEnergyCore';
export default AiEnergyCore;

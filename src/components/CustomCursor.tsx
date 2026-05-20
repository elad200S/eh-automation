import { useEffect, useRef } from 'react';

const SpotlightCursor = () => {
  const darkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dark = darkRef.current;
    const glow = glowRef.current;
    if (!dark || !glow) return;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = false;

    const onMove = (e: MouseEvent) => {
      dark.style.setProperty('--cx', `${e.clientX}px`);
      dark.style.setProperty('--cy', `${e.clientY}px`);
      glow.style.setProperty('--cx', `${e.clientX}px`);
      glow.style.setProperty('--cy', `${e.clientY}px`);

      if (!visible) {
        visible = true;
        dark.style.opacity = '1';
        glow.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Dark vignette with transparent spotlight hole */}
      <div
        ref={darkRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9988,
          opacity: 0,
          transition: 'opacity 0.6s ease',
          background: `radial-gradient(
            circle 280px at var(--cx, -999px) var(--cy, -999px),
            transparent 0%,
            transparent 90px,
            rgba(0, 0, 0, 0.28) 220px,
            rgba(0, 0, 0, 0.45) 100%
          )`,
        }}
      />
      {/* Emerald glow at cursor center */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9989,
          opacity: 0,
          transition: 'opacity 0.6s ease',
          background: `radial-gradient(
            circle 160px at var(--cx, -999px) var(--cy, -999px),
            rgba(16, 185, 129, 0.09) 0%,
            rgba(6, 182, 212, 0.04) 50%,
            transparent 100%
          )`,
        }}
      />
    </>
  );
};

export default SpotlightCursor;

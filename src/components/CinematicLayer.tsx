import { useEffect, useState } from 'react';

const CinematicLayer = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Scroll progress line */}
      <div
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          width:      `${progress * 100}%`,
          height:     2,
          background: 'linear-gradient(90deg, #0BB870, #4FE0C4)',
          zIndex:     9999,
          pointerEvents: 'none',
          boxShadow:  '0 0 10px rgba(79,224,196,0.7)',
          transition: 'width 0.08s linear',
        }}
      />

      {/* Film grain overlay */}
      <div
        className="cinematic-grain"
        style={{
          position:      'fixed',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        9990,
          opacity:       0.038,
          mixBlendMode:  'overlay',
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}
      />
    </>
  );
};

export default CinematicLayer;

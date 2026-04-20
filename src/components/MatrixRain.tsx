import { useEffect, useRef } from 'react';

const CHARS = 'אבגדהוזחטיכלמנסעפצקרשת01101100{}[];#!//*@><~=';
const FONT_SIZE = 14;
const FPS = 20;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array(cols).fill(1);
      // Pre-fill with background color so canvas is opaque from the start
      ctx.fillStyle = 'rgb(14, 17, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    let rafId: number;

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      if (time - lastTime < 1000 / FPS) return;
      lastTime = time;

      // Fade trail
      ctx.fillStyle = 'rgba(14, 17, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FONT_SIZE;

        // Leading character — bright
        if (drops[i] === drops[i]) {
          ctx.fillStyle = '#6ee7b7';
          ctx.fillText(char, i * FONT_SIZE, y);
        }

        // Reset column randomly after reaching bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.45,
      }}
    />
  );
};

export default MatrixRain;

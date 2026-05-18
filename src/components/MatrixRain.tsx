import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CHARS = 'אבגדהוזחטיכלמנסעפצקרשת01101100{}[];#!//*@><~=';
const FONT_SIZE = 14;
const FPS = 10;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    let drops: number[] = [];
    let paused = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array(cols).fill(1);
      ctx.fillStyle = 'rgb(14, 17, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    let lastTime = 0;
    let rafId: number;

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      if (paused) return;
      if (time - lastTime < 1000 / FPS) return;
      lastTime = time;

      // Fade trail
      ctx.fillStyle = 'rgba(14, 17, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FONT_SIZE;

        // Leading character — muted ambient tone
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
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (canvasRef.current) canvasRef.current.style.opacity = '0.45';
      return;
    }
    gsap.fromTo(canvasRef.current,
      { opacity: 0 },
      { opacity: 0.45, duration: 3.5, delay: 0.5, ease: 'power2.out' }
    );
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
        opacity: 0,
      }}
    />
  );
};

export default MatrixRain;

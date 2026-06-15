import { useEffect, useRef } from 'react';

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: number; hueSpeed: number;
  alpha: number;
}

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let raf: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 7 slow-drifting light orbs — more visible
    const orbs: Orb[] = Array.from({ length: 7 }, (_, i) => ({
      x:        W * (0.1 + Math.random() * 0.8),
      y:        H * (0.1 + Math.random() * 0.8),
      vx:       (Math.random() - 0.5) * 0.18,
      vy:       (Math.random() - 0.5) * 0.18,
      r:        Math.min(W, H) * (0.40 + Math.random() * 0.30),
      hue:      i % 2 === 0 ? 160 : 185,   // green ↔ teal
      hueSpeed: (Math.random() - 0.5) * 0.04,
      alpha:    0.14 + Math.random() * 0.09,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      orbs.forEach(o => {
        // drift
        o.x += o.vx; o.y += o.vy;
        o.hue += o.hueSpeed;

        // soft bounce
        if (o.x < -o.r * 0.4) o.vx =  Math.abs(o.vx);
        if (o.x >  W + o.r * 0.4) o.vx = -Math.abs(o.vx);
        if (o.y < -o.r * 0.4) o.vy =  Math.abs(o.vy);
        if (o.y >  H + o.r * 0.4) o.vy = -Math.abs(o.vy);

        // radial gradient "orb"
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `hsla(${o.hue}, 90%, 48%, ${o.alpha})`);
        g.addColorStop(0.5, `hsla(${o.hue}, 80%, 32%, ${o.alpha * 0.4})`);
        g.addColorStop(1,   `hsla(${o.hue}, 70%, 20%, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    />
  );
};

export default AmbientBackground;

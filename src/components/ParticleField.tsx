import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 30;
const CONNECT_DIST   = 65;
const MOUSE_RADIUS   = 160;
const MOUSE_PULL     = 0.010;
const DAMPING        = 0.98;
const BASE_SPEED     = 0.16;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let paused = false;
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      const count = W < 640 ? 15 : PARTICLE_COUNT;
      particles = Array.from({ length: count }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * BASE_SPEED,
        vy:    (Math.random() - 0.5) * BASE_SPEED,
        size:  Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.25,
      }));
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (paused) return;

      ctx.clearRect(0, 0, W, H);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.1) {
          const d = Math.sqrt(d2);
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_PULL;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const onResize = () => { init(); };
    const onMove   = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onVis    = () => { paused = document.hidden; };

    init();
    rafId = requestAnimationFrame(draw);
    window.addEventListener('resize',           onResize);
    window.addEventListener('mousemove',        onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',           onResize);
      window.removeEventListener('mousemove',        onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.2,
      }}
    />
  );
};

export default ParticleField;

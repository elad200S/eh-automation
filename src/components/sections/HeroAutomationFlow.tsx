import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CYCLE_MS = 6000;

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);

  const height = isMobile ? 260 : 420;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = (ts: number) => {
      if (!isVisibleRef.current) {
        startRef.current = 0;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = (elapsed % CYCLE_MS) / CYCLE_MS;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const turns      = isMobile ? 2   : 2.5;
      const ampY       = isMobile ? 68  : 108;
      const centerY    = H / 2;
      const padding    = isMobile ? -50 : -100;
      const tubeRadius = isMobile ? 30  : 50;
      const segments   = 300;

      // בנה נקודות נתיב
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const frac  = i / segments;
        const angle = frac * turns * Math.PI * 2;
        pts.push({
          x: padding + frac * (W - padding * 2),
          y: centerY + Math.sin(angle) * ampY,
        });
      }

      // ── גוף הצינור ──────────────────────────────────────────────
      // גרדיאנט לינארי מלמעלה למטה → מדמה תאורה מלמעלה
      const top    = centerY - ampY - tubeRadius;
      const bottom = centerY + ampY + tubeRadius;
      const tubGrd = ctx.createLinearGradient(0, top, 0, bottom);
      tubGrd.addColorStop(0,    'rgba(185, 248, 255, 0.97)'); // הייליט ציאן-לבן
      tubGrd.addColorStop(0.22, 'rgba(30,  210, 255, 1.00)'); // ציאן בהיר
      tubGrd.addColorStop(0.50, 'rgba(20,  155, 255, 1.00)'); // כחול-ציאן
      tubGrd.addColorStop(0.75, 'rgba(14,   95, 245, 1.00)'); // כחול עמוק
      tubGrd.addColorStop(1,    'rgba(10,   55, 200, 0.92)'); // צל כהה

      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = tubGrd;
      ctx.lineWidth   = tubeRadius * 2;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.stroke();

      // ── פס הייליט עליון (לבן-שקוף) ─────────────────────────────
      const hlGrd = ctx.createLinearGradient(0, top, 0, bottom);
      hlGrd.addColorStop(0,    'rgba(255,255,255,0.55)');
      hlGrd.addColorStop(0.30, 'rgba(255,255,255,0.18)');
      hlGrd.addColorStop(0.55, 'rgba(255,255,255,0.00)');
      hlGrd.addColorStop(1,    'rgba(0,0,0,0)');

      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y - tubeRadius * 0.28) : ctx.lineTo(p.x, p.y - tubeRadius * 0.28));
      ctx.strokeStyle = hlGrd;
      ctx.lineWidth   = tubeRadius * 0.65;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.stroke();

      // ── Pulse — נקודה בהירה נעה ─────────────────────────────────
      const pulseIdx = Math.floor(t * pts.length);
      const pp = pts[Math.min(pulseIdx, pts.length - 1)];
      const pr = isMobile ? 20 : 32;

      const pulseGrd = ctx.createRadialGradient(
        pp.x - pr * 0.3, pp.y - pr * 0.3, 0,
        pp.x, pp.y, pr * 2.8
      );
      pulseGrd.addColorStop(0,   'rgba(255,255,255,0.95)');
      pulseGrd.addColorStop(0.3, 'rgba(130,225,255,0.75)');
      pulseGrd.addColorStop(1,   'rgba(50,150,255,0)');

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = pulseGrd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.98)';
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default HeroAutomationFlow;

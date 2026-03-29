import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CYCLE_MS = 6000;

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);

  const height = isMobile ? 180 : 280;

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

      // פרמטרים של הגל
      const turns = isMobile ? 2.5 : 3.5;
      const ampY = isMobile ? 55 : 85;
      const centerY = H / 2;
      const padding = isMobile ? -40 : -80;
      const tubeRadius = isMobile ? 14 : 22;
      const segments = 300;

      // בנה את נקודות הנתיב
      const pathPts: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const frac = i / segments;
        const angle = frac * turns * Math.PI * 2;
        const x = padding + frac * (W - padding * 2);
        const y = centerY + Math.sin(angle) * ampY;
        const z = Math.cos(angle); // -1 (אחורה) עד 1 (קדימה)
        pathPts.push({ x, y, z });
      }

      // מיין לפי z כדי לצייר אחורה לפני קדמה
      // צייר slice בכל נקודה
      for (let i = 0; i < pathPts.length - 1; i++) {
        const p = pathPts[i];
        const pNext = pathPts[i + 1];
        const z = p.z; // -1 to 1

        // רדיוס נראה קטן יותר כשהצינור "אחורה"
        const perspScale = 0.55 + 0.45 * ((z + 1) / 2);
        const r = tubeRadius * perspScale;

        // כיוון האורך
        const dx = pNext.x - p.x;
        const dy = pNext.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const nx = -dy / len; // normal perpendicular
        const ny = dx / len;

        // צבע — כחול + ציאן עם gradient לפי z
        const bright = Math.round(50 + 30 * ((z + 1) / 2)); // 50–80%
        const alpha = 0.35 + 0.65 * ((z + 1) / 2); // עמוק = שקוף יותר

        // רק ציור של slice אחד — ellipse בניצב לנתיב
        ctx.save();
        ctx.translate(p.x, p.y);

        // gradient רדיאלי על כל פרוסה לתת תחושת נפח
        const grd = ctx.createRadialGradient(
          -r * 0.3, -r * 0.3, 0,
          0, 0, r
        );
        // הייליט לבן בפינה
        grd.addColorStop(0, `hsla(195, 100%, 85%, ${alpha})`);
        // כחול ביניים
        grd.addColorStop(0.4, `hsla(205, 100%, ${bright + 10}%, ${alpha})`);
        // ציאן כהה בצד
        grd.addColorStop(1, `hsla(210, 100%, ${bright - 15}%, ${alpha * 0.7})`);

        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.92, 0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.restore();
      }

      // ציר ה-pulse — נקודה בהירה נעה על הצינור
      const pulseIdx = Math.floor(t * pathPts.length);
      const pp = pathPts[Math.min(pulseIdx, pathPts.length - 1)];
      const pulseZ = pp.z;
      const pulseScale = 0.55 + 0.45 * ((pulseZ + 1) / 2);
      const pr = (isMobile ? 10 : 15) * pulseScale;

      const pulseGrd = ctx.createRadialGradient(
        pp.x - pr * 0.3, pp.y - pr * 0.3, 0,
        pp.x, pp.y, pr * 2.5
      );
      pulseGrd.addColorStop(0, 'rgba(255,255,255,0.95)');
      pulseGrd.addColorStop(0.3, 'rgba(100,210,255,0.8)');
      pulseGrd.addColorStop(1, 'rgba(50,150,255,0)');

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = pulseGrd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 0.6, 0, Math.PI * 2);
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

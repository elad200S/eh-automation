import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CYCLE_MS = 6000;

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);

  const height = isMobile ? 220 : 340;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
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

      const turns      = isMobile ? 2.5 : 3.5;
      const ampY       = isMobile ? 62  : 98;
      const centerY    = H / 2;
      const padding    = isMobile ? -40 : -80;
      const tubeRadius = isMobile ? 22  : 36;
      const segments   = 300;

      // בנה נקודות נתיב עם ערך z
      const pathPts: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const frac  = i / segments;
        const angle = frac * turns * Math.PI * 2;
        pathPts.push({
          x: padding + frac * (W - padding * 2),
          y: centerY + Math.sin(angle) * ampY,
          z: Math.cos(angle), // -1 (אחורה) → 1 (קדימה)
        });
      }

      // ── שכבת גלואו — stroke מטושטש מתחת לכל ──────────────────
      ctx.save();
      ctx.filter      = `blur(${isMobile ? 10 : 18}px)`;
      ctx.globalAlpha = 0.42;
      ctx.beginPath();
      pathPts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = 'rgba(35, 195, 255, 0.85)';
      ctx.lineWidth   = tubeRadius * 2.6;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.stroke();
      ctx.restore();

      // ── גוף הצינור — פרוסות עם z-ordering ───────────────────────
      // ציור בשני מעברים: אחורה קודם (z<0), קדימה אחר-כך (z≥0)
      for (const drawFront of [false, true]) {
        for (let i = 0; i < pathPts.length - 1; i++) {
          const p     = pathPts[i];
          const pNext = pathPts[i + 1];
          const isFront = p.z >= 0;
          if (isFront !== drawFront) continue;

          // עומק Z: קדמה=עבה, אחורה=דק
          const perspScale = 0.42 + 0.58 * ((p.z + 1) / 2);
          const r          = tubeRadius * perspScale;

          const bright = Math.round(48 + 28 * ((p.z + 1) / 2)); // 48–76%
          const alpha  = 0.55 + 0.45 * ((p.z + 1) / 2);        // 0.55–1.0

          ctx.save();
          ctx.translate(p.x, p.y);

          const grd = ctx.createRadialGradient(
            -r * 0.35, -r * 0.35, 0,
            0, 0, r * 1.05
          );
          grd.addColorStop(0,    `hsla(188, 100%, 88%, ${alpha})`);        // הייליט ציאן-לבן
          grd.addColorStop(0.28, `hsla(197, 100%, 70%, ${alpha})`);        // ציאן
          grd.addColorStop(0.58, `hsla(208, 100%, ${bright + 6}%, ${alpha})`); // כחול-ציאן
          grd.addColorStop(1,    `hsla(218, 100%, ${bright - 18}%, ${alpha * 0.72})`); // צל כהה

          ctx.beginPath();
          ctx.ellipse(0, 0, r, r * 0.91, 0, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          ctx.restore();

          void pNext; // suppress unused warning
        }
      }

      // ── Pulse — נקודה בהירה נעה ─────────────────────────────────
      const pulseIdx = Math.floor(t * pathPts.length);
      const pp       = pathPts[Math.min(pulseIdx, pathPts.length - 1)];
      const pulseScale = 0.42 + 0.58 * ((pp.z + 1) / 2);
      const pr         = (isMobile ? 12 : 18) * pulseScale;

      const pulseGrd = ctx.createRadialGradient(
        pp.x - pr * 0.3, pp.y - pr * 0.3, 0,
        pp.x, pp.y, pr * 2.6
      );
      pulseGrd.addColorStop(0,   'rgba(255,255,255,0.95)');
      pulseGrd.addColorStop(0.3, 'rgba(120,220,255,0.78)');
      pulseGrd.addColorStop(1,   'rgba(50,150,255,0)');

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = pulseGrd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pp.x, pp.y, pr * 0.58, 0, Math.PI * 2);
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

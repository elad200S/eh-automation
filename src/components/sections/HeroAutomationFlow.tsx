import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, MessageCircle, Database, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const CYCLE_MS = 6000;

// Desktop: turns=3.5
// sin=-1 (top of screen) at frac = 3/14, 7/14, 11/14
// sin=+1 (bottom of screen) at frac = 1/14, 5/14, 9/14
// leftPct calculated from: x = -80 + frac*(W+160), leftPct ≈ frac*100 - 6 (for large W)
const LABELS = [
  {
    frac: 3 / 14,   // ≈ 0.214 — top trough
    above: true,
    leftPct: 17,
    Icon: User,
    title: 'ליד נכנס',
    sub: 'פנייה חדשה',
    color: 'text-primary',
    bg: 'bg-primary/15',
    activeBorder: 'border-primary/60',
    activeGlow: 'shadow-primary/25',
  },
  {
    frac: 5 / 14,   // ≈ 0.357 — bottom peak
    above: false,
    leftPct: 34,
    Icon: MessageCircle,
    title: 'הודעת חימום',
    sub: 'WhatsApp אוטומטי',
    color: 'text-green-400',
    bg: 'bg-green-400/15',
    activeBorder: 'border-green-400/60',
    activeGlow: 'shadow-green-400/25',
  },
  {
    frac: 7 / 14,   // = 0.5 — top trough
    above: true,
    leftPct: 50,
    Icon: Database,
    title: 'ליד ב-CRM',
    sub: 'נשמר אוטומטית',
    color: 'text-secondary',
    bg: 'bg-secondary/15',
    activeBorder: 'border-secondary/60',
    activeGlow: 'shadow-secondary/25',
  },
  {
    frac: 9 / 14,   // ≈ 0.643 — bottom peak
    above: false,
    leftPct: 66,
    Icon: Smartphone,
    title: 'התראה לסוכן',
    sub: 'WhatsApp לנציג',
    color: 'text-accent-foreground',
    bg: 'bg-accent/15',
    activeBorder: 'border-accent/60',
    activeGlow: 'shadow-accent/25',
  },
];

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);
  const tRef = useRef(0);
  const [pulseT, setPulseT] = useState(0);

  const height = isMobile ? 180 : 280;

  // Sync pulseT for label highlights at ~10fps
  useEffect(() => {
    const interval = setInterval(() => setPulseT(tRef.current), 100);
    return () => clearInterval(interval);
  }, []);

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
      tRef.current = t;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const turns = isMobile ? 2.5 : 3.5;
      const ampY = isMobile ? 55 : 85;
      const centerY = H / 2;
      const padding = isMobile ? -40 : -80;
      const tubeRadius = isMobile ? 14 : 22;
      const segments = 300;

      const pathPts: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const frac = i / segments;
        const angle = frac * turns * Math.PI * 2;
        const x = padding + frac * (W - padding * 2);
        const y = centerY + Math.sin(angle) * ampY;
        const z = Math.cos(angle);
        pathPts.push({ x, y, z });
      }

      for (let i = 0; i < pathPts.length - 1; i++) {
        const p = pathPts[i];
        const pNext = pathPts[i + 1];
        const z = p.z;

        const perspScale = 0.55 + 0.45 * ((z + 1) / 2);
        const r = tubeRadius * perspScale;

        const dx = pNext.x - p.x;
        const dy = pNext.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const nx = -dy / len;
        const ny = dx / len;

        const bright = Math.round(50 + 30 * ((z + 1) / 2));
        const alpha = 0.35 + 0.65 * ((z + 1) / 2);

        ctx.save();
        ctx.translate(p.x, p.y);

        const grd = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
        grd.addColorStop(0, `hsla(195, 100%, 85%, ${alpha})`);
        grd.addColorStop(0.4, `hsla(205, 100%, ${bright + 10}%, ${alpha})`);
        grd.addColorStop(1, `hsla(210, 100%, ${bright - 15}%, ${alpha * 0.7})`);

        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.92, 0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();

        // suppress unused variable warnings
        void nx; void ny;
      }

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
    <div style={{ position: 'relative', width: '100%', height }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      />

      {/* Labels — desktop only */}
      {!isMobile && LABELS.map((label, i) => {
        const dist = Math.min(
          Math.abs(pulseT - label.frac),
          Math.abs(pulseT - label.frac + 1),
          Math.abs(pulseT - label.frac - 1)
        );
        const isActive = dist < 0.06;

        return (
          <div
            key={i}
            className={cn(
              'absolute flex items-center gap-2 px-3 py-2 rounded-xl border text-xs pointer-events-none',
              'bg-background/70 backdrop-blur-md transition-all duration-300',
              isActive
                ? `${label.activeBorder} shadow-lg ${label.activeGlow} opacity-100`
                : 'border-white/10 opacity-50'
            )}
            style={{
              left: `${label.leftPct}%`,
              transform: `translateX(-50%) scale(${isActive ? 1.08 : 1})`,
              ...(label.above ? { top: '4px' } : { bottom: '4px' }),
            }}
          >
            <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0', label.bg)}>
              <label.Icon className={cn('w-3.5 h-3.5', label.color)} />
            </div>
            <div dir="rtl">
              <div className={cn('font-semibold leading-tight whitespace-nowrap', isActive ? 'text-foreground' : 'text-foreground/60')}>
                {label.title}
              </div>
              <div className="text-muted-foreground/70 text-[10px] leading-tight whitespace-nowrap">
                {label.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroAutomationFlow;

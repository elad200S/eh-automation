import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, MessageCircle, Database, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const CYCLE_MS = 6000;

// Desktop (turns=3.5): sin=-1 top at 3/14,7/14 | sin=+1 bottom at 5/14,9/14
const DESKTOP_LABELS = [
  { frac: 3/14, above: true,  leftPct: 17, Icon: User,          title: 'ליד נכנס',      sub: 'פנייה חדשה',        color: 'text-primary',          bg: 'bg-primary/15',    activeBorder: 'border-primary/60',    activeGlow: 'shadow-primary/20' },
  { frac: 5/14, above: false, leftPct: 34, Icon: MessageCircle, title: 'הודעת חימום',   sub: 'WhatsApp אוטומטי',  color: 'text-green-400',         bg: 'bg-green-400/15', activeBorder: 'border-green-400/60',  activeGlow: 'shadow-green-400/20' },
  { frac: 7/14, above: true,  leftPct: 50, Icon: Database,      title: 'ליד ב-CRM',     sub: 'נשמר אוטומטית',    color: 'text-secondary',         bg: 'bg-secondary/15', activeBorder: 'border-secondary/60',  activeGlow: 'shadow-secondary/20' },
  { frac: 9/14, above: false, leftPct: 66, Icon: Smartphone,    title: 'התראה לסוכן',   sub: 'WhatsApp לנציג',    color: 'text-accent-foreground', bg: 'bg-accent/15',    activeBorder: 'border-accent/60',     activeGlow: 'shadow-accent/20' },
];

// Mobile (turns=2.5): sin=-1 top at 3/10,7/10 | sin=+1 bottom at 1/10,5/10
// x = -40 + frac*(W+80), leftPct ≈ frac*100 - 10 for W≈390
const MOBILE_LABELS = [
  { frac: 0.20, above: true,  leftPct: 12, Icon: User,          title: 'ליד נכנס',    color: 'text-primary',          bg: 'bg-primary/15',    activeBorder: 'border-primary/60',    activeGlow: 'shadow-primary/20' },
  { frac: 0.42, above: false, leftPct: 36, Icon: MessageCircle, title: 'הודעת חימום', color: 'text-green-400',         bg: 'bg-green-400/15', activeBorder: 'border-green-400/60',  activeGlow: 'shadow-green-400/20' },
  { frac: 0.62, above: true,  leftPct: 58, Icon: Database,      title: 'ל-CRM',       color: 'text-secondary',         bg: 'bg-secondary/15', activeBorder: 'border-secondary/60',  activeGlow: 'shadow-secondary/20' },
  { frac: 0.82, above: false, leftPct: 78, Icon: Smartphone,    title: 'לסוכן',       color: 'text-accent-foreground', bg: 'bg-accent/15',    activeBorder: 'border-accent/60',     activeGlow: 'shadow-accent/20' },
];

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);
  const tRef = useRef(0);
  const prevTRef = useRef(0);
  const visitedRef = useRef<Set<number>>(new Set());
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const height = isMobile ? 180 : 280;
  const labels = isMobile ? MOBILE_LABELS : DESKTOP_LABELS;

  // Track visited labels — stay lit until full cycle reset
  useEffect(() => {
    const interval = setInterval(() => {
      const currentT = tRef.current;
      const prevT = prevTRef.current;

      // Detect cycle reset: t jumped back significantly
      const cycleReset = prevT > 0.8 && currentT < 0.2;

      if (cycleReset) {
        visitedRef.current = new Set();
      } else {
        labels.forEach((label, i) => {
          if (currentT >= label.frac && prevT < label.frac) {
            visitedRef.current.add(i);
          }
        });
      }

      prevTRef.current = currentT;
      setVisited(new Set(visitedRef.current));
    }, 80);
    return () => clearInterval(interval);
  }, [labels]);

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
        const z = p.z;
        const perspScale = 0.55 + 0.45 * ((z + 1) / 2);
        const r = tubeRadius * perspScale;
        const bright = Math.round(50 + 30 * ((z + 1) / 2));
        const alpha = 0.35 + 0.65 * ((z + 1) / 2);

        ctx.save();
        ctx.translate(p.x, p.y);

        const grd = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
        grd.addColorStop(0, `hsla(150, 80%, 85%, ${alpha})`);
        grd.addColorStop(0.4, `hsla(155, 75%, ${bright + 10}%, ${alpha})`);
        grd.addColorStop(1, `hsla(160, 72%, ${bright - 15}%, ${alpha * 0.7})`);

        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.92, 0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
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
      pulseGrd.addColorStop(0.3, 'rgba(16,185,129,0.8)');
      pulseGrd.addColorStop(1, 'rgba(5,150,100,0)');

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

      {labels.map((label, i) => {
        const isActive = visited.has(i);
        return (
          <div
            key={i}
            className={cn(
              'absolute flex items-center gap-1.5 rounded-xl border pointer-events-none',
              'bg-background/75 backdrop-blur-md transition-all duration-400',
              isMobile ? 'px-2 py-1' : 'px-3 py-2',
              isActive
                ? `${label.activeBorder} shadow-lg ${label.activeGlow} opacity-100`
                : 'border-white/10 opacity-40'
            )}
            style={{
              left: `${label.leftPct}%`,
              transform: `translateX(-50%) scale(${isActive ? 1.06 : 1})`,
              ...(label.above ? { top: '3px' } : { bottom: '3px' }),
            }}
          >
            <div className={cn(
              'rounded-md flex items-center justify-center flex-shrink-0',
              isMobile ? 'w-5 h-5' : 'w-6 h-6',
              label.bg
            )}>
              <label.Icon className={cn(isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5', label.color)} />
            </div>
            <div dir="rtl">
              <div className={cn(
                'font-semibold leading-tight whitespace-nowrap',
                isMobile ? 'text-[10px]' : 'text-xs',
                isActive ? 'text-foreground' : 'text-foreground/55'
              )}>
                {label.title}
              </div>
              {'sub' in label && !isMobile && (
                <div className="text-muted-foreground/70 text-[10px] leading-tight whitespace-nowrap">
                  {(label as typeof DESKTOP_LABELS[0]).sub}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroAutomationFlow;

import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CYCLE_MS = 6000;

const NODES = [
  { label: 'ליד נכנס', position: 0.05 },
  { label: 'עיבוד נתונים', position: 0.28 },
  { label: 'CRM', position: 0.5 },
  { label: 'אוטומציה', position: 0.72 },
  { label: 'תוצאה', position: 0.95 },
];

const MOBILE_NODES = [
  { label: 'ליד', position: 0.08 },
  { label: 'עיבוד', position: 0.35 },
  { label: 'CRM', position: 0.65 },
  { label: 'תוצאה', position: 0.92 },
];

interface HelixPoint {
  screenX: number;
  screenY: number;
  z: number;
}

function generateHelixPoints(
  width: number,
  height: number,
  turns: number,
  radiusY: number,
  rotationOffset: number
): HelixPoint[] {
  const points: HelixPoint[] = [];
  const totalPoints = turns * 80;
  const centerY = height / 2;
  const padding = 40;

  for (let i = 0; i <= totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * turns * Math.PI * 2 + rotationOffset;
    const x = padding + t * (width - padding * 2);
    const z = Math.sin(angle) * radiusY * 0.5;
    const perspective = 500;
    const scale = perspective / (perspective + z);
    const y = centerY + Math.cos(angle) * radiusY * scale;

    points.push({ screenX: x, screenY: y, z });
  }
  return points;
}

function getPointAtT(points: HelixPoint[], t: number): HelixPoint {
  const idx = t * (points.length - 1);
  const i = Math.floor(idx);
  const frac = idx - i;
  const a = points[Math.min(i, points.length - 1)];
  const b = points[Math.min(i + 1, points.length - 1)];
  return {
    screenX: a.screenX + (b.screenX - a.screenX) * frac,
    screenY: a.screenY + (b.screenY - a.screenY) * frac,
    z: a.z + (b.z - a.z) * frac,
  };
}

function buildPath(points: HelixPoint[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].screenX} ${points[0].screenY}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].screenX} ${points[i].screenY}`;
  }
  return d;
}

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [pulseT, setPulseT] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [activeNode, setActiveNode] = useState(-1);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);

  const nodes = isMobile ? MOBILE_NODES : NODES;
  const height = isMobile ? 140 : 200;
  const turns = isMobile ? 2 : 3;
  const radiusY = isMobile ? 22 : 35;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ width: rect.width, height });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [height]);

  // עצור את ה-rAF כשיוצא מview (חוסך סוללה ו-CPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (ts: number) => {
      // רק אם הcomponent בתוך הview
      if (isVisibleRef.current) {
        if (!startRef.current) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const t = (elapsed % CYCLE_MS) / CYCLE_MS;
        setPulseT(t);

        if (!prefersReduced) {
          setRotation(elapsed * 0.00015);
        }

        // מציאת ה-node הקרוב לנקודת ה-pulse
        let closest = -1;
        let minDist = 0.06;
        for (let i = 0; i < nodes.length; i++) {
          const dist = Math.abs(t - nodes[i].position);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
        setActiveNode(closest);
      } else {
        // כשלא בview — אפס את ה-startRef כדי שיתחיל חלק כשחוזר
        startRef.current = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [nodes]);

  if (dims.width === 0) {
    return <div ref={containerRef} className="relative w-full" style={{ height }} />;
  }

  const points = generateHelixPoints(dims.width, height, turns, radiusY, rotation);
  const pulsePoint = getPointAtT(points, pulseT);

  // חלוקה לקדמי/אחורי לאפקט 3D
  const frontSegs: HelixPoint[][] = [];
  const backSegs: HelixPoint[][] = [];
  let currentFront: HelixPoint[] = [];
  let currentBack: HelixPoint[] = [];

  points.forEach((p) => {
    if (p.z >= 0) {
      currentFront.push(p);
      if (currentBack.length > 1) backSegs.push(currentBack);
      currentBack = [p];
    } else {
      currentBack.push(p);
      if (currentFront.length > 1) frontSegs.push(currentFront);
      currentFront = [p];
    }
  });
  if (currentFront.length > 1) frontSegs.push(currentFront);
  if (currentBack.length > 1) backSegs.push(currentBack);

  const nodeRadius = isMobile ? 14 : 18;
  const strokeW = isMobile ? 2 : 3;

  return (
    <div
      ref={containerRef}
      className="relative w-full mt-6 md:mt-8"
      style={{ height }}
    >
      <svg
        width={dims.width}
        height={height}
        viewBox={`0 0 ${dims.width} ${height}`}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          {/* הליקס — גרדיאנטים */}
          <linearGradient id="helixBackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="hsl(210 100% 50%)" stopOpacity="0.08" />
            <stop offset="50%"  stopColor="hsl(210 100% 50%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="helixFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="hsl(210 80% 60%)"  stopOpacity="0.5" />
            <stop offset="30%"  stopColor="hsl(210 90% 65%)"  stopOpacity="0.7" />
            <stop offset="50%"  stopColor="hsl(210 100% 70%)" stopOpacity="0.85" />
            <stop offset="70%"  stopColor="hsl(210 90% 65%)"  stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(210 80% 60%)"  stopOpacity="0.5" />
          </linearGradient>

          {/* ה-pulse — כחול בהיר ונראה */}
          <radialGradient id="pulseGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="hsl(210 100% 60%)" stopOpacity="0.8" />
            <stop offset="40%"  stopColor="hsl(210 100% 55%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0" />
          </radialGradient>

          {/* glow של node פעיל */}
          <radialGradient id="nodeActiveGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="hsl(210 100% 60%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0" />
          </radialGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation={isMobile ? '6' : '10'} />
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* חלק אחורי של ההליקס */}
        {backSegs.map((seg, i) => (
          <path
            key={`b-${i}`}
            d={buildPath(seg)}
            fill="none"
            stroke="url(#helixBackGrad)"
            strokeWidth={strokeW * 0.7}
            strokeLinecap="round"
          />
        ))}

        {/* חלק קדמי של ההליקס */}
        {frontSegs.map((seg, i) => (
          <g key={`f-${i}`}>
            {/* צל עדין */}
            <path
              d={buildPath(seg)}
              fill="none"
              stroke="hsl(210 100% 30%)"
              strokeWidth={strokeW + 1.5}
              strokeLinecap="round"
              opacity={0.06}
            />
            {/* הקו הראשי */}
            <path
              d={buildPath(seg)}
              fill="none"
              stroke="url(#helixFrontGrad)"
              strokeWidth={strokeW}
              strokeLinecap="round"
            />
            {/* ניצוץ לבן קטן בקצה הקו */}
            <path
              d={buildPath(seg)}
              fill="none"
              stroke="hsl(210 100% 95%)"
              strokeWidth={strokeW * 0.25}
              strokeLinecap="round"
              opacity={0.5}
            />
          </g>
        ))}

        {/* Nodes לאורך ההליקס */}
        {nodes.map((node, i) => {
          const pt = getPointAtT(points, node.position);
          const isActive = activeNode === i;
          return (
            <g key={`node-${i}`}>
              {/* Glow גדול כשפעיל */}
              {isActive && (
                <circle
                  cx={pt.screenX}
                  cy={pt.screenY}
                  r={nodeRadius * 2.5}
                  fill="url(#nodeActiveGrad)"
                  filter="url(#nodeGlow)"
                  opacity={0.9}
                />
              )}
              {/* טבעת חיצונית */}
              <circle
                cx={pt.screenX}
                cy={pt.screenY}
                r={nodeRadius}
                fill="none"
                stroke={isActive ? 'hsl(210 100% 60%)' : 'hsl(210 30% 55%)'}
                strokeWidth={isActive ? 2.5 : 1}
                opacity={isActive ? 1 : 0.4}
                style={{ transition: 'all 0.4s ease' }}
              />
              {/* נקודה פנימית */}
              <circle
                cx={pt.screenX}
                cy={pt.screenY}
                r={isActive ? 5 : 2.5}
                fill={isActive ? 'hsl(210 100% 65%)' : 'hsl(210 30% 55%)'}
                opacity={isActive ? 1 : 0.5}
                style={{ transition: 'all 0.4s ease' }}
              />
              {/* תווית */}
              <text
                x={pt.screenX}
                y={pt.screenY + nodeRadius + (isMobile ? 12 : 16)}
                textAnchor="middle"
                fill={isActive ? 'hsl(210 100% 35%)' : 'hsl(220 15% 50%)'}
                fontSize={isMobile ? 9 : 11}
                fontFamily="inherit"
                fontWeight={isActive ? '600' : '400'}
                opacity={isActive ? 1 : 0.55}
                style={{ transition: 'all 0.4s ease' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* ה-Pulse — הנקודה הנעה (עכשיו כחולה ונראית!) */}
        {/* Glow */}
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 18 : 28}
          fill="url(#pulseGlowGrad)"
          filter="url(#softGlow)"
          opacity={0.8}
        />
        {/* גוף ראשי */}
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 4 : 5.5}
          fill="hsl(210 100% 55%)"
          opacity={0.95}
        />
        {/* ניצוץ לבן במרכז */}
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 1.8 : 2.5}
          fill="hsl(0 0% 100%)"
          opacity={0.98}
        />
      </svg>
    </div>
  );
};

export default HeroAutomationFlow;

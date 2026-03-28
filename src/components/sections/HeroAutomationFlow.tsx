import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CYCLE_MS = 8000;

const NODES = [
  { label: 'ליד נכנס', position: 0.05 },
  { label: 'עיבוד נתונים', position: 0.25 },
  { label: 'CRM', position: 0.5 },
  { label: 'אוטומציה', position: 0.75 },
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
  const totalPoints = turns * 120;
  const centerY = height / 2;
  const padding = 20;

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
  // גובה גדול יותר — ממלא את כל ה-Hero כולל מתחת לכפתור
  const height = isMobile ? 220 : 340;
  // הרבה יותר סיבובים — DNA style
  const turns = isMobile ? 4 : 7;
  // רדיוס גדול יותר — גלים גדולים
  const radiusY = isMobile ? 40 : 65;

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (ts: number) => {
      if (isVisibleRef.current) {
        if (!startRef.current) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const t = (elapsed % CYCLE_MS) / CYCLE_MS;
        setPulseT(t);

        if (!prefersReduced) {
          setRotation(elapsed * 0.00012);
        }

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

  const nodeRadius = isMobile ? 12 : 16;
  const strokeW = isMobile ? 1.5 : 2.5;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
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
          <linearGradient id="helixBackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="hsl(210 100% 50%)" stopOpacity="0.05" />
            <stop offset="50%"  stopColor="hsl(210 100% 50%)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="helixFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="hsl(210 80% 65%)"  stopOpacity="0.35" />
            <stop offset="30%"  stopColor="hsl(210 90% 68%)"  stopOpacity="0.55" />
            <stop offset="50%"  stopColor="hsl(210 100% 72%)" stopOpacity="0.70" />
            <stop offset="70%"  stopColor="hsl(210 90% 68%)"  stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(210 80% 65%)"  stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="pulseGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="hsl(210 100% 58%)" stopOpacity="0.9" />
            <stop offset="40%"  stopColor="hsl(210 100% 55%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeActiveGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="hsl(210 100% 60%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation={isMobile ? '8' : '14'} />
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* חלק אחורי — עדין */}
        {backSegs.map((seg, i) => (
          <path
            key={`b-${i}`}
            d={buildPath(seg)}
            fill="none"
            stroke="url(#helixBackGrad)"
            strokeWidth={strokeW * 0.6}
            strokeLinecap="round"
          />
        ))}

        {/* חלק קדמי — בולט */}
        {frontSegs.map((seg, i) => (
          <g key={`f-${i}`}>
            <path
              d={buildPath(seg)}
              fill="none"
              stroke="url(#helixFrontGrad)"
              strokeWidth={strokeW}
              strokeLinecap="round"
            />
            {/* ניצוץ לבן על הקו */}
            <path
              d={buildPath(seg)}
              fill="none"
              stroke="hsl(210 100% 92%)"
              strokeWidth={strokeW * 0.2}
              strokeLinecap="round"
              opacity={0.6}
            />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pt = getPointAtT(points, node.position);
          const isActive = activeNode === i;
          return (
            <g key={`node-${i}`}>
              {isActive && (
                <circle
                  cx={pt.screenX}
                  cy={pt.screenY}
                  r={nodeRadius * 3}
                  fill="url(#nodeActiveGrad)"
                  filter="url(#nodeGlow)"
                  opacity={0.8}
                />
              )}
              <circle
                cx={pt.screenX}
                cy={pt.screenY}
                r={nodeRadius}
                fill="none"
                stroke={isActive ? 'hsl(210 100% 58%)' : 'hsl(210 40% 60%)'}
                strokeWidth={isActive ? 2 : 0.8}
                opacity={isActive ? 1 : 0.35}
                style={{ transition: 'all 0.4s ease' }}
              />
              <circle
                cx={pt.screenX}
                cy={pt.screenY}
                r={isActive ? 5 : 2}
                fill={isActive ? 'hsl(210 100% 60%)' : 'hsl(210 40% 60%)'}
                opacity={isActive ? 1 : 0.4}
                style={{ transition: 'all 0.4s ease' }}
              />
              <text
                x={pt.screenX}
                y={pt.screenY + nodeRadius + (isMobile ? 11 : 15)}
                textAnchor="middle"
                fill={isActive ? 'hsl(210 80% 35%)' : 'hsl(220 15% 55%)'}
                fontSize={isMobile ? 8 : 10}
                fontFamily="inherit"
                fontWeight={isActive ? '600' : '400'}
                opacity={isActive ? 1 : 0.5}
                style={{ transition: 'all 0.4s ease' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Pulse — הנקודה הנעה */}
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 22 : 36}
          fill="url(#pulseGlowGrad)"
          filter="url(#softGlow)"
          opacity={0.85}
        />
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 4.5 : 6}
          fill="hsl(210 100% 55%)"
          opacity={0.95}
        />
        <circle
          cx={pulsePoint.screenX}
          cy={pulsePoint.screenY}
          r={isMobile ? 2 : 2.8}
          fill="hsl(0 0% 100%)"
          opacity={1}
        />
      </svg>
    </div>
  );
};

export default HeroAutomationFlow;

import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const HELIX_TURNS = 3;
const POINTS_PER_TURN = 60;
const TOTAL_POINTS = HELIX_TURNS * POINTS_PER_TURN;
const PULSE_SPEED = 4000; // ms per full loop

interface HelixPoint {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  opacity: number;
}

function generateHelixPoints(
  width: number,
  height: number,
  radiusX: number,
  radiusY: number,
  rotationY: number
): HelixPoint[] {
  const points: HelixPoint[] = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const verticalSpread = height * 0.7;

  for (let i = 0; i <= TOTAL_POINTS; i++) {
    const t = i / TOTAL_POINTS;
    const angle = t * HELIX_TURNS * Math.PI * 2;

    const x = Math.cos(angle + rotationY) * radiusX;
    const z = Math.sin(angle + rotationY) * radiusX * 0.4;
    const y = (t - 0.5) * verticalSpread;

    // Perspective projection
    const perspective = 600;
    const scale = perspective / (perspective + z);
    const screenX = centerX + x * scale;
    const screenY = centerY + y * scale;

    // Depth-based opacity for 3D feel
    const depthOpacity = 0.3 + 0.7 * ((z + radiusX * 0.4) / (radiusX * 0.8));

    points.push({ x, y, z, screenX, screenY, opacity: Math.max(0.15, Math.min(1, depthOpacity)) });
  }
  return points;
}

function buildPathFromPoints(points: HelixPoint[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].screenX} ${points[0].screenY}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].screenX} ${points[i].screenY}`;
  }
  return d;
}

const MetallicHelix = ({ width, height, isMobile }: { width: number; height: number; isMobile: boolean }) => {
  const [pulseT, setPulseT] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const radiusX = isMobile ? width * 0.28 : width * 0.22;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      setPulseT((elapsed % PULSE_SPEED) / PULSE_SPEED);

      if (!prefersReduced) {
        setRotationY(elapsed * 0.0002); // Very gentle rotation
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const points = generateHelixPoints(width, height, radiusX, radiusX * 0.15, rotationY);

  // Split into front and back strands based on z-depth
  const frontPoints: HelixPoint[] = [];
  const backPoints: HelixPoint[] = [];

  points.forEach((p) => {
    if (p.z >= 0) {
      frontPoints.push(p);
    } else {
      backPoints.push(p);
    }
  });

  // Pulse position along the helix
  const pulseIndex = Math.floor(pulseT * points.length);
  const pulsePoint = points[Math.min(pulseIndex, points.length - 1)];

  // Build segments for metallic look
  const segments: { d: string; opacity: number; isFront: boolean }[] = [];
  let currentSegment: HelixPoint[] = [];
  let currentIsFront = points[0]?.z >= 0;

  for (let i = 0; i < points.length; i++) {
    const isFront = points[i].z >= 0;
    if (isFront !== currentIsFront && currentSegment.length > 0) {
      segments.push({
        d: buildPathFromPoints(currentSegment),
        opacity: currentIsFront ? 0.85 : 0.25,
        isFront: currentIsFront,
      });
      // Overlap by one point for continuity
      currentSegment = [points[i - 1], points[i]];
      currentIsFront = isFront;
    } else {
      currentSegment.push(points[i]);
    }
  }
  if (currentSegment.length > 0) {
    segments.push({
      d: buildPathFromPoints(currentSegment),
      opacity: currentIsFront ? 0.85 : 0.25,
      isFront: currentIsFront,
    });
  }

  const strokeWidth = isMobile ? 2.5 : 3.5;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0"
      style={{ filter: 'drop-shadow(0 0 20px hsl(220 15% 40% / 0.15))' }}
      aria-hidden="true"
    >
      <defs>
        {/* Metallic gradient for back segments */}
        <linearGradient id="helixBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 10% 55%)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(220 8% 45%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(220 10% 55%)" stopOpacity="0.3" />
        </linearGradient>

        {/* Metallic gradient for front segments */}
        <linearGradient id="helixFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(215 15% 72%)" stopOpacity="0.9" />
          <stop offset="30%" stopColor="hsl(220 12% 82%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(210 20% 90%)" stopOpacity="1" />
          <stop offset="70%" stopColor="hsl(220 12% 78%)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(215 15% 65%)" stopOpacity="0.85" />
        </linearGradient>

        {/* Pulse glow */}
        <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(210 60% 75%)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="hsl(210 50% 65%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(210 40% 55%)" stopOpacity="0" />
        </radialGradient>

        <filter id="pulseBlur">
          <feGaussianBlur stdDeviation={isMobile ? '6' : '10'} />
        </filter>

        <filter id="metalShine">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Back segments (behind the coil) */}
      {segments
        .filter((s) => !s.isFront)
        .map((seg, i) => (
          <path
            key={`back-${i}`}
            d={seg.d}
            fill="none"
            stroke="url(#helixBack)"
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

      {/* Front segments (visible coil) */}
      {segments
        .filter((s) => s.isFront)
        .map((seg, i) => (
          <g key={`front-${i}`}>
            {/* Shadow/depth line */}
            <path
              d={seg.d}
              fill="none"
              stroke="hsl(220 15% 30%)"
              strokeWidth={strokeWidth + 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.08}
            />
            {/* Main metallic stroke */}
            <path
              d={seg.d}
              fill="none"
              stroke="url(#helixFront)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Highlight line */}
            <path
              d={seg.d}
              fill="none"
              stroke="hsl(210 20% 95%)"
              strokeWidth={strokeWidth * 0.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.4}
            />
          </g>
        ))}

      {/* Energy pulse glow (large soft) */}
      <circle
        cx={pulsePoint.screenX}
        cy={pulsePoint.screenY}
        r={isMobile ? 18 : 28}
        fill="url(#pulseGlow)"
        filter="url(#pulseBlur)"
        opacity={0.7 + pulsePoint.opacity * 0.3}
      />

      {/* Energy pulse core */}
      <circle
        cx={pulsePoint.screenX}
        cy={pulsePoint.screenY}
        r={isMobile ? 3 : 4.5}
        fill="hsl(210 40% 88%)"
        opacity={0.9}
      />
      <circle
        cx={pulsePoint.screenX}
        cy={pulsePoint.screenY}
        r={isMobile ? 1.5 : 2}
        fill="hsl(0 0% 100%)"
        opacity={0.95}
      />
    </svg>
  );
};

const HeroAutomationFlow = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const height = isMobile ? 180 : 280;

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto mt-6 md:mt-10"
      style={{ height, maxWidth: isMobile ? '320px' : '500px' }}
    >
      {dimensions.width > 0 && (
        <MetallicHelix
          width={dimensions.width}
          height={height}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default HeroAutomationFlow;

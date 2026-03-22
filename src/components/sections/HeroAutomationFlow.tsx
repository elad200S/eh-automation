import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const STEPS = [
  { label: 'ליד נכנס', icon: 'user' },
  { label: 'נרשם במערכת', icon: 'database' },
  { label: 'הודעה נשלחת', icon: 'message' },
  { label: 'משימה נוצרת', icon: 'check' },
];

const CYCLE_MS = 5000;
const STEP_DURATION = CYCLE_MS / STEPS.length;

const StepIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? '#fff' : 'hsl(210 100% 50% / 0.5)';
  const size = 22;

  switch (type) {
    case 'user':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'message':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'check':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
};

// Arc path helpers
const ARC_SVG_WIDTH = 700;
const ARC_SVG_HEIGHT = 160;

// Compute a smooth cubic bezier arc path and return points along it
function getArcPath() {
  const x1 = 60, y1 = 130;
  const cx1 = 200, cy1 = -20;
  const cx2 = 500, cy2 = -20;
  const x2 = 640, y2 = 130;
  return { d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`, x1, y1, cx1, cy1, cx2, cy2, x2, y2 };
}

function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function getPointOnArc(t: number) {
  const { x1, y1, cx1, cy1, cx2, cy2, x2, y2 } = getArcPath();
  return {
    x: bezierPoint(t, x1, cx1, cx2, x2),
    y: bezierPoint(t, y1, cy1, cy2, y2),
  };
}

// Mobile: simple vertical layout
const MobileFlow = ({ activeStep }: { activeStep: number }) => (
  <div className="flex items-center justify-between px-4 w-full max-w-sm mx-auto mt-8" dir="ltr">
    {STEPS.map((step, i) => {
      const isActive = i <= activeStep;
      const isCurrent = i === activeStep;
      return (
        <div key={i} className="flex flex-col items-center gap-1.5 relative z-10">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-700"
            style={{
              background: isCurrent
                ? 'linear-gradient(135deg, hsl(210 100% 50%), hsl(210 100% 40%))'
                : isActive
                  ? 'hsl(210 100% 50% / 0.12)'
                  : 'hsl(210 20% 96%)',
              borderColor: isCurrent
                ? 'hsl(210 100% 55%)'
                : isActive
                  ? 'hsl(210 100% 50% / 0.3)'
                  : 'hsl(210 20% 88%)',
              boxShadow: isCurrent
                ? '0 0 20px hsl(210 100% 50% / 0.4), 0 0 40px hsl(210 100% 50% / 0.15)'
                : 'none',
            }}
          >
            <StepIcon type={step.icon} active={isCurrent} />
          </div>
          <span
            className="text-[9px] font-medium whitespace-nowrap transition-all duration-700"
            style={{
              color: isCurrent
                ? 'hsl(210 100% 50%)'
                : isActive
                  ? 'hsl(220 30% 35%)'
                  : 'hsl(220 15% 60%)',
            }}
          >
            {step.label}
          </span>
        </div>
      );
    })}
  </div>
);

// Desktop: curved arc layout
const DesktopFlow = ({ activeStep, dotProgress }: { activeStep: number; dotProgress: number }) => {
  const arcPath = getArcPath();
  const stepPositions = STEPS.map((_, i) => i / (STEPS.length - 1));
  const dotT = Math.min((activeStep + dotProgress) / (STEPS.length - 1), 1);
  const dotPos = getPointOnArc(dotT);

  // Calculate active arc path length fraction
  const activeT = dotT;

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10" dir="ltr" style={{ height: ARC_SVG_HEIGHT + 60 }}>
      {/* SVG Arc */}
      <svg
        viewBox={`0 0 ${ARC_SVG_WIDTH} ${ARC_SVG_HEIGHT}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(210 100% 50%)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(210 100% 55%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(185 70% 50%)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="arcGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(210 100% 50%)" />
            <stop offset="100%" stopColor="hsl(185 70% 50%)" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d={arcPath.d}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Active arc (lit portion) */}
        <path
          d={arcPath.d}
          fill="none"
          stroke="url(#arcGradientActive)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glowFilter)"
          strokeDasharray="1000"
          strokeDashoffset={1000 - activeT * 1000}
          style={{ transition: dotProgress < 0.05 ? 'none' : 'stroke-dashoffset 80ms linear' }}
        />

        {/* Travelling glow dot */}
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="5"
          fill="hsl(210 100% 55%)"
          filter="url(#dotGlow)"
          style={{ transition: dotProgress < 0.05 ? 'none' : 'cx 80ms linear, cy 80ms linear' }}
        />
        <circle
          cx={dotPos.x}
          cy={dotPos.y}
          r="2.5"
          fill="#fff"
          style={{ transition: dotProgress < 0.05 ? 'none' : 'cx 80ms linear, cy 80ms linear' }}
        />
      </svg>

      {/* Step cards positioned along the arc */}
      {STEPS.map((step, i) => {
        const t = stepPositions[i];
        const point = getPointOnArc(t);
        const isActive = i <= activeStep;
        const isCurrent = i === activeStep;

        // Convert SVG coords to percentage
        const leftPct = (point.x / ARC_SVG_WIDTH) * 100;
        const topPct = (point.y / (ARC_SVG_HEIGHT + 60)) * 100;

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 backdrop-blur-sm"
              style={{
                background: isCurrent
                  ? 'linear-gradient(135deg, hsl(210 100% 50%), hsl(210 100% 38%))'
                  : isActive
                    ? 'hsl(210 100% 50% / 0.08)'
                    : 'hsl(0 0% 100% / 0.7)',
                borderColor: isCurrent
                  ? 'hsl(210 100% 60%)'
                  : isActive
                    ? 'hsl(210 100% 50% / 0.3)'
                    : 'hsl(210 20% 88% / 0.6)',
                boxShadow: isCurrent
                  ? '0 0 24px hsl(210 100% 50% / 0.35), 0 0 48px hsl(210 100% 50% / 0.12), 0 4px 16px hsl(210 100% 50% / 0.15)'
                  : isActive
                    ? '0 2px 8px hsl(210 100% 50% / 0.08)'
                    : '0 1px 4px hsl(0 0% 0% / 0.04)',
                transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <StepIcon type={step.icon} active={isCurrent} />
            </div>
            <span
              className="text-[11px] font-semibold whitespace-nowrap transition-all duration-700"
              style={{
                color: isCurrent
                  ? 'hsl(210 100% 45%)'
                  : isActive
                    ? 'hsl(220 30% 30%)'
                    : 'hsl(220 15% 55%)',
                textShadow: isCurrent ? '0 0 12px hsl(210 100% 50% / 0.2)' : 'none',
              }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const HeroAutomationFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStep(STEPS.length - 1);
      setDotProgress(1);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) % CYCLE_MS;
      const step = Math.floor(elapsed / STEP_DURATION);
      const progress = (elapsed % STEP_DURATION) / STEP_DURATION;

      setActiveStep(step);
      setDotProgress(progress);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReducedMotion]);

  if (isMobile) {
    return <MobileFlow activeStep={activeStep} />;
  }

  return <DesktopFlow activeStep={activeStep} dotProgress={dotProgress} />;
};

export default HeroAutomationFlow;

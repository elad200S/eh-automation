import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const STEPS = [
  { label: 'ליד נכנס', icon: 'user' },
  { label: 'נרשם במערכת', icon: 'database' },
  { label: 'הודעה נשלחת', icon: 'message' },
  { label: 'משימה נוצרת', icon: 'check' },
];

const CYCLE_MS = 4200;

const StepIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? '#ffffff' : 'hsl(210 100% 45%)';
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

const ARC_SVG_WIDTH = 980;
const ARC_SVG_HEIGHT = 260;

function getArcPath() {
  const x1 = 110, y1 = 190;
  const cx1 = 290, cy1 = 10;
  const cx2 = 690, cy2 = 10;
  const x2 = 870, y2 = 190;
  return {
    d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`,
    x1,
    y1,
    cx1,
    cy1,
    cx2,
    cy2,
    x2,
    y2,
  };
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

const MobileFlow = ({ activeStep }: { activeStep: number }) => (
  <div className="flex items-center justify-between px-4 w-full max-w-md mx-auto mt-8" dir="ltr">
    {STEPS.map((step, i) => {
      const isActive = i <= activeStep;
      const isCurrent = i === activeStep;

      return (
        <div key={i} className="flex flex-col items-center gap-1.5 relative z-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500"
            style={{
              background: isCurrent
                ? 'linear-gradient(135deg, hsl(210 100% 50%), hsl(210 100% 40%))'
                : isActive
                  ? 'hsl(210 100% 50% / 0.10)'
                  : 'hsl(210 20% 96%)',
              borderColor: isCurrent
                ? 'hsl(210 100% 55%)'
                : isActive
                  ? 'hsl(210 100% 50% / 0.28)'
                  : 'hsl(210 20% 88%)',
              boxShadow: isCurrent
                ? '0 0 18px hsl(210 100% 50% / 0.22)'
                : 'none',
              transform: isCurrent ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            <StepIcon type={step.icon} active={isCurrent} />
          </div>

          <span
            className="text-[10px] font-medium whitespace-nowrap transition-all duration-500"
            style={{
              color: isCurrent
                ? 'hsl(210 100% 46%)'
                : isActive
                  ? 'hsl(220 28% 34%)'
                  : 'hsl(220 14% 60%)',
            }}
          >
            {step.label}
          </span>
        </div>
      );
    })}
  </div>
);

const DesktopFlow = ({ activeStep }: { activeStep: number }) => {
  const arcPath = getArcPath();
  const stepPositions = STEPS.map((_, i) => i / (STEPS.length - 1));

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mt-10"
      dir="ltr"
      style={{ height: ARC_SVG_HEIGHT + 110 }}
    >
      <svg
        viewBox={`0 0 ${ARC_SVG_WIDTH} ${ARC_SVG_HEIGHT}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="arcBaseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(210 40% 82%)" stopOpacity="0.45" />
            <stop offset="50%" stopColor="hsl(210 45% 78%)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="hsl(190 45% 76%)" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="arcActiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(210 100% 52%)" />
            <stop offset="50%" stopColor="hsl(205 100% 58%)" />
            <stop offset="100%" stopColor="hsl(188 90% 54%)" />
          </linearGradient>
        </defs>

        <path
          d={arcPath.d}
          fill="none"
          stroke="url(#arcBaseGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d={arcPath.d}
          fill="none"
          stroke="url(#arcActiveGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - ((activeStep + 1) / STEPS.length) * 100}
          style={{
            transition: 'stroke-dashoffset 480ms ease',
            filter: 'drop-shadow(0 0 10px hsl(210 100% 55% / 0.22))',
          }}
        />
      </svg>

      {STEPS.map((step, i) => {
        const t = stepPositions[i];
        const point = getPointOnArc(t);
        const isActive = i <= activeStep;
        const isCurrent = i === activeStep;

        const leftPct = (point.x / ARC_SVG_WIDTH) * 100;
        const topPct = (point.y / ARC_SVG_HEIGHT) * 100;

        return (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-3 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
            }}
          >
            <div
              className="w-20 h-20 rounded-[24px] flex items-center justify-center border transition-all duration-500 bg-white/80"
              style={{
                background: isCurrent
                  ? 'linear-gradient(135deg, hsl(210 100% 50%), hsl(210 100% 39%))'
                  : isActive
                    ? 'linear-gradient(180deg, hsl(210 100% 98%), hsl(210 100% 95%))'
                    : 'rgba(255,255,255,0.72)',
                borderColor: isCurrent
                  ? 'hsl(210 100% 60%)'
                  : isActive
                    ? 'hsl(210 80% 70% / 0.75)'
                    : 'hsl(210 18% 84% / 0.8)',
                boxShadow: isCurrent
                  ? '0 0 0 1px hsl(210 100% 62% / 0.45), 0 0 28px hsl(210 100% 55% / 0.22), 0 12px 30px hsl(210 60% 30% / 0.16)'
                  : isActive
                    ? '0 8px 22px hsl(210 45% 40% / 0.10)'
                    : '0 6px 18px hsl(220 20% 20% / 0.06)',
                transform: isCurrent ? 'scale(1.08)' : isActive ? 'scale(1.02)' : 'scale(1)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <StepIcon type={step.icon} active={isCurrent} />
            </div>

            <span
              className="text-sm font-semibold whitespace-nowrap transition-all duration-500"
              style={{
                color: isCurrent
                  ? 'hsl(210 100% 42%)'
                  : isActive
                    ? 'hsl(220 28% 28%)'
                    : 'hsl(220 12% 56%)',
                textShadow: isCurrent ? '0 0 8px hsl(210 100% 55% / 0.14)' : 'none',
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
  const isMobile = useIsMobile();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveStep(0);

    intervalRef.current = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, CYCLE_MS / STEPS.length);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return <MobileFlow activeStep={activeStep} />;
  }

  return <DesktopFlow activeStep={activeStep} />;
};

export default HeroAutomationFlow;

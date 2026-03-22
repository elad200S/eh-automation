import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const STEPS = [
  { label: 'ליד נכנס', icon: 'user' },
  { label: 'נרשם במערכת', icon: 'database' },
  { label: 'הודעה נשלחת', icon: 'message' },
  { label: 'משימה נוצרת', icon: 'check' },
];

const STEP_INTERVAL = 1400;

const StepIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? '#ffffff' : 'hsl(210 100% 46%)';
  const size = 24;

  switch (type) {
    case 'user':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'message':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'check':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
};

const desktopNodes = [
  { x: 12, y: 72 },
  { x: 37, y: 26 },
  { x: 64, y: 52 },
  { x: 88, y: 20 },
];

const mobileNodes = [
  { x: 10, y: 50 },
  { x: 36, y: 18 },
  { x: 64, y: 50 },
  { x: 90, y: 18 },
];

type NetworkNode = {
  x: number;
  y: number;
};

const buildSegments = (nodes: NetworkNode[]) =>
  nodes.slice(0, -1).map((node, index) => ({
    start: node,
    end: nodes[index + 1],
    key: `${index}-${index + 1}`,
  }));

const NetworkLines = ({
  nodes,
  activeStep,
  svgHeight,
}: {
  nodes: NetworkNode[];
  activeStep: number;
  svgHeight: number;
}) => {
  const segments = buildSegments(nodes);

  return (
    <svg
      viewBox={`0 0 100 ${svgHeight}`}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="networkBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210 35% 80%)" stopOpacity="0.45" />
          <stop offset="50%" stopColor="hsl(205 42% 76%)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="hsl(190 36% 78%)" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="networkActive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210 100% 52%)" />
          <stop offset="50%" stopColor="hsl(203 100% 58%)" />
          <stop offset="100%" stopColor="hsl(188 92% 56%)" />
        </linearGradient>

        <filter id="networkGlow">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {segments.map((segment) => (
        <line
          key={`base-${segment.key}`}
          x1={segment.start.x}
          y1={segment.start.y}
          x2={segment.end.x}
          y2={segment.end.y}
          stroke="url(#networkBase)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}

      {segments.map((segment, index) => {
        const isActive = index < activeStep;

        return (
          <line
            key={`active-${segment.key}`}
            x1={segment.start.x}
            y1={segment.start.y}
            x2={segment.end.x}
            y2={segment.end.y}
            stroke="url(#networkActive)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter={isActive ? 'url(#networkGlow)' : undefined}
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 400ms ease',
            }}
          />
        );
      })}

      {nodes.map((node, index) => {
        const isActive = index <= activeStep;
        const isCurrent = index === activeStep;

        return (
          <g key={`pulse-${index}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={isCurrent ? 2.8 : 1.8}
              fill={isCurrent ? 'hsl(210 100% 58%)' : isActive ? 'hsl(210 90% 56% / 0.75)' : 'hsl(210 18% 84%)'}
              filter={isCurrent ? 'url(#networkGlow)' : undefined}
              style={{ transition: 'all 300ms ease' }}
            />
            {isCurrent && (
              <circle
                cx={node.x}
                cy={node.y}
                r="4.6"
                fill="none"
                stroke="hsl(210 100% 60% / 0.35)"
                strokeWidth="0.6"
              >
                <animate attributeName="r" values="4.6;7.8;4.6" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.65;0;0.65" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const NodeCard = ({
  step,
  index,
  activeStep,
  position,
  size = 'desktop',
}: {
  step: (typeof STEPS)[number];
  index: number;
  activeStep: number;
  position: NetworkNode;
  size?: 'desktop' | 'mobile';
}) => {
  const isActive = index <= activeStep;
  const isCurrent = index === activeStep;
  const cardSize = size === 'desktop' ? 'w-24 h-24' : 'w-16 h-16';
  const textSize = size === 'desktop' ? 'text-base' : 'text-[11px]';
  const gapSize = size === 'desktop' ? 'gap-3' : 'gap-2';
  const labelOffset = size === 'desktop' ? 18 : 14;

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${gapSize} z-10`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div
        className={`${cardSize} rounded-[28px] flex items-center justify-center border transition-all duration-500`}
        style={{
          background: isCurrent
            ? 'linear-gradient(135deg, hsl(210 100% 50%), hsl(210 100% 38%))'
            : isActive
              ? 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(239,247,255,0.96))'
              : 'rgba(255,255,255,0.72)',
          borderColor: isCurrent
            ? 'hsl(210 100% 62%)'
            : isActive
              ? 'hsl(210 75% 72% / 0.9)'
              : 'hsl(210 18% 84% / 0.85)',
          boxShadow: isCurrent
            ? '0 0 0 1px hsl(210 100% 62% / 0.30), 0 0 34px hsl(210 100% 55% / 0.25), 0 18px 32px hsl(210 50% 24% / 0.18)'
            : isActive
              ? '0 10px 24px hsl(210 38% 30% / 0.12)'
              : '0 8px 18px hsl(220 20% 20% / 0.05)',
          transform: isCurrent ? 'scale(1.1)' : isActive ? 'scale(1.03)' : 'scale(1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <StepIcon type={step.icon} active={isCurrent} />
      </div>

      <span
        className={`${textSize} font-semibold whitespace-nowrap transition-all duration-500`}
        style={{
          color: isCurrent
            ? 'hsl(210 100% 42%)'
            : isActive
              ? 'hsl(220 25% 28%)'
              : 'hsl(220 12% 58%)',
          textShadow: isCurrent ? '0 0 10px hsl(210 100% 56% / 0.10)' : 'none',
          marginTop: `${labelOffset / 6}px`,
        }}
      >
        {step.label}
      </span>
    </div>
  );
};

const MobileFlow = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mt-8" dir="ltr" style={{ height: 240 }}>
      <div className="absolute inset-0 rounded-[28px] bg-white/35" />

      <NetworkLines nodes={mobileNodes} activeStep={activeStep} svgHeight={68} />

      {STEPS.map((step, index) => (
        <NodeCard
          key={step.label}
          step={step}
          index={index}
          activeStep={activeStep}
          position={mobileNodes[index]}
          size="mobile"
        />
      ))}
    </div>
  );
};

const DesktopFlow = ({ activeStep }: { activeStep: number }) => {
  return (
    <div
      className="relative w-full max-w-6xl mx-auto mt-8"
      dir="ltr"
      style={{ height: 430 }}
    >
      <div
        className="absolute inset-x-0 top-[8%] bottom-[4%] rounded-[40px]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, hsl(210 100% 97% / 0.42), transparent 55%)',
        }}
      />

      <NetworkLines nodes={desktopNodes} activeStep={activeStep} svgHeight={100} />

      {STEPS.map((step, index) => (
        <NodeCard
          key={step.label}
          step={step}
          index={index}
          activeStep={activeStep}
          position={desktopNodes[index]}
          size="desktop"
        />
      ))}
    </div>
  );
};

const HeroAutomationFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveStep(0);

    intervalRef.current = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, STEP_INTERVAL);

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

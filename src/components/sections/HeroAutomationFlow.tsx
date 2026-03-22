import { useEffect, useState, useRef } from 'react';

const STEPS = [
  { label: 'ליד נכנס', icon: 'user' },
  { label: 'נרשם במערכת', icon: 'database' },
  { label: 'הודעה נשלחת', icon: 'message' },
  { label: 'משימה נוצרת', icon: 'check' },
];

const CYCLE_MS = 4000;
const STEP_DURATION = CYCLE_MS / STEPS.length;

const StepIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.4)';
  const size = 20;
  
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

const HeroAutomationFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  return (
    <div className="w-full max-w-xl mx-auto mt-8 md:mt-10" dir="ltr">
      {/* Flow container */}
      <div className="relative flex items-center justify-between px-2 sm:px-4">
        {/* Connection line (background) */}
        <div className="absolute top-1/2 left-[28px] right-[28px] sm:left-[36px] sm:right-[36px] h-[2px] -translate-y-1/2 bg-border rounded-full" />

        {/* Active progress line */}
        <div
          className="absolute top-1/2 left-[28px] sm:left-[36px] h-[2px] -translate-y-1/2 rounded-full transition-none"
          style={{
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))',
            width: `calc(${((activeStep + dotProgress) / (STEPS.length - 1)) * 100}% * (1 - 56px / 100%) )`,
            maxWidth: 'calc(100% - 56px)',
          }}
        />

        {/* Travelling dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10"
          style={{
            background: 'hsl(var(--primary))',
            boxShadow: '0 0 8px hsl(var(--primary) / 0.5)',
            left: `calc(28px + ${((activeStep + dotProgress) / (STEPS.length - 1)) * 100}% * (1 - 56px / 100%))`,
            transition: dotProgress < 0.05 ? 'none' : 'left 60ms linear',
          }}
        />

        {/* Step nodes */}
        {STEPS.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;

          return (
            <div key={i} className="relative z-20 flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  border-2 transition-all duration-500
                  ${isCurrent
                    ? 'bg-primary/10 border-primary shadow-[0_0_12px_hsl(var(--primary)/0.25)]'
                    : isActive
                      ? 'bg-primary/5 border-primary/40'
                      : 'bg-card border-border'
                  }
                `}
              >
                <StepIcon type={step.icon} active={isActive} />
              </div>
              <span
                className={`
                  text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors duration-500
                  ${isCurrent ? 'text-primary' : isActive ? 'text-foreground/70' : 'text-muted-foreground/50'}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroAutomationFlow;

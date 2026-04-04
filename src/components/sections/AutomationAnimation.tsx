import { useEffect, useState, useRef, useCallback } from 'react';
import Section from '@/components/Section';
import { ClipboardList, Zap, Settings2, Database, MessageCircle, Mail, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const mainSteps = [
  {
    Icon: ClipboardList,
    label: 'fills out a form',
    sublabel: ' ',
    color: 'text-primary',
    bg: 'bg-primary/10',
    borderActive: 'border-primary/40',
  },
  {
    Icon: Zap,
    label: 'sent Webhook ',
    sublabel: ' ',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    borderActive: 'border-secondary/40',
  },
  {
    Icon: Settings2,
    label: 'Automatic automation',
    sublabel: ' ',
    color: 'text-accent-foreground',
    bg: 'bg-accent/10',
    borderActive: 'border-accent/40',
  },
];

const makeActions = [
  { Icon: Database,       label: 'שמירת ליד',  color: 'text-primary',          bg: 'bg-primary/10' },
  { Icon: MessageCircle,  label: 'WhatsApp',    color: 'text-green-400',        bg: 'bg-green-400/10' },
  { Icon: Mail,           label: 'מייל',        color: 'text-secondary',        bg: 'bg-secondary/10' },
  { Icon: CalendarCheck,  label: 'משימה',       color: 'text-accent-foreground', bg: 'bg-accent/10' },
];

// Total "steps" = 3 main + 4 make-actions = 7
const TOTAL_STEPS = mainSteps.length + makeActions.length;
const STEP_DELAY = 600;
const PAUSE_AFTER_COMPLETE = 2200;

const AutomationAnimation = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isInViewRef = useRef(false);

  const startAnimation = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveStep(-1);

    for (let i = 0; i < TOTAL_STEPS; i++) {
      const timer = setTimeout(() => setActiveStep(i), (i + 1) * STEP_DELAY);
      timersRef.current.push(timer);
    }

    const loopTimer = setTimeout(() => {
      if (isInViewRef.current) startAnimation();
    }, TOTAL_STEPS * STEP_DELAY + PAUSE_AFTER_COMPLETE);
    timersRef.current.push(loopTimer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          setActiveStep(-1);
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, [startAnimation]);

  // step index 0,1,2 = main steps; 3-6 = make actions
  const makeCardActive = activeStep >= 2; // Make card appears when step 2 activates
  const makeActionsVisible = activeStep >= 3; // actions appear from step 3

  return (
    <Section id="automation-demo" withSeparator={false}>
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
          איך זה עובד בפועל
        </h2>

        {/* ── Row: main flow ── */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-center">

          {/* Steps 0 & 1 */}
          {mainSteps.slice(0, 2).map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4">
              <StepCard step={step} active={activeStep >= index} />
              <FlowArrow active={activeStep > index} />
            </div>
          ))}

          {/* Step 2 — Make card (expanded with sub-actions) */}
          <div
            className={cn(
              'flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-500 min-w-[160px]',
              makeCardActive
                ? 'border-accent/40 bg-card shadow-md scale-100 opacity-100'
                : 'border-transparent bg-muted/30 scale-95 opacity-40'
            )}
          >
            {/* Make icon + label */}
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500',
                mainSteps[2].bg,
                makeCardActive ? 'scale-110' : 'scale-100'
              )}
            >
              <Settings2 className={cn('w-6 h-6 transition-colors duration-500', mainSteps[2].color)} />
            </div>
            <span className="text-xs font-medium text-foreground/80 text-center">{mainSteps[2].label}</span>
            <span className="text-[10px] text-muted-foreground text-center -mt-2">{mainSteps[2].sublabel}</span>

            {/* Divider */}
            <div
              className={cn(
                'w-full border-t transition-all duration-500',
                makeActionsVisible ? 'border-border/50 opacity-100' : 'border-transparent opacity-0'
              )}
            />

            {/* 4 Make actions grid */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {makeActions.map((action, i) => {
                const actionStep = 3 + i;
                const isActive = activeStep >= actionStep;
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all duration-500',
                      isActive
                        ? 'border-border/40 bg-background/40 opacity-100 scale-100'
                        : 'border-transparent bg-transparent opacity-0 scale-90'
                    )}
                  >
                    <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', action.bg)}>
                      <action.Icon className={cn('w-3.5 h-3.5', action.color)} />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">
                      {action.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash-flow {
          from { stroke-dashoffset: 14; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes dash-flow-vertical {
          from { stroke-dashoffset: 14; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </Section>
  );
};

/* ── helpers ── */

type StepDef = typeof mainSteps[0];

function StepCard({ step, active }: { step: StepDef; active: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-500',
        active
          ? `${step.borderActive} bg-card shadow-md scale-100 opacity-100`
          : 'border-transparent bg-muted/30 scale-95 opacity-40'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500',
          step.bg,
          active ? 'scale-110' : 'scale-100'
        )}
      >
        <step.Icon className={cn('w-6 h-6 transition-colors duration-500', step.color)} />
      </div>
      <span className="text-xs font-medium text-foreground/80 text-center whitespace-nowrap">{step.label}</span>
      <span className="text-[10px] text-muted-foreground text-center -mt-2 whitespace-nowrap">{step.sublabel}</span>
    </div>
  );
}

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className={cn('transition-all duration-500', active ? 'opacity-100' : 'opacity-20')}>
      {/* Desktop */}
      <svg className="hidden md:block w-10 h-5 text-primary" viewBox="0 0 40 20" overflow="visible">
        <path
          d="M0 10h30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
          strokeLinecap="round"
          style={active ? { animation: 'dash-flow 0.8s linear infinite' } : {}}
        />
        <path d="M26 6l8 4-8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Mobile */}
      <svg className="md:hidden w-5 h-10 text-primary" viewBox="0 0 20 40" overflow="visible">
        <path
          d="M10 0v30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
          strokeLinecap="round"
          style={active ? { animation: 'dash-flow-vertical 0.8s linear infinite' } : {}}
        />
        <path d="M6 26l4 8 4-8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default AutomationAnimation;

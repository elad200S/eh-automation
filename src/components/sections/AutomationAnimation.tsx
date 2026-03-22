import { useEffect, useState, useRef, useCallback } from 'react';
import Section from '@/components/Section';
import { User, MessageSquare, BarChart3, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    Icon: User,
    label: 'ליד נכנס למערכת',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    Icon: MessageSquare,
    label: 'הודעה נשלחת אוטומטית',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    Icon: BarChart3,
    label: 'הליד נרשם ומנוטר',
    color: 'text-accent-foreground',
    bg: 'bg-accent/10',
  },
  {
    Icon: CalendarCheck,
    label: 'משימה או פגישה נוצרת',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

const AutomationAnimation = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startAnimation = useCallback(() => {
    // Reset
    setActiveStep(-1);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    steps.forEach((_, i) => {
      const timer = setTimeout(() => setActiveStep(i), (i + 1) * 700);
      timersRef.current.push(timer);
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          // Reset when out of view so it replays on re-entry
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

  return (
    <Section id="automation-demo" withSeparator={false}>
      <div ref={sectionRef} className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">
          איך זה עובד בפועל
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4">
              <div
                className={cn(
                  'flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-500',
                  activeStep >= index
                    ? 'border-primary/30 bg-card shadow-md scale-100 opacity-100'
                    : 'border-transparent bg-muted/30 scale-95 opacity-40'
                )}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500', step.bg)}>
                  <step.Icon className={cn('w-6 h-6 transition-colors duration-500', step.color)} />
                </div>
                <span className="text-xs text-muted-foreground text-center whitespace-nowrap">{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  'transition-all duration-500',
                  activeStep > index ? 'opacity-100' : 'opacity-20'
                )}>
                  <svg className="hidden md:block w-8 h-4 text-primary/40" viewBox="0 0 32 16">
                    <path d="M0 8h24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M20 4l6 4-6 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg className="md:hidden w-4 h-8 text-primary/40" viewBox="0 0 16 32">
                    <path d="M8 0v24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M4 20l4 6 4-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AutomationAnimation;

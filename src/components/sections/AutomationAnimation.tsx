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

// כמה זמן כל שלב מופיע (מילישניות)
const STEP_DELAY = 700;
// כמה זמן להמתין אחרי שכל השלבים הופיעו לפני איפוס
const PAUSE_AFTER_COMPLETE = 2000;

const AutomationAnimation = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isInViewRef = useRef(false);

  const startAnimation = useCallback(() => {
    // איפוס כל הטיימרים הקודמים
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveStep(-1);

    // הפעל כל שלב בזה אחר זה
    steps.forEach((_, i) => {
      const timer = setTimeout(() => setActiveStep(i), (i + 1) * STEP_DELAY);
      timersRef.current.push(timer);
    });

    // אחרי שכל השלבים הופיעו — המתן ואז התחל מחדש (loop!)
    const totalDuration = steps.length * STEP_DELAY + PAUSE_AFTER_COMPLETE;
    const loopTimer = setTimeout(() => {
      // רק אם עדיין בview
      if (isInViewRef.current) {
        startAnimation();
      }
    }, totalDuration);
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
          // יצא מview — עצור הכל ואפס
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
                {/* האייקון — מקבל scale-up כשפעיל */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500',
                    step.bg,
                    activeStep >= index ? 'scale-110' : 'scale-100'
                  )}
                >
                  <step.Icon className={cn('w-6 h-6 transition-colors duration-500', step.color)} />
                </div>
                <span className="text-xs text-muted-foreground text-center whitespace-nowrap">
                  {step.label}
                </span>
              </div>

              {/* החץ בין שלבים — עם אנימציית זרימה */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'transition-all duration-500',
                    activeStep > index ? 'opacity-100' : 'opacity-20'
                  )}
                >
                  {/* Desktop: חץ אופקי עם זרימה */}
                  <svg
                    className="hidden md:block w-10 h-5 text-primary"
                    viewBox="0 0 40 20"
                    overflow="visible"
                  >
                    {/* הקו הזורם */}
                    <path
                      d="M0 10h30"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      fill="none"
                      strokeLinecap="round"
                      style={
                        activeStep > index
                          ? {
                              animation: 'dash-flow 0.8s linear infinite',
                            }
                          : {}
                      }
                    />
                    {/* ראש החץ */}
                    <path
                      d="M26 6l8 4-8 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Mobile: חץ אנכי עם זרימה */}
                  <svg
                    className="md:hidden w-5 h-10 text-primary"
                    viewBox="0 0 20 40"
                    overflow="visible"
                  >
                    <path
                      d="M10 0v30"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      fill="none"
                      strokeLinecap="round"
                      style={
                        activeStep > index
                          ? {
                              animation: 'dash-flow-vertical 0.8s linear infinite',
                            }
                          : {}
                      }
                    />
                    <path
                      d="M6 26l4 8 4-8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS לאנימציית הזרימה — מוסיף לdocument פעם אחת */}
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

export default AutomationAnimation;

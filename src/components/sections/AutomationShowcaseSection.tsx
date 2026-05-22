import { useState, useEffect, useRef } from 'react';
import Section from '@/components/Section';
import { cn } from '@/lib/utils';
import RevealText from '@/components/RevealText';

const INTERVAL = 5200;

const scenarios = [
  {
    tag: '01',
    title: 'ליד נכנס מהאתר',
    steps: [
      { label: 'טופס נשלח מהאתר', color: '#10b981', delay: 200 },
      { label: 'ליד נפתח ב-CRM', color: '#06b6d4', delay: 900 },
      { label: 'WhatsApp נשלח אוטומטית', color: '#25D366', delay: 1600 },
      { label: 'התראה לסוכן הרלוונטי', color: '#f59e0b', delay: 2300 },
    ],
  },
  {
    tag: '02',
    title: 'פולו-אפ ללקוח שלא ענה',
    steps: [
      { label: '3 ימים ללא מענה — זוהה', color: '#f59e0b', delay: 200 },
      { label: 'הודעת המשך נשלחת', color: '#10b981', delay: 900 },
      { label: 'סטטוס CRM מתעדכן', color: '#06b6d4', delay: 1600 },
      { label: 'תזכורת לסוכן עולה', color: '#a78bfa', delay: 2300 },
    ],
  },
  {
    tag: '03',
    title: 'דוח שבועי אוטומטי',
    steps: [
      { label: 'איסוף נתונים מ-CRM', color: '#10b981', delay: 200 },
      { label: 'סיכום ועיבוד אוטומטי', color: '#06b6d4', delay: 900 },
      { label: 'דוח PDF נוצר', color: '#f59e0b', delay: 1600 },
      { label: 'שליחה למייל המנהל', color: '#a78bfa', delay: 2300 },
    ],
  },
  {
    tag: '04',
    title: 'תיאום פגישה חכם',
    steps: [
      { label: 'לקוח בחר זמן בCalendly', color: '#10b981', delay: 200 },
      { label: 'יומן מסונכרן אוטומטית', color: '#06b6d4', delay: 900 },
      { label: 'אישור WhatsApp נשלח', color: '#25D366', delay: 1600 },
      { label: 'תזכורת יום לפני הפגישה', color: '#f59e0b', delay: 2300 },
    ],
  },
];

const StepVisual = ({ steps, scenarioKey }: { steps: typeof scenarios[0]['steps']; scenarioKey: number }) => {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    setVisible([]);
    const timers = steps.map((step, i) =>
      setTimeout(() => setVisible(prev => [...prev, i]), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [scenarioKey]);

  return (
    <div className="bg-background rounded-xl border border-border p-5" dir="rtl">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="text-muted-foreground text-xs font-mono mr-3">automation.run</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 transition-all duration-500"
            style={{
              opacity: visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? 'translateX(0)' : 'translateX(10px)',
            }}
          >
            <div
              style={{
                width: 10, height: 10,
                borderRadius: '50%',
                flexShrink: 0,
                background: step.color,
                boxShadow: `0 0 10px ${step.color}90`,
              }}
            />
            <span className="text-sm text-foreground/80 font-mono flex-1">{step.label}</span>
            {visible.includes(i) && (
              <span className="text-xs font-mono" style={{ color: '#10b981' }}>✓ done</span>
            )}
          </div>
        ))}
      </div>

      {visible.length === steps.length && (
        <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2" dir="rtl">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">כל השלבים הושלמו בהצלחה</span>
        </div>
      )}
    </div>
  );
};

const AutomationShowcaseSection = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let p = 0;
    const step = 100 / (INTERVAL / 50);
    progressRef.current = setInterval(() => {
      p += step;
      setProgress(Math.min(p, 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % scenarios.length);
      setProgress(0);
      p = 0;
    }, INTERVAL);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    startCycle();
  };

  return (
    <Section id="showcase">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">הדגמה חיה</p>
          <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ראה איך זה עובד בפועל
          </RevealText>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            4 תרחישים אמיתיים שאנחנו בונים ללקוחות — כך האוטומציה נראית מאחורי הקלעים
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-5 gap-5 items-start">
          {/* Left: scenario tabs — horizontal scroll on mobile */}
          <div className="md:col-span-2">
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:overflow-x-visible">
              {scenarios.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    'flex-shrink-0 md:w-full text-right p-3 md:p-4 rounded-xl border transition-all duration-300',
                    active === i
                      ? 'bg-card border-primary/40 shadow-lg shadow-primary/10'
                      : 'bg-card/40 border-border/40 hover:border-border hover:bg-card/60'
                  )}
                >
                  <div className="flex items-center gap-2 md:gap-3" dir="rtl">
                    <span className={cn(
                      'font-mono text-xs font-bold transition-colors shrink-0',
                      active === i ? 'text-primary' : 'text-muted-foreground/60'
                    )}>
                      {s.tag}
                    </span>
                    <span className={cn(
                      'font-medium text-xs md:text-sm transition-colors text-right whitespace-nowrap md:whitespace-normal',
                      active === i ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {s.title}
                    </span>
                  </div>

                  {/* Progress bar — desktop only */}
                  {active === i && (
                    <div className="hidden md:block mt-3 h-0.5 bg-border/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: animated visual */}
          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 pointer-events-none" />
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
                <div className="mb-4" dir="rtl">
                  <h3 className="text-base font-semibold text-foreground">
                    {scenarios[active].title}
                  </h3>
                </div>
                <StepVisual key={active} steps={scenarios[active].steps} scenarioKey={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AutomationShowcaseSection;

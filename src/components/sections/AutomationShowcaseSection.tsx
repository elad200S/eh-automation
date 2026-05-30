import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import RevealText from '@/components/RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_INTERVAL  = 5200;
const SCENARIO_SCROLL  = 600;

const scenarios = [
  {
    tag: '01',
    title: 'ליד נכנס מהאתר',
    steps: [
      { label: 'טופס נשלח מהאתר',          color: '#10b981', delay: 200  },
      { label: 'ליד נפתח ב-CRM',            color: '#06b6d4', delay: 900  },
      { label: 'WhatsApp נשלח אוטומטית',    color: '#25D366', delay: 1600 },
      { label: 'התראה לסוכן הרלוונטי',      color: '#f59e0b', delay: 2300 },
    ],
  },
  {
    tag: '02',
    title: 'פולו-אפ ללקוח שלא ענה',
    steps: [
      { label: '3 ימים ללא מענה — זוהה',    color: '#f59e0b', delay: 200  },
      { label: 'הודעת המשך נשלחת',          color: '#10b981', delay: 900  },
      { label: 'סטטוס CRM מתעדכן',          color: '#06b6d4', delay: 1600 },
      { label: 'תזכורת לסוכן עולה',         color: '#a78bfa', delay: 2300 },
    ],
  },
  {
    tag: '03',
    title: 'דוח שבועי אוטומטי',
    steps: [
      { label: 'איסוף נתונים מ-CRM',        color: '#10b981', delay: 200  },
      { label: 'סיכום ועיבוד אוטומטי',      color: '#06b6d4', delay: 900  },
      { label: 'דוח PDF נוצר',              color: '#f59e0b', delay: 1600 },
      { label: 'שליחה למייל המנהל',         color: '#a78bfa', delay: 2300 },
    ],
  },
  {
    tag: '04',
    title: 'תיאום פגישה חכם',
    steps: [
      { label: 'לקוח בחר זמן בCalendly',    color: '#10b981', delay: 200  },
      { label: 'יומן מסונכרן אוטומטית',     color: '#06b6d4', delay: 900  },
      { label: 'אישור WhatsApp נשלח',       color: '#25D366', delay: 1600 },
      { label: 'תזכורת יום לפני הפגישה',    color: '#f59e0b', delay: 2300 },
    ],
  },
];

// ── Desktop: fade-in step visual ──────────────────────────────
const StepVisual = ({ steps, scenarioKey }: { steps: typeof scenarios[0]['steps']; scenarioKey: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) gsap.set(containerRef.current, { opacity: 0, y: 8 });
  }, [scenarioKey]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' });
  }, [scenarioKey]);

  return (
    <div ref={containerRef} className="bg-background rounded-xl border border-border p-5" dir="rtl">
      <div className="flex items-center gap-2 mb-5" dir="ltr">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="text-muted-foreground text-xs font-mono ml-3">automation.run</span>
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: step.color, boxShadow: `0 0 10px ${step.color}90` }} />
            <span className="text-sm text-foreground/80 font-mono flex-1">{step.label}</span>
            <span className="text-xs font-mono" style={{ color: '#10b981' }}>✓ done</span>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2" dir="rtl">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-green-400 font-mono">כל השלבים הושלמו בהצלחה</span>
      </div>
    </div>
  );
};

// ── Mobile: book-page flip card ───────────────────────────────
const FlipCard = ({ active }: { active: number }) => {
  const pageRef  = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(active);
  const prevRef  = useRef(active);

  useEffect(() => {
    if (active === prevRef.current) return;
    const next = active;
    prevRef.current = active;

    const el = pageRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.timeline()
      .to(el, { opacity: 0, y: -8, duration: 0.18, ease: 'power2.in' })
      .call(() => setShown(next))
      .fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' });
  }, [active]);

  const scenario = scenarios[shown];

  return (
    <div>
      <div
        ref={pageRef}
        className="bg-background rounded-xl border border-border p-5"
        dir="rtl"
      >
        {/* macOS-style bar */}
        <div className="flex items-center gap-2 mb-5" dir="ltr">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-muted-foreground text-xs font-mono ml-3">automation.run</span>
        </div>

        <div className="space-y-3">
          {scenario.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: step.color, boxShadow: `0 0 10px ${step.color}90` }} />
              <span className="text-sm text-foreground/80 font-mono flex-1">{step.label}</span>
              <span className="text-xs font-mono" style={{ color: '#10b981' }}>✓ done</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2" dir="rtl">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">כל השלבים הושלמו בהצלחה</span>
        </div>
      </div>
    </div>
  );
};

const AutomationShowcaseSection = () => {
  const [active, setActive]  = useState(0);
  const sectionRef           = useRef<HTMLElement>(null);
  const activeRef            = useRef(0);
  const progressBarRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const id = setInterval(() => {
        setActive(prev => (prev + 1) % scenarios.length);
      }, MOBILE_INTERVAL);
      return () => clearInterval(id);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        start: 'top top',
        end: `+=${SCENARIO_SCROLL * scenarios.length}`,
        onUpdate: (self) => {
          const n    = scenarios.length;
          const next = Math.min(Math.floor(self.progress * n), n - 1);
          const pct  = Math.min((self.progress - next / n) * n * 100, 100);
          if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActive(next);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="py-14 md:py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">הדגמה חיה</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              4 תרחישים מהשטח
            </RevealText>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              4 תרחישים אמיתיים שאנחנו בונים ללקוחות — כך האוטומציה נראית מאחורי הקלעים
            </p>
          </div>

          {/* ── Mobile layout ────────────────────────────────── */}
          <div className="md:hidden">
            <div className="mb-5" dir="rtl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-foreground">
                  {scenarios[active].title}
                </h3>
                <span className="font-mono text-xs text-primary font-bold">
                  {String(active + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {scenarios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: active === i ? 28 : 8, opacity: active === i ? 1 : 0.3, background: 'hsl(160,84%,39%)' }}
                  />
                ))}
              </div>
            </div>

            {/* Page-flip card */}
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 pointer-events-none" />
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-4">
                <div className="mb-3" dir="rtl">
                  <h3 className="text-sm font-semibold text-foreground">{scenarios[active].title}</h3>
                </div>
                <FlipCard active={active} />
              </div>
            </div>
          </div>

          {/* ── Desktop layout ───────────────────────────────── */}
          <div className="hidden md:grid md:grid-cols-5 gap-5 items-start">
            {/* Scenario tabs */}
            <div className="md:col-span-2">
              <div className="flex flex-col gap-2">
                {scenarios.map((s, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-full text-right p-4 rounded-xl border transition-all duration-300',
                      active === i
                        ? 'bg-card border-primary/40 shadow-lg shadow-primary/10'
                        : 'bg-card/40 border-border/40'
                    )}
                  >
                    <div className="flex items-center gap-3" dir="rtl">
                      <span className={cn('font-mono text-xs font-bold transition-colors shrink-0', active === i ? 'text-primary' : 'text-muted-foreground/60')}>
                        {s.tag}
                      </span>
                      <span className={cn('font-medium text-sm transition-colors', active === i ? 'text-foreground' : 'text-muted-foreground')}>
                        {s.title}
                      </span>
                    </div>
                    {active === i && (
                      <div className="mt-3 h-0.5 bg-border/40 rounded-full overflow-hidden">
                        <div ref={progressBarRef} className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step visual */}
            <div className="md:col-span-3">
              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 pointer-events-none" />
                <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
                  <div className="mb-4" dir="rtl">
                    <h3 className="text-base font-semibold text-foreground">{scenarios[active].title}</h3>
                  </div>
                  <StepVisual key={active} steps={scenarios[active].steps} scenarioKey={active} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AutomationShowcaseSection;

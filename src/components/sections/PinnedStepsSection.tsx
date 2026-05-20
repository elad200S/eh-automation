import { useEffect, useRef } from 'react';
import { Search, Settings, Rocket } from 'lucide-react';
import Section from '@/components/Section';
import gsap from 'gsap';

const steps = [
  {
    title: 'הבנה של העסק והתהליך הקיים',
    description: 'מיפוי נקודות הכאב, הבנת המערכות הקיימות — לפני שנוגעים בקוד.',
    detail: 'שיחת אפיון · מיפוי תהליכים · הגדרת יעדים',
    Icon: Search,
    number: '01',
  },
  {
    title: 'בניית אוטומציה מותאמת',
    description: 'חיבור בין המערכות, הגדרת זרימות עבודה — עד שהכל רץ חלק.',
    detail: 'פיתוח · אינטגרציות · בדיקות end-to-end',
    Icon: Settings,
    number: '02',
  },
  {
    title: 'הטמעה ושיפור מתמשך',
    description: 'עלייה לאוויר וליווי צמוד — לא נעלמים אחרי ה-deploy.',
    detail: 'השקה · הכשרה · מעקב ביצועים',
    Icon: Rocket,
    number: '03',
  },
];

const clamp    = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const mapRange = (v: number, a: number, b: number, c: number, d: number) =>
  c + clamp((v - a) / (b - a), 0, 1) * (d - c);

const PinnedStepsSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const outer = outerRef.current;
    if (!outer) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const dots  = dotsRef.current.filter(Boolean)  as HTMLDivElement[];
    if (cards.length < 3) return;

    // Initial card positions
    gsap.set(cards[0], { yPercent: 0 });
    gsap.set(cards[1], { yPercent: 100 });
    gsap.set(cards[2], { yPercent: 100 });

    let lastDot = -1;
    const activateDot = (idx: number) => {
      if (idx === lastDot) return;
      lastDot = idx;
      dots.forEach((d, i) => {
        if (!d) return;
        gsap.to(d, {
          scaleX:          i === idx ? 4 : 1,
          backgroundColor: i === idx ? 'hsl(160,84%,39%)' : 'hsl(220,15%,22%)',
          duration: 0.25,
          ease: 'power2.out',
        });
      });
    };
    activateDot(0);

    let rafId: number;

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      const rect  = outer.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = outer.offsetHeight - viewH;
      if (total <= 0) return;

      const p = clamp(-rect.top / total, 0, 1);

      // Card 0: exits  p 0.28 → 0.46
      const y0 = mapRange(p, 0.28, 0.46, 0, -100);

      // Card 1: enters p 0.28 → 0.46 | exits p 0.60 → 0.78
      const y1 = p < 0.28 ? 100
               : p < 0.46 ? mapRange(p, 0.28, 0.46, 100, 0)
               : p < 0.60 ? 0
               :             mapRange(p, 0.60, 0.78, 0, -100);

      // Card 2: enters p 0.60 → 0.78
      const y2 = p < 0.60 ? 100 : mapRange(p, 0.60, 0.78, 100, 0);

      gsap.set(cards[0], { yPercent: y0 });
      gsap.set(cards[1], { yPercent: y1 });
      gsap.set(cards[2], { yPercent: y2 });

      activateDot(p < 0.43 ? 0 : p < 0.76 ? 1 : 2);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div id="process">

      {/* ── Desktop: sticky scroll ───────────────────── */}
      <div
        ref={outerRef}
        className="hidden md:block"
        style={{ height: '380vh' }}
      >
        {/* CSS sticky — works now that transforms are removed from ancestors */}
        <div
          className="overflow-hidden"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            background: 'hsl(220,15%,9%)',
          }}
        >
          {/* Section header */}
          <div className="absolute top-0 inset-x-0 z-20 pt-10 text-center pointer-events-none">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/60 mb-2">
              תהליך העבודה
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </h2>
          </div>

          {/* Stacked cards */}
          {steps.map((step, i) => {
            const StepIcon = step.Icon;
            return (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ paddingTop: '6rem', paddingBottom: '4rem', paddingInline: '2rem' }}
              >
                {/* Watermark */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                >
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(10rem, 22vw, 18rem)', color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.06em' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="relative w-full rounded-2xl border border-white/[0.08] backdrop-blur-md"
                  style={{
                    maxWidth: 520,
                    background: 'rgba(255,255,255,0.03)',
                    boxShadow: '0 0 60px rgba(16,185,129,0.06), 0 24px 60px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                      >
                        <StepIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-mono text-xl font-black text-primary/70">
                        {step.number}
                        <span className="text-muted-foreground/25 text-base font-normal"> / 03</span>
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-base text-muted-foreground leading-relaxed mb-5">
                      {step.description}
                    </p>

                    <p
                      className="font-mono text-xs text-primary/35 pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Progress dots */}
          <div className="absolute bottom-7 inset-x-0 flex justify-center items-center gap-3 z-20">
            {steps.map((_, i) => (
              <div
                key={i}
                ref={el => { dotsRef.current[i] = el; }}
                className="h-[3px] w-2 rounded-full origin-left"
                style={{ backgroundColor: 'hsl(220,15%,22%)' }}
              />
            ))}
          </div>

          <div className="absolute top-0 inset-x-0 h-px section-separator" />
        </div>
      </div>

      {/* ── Mobile: stacked cards ───────────────────── */}
      <Section className="md:hidden bg-background-secondary">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
            <h2 className="text-4xl font-bold text-foreground">איך אנחנו עובדים יחד</h2>
          </div>
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <div key={i} className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <StepIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-bold text-primary/50 tracking-widest">{step.number}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

    </div>
  );
};

export default PinnedStepsSection;

import { useEffect, useRef } from 'react';
import { Search, Settings, Rocket } from 'lucide-react';
import Section from '@/components/Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'הבנה של העסק והתהליך הקיים',
    description: 'איפה הולכים לאיבוד לידים ואיפה יש בזבוז זמן — מיפוי מלא לפני שנוגעים בקוד.',
    detail:      'שיחת אפיון מעמיקה · מיפוי נקודות הכאב · הבנת המערכות הקיימות',
    Icon: Search,
    number: '01',
  },
  {
    title: 'בניית אוטומציה מותאמת',
    description: 'חיבור בין המערכות, הגדרת זרימות עבודה, ובדיקות עד שהכל רץ חלק.',
    detail:      'פיתוח ואינטגרציות · בדיקות end-to-end · עדכונים בזמן אמת',
    Icon: Settings,
    number: '02',
  },
  {
    title: 'הטמעה ושיפור מתמשך',
    description: 'עלייה לאוויר, ליווי צמוד ושיפורים לפי הצורך — לא נעלמים אחרי ה-deploy.',
    detail:      'השקה · הכשרה · מעקב ביצועים · שיפורים לאורך זמן',
    Icon: Rocket,
    number: '03',
  },
];

const PinnedStepsSection = () => {
  const outerRef        = useRef<HTMLDivElement>(null);
  const innerRef        = useRef<HTMLDivElement>(null);
  const cardsRef        = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef         = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const dots  = dotsRef.current.filter(Boolean)  as HTMLDivElement[];
      if (cards.length < 3) return;

      // Initial: card 0 centered, cards 1-2 below
      gsap.set(cards[0], { yPercent: 0 });
      gsap.set(cards.slice(1), { yPercent: 100 });

      const activateDot = (idx: number) => {
        dots.forEach((d, i) => {
          if (!d) return;
          gsap.to(d, {
            scaleX:          i === idx ? 4 : 1,
            backgroundColor: i === idx ? 'hsl(160,84%,39%)' : 'hsl(220,15%,22%)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      };
      activateDot(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:      outerRef.current,
          start:        'top top',
          end:          () => `+=${window.innerHeight * 3.2}`,
          scrub:        1.8,
          pin:          innerRef.current,
          anticipatePin: 1,
          onUpdate(self) {
            const p = self.progress;
            activateDot(p < 0.44 ? 0 : p < 0.88 ? 1 : 2);
          },
        },
      });

      // ── Hold card 0 ────────────────────────────────
      tl.to({}, { duration: 0.5 })

      // ── Card 0 → 1 ─────────────────────────────────
        .to(cards[0], { yPercent: -100, ease: 'none', duration: 0.8 })
        .to(cards[1], { yPercent:    0, ease: 'none', duration: 0.8 }, '<')

      // ── Hold card 1 ────────────────────────────────
        .to({}, { duration: 0.5 })

      // ── Card 1 → 2 ─────────────────────────────────
        .to(cards[1], { yPercent: -100, ease: 'none', duration: 0.8 })
        .to(cards[2], { yPercent:    0, ease: 'none', duration: 0.8 }, '<')

      // ── Hold card 2 ────────────────────────────────
        .to({}, { duration: 0.5 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="process">

      {/* ─── Desktop: pinned scroll ──────────────────── */}
      <div ref={outerRef} className="hidden md:block">
        <div
          ref={innerRef}
          className="relative overflow-hidden"
          style={{ height: '100vh', background: 'hsl(220,15%,9%)' }}
        >
          {/* Section label */}
          <div className="absolute top-0 inset-x-0 z-20 pt-10 text-center pointer-events-none">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/70 mb-2">
              תהליך העבודה
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </h2>
          </div>

          {/* Cards — absolutely stacked */}
          {steps.map((step, i) => {
            const StepIcon = step.Icon;
            return (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center px-6"
                style={{ paddingTop: '9rem', paddingBottom: '5rem' }}
              >
                {/* Giant watermark */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                >
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: 'clamp(16rem, 38vw, 34rem)',
                      color: 'rgba(255,255,255,0.022)',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="relative w-full max-w-2xl rounded-3xl border border-border/40 backdrop-blur-md"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    boxShadow: '0 0 100px rgba(16,185,129,0.07), 0 40px 100px rgba(0,0,0,0.45)',
                  }}
                >
                  <div className="p-10 md:p-12">
                    {/* Icon + step */}
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                      >
                        <StepIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-primary/40 tracking-[0.25em] uppercase block mb-0.5">
                          שלב
                        </span>
                        <span className="font-mono text-2xl font-black text-primary/70">
                          {step.number}
                          <span className="text-muted-foreground/25 text-lg font-normal"> / 03</span>
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-bold text-foreground mb-5 leading-tight"
                      style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <p
                      className="font-mono text-sm text-primary/35 pt-5"
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
          <div className="absolute bottom-8 inset-x-0 flex justify-center items-center gap-3 z-20">
            {steps.map((_, i) => (
              <div
                key={i}
                ref={el => { dotsRef.current[i] = el; }}
                className="h-[3px] w-2 rounded-full origin-left"
                style={{ backgroundColor: 'hsl(220,15%,22%)' }}
              />
            ))}
          </div>

          {/* Subtle top separator */}
          <div className="absolute top-0 inset-x-0 h-px section-separator" />
        </div>
      </div>

      {/* ─── Mobile: stacked cards ───────────────────── */}
      <Section className="md:hidden bg-background-secondary">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">
              תהליך העבודה
            </p>
            <h2 className="text-4xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <div
                  key={i}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-7"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <StepIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-bold text-primary/50 tracking-widest">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-3">{step.title}</h3>
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

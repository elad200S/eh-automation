import { useEffect, useLayoutEffect, useRef } from 'react';
import { Search, Settings, Rocket, GitBranch, BarChart3 } from 'lucide-react';
import RevealText from '@/components/RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'הבנה של העסק',
    description: 'מיפוי תהליכים קיימים — איפה הולכים לאיבוד לידים ואיפה יש בזבוז זמן, לפני שנוגעים בקוד.',
    Icon: Search,
    number: '01',
  },
  {
    title: 'תכנון הפתרון',
    description: 'הגדרת מה בדיוק צריך לקרות — אילו מערכות מתחברות, מה הזרימה ומה המטרה הסופית.',
    Icon: GitBranch,
    number: '02',
  },
  {
    title: 'בניית האוטומציה',
    description: 'חיבור בין המערכות, הגדרת זרימות עבודה ובדיקות עד שהכל רץ חלק ונכון.',
    Icon: Settings,
    number: '03',
  },
  {
    title: 'הטמעה ובדיקות',
    description: 'עלייה לאוויר מבוקרת, בדיקות בזמן אמת ותיקונים מיידיים לפני הגדלת הנפח.',
    Icon: Rocket,
    number: '04',
  },
  {
    title: 'מעקב ושיפור מתמשך',
    description: 'לא נעלמים אחרי ה-deploy — מעקב ביצועים שוטף ושדרוגים לפי הצורך.',
    Icon: BarChart3,
    number: '05',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);

  // Set initial positions before first paint
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;
    gsap.set(cards[0], { y: '0%' });
    cards.slice(1).forEach(c => gsap.set(c, { y: '100%' }));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      cardRefs.current.filter(Boolean).forEach(c => c && gsap.set(c, { y: '0%', opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const dots  = dotRefs.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: '+=2400',
          scrub: 1.8,
        },
      });

      // card exits first, then new card enters — creates breathing room between transitions
      for (let i = 0; i < steps.length - 1; i++) {
        const start = 0.05 + i * 0.22;
        const enter = start + 0.09;
        tl.fromTo(cards[i],   { y: '0%'    }, { y: '-105%', ease: 'none', duration: 0.10 }, start)
          .fromTo(cards[i+1], { y: '105%' }, { y: '0%',    ease: 'none', duration: 0.12 }, enter)
          .to(dots[i],   { width: 8,  opacity: 0.25, ease: 'none', duration: 0.08 }, start)
          .to(dots[i+1], { width: 24, opacity: 1,    ease: 'none', duration: 0.08 }, enter);
      }

      tl.to({}, {}, 1.0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-14 bg-background-secondary">
      <div className="container">
        <div className="max-w-2xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </RevealText>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center items-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                ref={el => { dotRefs.current[i] = el; }}
                className="h-2 rounded-full transition-none"
                style={{ width: i === 0 ? 24 : 8, opacity: i === 0 ? 1 : 0.25, background: 'hsl(160,84%,39%)' }}
              />
            ))}
          </div>

          {/* Card stack */}
          <div className="relative" style={{ paddingBottom: 18 }}>
            {/* Stacked shadow cards — give a physical deck feeling */}
            <div className="absolute inset-x-0 top-0 rounded-2xl border border-border/15 pointer-events-none"
              style={{ background: 'hsl(var(--card))', height: '100%', transform: 'translateY(14px) scale(0.91)', zIndex: 1, opacity: 0.35 }} />
            <div className="absolute inset-x-0 top-0 rounded-2xl border border-border/25 pointer-events-none"
              style={{ background: 'hsl(var(--card))', height: '100%', transform: 'translateY(7px) scale(0.96)', zIndex: 2, opacity: 0.6 }} />

          {/* overflow:hidden clips slide-in/out */}
          <div
            className="relative overflow-hidden"
            style={{ minHeight: 'clamp(230px, 35vw, 280px)', zIndex: 10 }}
          >

            {steps.map((step, index) => {
              const StepIcon = step.Icon;
              return (
                <div
                  key={index}
                  ref={el => { cardRefs.current[index] = el; }}
                  className="absolute inset-0 rounded-2xl border border-border/60 p-6 md:p-8 overflow-hidden"
                  style={{
                    background: 'hsl(var(--card))',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)',
                    zIndex: 10,
                  }}
                >
                  {/* Watermark number */}
                  <div
                    className="absolute top-1 right-3 font-mono font-black leading-none pointer-events-none select-none"
                    style={{ fontSize: 80, color: 'rgba(16,185,129,0.07)', lineHeight: 1 }}
                  >
                    {step.number}
                  </div>
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, hsl(160,84%,39%,0.5), transparent)' }}
                  />

                  <div className="relative pt-2" dir="rtl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <StepIcon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-mono font-bold text-primary/50 tracking-widest">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

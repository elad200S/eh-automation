import { useEffect, useLayoutEffect, useRef } from 'react';
import { Search, Settings, Rocket } from 'lucide-react';
import RevealText from '@/components/RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'הבנה של העסק והתהליך הקיים',
    description: 'איפה הולכים לאיבוד לידים ואיפה יש בזבוז זמן — מיפוי מלא לפני שנוגעים בקוד.',
    Icon: Search,
    number: '01',
  },
  {
    title: 'בניית אוטומציה מותאמת',
    description: 'חיבור בין המערכות, הגדרת זרימות עבודה, ובדיקות עד שהכל רץ חלק.',
    Icon: Settings,
    number: '02',
  },
  {
    title: 'הטמעה ושיפור מתמשך',
    description: 'עלייה לאוויר, ליווי צמוד ושיפורים לפי הצורך — לא נעלמים אחרי ה-deploy.',
    Icon: Rocket,
    number: '03',
  },
];

const ProcessSection = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(cards, { opacity: 0, y: 44 });
    if (window.innerWidth >= 768 && lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cards    = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: pin — cards appear one by one (no connector line)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=1200',
            scrub: 1.0,
          },
        });
        tl.to(cards[0], { opacity: 1, y: 0, ease: 'none' }, 0.05)
          .to(cards[1], { opacity: 1, y: 0, ease: 'none' }, 0.38)
          .to(cards[2], { opacity: 1, y: 0, ease: 'none' }, 0.72);
        return;
      }

      // Desktop: pin — cards appear with connector line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: '+=1600',
          scrub: 1.2,
        },
      });

      tl.to(cards[0],       { opacity: 1, y: 0, ease: 'none' }, 0.05)
        .to(lineRef.current, { scaleX: 0.5,      ease: 'none' }, 0.28)
        .to(cards[1],       { opacity: 1, y: 0, ease: 'none' }, 0.38)
        .to(lineRef.current, { scaleX: 1,        ease: 'none' }, 0.63)
        .to(cards[2],       { opacity: 1, y: 0, ease: 'none' }, 0.72);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-14 md:py-24 bg-background-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </RevealText>
          </div>

          <div className="relative">
            {/* Connector track */}
            <div className="hidden md:block absolute top-[54px] right-[8%] left-[8%] h-px bg-border/25 pointer-events-none" />
            <div
              ref={lineRef}
              className="hidden md:block absolute top-[54px] right-[8%] left-[8%] h-px pointer-events-none"
              style={{
                background: 'linear-gradient(to left, hsl(160,84%,39%) 0%, hsl(168,70%,45%) 50%, rgba(16,185,129,0.3) 100%)',
                transformOrigin: 'right',
              }}
            />

            {/* Step dots */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="hidden md:block absolute top-[54px] pointer-events-none"
                style={{
                  right: `calc(8% + ${i * 33.33}%)`,
                  transform: 'translate(50%, -50%)',
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: 'hsl(160,84%,39%)',
                  boxShadow: '0 0 10px rgba(16,185,129,0.6)',
                }}
              />
            ))}

            <div className="grid md:grid-cols-3 gap-5 pt-6">
              {steps.map((step, index) => {
                const StepIcon = step.Icon;
                return (
                  <div
                    key={index}
                    ref={el => { cardRefs.current[index] = el; }}
                    className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-7 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-card/70"
                  >
                    <div
                      className="absolute top-1 right-3 font-mono font-black leading-none pointer-events-none select-none"
                      style={{ fontSize: 96, color: 'rgba(16,185,129,0.06)', lineHeight: 1 }}
                    >
                      {step.number}
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at top right, rgba(16,185,129,0.06), transparent 60%)' }}
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <StepIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-mono font-bold text-primary/50 tracking-widest">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-foreground mb-3 leading-snug">
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

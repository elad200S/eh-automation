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
  const sectionRef      = useRef<HTMLElement>(null);
  const lineRef         = useRef<HTMLDivElement>(null);
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const mobileCardRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const dotRefs         = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (window.innerWidth < 768) {
      const [c0, c1, c2] = mobileCardRefs.current;
      // c0 at front, c1 and c2 behind (scaled, invisible)
      if (c0) gsap.set(c0, { opacity: 1, scale: 1,    zIndex: 30 });
      if (c1) gsap.set(c1, { opacity: 0, scale: 0.93, zIndex: 20 });
      if (c2) gsap.set(c2, { opacity: 0, scale: 0.93, zIndex: 10 });
    } else {
      const cards = desktopCardRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(cards, { opacity: 0, y: 44 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (reduced) {
      const all = [...desktopCardRefs.current, ...mobileCardRefs.current].filter(Boolean) as HTMLDivElement[];
      gsap.set(all, { opacity: 1, y: 0 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (isMobile) {
        const [c0, c1, c2] = mobileCardRefs.current;
        const [d0, d1, d2] = dotRefs.current;

        // Anchor at 1s so fractions map cleanly to scroll %
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

        // ── transition 1: c0 sinks back, c1 rises to front ──
        // c0 shrinks/fades out (goes "behind")
        tl.to(c0, { scale: 0.82, opacity: 0, ease: 'none', duration: 0.09 }, 0.20)
          .to(d0, { width: 8, opacity: 0.25, ease: 'none', duration: 0.09 }, 0.20)
        // z-index crossover: c1 claims the front
          .to(c0, { zIndex: 5,  duration: 0.001, ease: 'none' }, 0.265)
          .to(c1, { zIndex: 35, duration: 0.001, ease: 'none' }, 0.265)
        // c1 grows to front
          .to(c1, { scale: 1, opacity: 1, ease: 'none', duration: 0.09 }, 0.29)
          .to(d1, { width: 24, opacity: 1, ease: 'none', duration: 0.09 }, 0.29)

        // ── transition 2: c1 sinks back, c2 rises to front ──
          .to(c1, { scale: 0.82, opacity: 0, ease: 'none', duration: 0.09 }, 0.55)
          .to(d1, { width: 8, opacity: 0.25, ease: 'none', duration: 0.09 }, 0.55)
          .to(c1, { zIndex: 5,  duration: 0.001, ease: 'none' }, 0.605)
          .to(c2, { zIndex: 35, duration: 0.001, ease: 'none' }, 0.605)
          .to(c2, { scale: 1, opacity: 1, ease: 'none', duration: 0.09 }, 0.62)
          .to(d2, { width: 24, opacity: 1, ease: 'none', duration: 0.09 }, 0.62)
        // pad timeline to 1 full second
          .to({}, {}, 1.0);

        return;
      }

      // Desktop: pin + connector line
      const [c0, c1, c2] = desktopCardRefs.current;

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

      tl.to(c0,            { opacity: 1, y: 0, ease: 'none' }, 0.05)
        .to(lineRef.current, { scaleX: 0.5,     ease: 'none' }, 0.28)
        .to(c1,            { opacity: 1, y: 0, ease: 'none' }, 0.38)
        .to(lineRef.current, { scaleX: 1,       ease: 'none' }, 0.63)
        .to(c2,            { opacity: 1, y: 0, ease: 'none' }, 0.72);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-14 md:py-24 bg-background-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </RevealText>
          </div>

          {/* ── Mobile layout ───────────────────────────────────── */}
          <div className="md:hidden">
            {/* Step dots */}
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

            {/* Card stack — pages visual */}
            <div className="relative" style={{ minHeight: 224 }}>

              {/* Ghost page 2 — furthest back */}
              <div
                className="absolute rounded-2xl border border-border/20 bg-card/25 pointer-events-none"
                style={{ inset: 0, transform: 'translateY(10px) scale(0.94)', zIndex: 1 }}
              />
              {/* Ghost page 1 — middle */}
              <div
                className="absolute rounded-2xl border border-border/35 bg-card/40 pointer-events-none"
                style={{ inset: 0, transform: 'translateY(5px) scale(0.97)', zIndex: 2 }}
              />

              {/* Real cards */}
              {steps.map((step, index) => {
                const StepIcon = step.Icon;
                return (
                  <div
                    key={index}
                    ref={el => { mobileCardRefs.current[index] = el; }}
                    className="absolute inset-0 rounded-2xl border border-border/60 p-6 overflow-hidden"
                    style={{
                      background: 'hsl(var(--card))',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)',
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
                    <div className="relative pt-2">
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

          {/* ── Desktop layout ──────────────────────────────────── */}
          <div className="relative hidden md:block">
            {/* Connector track */}
            <div className="absolute top-[54px] right-[8%] left-[8%] h-px bg-border/25 pointer-events-none" />
            <div
              ref={lineRef}
              className="absolute top-[54px] right-[8%] left-[8%] h-px pointer-events-none"
              style={{
                background: 'linear-gradient(to left, hsl(160,84%,39%) 0%, hsl(168,70%,45%) 50%, rgba(16,185,129,0.3) 100%)',
                transformOrigin: 'right',
              }}
            />
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute top-[54px] pointer-events-none"
                style={{
                  right: `calc(8% + ${i * 33.33}%)`,
                  transform: 'translate(50%, -50%)',
                  width: 8, height: 8, borderRadius: '50%',
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
                    ref={el => { desktopCardRefs.current[index] = el; }}
                    className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-7 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-card/70"
                  >
                    <div
                      className="absolute top-1 right-3 font-mono font-black leading-none pointer-events-none select-none"
                      style={{ fontSize: 96, color: 'rgba(16,185,129,0.06)', lineHeight: 1 }}
                    />
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

import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import { Search, Settings, Rocket } from 'lucide-react';
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal';
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
  const { ref: titleRef, style: titleStyle } = useScrollReveal<HTMLHeadingElement>(0);
  const { ref: gridRef, itemStyle } = useScrollRevealGroup(150);
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section id="process" className="bg-background-secondary">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div ref={titleRef} style={titleStyle} className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            איך אנחנו עובדים יחד
          </h2>
        </div>

        {/* Grid + connector line wrapper */}
        <div className="relative">

          {/* Connector track — desktop only, RTL (grows right → left) */}
          <div className="hidden md:block absolute top-[54px] right-[8%] left-[8%] h-px bg-border/25 pointer-events-none" />
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[54px] right-[8%] left-[8%] h-px pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(160,84%,39%) 0%, hsl(168,70%,45%) 50%, hsl(160,84%,39%,0.3) 100%)',
              transformOrigin: 'right',
              transform: 'scaleX(0)',
            }}
          />

          {/* Step dot markers */}
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

          <div ref={gridRef} className="grid md:grid-cols-3 gap-5 pt-6">
            {steps.map((step, index) => {
              const StepIcon = step.Icon;
              return (
                <div
                  key={index}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/60 p-7 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-card/70"
                  style={itemStyle(index)}
                >
                  {/* Watermark step number */}
                  <div
                    className="absolute top-1 right-3 font-mono font-black leading-none pointer-events-none select-none"
                    style={{ fontSize: 96, color: 'hsl(160,84%,39%,0.06)', lineHeight: 1 }}
                  >
                    {step.number}
                  </div>

                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at top right, hsl(160,84%,39%,0.06), transparent 60%)' }}
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
    </Section>
  );
};

export default ProcessSection;

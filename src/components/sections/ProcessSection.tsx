import { useEffect, useRef } from 'react';
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card!, {
          y: 48,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card!,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: i % 2 === 0 ? 0 : 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">תהליך העבודה</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              איך אנחנו עובדים יחד
            </RevealText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.Icon;
              const isLast = index === steps.length - 1;
              return (
                <div
                  key={index}
                  ref={el => { cardRefs.current[index] = el; }}
                  className={`relative rounded-2xl border border-border/60 p-6 overflow-hidden${isLast ? ' sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full' : ''}`}
                  style={{
                    background: 'hsl(var(--card))',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)',
                  }}
                  dir="rtl"
                >
                  {/* Watermark number */}
                  <div
                    className="absolute top-1 left-3 font-mono font-black pointer-events-none select-none"
                    style={{ fontSize: 72, color: 'rgba(16,185,129,0.06)', lineHeight: 1 }}
                  >
                    {step.number}
                  </div>

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, hsl(160,84%,39%,0.45), transparent)' }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
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
    </section>
  );
};

export default ProcessSection;

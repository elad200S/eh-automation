import { useEffect, useRef, useState, useCallback } from 'react';
import Section from '@/components/Section';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const problems = [
  'לידים נכנסים ממקומות שונים',
  'אין מעקב ברור',
  'דברים נופלים בין הכיסאות',
  'יותר מדי עבודה ידנית',
  'לקוחות לא מקבלים מענה בזמן',
  'פולו-אפ שנשכח',
  'מידע מפוזר בין WhatsApp, מייל ואקסל',
];

const ITEM_DELAY    = 480;  // ms between each item appearing
const RESULT_DELAY  = problems.length * ITEM_DELAY + 700;
const PAUSE_RESULT  = 2800;
const TOTAL_CYCLE   = RESULT_DELAY + PAUSE_RESULT;

// float durations & delays per item — different phases = "chaos" feel
const FLOAT_PARAMS = [
  { dur: 2.8, delay: 0.0 },
  { dur: 3.4, delay: 0.6 },
  { dur: 2.5, delay: 1.2 },
  { dur: 3.1, delay: 0.3 },
  { dur: 2.9, delay: 0.9 },
  { dur: 3.6, delay: 0.5 },
  { dur: 2.7, delay: 1.5 },
];

const ProblemSection = () => {
  const [visibleCount, setVisibleCount]   = useState(0);
  const [showResult,   setShowResult]     = useState(false);
  const [dimItems,     setDimItems]       = useState(false);
  const sectionRef  = useRef<HTMLDivElement>(null);
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inViewRef   = useRef(false);

  const startAnimation = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleCount(0);
    setShowResult(false);
    setDimItems(false);

    problems.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), (i + 1) * ITEM_DELAY);
      timersRef.current.push(t);
    });

    // dim items just before result appears
    const dimT = setTimeout(() => setDimItems(true),  RESULT_DELAY - 200);
    const resT = setTimeout(() => setShowResult(true), RESULT_DELAY);
    timersRef.current.push(dimT, resT);

    const loopT = setTimeout(() => {
      if (inViewRef.current) startAnimation();
    }, TOTAL_CYCLE);
    timersRef.current.push(loopT);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          timersRef.current.forEach(clearTimeout);
          timersRef.current = [];
          setVisibleCount(0);
          setShowResult(false);
          setDimItems(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, [startAnimation]);

  return (
    <Section id="problem">
      <div ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          מרגיש שהעסק עובד אבל לא באמת מסודר?
        </h2>

        {/* ── Card ── */}
        <div className="relative bg-card rounded-2xl border border-border overflow-hidden" style={{ minHeight: 320 }}>

          {/* Problem items */}
          <div className="p-8 space-y-3 text-right">
            {problems.map((text, i) => {
              const fp = FLOAT_PARAMS[i];
              const visible = visibleCount > i;
              return (
                <p
                  key={i}
                  className={cn(
                    'text-foreground/85 leading-relaxed transition-all duration-500',
                    visible  ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
                    dimItems && visible && 'opacity-20'
                  )}
                  style={{
                    transitionDelay: visible ? '0ms' : undefined,
                    animation: visible && !dimItems
                      ? `prob-float ${fp.dur}s ease-in-out ${fp.delay}s infinite`
                      : undefined,
                  }}
                >
                  {text}
                </p>
              );
            })}
          </div>

          {/* Result overlay — slams in after items */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center',
              'bg-card/92 backdrop-blur-sm rounded-2xl',
              'transition-opacity duration-300',
              showResult ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
          >
            <div className={cn(showResult && 'result-slam')}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertTriangle className="w-7 h-7 text-orange-400" />
                <span className="text-sm font-medium text-orange-400/80 uppercase tracking-widest">התוצאה</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-relaxed px-6" dir="rtl">
                <span className="text-orange-400">בזבוז זמן</span>
                <span className="text-foreground/30 mx-3">·</span>
                <span className="text-red-400">איבוד כסף</span>
                <span className="text-foreground/30 mx-3">·</span>
                <span className="text-orange-300">חוסר שליטה</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes prob-float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-5px); }
        }

        @keyframes result-slam {
          0%   { transform: translateY(-40px) scale(0.75); opacity: 0; }
          55%  { transform: translateY(6px)   scale(1.03); opacity: 1; }
          75%  { transform: translateY(-3px)  scale(0.99); }
          100% { transform: translateY(0)     scale(1);    opacity: 1; }
        }
        .result-slam {
          animation: result-slam 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </Section>
  );
};

export default ProblemSection;

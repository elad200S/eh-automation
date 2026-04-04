import { useEffect, useRef, useState, useCallback } from 'react';
import Section from '@/components/Section';
import { AlertTriangle, Zap, CheckCircle } from 'lucide-react';
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

const ITEM_DELAY     = 480;
const RESULT_DELAY   = problems.length * ITEM_DELAY + 700;
const PAUSE_RESULT   = 2200;  // how long warning shows
const SOLUTION_DELAY = RESULT_DELAY + PAUSE_RESULT;
const PAUSE_SOLUTION = 2800;  // how long solution shows
const TOTAL_CYCLE    = SOLUTION_DELAY + PAUSE_SOLUTION;

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
  const [visibleCount, setVisibleCount] = useState(0);
  const [showResult,   setShowResult]   = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [dimItems,     setDimItems]     = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inViewRef  = useRef(false);

  const startAnimation = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleCount(0);
    setShowResult(false);
    setShowSolution(false);
    setDimItems(false);

    problems.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), (i + 1) * ITEM_DELAY);
      timersRef.current.push(t);
    });

    const dimT = setTimeout(() => setDimItems(true),       RESULT_DELAY - 200);
    const resT = setTimeout(() => setShowResult(true),     RESULT_DELAY);
    const solT = setTimeout(() => {
      setShowResult(false);
      setTimeout(() => setShowSolution(true), 150);
    }, SOLUTION_DELAY);

    timersRef.current.push(dimT, resT, solT);

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
          setShowSolution(false);
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

        <div className="relative bg-card rounded-2xl border border-border overflow-hidden" style={{ minHeight: 320 }}>

          {/* ── Problem items ── */}
          <div className="p-8 space-y-3 text-right">
            {problems.map((text, i) => {
              const fp = FLOAT_PARAMS[i];
              const visible = visibleCount > i;
              return (
                <p
                  key={i}
                  className={cn(
                    'text-foreground/85 leading-relaxed transition-all duration-500',
                    visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
                    dimItems && visible && 'opacity-20'
                  )}
                  style={{
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

          {/* ── Warning overlay ── */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center',
              'bg-card/92 backdrop-blur-sm rounded-2xl transition-opacity duration-300',
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

          {/* ── Solution overlay ── */}
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center rounded-2xl transition-opacity duration-300',
              'bg-gradient-to-br from-primary-light/60 via-card to-card',
              showSolution ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
          >
            {/* subtle glow ring */}
            <div className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none" />

            <div className={cn(showSolution && 'solution-rise')}>
              {/* label */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-primary/80 uppercase tracking-widest">הפתרון</span>
              </div>

              {/* brand */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-primary" fill="currentColor" />
                <span className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                  EH Automation
                </span>
              </div>

              {/* tagline */}
              <p className="text-foreground/60 text-sm md:text-base mb-6">
                הכל אוטומטי. הכל מסודר. הכל תחת שליטה.
              </p>

              {/* 3 checks */}
              <div className="flex flex-col items-center gap-2" dir="rtl">
                {[
                  'כל ליד מטופל אוטומטית',
                  'מעקב מלא ב-CRM',
                  'הסוכן מקבל התראה מיידית',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/75">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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

        @keyframes solution-rise {
          0%   { transform: translateY(40px) scale(0.85); opacity: 0; }
          60%  { transform: translateY(-4px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        .solution-rise {
          animation: solution-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </Section>
  );
};

export default ProblemSection;

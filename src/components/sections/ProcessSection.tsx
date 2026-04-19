import Section from '@/components/Section';
import { Search, Settings, Rocket } from 'lucide-react';
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal';

/* ─── Animation 1: Checklist ─────────────────────────────── */
const ChecklistAnimation = () => (
  <div className="mt-5 space-y-2">
    {['מיפוי תהליכים קיימים', 'איתור נקודות כשל', 'הגדרת יעדים'].map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-2 text-xs text-muted-foreground"
        style={{ animation: `fadeSlide 3s ease-in-out ${i * 0.6}s infinite` }}
      >
        <div
          className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
          style={{
            background: 'hsl(210 100% 58% / 0.15)',
            animation: `checkPop 3s ease-in-out ${i * 0.6}s infinite`,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="hsl(210 100% 58%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span>{item}</span>
      </div>
    ))}
  </div>
);

/* ─── Animation 2: Flow dots ─────────────────────────────── */
const FlowAnimation = () => (
  <div className="mt-5 flex items-center justify-center gap-1">
    {/* Node 1 */}
    <div className="w-10 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-primary" />
    </div>

    {/* Arrow 1 */}
    <div className="relative w-8 h-1 flex items-center">
      <div className="w-full h-px bg-border" />
      <div
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{ animation: 'travelDot 2s ease-in-out infinite' }}
      />
    </div>

    {/* Node 2 */}
    <div className="w-10 h-8 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-secondary" />
    </div>

    {/* Arrow 2 */}
    <div className="relative w-8 h-1 flex items-center">
      <div className="w-full h-px bg-border" />
      <div
        className="absolute w-2 h-2 rounded-full bg-secondary"
        style={{ animation: 'travelDot 2s ease-in-out 0.6s infinite' }}
      />
    </div>

    {/* Node 3 */}
    <div className="w-10 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-accent" />
    </div>
  </div>
);

/* ─── Animation 3: Bar chart ─────────────────────────────── */
const BarChartAnimation = () => (
  <div className="mt-5 flex items-end justify-center gap-3 h-12">
    {[
      { height: '40%', color: 'hsl(210 100% 58%)', delay: '0s' },
      { height: '75%', color: 'hsl(185 70% 52%)', delay: '0.3s' },
      { height: '60%', color: 'hsl(160 60% 48%)', delay: '0.6s' },
    ].map((bar, i) => (
      <div
        key={i}
        className="w-8 rounded-t-md"
        style={{
          height: bar.height,
          background: bar.color,
          opacity: 0.8,
          animation: `barGrow 2.5s ease-in-out ${bar.delay} infinite`,
          transformOrigin: 'bottom',
        }}
      />
    ))}
  </div>
);

/* ─── Steps data ─────────────────────────────────────────── */
const steps = [
  {
    title: 'הבנה של העסק והתהליך הקיים',
    description: 'איפה הולכים לאיבוד לידים ואיפה יש בזבוז זמן',
    Icon: Search,
    number: '01',
    Animation: ChecklistAnimation,
  },
  {
    title: 'בניית אוטומציה מותאמת',
    description: 'חיבור בין המערכות והגדרת זרימות עבודה',
    Icon: Settings,
    number: '02',
    Animation: FlowAnimation,
  },
  {
    title: 'הטמעה ושיפור',
    description: 'בדיקות, התאמות ושיפור מתמשך לפי הצורך',
    Icon: Rocket,
    number: '03',
    Animation: BarChartAnimation,
  },
];

const ProcessSection = () => {
  const { ref: titleRef, style: titleStyle } = useScrollReveal<HTMLHeadingElement>(0);
  const { ref: gridRef, itemStyle } = useScrollRevealGroup(150);

  return (
    <Section id="process">
      <style>{`
        @keyframes fadeSlide {
          0%, 10%   { opacity: 0; transform: translateX(6px); }
          25%, 70%  { opacity: 1; transform: translateX(0); }
          85%, 100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes checkPop {
          0%, 10%  { transform: scale(0.6); }
          25%, 70% { transform: scale(1); }
          100%     { transform: scale(1); }
        }
        @keyframes travelDot {
          0%   { left: 0; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% - 8px); opacity: 0; }
        }
        @keyframes barGrow {
          0%, 10%  { transform: scaleY(0); }
          40%, 70% { transform: scaleY(1); }
          90%, 100%{ transform: scaleY(0.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-anim * { animation: none !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <h2 ref={titleRef} style={titleStyle} className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">
          איך אנחנו עובדים יחד
        </h2>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const StepIcon = step.Icon;
            return (
              <div key={index} className="relative" style={itemStyle(index)}>
                <div className="bg-card rounded-xl p-6 border border-border h-full text-center flex flex-col">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 bg-secondary/10">
                    <StepIcon className="w-7 h-7 text-secondary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2 block">{step.number}</span>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Animation widget */}
                  <div className="process-anim mt-auto pt-4 border-t border-border/50">
                    <step.Animation />
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-3 -translate-y-1/2 -translate-x-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-border rotate-180">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;

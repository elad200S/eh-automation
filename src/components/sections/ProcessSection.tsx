import Section from '@/components/Section';
import { Search, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'הבנה של העסק והתהליך הקיים',
    description: 'איפה הולכים לאיבוד לידים ואיפה יש בזבוז זמן',
    Icon: Search,
    number: '01',
  },
  {
    title: 'בניית אוטומציה מותאמת',
    description: 'חיבור בין המערכות והגדרת זרימות עבודה',
    Icon: Settings,
    number: '02',
  },
  {
    title: 'הטמעה ושיפור',
    description: 'בדיקות, התאמות ושיפור מתמשך לפי הצורך',
    Icon: Rocket,
    number: '03',
  },
];

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">
          איך אנחנו עובדים יחד
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const StepIcon = step.Icon;
            return (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 border border-border h-full text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 bg-secondary/10">
                    <StepIcon className="w-7 h-7 text-secondary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2 block">{step.number}</span>
                  <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-3 -translate-y-1/2 -translate-x-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-border rotate-180">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
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

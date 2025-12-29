import Section from '@/components/Section';
import { AlertTriangle } from 'lucide-react';

const problems = [
  'תהליכים קריטיים תלויים באנשים',
  'עבודה ידנית יוצרת טעויות וחוסר עקביות',
  'העסק לא יכול לגדול בלי להוסיף עומס תפעולי',
  'בעל העסק הופך לצוואר בקבוק',
];

const ProblemSection = () => {
  return (
    <Section id="problem">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 02
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          איפה עסקים נתקעים
        </h2>
        
        <div className="space-y-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-background-secondary rounded-lg border border-border-subtle hover:border-border transition-colors"
            >
              <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-lg text-foreground">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;

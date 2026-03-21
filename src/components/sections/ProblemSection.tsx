import Section from '@/components/Section';
import { AlertCircle } from 'lucide-react';

const problems = [
  'לידים נכנסים אבל אין מעקב מסודר',
  'חלק מהפניות מתפספסות',
  'הרבה עבודה ידנית שחוזרת על עצמה',
  'קושי לראות תמונה מלאה של הלקוחות',
];

const ProblemSection = () => {
  return (
    <Section id="problem">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
          מרגיש שהתהליכים בעסק יכולים לעבוד טוב יותר?
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 text-right">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-5 bg-card rounded-xl border border-border"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-foreground leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;

import Section from '@/components/Section';
import { HelpCircle } from 'lucide-react';

const questions = [
  'איזה סוג עסק יש לך?',
  'איפה קיימת היום תלות בעובדים?',
  'איזה תהליך הכי מבזבז זמן?',
  'אילו מערכות כבר קיימות בעסק?',
];

const QualificationSection = () => {
  return (
    <Section id="qualification">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 09
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          לפני שמדברים – נבדוק התאמה
        </h2>
        
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 bg-background-secondary rounded-lg border border-border-subtle"
            >
              <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground">{question}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default QualificationSection;

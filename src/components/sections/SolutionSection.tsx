import Section from '@/components/Section';
import { Workflow, Link, Zap, Shield } from 'lucide-react';

const concepts = [
  { icon: Workflow, label: 'אוטומציות' },
  { icon: Link, label: 'חיבור מערכות' },
  { icon: Zap, label: 'זרימת מידע אוטומטית' },
  { icon: Shield, label: 'שליטה ובקרה' },
];

const SolutionSection = () => {
  return (
    <Section id="solution">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 03
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          מה מחליף עובדים? תהליך בנוי נכון
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          אוטומציה עסקית מאפשרת חיבור בין מערכות, ייעול תהליכים,
          והעברת מידע אוטומטית בין כלים דיגיטליים –
          ללא התערבות אנושית וללא נקודות כשל מיותרות.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="p-6 bg-background-secondary rounded-lg border border-border-subtle text-center hover:border-primary/50 transition-colors"
            >
              <concept.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-sm font-medium text-foreground">{concept.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionSection;

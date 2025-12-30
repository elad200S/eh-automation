import Section from '@/components/Section';
import { Workflow, Link, Zap, Shield } from 'lucide-react';

const concepts = [
  { icon: Workflow, label: 'אוטומציות', color: 'primary' },
  { icon: Link, label: 'חיבור מערכות', color: 'secondary' },
  { icon: Zap, label: 'זרימת מידע אוטומטית', color: 'accent' },
  { icon: Shield, label: 'שליטה ובקרה', color: 'primary' },
];

const SolutionSection = () => {
  return (
    <Section id="solution">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          מה מחליף עובדים? תהליך בנוי נכון
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          אוטומציה עסקית מאפשרת חיבור בין מערכות, ייעול תהליכים,
          והעברת מידע אוטומטית בין כלים דיגיטליים –
          ללא התערבות אנושית וללא נקודות כשל מיותרות.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl border border-border text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${concept.color}/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <concept.icon className={`w-7 h-7 text-${concept.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">{concept.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionSection;
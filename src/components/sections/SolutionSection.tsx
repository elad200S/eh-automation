import Section from '@/components/Section';
import { Settings, Link2, ArrowRightLeft, ShieldCheck } from 'lucide-react';

const concepts = [
  { Icon: Settings, label: 'אוטומציות', variant: 'primary' as const },
  { Icon: Link2, label: 'חיבור מערכות', variant: 'white' as const },
  { Icon: ArrowRightLeft, label: 'זרימת מידע אוטומטית', variant: 'primary' as const },
  { Icon: ShieldCheck, label: 'שליטה ובקרה', variant: 'white' as const },
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
              className={`p-6 rounded-xl border text-center hover:shadow-lg transition-all duration-300 group ${
                concept.variant === 'primary' 
                  ? 'bg-primary border-primary hover:border-primary/80' 
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                concept.variant === 'primary' ? 'bg-primary-foreground/10' : 'bg-muted'
              }`}>
                <concept.Icon className={`w-7 h-7 ${
                  concept.variant === 'primary' ? 'text-primary-foreground' : 'text-primary'
                }`} />
              </div>
              <span className={`text-sm font-medium ${
                concept.variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
              }`}>{concept.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionSection;
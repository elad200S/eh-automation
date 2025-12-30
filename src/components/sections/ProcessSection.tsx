import Section from '@/components/Section';
import { FileSearch, GitBranch, Link2, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'איפיון',
    description: 'הבנת תהליכים וצרכים',
    Icon: FileSearch,
  },
  {
    title: 'תכנון תהליך',
    description: 'מיפוי ובחירת כלים',
    Icon: GitBranch,
  },
  {
    title: 'חיבור מערכות',
    description: 'בניית אינטגרציות',
    Icon: Link2,
  },
  {
    title: 'בדיקות',
    description: 'וידוא תקינות',
    Icon: TestTube,
  },
  {
    title: 'הטמעה',
    description: 'עלייה לאוויר והדרכה',
    Icon: Rocket,
  },
];

const StepCard = ({ step, isHighlighted = false }: { step: typeof steps[0]; isHighlighted?: boolean }) => {
  const StepIcon = step.Icon;
  return (
    <div className={`bg-background rounded-xl p-5 shadow-lg border border-border/20 ${isHighlighted ? 'ring-2 ring-secondary/50' : ''}`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${isHighlighted ? 'bg-secondary/20' : 'bg-muted'}`}>
          <StepIcon className={`w-6 h-6 ${isHighlighted ? 'text-secondary' : 'text-foreground/80'}`} />
        </div>
        <h3 className="text-base font-medium text-foreground mb-1">{step.title}</h3>
        <p className="text-xs text-muted-foreground">{step.description}</p>
      </div>
    </div>
  );
};

const ArrowRight = () => (
  <svg className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">
          איך זה עובד
        </h2>
        
        {/* Dark background container */}
        <div className="bg-foreground rounded-2xl p-6 md:p-10">
          
          {/* Desktop: Zig-zag flow diagram */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-3 gap-6">
              {/* Row 1: First 3 steps */}
              <StepCard step={steps[0]} />
              
              <div className="relative">
                <StepCard step={steps[1]} />
                <ArrowRight />
              </div>
              
              <div className="relative">
                <StepCard step={steps[2]} />
                <ArrowRight />
              </div>
            </div>
            
            {/* Curved arrow down */}
            <div className="flex justify-end pr-16 py-4">
              <svg className="w-10 h-10 text-secondary" viewBox="0 0 40 40" fill="none">
                <path d="M5 5 Q35 5, 35 35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" fill="none"/>
                <path d="M30 30 L35 38 L40 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Row 2: Last 2 steps (right-aligned for zig-zag) */}
            <div className="grid grid-cols-3 gap-6">
              <div></div>
              
              <div className="relative">
                <StepCard step={steps[3]} />
              </div>
              
              <div className="relative">
                <StepCard step={steps[4]} isHighlighted />
                <ArrowRight />
              </div>
            </div>
          </div>
          
          {/* Mobile: Vertical flow */}
          <div className="md:hidden space-y-3">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const StepIcon = step.Icon;
              
              return (
                <div key={index} className="relative">
                  <div className={`bg-background rounded-xl p-4 shadow-lg ${isLast ? 'ring-2 ring-secondary/50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isLast ? 'bg-secondary/20' : 'bg-muted'}`}>
                        <StepIcon className={`w-5 h-5 ${isLast ? 'text-secondary' : 'text-foreground/80'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {!isLast && (
                    <div className="flex justify-center py-2">
                      <svg width="20" height="24" viewBox="0 0 20 24" className="text-secondary">
                        <line x1="10" y1="0" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
                        <polygon points="5,16 10,22 15,16" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;
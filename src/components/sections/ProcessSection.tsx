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

const StepCard = ({ step }: { step: typeof steps[0] }) => {
  const StepIcon = step.Icon;
  return (
    <div className="bg-background rounded-xl p-5 shadow-lg border border-border/20 h-full">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-secondary/20">
          <StepIcon className="w-6 h-6 text-secondary" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-1">{step.title}</h3>
        <p className="text-xs text-muted-foreground">{step.description}</p>
      </div>
    </div>
  );
};

// Curved arrow pointing right then down
const CurvedArrowRightDown = () => (
  <svg className="w-12 h-16 text-secondary" viewBox="0 0 48 64" fill="none">
    <path 
      d="M4 8 C 24 8, 40 16, 40 40" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeDasharray="4 3" 
      fill="none"
    />
    <path 
      d="M35 35 L40 45 L45 35" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Curved arrow pointing left
const CurvedArrowLeft = () => (
  <svg className="w-16 h-8 text-secondary" viewBox="0 0 64 32" fill="none">
    <path 
      d="M56 8 C 40 8, 24 16, 8 16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeDasharray="4 3" 
      fill="none"
    />
    <path 
      d="M14 10 L6 16 L14 22" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Curved horizontal arrow
const CurvedArrowHorizontal = () => (
  <svg className="w-12 h-8 text-secondary" viewBox="0 0 48 32" fill="none">
    <path 
      d="M4 16 C 16 8, 32 24, 44 16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeDasharray="4 3" 
      fill="none"
    />
    <path 
      d="M38 10 L46 16 L38 22" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
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
          <div className="hidden md:block">
            {/* Row 1: First 3 steps RTL order */}
            <div className="grid grid-cols-5 items-center gap-2">
              <StepCard step={steps[0]} />
              
              <div className="flex justify-center">
                <CurvedArrowHorizontal />
              </div>
              
              <StepCard step={steps[1]} />
              
              <div className="flex justify-center">
                <CurvedArrowHorizontal />
              </div>
              
              <StepCard step={steps[2]} />
            </div>
            
            {/* Transition arrow from System Integration down to Testing */}
            <div className="flex justify-end pl-[calc(10%)] py-3">
              <CurvedArrowRightDown />
            </div>
            
            {/* Row 2: Testing and Deployment - Testing below System Integration, Deployment to its right */}
            <div className="grid grid-cols-5 items-center gap-2">
              <div></div>
              
              <StepCard step={steps[4]} />
              
              <div className="flex justify-center">
                <CurvedArrowHorizontal />
              </div>
              
              <StepCard step={steps[3]} />
              
              <div></div>
            </div>
          </div>
          
          {/* Mobile: Vertical flow */}
          <div className="md:hidden space-y-3">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const StepIcon = step.Icon;
              
              return (
                <div key={index} className="relative">
                  <div className="bg-background rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-secondary/20">
                        <StepIcon className="w-5 h-5 text-secondary" />
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
                        <path d="M10 2 C 6 8, 14 14, 10 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" fill="none" />
                        <polygon points="5,18 10,24 15,18" fill="currentColor" />
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
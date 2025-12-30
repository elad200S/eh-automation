import Section from '@/components/Section';
import { FileSearch, GitBranch, Link2, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'איפיון',
    description: 'שיחה ראשונית להבנת התהליכים הקיימים והצרכים',
    Icon: FileSearch,
  },
  {
    title: 'תכנון תהליך',
    description: 'מיפוי הזרימה, בחירת כלים והגדרת לוגיקה',
    Icon: GitBranch,
  },
  {
    title: 'חיבור מערכות',
    description: 'בניית האינטגרציות והאוטומציות בפועל',
    Icon: Link2,
  },
  {
    title: 'בדיקות',
    description: 'וידוא שהכל עובד כמצופה לפני עלייה לאוויר',
    Icon: TestTube,
  },
  {
    title: 'הטמעה',
    description: 'העלאה לפעולה והדרכה לשימוש שוטף',
    Icon: Rocket,
  },
];

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">
          איך זה עובד
        </h2>
        
        {/* Desktop: Zig-zag flow diagram */}
        <div className="hidden md:block relative">
          {/* Flow container */}
          <div className="relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === steps.length - 1;
              
              return (
                <div key={index} className="relative">
                  {/* Step row */}
                  <div className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} mb-4`}>
                    {/* Card */}
                    <div 
                      className={`relative bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 w-[320px] ${
                        isEven ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                          <step.Icon className="w-6 h-6 text-foreground/80" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow connector */}
                  {!isLast && (
                    <div className="flex justify-center mb-4">
                      <svg 
                        width="200" 
                        height="60" 
                        viewBox="0 0 200 60" 
                        className={`text-secondary ${isEven ? '' : 'scale-x-[-1]'}`}
                      >
                        {/* Curved arrow path */}
                        <path
                          d={isEven 
                            ? "M 40 5 Q 100 5, 100 30 Q 100 55, 160 55"
                            : "M 160 5 Q 100 5, 100 30 Q 100 55, 40 55"
                          }
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="opacity-50"
                        />
                        {/* Arrow head */}
                        <polygon
                          points={isEven 
                            ? "155,50 165,55 155,60"
                            : "45,50 35,55 45,60"
                          }
                          fill="currentColor"
                          className="opacity-50"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile: Vertical flow */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                {/* Card */}
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <step.Icon className="w-6 h-6 text-foreground/80" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                        <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Vertical arrow connector */}
                {!isLast && (
                  <div className="flex justify-center py-2">
                    <svg width="24" height="32" viewBox="0 0 24 32" className="text-secondary">
                      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="opacity-50" />
                      <polygon points="6,22 12,30 18,22" fill="currentColor" className="opacity-50" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-secondary/50"
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;
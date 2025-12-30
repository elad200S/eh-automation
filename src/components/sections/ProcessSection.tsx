import Section from '@/components/Section';
import { FileSearch, GitBranch, Link2, TestTube, Rocket, ArrowLeft, ArrowDown } from 'lucide-react';

const steps = [
  { 
    title: 'איפיון', 
    description: 'הבנת התהליכים הקיימים והצרכים העסקיים',
    Icon: FileSearch
  },
  { 
    title: 'תכנון תהליך', 
    description: 'מיפוי זרימות העבודה והגדרת אוטומציות',
    Icon: GitBranch
  },
  { 
    title: 'חיבור מערכות', 
    description: 'אינטגרציה בין הכלים הקיימים והחדשים',
    Icon: Link2
  },
  { 
    title: 'בדיקות', 
    description: 'וידוא פעולה תקינה בתנאי אמת',
    Icon: TestTube
  },
  { 
    title: 'הטמעה', 
    description: 'הרצה חיה ותמיכה בשלב ההסתגלות',
    Icon: Rocket
  },
];

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          איך זה עובד
        </h2>
        
        {/* Desktop: Zig-zag flow */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Row 1: Steps 1, 2, 3 */}
            <div className="flex items-start justify-between gap-4 mb-4">
              {steps.slice(0, 3).map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="bg-card rounded-xl border border-border p-5 flex-1 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <step.Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="flex-shrink-0 px-3">
                      <ArrowLeft className="w-6 h-6 text-primary/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Connecting arrow down-left */}
            <div className="flex justify-start pr-[33%] mb-4">
              <div className="flex items-center gap-2 text-secondary/60">
                <ArrowDown className="w-6 h-6" />
              </div>
            </div>
            
            {/* Row 2: Steps 4, 5 (reversed order for RTL zig-zag) */}
            <div className="flex items-start justify-start gap-4">
              <div className="flex items-center" style={{ width: 'calc(66.666% - 0.5rem)' }}>
                {(() => {
                  const Step4Icon = steps[3].Icon;
                  const Step5Icon = steps[4].Icon;
                  return (
                    <>
                      <div className="bg-card rounded-xl border border-border p-5 flex-1 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                          <Step4Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{steps[3].title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{steps[3].description}</p>
                      </div>
                      <div className="flex-shrink-0 px-3">
                        <ArrowLeft className="w-6 h-6 text-secondary/60" />
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-primary/30 p-5 flex-1 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                          <Step5Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{steps[4].title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{steps[4].description}</p>
                        <div className="mt-3 flex items-center gap-2 text-success text-sm">
                          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                          <span>אוטומציה פעילה</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile: Vertical flow */}
        <div className="md:hidden space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`bg-card rounded-xl border p-4 transition-all duration-300 ${
                index === steps.length - 1 
                  ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5' 
                  : 'border-border'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    index === steps.length - 1 
                      ? 'bg-gradient-to-br from-primary to-secondary' 
                      : 'bg-primary/10'
                  }`}>
                    <step.Icon className={`w-5 h-5 ${
                      index === steps.length - 1 ? 'text-primary-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {index === steps.length - 1 && (
                      <div className="mt-2 flex items-center gap-2 text-success text-sm">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span>אוטומציה פעילה</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-5 h-5 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-10 relative">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-l from-primary via-secondary to-accent" />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">התחלה</span>
            <span className="text-xs text-success font-medium">אוטומציה פעילה</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;

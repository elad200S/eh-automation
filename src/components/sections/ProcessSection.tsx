import Section from '@/components/Section';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  { 
    number: '01', 
    title: 'איפיון', 
    description: 'הבנת התהליכים הקיימים והצרכים העסקיים',
    color: 'primary'
  },
  { 
    number: '02', 
    title: 'תכנון תהליך', 
    description: 'מיפוי זרימות העבודה והגדרת אוטומציות',
    color: 'secondary'
  },
  { 
    number: '03', 
    title: 'חיבור מערכות', 
    description: 'אינטגרציה בין הכלים הקיימים והחדשים',
    color: 'accent'
  },
  { 
    number: '04', 
    title: 'בדיקות', 
    description: 'וידוא פעולה תקינה בתנאי אמת',
    color: 'secondary'
  },
  { 
    number: '05', 
    title: 'הטמעה', 
    description: 'הרצה חיה ותמיכה בשלב ההסתגלות',
    color: 'primary'
  },
];

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-6xl">
        <div className="text-technical mb-4">
          <span className="text-primary font-semibold">//</span> 08
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          איך זה עובד
        </h2>
        
        {/* Zig-zag flow diagram - full width */}
        <div className="relative">
          {/* Connection lines - visible on md+ */}
          <svg className="absolute inset-0 w-full h-full hidden md:block" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative ${index % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                {/* Connection arrow - mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-border to-transparent md:hidden" />
                )}
                
                {/* Card */}
                <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className={`w-14 h-14 rounded-xl bg-${step.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className={`font-mono text-lg font-bold text-${step.color}`}>{step.number}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  {/* Completion indicator on hover */}
                  <div className="mt-4 flex items-center gap-2 text-success opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs">שלב מוגדר</span>
                  </div>
                </div>
                
                {/* Connector line to next card - desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5">
                    <div className={`w-full h-full bg-gradient-to-l from-transparent via-${step.color}/50 to-${step.color}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress bar at bottom */}
        <div className="mt-12 relative">
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
import Section from '@/components/Section';

const steps = [
  { number: '01', title: 'איפיון', description: 'הבנת התהליכים הקיימים והצרכים העסקיים' },
  { number: '02', title: 'תכנון תהליך', description: 'מיפוי זרימות העבודה והגדרת אוטומציות' },
  { number: '03', title: 'חיבור מערכות', description: 'אינטגרציה בין הכלים הקיימים והחדשים' },
  { number: '04', title: 'בדיקות', description: 'וידוא פעולה תקינה בתנאי אמת' },
  { number: '05', title: 'הטמעה', description: 'הרצה חיה ותמיכה בשלב ההסתגלות' },
];

const ProcessSection = () => {
  return (
    <Section id="process">
      <div className="max-w-4xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 08
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          איך זה עובד
        </h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-[23px] top-0 bottom-0 w-px bg-border-subtle" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                <div className="w-12 h-12 rounded-lg bg-background-secondary border border-border flex items-center justify-center flex-shrink-0 z-10">
                  <span className="font-mono text-sm text-primary">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-medium text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;

import Section from '@/components/Section';
import { ArrowLeft, Cog } from 'lucide-react';

// Custom SVG Icons for automations
const LeadsIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="8" fill="white"/>
    <circle cx="18" cy="18" r="6" fill="#3B82F6"/>
    <path d="M18 26c-5.52 0-10 3.13-10 7v3h20v-3c0-3.87-4.48-7-10-7z" fill="#3B82F6"/>
    <circle cx="32" cy="18" r="5" fill="#FBBF24"/>
    <path d="M32 25c-4.14 0-7.5 2.35-7.5 5.25V33h15v-2.75c0-2.9-3.36-5.25-7.5-5.25z" fill="#FBBF24"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect x="6" y="10" width="36" height="32" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
    <rect x="6" y="10" width="36" height="10" rx="4" fill="#EF4444"/>
    <rect x="6" y="16" width="36" height="4" fill="#EF4444"/>
    <rect x="12" y="26" width="6" height="6" rx="1" fill="#E5E7EB"/>
    <rect x="21" y="26" width="6" height="6" rx="1" fill="#3B82F6"/>
    <rect x="30" y="26" width="6" height="6" rx="1" fill="#E5E7EB"/>
    <rect x="12" y="34" width="6" height="6" rx="1" fill="#E5E7EB"/>
    <rect x="21" y="34" width="6" height="6" rx="1" fill="#E5E7EB"/>
    <circle cx="13" cy="10" r="2" fill="#9CA3AF"/>
    <circle cx="35" cy="10" r="2" fill="#9CA3AF"/>
    <line x1="13" y1="6" x2="13" y2="10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
    <line x1="35" y1="6" x2="35" y2="10" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect x="8" y="4" width="32" height="40" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
    <rect x="12" y="10" width="18" height="2" rx="1" fill="#1F2937"/>
    <rect x="12" y="16" width="24" height="1.5" rx="0.75" fill="#9CA3AF"/>
    <rect x="12" y="21" width="24" height="1.5" rx="0.75" fill="#9CA3AF"/>
    <rect x="12" y="26" width="20" height="1.5" rx="0.75" fill="#9CA3AF"/>
    <rect x="12" y="34" width="12" height="2" rx="1" fill="#1F2937"/>
    <rect x="28" y="33" width="8" height="4" rx="1" fill="#1F2937"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect width="48" height="48" rx="8" fill="#3B82F6"/>
    <ellipse cx="24" cy="14" rx="14" ry="5" fill="white"/>
    <path d="M10 14v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8" stroke="white" strokeWidth="2" fill="none"/>
    <ellipse cx="24" cy="22" rx="14" ry="5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5"/>
    <path d="M10 22v8c0 2.76 6.27 5 14 5s14-2.24 14-5v-8" stroke="white" strokeWidth="2" fill="none"/>
    <ellipse cx="24" cy="30" rx="14" ry="5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5"/>
  </svg>
);

const useCases = [
  {
    title: 'אוטומציה ללידים בעסק',
    description: 'קליטת לידים אוטומטית, סיווג והפניה לאיש המכירות המתאים.',
    flow: {
      source: 'טופס / פרסום',
      process: 'סיווג + שיוך',
      result: 'הודעה לאיש מכירות'
    },
    Icon: LeadsIcon,
  },
  {
    title: 'אוטומציה לקביעת תורים',
    description: 'סנכרון לוחות זמנים, תזכורות ועדכונים אוטומטיים.',
    flow: {
      source: 'בחירת מועד',
      process: 'סנכרון יומן',
      result: 'תזכורות אוטומטיות'
    },
    Icon: CalendarIcon,
  },
  {
    title: 'אוטומציה להצעות מחיר',
    description: 'יצירה, שליחה ומעקב אחר הצעות מחיר ללא מגע יד.',
    flow: {
      source: 'בקשה מלקוח',
      process: 'יצירת מסמך',
      result: 'שליחה + מעקב'
    },
    Icon: QuoteIcon,
  },
  {
    title: 'אוטומציה לניהול נתונים',
    description: 'העברת מידע בין מערכות, עדכון אוטומטי ודוחות.',
    flow: {
      source: 'מקור נתונים',
      process: 'עיבוד + סינון',
      result: 'דוח / עדכון'
    },
    Icon: DatabaseIcon,
  },
];


const UseCasesSection = () => {
  return (
    <Section id="use-cases">
      <div className="max-w-5xl">
        <p className="text-sm font-medium text-primary mb-2">דוגמאות מהשטח</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          אוטומציות שאנחנו בונים לעסקים
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <useCase.Icon />
                </div>
                <div className="flex-1 min-h-[72px]">
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {useCase.description}
                  </p>
                </div>
              </div>
              
              {/* Flow diagram */}
              <div className="flex items-center justify-between gap-2 p-4 bg-muted/50 rounded-lg mt-auto">
                <div className="text-center flex-1">
                  <div className="w-10 h-10 rounded-lg bg-card border border-border mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-foreground/40" />
                  </div>
                  <span className="text-xs text-muted-foreground">{useCase.flow.source}</span>
                </div>
                
                <ArrowLeft className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                
                <div className="text-center flex-1">
                  <div className="w-10 h-10 rounded-lg bg-muted border border-border mx-auto mb-2 flex items-center justify-center">
                    <Cog className="w-4 h-4 text-foreground/60" />
                  </div>
                  <span className="text-xs text-muted-foreground">{useCase.flow.process}</span>
                </div>
                
                <ArrowLeft className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                
                <div className="text-center flex-1">
                  <div className="w-10 h-10 rounded-lg bg-card border border-border mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/40" />
                  </div>
                  <span className="text-xs text-muted-foreground">{useCase.flow.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default UseCasesSection;

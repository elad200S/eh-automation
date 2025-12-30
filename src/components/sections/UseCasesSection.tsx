import { useState } from 'react';
import Section from '@/components/Section';
import { ArrowLeft, ChevronDown, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const buildOptions = {
  inputs: ['טופס אתר', 'WhatsApp', 'אימייל', 'CRM'],
  logic: ['סיווג אוטומטי', 'עדכון מערכת', 'יצירת מסמך', 'חישוב מחיר'],
  outputs: ['התראה לנייד', 'מייל ללקוח', 'עדכון גיליון', 'יצירת משימה'],
};

const UseCasesSection = () => {
  const [builderInput, setBuilderInput] = useState('');
  const [builderLogic, setBuilderLogic] = useState('');
  const [builderOutput, setBuilderOutput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleBuild = () => {
    if (builderInput && builderLogic && builderOutput) {
      setShowResult(true);
    }
  };

  return (
    <Section id="use-cases">
      <div className="max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          אוטומציות בפועל
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
        
        {/* Interactive Builder Card */}
        <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <Cog className="w-6 h-6 text-foreground/80" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">בנייה עצמית</h3>
              <p className="text-sm text-muted-foreground">בחרו קלט, לוגיקה ופלט – ונראה לכם איך זה עובד</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">קלט</label>
              <div className="relative">
                <select
                  value={builderInput}
                  onChange={(e) => { setBuilderInput(e.target.value); setShowResult(false); }}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">בחרו מקור</option>
                  {buildOptions.inputs.map((input, i) => (
                    <option key={i} value={input}>{input}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            {/* Logic */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">לוגיקה</label>
              <div className="relative">
                <select
                  value={builderLogic}
                  onChange={(e) => { setBuilderLogic(e.target.value); setShowResult(false); }}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">בחרו פעולה</option>
                  {buildOptions.logic.map((logic, i) => (
                    <option key={i} value={logic}>{logic}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            {/* Output */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">פלט</label>
              <div className="relative">
                <select
                  value={builderOutput}
                  onChange={(e) => { setBuilderOutput(e.target.value); setShowResult(false); }}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">בחרו תוצאה</option>
                  {buildOptions.outputs.map((output, i) => (
                    <option key={i} value={output}>{output}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleBuild}
            disabled={!builderInput || !builderLogic || !builderOutput}
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:shadow-lg hover:glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            הראו לי את האוטומציה
          </button>
          
          {/* Result */}
          {showResult && (
            <div className="mt-6 p-4 bg-card rounded-xl border border-success/30 animate-fade-up">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">האוטומציה מוכנה</span>
              </div>
              <p className="text-foreground">
                כאשר מגיע <span className="font-semibold text-primary">{builderInput}</span>,
                המערכת מבצעת <span className="font-semibold text-secondary">{builderLogic}</span>,
                והתוצאה היא <span className="font-semibold text-accent">{builderOutput}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default UseCasesSection;
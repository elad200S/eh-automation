import { useState } from 'react';
import Section from '@/components/Section';
import { ArrowLeft, Play, ChevronDown, Users, FileText, Calendar, Database, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const useCases = [
  {
    title: 'אוטומציה ללידים בעסק',
    description: 'קליטת לידים אוטומטית, סיווג והפניה לאיש המכירות המתאים.',
    flow: {
      source: 'טופס / פרסום',
      process: 'סיווג + שיוך',
      result: 'הודעה לאיש מכירות'
    },
    icon: Users,
    color: 'primary'
  },
  {
    title: 'אוטומציה להצעות מחיר',
    description: 'יצירה, שליחה ומעקב אחר הצעות מחיר ללא מגע יד.',
    flow: {
      source: 'בקשה מלקוח',
      process: 'יצירת מסמך',
      result: 'שליחה + מעקב'
    },
    icon: FileText,
    color: 'secondary'
  },
  {
    title: 'אוטומציה לקביעת תורים',
    description: 'סנכרון לוחות זמנים, תזכורות ועדכונים אוטומטיים.',
    flow: {
      source: 'בחירת מועד',
      process: 'סנכרון יומן',
      result: 'תזכורות אוטומטיות'
    },
    icon: Calendar,
    color: 'accent'
  },
  {
    title: 'אוטומציה לניהול נתונים',
    description: 'העברת מידע בין מערכות, עדכון אוטומטי ודוחות.',
    flow: {
      source: 'מקור נתונים',
      process: 'עיבוד + סינון',
      result: 'דוח / עדכון'
    },
    icon: Database,
    color: 'primary'
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
        <div className="text-technical mb-4">
          <span className="text-primary font-semibold">//</span> 05
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          אוטומציות בפועל
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${useCase.color}/10 flex items-center justify-center flex-shrink-0`}>
                  <useCase.icon className={`w-6 h-6 text-${useCase.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              </div>
              
              {/* Flow diagram */}
              <div className="flex items-center justify-between gap-2 p-4 bg-muted/50 rounded-lg">
                <div className="text-center flex-1">
                  <div className="w-10 h-10 rounded-lg bg-card border border-border mx-auto mb-2 flex items-center justify-center">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{useCase.flow.source}</span>
                </div>
                
                <ArrowLeft className="w-5 h-5 text-border flex-shrink-0" />
                
                <div className="text-center flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-${useCase.color}/10 border border-${useCase.color}/20 mx-auto mb-2 flex items-center justify-center`}>
                    <Sparkles className={`w-4 h-4 text-${useCase.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{useCase.flow.process}</span>
                </div>
                
                <ArrowLeft className="w-5 h-5 text-border flex-shrink-0" />
                
                <div className="text-center flex-1">
                  <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/20 mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
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
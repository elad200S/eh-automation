import { useState } from 'react';
import Section from '@/components/Section';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const problems = [
  {
    title: 'תהליכים קריטיים תלויים באנשים',
    explanation: 'כאשר תהליך עסקי תלוי באדם ספציפי, חופשה, מחלה או עזיבה יוצרים פער תפעולי מיידי.',
    insight: 'רוב העסקים לא מודעים לכמה תהליכים תלויים בידע שנמצא רק בראש של עובד אחד.',
    example: 'עסק שירותים שבו רק אדם אחד יודע לתמחר הצעות מחיר.',
  },
  {
    title: 'עבודה ידנית יוצרת טעויות וחוסר עקביות',
    explanation: 'כל פעולה ידנית מהווה נקודת כשל פוטנציאלית. טעות בהזנת נתון יכולה לגרור שרשרת בעיות.',
    insight: 'הטעויות הקטנות הן היקרות ביותר – הן נראות רק כשכבר נגרם נזק.',
    example: 'הזנה כפולה של לקוח למערכת שיוצרת בלבול בחשבוניות.',
  },
  {
    title: 'העסק לא יכול לגדול בלי להוסיף עומס תפעולי',
    explanation: 'גדילה ללא תשתית אוטומטית משמעותה יותר אנשים, יותר טעויות, ויותר עלויות.',
    insight: 'עסקים רבים מפסידים הזדמנויות כי פשוט אין להם את הקיבולת לטפל בהן.',
    example: 'חברה שמסרבת לפרויקטים חדשים כי הצוות הקיים כבר עמוס.',
  },
  {
    title: 'בעל העסק הופך לצוואר בקבוק',
    explanation: 'כשכל החלטה עוברת דרך המנכ"ל, העסק מוגבל לכושר העבודה של אדם אחד.',
    insight: 'הסימפטום הבולט: בעל העסק עובד הכי הרבה אבל העסק לא צומח.',
    example: 'בעל עסק שעונה ללקוחות עד השעות הקטנות כי אין מי שיחליף אותו.',
  },
];

const ProblemSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section id="problem">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          איפה עסקים נתקעים
        </h2>
        
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={cn(
                "interactive-card",
                expandedIndex === index && "expanded"
              )}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-foreground/70" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-foreground">{problem.title}</p>
                    <ChevronDown 
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
                        expandedIndex === index && "rotate-180"
                      )} 
                    />
                  </div>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-300",
                    expandedIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  )}>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {problem.explanation}
                    </p>
                    
                    <div className="bg-primary/5 rounded-lg p-4 border-r-2 border-primary mb-3">
                      <p className="text-sm font-medium text-primary mb-1">איך אני רואה את זה בפועל:</p>
                      <p className="text-sm text-foreground">{problem.insight}</p>
                    </div>
                    
                    <div className="bg-secondary/5 rounded-lg p-4 border-r-2 border-secondary">
                      <p className="text-sm font-medium text-secondary mb-1">דוגמה:</p>
                      <p className="text-sm text-muted-foreground">{problem.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;
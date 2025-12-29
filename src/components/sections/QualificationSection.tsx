import { useState } from 'react';
import Section from '@/components/Section';
import { HelpCircle, ChevronDown, Building2, Users, Package, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const questions = [
  {
    question: 'איזה סוג עסק יש לך?',
    icon: Building2,
    options: [
      {
        label: 'עסק של אדם אחד',
        icon: '👤',
        explanation: 'אוטומציה מאפשרת לך להכפיל את עצמך – לעשות יותר בפחות זמן ולהתמקד במה שאתה עושה הכי טוב.'
      },
      {
        label: 'עסק עתיר הזמנות',
        icon: '📦',
        explanation: 'כשהעומס גדל, הטעויות מתרבות. אוטומציה מבטיחה עקביות גם בלחץ.'
      },
      {
        label: 'עסק מוצרי',
        icon: '🛍️',
        explanation: 'ניהול מלאי, הזמנות ומשלוחים יכול לרוץ בצורה אוטומטית לחלוטין.'
      },
      {
        label: 'עסק עם פרילנסרים',
        icon: '👥',
        explanation: 'תיאום בין אנשים, משימות ותשלומים – הכל יכול להתנהל בלי התערבות שלך.'
      }
    ]
  },
  {
    question: 'איפה קיימת היום תלות בעובדים?',
    icon: Users,
    options: [
      {
        label: 'בתקשורת עם לקוחות',
        icon: '💬',
        explanation: 'מענה ראשוני, תזכורות ועדכוני סטטוס יכולים לעבוד 24/7.'
      },
      {
        label: 'בעבודה מול ספקים',
        icon: '🤝',
        explanation: 'הזמנות, אישורים ומעקב תשלומים – תהליכים שחוזרים על עצמם כל יום.'
      },
      {
        label: 'בהפקת מסמכים',
        icon: '📄',
        explanation: 'הצעות מחיר, חשבוניות וחוזים יכולים להיווצר אוטומטית.'
      },
      {
        label: 'בקבלת החלטות',
        icon: '🎯',
        explanation: 'דאטה מסודר מאפשר החלטות מהירות יותר ומדויקות יותר.'
      }
    ]
  },
  {
    question: 'איזה תהליך הכי מבזבז זמן?',
    icon: Package,
    options: [
      {
        label: 'הזנת נתונים ידנית',
        icon: '⌨️',
        explanation: 'העברת מידע בין מערכות היא הדבר הראשון שצריך לאטומט.'
      },
      {
        label: 'מעקב אחרי משימות',
        icon: '📋',
        explanation: 'תזכורות, אסקלציות ודוחות סטטוס – הכל יכול לקרות לבד.'
      },
      {
        label: 'תיאום פגישות',
        icon: '📅',
        explanation: 'הלוך-חזור על מועדים זה בזבוז זמן קלאסי שקל לפתור.'
      },
      {
        label: 'הכנת דוחות',
        icon: '📊',
        explanation: 'דוחות אוטומטיים חוסכים שעות ומונעים טעויות.'
      }
    ]
  },
  {
    question: 'אילו מערכות כבר קיימות בעסק?',
    icon: Briefcase,
    options: [
      {
        label: 'גוגל (Sheets, Gmail)',
        icon: '📧',
        explanation: 'הבסיס קיים – עכשיו צריך לחבר אותו לשאר הכלים.'
      },
      {
        label: 'CRM כלשהו',
        icon: '📱',
        explanation: 'מצוין. CRM הוא הלב של כל אוטומציה עסקית.'
      },
      {
        label: 'מערכת הנהלת חשבונות',
        icon: '💰',
        explanation: 'חיבור להנהח"ש מאפשר אוטומציה של חשבוניות ותשלומים.'
      },
      {
        label: 'עדיין לא הרבה',
        icon: '🌱',
        explanation: 'נקודת פתיחה טובה – נבנה את התשתית נכון מההתחלה.'
      }
    ]
  },
];

const QualificationSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: prev[questionIndex] === optionIndex ? null : optionIndex
    }));
  };

  return (
    <Section id="qualification">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary font-semibold">//</span> 09
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          לפני שמדברים – נבדוק התאמה
        </h2>
        
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className={cn(
                "interactive-card",
                expandedIndex === index && "expanded"
              )}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full flex items-center gap-4 text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium flex-1">{item.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    expandedIndex === index && "rotate-180"
                  )} 
                />
              </button>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                expandedIndex === index ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
              )}>
                <div className="grid grid-cols-2 gap-3">
                  {item.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleOptionSelect(index, optionIndex)}
                      className={cn(
                        "p-4 rounded-xl border text-right transition-all duration-200",
                        selectedOptions[index] === optionIndex
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/30"
                      )}
                    >
                      <span className="text-2xl mb-2 block">{option.icon}</span>
                      <span className="text-sm font-medium text-foreground block mb-2">
                        {option.label}
                      </span>
                      
                      <div className={cn(
                        "overflow-hidden transition-all duration-200",
                        selectedOptions[index] === optionIndex 
                          ? "max-h-20 opacity-100" 
                          : "max-h-0 opacity-0"
                      )}>
                        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
                          {option.explanation}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default QualificationSection;
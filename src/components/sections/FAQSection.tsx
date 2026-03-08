import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQSchema } from '@/lib/seo';
import Section from '@/components/Section';

const faqs = [
  {
    question: 'כמה זמן לוקח לבנות מערכת אוטומציה?',
    answer: 'תלוי במורכבות. אוטומציה בסיסית יכולה להיות מוכנה תוך שבוע. מערכת מורכבת יותר עם אינטגרציות מרובות לוקחת בין 2-4 שבועות. תמיד מתחילים באפיון מדויק כדי לתת לך ציפיות ריאליות.',
  },
  {
    question: 'האם אני צריך ידע טכני כדי להשתמש במערכות?',
    answer: 'לא. המערכות נבנות כך שתוכל להפעיל אותן בלי ידע טכני. אני מלווה בהדרכה מלאה ומוודא שהכל עובד חלק לפני שאתה עצמאי.',
  },
  {
    question: 'מה קורה אם משהו נשבר או צריך שינוי?',
    answer: 'כל מערכת מגיעה עם תקופת תמיכה. אם משהו לא עובד – מתקנים. אם צריך התאמות – עושים. המטרה היא שהמערכת תעבוד בשבילך לאורך זמן.',
  },
  {
    question: 'האם אפשר לחבר מערכות שכבר יש לי?',
    answer: 'בהחלט. רוב הפרויקטים מתחילים מחיבור מערכות קיימות – CRM, גוגל, WhatsApp, מערכות תשלום ועוד. אני בודק מה כבר קיים ובונה סביב זה.',
  },
  {
    question: 'כמה עולה לבנות אוטומציה?',
    answer: 'המחיר תלוי בהיקף הפרויקט. אפיון ראשוני הוא ללא עלות – בשיחה נבין מה נדרש ונתן הצעת מחיר מדויקת. אין הפתעות.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary mb-2">שאלות נפוצות</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            יש שאלות? יש תשובות
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                'bg-card rounded-xl border border-border overflow-hidden transition-all',
                openIndex === index && 'border-primary/30'
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
              >
                <span className="text-base font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-60' : 'max-h-0'
                )}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQSection;

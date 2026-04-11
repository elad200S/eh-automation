import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQSchema } from '@/lib/seo';
import Section from '@/components/Section';

const faqs = [
  {
    question: 'למי זה מתאים?',
    answer: 'לכל עסק שמטפל בלידים, פניות או לקוחות ורוצה לעבוד בצורה מסודרת ויעילה יותר. בין אם אתה עצמאי, חברת שירותים או עסק עם צוות.',
  },
  {
    question: 'איך נראה תהליך העבודה?',
    answer: 'מתחילים בשיחת היכרות קצרה כדי להבין את העסק והצרכים. אחרי זה בונים פתרון מותאם, מטמיעים ומלווים עד שהכל עובד חלק.',
  },
  {
    question: 'האם צריך מערכות קיימות?',
    answer: 'לא חובה. אם יש לך כבר מערכות — מצוין, נתחבר אליהן. אם לא, נבנה הכל מאפס בצורה שמתאימה בדיוק לעסק שלך.',
  },
  {
    question: 'כמה זמן לוקח להטמיע?',
    answer: 'תלוי במורכבות, אבל רוב הפרויקטים עולים לאוויר תוך ימים עד שבועות בודדים. כבר מהשלבים הראשונים רואים שיפור בסדר ובמהירות הטיפול.',
  },
  {
    question: 'מה העלות?',
    answer: 'כל פרויקט שונה, לכן מתחילים משיחת אפיון קצרה (בחינם) כדי להבין מה הכי נכון עבורך ולתת הצעה מדויקת.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, hsl(210 100% 58%) 0%, hsl(185 70% 52% / 0.5) 40%, transparent 70%)' }}
        />
      </div>
      <FAQSchema items={faqs} />
      <Section id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10 text-center">
            שאלות נפוצות
          </h2>

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
    </div>
  );
};

export default FAQSection;

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQSchema } from '@/lib/seo';
import Section from '@/components/Section';
import RevealText from '@/components/RevealText';

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
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, hsl(160,84%,39%) 0%, transparent 70%)' }}
        />
      </div>

      <FAQSchema items={faqs} />

      <Section id="faq">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">יש שאלות?</p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              שאלות נפוצות
            </RevealText>
          </div>

          {/* Accordion */}
          <div className="space-y-2" dir="rtl">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    border: `1px solid ${isOpen ? 'hsl(160,84%,39%,0.35)' : 'hsl(215,20%,18%)'}`,
                    background: isOpen ? 'hsl(var(--card))' : 'hsl(var(--card)/0.5)',
                    boxShadow: isOpen ? '0 0 24px hsl(160,84%,39%,0.08)' : 'none',
                    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                  }}
                >
                  {/* Left accent bar when open */}
                  {isOpen && (
                    <div
                      className="absolute top-0 bottom-0 right-0 w-[3px] rounded-full"
                      style={{ background: 'linear-gradient(to bottom, hsl(160,84%,39%,0.8), hsl(160,84%,39%,0.2))' }}
                    />
                  )}

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-right"
                  >
                    {/* Number tag */}
                    <span
                      className="font-mono text-xs font-bold flex-shrink-0 tabular-nums"
                      style={{ color: isOpen ? 'hsl(160,84%,50%)' : 'hsl(215,20%,40%)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Question */}
                    <span className={cn(
                      'flex-1 text-base font-medium transition-colors duration-200',
                      isOpen ? 'text-foreground' : 'text-foreground/80'
                    )}>
                      {faq.question}
                    </span>

                    {/* Plus/Minus icon */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isOpen ? 'hsl(160,84%,39%,0.15)' : 'hsl(215,20%,18%)',
                        border: `1px solid ${isOpen ? 'hsl(160,84%,39%,0.4)' : 'transparent'}`,
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <Plus className="w-3.5 h-3.5" style={{ color: isOpen ? 'hsl(160,84%,50%)' : 'hsl(215,20%,55%)' }} />
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? '200px' : '0px' }}
                  >
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed pr-16">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Section>
    </div>
  );
};

export default FAQSection;

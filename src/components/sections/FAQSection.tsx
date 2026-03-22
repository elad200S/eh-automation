import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQSchema } from '@/lib/seo';
import Section from '@/components/Section';

const faqs = [
  {
    question: 'זה מתאים גם לעסק קטן?',
    answer: 'כן, במיוחד לעסקים עם הרבה פניות או תהליכים שחוזרים על עצמם.',
  },
  {
    question: 'צריך מערכות קיימות?',
    answer: 'לא חובה, אבל אם יש כבר מערכות, אפשר להתחבר אליהן ולשפר את מה שקיים.',
  },
  {
    question: 'תוך כמה זמן רואים תוצאה?',
    answer: 'בדרך כלל כבר מהשלבים הראשונים רואים שיפור בסדר ובמהירות הטיפול בלידים.',
  },
  {
    question: 'כמה זה עולה?',
    answer: 'תלוי בצורך ובמורכבות, לכן מתחילים משיחת אפיון קצרה להבין מה הכי נכון עבורך.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
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
    </>
  );
};

export default FAQSection;

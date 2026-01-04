import Section from '@/components/Section';
import { Quote } from 'lucide-react';

const quotes = [
  {
    name: 'Bill Gates',
    originalQuote: '"The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency."',
    hebrewTranslation: '"הכלל הראשון של כל טכנולוגיה בעסק הוא שאוטומציה המיושמת על תהליך יעיל תגביר את היעילות."',
  },
  {
    name: 'Elon Musk',
    originalQuote: '"Any product that needs a manual to work is broken."',
    hebrewTranslation: '"כל מוצר שדורש מדריך הפעלה הוא מוצר שבור."',
  },
  {
    name: 'Peter Drucker',
    originalQuote: '"Efficiency is doing things right; effectiveness is doing the right things."',
    hebrewTranslation: '"יעילות זה לעשות דברים נכון; אפקטיביות זה לעשות את הדברים הנכונים."',
  },
  {
    name: 'Warren Buffett',
    originalQuote: '"I insist on a lot of time being spent, almost every day, to just sit and think. I read and think. So I do more reading and thinking, and make less impulse decisions than most people in business."',
    hebrewTranslation: '"אני מתעקש להקדיש הרבה זמן כמעט כל יום רק לשבת ולחשוב. זמן לחשיבה, לא לעבודה ידנית."',
  },
];

const QuotesSection = () => {
  return (
    <Section id="quotes" className="bg-muted/30">
      <div className="max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
          מה אומרים המומחים
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="pr-6">
                <p className="text-foreground font-medium mb-3 text-sm leading-relaxed italic">
                  {quote.originalQuote}
                </p>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {quote.hebrewTranslation}
                </p>
                
                <p className="text-primary font-semibold text-sm">
                  — {quote.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default QuotesSection;

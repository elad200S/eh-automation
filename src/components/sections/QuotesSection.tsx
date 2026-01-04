import Section from '@/components/Section';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

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
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
          מה אומרים המומחים
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: true,
            direction: "rtl",
          }}
          className="w-full"
        >
          <CarouselContent>
            {quotes.map((quote, index) => (
              <CarouselItem key={index}>
                <div className="bg-card border border-border rounded-xl p-8 relative mx-4">
                  <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                  
                  <div className="pr-8">
                    <p className="text-foreground font-medium mb-4 text-base leading-relaxed italic">
                      {quote.originalQuote}
                    </p>
                    
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      {quote.hebrewTranslation}
                    </p>
                    
                    <p className="text-primary font-semibold text-base">
                      — {quote.name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 h-10 w-10" />
            <CarouselNext className="static translate-y-0 h-10 w-10" />
          </div>
        </Carousel>
      </div>
    </Section>
  );
};

export default QuotesSection;
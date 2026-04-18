import Section from '@/components/Section';
import eladHeadshot from '@/assets/elad-headshot.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const { ref: contentRef, style: contentStyle } = useScrollReveal<HTMLDivElement>(0);
  const { ref: imageRef, style: imageStyle } = useScrollReveal<HTMLDivElement>(200);

  return (
    <Section id="about" className="pt-8 md:pt-12 pb-8 md:pb-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} style={contentStyle} className="order-1">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              קצת עליי
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                אני מתמקד בבניית אוטומציות פרקטיות לעסקים שרוצים סדר, מעקב ושליטה אמיתית על התהליכים שלהם.
              </p>
              <p>
                לא בונה מערכות מסובכות סתם, אלא פתרונות פשוטים, ברורים ויציבים שבאמת משתמשים בהם ביום יום.
              </p>
              <p>
                המטרה היא להפוך תהליכים מורכבים לפשוטים, כך שהעסק יעבוד בצורה חלקה ויעילה יותר.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div ref={imageRef} style={imageStyle} className="order-2">
            <div className="relative">
              <div className="aspect-square max-w-[320px] mx-auto rounded-2xl bg-muted border border-border overflow-hidden shadow-lg">
                <img 
                  src={eladHeadshot} 
                  alt="אלעד חנינה - EH Automation" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl border border-primary/20 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;

import Section from '@/components/Section';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'עובד עם עסקים קטנים וסטארטאפים שרוצים לגדול',
  'מתמקד בתהליכים שחוזרים על עצמם – שם נמצא הערך האמיתי',
  'בונה פתרונות פשוטים שעובדים חלק לאורך זמן',
  'מלווה את התהליך מאיפיון ועד הטמעה בסדר ובבהירות',
];

const AboutSection = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square max-w-[320px] mx-auto rounded-2xl bg-muted border border-border overflow-hidden shadow-lg">
                {/* Placeholder for headshot */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-card border-2 border-border flex items-center justify-center">
                      <span className="text-3xl font-semibold text-foreground/60">EH</span>
                    </div>
                    <p className="text-sm text-muted-foreground">תמונה תתווסף בקרוב</p>
                  </div>
                </div>
              </div>
              {/* Subtle decorative element */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-primary/20 -z-10" />
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              מי עומד מאחורי EH Automation
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              אני אלעד חנינה, ואני עוזר לעסקים לבנות תשתית שעובדת בסדר ובשקט. 
              הגישה שלי פשוטה: להבין מה באמת קורה בעסק, ולבנות מערכת שמייעלת את זה בצורה ברורה ונוחה.
            </p>
            
            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
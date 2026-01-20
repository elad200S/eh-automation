import Section from '@/components/Section';
import { CheckCircle2 } from 'lucide-react';
import eladHeadshot from '@/assets/elad-headshot.png';

const highlights = [
  'עובד עם B2B ועסקים בתחילת דרכם על מנת לייצור יציבות',
  'מתמקד בתהליכים שחוזרים על עצמם – שם נמצא הערך האמיתי',
  'בונה פתרונות פשוטים שעובדים חלק לאורך זמן',
  'מלווה את התהליך מאיפיון ועד הטמעה בסדר ובבהירות',
];

const AboutSection = () => {
  return (
    <Section id="about" className="pt-8 md:pt-12">
    
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content - on the left (right in RTL) */}
          <div className="order-1">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              מי עומד מאחורי EH Automation
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              אלעד חנינה פועל בעולמות ה־B2B ועוזר לעסקים לבנות תשתית אוטומטית יציבה.
              <br />
              הגישה שלי פשוטה:
              <br />
              לבנות אוטומציות חכמות שמחליפות תהליכים ידניים, חוסכות זמן וכסף, ומורידות מהעסק את הפעולות שהוא פשוט לא אוהב להתעסק בהן.
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
          
          {/* Image - on the right (left in RTL) */}
          <div className="order-2">
            <div className="relative">
              <div className="aspect-square max-w-[320px] mx-auto rounded-2xl bg-muted border border-border overflow-hidden shadow-lg">
                <img 
                  src={eladHeadshot} 
                  alt="אלעד חנינה - EH Automation" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Subtle decorative element */}
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl border border-primary/20 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
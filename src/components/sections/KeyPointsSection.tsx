import Section from '@/components/Section';
import { ArrowLeft } from 'lucide-react';

const keyPoints = [
  'הבינה המלאכותית לא מחליפה את האוטומציה — היא משדרגת אותה',
  'מה שפעם דרש התערבות אנושית עכשיו קורה אוטומטית',
  'ההבדל בין עסק שצומח לעסק שנתקע הוא היכולת לקבל החלטות מהירות על בסיס מידע',
  'הטכנולוגיה כבר כאן — השאלה היא רק מי מיישם אותה נכון',
];

const KeyPointsSection = () => {
  return (
    <Section id="key-points">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          נקודות מפתח
        </h2>
        
        <div className="space-y-4">
          {keyPoints.map((point, index) => (
            <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {point}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-primary via-primary to-primary/90 text-primary-foreground rounded-xl text-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Let's turn action into automation
            <ArrowLeft className="w-5 h-5" />
          </a>
        </div>
      </div>
    </Section>
  );
};

export default KeyPointsSection;

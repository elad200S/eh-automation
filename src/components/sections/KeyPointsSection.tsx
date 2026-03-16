import Section from '@/components/Section';
import { ArrowLeft } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

const keyPoints = [
  'הבינה המלאכותית לא מחליפה את האוטומציה — היא משדרגת אותה',
  'מה שפעם דרש התערבות אנושית עכשיו קורה אוטומטית',
  'ההבדל בין עסק שצומח לעסק שנתקע הוא היכולת לקבל החלטות מהירות על בסיס מידע',
  'הטכנולוגיה כבר כאן — השאלה היא רק מי מיישם אותה נכון',
];

const KeyPointsSection = () => {
  const { openPopup } = useContactPopup();
  return (
    <Section id="key-points">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary mb-2">תובנות</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          למה AI + אוטומציה זה שינוי כללי המשחק
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
          <button
            onClick={openPopup}
            className="cta-gradient group"
          >
            בואו נבנה את המערכת שלכם
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default KeyPointsSection;

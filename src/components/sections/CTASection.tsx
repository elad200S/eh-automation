import { ArrowLeft } from 'lucide-react';
import Section from '@/components/Section';
import { useContactPopup } from '@/contexts/ContactPopupContext';

const CTASection = () => {
  const { openPopup } = useContactPopup();

  return (
    <Section id="cta" withSeparator={false} className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-border p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            רוצה לבדוק אם זה מתאים לעסק שלך?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            שיחת היכרות קצרה, בלי התחייבות. נבין מה העסק צריך ונראה אם אפשר לעזור.
          </p>
          <button
            onClick={openPopup}
            className="cta-gradient group"
          >
            לתיאום שיחת היכרות
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;

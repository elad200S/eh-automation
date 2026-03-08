import { ArrowLeft } from 'lucide-react';
import Section from '@/components/Section';

const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="cta" withSeparator={false} className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-border p-10 md:p-14">
          <p className="text-sm font-medium text-primary mb-3">הצעד הבא</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            מוכנים לבנות מערכת שעובדת בשבילכם?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            שיחת אפיון ראשונית ללא עלות. נבין מה העסק צריך ונראה אם אני הכתובת הנכונה.
          </p>
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-[#3b82f6] via-[#2563eb] to-[#1e40af] text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl hover:from-[#60a5fa] hover:via-[#3b82f6] hover:to-[#2563eb] transition-all"
          >
            שיחת אסטרטגיה
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;

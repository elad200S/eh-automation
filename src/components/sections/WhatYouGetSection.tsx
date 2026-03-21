import Section from '@/components/Section';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  'מערכת מסודרת לניהול לידים',
  'אוטומציות שחוסכות עבודה ידנית',
  'מעקב ברור אחרי כל לקוח',
  'חיבור בין הכלים בעסק',
  'תהליך עבודה יציב ונוח יותר',
];

const WhatYouGetSection = () => {
  return (
    <Section id="what-you-get">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10">
          מה מקבלים בפועל
        </h2>
        
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border text-right"
            >
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-foreground font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhatYouGetSection;

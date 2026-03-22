import { ArrowLeft, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import HeroAutomationFlow from './HeroAutomationFlow';
import { useContactPopup } from '@/contexts/ContactPopupContext';

const bullets = [
  'טיפול אוטומטי בלידים נכנסים',
  'חיבור בין טפסים, CRM ו-WhatsApp',
  'פחות כאוס, יותר שליטה',
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { openPopup } = useContactPopup();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const timer = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const getAnimationClasses = () => {
    if (prefersReducedMotion) return '';
    return `transition-[transform,opacity] duration-[8000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
  };

  return (
    <section className="min-h-[70vh] md:min-h-[75vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background pb-8 md:pb-12">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className={`max-w-3xl mx-auto text-center ${getAnimationClasses()}`}>
          <div className="text-technical mb-6">
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            אוטומציות ו-AI לעסקים שרוצים לעבוד מסודר, לטפל ביותר לידים ולחסוך עבודה ידנית
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            אני בונה מערכות שמחברות בין לידים, לקוחות ותהליכים, כך שכל פנייה מטופלת, הכל מתועד, והעסק עובד בצורה חלקה וברורה
          </p>

          {/* Bullets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openPopup}
              className="cta-gradient group"
            >
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Automation flow animation */}
          <HeroAutomationFlow />
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

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
    setMounted(true);
  }, []);

  return (
    <section className="min-h-[80vh] md:min-h-[85vh] flex flex-col relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* תוכן — חלק עליון */}
      <div className="container relative z-10 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl mx-auto text-center">

          {/* כותרת קטנה */}
          <div
            className={
              prefersReducedMotion
                ? 'text-technical mb-6'
                : `text-technical mb-6 transition-all duration-500 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`
            }
          >
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </div>

          {/* כותרת ראשית */}
          <h1
            className={
              prefersReducedMotion
                ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight'
                : `text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '60ms' }}
          >
            הכל עובד. גם כשאתה לא.
          </h1>

          {/* תיאור */}
          <p
            className={
              prefersReducedMotion
                ? 'text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto'
                : `text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '120ms' }}
          >
            אני בונה מערכות שמחברות בין לידים, לקוחות ותהליכים, כך שכל פנייה מטופלת, הכל מתועד, והעסק עובד בצורה חלקה וברורה
          </p>

          {/* Bullets */}
          <div
            className={
              prefersReducedMotion
                ? 'flex flex-col sm:flex-row items-center justify-center gap-4 mb-10'
                : `flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '180ms' }}
          >
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          {/* כפתור CTA */}
          <div
            className={
              prefersReducedMotion
                ? 'flex flex-col sm:flex-row gap-4 justify-center'
                : `flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '240ms' }}
          >
            <button onClick={openPopup} className="cta-gradient group">
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ההליקס — מתחת לכל התוכן, ממלא את השטח שנשאר */}
      <div
        className={
          prefersReducedMotion
            ? 'relative z-10 w-full flex-1 flex items-center overflow-hidden'
            : `relative z-10 w-full flex-1 flex items-center overflow-hidden transition-all duration-1000 ease-out ${
                mounted ? 'opacity-100' : 'opacity-0'
              }`
        }
        style={{ transitionDelay: prefersReducedMotion ? '0ms' : '300ms' }}
      >
        <HeroAutomationFlow />
      </div>

      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

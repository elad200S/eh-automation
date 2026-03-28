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
    // השתמש ב-100ms במקום 250ms — פחות flicker
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[70vh] md:min-h-[75vh] flex items-center relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background pb-8 md:pb-12">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* ההליקס ברקע */}
      <div className="absolute inset-0 flex items-center z-[1] pointer-events-none">
        <HeroAutomationFlow />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* כותרת קטנה — נכנסת ראשונה */}
          <div
            className={
              prefersReducedMotion
                ? 'text-technical mb-6'
                : `text-technical mb-6 transition-all duration-500 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`
            }
            style={{ transitionDelay: '0ms' }}
          >
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </div>

          {/* כותרת ראשית — נכנסת שנייה */}
          <h1
            className={
              prefersReducedMotion
                ? 'text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight'
                : `text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '120ms' }}
          >
            אוטומציות ו-AI לעסקים שרוצים לעבוד מסודר, לטפל ביותר לידים ולחסוך עבודה ידנית
          </h1>

          {/* תיאור — נכנס שלישי */}
          <p
            className={
              prefersReducedMotion
                ? 'text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto'
                : `text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '240ms' }}
          >
            אני בונה מערכות שמחברות בין לידים, לקוחות ותהליכים, כך שכל פנייה מטופלת, הכל מתועד, והעסק עובד בצורה חלקה וברורה
          </p>

          {/* Bullets — נכנסים רביעיים */}
          <div
            className={
              prefersReducedMotion
                ? 'flex flex-col sm:flex-row items-center justify-center gap-4 mb-10'
                : `flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '360ms' }}
          >
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          {/* כפתור CTA — נכנס אחרון */}
          <div
            className={
              prefersReducedMotion
                ? 'flex flex-col sm:flex-row gap-4 justify-center'
                : `flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`
            }
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '480ms' }}
          >
            <button onClick={openPopup} className="cta-gradient group">
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

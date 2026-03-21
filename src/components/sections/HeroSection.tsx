import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

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
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Decorative circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className={`max-w-3xl mx-auto text-center ${getAnimationClasses()}`}>
          {/* Technical label */}
          <div className="text-technical mb-6">
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            מערכות אוטומציה ו-AI שמפשטות תהליכים ועוזרות לעסק לעבוד בצורה מסודרת ויעילה יותר
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            פתרונות מותאמים אישית לניהול לידים, מעקב אחרי לקוחות, ואוטומציה של תהליכים — כדי שתוכל להתמקד בצמיחה של העסק
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openPopup}
              className="cta-gradient group"
            >
              בוא נבחן מה יכול להתאים לעסק שלך
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <a
              href="#solutions-overview"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-foreground font-medium rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
            >
              איך אנחנו עוזרים
            </a>
          </div>
        </div>
      </div>
      
      {/* Accent line */}
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

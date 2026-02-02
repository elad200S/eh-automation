import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Trigger animation after a short delay for a more cinematic feel
    const timer = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Unified animation for the entire content block
  const getAnimationClasses = () => {
    if (prefersReducedMotion) {
      return '';
    }
    return `transition-[transform,opacity] duration-[5000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      mounted 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-[60px]'
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
        {/* Unified animated wrapper - entire content slides in as one block */}
        <div className={`max-w-3xl ${getAnimationClasses()}`}>
          {/* Technical label */}
          <div className="text-technical mb-6">
            <span className="text-primary font-semibold">//</span> Business Automation & AI Systems
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            EH <span className="gradient-text">Automation</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground font-light mb-8">
            אוטומציה עסקית שמאפשרת לגדול בלי להגדיל כוח אדם
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            אני עוזר לבעלי עסקים וסטארטאפים להרוויח יותר כסף בפחות זמן
            באמצעות אוטומציות מתקדמות ושילוב בינה מלאכותית
            שמחליפים תלות בעובדים בתהליכים חכמים ומבוססי מערכות.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-[#3b82f6] via-[#2563eb] to-[#1e40af] text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl hover:from-[#60a5fa] hover:via-[#3b82f6] hover:to-[#2563eb] transition-all"
          >
            איפיון ראשוני ללא התחייבות
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Accent line */}
      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;
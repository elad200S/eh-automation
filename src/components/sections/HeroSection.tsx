import { ArrowLeft, Check } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HeroAutomationFlow from './HeroAutomationFlow';
import AiEnergyCore from '@/components/AiEnergyCore';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  'טיפול אוטומטי בלידים נכנסים',
  'חיבור בין טפסים, CRM ו-WhatsApp',
  'פחות כאוס, יותר שליטה',
];

const SUBTITLES = [
  'אני בונה מערכות שמחברות בין לידים, לקוחות ותהליכים, כך שכל פנייה מטופלת, הכל מתועד, והעסק עובד בצורה חלקה וברורה',
  'כל ליד שנכנס מטופל אוטומטית — CRM מתעדכן, WhatsApp נשלח, והסוכן מקבל התראה בשניות',
  'פחות עבודה ידנית, יותר תוצאות — מערכות שעובדות 24/7 ומונעות מלידים ליפול בין הכיסאות',
];

const HeroSection = () => {
  const { openPopup } = useContactPopup();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  // Cycle subtitle every 4.5s
  useEffect(() => {
    const id = setInterval(() => {
      setSubtitleVisible(false);
      setTimeout(() => {
        setSubtitleIdx(i => (i + 1) % SUBTITLES.length);
        setSubtitleVisible(true);
      }, 450);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Parallax orb on scroll
  useEffect(() => {
    if (!orbRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: -160,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const targets = [eyebrowRef.current, titleRef.current, subtitleRef.current, bulletsRef.current, ctaRef.current];
    gsap.set(targets, { opacity: 0, y: 32 });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = [eyebrowRef.current, titleRef.current, subtitleRef.current, bulletsRef.current, ctaRef.current];

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.9 });
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.45')
        .to(bulletsRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.3)' }, '-=0.3');
    }, sectionRef);

    const onScroll = () => {
      if (!contentRef.current) return;
      const progress = Math.min(window.scrollY / 320, 1);
      gsap.set(contentRef.current, {
        opacity: 1 - progress * 0.5,
        scale: 1 - progress * 0.03,
        y: -progress * 24,
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-[80vh] md:min-h-[85vh] flex flex-col relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background"
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* AI Energy Core */}
      <AiEnergyCore ref={orbRef} />

      {/* Cinematic ambient orbs */}
      <div className="pointer-events-none absolute -top-48 -right-48 w-[600px] h-[600px]">
        <div className="pointer-events-none w-full h-full rounded-full bg-primary/[0.08] blur-[120px] animate-orb-1" />
      </div>
      <div className="pointer-events-none absolute -bottom-48 -left-48 w-[500px] h-[500px]">
        <div className="pointer-events-none w-full h-full rounded-full bg-secondary/[0.06] blur-[100px] animate-orb-2" />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]">
        <div className="pointer-events-none w-full h-full rounded-full bg-primary/[0.04] blur-[100px] animate-orb-3" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="container relative z-10 pt-16 md:pt-24 pb-8">
        <div className="max-w-3xl mx-auto text-center">

          <div ref={eyebrowRef} className="text-technical mb-6">
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            הכל עובד. גם כשאתה לא.
          </h1>

          {/* Cycling subtitle */}
          <div ref={subtitleRef} style={{ minHeight: '4rem' }}>
            <p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto transition-opacity duration-[400ms]"
              style={{ opacity: subtitleVisible ? 1 : 0 }}
            >
              {SUBTITLES[subtitleIdx]}
            </p>
          </div>

          <div ref={bulletsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={openPopup} className="cta-gradient group">
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex-1 flex items-center overflow-hidden">
        <HeroAutomationFlow />
      </div>

      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

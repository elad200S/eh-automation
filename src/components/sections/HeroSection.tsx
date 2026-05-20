import { ArrowLeft } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AiEnergyCore from '@/components/AiEnergyCore';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { useMagnet } from '@/hooks/useMagnet';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUBTITLES = [
  'מערכות שמחברות לידים, לקוחות ותהליכים — כל פנייה מטופלת, הכל מתועד',
  'כל ליד שנכנס מטופל אוטומטית — CRM מתעדכן, WhatsApp נשלח בשניות',
  'מערכות שעובדות 24/7 ומונעות מלידים ליפול בין הכיסאות',
];

const TITLE_WORDS = ['הכל', 'עובד', 'גם', 'כשאתה', 'לא'];

const HeroSection = () => {
  const { openPopup } = useContactPopup();
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const orbRef      = useRef<HTMLDivElement>(null);
  const ambientRef  = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const magnetRef = useMagnet<HTMLButtonElement>(0.28, 95);

  const [subtitleIdx,     setSubtitleIdx]     = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setSubtitleVisible(false);
      setTimeout(() => {
        setSubtitleIdx(i => (i + 1) % SUBTITLES.length);
        setSubtitleVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Cursor-reactive ambient orbs
  useEffect(() => {
    if (!ambientRef.current) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 32;
      gsap.to(ambientRef.current, { x, y, duration: 2.4, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Parallax orb on scroll
  useEffect(() => {
    if (!orbRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: -180,
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

  // Set initial hidden states before paint
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(words, { y: '115%' });
    gsap.set([eyebrowRef.current, subtitleRef.current, ctaRef.current, scrollHintRef.current], {
      opacity: 0, y: 28,
    });
  }, []);

  // Entrance animation
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words   = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (reduced) {
      gsap.set(words, { y: '0%' });
      gsap.set([eyebrowRef.current, subtitleRef.current, ctaRef.current, scrollHintRef.current], {
        opacity: 1, y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.9 });
      tl.to(eyebrowRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        .to(words,                { y: '0%', duration: 1.0, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
        .to(subtitleRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .to(ctaRef.current,       { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.3)' }, '-=0.45')
        .to(scrollHintRef.current,{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }, sectionRef);

    // Subtle scroll-out on the content block
    const onScroll = () => {
      if (!contentRef.current) return;
      const progress = Math.min(window.scrollY / 380, 1);
      gsap.set(contentRef.current, {
        opacity: 1 - progress * 0.55,
        y:       -progress * 30,
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
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/40 via-transparent to-transparent pointer-events-none" />

      {/* AI Energy Core */}
      <AiEnergyCore ref={orbRef} />

      {/* Cursor-reactive ambient orbs */}
      <div ref={ambientRef} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-64 -right-64 w-[700px] h-[700px]">
          <div className="w-full h-full rounded-full bg-primary/[0.07] blur-[140px] animate-orb-1" />
        </div>
        <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px]">
          <div className="w-full h-full rounded-full bg-secondary/[0.05] blur-[120px] animate-orb-2" />
        </div>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="text-technical mb-8 tracking-widest">
            <span className="text-primary font-semibold">//</span>&nbsp; AI Automation Studio
          </div>

          {/* Word-split headline */}
          <h1
            className="font-bold text-foreground mb-8 leading-[1.02]"
            style={{ fontSize: 'clamp(3rem, 8.5vw, 7.2rem)', letterSpacing: '-0.04em' }}
          >
            {TITLE_WORDS.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden leading-[1.1] mx-[0.15em] my-1">
                <span ref={el => { wordRefs.current[i] = el; }} className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Cycling subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed transition-opacity duration-[380ms]"
            style={{ opacity: subtitleVisible ? 1 : 0 }}
          >
            {SUBTITLES[subtitleIdx]}
          </p>

          {/* Single CTA */}
          <div ref={ctaRef}>
            <button ref={magnetRef} onClick={openPopup} className="cta-gradient group text-xl px-10 py-5">
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent animate-pulse" />
      </div>

      {/* Right edge accent line */}
      <div className="absolute bottom-0 right-0 w-px h-40 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

import { ArrowLeft } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { lazy, Suspense } from 'react';
const EnergyCore = lazy(() => import('@/components/EnergyCore'));
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

const TITLE_WORDS = ['Everything', 'works', 'even', 'when', "you don't."];

const HeroSection = () => {
  const { openPopup } = useContactPopup();
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const orbRef      = useRef<HTMLDivElement>(null);
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

  // Parallax orb on scroll
  useEffect(() => {
    if (!orbRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: -260,
        scale: 0.82,
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

      // Per-word cascade exit — each word sinks back through its overflow-hidden mask
      const exitWords = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=520',
          scrub: 1.4,
        },
      });

      exitTl.to(
        [eyebrowRef.current, subtitleRef.current, ctaRef.current, scrollHintRef.current],
        { opacity: 0, y: 44, ease: 'none', duration: 0.4 },
        0
      );

      exitWords.forEach((word, i) => {
        exitTl.to(word, { y: '115%', ease: 'none', duration: 0.45 }, i * 0.08);
      });
    }, sectionRef);

    return () => ctx.revert();
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

      {/* Ambient glow — behind core */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 820, height: 820,
          left: '50%', top: '50%',
          marginLeft: -410, marginTop: -410,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(6,182,212,0.06) 35%, transparent 68%)',
          filter: 'blur(80px)',
        }}
      />

      {/* 3D Energy Core — dominant hero centerpiece */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 'min(88vmin, 740px)',
          height: 'min(88vmin, 740px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        {/* GSAP parallax target */}
        <div ref={orbRef} style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <EnergyCore />
          </Suspense>
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
            dir="ltr"
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

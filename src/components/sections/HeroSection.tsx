import { ArrowLeft } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense, useCallback } from 'react';
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
  'פניות מהאתר, מוואטסאפ ומהרשתות — מגיעות ישר לצינור המכירה שלך',
  'הבוט עונה, ה-CRM מתעדכן, ואתה ממוקד רק בסגירות',
];

const TICKER_ITEMS = [
  'מענה אוטומטי לכל ליד',
  'אפס פניות שנשכחות',
  'CRM מתעדכן בשניות',
  '24/7 ללא הפסקה',
  'WhatsApp אוטומטי',
  'זמן תגובה של שניות',
  'פולו-אפ ללא טעויות',
  'תהליכים שעובדים לבד',
  'אוטומציה מיום ראשון',
  'אינטגרציות ללא קוד',
];

const LINES = [
  { text: 'Everything', weight: 800, color: 'inherit' },
  { text: 'works',      weight: 300, color: 'hsl(215,20%,58%)' },
  { text: 'even when',  weight: 800, color: 'inherit' },
  { text: "you don't.", weight: 300, color: 'hsl(160,84%,52%)' },
];

const duplicatedTicker = [...TICKER_ITEMS, ...TICKER_ITEMS];

const HeroSection = () => {
  const { openPopup } = useContactPopup();
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const lineRefs     = useRef<(HTMLSpanElement | null)[]>([]);

  const tickerScrollRef  = useRef<HTMLDivElement>(null);
  const tickerAnimRef    = useRef<number>();
  const tickerPosRef     = useRef(0);

  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [subtitleKey, setSubtitleKey] = useState(0);
  const magnetRef = useMagnet<HTMLButtonElement>(0.28, 95);

  useEffect(() => {
    const id = setInterval(() => {
      setSubtitleIdx(i => (i + 1) % SUBTITLES.length);
      setSubtitleKey(k => k + 1);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Ticker scroll via RAF
  useEffect(() => {
    const el = tickerScrollRef.current;
    if (!el) return;
    const speed = 0.7;
    const animate = () => {
      tickerPosRef.current += speed;
      if (tickerPosRef.current >= el.scrollWidth / 2) tickerPosRef.current = 0;
      el.scrollLeft = tickerPosRef.current;
      tickerAnimRef.current = requestAnimationFrame(animate);
    };
    tickerAnimRef.current = requestAnimationFrame(animate);
    return () => { if (tickerAnimRef.current) cancelAnimationFrame(tickerAnimRef.current); };
  }, []);

  // Set hidden states before paint
  useLayoutEffect(() => {
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set([...lines, eyebrowRef.current, subtitleRef.current, ctaRef.current], { opacity: 0, y: 32 });
    gsap.set(orbRef.current, { opacity: 0, x: -40 });
  }, []);

  // Entrance + exit animations
  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(orbRef.current,      { opacity: 1, x: 0, duration: 1.4, ease: 'power3.out' }, 0)
        .to(eyebrowRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.4)
        .to(lines,               { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.6)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.1)
        .to(ctaRef.current,      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.3);

      // Orb parallax
      gsap.to(orbRef.current, {
        y: -180, scale: 0.88, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col relative overflow-hidden"
      dir="rtl"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Top ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/6 via-transparent to-transparent pointer-events-none" />

      {/* ── Main content ── */}
      <div className="container flex-1 flex items-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-10 py-24 md:py-0 md:gap-0">

          {/* Text column — right in RTL */}
          <div className="flex-1 flex flex-col items-start text-right z-10">

            {/* Eyebrow badge */}
            <div ref={eyebrowRef} className="mb-10">
              <span
                className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.14em] uppercase"
                style={{
                  border: '1px solid hsl(160,84%,39%,0.3)',
                  borderRadius: 100,
                  padding: '7px 18px',
                  color: 'hsl(160,84%,62%)',
                  background: 'hsl(160,84%,39%,0.05)',
                  boxShadow: '0 0 22px hsl(160,84%,39%,0.1), inset 0 0 12px hsl(160,84%,39%,0.04)',
                }}
              >
                <span
                  style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'hsl(160,84%,50%)',
                    boxShadow: '0 0 8px hsl(160,84%,50%)',
                    display: 'inline-block',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                AI Automation Studio
              </span>
            </div>

            {/* Headline — line-by-line reveal */}
            <h1
              dir="ltr"
              className="text-foreground mb-10"
              style={{
                fontSize: 'clamp(3rem, 7.2vw, 6.6rem)',
                letterSpacing: '-0.045em',
                lineHeight: 1.0,
              }}
            >
              {LINES.map((line, i) => (
                <span
                  key={i}
                  className="block"
                  style={{ lineHeight: 1.08, paddingBottom: '0.04em' }}
                >
                  <span
                    ref={el => { lineRefs.current[i] = el; }}
                    className="block"
                    style={{ fontWeight: line.weight, color: line.color }}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <div ref={subtitleRef} className="overflow-hidden mb-12" dir="rtl">
              <p
                key={subtitleKey}
                className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
                style={{ animation: 'subtitle-reveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both' }}
              >
                {SUBTITLES[subtitleIdx]}
              </p>
            </div>

            {/* CTA */}
            <div ref={ctaRef}>
              <button ref={magnetRef} onClick={openPopup} className="cta-gradient group text-lg px-9 py-5">
                בדיקת התאמה לעסק
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Visual column — left in RTL (desktop only) */}
          <div
            ref={orbRef}
            className="hidden md:flex flex-none items-center justify-center relative"
            style={{
              width: 'min(44vw, 520px)',
              height: 'min(44vw, 520px)',
            }}
          >
            {/* Ambient glow behind orb */}
            <div style={{
              position: 'absolute',
              inset: -80,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.13) 0%, rgba(6,182,212,0.07) 40%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }} />
            <Suspense fallback={null}>
              <EnergyCore />
            </Suspense>
          </div>

          {/* Mobile: orb behind text */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.22 }}>
            <div style={{ width: '92vmin', height: '92vmin' }}>
              <Suspense fallback={null}>
                <EnergyCore />
              </Suspense>
            </div>
          </div>

        </div>
      </div>

      {/* ── Ticker strip ── */}
      <div
        style={{
          borderTop: '1px solid hsl(220,15%,16%)',
          background: 'hsla(220,15%,10%,0.55)',
          backdropFilter: 'blur(8px)',
          padding: '11px 0',
          position: 'relative',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div
          ref={tickerScrollRef}
          style={{ overflow: 'hidden', direction: 'ltr' }}
        >
          <div style={{ display: 'flex', width: 'max-content' }}>
            {duplicatedTicker.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.72rem',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    color: 'hsl(215,20%,52%)',
                    whiteSpace: 'nowrap',
                    padding: '0 28px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item}
                </span>
                <span style={{ color: 'hsl(160,84%,35%)', fontSize: '0.45rem', flexShrink: 0 }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

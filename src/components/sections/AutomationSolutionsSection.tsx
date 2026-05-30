import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react';
import { Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import RevealText from '@/components/RevealText';
import ScrambleText from '@/components/ScrambleText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  { Icon: Bot,           tag: '01', color: '#10b981', title: 'סוכני AI חכמים',      description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים באופן מלא.' },
  { Icon: Zap,           tag: '02', color: '#facc15', title: 'אוטומציה עסקית',      description: 'ביטול משימות ידניות וייעול תהליכים — כדי שתתמקד במה שמכניס כסף.' },
  { Icon: MessageCircle, tag: '03', color: '#4ade80', title: 'WhatsApp אוטומטי',   description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות אישית.' },
  { Icon: GitBranch,     tag: '04', color: '#38bdf8', title: 'אוטומציית CRM',       description: 'תהליכי CRM שמוודאים שאף ליד לא נופל בין הכיסאות.' },
  { Icon: Workflow,      tag: '05', color: '#fb923c', title: 'תהליכי עבודה חכמים', description: 'מיפוי ואוטומציה של דוחות, אישורים ועדכונים בצוות.' },
  { Icon: BarChart3,     tag: '06', color: '#c084fc', title: 'דוחות וניתוח נתונים', description: 'מעקב אוטומטי אחרי ביצועים והפקת תובנות לעסק בזמן אמת.' },
  { Icon: Globe,         tag: '07', color: '#60a5fa', title: 'בניית אתרים',         description: 'אתרים מודרניים, מהירים ומותאמים — מחוברים לאוטומציות מהיום הראשון.', featured: true },
];

const AutomationSolutionsSection = () => {
  const sectionRef      = useRef<HTMLElement>(null);
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null, null]);
  const mobileCardRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null, null]);
  const dotRefs         = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null, null]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (window.innerWidth < 768) {
      mobileCardRefs.current.forEach((c, i) => {
        if (c) gsap.set(c, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.93, zIndex: i === 0 ? 30 : 20 });
      });
    } else {
      const cards = desktopCardRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(cards, { opacity: 0, y: 44 });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (reduced) {
      [...desktopCardRefs.current, ...mobileCardRefs.current]
        .filter(Boolean)
        .forEach(c => c && gsap.set(c, { opacity: 1, y: 0, scale: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      if (isMobile) {
        const cards = mobileCardRefs.current;
        const dots  = dotRefs.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            start: 'top top',
            end: '+=2400',
            scrub: 1.0,
          },
        });

        for (let i = 0; i < 6; i++) {
          const start = 0.08 + i * 0.14;
          const mid   = start + 0.045;
          const inS   = mid + 0.001;

          tl.to(cards[i],   { scale: 0.82, opacity: 0, ease: 'none', duration: 0.09 }, start)
            .to(dots[i],    { width: 6, opacity: 0.25, ease: 'none', duration: 0.09 }, start)
            .to(cards[i],   { zIndex: 5,   duration: 0.001, ease: 'none' }, mid)
            .to(cards[i+1], { zIndex: 100, duration: 0.001, ease: 'none' }, mid)
            .to(cards[i+1], { scale: 1, opacity: 1, ease: 'none', duration: 0.09 }, inS)
            .to(dots[i+1],  { width: 20, opacity: 1, ease: 'none', duration: 0.09 }, inS);
        }

        tl.to({}, {}, 1.0);
        return;
      }

      // Desktop: reveal in rows using fromTo for reliable scrub
      const [c0, c1, c2, c3, c4, c5, c6] = desktopCardRefs.current;
      const from = { opacity: 0, y: 44 };
      const to   = { opacity: 1, y: 0, ease: 'none' };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: '+=2000',
          scrub: 1.2,
        },
      });

      tl.fromTo([c0, c1], from, to, 0.05)
        .fromTo([c2, c3], from, to, 0.33)
        .fromTo([c4, c5], from, to, 0.60)
        .fromTo(c6,       from, to, 0.82);
    });

    return () => ctx.revert();
  }, []);

  const handleTilt = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const x  = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y  = ((e.clientY - r.top)  / r.height - 0.5) * 8;
    gsap.to(el, { rotateY: x, rotateX: -y, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
  };

  const resetTilt = (e: MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <section ref={sectionRef} id="automation-solutions" className="py-14 md:py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">
              <ScrambleText text="מה אנחנו בונים" />
            </p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              פתרונות אוטומציה לעסקים
            </RevealText>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              7 תחומי ליבה שבהם האוטומציה משנה את הדרך שבה העסק שלך עובד
            </p>
          </div>

          {/* ── Mobile: stacked cards ───────────────────────── */}
          <div className="md:hidden">
            <div className="flex justify-center items-center gap-1.5 mb-6">
              {solutions.map((_, i) => (
                <div
                  key={i}
                  ref={el => { dotRefs.current[i] = el; }}
                  className="h-1.5 rounded-full transition-none"
                  style={{ width: i === 0 ? 20 : 6, opacity: i === 0 ? 1 : 0.25, background: 'hsl(160,84%,39%)' }}
                />
              ))}
            </div>

            <div className="relative" style={{ minHeight: 220 }}>
              <div className="absolute rounded-2xl border border-border/20 bg-card/25 pointer-events-none"
                style={{ inset: 0, transform: 'translateY(10px) scale(0.94)', zIndex: 1 }} />
              <div className="absolute rounded-2xl border border-border/35 bg-card/40 pointer-events-none"
                style={{ inset: 0, transform: 'translateY(5px) scale(0.97)', zIndex: 2 }} />

              {solutions.map((sol, index) => {
                const SolIcon = sol.Icon;
                return (
                  <div
                    key={index}
                    ref={el => { mobileCardRefs.current[index] = el; }}
                    className="absolute inset-0 rounded-2xl border border-border/60 p-6 overflow-hidden"
                    style={{ background: 'hsl(var(--card))', boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)' }}
                  >
                    <div className="absolute top-0 left-6 right-6 h-px"
                      style={{ background: `linear-gradient(to right, transparent, ${sol.color}80, transparent)` }} />
                    <div className="absolute top-1 right-3 font-mono font-black pointer-events-none select-none"
                      style={{ fontSize: 80, color: `${sol.color}12`, lineHeight: 1 }}>{sol.tag}</div>

                    <div className="relative pt-2" dir="rtl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${sol.color}18` }}>
                          <SolIcon className="w-5 h-5" style={{ color: sol.color }} />
                        </div>
                        <span className="text-xs font-mono font-bold tracking-widest" style={{ color: `${sol.color}80` }}>
                          {sol.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2">{sol.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Desktop: 2-column grid ──────────────────────── */}
          <div className="hidden md:grid md:grid-cols-2 gap-5">
            {solutions.map((sol, index) => {
              const SolIcon = sol.Icon;
              const isFeatured = !!sol.featured;
              return (
                <div
                  key={index}
                  ref={el => { desktopCardRefs.current[index] = el; }}
                  className={cn(
                    'group relative bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300',
                    isFeatured && 'md:col-span-2'
                  )}
                  style={{
                    perspective: '800px',
                    border: `1px solid ${sol.color}28`,
                    transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
                  }}
                  onMouseMove={(e) => {
                    handleTilt(e);
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${sol.color}55`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px ${sol.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    resetTilt(e);
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${sol.color}28`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Static ambient gradient */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${sol.color}0e, transparent 65%)` }} />
                  {/* Hover gradient (stronger) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${sol.color}1a, transparent 60%)` }} />
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, ${sol.color}70, transparent)` }} />
                  {/* Watermark number */}
                  <div className="absolute bottom-2 left-4 font-mono font-black pointer-events-none select-none"
                    style={{ fontSize: 72, color: `${sol.color}0c`, lineHeight: 1 }}>{sol.tag}</div>

                  <div className={cn('relative p-7', isFeatured && 'flex items-center gap-6')} dir="rtl">
                    <div className={cn('flex items-center gap-3 flex-shrink-0', !isFeatured && 'mb-5')}>
                      <div
                        className={cn(
                          'rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                          isFeatured ? 'w-14 h-14' : 'w-12 h-12'
                        )}
                        style={{
                          background: `${sol.color}20`,
                          boxShadow: `0 0 18px ${sol.color}25`,
                        }}
                      >
                        <SolIcon className={isFeatured ? 'w-7 h-7' : 'w-6 h-6'} style={{ color: sol.color }} />
                      </div>
                      {!isFeatured && (
                        <span className="text-xs font-mono font-bold tracking-widest" style={{ color: `${sol.color}60` }}>
                          {sol.tag}
                        </span>
                      )}
                    </div>

                    <div className={cn(isFeatured && 'flex-1')}>
                      <h3 className={cn('font-semibold text-foreground mb-2', isFeatured ? 'text-lg' : 'text-base')}>
                        {sol.title}
                      </h3>
                      <p className={cn('text-muted-foreground leading-relaxed text-sm', isFeatured && 'max-w-xl')}>
                        {sol.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AutomationSolutionsSection;

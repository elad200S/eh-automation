import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import { useRef, useState, useEffect, type RefObject } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import RevealText from '@/components/RevealText';
import ScrambleText from '@/components/ScrambleText';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים.',
    href: '/solutions/ai-agents',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
    accent: 'hsl(160,84%,39%)',
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'ביטול משימות ידניות וייעול תהליכים בעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/15',
    accent: '#facc15',
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות.',
    href: '/solutions/whatsapp-automation',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/15',
    accent: '#4ade80',
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'תהליכי CRM שמוודאים שאף ליד לא נופל בין הכיסאות.',
    href: '/solutions/crm-automation',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-400/15',
    accent: '#38bdf8',
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של דוחות, אישורים ועדכונים.',
    href: '/solutions/workflow-automation',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/15',
    accent: '#fb923c',
  },
  {
    icon: BarChart3,
    title: 'דוחות וניתוח נתונים',
    description: 'מעקב אוטומטי אחרי ביצועים והפקת תובנות לעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/15',
    accent: '#c084fc',
  },
  {
    icon: Globe,
    title: 'בניית אתרים',
    description: 'אתרים מודרניים, מהירים ומותאמים לעסק — מהתכנון ועד ההשקה. מחוברים לאוטומציות מהיום הראשון.',
    href: '/solutions/web-development',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/15',
    accent: '#60a5fa',
  },
];

type Solution = typeof solutions[number];

/**
 * Manually computed "pin" state, in place of native CSS `position: sticky`.
 *
 * This site's global CSS sets `overflow-x: hidden` on both <html> and <body>
 * without a matching `overflow-y`, which (per the CSS spec) makes the browser
 * implicitly treat their overflow-y as `auto` — turning <body> into its own
 * independent scroll container, nested inside <html>. Native `position: sticky`
 * resolves against that nearest scrolling ancestor (<body>), which barely moves
 * relative to the real scroll — so sticky elements never pin correctly anywhere
 * on this site. That's a pre-existing, site-wide quirk; fixing it globally is
 * out of scope here, so this computes the equivalent of sticky manually from
 * `getBoundingClientRect()` (always viewport-relative, unaffected by which
 * ancestor "owns" the scroll) and pins via `position: fixed` instead.
 *
 * Important: this only works correctly if no ANCESTOR of the pinned element has
 * a CSS `transform` applied (that would change `position: fixed`'s containing
 * block). That's why this section no longer uses the shared `Section` wrapper
 * or `CinematicReveal` — both apply scroll-driven transforms to their contents.
 */
const usePinState = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [state, setState] = useState<'before' | 'pinned' | 'after'>('before');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top > 0) setState('before');
      else if (rect.bottom <= window.innerHeight) setState('after');
      else setState('pinned');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return state;
};

/** Fixed ambient backdrop behind the stacking cards — faded in only while this area is in view. */
const PinnedBackdrop = ({ areaRef }: { areaRef: RefObject<HTMLElement> }) => {
  const isInView = useInView(areaRef, { margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-white/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[140px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary))_0%,transparent_70%)]" />
    </motion.div>
  );
};

/**
 * One stacking solution card. Every card is absolutely stacked in the same
 * spot; card i slides up into place during card (i-1)'s segment, then itself
 * shrinks + darkens during its own segment as card (i+1) arrives on top of it.
 */
const StackCard = ({
  solution: s,
  index,
  total,
  scrollYProgress,
}: {
  solution: Solution;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const seg = 1 / total;
  const segStart = index * seg;
  const segEnd = (index + 1) * seg;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const y = useTransform(
    scrollYProgress,
    isFirst ? [0, seg] : [segStart - seg, segStart],
    isFirst ? ['0dvh', '0dvh'] : ['100dvh', '0dvh']
  );
  const scale = useTransform(scrollYProgress, [segStart, segEnd], isLast ? [1, 1] : [1, 0.92]);
  const scrimOpacity = useTransform(scrollYProgress, [segStart, segEnd], isLast ? [0, 0] : [0, 0.45]);

  return (
    <motion.div
      style={prefersReducedMotion ? { zIndex: index } : { y, scale, zIndex: index }}
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
    >
      <Link
        to={s.href}
        className="group relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden p-6 sm:p-10"
      >
        {/* Accent glow */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${s.accent}18, transparent 60%)` }}
        />
        {/* Thin glowing border */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40` }}
        />
        {/* Soft darkening scrim as the next card is about to cover this one */}
        {!isLast && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none bg-black"
            style={{ opacity: scrimOpacity }}
          />
        )}

        <div className="relative flex items-start gap-4" dir="rtl">
          <div className={cn('rounded-xl flex items-center justify-center flex-shrink-0 w-14 h-14', s.iconBg)}>
            <s.icon className={cn('w-7 h-7', s.iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-mono text-xs text-muted-foreground/50">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 mb-2">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.description}</p>
          </div>
          <ArrowLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
        </div>
      </Link>
    </motion.div>
  );
};

const SolutionsOverviewSection = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });
  const pinState = usePinState(stackRef);

  return (
    // Deliberately not using the shared `Section` wrapper or `CinematicReveal` here —
    // both apply scroll-driven transforms to their contents, which would break the
    // `position: fixed` pin below (see usePinState's comment).
    <section id="solutions-overview" className="relative py-10 md:py-14">
      <div className="container">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="text-center md:text-right flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3 text-center">
              <ScrambleText text="מה אנחנו בונים" />
            </p>
            <RevealText className="text-4xl md:text-5xl font-bold text-foreground">
              פתרונות אוטומציה לעסקים
            </RevealText>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mx-auto md:mx-0 flex-shrink-0"
          >
            לכל הפתרונות
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stacking cards — each sticks below the header, then the next one covers it.
          60dvh per card (not 100dvh) keeps the pinned viewport at a full screen while
          shortening how much scrolling each card-to-card transition takes. */}
      <div ref={stackRef} className="relative" style={{ height: `${solutions.length * 60}dvh` }}>
        <PinnedBackdrop areaRef={stackRef} />
        <div
          className="overflow-hidden"
          style={
            pinState === 'pinned'
              ? { position: 'fixed', top: 0, left: 0, right: 0, height: '100dvh' }
              : {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '100dvh',
                  [pinState === 'before' ? 'top' : 'bottom']: 0,
                }
          }
        >
          {solutions.map((s, i) => (
            <StackCard key={i} solution={s} index={i} total={solutions.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsOverviewSection;

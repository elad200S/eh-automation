import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
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

/** Fixed ambient backdrop behind the stacking cards — faded in only while the stack is in view. */
const PinnedBackdrop = ({ areaRef }: { areaRef: React.RefObject<HTMLElement> }) => {
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

/** Static card used for the prefers-reduced-motion fallback — plain list, no scroll effects. */
const StaticCard = ({ solution: s }: { solution: Solution }) => (
  <Link
    to={s.href}
    className="group relative block w-full max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 bg-transparent sm:bg-black/40 sm:backdrop-blur-xl sm:border sm:border-white/10"
  >
    <div
      className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
      style={{ background: `radial-gradient(ellipse at top right, ${s.accent}18, transparent 60%)` }}
    />
    <div
      className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
      style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40` }}
    />
    <div className="relative flex items-start gap-4" dir="rtl">
      <div className={cn('rounded-xl flex items-center justify-center flex-shrink-0 w-14 h-14', s.iconBg)}>
        <s.icon className={cn('w-7 h-7', s.iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{s.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.description}</p>
      </div>
      <ArrowLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
    </div>
  </Link>
);

/**
 * One stacking solution card, built on native `position: sticky` (not a manual
 * scroll-position → fixed/absolute toggle).
 *
 * The sticky element is pinned near the top (`top: 10dvh`) at its own natural
 * height — deliberately NOT a `h-[100dvh]` box with flex-centering (or a
 * `translateY(-50%)` transform trick) inside it. Both of those add invisible
 * space around the actual card that isn't part of its real layout box, and
 * releasing a sticky element always costs exactly "its offset + its own
 * height" worth of scroll — so any invisible space you add gets scrolled
 * through as a real gap where nothing is on screen (a plain `100dvh` box costs
 * a full screen height of that; the transform trick still costs about half
 * the card's height, since the transform shifts what's painted without
 * shifting when the release itself is computed). Sizing the sticky element to
 * exactly the card's own box, with no transform involved, makes the layout
 * box and the painted card the same thing, so the release travel is just the
 * card's real footprint — nothing left to scroll through blank.
 *
 * That gap is invisible for every card except the last one anyway, because
 * the next card's wrapper starts exactly where this one's ends, so it's
 * already sliding up to fill the screen during this card's release. The last
 * card has no successor to do that, which is why its tail is where the gap
 * used to show up.
 *
 * The wrapper block being taller than the viewport (in `dvh`, so mobile
 * browser chrome show/hide doesn't shift it) is what creates the entrance
 * slide + dwell + release in the first place — the card is ordinary document
 * content until it reaches its sticky offset, then it's released once the
 * wrapper's end approaches, both purely driven by layout/scroll position, so
 * both directions (and touch scroll) are handled natively, not by JS state.
 *
 * z-index is explicit (not relied on via source order) because the inner
 * `motion.div`'s `transform` creates its own stacking context.
 */
const StackCard = ({ solution: s, index, total }: { solution: Solution; index: number; total: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0.72, 1], [1, 0.92]);
  const scrimOpacity = useTransform(scrollYProgress, [0.72, 1], [0, 0.45]);
  // Defensive fade for the last card only, in case a sliver of empty sticky
  // space is still left over after the height fix above (content that ends up
  // shorter than usual, etc.) — fully faded before release ends.
  const lastFadeOpacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]);

  return (
    // Taller wrapper = more scroll distance per card = slower stacking transition.
    <div ref={wrapRef} className="relative" style={{ height: isLast ? '170dvh' : '250dvh' }}>
      <div
        className="sticky px-4 sm:px-6"
        style={{ top: '10dvh', zIndex: index + 1 }}
      >
        <motion.div
          // will-change hints the browser to promote this to its own compositor
          // layer up front, instead of on first animation frame — combined with
          // dropping backdrop-blur on mobile below, this is what stops the
          // scroll-blocking jank (backdrop-filter is a full re-sample of
          // whatever's behind it, on every frame, for every stacked card that
          // has it — expensive on its own, worse layered under a moving transform).
          style={{ scale, opacity: isLast ? lastFadeOpacity : 1, willChange: 'transform, opacity' }}
          className="relative w-full max-w-2xl mx-auto"
        >
          <Link
            to={s.href}
            // Transparent, no blur, no border on mobile (default classes); the
            // glass-card look only kicks in from `sm:` up.
            className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 bg-transparent sm:bg-black/40 sm:backdrop-blur-xl sm:border sm:border-white/10"
          >
            {/* Accent glow + border glow — desktop only, part of the glass look */}
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
              style={{ background: `radial-gradient(ellipse at top right, ${s.accent}18, transparent 60%)` }}
            />
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none hidden sm:block"
              style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40` }}
            />
            {/* Soft darkening scrim as the next card is about to cover this one —
                plain opacity over a solid color, kept on mobile too: cheap to
                paint (no filter), and it's what sells the stacking depth. */}
            {!isLast && (
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none bg-black"
                style={{ opacity: scrimOpacity, willChange: 'opacity' }}
              />
            )}

            <div className="relative flex items-start gap-4" dir="rtl">
              <div className={cn('rounded-xl flex items-center justify-center flex-shrink-0 w-14 h-14', s.iconBg)}>
                <s.icon className={cn('w-7 h-7', s.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{s.description}</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const SolutionsOverviewSection = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    // Deliberately not using the shared `Section` wrapper or `CinematicReveal` here —
    // both apply scroll-driven transforms to their contents, and a transform on any
    // ancestor redefines the containing block that position:sticky resolves against.
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

      {prefersReducedMotion ? (
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-4">
            {solutions.map((s, i) => (
              <StaticCard key={i} solution={s} />
            ))}
          </div>
        </div>
      ) : (
        <div ref={stackRef} className="relative">
          <PinnedBackdrop areaRef={stackRef} />
          {solutions.map((s, i) => (
            <StackCard key={i} solution={s} index={i} total={solutions.length} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SolutionsOverviewSection;

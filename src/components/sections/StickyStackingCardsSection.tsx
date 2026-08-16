import { useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';

// TODO: replace with real content
const cards = [
  {
    title: 'אפיון ותכנון',
    description: 'מבינים את התהליך העסקי שלך לעומק, וממפים בדיוק איפה האוטומציה תיצור הכי הרבה ערך.',
    accent: '#12CBB0',
  },
  {
    title: 'בנייה והטמעה',
    description: 'בונים את המערכת בפועל, מחברים בין הכלים שלך, ובודקים שהכול עובד חלק לפני שעולים לאוויר.',
    accent: '#5DF5D1',
  },
  {
    title: 'הפעלה ובקרה',
    description: 'עוקבים אחרי ביצועים, מתקנים ומשפרים כל הזמן — כדי שהאוטומציה תמשיך לעבוד בשבילך.',
    accent: '#38bdf8',
  },
  {
    title: 'צמיחה מתמשכת',
    description: 'מוסיפים יכולות חדשות ככל שהעסק גדל, בלי לבנות הכול מחדש כל פעם.',
    accent: '#c084fc',
  },
];

type CardData = typeof cards[number];

/**
 * Ambient full-viewport background glow. Uses position: fixed as requested, but fades
 * in/out based on whether this section is actually in view — so it never leaks over
 * other sections above or below it on the page.
 */
const PinnedBackground = ({ sectionRef }: { sectionRef: RefObject<HTMLElement> }) => {
  const isInView = useInView(sectionRef, { margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary))_0%,transparent_70%)]" />
    </motion.div>
  );
};

/**
 * A single stacking card. Each card lives inside a wrapper taller than one screen
 * (except the last), so it has room to sit pinned (`position: sticky`) while the
 * NEXT card scrolls up and visually covers it — that scroll range is what drives
 * the scale-down + darken effect below.
 */
const StackCard = ({ card, index, isLast }: { card: CardData; index: number; isLast: boolean }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const filter = useTransform(brightness, (v) => `brightness(${v})`);

  return (
    <div ref={wrapperRef} className={isLast ? 'relative h-screen' : 'relative h-[160vh]'}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <motion.div
          style={isLast || prefersReducedMotion ? undefined : { scale, filter }}
          className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-10 md:p-14 overflow-hidden"
        >
          {/* Accent glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top right, ${card.accent}18, transparent 60%)` }}
          />
          {/* Thin glowing border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${card.accent}40` }}
          />

          <div className="relative" dir="rtl">
            <span className="font-mono text-xs text-muted-foreground/60">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-xl">
              {card.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StickyStackingCardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="sticky-stack" className="relative">
      <PinnedBackground sectionRef={sectionRef} />
      {cards.map((card, i) => (
        <StackCard key={i} card={card} index={i} isLast={i === cards.length - 1} />
      ))}
    </section>
  );
};

export default StickyStackingCardsSection;

import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Section from '@/components/Section';
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
    featured: true,
  },
];

type Solution = typeof solutions[number];

/** Ambient glow orb(s), scoped to this section, that shift position as the user scrolls past it. */
const StickyBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        style={prefersReducedMotion ? undefined : { y: y1 }}
        className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-25 bg-[radial-gradient(circle,hsl(var(--primary))_0%,transparent_70%)]"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: y2 }}
        className="absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full blur-[100px] opacity-20 bg-[radial-gradient(circle,hsl(var(--accent))_0%,transparent_70%)]"
      />
    </div>
  );
};

/** A single glassmorphism solution card with a staggered scroll-triggered entrance. */
const GlassCard = ({ solution: s, index }: { solution: Solution; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : Math.min(index, 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(s.featured && 'sm:col-span-2')}
    >
      <Link
        to={s.href}
        className={cn(
          'group relative block rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden',
          s.featured ? 'p-8' : 'p-6'
        )}
      >
        {/* Per-solution accent glow — stronger on featured */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at top right, ${s.accent}${s.featured ? '14' : '0d'}, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: `radial-gradient(ellipse at top right, ${s.accent}22, transparent 60%)`,
          }}
        />

        {/* Glowing 1px border — subtle always-on, intensifies on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${s.accent}40`, opacity: 0.35 }}
        />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${s.accent}90` }}
        />

        <div className={cn('relative flex items-start gap-4', s.featured ? 'flex-row' : '')} dir="rtl">
          {/* Icon */}
          <div className={cn(
            'rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
            s.iconBg,
            s.featured ? 'w-16 h-16' : 'w-12 h-12'
          )}>
            <s.icon className={cn(s.featured ? 'w-8 h-8' : 'w-6 h-6', s.iconColor)} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-semibold text-foreground mb-1.5 group-hover:text-white transition-colors',
              s.featured ? 'text-lg' : 'text-base'
            )}>
              {s.title}
            </h3>
            <p className={cn(
              'text-muted-foreground leading-relaxed',
              s.featured ? 'text-sm max-w-xl' : 'text-sm'
            )}>
              {s.description}
            </p>
          </div>

          {/* Arrow */}
          <ArrowLeft
            className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
          />
        </div>
      </Link>
    </motion.div>
  );
};

const SolutionsOverviewSection = () => {
  return (
    <Section id="solutions-overview">
      <div className="relative overflow-hidden max-w-5xl mx-auto">
        <StickyBackground />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
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

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {solutions.map((s, i) => (
              <GlassCard key={i} solution={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SolutionsOverviewSection;

import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3, Globe } from 'lucide-react';
import Section from '@/components/Section';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים.',
    href: '/solutions/ai-agents',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
    accent: 'hsl(160 84% 39%)',
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
    description: 'אתרים מודרניים, מהירים ומותאמים לעסק — מהתכנון ועד ההשקה.',
    href: '/solutions/web-development',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/15',
    accent: '#60a5fa',
  },
];

const STACK_OFFSET = 28;
const SCROLL_SPACE = 220;

const SolutionsOverviewSection = () => {
  const { ref: headerRef, style: headerStyle } = useScrollReveal<HTMLDivElement>(0);

  return (
    <Section id="solutions-overview" className="bg-background-secondary">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          style={headerStyle}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div className="text-center md:text-right flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3 text-center">מה אנחנו בונים</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              פתרונות אוטומציה לעסקים
            </h2>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mx-auto md:mx-0"
          >
            לכל הפתרונות
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Stacked cards */}
        <div className="relative max-w-2xl mx-auto">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="sticky"
              style={{
                top: `${88 + i * STACK_OFFSET}px`,
                zIndex: i + 1,
                marginBottom: i < solutions.length - 1 ? `${SCROLL_SPACE}px` : 0,
              }}
            >
              <Link
                to={s.href}
                className="group relative block w-full rounded-2xl border border-white/[0.07] bg-card/80 backdrop-blur-md p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/[0.16] overflow-hidden"
              >
                {/* Per-solution accent glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.05] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.10]"
                  style={{ background: `radial-gradient(ellipse at top right, ${s.accent}, transparent 65%)` }}
                />

                <div className="relative flex items-center gap-5" dir="rtl">
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
                    s.iconBg
                  )}>
                    <s.icon className={cn('w-7 h-7', s.iconColor)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <ArrowLeft className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300 flex-shrink-0" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionsOverviewSection;

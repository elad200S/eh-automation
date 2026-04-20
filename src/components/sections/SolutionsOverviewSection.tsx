import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Section from '@/components/Section';
import { cn } from '@/lib/utils';
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים.',
    href: '/solutions/ai-agents',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
    borderActive: 'border-primary/40',
    shadow: 'shadow-primary/10',
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'ביטול משימות ידניות וייעול תהליכים בעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/15',
    borderActive: 'border-yellow-400/40',
    shadow: 'shadow-yellow-400/10',
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות.',
    href: '/solutions/whatsapp-automation',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/15',
    borderActive: 'border-green-400/40',
    shadow: 'shadow-green-400/10',
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'תהליכי CRM שמוודאים שאף ליד לא נופל בין הכיסאות.',
    href: '/solutions/crm-automation',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/15',
    borderActive: 'border-secondary/40',
    shadow: 'shadow-secondary/10',
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של דוחות, אישורים ועדכונים.',
    href: '/solutions/workflow-automation',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/15',
    borderActive: 'border-accent/40',
    shadow: 'shadow-accent/10',
  },
  {
    icon: BarChart3,
    title: 'דוחות וניתוח נתונים',
    description: 'מעקב אוטומטי אחרי ביצועים והפקת תובנות לעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/15',
    borderActive: 'border-purple-400/40',
    shadow: 'shadow-purple-400/10',
  },
];

type Solution = typeof solutions[0];

const SolutionCard = ({ solution }: { solution: Solution }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [touchActive, setTouchActive] = useState(false);

  useEffect(() => {
    // Only activate scroll-based highlight on touch devices
    if (!window.matchMedia('(hover: none)').matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTouchActive(entry.isIntersecting),
      { threshold: 0.55, rootMargin: '-10% 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHighlighted = touchActive;

  return (
    <Link
      ref={ref}
      to={solution.href}
      className={cn(
        'group relative p-6 bg-card rounded-2xl border transition-all duration-300 overflow-hidden',
        isHighlighted
          ? `${solution.borderActive} -translate-y-1`
          : 'border-border hover:-translate-y-1',
        `hover:${solution.borderActive}`
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300',
          solution.iconBg,
          isHighlighted ? 'scale-110' : 'group-hover:scale-110'
        )}
      >
        <solution.icon className={cn('w-6 h-6', solution.iconColor)} />
      </div>

      <h3 className={cn(
        'text-base font-semibold mb-2 transition-colors',
        isHighlighted ? 'text-white' : 'text-foreground group-hover:text-white'
      )}>
        {solution.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {solution.description}
      </p>
    </Link>
  );
};

const SolutionsOverviewSection = () => {
  const { ref: headerRef, style: headerStyle } = useScrollReveal<HTMLDivElement>(0);
  const { ref: gridRef, itemStyle } = useScrollRevealGroup(80);

  return (
    <Section id="solutions-overview">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} style={headerStyle} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="text-center md:text-right flex-1">
            <p className="text-sm font-medium text-primary mb-2">מה אנחנו בונים</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
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

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((solution, index) => (
            <div key={index} style={itemStyle(index)}>
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionsOverviewSection;

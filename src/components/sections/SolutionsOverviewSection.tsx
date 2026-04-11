import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow, BarChart3 } from 'lucide-react';
import Section from '@/components/Section';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות וטיפול בלידים.',
    href: '/solutions/ai-agents',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
    glowColor: 'hover:shadow-primary/10',
    borderHover: 'hover:border-primary/40',
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'ביטול משימות ידניות וייעול תהליכים בעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/15',
    glowColor: 'hover:shadow-yellow-400/10',
    borderHover: 'hover:border-yellow-400/40',
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות.',
    href: '/solutions/whatsapp-automation',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/15',
    glowColor: 'hover:shadow-green-400/10',
    borderHover: 'hover:border-green-400/40',
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'תהליכי CRM שמוודאים שאף ליד לא נופל בין הכיסאות.',
    href: '/solutions/crm-automation',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/15',
    glowColor: 'hover:shadow-secondary/10',
    borderHover: 'hover:border-secondary/40',
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של דוחות, אישורים ועדכונים.',
    href: '/solutions/workflow-automation',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/15',
    glowColor: 'hover:shadow-accent/10',
    borderHover: 'hover:border-accent/40',
  },
  {
    icon: BarChart3,
    title: 'דוחות וניתוח נתונים',
    description: 'מעקב אוטומטי אחרי ביצועים והפקת תובנות לעסק.',
    href: '/solutions/business-automation',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/15',
    glowColor: 'hover:shadow-purple-400/10',
    borderHover: 'hover:border-purple-400/40',
  },
];

const SolutionsOverviewSection = () => {
  return (
    <Section id="solutions-overview">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.href}
              className={`group relative p-6 bg-card rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${solution.glowColor} ${solution.borderHover} overflow-hidden`}
            >
              {/* subtle corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -translate-y-6 translate-x-6"
                style={{ background: `var(--tw-shadow-color, transparent)` }}
              />

              <div className={`w-12 h-12 rounded-xl ${solution.iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <solution.icon className={`w-6 h-6 ${solution.iconColor}`} />
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
                {solution.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SolutionsOverviewSection;

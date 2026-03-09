import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, MessageCircle, GitBranch, Workflow } from 'lucide-react';
import Section from '@/components/Section';

const solutions = [
  {
    icon: Bot,
    title: 'סוכני AI חכמים',
    description: 'בוטים חכמים שעובדים 24/7 – מענה ללקוחות, טיפול בלידים ואוטומציה של תהליכים.',
    href: '/solutions/ai-agents',
  },
  {
    icon: Zap,
    title: 'אוטומציה עסקית',
    description: 'מערכות שמחברות בין הכלים שלך, מבטלות משימות ידניות ומייעלות תהליכים.',
    href: '/solutions/business-automation',
  },
  {
    icon: MessageCircle,
    title: 'אוטומציית WhatsApp',
    description: 'מענה אוטומטי, ניהול לידים ושליחת הודעות מותאמות ללקוחות – הכל אוטומטית.',
    href: '/solutions/whatsapp-automation',
  },
  {
    icon: GitBranch,
    title: 'אוטומציית CRM',
    description: 'תהליכי CRM אוטומטיים שמוודאים שאף ליד לא נופל בין הכיסאות.',
    href: '/solutions/crm-automation',
  },
  {
    icon: Workflow,
    title: 'אוטומציית תהליכי עבודה',
    description: 'מיפוי ואוטומציה של תהליכים פנימיים – דוחות, אישורים ועדכונים אוטומטיים.',
    href: '/solutions/workflow-automation',
  },
];

const SolutionsOverviewSection = () => {
  return (
    <Section id="solutions-overview">
      <div className="max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-primary mb-2">מה אנחנו בונים</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              פתרונות אוטומציה לעסקים
            </h2>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <solution.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
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

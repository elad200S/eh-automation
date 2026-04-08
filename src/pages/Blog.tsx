import { Link } from 'react-router-dom';
import { Zap, Bot, Settings, BookOpen } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const categories = [
  { label: 'אוטומציה', icon: Zap, color: 'bg-primary/10 text-primary' },
  { label: 'סוכני AI', icon: Bot, color: 'bg-secondary/10 text-secondary' },
  { label: 'מערכות עסקיות', icon: Settings, color: 'bg-accent/10 text-accent' },
  { label: 'מדריכים', icon: BookOpen, color: 'bg-primary/10 text-primary' },
];

const articles = [
  {
    title: '5 תהליכים שכל עסק קטן צריך לאטמט היום',
    category: 'אוטומציה',
    excerpt: 'סקירה של התהליכים העסקיים הנפוצים ביותר שבהם אוטומציה יכולה לחסוך עשרות שעות בשבוע.',
    readTime: '5 דקות קריאה',
    href: '/blog/5-automation-processes',
  },
  {
    title: 'סוכן AI לעסק: מתי זה שווה ומתי לא',
    category: 'סוכני AI',
    excerpt: 'מדריך מעשי שעוזר לבעלי עסקים להבין אם סוכן AI מתאים לעסק שלהם – ומה הציפיות הריאליות.',
    readTime: '7 דקות קריאה',
    href: '/blog/ai-agent-for-business',
  },
  {
    title: 'איך לבחור CRM שבאמת ישתמשו בו',
    category: 'מערכות עסקיות',
    excerpt: 'הבעיה לא הכלי – הבעיה היא ההטמעה. טיפים מעשיים לבחירת CRM שהצוות שלך באמת ישתמש בו.',
    readTime: '6 דקות קריאה',
    href: '/blog/how-to-choose-crm',
  },
];

const Blog = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="בלוג אוטומציה עסקית | EH Automation"
        description="מאמרים, מדריכים וטיפים על אוטומציה עסקית, סוכני AI, מערכות CRM ותהליכי עבודה חכמים."
        path="/blog"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
      ]} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">בלוג</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">תובנות על אוטומציה ובינה מלאכותית</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                מאמרים מעשיים, מדריכים וטיפים שיעזרו לך להבין איך אוטומציה ו-AI יכולים לשנות את העסק שלך.
              </p>
            </div>
          </div>
        </section>

        <Section id="categories">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-foreground mb-6">קטגוריות</h2>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card cursor-default">
                  <cat.icon className={`w-4 h-4 ${cat.color.split(' ')[1]}`} />
                  <span className="text-sm font-medium text-foreground">{cat.label}</span>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-6">מאמרים אחרונים</h2>
            <div className="space-y-6">
              {articles.map((article, index) => (
                <Link key={index} to={article.href}>
                  <article className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{article.category}</span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                    <p className="text-xs text-primary font-medium mt-4">קראו עוד ←</p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Cross-links */}
            <nav aria-label="קישורים קשורים" className="mt-12 p-8 bg-muted/30 rounded-xl border border-border">
              <p className="text-muted-foreground mb-4">מאמרים חדשים מתווספים באופן שוטף.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/solutions" className="text-sm text-primary hover:underline">ראו את הפתרונות שלנו →</Link>
                <button onClick={openPopup} className="text-sm text-primary hover:underline">שאלו אותנו ישירות →</button>
              </div>
            </nav>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
};

export default Blog;

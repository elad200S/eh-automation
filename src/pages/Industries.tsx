import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Users, GraduationCap, Home, ShoppingCart } from 'lucide-react';
import { SEOHead } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const industries = [
  {
    icon: Building2,
    title: 'סוכנויות דיגיטל ושיווק',
    description: 'ניהול לקוחות, אונבורדינג, דוחות ומעקב פרויקטים – הכל אוטומטי.',
    href: '/industries/agencies',
    challenges: ['ניהול מספר לקוחות במקביל', 'דוחות ביצועים', 'אונבורדינג'],
  },
  {
    icon: Users,
    title: 'יועצים עסקיים',
    description: 'תיאום פגישות, מעקב לקוחות, שליחת הצעות מחיר ודוחות – הכל רץ אוטומטית.',
    href: '/industries/consultants',
    challenges: ['תיאום פגישות', 'מעקב לקוחות', 'הצעות מחיר'],
  },
  {
    icon: GraduationCap,
    title: 'מאמנים ומנטורים',
    description: 'מערכות שמנהלות את הלקוחות, שולחות תזכורות, גובות תשלומים ומטפלות בכל מה שלא קשור לאימון.',
    href: '/industries/coaches',
    challenges: ['ניהול מתאמנים', 'תזכורות', 'תשלומים'],
  },
  {
    icon: Home,
    title: 'נדל"ן',
    description: 'ניהול לידים, מעקב נכסים, שליחת עדכונים ללקוחות ותיאום סיורים – הכל אוטומטי.',
    href: '/industries/real-estate',
    challenges: ['ניהול לידים', 'מעקב נכסים', 'תיאום סיורים'],
  },
  {
    icon: ShoppingCart,
    title: 'מסחר אלקטרוני',
    description: 'מניהול הזמנות ומלאי ועד שיווק אוטומטי ושירות לקוחות.',
    href: '/industries/ecommerce',
    challenges: ['ניהול הזמנות', 'מלאי', 'שיווק אוטומטי'],
  },
];

const Industries = () => {
  return (
    <>
      <SEOHead
        title="אוטומציה לפי תעשייה | EH Automation"
        description="פתרונות אוטומציה מותאמים לתעשיות: סוכנויות, יועצים, מאמנים, נדל״ן ומסחר אלקטרוני."
        path="/industries"
      />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">תעשיות</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">אוטומציה מותאמת לתעשייה שלך</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                כל תעשייה פועלת אחרת. אנחנו מתאימים את הפתרונות בדיוק לאתגרים ולתהליכים הייחודיים של התחום שלך.
              </p>
            </div>
          </div>
        </section>

        <Section id="all-industries">
          <div className="max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6">
              {industries.map((industry, index) => (
                <Link key={index} to={industry.href} className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <industry.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{industry.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{industry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.challenges.map((c, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{c}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {/* Cross-links to solutions */}
            <nav aria-label="קישורים קשורים" className="mt-12 p-6 bg-muted/30 rounded-xl border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">מחפשים פתרון לפי סוג?</h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/solutions/ai-agents" className="text-sm text-primary hover:underline">סוכני AI</Link>
                <Link to="/solutions/business-automation" className="text-sm text-primary hover:underline">אוטומציה עסקית</Link>
                <Link to="/solutions/whatsapp-automation" className="text-sm text-primary hover:underline">אוטומציית WhatsApp</Link>
                <Link to="/solutions/crm-automation" className="text-sm text-primary hover:underline">אוטומציית CRM</Link>
                <Link to="/solutions/workflow-automation" className="text-sm text-primary hover:underline">תהליכי עבודה</Link>
              </div>
            </nav>
          </div>
        </Section>

        <section className="py-16 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">לא מצאתם את התעשייה שלכם?</h2>
            <p className="text-muted-foreground mb-8">אנחנו עובדים עם עסקים ממגוון תחומים. בואו נדבר על האתגרים הספציפיים שלכם.</p>
            <button onClick={openPopup} className="cta-gradient group">
              שיחת אסטרטגיה
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Industries;

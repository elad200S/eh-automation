import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Target, Zap } from 'lucide-react';
import { SEOHead } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const caseStudies = [
  {
    type: 'אוטומציה עסקית',
    icon: Zap,
    industry: 'חברת שירותים B2B',
    challenge: 'תהליכי ניהול לידים, הצעות מחיר ומעקב לקוחות היו ידניים לחלוטין. הצוות בזבז שעות על עבודה אדמיניסטרטיבית במקום למכור.',
    solution: 'בנייה של מערכת אוטומציה מלאה: קליטת לידים אוטומטית מטפסים ופרסום, סיווג והקצאה ל-CRM, הפקת הצעות מחיר אוטומטיות ומעקב שיטתי.',
    outcome: 'תוצאות יפורסמו לאחר השלמת הפרויקט',
    status: 'הושלם',
  },
  {
    type: 'סוכן AI + WhatsApp',
    icon: Building2,
    industry: 'סוכנות דיגיטל',
    challenge: 'פניות מלקוחות פוטנציאליים דרך WhatsApp לא קיבלו מענה מהיר. לידים איכותיים הלכו לאיבוד בגלל זמני תגובה ארוכים.',
    solution: 'הקמת סוכן AI שנותן מענה ראשוני מיידי ב-WhatsApp, מסווג לידים לפי פוטנציאל ומעביר רק לידים חמים לצוות האנושי.',
    outcome: 'תוצאות יפורסמו לאחר השלמת הפרויקט',
    status: 'בתהליך',
  },
  {
    type: 'אוטומציית תהליכי עבודה',
    icon: Target,
    industry: 'יועץ עסקי',
    challenge: 'תיאום פגישות, מעקב לקוחות ושליחת תזכורות נעשו ידנית. היועץ היה מוגבל ל-15 לקוחות פעילים בגלל עומס תפעולי.',
    solution: 'בניית מערכת CRM מותאמת, אוטומציית תיאום פגישות עם Calendly, תזכורות WhatsApp אוטומטיות ודוחות שבועיים.',
    outcome: 'תוצאות יפורסמו לאחר השלמת הפרויקט',
    status: 'הושלם',
  },
];

const CaseStudies = () => {
  return (
    <>
      <SEOHead
        title="מקרי בוחן | EH Automation"
        description="מקרי בוחן מפרויקטי אוטומציה עסקית ובינה מלאכותית – ראו איך עסקים אמיתיים שיפרו תהליכים עם EH Automation."
        path="/case-studies"
      />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">מקרי בוחן</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">פרויקטים אמיתיים, תוצאות אמיתיות</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                מקרי בוחן מפורטים שמראים איך בנינו מערכות אוטומציה לעסקים מתעשיות שונות.
              </p>
            </div>
          </div>
        </section>

        <Section id="case-studies">
          <div className="max-w-4xl">
            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <article key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <study.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-primary">{study.type}</span>
                        <p className="text-xs text-muted-foreground">{study.industry}</p>
                      </div>
                      <span className={`mr-auto px-3 py-1 rounded-full text-xs font-medium ${study.status === 'הושלם' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                        {study.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" />האתגר
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />הפתרון
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />תוצאה
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Cross-links */}
            <nav aria-label="קישורים קשורים" className="mt-12 p-8 bg-muted/30 rounded-xl border border-border text-center">
              <p className="text-muted-foreground mb-4">מקרי בוחן נוספים יתווספו בקרוב.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={openPopup} className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                  רוצים להיות מקרה הבוחן הבא?
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <Link to="/solutions" className="text-sm text-primary hover:underline">ראו את הפתרונות שלנו →</Link>
              </div>
            </nav>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
};

export default CaseStudies;

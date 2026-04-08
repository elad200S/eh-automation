import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const goodFor = [
  'עסק שמקבל שאלות חוזרות מלקוחות (מחיר, זמינות, תהליך)',
  'עסק שצריך לאסוף מידע מלקוחות לפני פגישה',
  'עסק שרוצה לתת מענה מהיר מחוץ לשעות העבודה',
  'עסק שמנהל תהליכי מכירה ארוכים עם הרבה נגיעות',
];

const notGoodFor = [
  'עסק שהמוצר שלו מורכב מאוד ודורש הסבר אנושי',
  'עסק ללא תוכן מסודר — סוכן AI צריך ידע כדי לענות',
  'עסק שהלקוחות שלו רגישים לאוטומציה ומצפים לאדם',
];

const AIAgentForBusiness = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לעסק: מתי זה שווה ומתי לא | EH Automation"
        description="מדריך מעשי שעוזר לבעלי עסקים להבין אם סוכן AI מתאים לעסק שלהם – ומה הציפיות הריאליות."
        path="/blog/ai-agent-for-business"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'סוכן AI לעסק', path: '/blog/ai-agent-for-business' },
      ]} />
      <ArticleSchema
        title="סוכן AI לעסק: מתי זה שווה ומתי לא"
        description="מדריך מעשי שעוזר לבעלי עסקים להבין אם סוכן AI מתאים לעסק שלהם – ומה הציפיות הריאליות."
        path="/blog/ai-agent-for-business"
        datePublished="2026-04-08"
      />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">סוכני AI</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />7 דקות קריאה</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                סוכן AI לעסק: מתי זה שווה ומתי לא
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                כולם מדברים על סוכני AI. אבל לא לכל עסק זה מתאים — ולא בכל שלב. מדריך ישיר שיעזור לך להחליט.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl">

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              סוכן AI הוא מערכת שיכולה לנהל שיחות, לענות על שאלות, לאסוף מידע ולבצע פעולות — בצורה אוטומטית ובלי שתהיה שם. זה יכול להיות בוט בווטסאפ, באתר, בטלגרם, או כלי פנימי לצוות. אבל לפני שמשקיעים — כדאי לשאול: האם זה באמת מתאים לי?
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-6">מתי סוכן AI שווה את ההשקעה</h2>
            <div className="space-y-3 mb-10">
              {goodFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6">מתי כדאי לחכות</h2>
            <div className="space-y-3 mb-10">
              {notGoodFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">ציפיות ריאליות</h2>
            <div className="p-6 bg-card rounded-xl border border-border mb-10">
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>• סוכן AI טוב <strong className="text-foreground">לא מחליף מוכר</strong> — הוא מסנן ומכין את הקרקע לפני השיחה האנושית</li>
                <li>• הוא צריך <strong className="text-foreground">תוכן ומידע כדי לעבוד</strong> — ככל שתזינו אותו טוב יותר, כך הוא יענה טוב יותר</li>
                <li>• <strong className="text-foreground">זמן הטמעה: שבוע עד שלושה</strong> — תלוי במורכבות העסק</li>
                <li>• <strong className="text-foreground">עלות חודשית</strong>: מ-200 עד 1,500 ₪, תלוי בנפח השיחות</li>
              </ul>
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">לא בטוח אם זה מתאים לעסק שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">בוא נדבר. שיחה קצרה ואדע להגיד לך ישירות אם זה שווה.</p>
              <button
                onClick={openPopup}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                קבעו שיחה עכשיו
              </button>
            </div>

          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
};

export default AIAgentForBusiness;

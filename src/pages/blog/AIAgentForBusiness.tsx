import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const AIAgentForBusiness = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לעסק: מתי זה שווה ומתי לא | EH Automation"
        description="מדריך מעשי שעוזר לבעלי עסקים להבין אם סוכן AI מתאים לעסק שלהם – ומה הציפיות הריאליות."
        path="/blog/ai-agent-for-business"
        type="article"
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
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">סוכני AI</span>
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
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              סוכן AI הוא מערכת שיכולה לנהל שיחות, לענות על שאלות, לאסוף מידע ולבצע פעולות — בצורה אוטומטית ובלי שתהיה שם. זה יכול להיות בוט בווטסאפ, באתר, בטלגרם, או כלי פנימי לצוות. הרעיון נשמע מושך, ובצדק — אבל לפני שמשקיעים, שווה לשאול שאלה אחת ישירה: האם זה באמת מתאים לעסק שלי?
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מתי סוכן AI שווה את ההשקעה</h2>
              <p className="mb-4">
                הדרך הטובה ביותר לדעת אם סוכן AI מתאים לעסק שלך היא לבדוק אם יש בו שאלות שחוזרות על עצמן. אם לקוחות שואלים אותך כל הזמן את אותן השאלות — "כמה זה עולה?", "מה כלול בשירות?", "מה זמן האספקה?" — סוכן AI יכול לענות על כולן בלעדיך, 24 שעות ביממה.
              </p>
              <p className="mb-4">
                תהליכי מכירה ארוכים מרוויחים במיוחד מסוכן AI. כשיש הרבה נגיעות בין הפנייה הראשונית לסגירה — איסוף פרטים, שליחת מידע, תזמון שיחות — הסוכן יכול לנהל את כל שלב הלפני, ולהעביר לך לקוח מוכן יותר לשיחה.
              </p>
              <p>
                גם עסקים שרוצים לתת מענה מחוץ לשעות העבודה מרוויחים כאן. ליד שפונה בשעה 10 בלילה לא צריך לחכות לבוקר — הסוכן מקבל אותו, אוסף מידע, ואתה מתעורר עם ליד מסודר שמחכה לשיחה.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מתי כדאי לחכות</h2>
              <p className="mb-4">
                יש מקרים שבהם סוכן AI לא רק שלא עוזר — הוא יכול להזיק. אם המוצר או השירות שלך מורכב ודורש הסבר אנושי כדי שלקוח יבין אותו לעומק, בוט שמנסה לענות עלול ליצור תסכול ולא עניין. הלקוח מרגיש שמנסים להתחמק ממנו, ולא לעזור לו.
              </p>
              <p className="mb-4">
                בעיה נפוצה נוספת היא עסקים שרוצים סוכן AI אבל אין להם תוכן מסודר לתת לו. סוכן AI לא ממציא תשובות מהאוויר — הוא צריך ידע: שאלות נפוצות, מחירון, תיאור שירותים, תהליכים. אם המידע הזה לא קיים בצורה מסודרת, ההטמעה תהיה ארוכה ויקרה יותר.
              </p>
              <p>
                יש גם קהלים שרגישים לאוטומציה ומצפים לאדם. בשירותים כמו ייעוץ אישי, טיפול, או שירות פרמיום — לקוח שמרגיש שמדברים איתו בוט עלול לאבד את האמון לפני שהשיחה האמיתית התחילה.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">ציפיות ריאליות</h2>
              <p className="mb-4">
                סוכן AI טוב לא מחליף מוכר — הוא מסנן ומכין את הקרקע לפני השיחה האנושית. הציפייה שבוט ינהל מכירה מורכבת מקצה לקצה לרוב לא מתממשת. אבל הציפייה שהוא יחסוך לך 3-5 שעות שבועיות של מענה ראשוני — ריאלית לחלוטין.
              </p>
              <p className="mb-4">
                זמן ההטמעה הוא בדרך כלל שבוע עד שלושה, תלוי במורכבות העסק ובכמות המידע שצריך להזין. העלות החודשית נעה בין 200 ל-1,500 שקל, תלוי בנפח השיחות ובפלטפורמה שנבחרת.
              </p>
              <p>
                הדבר החשוב ביותר להבין: ככל שמזינים לסוכן מידע טוב יותר — כך הוא עונה טוב יותר. ההשקעה בבניית בסיס הידע שלו בתחילת הדרך היא ההשקעה שמחזירה את עצמה הכי מהר.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות מה בדיוק כולל הפתרון? <Link to="/solutions/ai-agents" className="text-primary hover:underline font-medium">סוכני AI לעסקים</Link> — דוגמאות, יכולות ותהליך עבודה.
            </p>

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

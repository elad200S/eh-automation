import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'מה הכלי הכי טוב לאוטומציה עסקית לעסקים קטנים?', answer: 'לרוב העסקים הקטנים-בינוניים בישראל, Make.com הוא הבחירה הטובה ביותר: ₪39 לחודש, ממשק ויזואלי, מעל 1,500 אינטגרציות — ויכולות שמספיקות ל-90% מהתהליכים.' },
  { question: 'האם אפשר להשתמש ב-Zapier בחינם?', answer: 'כן, Zapier מציע תוכנית חינמית עם עד 100 פעולות בחודש ו-5 "Zaps". זה מספיק לניסוי אבל לא לשימוש עסקי שוטף.' },
  { question: 'האם n8n מתאים לעסק ללא מתכנת?', answer: 'בדרך כלל לא. n8n דורש הגדרה טכנית והתקנה על שרת. העסקים שמרוויחים ממנו הכי הרבה הם אלה עם מפתח פנימי או מומחה אוטומציה שמתחזק אותו.' },
  { question: 'מה ההבדל בין Make.com ל-Zapier מבחינת מחיר?', answer: 'Zapier עולה 3-5 פעמים יותר מ-Make.com על אותם נפחי פעולות. לעסק עם 10,000 פעולות בחודש: Zapier ~₪270+, Make.com ~₪39.' },
  { question: 'האם אפשר לעבור בין הכלים בקלות?', answer: 'המעבר דורש בנייה מחדש של האוטומציות — אין ייצוא אוטומטי בין הכלים. לכן חשוב לבחור נכון מהתחלה, בעיקר אם יש הרבה תהליכים.' },
];

const AutomationToolsComparison = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Make.com vs Zapier vs n8n — מה מתאים לעסק שלך? 2026 | HEY Digital"
        description="השוואה מעשית בין שלושת כלי האוטומציה הפופולריים ביותר לעסקים בישראל: מחיר, יכולות, קלות שימוש."
        path="/blog/automation-tools-comparison"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Make vs Zapier vs n8n', path: '/blog/automation-tools-comparison' },
      ]} />
      <ArticleSchema
        title="Make.com vs Zapier vs n8n — מה מתאים לעסק שלך? 2026"
        description="השוואה מעשית בין שלושת כלי האוטומציה הפופולריים ביותר לעסקים בישראל: מחיר, יכולות, קלות שימוש."
        path="/blog/automation-tools-comparison"
        datePublished="2026-06-08"
      />
      <FAQSchema items={faqItems} />

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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">כלי אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Make.com vs Zapier vs n8n — מה מתאים לעסק שלך?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                שלושת הכלים האלה שולטים בשוק האוטומציה העסקית. אבל הם לא מתאימים לאותם עסקים. ההשוואה הזו תחסוך לך כמה חודשים של ניסוי וטעייה.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              כשעסק מחליט לאטמט תהליכים, אחת השאלות הראשונות היא: באיזה כלי להשתמש? Make.com, Zapier ו-n8n הם שלושת האפשרויות הנפוצות ביותר — ולכל אחד יש חוזקות וחולשות שונות לחלוטין. הבחירה הנכונה תלויה בגודל העסק, בתקציב ובכמה טכני אתה מוכן ללכת.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Zapier — הקל ביותר ללמידה</h2>
              <p className="mb-4">
                Zapier היה הראשון בשוק ועדיין הכי פשוט להתחיל איתו. ממשק ויזואלי נקי, תיעוד מצוין, ומעל 6,000 אינטגרציות. אם אתה רוצה לחבר Gmail ל-Slack ב-15 דקות — Zapier הוא הבחירה.
              </p>
              <p className="mb-4">
                הבעיה: הוא גם הכי יקר. עסק עם נפח אוטומציות בינוני ישלם ₪270+ בחודש, ועם נפח גבוה — הרבה יותר. עבור אוטומציות פשוטות זה מצוין. עבור תהליכים מורכבים עם לוגיקה ענפה — המחיר לא מצדיק את עצמו.
              </p>
              <p><strong className="text-foreground">מתאים ל:</strong> עסקים קטנים שרוצים אוטומציות בסיסיות בלי להשקיע זמן בלמידה.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Make.com — האיזון הכי טוב</h2>
              <p className="mb-4">
                Make.com (לשעבר Integromat) הוא הבחירה הפופולרית ביותר שלנו לעסקים ישראליים בינוניים. הממשק הוויזואלי מאפשר לבנות תהליכים מורכבים עם לוגיקה מסועפת, ממשק API, עיבוד נתונים — ב-₪39 בחודש לתוכנית הבסיסית.
              </p>
              <p className="mb-4">
                יש לו עקומת למידה קצת יותר תלולה מ-Zapier, אבל אחרי יום-יומיים של היכרות — רוב בעלי עסקים יכולים לבנות אוטומציות בעצמם. הוויזואליזציה של הזרימה עוזרת מאוד להבין מה קורה בכל שלב.
              </p>
              <p><strong className="text-foreground">מתאים ל:</strong> עסקים קטנים-בינוניים שרוצים גמישות גבוהה במחיר סביר.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">n8n — הכי חזק, דורש טכנאי</h2>
              <p className="mb-4">
                n8n הוא open-source, שמשמעותו שאפשר להריץ אותו בשרת שלך בחינם. זה מה שגורם לו להיות הבחירה האידיאלית לעסקים עם נפח גבוה של אוטומציות — אין מגבלת "tasks" שמייקרת את החשבון.
              </p>
              <p className="mb-4">
                אבל: n8n דורש ידע טכני להגדרה, לתחזוקה ולפתרון בעיות. אם אין לך מפתח או מומחה אוטומציה שיטפל בזה — n8n עלול להפוך לכאב ראש. גרסת הענן שלהם (n8n Cloud) פותרת חלק מהבעיה אבל עולה כסף.
              </p>
              <p><strong className="text-foreground">מתאים ל:</strong> עסקים עם נפח גבוה של אוטומציות, צוות טכני או שמוכנים לשלם למומחה.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">אז מה הבחירה הנכונה?</h2>
              <p className="mb-4">
                עבור 80% מהעסקים הקטנים-בינוניים בישראל, Make.com הוא התשובה. הוא מאזן בין עלות, גמישות וקלות שימוש טוב יותר מהאחרים.
              </p>
              <p className="mb-4">
                אם אתה עסק גדול עם תהליכים מורכבים ונפח גבוה — n8n יחסוך לך הרבה כסף לאורך זמן, בתנאי שיש מי שמטפל בו.
              </p>
              <p>
                אם אתה רוצה להתחיל מחר בבוקר ולראות תוצאות בעוד שעה — Zapier. פשוט לקחת בחשבון שהוא הכי יקר ושבמצב של צמיחה כדאי לעבור ל-Make.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              לא בטוח איזה כלי מתאים לעסק שלך? <Link to="/solutions/business-automation" className="text-primary hover:underline font-medium">ראו את פתרון האוטומציה העסקית שלנו</Link> — אנחנו עובדים עם כל שלושת הכלים ויכולים לייעץ.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על כלי אוטומציה</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה שנבחר יחד את הכלי הנכון?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ קצרה — נמפה את הצרכים שלך ונמליץ בדיוק מה מתאים.</p>
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

export default AutomationToolsComparison;

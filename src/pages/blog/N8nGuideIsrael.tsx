import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה n8n לעסק בישראל?', answer: 'n8n הוא קוד פתוח וניתן להתקנה עצמית ללא עלות. גרסת הענן הרשמית מתחילה מ-$20 לחודש (כ-₪75). השוו ל-Zapier שמתחיל מ-₪270 לחודש — n8n חוסך עשרות אחוזים.' },
  { question: 'האם צריך ידע תכנותי להשתמש ב-n8n?', answer: 'לא בהכרח. n8n מציע ממשק ויזואלי של drag-and-drop לתהליכים פשוטים ובינוניים. לתהליכים מורכבים יש תמיכה בקוד JavaScript. רוב העסקים עובדים עם ספק אוטומציה שבונה עבורם.' },
  { question: 'מה ההבדל בין n8n לMake.com?', answer: 'שניהם כלי אוטומציה ויזואליים. n8n מציע גמישות רבה יותר ואפשרות self-hosting בחינם — מתאים לעסקים שרוצים שליטה מלאה. Make.com ידידותי יותר למתחילים. Zapier הכי פשוט אבל הכי יקר.' },
  { question: 'עם כמה כלים n8n יכול להתחבר?', answer: 'n8n תומך ביותר מ-500 אינטגרציות מובנות — כולל WhatsApp Business API, Google Sheets, Slack, Salesforce, HubSpot, Monday.com, Gmail ועוד. אם אין אינטגרציה מובנית, ניתן להתחבר לכל API דרך HTTP Request.' },
  { question: 'האם n8n מתאים לעסקים קטנים?', answer: 'כן — n8n עם self-hosting על שרת ענן (Google Cloud, AWS) יכול לעלות ₪50-200 לחודש בלבד עבור עסק קטן. זה עושה אותו אחד מהפתרונות החסכוניים ביותר לאוטומציה עסקית בישראל.' },
];

const N8nGuideIsrael = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="n8n — המדריך המלא לעסקים בישראל 2026 | EH Automation"
        description="כל מה שצריך לדעת על n8n בישראל: מה זה, כמה עולה, איך מתחילים, ולמה חוסך עשרות אחוזים לעומת Zapier. מדריך מעשי לעסקים."
        path="/blog/n8n-guide-israel"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'n8n מדריך ישראל', path: '/blog/n8n-guide-israel' },
      ]} />
      <ArticleSchema
        title="n8n — המדריך המלא לעסקים בישראל 2026"
        description="כל מה שצריך לדעת על n8n בישראל: מה זה, כמה עולה, איך מתחילים, ולמה חוסך עשרות אחוזים לעומת Zapier. מדריך מעשי לעסקים."
        path="/blog/n8n-guide-israel"
        datePublished="2026-08-08"
      />
      <FAQSchema items={faqItems} />
      <Navbar />
      <main className="bg-background min-h-screen pt-16" dir="rtl">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">כלי אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">n8n — המדריך המלא לעסקים בישראל 2026</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                n8n הוא כלי האוטומציה הגדל הכי מהר בישראל ב-2026 — ובצדק. קוד פתוח, גמיש, תומך ב-500+ אינטגרציות, ויכול לפעול בחינם על שרת ענן. מדריך זה יסביר מה זה n8n, למי מתאים, ואיך עסקים ישראליים משתמשים בו כדי לחסוך שעות ועשרות אלפי שקלים בשנה.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה n8n ולמה כולם עוברים אליו מ-Zapier?</h2>
              <p>
                n8n (קיצור של "nodemation") הוא פלטפורמת אוטומציה בקוד פתוח שמאפשרת לחבר בין מעל 500 מערכות עסקיות — CRM, WhatsApp, Google Sheets, מיילים, Slack, ועוד — ולבנות תהליכים אוטומטיים מורכבים דרך ממשק ויזואלי של drag-and-drop.
              </p>
              <p>
                מה שהופך אותו לפופולרי במיוחד: הוא קוד פתוח, מה שאומר שניתן להתקין אותו על שרת משלכם (self-hosted) ולהשתמש בו בחינם לחלוטין. גרסת הענן הרשמית מתחילה מ-$20 לחודש (כ-₪75). לשם השוואה — Zapier, המתחרה הגדול ביותר, עולה ₪270+ לחודש לאותה רמת שימוש.
              </p>
              <p>
                המעבר של עסקים מ-Zapier ל-n8n בשנים האחרונות נובע בעיקר משתי סיבות: מחיר ושליטה. n8n חוסך עשרות אחוזים בעלות, ומאפשר שליטה מלאה על הנתונים — חשוב במיוחד לעסקים שמטפלים בנתוני לקוחות רגישים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Self-Hosted לעומת Enim Cloud — מה מתאים לעסק בישראל?</h2>
              <p>
                אחת השאלות הנפוצות ביותר לגבי n8n: לארח בעצמי (self-hosted) או להשתמש בגרסת הענן? כל גישה מתאימה לסוג עסק שונה:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Self-Hosted — ₪50-200 לחודש</h3>
                  <p className="text-sm">מתקינים n8n על שרת ענן (Google Cloud, AWS, DigitalOcean). כמות הפעולות ללא הגבלה. שולטים על כל הנתונים. דורש ניהול שרת בסיסי. מתאים לעסקים עם נפח גבוה ותקציב מוגבל.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">n8n Cloud — $20-50 לחודש</h3>
                  <p className="text-sm">n8n מנהל את התשתית. פשוט יותר לתחזוקה. מתאים לעסקים שלא רוצים לטפל בשרת. עדיין זול יותר ממתחרים כמו Zapier ו-Make.</p>
                </div>
              </div>
              <p>
                ניתן לחסוך מאות שקלים בחודש על ידי הרצת n8n על שרת Google Cloud — כמה שנמצאו בישראל מפרסמים מדריכים לכך, ולרוב עלות השרת היא ₪50-150 לחודש בלבד גם לעסק עם מאות תהליכים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10 תהליכים פופולריים שעסקים ישראליים בונים ב-n8n</h2>
              <p>
                n8n גמיש מספיק לבנות כמעט כל תהליך אוטומטי. הנה 10 הדוגמאות הנפוצות ביותר בשוק הישראלי:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">מענה אוטומטי ל-WhatsApp:</strong> לידים שמגיעים מFacebook Ads מקבלים מענה WhatsApp תוך דקה.</li>
                <li><strong className="text-foreground">עדכון CRM אוטומטי:</strong> כל שיחת לקוח, מייל, או הודעה מתועדים ב-CRM אוטומטית.</li>
                <li><strong className="text-foreground">ניהול לידים:</strong> ליד שמגיע מהאתר נכנס ל-CRM, מקבל מייל ברוכים הבאים, ונשלחת הודעה לאיש המכירות.</li>
                <li><strong className="text-foreground">עדכון Google Sheets:</strong> נתונים ממקורות שונים מרוכזים אוטומטית בגיליון אחד לדוח שבועי.</li>
                <li><strong className="text-foreground">תזכורות תורים:</strong> 24 שעות לפני פגישה — הודעת תזכורת ב-WhatsApp ומייל.</li>
                <li><strong className="text-foreground">ניהול הזמנות:</strong> הזמנות מאתר e-commerce מעובדות, נשלחות למחסן, ולקוח מקבל עדכון.</li>
                <li><strong className="text-foreground">שיווק אוטומטי:</strong> לקוח שלא קנה 60 יום מקבל הצעה מיוחדת.</li>
                <li><strong className="text-foreground">פרסום מדיה חברתית:</strong> פוסט שנכתב ב-Notion מתפרסם אוטומטית בלינקדאין, אינסטגרם, ופייסבוק.</li>
                <li><strong className="text-foreground">דוחות אוטומטיים:</strong> כל יום שני בבוקר — דוח ביצועים שבועי נשלח למנהל.</li>
                <li><strong className="text-foreground">ניטור ותראות:</strong> כשמשהו השתבש (שגיאה, עסקה נחסמה) — הודעה מיידית ל-Slack.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">n8n לעומת Zapier לעומת Make — מי מנצח לאיזה שימוש?</h2>
              <p>
                שלוש הפלטפורמות הגדולות לאוטומציה עסקית, ולכל אחת יש יתרונות:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">n8n — הכי גמיש, הכי זול לנפח גבוה</h3>
                  <p className="text-sm"><strong>יתרונות:</strong> קוד פתוח, self-hosted חינמי, 500+ אינטגרציות, קוד JavaScript לתהליכים מורכבים.<br/><strong>חסרונות:</strong> עקומת לימוד גבוהה יותר, דורש ניהול שרת ב-self-hosted.<br/><strong>מחיר:</strong> ₪0 (self-hosted) עד ₪200/חודש (cloud).</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Make.com — אמצע הדרך, ממשק ויזואלי מצוין</h3>
                  <p className="text-sm"><strong>יתרונות:</strong> ממשק ויזואלי מעולה, קל ללמוד, תמיכה טובה.<br/><strong>חסרונות:</strong> יקר יותר מn8n self-hosted, פחות גמיש לתהליכים מורכבים.<br/><strong>מחיר:</strong> $10.59-29/חודש.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Zapier — הכי פשוט, הכי יקר</h3>
                  <p className="text-sm"><strong>יתרונות:</strong> הפשוט ביותר לשימוש, 6,000+ אינטגרציות, תמיכה מצוינת.<br/><strong>חסרונות:</strong> הכי יקר — ₪270+ לחודש, פחות גמיש לתהליכים מורכבים.<br/><strong>מחיר:</strong> ₪270-1,000+/חודש.</p>
                </div>
              </div>
              <p>
                המלצה: לעסקים שרוצים להתחיל מהר — Zapier. לעסקים עם נפח גבוה שרוצים לחסוך — n8n self-hosted. לאמצע — Make.com. לפרטים על בחירת הכלי הנכון לעסק שלכם, ראו את <Link to="/solutions/workflow-automation" className="text-primary hover:underline">פתרון אוטומציית תהליכי עבודה</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מאיפה מתחילים עם n8n — מדריך 4 שלבים לעסק ישראלי</h2>
              <p>
                אם החלטתם לנסות n8n, הנה הדרך הנכונה להתחיל:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">בחרו תהליך אחד לבדיקה:</strong> לא ניסו לאטמט הכל. בחרו תהליך פשוט שחוזר על עצמו — למשל, שליחת מייל ברוכים הבאים לליד חדש שנכנס לCRM.</li>
                <li><strong className="text-foreground">הגדירו חשבון n8n Cloud (לבדיקה):</strong> התחילו עם גרסת הענן כדי להכיר את הממשק, לפני שמחליטים על self-hosting.</li>
                <li><strong className="text-foreground">בנו את הצומת הראשון:</strong> חיבור בין שתי מערכות — Google Forms → Google Sheets, או CRM → WhatsApp. ראו שזה עובד.</li>
                <li><strong className="text-foreground">הרחיבו בהדרגה:</strong> לאחר שהתהליך הראשון עובד בצורה אמינה, הוסיפו תהליכים נוספים. n8n מאפשר לבנות תהליכים מורכבים מאד על ידי שרשור צמתים פשוטים.</li>
              </ol>
              <p>
                חשוב להוסיף: n8n, כמו כל כלי אוטומציה, דורש ניטור שוטף. תהליכים יכולים להישבר כשממשקי API משתנים, כשנתונים לא מגיעים בפורמט הצפוי, או כשהגדרות מתבדרות. לעסקים שלא רוצים לנהל זאת בעצמם — עבודה עם ספק אוטומציה שמנהל את n8n עבורכם היא הפתרון הנוח ביותר.
              </p>
              <p>
                לפרטים על הטמעת n8n בעסק ובניית תהליכים מלאים, ראו את <Link to="/solutions/business-automation" className="text-primary hover:underline">פתרון האוטומציה העסקית</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים להטמיע n8n בעסק שלכם?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — בלי מחויבות.</p>
              <button onClick={openPopup} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
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

export default N8nGuideIsrael;

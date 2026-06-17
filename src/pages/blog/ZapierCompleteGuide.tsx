import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה Zapier לעסק בישראל?', answer: 'Zapier מציע תוכנית חינמית (100 פעולות, 5 Zaps), Starter ב-$29.99 לחודש (750 פעולות), Professional ב-$73.50 לחודש (2,000 פעולות), ו-Team ב-$103.50 לחודש. לשקלים: כ-₪110-390 לחודש לגרסאות בתשלום.' },
  { question: 'האם Zapier עובד עם מערכות ישראליות?', answer: 'Zapier תומך ב-7,000+ אפליקציות גלובליות כולל Google Sheets, HubSpot, Slack, Gmail, Salesforce, ועוד. מערכות ישראליות ספציפיות (Priority, חשבשבת) לא תמיד זמינות — לאלה עדיף n8n עם HTTP Request מותאם.' },
  { question: 'מה ההבדל בין Zap ו-Workflow?', answer: 'Zap הוא האוטומציה הבסיסית: "כשX קורה, עשה Y". Workflow (מרובה שלבים) מאפשר לשרשר כמה פעולות: "כשX קורה, עשה Y ואז Z ואז W". Zap-מרובה-שלבים דורש תוכנית בתשלום.' },
  { question: 'האם Zapier מתאים לעסקים גדולים?', answer: 'Zapier מתאים מאוד לעסקים קטנים-בינוניים שרוצים להתחיל מהר. עסקים גדולים עם נפח גבוה ויכולות מורכבות לרוב עוברים ל-n8n (יותר גמיש, זול יותר לנפח) או מוציאים פיתוח מותאם.' },
  { question: 'מה ה-Zaps הנפוצים ביותר לעסקים ישראליים?', answer: 'הנפוצים ביותר: Google Forms → Google Sheets + שליחת מייל, Gmail → CRM (שמירת לידים מאוטומטית), Calendly → Google Calendar + WhatsApp, ו-Facebook Lead Ads → HubSpot + WhatsApp. אלה "Zaps חוסכי זמן" שרוב העסקים יכולים לבנות תוך שעה.' },
];

const ZapierCompleteGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Zapier — כל מה שצריך לדעת לפני שמשתמשים | EH Automation"
        description="המדריך המלא ל-Zapier בעברית: מה זה, כמה עולה, מה ניתן לאטמט, מתי כדאי ומתי עדיף n8n. כולל 10 Zaps שכל עסק צריך."
        path="/blog/zapier-complete-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Zapier מדריך מלא', path: '/blog/zapier-complete-guide' },
      ]} />
      <ArticleSchema
        title="Zapier — כל מה שצריך לדעת לפני שמשתמשים"
        description="המדריך המלא ל-Zapier בעברית: מה זה, כמה עולה, מה ניתן לאטמט, מתי כדאי ומתי עדיף n8n. כולל 10 Zaps שכל עסק צריך."
        path="/blog/zapier-complete-guide"
        datePublished="2026-09-25"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Zapier — כל מה שצריך לדעת לפני שמשתמשים</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Zapier הוא כלי האוטומציה הפופולרי ביותר בעולם — ובצדק. עם 7,000+ אינטגרציות וממשק הכי פשוט בשוק, הוא מאפשר לכל עסק לבנות אוטומציות תוך דקות. אבל לפני שמתחילים לשלם ₪110-390 לחודש, חשוב להבין מה זה מציע ומה לא.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה Zapier ואיך זה עובד?</h2>
              <p>
                Zapier הוא פלטפורמת אוטומציה מבוססת ענן שמחברת בין אפליקציות שונות. הרעיון הבסיסי: "כש-X קורה באפליקציה A, עשה Y באפליקציה B." בשפת Zapier, אלה נקראים "Zaps".
              </p>
              <p>
                דוגמה פשוטה: Zap שמחבר Google Forms ל-Google Sheets — כל מילוי טופס נוסף אוטומטית לגיליון. דוגמה מורכבת יותר: Zap שכשמישהו ממלא טופס ליד → נשמר ב-CRM → נשלחת הודעת WhatsApp לאיש המכירות → נשלח מייל אוטומטי ללקוח → נוצר Task ב-Asana.
              </p>
              <p>
                Zapier תומך ב-7,000+ אפליקציות — כנראה הכי הרבה מכל כלי אוטומציה. אם אתם משתמשים בכלי פופולרי, רוב הסיכויים שיש לו אינטגרציה ב-Zapier. הממשק הידידותי לא דורש שום ידע תכנותי — כל זאפ בנוי מטריגר ופעולה(ות), שניהם נבחרים מתפריט ויזואלי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה Zapier — מחירון ב-2026 ומה מקבלים?</h2>
              <p>
                Zapier מציעה ארבע תוכניות עיקריות:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Free — חינמי</h3>
                  <p className="text-sm">100 פעולות לחודש, 5 Zaps פעילים, Zaps חד-שלביים בלבד. מתאים לניסיון ולעסקים עם נפח נמוך מאוד.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Starter — $29.99/חודש (כ-₪110)</h3>
                  <p className="text-sm">750 פעולות, 20 Zaps, Zaps רב-שלביים, Filters. מתאים לעסקים קטנים שמתחילים לאטמט.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Professional — $73.50/חודש (כ-₪270)</h3>
                  <p className="text-sm">2,000 פעולות, Zaps ללא הגבלה, Paths (תנאים מורכבים), עדיפות תמיכה. מתאים לעסקים עם אוטומציות מרובות.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Team — $103.50/חודש (כ-₪380)</h3>
                  <p className="text-sm">צוות מרובה משתמשים, 2,000 פעולות משותפות, ניהול הרשאות. מתאים לעסקים עם כמה משתמשים.</p>
                </div>
              </div>
              <p>
                שימו לב: 2,000 פעולות לחודש נשמע הרבה — אבל Zap מורכב שמכיל 5 פעולות = 5 "פעולות" לכל הפעלה. עסק עם 100 לידים ביום × Zap 4-שלבי = 400 פעולות ליום = 12,000 לחודש. לנפח כזה, Zapier יהיה יקר מאוד — ועדיף n8n.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10 Zaps שכל עסק קטן בישראל צריך</h2>
              <p>
                הנה 10 Zaps שניתן לבנות תוך שעה ושחוסכים שעות בשבוע:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">Google Forms → Google Sheets + מייל:</strong> כל פנייה נרשמת ונשלח אישור אוטומטי.</li>
                <li><strong className="text-foreground">Facebook Lead Ads → HubSpot:</strong> לידים ממודעות נכנסים ישירות ל-CRM.</li>
                <li><strong className="text-foreground">Calendly → Google Calendar + SMS:</strong> פגישה שנקבעה → אישור + תזכורת אוטומטית.</li>
                <li><strong className="text-foreground">Gmail → Trello:</strong> מיילים עם "בקשה חדשה" הופכים לכרטיסים.</li>
                <li><strong className="text-foreground">Stripe → Google Sheets:</strong> כל תשלום נרשם בגיליון דוחות.</li>
                <li><strong className="text-foreground">Typeform → Slack:</strong> כשמישהו ממלא שאלון → הודעה לצוות.</li>
                <li><strong className="text-foreground">HubSpot → Gmail:</strong> ליד חדש → מייל ברוכים הבאים אוטומטי.</li>
                <li><strong className="text-foreground">WooCommerce → Slack:</strong> הזמנה חדשה → הודעת Slack לצוות המכירות.</li>
                <li><strong className="text-foreground">Instagram מנטור → Google Sheets:</strong> תגובות חדשות נרשמות אוטומטית.</li>
                <li><strong className="text-foreground">Google Sheets → Mailchimp:</strong> שורה חדשה בגיליון → הוספה לרשימת תפוצה.</li>
              </ul>
              <p>
                כל אחד מה-Zaps האלה אינו דורש שום ידע תכנותי. Zapier מנחה אתכם שלב אחרי שלב.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מתי Zapier לא מספיק — ומתי עדיף n8n?</h2>
              <p>
                Zapier מצוין — אבל לא מושלם לכל מקרה. הנה מתי כדאי לבחון אלטרנטיבה:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">נפח גבוה = Zapier יקר</h3>
                  <p className="text-sm">אם אתם מבצעים 5,000+ פעולות לחודש, Zapier יעלה ₪400-1,000+. n8n self-hosted על Google Cloud עולה ₪50-200 לאותו נפח.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">מערכות ישראליות ספציפיות</h3>
                  <p className="text-sm">Zapier לא תמיד תומך במערכות ישראליות (Priority ERP, חשבשבת, ועוד). n8n מאפשר התחברות לכל API דרך HTTP Request.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">לוגיקה מורכבת</h3>
                  <p className="text-sm">תהליכים עם לולאות, חישובים מורכבים, ועיבוד נתונים — n8n מאפשר קוד JavaScript ולוגיקה מתקדמת שקשה לבנות ב-Zapier.</p>
                </div>
              </div>
              <p>
                ההמלצה: עסק שרוצה להתחיל מהר ועם מינימום עקומת לימוד — Zapier. עסק שצומח ורוצה שליטה ועלות נמוכה לנפח גבוה — n8n. לפרטים על השוואה מלאה, ראו את <Link to="/solutions/workflow-automation" className="text-primary hover:underline">פתרון אוטומציית תהליכי עבודה</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">יתרונות וחסרונות של Zapier — סיכום לפני ההחלטה</h2>
              <p>
                <strong className="text-foreground">יתרונות Zapier:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>הכי פשוט לשימוש מכל כלי האוטומציה — ניתן לבנות Zap ראשון תוך 10 דקות</li>
                <li>7,000+ אינטגרציות — כנראה יש לאפליקציה שלכם</li>
                <li>תמיכה מצוינת ותיעוד מפורט</li>
                <li>גרסה חינמית לניסיון ולנפח נמוך</li>
              </ul>
              <p>
                <strong className="text-foreground">חסרונות Zapier:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>הכי יקר — ₪270-380+/חודש לגרסאות שמאפשרות שימוש אמיתי</li>
                <li>מגבלת פעולות נוקשה — קשה לעלות בהדרגה</li>
                <li>פחות גמיש לתהליכים מורכבים</li>
                <li>לא מתאים למערכות ישראליות שאין להן אינטגרציה מובנית</li>
              </ul>
              <p>
                המסקנה: Zapier הוא כלי מצוין לעסקים שמתחילים עם אוטומציה ורוצים ניצחון מהיר. לצמיחה ארוכת טווח עם נפח גבוה — שווה לבחון n8n. לפרטים על הכלי הנכון לעסק שלכם, ראו את <Link to="/solutions/business-automation" className="text-primary hover:underline">פתרון האוטומציה העסקית</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לדעת איזה כלי אוטומציה מתאים לעסק שלכם?</h3>
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

export default ZapierCompleteGuide;

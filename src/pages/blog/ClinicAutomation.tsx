import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה אוטומציה לקליניקה?', answer: 'חבילת אוטומציה בסיסית לקליניקה מתחילה מ-₪300-600 לחודש (CRM + WhatsApp API + n8n) ועד ₪1,000+ לחודש לחבילה מקיפה עם ניהול תורים מלא, דוחות ומענה WhatsApp. ההקמה החד-פעמית נעה בין ₪3,000 ל-₪10,000 בהתאם למורכבות.' },
  { question: 'האם אוטומציה עובדת עם כל תוכנת ניהול קליניקה?', answer: 'רוב כלי האוטומציה תומכים בתוכנות ניהול קליניקה הפופולריות (Easybizy, Arbox, Medform ועוד) דרך API. לפני בחירת פתרון, כדאי לוודא שיש תמיכה ספציפית לתוכנה שאתם משתמשים בה.' },
  { question: 'האם מטופלים מוכנים לקבל תורים דרך WhatsApp?', answer: 'כן — בישראל WhatsApp הוא ערוץ התקשורת הראשי. מטופלים מעדיפים לקבל תזכורות ואישורים ב-WhatsApp על פני SMS או מייל. שיעורי הפתיחה של הודעות WhatsApp מגיעים ל-90%+ לעומת 20-30% למייל.' },
  { question: 'כמה תורים ניתן לנהל אוטומטית?', answer: 'אין מגבלה מעשית. מערכות אוטומציה לקליניקות מנהלות מאות תורים ביום ללא בעיה. ככל שנפח התורים גדול יותר, כך ה-ROI של האוטומציה גדל.' },
  { question: 'מה קורה כשמטופל רוצה לדבר עם אדם אמיתי?', answer: 'כל מערכת אוטומציה טובה מכילה "מסלול אסקלציה" — כשהמטופל מבקש לדבר עם אדם, מתאם, או מציין נושא רגיש, ההודעה מועברת מיידית לאדם אמיתי. הבוט מטפל ב-70-80% מהפניות, והשאר מגיעות לצוות.' },
];

const ClinicAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה לקליניקות — קביעת תורים בלי מזכירה | EH Automation"
        description="גלו איך אוטומציה לקליניקה חוסכת עשרות שעות בשבוע: קביעת תורים אוטומטית, תזכורות WhatsApp, ירידה של 40% ב-no-show."
        path="/blog/clinic-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציה לקליניקות', path: '/blog/clinic-automation' },
      ]} />
      <ArticleSchema
        title="אוטומציה לקליניקות — קביעת תורים בלי מזכירה"
        description="גלו איך אוטומציה לקליניקה חוסכת עשרות שעות בשבוע: קביעת תורים אוטומטית, תזכורות WhatsApp, ירידה של 40% ב-no-show."
        path="/blog/clinic-automation"
        datePublished="2026-07-16"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">אוטומציה לקליניקות — קביעת תורים בלי מזכירה</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                אוטומציה לקליניקה היא אחד ה-ROI הברורים ביותר בעולם הטיפולי: קביעת תורים אוטומטית, תזכורות ב-WhatsApp, וירידה של 40% בביטולים ב-no-show — כל אלה בלי לשכור מזכירה נוספת ובלי לענות לטלפון בין טיפול לטיפול.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עולה יותר — מזכירה או אוטומציה ב-₪300-1,000 לחודש?</h2>
              <p>
                קליניקות פרטיות בישראל מתמודדות עם דילמה מוכרת: הטלפון מצלצל כשאתה בטיפול. הודעות WhatsApp מצטברות ובין-הטיפולים אתה מנסה להחזיר לכולם. לרוב קליניקות, זה אומר שאתה מבלה 2-3 שעות ביום בניהול לוגיסטי — שעות שיכלו להיות טיפולים.
              </p>
              <p>
                הפתרון הקלאסי: שכירת מזכירה. עלות: ₪5,000-8,000 לחודש, כולל ביטוח לאומי ותנאים סוציאליים. ועדיין — מזכירה עובדת 9-18, לא בסופי שבוע, ולא בזמן שהיא חולה.
              </p>
              <p>
                הפתרון המודרני: אוטומציה לקביעת תורים. מחיר: ₪300-1,000 לחודש, תלוי בהיקף. פועלת 24/7, לא לוקחת חופשה, ומטפלת בקביעת תורים, תזכורות, ביטולים ושינויים — הכל אוטומטית. מערכות אוטומציה לקליניקות מצמצמות no-show ב-40% ומעלות את אחוז התפוסה בחדרי הטיפול.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך עובדת קביעת תור אוטומטית — שלב אחרי שלב?</h2>
              <p>
                מטופל חדש שמגיע אל הקליניקה שלכם — לרוב דרך המלצה, גוגל, אינסטגרם, או אתר — יוצר קשר בדרך כלל ב-WhatsApp. הנה איך תהליך קביעת תור אוטומטי עובד מרגע ההתקשרות הראשונה:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">מגע ראשון:</strong> מטופל שולח "שלום" או "רוצה לקבוע תור" — הבוט מגיב תוך שניות עם ברכה, סוגי הטיפולים הזמינים, ורשימת מטפלים (אם יש כמה).</li>
                <li><strong className="text-foreground">בחירת מועד:</strong> הבוט מציג את הזמינות הפנויה בשבועיים הקרובים. המטופל בוחר מועד מתאים בלי שום מגע אנושי.</li>
                <li><strong className="text-foreground">אישור ורישום:</strong> הבוט שולח אישור, מוסיף את הפגישה ביומן הדיגיטלי של המטפל, ושולח לינק לוואזר/גוגל מפות לניווט.</li>
                <li><strong className="text-foreground">תזכורת ראשונה:</strong> 24 שעות לפני הטיפול — "תזכורת: מחר בשעה 16:00 אצל ד"ר כהן. לביטול/שינוי לחצו כאן."</li>
                <li><strong className="text-foreground">תזכורת שנייה:</strong> 2-3 שעות לפני הטיפול — תזכורת קצרה עם אפשרות לאשר הגעה.</li>
                <li><strong className="text-foreground">פולו-אפ לאחר הטיפול:</strong> יום לאחר הטיפול — "קיבלת את מה שציפית? אפשר לקבוע את הפעם הבאה?" — עם לינק לקביעה ישירה.</li>
              </ol>
              <p>
                כל זה קורה בלי שהמטפל נגע בטלפון. לפרטים על בניית מערכות WhatsApp לקליניקות, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">למה no-show הוא הבעיה הכי יקרה של קליניקה — ואיך מורידים אותו ב-40%?</h2>
              <p>
                No-show — מטופל שלא מגיע לתור בלי לבטל מראש — הוא ההפסד הכי מוחשי לקליניקה. שעת טיפול שנחסמה ולא נוצלה = הכנסה שנאבדה לנצח. עבור קליניקה ממוצעת שגובה ₪300-600 לשעה, שני no-show בשבוע שווים ₪2,400-4,800 הפסד חודשי.
              </p>
              <p>
                מחקרים בתחום הרפואי מראים שתזכורת אוטומטית 24 שעות לפני הטיפול, ובמיוחד תזכורת שנייה 2-3 שעות לפני, מורידה את שיעור ה-no-show ב-35-40%. הסיבה: מטופלים לא שוכחים — הם שוכחים לבטל. תזכורת נותנת להם הזדמנות לבטל בזמן, מה שמאפשר לקליניקה למלא את המקום.
              </p>
              <p>
                מעבר לתזכורות, מערכת אוטומציה מאפשרת לנהל ביטולים בצורה חכמה: כשמטופל מבטל, המערכת שולחת אוטומטית הודעה לרשימת ממתינים ומציעה להם את המקום הפנוי — כך שהקליניקה ממלאת חורים בלוח הזמנים בלי מאמץ.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה כוללת מערכת אוטומציה מלאה לקליניקה?</h2>
              <p>
                מעבר לקביעת תורים, מערכת אוטומציה מקיפה לקליניקה יכולה לכלול:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">ניהול מטופלים חדשים:</strong> טפסי קבלה דיגיטליים, שאלוני אנמנזה אוטומטיים, הסכמי טיפול לחתימה אלקטרונית.</li>
                <li><strong className="text-foreground">מעקב אחרי מטופלים:</strong> כמה זמן עבר מהטיפול האחרון, מי לא חזר, מי הגיע פעם אחת ונעלם — המערכת מזהה ושולחת הצעה לחזור.</li>
                <li><strong className="text-foreground">ניהול תשלומים:</strong> שליחת חשבונית אוטומטית לאחר הטיפול, תזכורת על תשלומים שמממתינים, קישור לתשלום אונליין.</li>
                <li><strong className="text-foreground">ביקורות ומשוב:</strong> 24 שעות לאחר הטיפול — "איך היה? נשמח לדעת." קישור לגוגל ביזנס לביקורת, שמשפרת את הנוכחות האורגנית שלכם.</li>
                <li><strong className="text-foreground">דוחות וסטטיסטיקות:</strong> כמה תורים היו השבוע, מה שיעור ה-no-show, מה ממוצע ההכנסה לטיפול — הכל בדשבורד ברור.</li>
              </ul>
              <p>
                לניהול מלא של מאגר המטופלים ואינטגרציה עם CRM, ראו את <Link to="/solutions/crm-automation" className="text-primary hover:underline">פתרון אוטומציית CRM</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איזה קליניקות נהנות יותר מאוטומציה — ואיזה פחות?</h2>
              <p>
                אוטומציה לקביעת תורים מתאימה במיוחד לקליניקות שבהן:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>יש נפח גבוה של תורים — 5 תורים ביום ומעלה.</li>
                <li>זמן הטיפול קבוע יחסית (פיזיו, קוסמטיקה, רופאי שיניים, ספורט טיפולי).</li>
                <li>רוב ההתקשרות נעשית ב-WhatsApp.</li>
                <li>יש לו no-show חוזר ונשנה שעולה כסף.</li>
              </ul>
              <p>
                אוטומציה פחות מתאימה לקליניקות שבהן כל שיחה עם מטופל היא ייעוץ מורכב שאינו ניתן לאוטומציה, או כשנפח התורים קטן מ-3-4 ביום. במקרים כאלה, ה-ROI עדיין יכול להיות חיובי — אבל הוא יהיה נמוך יותר.
              </p>
              <p>
                הדרך הטובה ביותר לדעת: שיחת ייעוץ קצרה שבה מנתחים את התהליכים הנוכחיים ומחשבים ROI ספציפי לקליניקה שלכם.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים להפסיק לנהל תורים ידנית?</h3>
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

export default ClinicAutomation;

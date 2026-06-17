import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה אוטומציה לעסק ניהול אירועים?', answer: 'אוטומציה בסיסית לניהול אירועים — CRM + תקשורת אוטומטית עם ספקים ולקוחות — מתחילה מ-₪1,500-3,000 לחודש. פרויקט הקמה מלא עם אינטגרציות מרובות נע בין ₪8,000 ל-₪25,000 חד-פעמי.' },
  { question: 'האם אוטומציה עובדת לכל סוגי האירועים?', answer: 'כן — ניהול אירועים תאגידיים, חתונות, בר/בת מצוות, כנסים וימי גיבוש נהנים מאוטומציה. הכלים משתנים לפי סוג האירוע, אבל הלוגיקה זהה: תיאום ספקים, תקשורת עם לקוחות, ניהול לוחות זמנים.' },
  { question: 'איך מנהלים ספקים מרובים עם אוטומציה?', answer: 'כל ספק נמצא ב-CRM עם סטטוס הזמנה, תאריכים מוסכמים, ופרטי תשלום. כשמשהו משתנה (תאריך, פרטי אירוע) — הודעה יוצאת לכל הספקים הרלוונטיים אוטומטית. לא צריך להתקשר לכל אחד בנפרד.' },
  { question: 'האם אפשר לאטמט הצעות מחיר לאירועים?', answer: 'כן — ניתן לבנות מחשבון הצעת מחיר אוטומטי: לקוח ממלא שאלון (תאריך, מספר אורחים, סוג האירוע, מיקום), המערכת מחשבת ושולחת הצעת מחיר בפורמט מקצועי תוך דקות. מגדיל משמעותית את קצב המענה ואת ההמרה.' },
  { question: 'כמה זמן חוסכת אוטומציה למנהל אירועים ביום?', answer: 'מנהל אירועים ממוצע מבלה 3-5 שעות ביום על מיילים, עדכונים לספקים, ותיאומים. אוטומציה יכולה לחסוך 60-70% מהזמן הזה — 2-3 שעות ביום — שמתפנות לפגישות לקוחות ולניהול האירוע עצמו.' },
];

const EventsManagementAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה לעסק ניהול אירועים — מA עד Z | EH Automation"
        description="מדריך מלא לאוטומציה בניהול אירועים: תיאום ספקים, תקשורת לקוחות, הצעות מחיר, ותזכורות — כולם אוטומטית. חסכו 3 שעות ביום."
        path="/blog/events-management-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציה לניהול אירועים', path: '/blog/events-management-automation' },
      ]} />
      <ArticleSchema
        title="אוטומציה לעסק ניהול אירועים — מA עד Z"
        description="מדריך מלא לאוטומציה בניהול אירועים: תיאום ספקים, תקשורת לקוחות, הצעות מחיר, ותזכורות — כולם אוטומטית. חסכו 3 שעות ביום."
        path="/blog/events-management-automation"
        datePublished="2026-08-25"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">אוטומציה לעסק ניהול אירועים — מA עד Z</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ניהול אירועים הוא אחד התחומים שסובלים הכי הרבה מ"אינפורמציה שנאבדת בין הצינורות" — ספקים, לקוחות, לוחות זמנים, ותשלומים שכולם צריכים תיאום רציף. אוטומציה חוסכת למנהל אירועים 2-3 שעות ביום ומצמצמת את שיעור הטעויות ב-60%.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">למה ניהול אירועים ידני עולה לכם 3 שעות ביום?</h2>
              <p>
                אירוע ממוצע בישראל — חתונה של 200 אורחים — כולל 15-25 ספקים: אולם, קייטרינג, צלם, DJ, פרחים, הגברה, תאורה, אמן, מוזיקה חיה, מפיק, סידורי חניה ועוד. כל ספק דורש תיאום נפרד, אישור נפרד, ותשלום נפרד.
              </p>
              <p>
                מנהל אירועים ממוצע מבלה 40-60% מזמנו בניהול התקשורת — מיילים, הודעות WhatsApp, שיחות טלפון — לעדכן, לתאם, לאשר, ולהזכיר. זה עובד, אבל זה בזבוז עצום של זמן שיכול להיות מושקע בבניית קשרים עם לקוחות חדשים או בשיפור האיכות של האירועים הקיימים.
              </p>
              <p>
                אוטומציה לניהול אירועים לא מחליפה את השיקול הדעת של מנהל האירועים — היא מטפלת בכל המשימות הפורמליות שחוזרות על עצמן: שליחת עדכונים, תזכורות, אישורים, ועדכוני סטטוס. כך המנהל מתפנה לתכנון, לניהול, ולהבטחת חוויה יוצאת דופן.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שלב 1: ניהול לידים — מהפנייה הראשונה ועד להצעת מחיר אוטומטית</h2>
              <p>
                לקוח פוטנציאלי פונה ל"ניהול אירועים X" דרך WhatsApp: "שלום, מחפשים מנהל אירועים לחתונה בינואר 2027, 180 אורחים." בלי אוטומציה: המנהל מגיב כשיש לו זמן, שואל שאלות, שולח מייל. עם אוטומציה: תוך דקה יוצאת תשובה עם שאלון קצר — תאריך, מיקום, מספר אורחים, תקציב.
              </p>
              <p>
                אחרי שהלקוח ממלא את השאלון, המערכת יכולה לייצר אוטומטית הצעת מחיר ראשונית לפי פרמטרים שהגדרתם מראש — ולשלוח אותה בתוך שעה. לקוח שמקבל הצעת מחיר ב-1 שעה לעומת 3 ימים — הסיכוי שיסגור גדל משמעותית.
              </p>
              <p>
                בנוסף, כל ליד נכנס ל-CRM עם כל הפרטים הרלוונטיים. מנהל האירועים מקבל התראה ויכול לטפל בלידים "חמים" בלי שום מידע חסר. לפרטים על בניית מסלולי ליד מלאים, ראו את <Link to="/solutions/crm-automation" className="text-primary hover:underline">פתרון אוטומציית CRM</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שלב 2: תיאום ספקים — 15 ספקים, אפס מיילים ידניים</h2>
              <p>
                אחרי שאירוע נסגר, מתחיל תיאום עם ספקים. תהליך ידני: מנהל האירועים שולח מייל לכל ספק, מקבל אישור, מעדכן בגיליון, ועוקב אחרי כל תאריך חשוב. כשמשהו משתנה — תהליך מחדש עם כל הספקים.
              </p>
              <p>
                תהליך אוטומטי: כשאירוע נסגר, המערכת שולחת אוטומטית הזמנה לכל ספק רלוונטי. כל ספק מאשר דרך קישור פשוט. תאריכי אבן דרך (תשלום, פגישת תיאום, מסירת ציוד) נכנסים אוטומטית ליומן — של המנהל ושל הספק. כשמשהו משתנה — הודעה יוצאת לכולם בבת אחת.
              </p>
              <p>
                היתרון הגדול: אין "נפילות בין הכסאות". הספק שלא אישר מקבל תזכורת אוטומטית תוך 48 שעות. אם עדיין לא ענה — המנהל מקבל התראה שחייבים לטפל בזה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שלב 3: ניהול תשלומים — לא יותר לשכוח מי שילם</html2>
              <p>
                ניהול תשלומים הוא אחת הבעיות הכי נפוצות בניהול אירועים. לקוחות שמחויבים 3 תשלומים, ספקים שצריכים פריסת תשלומים, ומנהל שצריך לזכור מי שילם, מי לא, ומי צריך להגדיל ערבות — כל זה יכול להפוך לסיוט.
              </p>
              <p>
                מערכת אוטומציה לניהול תשלומים: תזכורת תשלום לפני כל מועד — שבוע לפני ויום לפני. כשתשלום מגיע — אישור אוטומטי ועדכון סטטוס. תשלום שלא הגיע בזמן — התראה למנהל ותזכורת ללקוח. חשבוניות מופקות אוטומטית לאחר כל תשלום.
              </p>
              <p>
                60% מהארגונים שמטמיעים אוטומציה פיננסית מדווחים על ROI תוך 12 חודשים, ועל ירידה של 70-80% בתשלומים מאחרים. לעסק ניהול אירועים עם מחזור של ₪500,000-1,000,000 בשנה, זה משמעותי מאוד.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שלב 4: תקשורת עם לקוחות — 100 ימים לפני עד יום לאחר</h2>
              <p>
                לקוח שסגר על אירוע מצפה לתחושה שמישהו מטפל בו, מעדכן אותו, ולא יצטרך "לרדוף" אחרי המנהל. אוטומציה מייצרת בדיוק את הרגשה הזו — בלי שהמנהל יצטרך לזכור לשלוח כל הודעה ידנית.
              </p>
              <p>
                לוח זמנים לתקשורת אוטומטית עם זוג שסגר חתונה:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">100 יום לפני:</strong> "ברוכים הבאים — הנה לוח הזמנים המלא וצ'קליסט הכנות."</li>
                <li><strong className="text-foreground">60 יום לפני:</strong> "זכרו לאשר תפריט סופי ורשימת מוזמנים מסופקת."</li>
                <li><strong className="text-foreground">30 יום לפני:</strong> "פגישת תיאום סופי — ייעוץ מותאם עם ספקים."</li>
                <li><strong className="text-foreground">7 ימים לפני:</strong> "שבוע! הכל מאושר — הנה פרטי הלוגיסטיקה."</li>
                <li><strong className="text-foreground">יום לפני:</strong> "מחר זה הגדול — הנה לוח הזמנים הדקדקני ליום."</li>
                <li><strong className="text-foreground">יום אחרי:</strong> "תודה וחיים שמחים! אנחנו שמחים לשמוע איך היה — ותודה על ביקורת בגוגל."</li>
              </ul>
              <p>
                לפרטים על בניית אוטומציית תקשורת מלאה, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לייעל את ניהול האירועים שלכם?</h3>
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

export default EventsManagementAutomation;

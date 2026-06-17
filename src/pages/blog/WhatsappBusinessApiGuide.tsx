import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה WhatsApp Business API בישראל?', answer: 'מחיר WhatsApp Business API ב-2026: שיחת שיווק ~₪0.13, שיחת שירות ~₪0.06, אימות ~₪0.035. 1,000 שיחות שירות ראשונות בחודש — חינמיות. בנוסף, ספק BSP גובה ₪175-450 לחודש. עסק קטן עם 500 שיחות לחודש משלם ₪250-600 סה"כ.' },
  { question: 'מה ההבדל בין WhatsApp Business רגיל ל-API?', answer: 'WhatsApp Business רגיל (האפליקציה החינמית) מתאים לעסקים קטנים שמנהלים שיחות ידניות. WhatsApp Business API מתאים לעסקים שרוצים אוטומציה: שליחה אוטומטית, אינטגרציה לCRM, בוטים, ושיחות במקביל ממספרים מרובים.' },
  { question: 'כמה זמן לוקח להוציא מספר WhatsApp API?', answer: 'תהליך הרישום ל-WhatsApp Business API לוקח 1-3 שבועות. כולל: פתיחת חשבון Meta Business, אימות זהות, קבלת מספר טלפון לשימוש כבלעדי ל-API (לא ניתן להשתמש בו באפליקציה הרגילה).' },
  { question: 'האם ניתן לשלוח הודעות שיווקיות ב-WhatsApp API?', answer: 'כן, אבל עם מגבלות. ניתן לשלוח הודעות שיווקיות ("Marketing") רק למי שהביע הסכמה. ניסיון לשלוח spam יגרום לחסימת החשבון. Meta מנטרת שיעורי חסימה ותלונות ומתחשבת בהם.' },
  { question: 'מה זה BSP ואיך בוחרים אחד?', answer: 'BSP (Business Solution Provider) הוא שותף רשמי של Meta שמספק גישה ל-API ופלטפורמת ניהול. בישראל: Gambot, Vibrate, ועוד. בחרו לפי: תמיכה בעברית, עלויות ריאליות, קלות שימוש, ואינטגרציות לCRM שלכם.' },
];

const WhatsappBusinessApiGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="WhatsApp Business API — מדריך התחלה מלא 2026 | EH Automation"
        description="מדריך מלא ל-WhatsApp Business API בישראל: מחירים, הגדרה, BSP, שיחות שיווק לעומת שירות, ואיך מתחילים. עדכני ל-2026."
        path="/blog/whatsapp-business-api-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'WhatsApp Business API', path: '/blog/whatsapp-business-api-guide' },
      ]} />
      <ArticleSchema
        title="WhatsApp Business API — מדריך התחלה מלא 2026"
        description="מדריך מלא ל-WhatsApp Business API בישראל: מחירים, הגדרה, BSP, שיחות שיווק לעומת שירות, ואיך מתחילים. עדכני ל-2026."
        path="/blog/whatsapp-business-api-guide"
        datePublished="2026-09-16"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">WhatsApp Business API — מדריך התחלה מלא 2026</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                WhatsApp Business API הוא הכלי שמאפשר לעסקים לשלוח הודעות אוטומטיות, להפעיל בוטים, ולנהל שיחות לקוחות בקנה מידה — הכל דרך WhatsApp. שיחת שיווק עולה ~₪0.13 וה-1,000 שיחות שירות ראשונות כל חודש הן חינמיות. המדריך הזה מסביר הכל.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה WhatsApp Business API ולמי זה מתאים?</h2>
              <p>
                WhatsApp Business API הוא הגרסה "המקצועית" של WhatsApp לעסקים — שבניגוד לאפליקציה החינמית, מאפשרת שליחה אוטומטית, אינטגרציה למערכות CRM, הפעלת בוטים חכמים, וניהול שיחות מרובות בו-זמנית.
              </p>
              <p>
                מי צריך WhatsApp Business API ולא רק את האפליקציה החינמית?
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>עסק שמקבל יותר מ-20-30 הודעות WhatsApp ביום</li>
                <li>עסק שרוצה לשלוח תזכורות, אישורים, או עדכונים אוטומטיים</li>
                <li>עסק שרוצה לחבר WhatsApp לCRM ולעקוב אחרי שיחות</li>
                <li>עסק שרוצה להפעיל בוט שעונה על שאלות נפוצות</li>
                <li>עסק שרוצה לשלוח הודעות שיווקיות לרשימת לקוחות</li>
              </ul>
              <p>
                עסק שמקבל 5 הודעות ביום — לא צריך API. עסק שמקבל 50+ ביום — API הוא השקעה שמחזירה את עצמה תוך חודשים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עולה WhatsApp Business API בישראל — מחירון מפורט 2026?</h2>
              <p>
                Meta מחייבת לפי "שיחות" (Conversations) — חלון של 24 שעות בין עסק ללקוח. יש 4 קטגוריות מחיר:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Marketing (שיווקי) — ~₪0.13 לשיחה</h3>
                  <p className="text-sm">הכי יקר. הצעות מחיר, עדכוני מוצרים, קמפיינים שיווקיים. דורש הסכמה מפורשת מהמשתמש.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Utility (שירות) — ~₪0.06 לשיחה</h3>
                  <p className="text-sm">אישורי הזמנה, תזכורות פגישות, עדכוני משלוח, חשבוניות. הכי נפוץ בעסקים.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Authentication (אימות) — ~₪0.035 לשיחה</h3>
                  <p className="text-sm">קודי OTP ואימות. זול ביותר לאחר שיחות שירות.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Service (תמיכה) — חינמי עד 1,000 לחודש</h3>
                  <p className="text-sm">שיחות שנפתחות על ידי הלקוח (שאלה ראשונה). 1,000 ראשונות חינמיות, אחר כך ~₪0.04 לשיחה.</p>
                </div>
              </div>
              <p>
                בנוסף למחירי Meta, ספק BSP גובה ₪175-450/חודש לפלטפורמת ניהול. עסק קטן עם 300 שיחות שיווק + 700 שיחות שירות ישלם בסביבות ₪300-500 לחודש סה"כ.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה BSP ואיך בוחרים ספק ב-2026?</h2>
              <p>
                BSP (Business Solution Provider) הוא חברה שמאושרת רשמית על ידי Meta לספק גישה ל-WhatsApp Business API. לא ניתן לגשת ל-API ישירות — חייבים לעבור דרך BSP.
              </p>
              <p>
                ה-BSP מספק:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>גישה ל-API וניהול המספר העסקי</li>
                <li>פלטפורמת ניהול שיחות (inbox לצוות)</li>
                <li>כלים לבניית תבניות הודעה</li>
                <li>אנליטיקס ודוחות</li>
                <li>תמיכה טכנית</li>
              </ul>
              <p>
                בישראל, ספקים בולטים כוללים: Gambot (ישראלי, תמיכה בעברית), Vibrate (ישראלי), ו-360dialog (בינלאומי). לעסקים ישראליים, ספק ישראלי עם תמיכה בעברית ובשעות ישראל הוא לרוב הבחירה הנכונה.
              </p>
              <p>
                לאינטגרציה עם CRM, n8n, ומערכות אוטומציה — ודאו שה-BSP שבחרתם מספק גישה ל-API גמיש ולא רק לממשק שלהם. לפרטים על בניית מערכת WhatsApp מלאה, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">תבניות הודעה (Message Templates) — מה מותר ומה אסור?</h2>
              <p>
                כל הודעה שיוזם העסק (ולא הלקוח) חייבת להיות "תבנית" מאושרת מראש על ידי Meta. זה אחד הדברים הכי חשובים להבין לפני שמתחילים עם API.
              </p>
              <p>
                כללים עיקריים לתבניות מאושרות:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">אסור:</strong> תבניות שיווקיות אגרסיביות, תוכן מטעה, הצעות של צד שלישי, תוכן למבוגרים.</li>
                <li><strong className="text-foreground">מותר:</strong> אישורי הזמנה, תזכורות פגישות, עדכוני משלוח, קודי אימות, הצעות מחיר שהתבקשו.</li>
                <li><strong className="text-foreground">שיווקי מותר:</strong> הצעות למי שהביע הסכמה מפורשת (Opt-in). "הירשמו לעדכונים" + קבלת עדכון = חוקי ומאושר.</li>
              </ul>
              <p>
                תהליך אישור תבנית לוקח בדרך כלל 1-24 שעות. דחיות נפוצות: שפה שיווקית יתרה, לינקים חשודים, ממשק מטעה. כשתבנית נדחית — Meta מסבירה למה, ואפשר לתקן ולהגיש מחדש.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך מתחילים — 5 שלבים להפעלת WhatsApp API</h2>
              <p>
                הנה התהליך המלא להפעלת WhatsApp Business API בעסק ישראלי:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">פתחו חשבון Meta Business Manager:</strong> הכניסו כל פרטי העסק, כולל אתר ומספר טלפון. ודאו שהחשבון מאומת.</li>
                <li><strong className="text-foreground">בחרו BSP:</strong> השוו מחירים, בדקו תמיכה, קראו ביקורות. לעסק ישראלי — ספק עם תמיכה בעברית.</li>
                <li><strong className="text-foreground">הגישו בקשה ל-API:</strong> דרך ה-BSP. תהליך אימות זהות העסק לוקח 3-14 ימים.</li>
                <li><strong className="text-foreground">בחרו מספר טלפון:</strong> מספר ייעודי ל-WhatsApp API (לא ניתן להשתמש בו באפליקציה הרגילה). ניתן לקנות מספר ישראלי ייעודי.</li>
                <li><strong className="text-foreground">בנו תבניות ואינטגרציות:</strong> כתבו, הגישו לאישור, ובנו את האוטומציות. השלב הכי ארוך — 1-3 שבועות לפרויקט מלא.</li>
              </ol>
              <p>
                סה"כ: 2-5 שבועות מתחילת התהליך עד להפעלה מלאה. לפרטים על אינטגרציה מלאה של WhatsApp API עם CRM ואוטומציה, ראו את <Link to="/solutions/crm-automation" className="text-primary hover:underline">פתרון אוטומציית CRM</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים להפעיל WhatsApp Business API לעסק שלכם?</h3>
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

export default WhatsappBusinessApiGuide;

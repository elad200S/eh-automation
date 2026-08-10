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
  { question: 'למה שיעור הפתיחה ב-WhatsApp כל כך גבוה יותר מאימייל?', answer: 'הודעות WhatsApp נפתחות ב-95-98% מהמקרים, לעומת 20-25% באימייל בלבד — פער של פי 4-5. הסיבה: WhatsApp הוא אפליקציית התקשורת המרכזית של רוב הישראלים, כך שהתראה נבדקת כמעט מיידית, בעוד תיבת אימייל נבדקת לעיתים רק פעם ביום או פחות.' },
  { question: 'מה ההבדל בין תבנית Utility ל-Marketing מבחינת עלות?', answer: 'תבנית Utility עולה כ-₪0.06 לשיחה, ותבנית Marketing כ-₪0.13 — יותר מכפול. אם Meta מזהה טון שיווקי בתבנית שסווגה כ-Utility, היא מסווגת אותה מחדש אוטומטית, והעלות יכולה לקפוץ פי 5-7 בהתאם למדינה. לכן חשוב לנסח תבניות שירותיות בצורה עניינית וברורה, בלי שפה משכנעת מדי.' },
  { question: 'האם עסק קטן שמקבל מעט הודעות בכלל צריך API?', answer: 'לא בהכרח. עסק שמקבל 5-20 הודעות ביום יכול להסתדר היטב עם אפליקציית WhatsApp Business החינמית ומענה ידני. ה-API משתלם כשיש נפח שדורש אוטומציה — תזכורות קבועות, אינטגרציה ל-CRM, או יותר מ-30 הודעות ביום שקשה לטפל בהן ידנית.' },
];

const WhatsappBusinessApiGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="WhatsApp Business API — מדריך התחלה מלא 2026 | HEY Digital"
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
                WhatsApp Business API הוא הכלי שמאפשר לעסקים לשלוח הודעות אוטומטיות, להפעיל בוטים, ולנהל שיחות לקוחות בקנה מידה — הכל דרך WhatsApp, ערוץ שנפתח ב-95-98% מהמקרים. שיחת שיווק עולה ~₪0.13 וה-1,000 שיחות שירות ראשונות כל חודש הן חינמיות. המדריך הזה מסביר הכל, כולל הטעויות שגורמות לחסימת חשבון.
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
                אז מי בפועל צריך WhatsApp Business API, ולא רק את האפליקציה החינמית הרגילה?
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>עסק שמקבל יותר מ-20-30 הודעות WhatsApp ביום</li>
                <li>עסק שרוצה לשלוח תזכורות, אישורים, או עדכונים אוטומטיים</li>
                <li>עסק שרוצה לחבר WhatsApp לCRM ולעקוב אחרי שיחות</li>
                <li>עסק שרוצה להפעיל בוט שעונה על שאלות נפוצות</li>
                <li>עסק שרוצה לשלוח הודעות שיווקיות לרשימת לקוחות</li>
              </ul>
              <p>
                עסק שמקבל 5 הודעות ביום — לא צריך API. עסק שמקבל 50+ ביום — API הוא השקעה שמחזירה את עצמה תוך חודשים, פשוט כי הזמן שנחסך ממענה ידני שווה יותר מהעלות החודשית של הפלטפורמה.
              </p>
              <p>
                נקודה חשובה שרוב המדריכים מדלגים עליה: המעבר ל-API הוא לא "שדרוג" של אותה חוויה — הוא שינוי בסיסי באיך שהעסק מתקשר. אפליקציית WhatsApp הרגילה מוגבלת למכשיר אחד ולאדם אחד שמקליד. API פותח את הדלת לצוות שלם שעובד באותו inbox, ולבוט שעונה גם כשכולם ישנים.
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
                בנוסף למחירי Meta, ספק BSP גובה ₪175-450/חודש לפלטפורמת ניהול. עסק קטן עם 300 שיחות שיווק + 700 שיחות שירות ישלם בסביבות ₪300-500 לחודש סה"כ — פחות ממה שרוב העסקים מעריכים לפני שהם בודקים בפועל.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה BSP ואיך בוחרים ספק ב-2026?</h2>
              <p>
                BSP (Business Solution Provider) הוא חברה שמאושרת רשמית על ידי Meta לספק גישה ל-WhatsApp Business API. לא ניתן לגשת ל-API ישירות — חייבים לעבור דרך BSP.
              </p>
              <p>
                בפועל, ה-BSP שאתם בוחרים מספק חבילה שלמה, לא רק "מפתח גישה":
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>גישה ל-API וניהול המספר העסקי</li>
                <li>פלטפורמת ניהול שיחות (inbox לצוות)</li>
                <li>כלים לבניית תבניות הודעה</li>
                <li>אנליטיקס ודוחות</li>
                <li>תמיכה טכנית</li>
              </ul>
              <p>
                בישראל, ספקים בולטים כוללים: Gambot (ישראלי, תמיכה בעברית), Vibrate (ישראלי), ו-360dialog (בינלאומי). לעסקים ישראליים, ספק ישראלי עם תמיכה בעברית ובשעות ישראל הוא לרוב הבחירה הנכונה — כי כשיש בעיה דחופה עם חשבון שנחסם או תבנית שנדחתה, ההבדל בין תמיכה זמינה בעברית לבין טיקט שממתין לתשובה בזמן אמריקאי הוא ההבדל בין תקלה של שעה לתקלה של יום שלם.
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
              <p>
                ב-2026 נכנסו כמה מגבלות טכניות נוקשות שכדאי להכיר לפני שכותבים תבנית: תקרה של 550 תווים בגוף ההודעה, מקסימום 10 אימוג'ים, ואיסור על תבניות כפולות (אותו תוכן פעמיים) — הפרות של הכללים האלה נדחות אוטומטית בלי בדיקה אנושית בכלל. טעות נפוצה נוספת: הגשת תבנית עם טקסט placeholder כמו <span dir="ltr">[NAME]</span> במקום משתנה תקני בפורמט <span dir="ltr">{'{{1}}'}</span> — זו הסיבה השנייה בשכיחותה לדחייה, אחרי תוכן שיווקי אגרסיבי מדי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך זה נראה בפועל — דוגמה מוחשית לתהליך אוטומטי</h2>
              <p>
                כדי להבין למה API כל כך שווה יותר מהאפליקציה הרגילה, הנה איך תהליך פשוט אך שלם נראה כשמחברים WhatsApp Business API לאוטומציה:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">ליד ממלא טופס באתר.</strong> הפרטים נכנסים אוטומטית ל-CRM דרך אינטגרציה (למשל <Link to="/blog/n8n-guide-israel" className="text-primary hover:underline">n8n</Link> או Make.com).</li>
                <li><strong className="text-foreground">תוך שניות, WhatsApp API שולח הודעת אישור.</strong> תבנית מאושרת מראש: "תודה שפניתם! נציג יחזור אליכם תוך שעה. בינתיים, הנה קישור למחירון."</li>
                <li><strong className="text-foreground">אם הליד לא נענה תוך 24 שעות — פולו-אפ אוטומטי.</strong> הודעה שנייה, מנוסחת אחרת, נשלחת ללא צורך במעורבות אנושית.</li>
                <li><strong className="text-foreground">ברגע שהלקוח עונה בטקסט חופשי — הבוט/הנציג רואים את כל ההיסטוריה.</strong> אין "התחלה מחדש" של השיחה, כי הכל מתועד ב-CRM המחובר.</li>
                <li><strong className="text-foreground">לאחר סגירת עסקה — הודעת Utility אוטומטית.</strong> אישור, פרטי תשלום, ותזכורת לפגישה או משלוח הבא — הכל בלי הקלדה ידנית.</li>
              </ol>
              <p>
                כל השלבים האלה קורים בלי שאיש צוות נוגע בטלפון — התפקיד האנושי נשמר לרגעים שבהם באמת צריך שיקול דעת, לא לחזרתיות. זה בדיוק ההבדל בין "יש לנו WhatsApp" ל"יש לנו מערכת".
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
                סה"כ: 2-5 שבועות מתחילת התהליך עד להפעלה מלאה. השלב הכי לרוב מתעכב הוא לא הטכני — הוא ההמתנה לאימות הזהות מול Meta, שיכולה להתארך אם פרטי העסק (שם, כתובת, מספר עוסק) לא תואמים בדיוק בין כל המקורות (אתר, פייסבוק ביזנס, ורישום העסק הרשמי). כדאי לוודא התאמה מראש כדי לא לאבד שבוע מיותר על תיקוני פרטים. לפרטים על אינטגרציה מלאה של WhatsApp API עם CRM ואוטומציה, ראו את <Link to="/solutions/crm-automation" className="text-primary hover:underline">פתרון אוטומציית CRM</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה זה באמת שווה — נתוני פתיחה והשוואה לערוצים אחרים?</h2>
              <p>
                הודעות WhatsApp Business נפתחות בשיעור של 95-98%, לעומת 20-25% בלבד באימייל — פער שמסביר למה כל כך הרבה עסקים עוברים לערוץ הזה. חלק ניכר מהפתיחות קורות תוך שלוש הדקות הראשונות משליחת ההודעה. עד 2026, 80% מהארגונים הגדולים בעולם צפויים להשתמש ב-WhatsApp Business API, ומעל 5 מיליון עסקים כבר משתמשים בו בפועל לצורך אוטומציה, מתוך יותר מ-200 מיליון עסקים שמשתמשים ב-WhatsApp בכלל.
              </p>
              <p>
                המשמעות המעשית לעסק ישראלי: אם אתם שולחים היום תזכורות באימייל או SMS וסופגים שיעורי פתיחה נמוכים, המעבר ל-WhatsApp API הוא כנראה השינוי היחיד שישפיע הכי הרבה על שיעורי המענה — הרבה יותר מכל שיפור בניסוח ההודעה עצמה. גם לקוח שלא עונה מיד, לרוב פותח וקורא — מה שכשלעצמו כבר משנה את תפיסת העסק בעיניו כמי שיצר קשר בזמן.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו עסקים ישראלים מרוויחים הכי הרבה מ-WhatsApp API?</h2>
              <p>
                לא כל עסק צריך API באותה מידה — אבל יש כמה תחומים שבהם ההחזר על ההשקעה מגיע הכי מהר, כי הם כבר תלויים בתקשורת אינטנסיבית עם לקוחות:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">קליניקות ומרפאות:</strong> אישורי תור, תזכורות, ותשובות לשאלות חוזרות — תעבורה גבוהה ותבניות פשוטות לאישור. ראו <Link to="/blog/clinic-automation" className="text-primary hover:underline">אוטומציה לקליניקות</Link>.</li>
                <li><strong className="text-foreground">מסעדות:</strong> אישורי הזמנת שולחן, תזכורות, ומשוב אחרי הביקור. ראו <Link to="/blog/restaurant-automation" className="text-primary hover:underline">אוטומציה למסעדות</Link>.</li>
                <li><strong className="text-foreground">חנויות איקומרס:</strong> עדכוני משלוח, אישורי הזמנה, ותזכורות עגלה נטושה — כל אלה נופלים תחת קטגוריית Utility הזולה יחסית.</li>
                <li><strong className="text-foreground">סוכני נדל"ן וביטוח:</strong> מעקב אחרי לידים חמים שדורש מענה תוך דקות, לא שעות — בדיוק המקום שבו שיעור פתיחה של 95%+ עושה את ההבדל בין עסקה שנסגרת לליד שהתקרר.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו טעויות גורמות לחסימת חשבון WhatsApp API?</h2>
              <p>
                החשבון שלכם יכול להיחסם, ולא רק תבנית בודדת להידחות — כדאי להכיר את הטריגרים המרכזיים לפני שמתחילים:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">שליחה למי שלא נתן הסכמה מפורשת (Opt-in):</strong> הטריגר הכי נפוץ לחסימה. רכישת רשימת אנשי קשר או "גירוד" מספרים מהאינטרנט — ערובה כמעט ודאית לחסימה תוך שבועות.</li>
                <li><strong className="text-foreground">שיעור חסימות/תלונות גבוה מהמשתמשים:</strong> Meta עוקבת אחרי כמה נמענים חוסמים אתכם או מדווחים על ההודעה כספאם, ומענישה בהתאם.</li>
                <li><strong className="text-foreground">שימוש בתבנית שלא לפי הייעוד המקורי:</strong> תבנית שאושרה לעדכון הזמנה ואתם משנים אותה להצעה שיווקית — נחשב שימוש לרעה בתבנית, וחוזר על עצמו יגרור הגבלות.</li>
                <li><strong className="text-foreground">סיווג שגוי בין Utility למ-Marketing:</strong> אם מגישים תבנית כ"שירותית" אבל Meta מזהה טון שיווקי, היא מסווגת אותה מחדש אוטומטית — והעלות לשיחה קופצת פי 5-7, תלוי במדינה.</li>
                <li><strong className="text-foreground">קפיצת נפח פתאומית:</strong> מעבר ממאות להודעות אלפים ביום בבת אחת, בלי היסטוריה — נראה חשוד למערכות הזיהוי האוטומטיות של Meta.</li>
              </ul>
              <p>
                כללי אצבע פשוטים שמונעים רוב הבעיות: שלחו רק למי שביקש, אל תשנו תבנית מאושרת מהייעוד המקורי שלה, והעלו נפח בהדרגה ולא בקפיצה חדה. ערעור על חסימה אפשרי, אבל התהליך יכול לקחת שבועות — הרבה יותר קל למנוע מראש מאשר לתקן אחרי שהחשבון כבר מוגבל.
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

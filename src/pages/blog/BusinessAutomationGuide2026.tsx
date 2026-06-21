import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'כמה עולה אוטומציה עסקית לעסק קטן בישראל?',
    answer: 'טווח המחירים רחב: פרויקט אוטומציה נקודתי מתחיל מ-₪1,500-3,500, בוט WhatsApp בסיסי עולה ₪3,500-5,000 חד-פעמי ועוד ₪100-300 לחודש, ושירות אוטומציה חודשי מלא מתחיל מ-₪1,490 לחודש. עסקים ישראלים מחזירים את ההשקעה בדרך כלל תוך 2-4 חודשים מהחיסכון בזמן ובעלויות כוח אדם.',
  },
  {
    question: 'מאיפה כדאי להתחיל עם אוטומציה עסקית?',
    answer: 'התחילו מהתהליך שכואב הכי הרבה: אם אתם מבזבזים שעות ביום על מענה לפניות — התחילו מבוט WhatsApp. אם הלידים מתקררים — התחילו מפולו-אפ אוטומטי. אם קביעת תורים מעייפת — התחילו מאוטומציית לוח זמנים. הכלל הוא לזהות תהליך שחוזר על עצמו לפחות 5-10 פעמים ביום ולאטמט אותו קודם כל.',
  },
  {
    question: 'כמה זמן לוקח להטמיע אוטומציה עסקית?',
    answer: 'אוטומציה פשוטה (כמו תזכורת פגישה אוטומטית דרך WhatsApp) ניתן להטמיע תוך 1-3 ימי עבודה. מערכת אוטומציה מלאה — כולל CRM, בוט WhatsApp ומעקב לידים — לוקחת בדרך כלל 2-4 שבועות. הזמן תלוי בסבוכות התהליכים הקיימים ובמספר המערכות שמחברים.',
  },
  {
    question: 'האם אוטומציה מתאימה לכל סוג עסק?',
    answer: 'כן — אבל לא כל תהליך ניתן לאוטמט. אוטומציה עסקית מתאימה לכל עסק שיש בו תהליכים חוזרים ונשנים: מענה ללקוחות, תיאום פגישות, שליחת חשבוניות, מעקב לידים ועוד. עסקים שדורשים שיקול דעת אנושי בכל שלב — כמו ייעוץ מקצועי — עדיין נהנים מאוטומציה על ה"פריפריה": תיאומים, תזכורות ומינהל.',
  },
  {
    question: 'מה ה-ROI הריאלי של אוטומציה עסקית?',
    answer: 'נתוני 2026 מראים ROI ממוצע של 240% תוך 6-9 חודשים ממועד ההטמעה. כ-60% מהמיזמים מחזירים את ההשקעה תוך 12 חודשים. עסקים ישראלים חוסכים בממוצע 37 שעות עבודה בחודש ו-₪8,000-₪15,000 בעלויות עובדים. אוטומציה פשוטה שחוסכת 10-20 שעות בשבוע מחזירה את עצמה תוך 1-3 חודשים בלבד.',
  },
];

const BusinessAutomationGuide2026 = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026 | EH Automation"
        description="אוטומציה עסקית חוסכת 40% מזמן העבודה ומחזירה ROI של 240% תוך 9 חודשים. המדריך המלא לבעלי עסקים בישראל: מה לאטמט, כמה עולה ואיך מתחילים."
        path="/blog/business-automation-guide-2026"
        type="article"
      />
      <BreadcrumbSchema
        items={[
          { name: 'בית', path: '/' },
          { name: 'בלוג', path: '/blog' },
          { name: 'אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026', path: '/blog/business-automation-guide-2026' },
        ]}
      />
      <ArticleSchema
        title="אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026"
        description="אוטומציה עסקית חוסכת 40% מזמן העבודה ומחזירה ROI של 240% תוך 9 חודשים. המדריך המלא לבעלי עסקים בישראל: מה לאטמט, כמה עולה ואיך מתחילים."
        path="/blog/business-automation-guide-2026"
        datePublished="2026-06-21"
      />
      <FAQSchema items={faqItems} />
      <Navbar />
      <main className="bg-background min-h-screen pt-16">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                אוטומציה עסקית היא הדרך המהירה ביותר לחסוך זמן, לצמצם עלויות ולהגדיל הכנסות — בלי לשכור עובדים נוספים. מחקרים מ-2026 מראים שעסקים שמטמיעים אוטומציה עסקית נכונה חוסכים בממוצע 40% מזמן העבודה השבועי ומגיעים ל-ROI של 240% תוך פחות משנה. במדריך הזה תמצאו הכל — מה זה אוטומציה, מאיפה מתחילים, כמה עולה ואיך בוחרים את הפתרון הנכון לעסק שלכם.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה אוטומציה עסקית ולמה כל עסק בישראל צריך אותה ב-2026?</h2>
              <p>
                אוטומציה עסקית היא שימוש בתוכנה וטכנולוגיה כדי לבצע תהליכים עסקיים חוזרים באופן אוטומטי — בלי התערבות אנושית. במקום שעובד ישלח אימייל תזכורת לכל לקוח ביד, מערכת אוטומטית שולחת אותו בדיוק בזמן הנכון. במקום לרשום כל ליד ב-CRM ידנית, הוא נכנס אוטומטית ברגע שממלאים טופס.
              </p>
              <p>
                בישראל של 2026, אוטומציה עסקית עברה מ"יתרון תחרותי" ל"תנאי הישרדות". עלויות העסקה גבוהות, שוק העבודה מוגבל, וציפיות הלקוחות מזמן קריאה לתגובה מיידית. עסקים שעדיין מנהלים הכל ידנית מתקשים להתחרות עם מתחרים שמפעילים מערכות אוטומטיות שעובדות 24 שעות ביממה, 7 ימים בשבוע.
              </p>
              <p>
                הנתונים מדברים בעד עצמם: אנשי מכירות מבלים רק 28-30% מהזמן שלהם במכירות בפועל — ה-70% הנותרים הולכים על מינהל, הזנת נתונים, פולו-אפים ותיאום. <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> מחזירה את ה-70% האלה לדברים שבאמת חשובים: בניית קשרים עם לקוחות וסגירת עסקאות.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו תהליכים כדאי לאטמט קודם — ואיפה הזמן הולך לאיבוד?</h2>
              <p>
                לפני שמתחילים, חשוב למפות איפה הכאב הכי גדול. בעסקים ישראלים טיפוסיים, שלושת האזורים שבהם הכי הרבה זמן הולך לאיבוד הם:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong>מענה ללקוחות ולידים:</strong> כל פנייה שמגיעה ב-WhatsApp, אימייל או אתר — מישהו צריך לקרוא, להבין ולענות. בעסק עם 50 פניות ביום, זה בקלות 3-4 שעות.</li>
                <li><strong>קביעת ותיאום פגישות:</strong> לכל פגישה שמתואמת, ממוצע 4-6 הודעות הלוך ושוב. ב-20 פגישות בשבוע — מדובר בשעות ספורות שנעלמות.</li>
                <li><strong>מעקב אחרי לידים ופולו-אפ:</strong> רוב הלידים לא נעלמים כי הם לא מתאימים — הם נעלמים כי איש מכירות שכח לחזור. מחקרים מראים ש-74% מהלידים שלא קיבלו מענה תוך 5 דקות "מתקררים" ועוברים למתחרה.</li>
                <li><strong>שליחת חשבוניות ותשלומים:</strong> הפקת חשבונית, שליחה, מעקב אחרי תשלום ותזכורות — פעולות מינהליות שחוזרות על עצמן מדי חודש.</li>
                <li><strong>דיווחים ואיסוף נתונים:</strong> ריכוז נתונים ממקורות שונים לדוח שבועי לוקח שעות — עוד אזור שאוטומציה פותרת בלחיצת כפתור.</li>
              </ul>
              <p>
                בעסק ממוצע, אוטומציה של חמשת האזורים האלה חוסכת 37 שעות עבודה בחודש — שווה ל-₪8,000-₪15,000 בעלויות כוח אדם.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עולה אוטומציה עסקית בישראל ב-2026 — טווחי מחירים ריאליים?</h2>
              <p>
                אחת השאלות הנפוצות ביותר שבעלי עסקים שואלים היא "כמה זה עולה?" — ותשובה כנה היא שהמחירים רחבים מאוד, תלוי בסוג הפרויקט.
              </p>
              <div className="bg-muted/20 rounded-xl p-6 space-y-3 border border-border">
                <h3 className="font-semibold text-foreground">מחירון אוטומציה עסקית — ישראל 2026</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-start gap-4"><span>אוטומציה נקודתית (1-5 שעות עבודה)</span><span className="font-medium text-foreground whitespace-nowrap">₪1,500 חד-פעמי</span></li>
                  <li className="flex justify-between items-start gap-4"><span>בוט WhatsApp בסיסי לתיאום תורים</span><span className="font-medium text-foreground whitespace-nowrap">₪3,500-5,000 + ₪100-300/חודש</span></li>
                  <li className="flex justify-between items-start gap-4"><span>מערכת ניהול לידים + פולו-אפ אוטומטי</span><span className="font-medium text-foreground whitespace-nowrap">₪3,000-8,000</span></li>
                  <li className="flex justify-between items-start gap-4"><span>שירות אוטומציה מנוהל (חודשי)</span><span className="font-medium text-foreground whitespace-nowrap">₪1,490-4,000/חודש</span></li>
                  <li className="flex justify-between items-start gap-4"><span>מערכת אוטומציה מלאה (CRM + WhatsApp + דיווחים)</span><span className="font-medium text-foreground whitespace-nowrap">₪8,000-25,000</span></li>
                </ul>
              </div>
              <p>
                החזר ההשקעה מגיע בדרך כלל תוך 2-4 חודשים, כאשר אוטומציה פשוטה שחוסכת 10-20 שעות עבודה בשבוע מחזירה את עצמה תוך חודש עד שלושה. הנקודה החשובה: <Link to="/solutions/workflow-automation" className="text-primary hover:underline">אוטומציה של תהליכי עבודה</Link> היא השקעה שמשתלמת גם בטווח הקצר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך עובדת אוטומציה עסקית בפועל — שלב אחר שלב?</h2>
              <p>
                להבין איך אוטומציה עובדת בפועל זה המפתח לקבל החלטה אם ומה לאטמט. האוטומציה בנויה תמיד על אותה שיטה: טריגר → תנאי → פעולה.
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li>
                  <strong>טריגר (Trigger) — מה מפעיל את האוטומציה:</strong> לקוח ממלא טופס באתר, שולח הודעת WhatsApp, מבצע רכישה, פגישה מגיעה ל-24 שעות — כל אחד מאלה יכול להיות "הכפתור" שמפעיל את התהליך האוטומטי.
                </li>
                <li>
                  <strong>תנאי (Condition) — מה בודקים:</strong> האם הלקוח ליד חדש או קיים? האם מדובר בפגישה ראשונה? מהי השעה? תנאים מאפשרים לאוטומציה להחליט מה לעשות במצבים שונים.
                </li>
                <li>
                  <strong>פעולה (Action) — מה קורה:</strong> שליחת הודעת WhatsApp, יצירת רשומה ב-CRM, שליחת אימייל, יצירת תזכורת ביומן, הפקת חשבונית. הפעולה מבוצעת מיידית, בדיוק ובלי לשכוח.
                </li>
              </ol>
              <p>
                לדוגמה: לקוח ממלא טופס יצירת קשר באתר (טריגר) → המערכת בודקת האם הוא לקוח קיים (תנאי) → אם לא, נפתחת כרטיסייה חדשה ב-CRM, נשלחת הודעת WhatsApp אוטומטית עם הצגה עצמית, ומוגדרת תזכורת לאיש המכירות לחזור תוך שעה (פעולה). הכל בלי שאף אחד בעסק עשה דבר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אוטומציה של WhatsApp — למה זה הדבר הראשון שעסק ישראלי צריך?</h2>
              <p>
                ישראל היא אחת המדינות עם שיעורי השימוש הגבוהים בעולם ב-WhatsApp. עבור עסקים ישראלים, WhatsApp הוא ערוץ הקשר העיקרי עם לקוחות — הרבה יותר מאימייל או טלפון. לכן, <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציה של WhatsApp</Link> היא לרוב הצעד הראשון ובעל ה-ROI הגבוה ביותר.
              </p>
              <p>
                עסקים ישראלים שאוטמטו את ה-WhatsApp שלהם מדווחים על תוצאות מדהימות: עלייה של 40-60% בהמרת לידים, ירידה של 30-35% בביטולי תורים ו-10-15 שעות פנויות לכל עובד בשבוע. קליניקות שהטמיעו תזכורות אוטומטיות ב-WhatsApp מדווחות על ירידה של 40-60% במספר ה-no-show.
              </p>
              <p>
                מה שניתן לאטמט ב-WhatsApp לעסק: מענה ראשוני אוטומטי לפניות, תיאום פגישות וקביעת תורים, שליחת תזכורות 24/48 שעות לפני פגישה, פולו-אפ אחרי פגישה, שליחת קישור לתשלום, ועדכון סטטוס הזמנה. כל אלה — בלי שאיש יגע בטלפון.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">CRM ואוטומציה — איך מחברים את הכל ביחד?</h2>
              <p>
                CRM (מערכת ניהול לקוחות) הוא הלב של כל מערכת אוטומציה עסקית רצינית. הוא מרכז את כל המידע על לקוחות, לידים ועסקאות — ומאפשר לאוטומציה לפעול בצורה חכמה ומותאמת אישית.
              </p>
              <p>
                כשמחברים <Link to="/solutions/crm-automation" className="text-primary hover:underline">CRM לאוטומציה</Link>, התהליך נראה כך: ליד חדש נכנס מגוגל/פייסבוק/אתר → נפתחת כרטיסייה ב-CRM אוטומטית → נשלחת הודעת WhatsApp + אימייל → מוגדרת תזכורת לאיש מכירות → בהמשך, מעקב אחרי ההצעה, תזכורות לסגירה ואחרי הסגירה — ניהול שוטף של הקשר. כל זה קורה מבלי שהצוות צריך להסתכל על מסך.
              </p>
              <p>
                ה-74% מהמנהלים שאמרו שאוטומציה חסכה להם 11-30% מהזמן — רובם הגדול הצביע על אוטומציה של ה-CRM כנקודת ה"ברייקאווי" שהכי שינתה את אופן העבודה שלהם.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מהם הכלים הנפוצים ביותר לאוטומציה עסקית — ומה מתאים לעסק שלכם?</h2>
              <p>
                שוק כלי האוטומציה גדל בצורה אסטרונומית בשנים האחרונות. בישראל של 2026, הכלים הנפוצים ביותר הם:
              </p>
              <ul className="list-disc list-inside space-y-3 pr-4">
                <li>
                  <strong>Make.com (לשעבר Integromat):</strong> הכלי הפופולרי ביותר בקרב מיישמי אוטומציה בישראל. מאפשר חיבור בין מאות אפליקציות עם ממשק ויזואלי. מתאים לתהליכים מורכבים ולוגיקה מסועפת. עלות: מ-$9 לחודש.
                </li>
                <li>
                  <strong>Zapier:</strong> הכלי הנפוץ ביותר בעולם. פשוט יותר מ-Make, עם 7,000+ אינטגרציות. מתאים לאוטומציות פשוטות ולבעלי עסקים שרוצים לנהל את הכל בעצמם. עלות: מ-$19 לחודש.
                </li>
                <li>
                  <strong>n8n:</strong> כלי קוד פתוח שניתן להריץ בשרת פרטי — בחינם. מתאים לעסקים עם צרכים מיוחדים ורגישות לפרטיות. דורש ידע טכני.
                </li>
                <li>
                  <strong>WhatsApp Business API:</strong> הפלטפורמה הרשמית של Meta לשליחת הודעות WhatsApp בקנה מידה גדול. דרוש לכל אוטומציית WhatsApp ברצינית. עולה לפי הודעות — בדרך כלל ₪0.05-0.30 להודעה.
                </li>
              </ul>
              <p>
                הבחירה בכלי תלויה בצרכי העסק, בתקציב ובמי שינהל את המערכת. לעסקים שרוצים פתרון מנוהל — <Link to="/solutions/ai-agents" className="text-primary hover:underline">סוכני AI</Link> יכולים לטפל בשכבת ה"בינה" מעל כל אחד מהכלים האלה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">ROI של אוטומציה — כמה תחסכו ומתי מחזירים את ההשקעה?</h2>
              <p>
                השאלה שכל בעל עסק שואל: "מתי זה משתלם?" — והתשובה, בניגוד לרבים שחושבים, מהירה מאוד.
              </p>
              <p>
                נתוני 2026 מראים ROI ממוצע של 240% תוך 6-9 חודשים לאחר הטמעה. כ-60% מהמיזמים מחזירים את ההשקעה תוך 12 חודשים — וזה עם אוטומציות בינוניות עד מורכבות. אוטומציה פשוטה כמו תזכורות WhatsApp (שעולה ₪300 לחודש) מחזירה את עצמה תוך 2-3 שבועות אם היא מצמצמת אפילו 5 ביטולי תורים בחודש.
              </p>
              <p>
                חישוב פשוט: אם שעת עבודה שלכם שווה ₪150, ואוטומציה חוסכת 15 שעות בשבוע — מדובר בחיסכון של ₪9,000 בחודש. מערכת שעולה ₪2,000 בחודש מחזירה 4.5 על ההשקעה — כל חודש. זה ה-ROI הריאלי שרואים בשטח.
              </p>
              <p>
                מעבר לחיסכון בכסף, יש גם ערך שקשה לכמת: שגיאות אנוש מאפס (אף לקוח לא "נופל בין הכסאות"), זמינות 24/7, ועקביות בחוויית הלקוח בכל פעם.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה לא לאטמט — ואיפה אוטומציה יכולה לפגוע בעסק?</h2>
              <p>
                אוטומציה היא כלי עוצמתי, אבל כמו כל כלי — השימוש הלא נכון יכול לגרום נזק. כ-66% מהחברות משתמשות בצורה כלשהי של אוטומציה, אבל רק 1% ממבצעי התוכניות רואים את ההטמעה כ"בשלה". מה הבעיה?
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong>אוטומציה של תהליך שבור:</strong> אם תהליך המכירה שלכם לא עובד ידנית, אוטומציה רק תאיץ את הכשלון. קודם כל תתקנו את התהליך, אחר כך תאטמטו.</li>
                <li><strong>אוטומציה יתר של שיחות רגשיות:</strong> פניות לאחר אירוע טרגי, תלונות רציניות, שאלות מורכבות — אלה צריכות מענה אנושי. בוט שעונה בצורה קרה לאדם שזקוק לאמפתיה יזיק לעסק.</li>
                <li><strong>חוסר שקיפות ללקוח:</strong> לקוחות ישראלים רגישים במיוחד כשמגלים שדיברו עם בוט בלי שידעו. שקיפות — "אני יואב, הסוכן האוטומטי של X" — בונה אמון.</li>
                <li><strong>אוטומציה בלי ניטור:</strong> מערכת אוטומציה שלא מנוטרת יכולה לשלוח שגיאות לאלפי לקוחות לפני שמישהו שם לב. תמיד צריך אלרטים על כשלים.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מדריך 5 צעדים — איך מתחילים עם אוטומציה עסקית ב-2026?</h2>
              <p>
                רוצים להתחיל? הנה תוכנית פעולה ריאלית:
              </p>
              <ol className="list-decimal list-inside space-y-4 pr-4">
                <li>
                  <strong>מיפוי תהליכים (שבוע 1):</strong> רשמו על דף את כל התהליכים החוזרים בעסק שלכם — מענה לפניות, תיאום פגישות, מעקב לידים, חשבוניות, דיווחים. לצד כל תהליך, רשמו כמה פעמים הוא חוזר ביום וכמה זמן לוקח.
                </li>
                <li>
                  <strong>סדר עדיפויות לפי ROI (שבוע 1-2):</strong> חשבו: מה הזמן × מחיר לשעה × כמות חזרות בחודש. התהליך עם הסכום הגבוה ביותר — זה מה שמאטמטים ראשון.
                </li>
                <li>
                  <strong>בחירת כלי והגדרת תקציב (שבוע 2):</strong> האם אתם רוצים לנהל בעצמם (Make/Zapier) או להיעזר ב<Link to="/solutions/business-automation" className="text-primary hover:underline">שירות מיישם אוטומציה</Link>? לעסקים קטנים — שירות מנוהל בדרך כלל משתלם יותר כי חוסך זמן למידה.
                </li>
                <li>
                  <strong>פיילוט קטן (שבועות 3-4):</strong> התחילו עם אוטומציה אחת פשוטה — לא עם מערכת שלמה. בדקו שהיא עובדת, מדדו את התוצאות, ורק אז הרחיבו.
                </li>
                <li>
                  <strong>מדידה, שיפור והרחבה (חודש 2+):</strong> כל חודש, הסתכלו על המדדים: כמה פניות טיפלנו, כמה זמן חסכנו, כמה לידים המירנו. שפרו את האוטומציות הקיימות והוסיפו חדשות.
                </li>
              </ol>
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לדעת אילו תהליכים בעסק שלכם כדאי לאטמט ראשון?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — בלי מחויבות.</p>
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

export default BusinessAutomationGuide2026;

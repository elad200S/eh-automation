import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'מה ההבדל בין סוכן AI לצ\'אטבוט רגיל?',
    answer: 'צ\'אטבוט רגיל עונה על שאלות לפי תסריט קבוע מראש. סוכן AI מבין שפה טבעית, מחליט באופן עצמאי מה לעשות, ומבצע פעולות בפועל — כמו עדכון CRM, שליחת הצעת מחיר, או קביעת פגישה ביומן. ההבדל הוא בין עוזר שקורא תשובות לבין עובד שמבצע משימות.',
  },
  {
    question: 'כמה עולה סוכן AI לעסק קטן בישראל?',
    answer: 'המחיר תלוי ברמת ההתאמה. פתרון SaaS מוכן עולה ₪200–700 לחודש. סוכן מותאם עם חיבורים למערכות קיימות מתחיל מ-₪5,000 עד ₪30,000 להטמעה, ועוד ₪500–2,000 לחודש לתחזוקה ושיפורים שוטפים.',
  },
  {
    question: 'תוך כמה זמן מחזירים את ההשקעה בסוכן AI?',
    answer: 'לפי נתוני 2026, הזמן החציוני לפריצת נקודת האיזון הוא 4.1 חודשים עבור שירות לקוחות ו-6.7 חודשים עבור אוטומציית שיווק. עסקים שבוחרים פתרונות מוכנים מחזירים את ההשקעה מהר יותר — פי 2.4 — ממי שבונים מאפס.',
  },
  {
    question: 'האם סוכן AI יכול לעבוד עם WhatsApp?',
    answer: 'בהחלט. שילוב סוכן AI עם WhatsApp Business API הוא אחד השימושים הנפוצים ביותר בישראל — 99% מהעסקים הישראליים כבר עובדים עם WhatsApp, כך שהסוכן פועל בערוץ שהלקוחות כבר נמצאים בו. ניתן לחבר לכל מערכת CRM, יומן, ועוד.',
  },
  {
    question: 'מה הטעות הנפוצה ביותר בהטמעת סוכן AI?',
    answer: 'הטעות הנפוצה ביותר היא לצפות שסוכן אחד יעשה הכל. ככל שהמשימה רחבה יותר, התוצאות גרועות יותר. עדיף שלושה סוכנים ממוקדים — אחד לשירות לקוחות, אחד לניהול לידים, ואחד לתזכורות — מסוכן אחד שמנסה לכסות הכל.',
  },
];

const AiAgentBusinessGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים | EH Automation"
        description="סוכן AI לעסק: מה זה, כמה עולה, מה ה-ROI הריאלי, ו-5 דברים שחייבים לבדוק לפני שמתחילים. מדריך מעשי לבעלי עסקים ישראלים 2026."
        path="/blog/ai-agent-business-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים', path: '/blog/ai-agent-business-guide' },
      ]} />
      <ArticleSchema
        title="סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים"
        description="סוכן AI לעסק: מה זה, כמה עולה, מה ה-ROI הריאלי, ו-5 דברים שחייבים לבדוק לפני שמתחילים. מדריך מעשי לבעלי עסקים ישראלים 2026."
        path="/blog/ai-agent-business-guide"
        datePublished="2026-07-26"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">סוכני AI</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                סוכן AI לעסק הוא תוכנה אוטונומית שמבינה שפה טבעית, מקבלת החלטות ומבצעת פעולות עסקיות בפועל — בלי שמישהו מנחה אותה בכל שלב. בשנת 2026, שוק סוכני ה-AI הגלובלי עבר את 10.9 מיליארד דולר, וכבר 67% מהעסקים בישראל מתכננים להטמיע אחד. לפני שגם אתם מתחילים — הנה כל מה שצריך לדעת.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ההבדל בין סוכן AI לצ'אטבוט — ולמה זה חשוב?</h2>
              <p>
                שאלת השאלות. רוב בעלי העסקים שואלים אותה כשהם פוגשים את המושג לראשונה, ובצדק. הרבה ספקים מתייחסים לשני המוצרים כאחד, אבל ההבדל ביניהם הוא הבדל של עולם ועולם.
              </p>
              <p>
                <strong className="text-foreground">צ'אטבוט רגיל</strong> פועל לפי תסריט קבוע מראש. אתם מגדירים שאלות ותשובות, ולקוחות בוחרים מתוך תפריטים. הוא לא מבין משפטים חופשיים, הוא לא פועל על מערכות חיצוניות, והוא לא מחליט כלום בעצמו. אם הלקוח שאל משהו מחוץ לתסריט — הוא נתקע.
              </p>
              <p>
                <strong className="text-foreground">סוכן AI</strong> הוא שכבה שונה לחלוטין. הוא מבין שפה טבעית כולל ניסוחים שונים, שגיאות כתיב וסלנג. הוא <em>מחליט</em> מה לעשות בכל שיחה בהתאם להקשר, ואז <em>מבצע</em> את הפעולה בפועל — עדכון CRM, שליחת מייל, פתיחת כרטיס תמיכה, קביעת פגישה ביומן, שליחת הצעת מחיר. לפי מחקר IBM מ-2025, סוכני AI פותרים 78% מהפניות ללא כל התערבות אנושית.
              </p>
              <p>
                האנלוגיה הנכונה: צ'אטבוט הוא כמו שלט IVR אוטומטי — לחץ 1 למכירות, 2 לתמיכה. סוכן AI הוא כמו עובד אנושי שמבין את השיחה, מחליט מה נדרש, ומסדר את הדברים בעצמו.
              </p>
              <p>
                <Link to="/solutions/ai-agents" className="text-primary hover:underline font-medium">הפתרונות של EH Automation לסוכני AI</Link> מבוססים על הגישה הזו — לא בוטים עם תפריטים, אלא סוכנים שפועלים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה בדיוק סוכן AI יכול לעשות לעסק שלך — בפועל?</h2>
              <p>
                בואו ניגע בדוגמאות קונקרטיות, כי ברמה התיאורטית קל לאבד את הפוקוס. הנה חמישה תרחישים שעסקים ישראלים מיישמים כבר היום:
              </p>
              <ul className="space-y-3 list-none pr-4">
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">מענה ללידים 24/7:</strong> לקוח ממלא טופס בשעה 23:00. סוכן AI שולח לו הודעת WhatsApp תוך 30 שניות, שואל שאלות כדי להבין את הצורך, ומקבע שיחת ייעוץ ליום המחרת — בלי שום התערבות שלכם. ממוצע מענה ידני ללידים בישראל: 42 שעות. סוכן AI: 30 שניות.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">שירות לקוחות אחרי שעות:</strong> לקוח שואל שאלה על סטטוס הזמנה, מדיניות החזרות, או זמינות מוצר. הסוכן מושך נתונים מהמערכת בזמן אמת ועונה בשניות — 78% מהפניות כאלה נסגרות ללא מגע אנושי.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">תזכורות ותיאום תורים:</strong> במרפאות ובסלוני יופי, סוכן AI שולח תזכורות אוטומטיות ב-WhatsApp, מאפשר אישור/ביטול/שינוי שעה — ומוריד את ה-no-show ב-40% עד 60%. יותר מכך, הוא ממלא אוטומטית מקומות שהתפנו.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">ניהול לידים וסינון:</strong> סוכן AI שמסנן לידים לפי שאלות כישוריות, מפריד בין לקוחות רציניים לסקרנים, ומוסר לנציג המכירות רק את מי שעמד בקריטריונים. <Link to="/solutions/crm-automation" className="text-primary hover:underline">שילוב עם CRM</Link> מאפשר לכל הנתונים לעדכן את עצמם אוטומטית.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">פולו-אפ אחרי שיחה:</strong> אחרי פגישת מכירה, הסוכן שולח סיכום, מציע מידע נוסף, ומתזמן תזכורת מעקב — כך שאף ליד לא נופל בין הכיסאות.
                </li>
              </ul>
              <p>
                בכל התרחישים האלה, הסוכן עובד בתוך <Link to="/solutions/workflow-automation" className="text-primary hover:underline">תהליכי העבודה הקיימים שלכם</Link> — לא מחליף אותם, אלא מייעל אותם.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה סוכן AI לעסק בישראל ב-2026?</h2>
              <p>
                זו השאלה שכולם רוצים לדעת, ויש בה כמה שכבות. המחיר תלוי מאוד ברמת ההתאמה, במספר המערכות שמחוברות, ובמורכבות התהליכים.
              </p>
              <div className="bg-muted/30 rounded-xl border border-border p-6 space-y-3">
                <h3 className="font-semibold text-foreground">טווחי מחירים נפוצים בישראל:</h3>
                <ul className="space-y-2">
                  <li><strong className="text-foreground">פתרון SaaS מוכן (בוט מדף):</strong> ₪200–700 לחודש. מתאים לעסקים שמחפשים תשובות מהירות לשאלות נפוצות, בלי אינטגרציות מורכבות.</li>
                  <li><strong className="text-foreground">סוכן AI קולי:</strong> מ-₪650 לחודש, לעסקים שרוצים שיחות טלפוניות אוטומטיות.</li>
                  <li><strong className="text-foreground">סוכן מותאם עם אינטגרציות:</strong> ₪5,000–30,000 להטמעה ראשונית, ועוד ₪500–2,000 לחודש לתחזוקה. זה הפתרון שמחבר את הסוכן ל-CRM, ליומן, לווטסאפ ולמערכות נוספות.</li>
                </ul>
              </div>
              <p>
                ההשוואה הנכונה: עובד חצי-משרה עולה ₪4,000–6,000 לחודש, ועובד במשרה מלאה ₪7,000–12,000. סוכן AI בסדר גודל בינוני עולה ₪500–2,000 לחודש, פועל 24/7, לא יוצא לחופשות ולא מתקשר בבוקר לדווח על מחלה.
              </p>
              <p>
                גורם חשוב שמשפיע על המחיר: כמה מערכות צריך לחבר. סוכן שרק עונה על שאלות זול יותר ממי שמעדכן CRM, פותח כרטיסי תמיכה, מוציא חשבוניות ומסנכרן יומן — כי כל אינטגרציה מוסיפה עבודת פיתוח.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מהו ה-ROI הריאלי — ולא רק מה שספקים מבטיחים?</h2>
              <p>
                הנתונים הגלובליים מ-2026 מציגים תמונה מורכבת. ה-ROI הממוצע לסוכני AI שפועלים בהצלחה הוא 171% — מספר יפה. אבל חשוב לדעת גם את הצד האחר: רק 41% מהפרויקטים מגיעים ל-ROI חיובי בתוך 12 חודשים, ו-Gartner מעריך שמעל 40% מהפרויקטים בתחום יופסקו עד סוף 2027 — בגלל עלויות לא צפויות, ציפיות לא ריאליות, ומחסור בבקרת סיכונים.
              </p>
              <p>
                מה זה אומר לעסק שלכם? שה-ROI אפשרי לחלוטין, אבל רק אם מתחילים נכון.
              </p>
              <p>
                לפי הנתונים, הזמן החציוני לפריצת נקודת האיזון הוא:
              </p>
              <ul className="space-y-1 pr-4 list-disc">
                <li><strong className="text-foreground">שירות לקוחות:</strong> 4.1 חודשים</li>
                <li><strong className="text-foreground">אוטומציית שיווק:</strong> 6.7 חודשים</li>
                <li><strong className="text-foreground">פיתוח ותפעול:</strong> 9.3 חודשים</li>
              </ul>
              <p>
                עסקים שבחרו פתרון מוכן (ולא בנו מאפס) הגיעו ל-ROI חיובי פי 2.4 מהר יותר. בישראל, עסקים שמטמיעים סוכני AI מדווחים על חיסכון של 20–30 שעות עבודה שבועיות ועלייה של 25% בסגירת לידים — כשמסכמים את הכסף, זה מגיע להחזר תוך 30–60 יום למי שבחר נכון.
              </p>
              <p>
                <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית מלאה</Link> כוללת בדרך כלל יותר ממשימה אחת, וזה מה שמגדיל את ה-ROI לאורך זמן.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5 דברים שחייבים לבדוק לפני שמזמינים סוכן AI לעסק</h2>
              <p>
                בשוק של 2026, יש עשרות ספקים שמציעים "סוכן AI לעסק". איך מבדילים בין פתרון שיעבוד לפתרון שיבזבז לכם את הכסף?
              </p>
              <ol className="space-y-4 pr-4">
                <li>
                  <strong className="text-foreground">1. האם מדובר בסוכן אמיתי או בצ'אטבוט בתחפושת?</strong>
                  <p className="mt-1">שאלו: האם הסוכן יכול לבצע פעולות (לכתוב לCRM, לקבוע פגישה, לשלוח מייל) — לא רק לענות? אם התשובה היא "הוא עונה על שאלות", מדובר בצ'אטבוט.</p>
                </li>
                <li>
                  <strong className="text-foreground">2. מה מכסה הפתרון — ומה לא?</strong>
                  <p className="mt-1">בקשו רשימת מפורשת של מה הסוכן יכול ולא יכול לעשות. ספקים טובים מדברים בגלוי על מגבלות. ספקים רעים מבטיחים הכל ומספקים מעט.</p>
                </li>
                <li>
                  <strong className="text-foreground">3. למה הסוכן יהיה מחובר?</strong>
                  <p className="mt-1">ודאו שיש תמיכה בכלים שאתם כבר משתמשים בהם: WhatsApp Business, מערכת ה-CRM שלכם, יומן Google, מייל. <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">חיבור WhatsApp</Link> הוא קריטי לרוב העסקים הישראליים.</p>
                </li>
                <li>
                  <strong className="text-foreground">4. מה קורה כשהסוכן לא יודע לענות?</strong>
                  <p className="mt-1">הסלמה חלקה לנציג אנושי היא must. סוכן שנתקע ולא יודע להסיר את הלקוח מהלולאה — פוגע בחוויה.</p>
                </li>
                <li>
                  <strong className="text-foreground">5. מה כלול בתמיכה ובשיפורים?</strong>
                  <p className="mt-1">לפחות בחודשים הראשונים, הסוכן יצטרך שיפורים. שאלו: האם התיקונים כלולים? כמה זמן לוקח להוסיף שאלה חדשה? יש לוח חי לניטור שיחות?</p>
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5 טעויות נפוצות שמונעות ROI חיובי — ואיך להימנע מהן</h2>
              <p>
                גם כשמשקיעים בסוכן AI, יש כמה כשלים שחוזרים על עצמם שוב ושוב. הכרת הטעויות מראש חוסכת כסף וכאבי ראש.
              </p>
              <div className="space-y-3">
                <div className="border border-border rounded-xl p-4">
                  <p><strong className="text-foreground">טעות 1: הנחיות כלליות מדי.</strong> "תענה יפה ומנומס" זו הנחיה גרועה. הסוכן צריך הנחיות ספציפיות: על מה לענות, על מה לא לענות, מה לעשות בכל תרחיש. ככל שההנחיות מדויקות יותר, הסוכן טוב יותר.</p>
                </div>
                <div className="border border-border rounded-xl p-4">
                  <p><strong className="text-foreground">טעות 2: ציפייה שסוכן אחד יעשה הכל.</strong> הניסיון מראה שסוכן שמנסה לכסות שירות לקוחות + מכירות + תיאום תורים — עושה את הכל בינוני. עדיף שלושה סוכנים ממוקדים.</p>
                </div>
                <div className="border border-border rounded-xl p-4">
                  <p><strong className="text-foreground">טעות 3: בדיקה לא מספקת לפני השקה.</strong> הרבה עסקים בודקים שאלתיים ומשיקים. אחר כך לקוח שואל שאלה לא צפויה והסוכן מגיב לא נכון. יש לבדוק מינימום 50–100 תרחישים שונים לפני עלייה לאוויר.</p>
                </div>
                <div className="border border-border rounded-xl p-4">
                  <p><strong className="text-foreground">טעות 4: העלאת מידע רגיש ללא מדיניות.</strong> מחירים פנימיים, פרטי לקוחות, חוזים — יש להגדיר בדיוק מה הסוכן יכול לגשת אליו ומה לא.</p>
                </div>
                <div className="border border-border rounded-xl p-4">
                  <p><strong className="text-foreground">טעות 5: לא מודדים ולא משפרים.</strong> סוכן AI הוא לא "שם ושוכחים". עיון בשיחות שנכשלו ושיפור הנחיות לפחות פעם בחודש הוא מה שמבדיל בין סוכן שמשתפר לבין סוכן שנשאר תקוע.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ענף הפעילות שלכם — ומה המקרה האידיאלי לסוכן AI?</h2>
              <p>
                לא כל עסק יפיק אותו ערך מסוכן AI. הנה מי מרוויח הכי הרבה, ולמה:
              </p>
              <ul className="space-y-3 pr-4 list-none">
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">מרפאות, קליניקות וסלוני יופי:</strong> נפח גבוה של קביעות תורים + no-show הם צוואר הבקבוק הקלאסי. סוכן AI עם תזכורות אוטומטיות מוריד no-show ב-40–60% ומייעל את הלוח כבר מהחודש הראשון.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">עסקים בענף הנדל"ן:</strong> 40% מהלידים בנדל"ן אובדים בגלל מענה איטי. סוכן שמגיב בשניות, מסנן רציני מסקרן, ומקבע הצגה — שומר על לידים שהיו הולכים לאיבוד.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">עסקי שירות עם שאלות חוזרות:</strong> אם יש לכם רשימה של 20 שאלות שנשאלות שוב ושוב — סוכן AI יטפל בהן בלי לגעת בכם, ויפנה את הצוות לשיחות שדורשות מגע אנושי.
                </li>
                <li className="border-r-2 border-primary pr-4">
                  <strong className="text-foreground">עסקי E-Commerce:</strong> שאלות על סטטוס הזמנה, מדיניות החזרות, וזמינות מוצר — כל אלה ניתנים לאוטומציה מלאה עם גישה למערכת הניהול.
                </li>
              </ul>
              <p>
                מי שפחות יפיק תועלת מסוכן AI בינוני: עסקים שכל שיחת לקוח שונה לחלוטין, שהמידע שמשתנה כל יום, או שמספר הלקוחות מאוד קטן. במקרים אלה, ייתכן שעדיף להתחיל מאוטומציה פשוטה יותר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך מתחילים נכון עם סוכן AI — שלב אחר שלב?</h2>
              <p>
                הדרך הנכונה להטמיע סוכן AI אינה "נבחר ספק ונראה". יש מסלול שעובד, ויש אחד שבוזבז כסף.
              </p>
              <ol className="space-y-3 pr-4">
                <li>
                  <strong className="text-foreground">שלב 1 — מיפוי תהליכים:</strong> לפני שמדברים עם ספק, רשמו: אילו תהליכים שחוזרים על עצמם? איפה הצוות מבזבז יותר משעה ביום על משימות שגרתיות? זה ה"בשר" של הסוכן.
                </li>
                <li>
                  <strong className="text-foreground">שלב 2 — התחלה ממוקדת:</strong> בחרו <em>תהליך אחד</em> להתחיל — לא עשרה. הצלחה אחת מוכחת שווה יותר מעשרה ניסויים בינוניים. לדוגמה: אוטומציית המענה הראשוני ללידים.
                </li>
                <li>
                  <strong className="text-foreground">שלב 3 — הגדרת הצלחה:</strong> קבעו מראש מה ייחשב הצלחה: כמה שיחות הסוכן יסגור לבד? מה יורד מזמן הצוות? מה מהיר יותר? בלי מדדים — אי אפשר לשפר.
                </li>
                <li>
                  <strong className="text-foreground">שלב 4 — בחירת ספק:</strong> בקשו הדגמה עם הנתונים שלכם, לא עם נתוני דמו. ספק שמסרב — אות אדום.
                </li>
                <li>
                  <strong className="text-foreground">שלב 5 — פיילוט ב-30 יום:</strong> הפעילו בקנה מידה קטן, עקבו אחרי שיחות, שפרו הנחיות, ורק אז הרחיבו.
                </li>
              </ol>
              <p>
                ב-EH Automation, כל פרויקט מתחיל ממיפוי תהליכים — לא מהמלצה על כלי. <Link to="/solutions/ai-agents" className="text-primary hover:underline">ראו את הגישה שלנו לסוכני AI</Link> כדי להבין כיצד אנחנו בונים פתרונות שמחזירים השקעה בתוך 60–90 יום.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לדעת אם סוכן AI מתאים לעסק שלכם?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — בלי מחויבות. נמפה יחד את התהליכים ונראה איפה סוכן AI יוצר ערך אמיתי.</p>
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

export default AiAgentBusinessGuide;

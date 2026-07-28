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
    answer: 'צ\'אטבוט רגיל עובד לפי עץ החלטות קבוע — שאלה X מקבלת תשובה Y. סוכן AI מבין שפה טבעית, מסיק מסקנות ומבצע פעולות ממשיות: פותח כרטיסי שירות, מעדכן CRM, שולח הצעת מחיר. ההבדל הוא בין מענה לבין פעולה.',
  },
  {
    question: 'כמה זמן לוקח להקים סוכן AI לעסק?',
    answer: 'פרויקט בסיסי (מענה ללידים + קביעת פגישות) ניתן להשלים ב-2-4 שבועות. פרויקטים מורכבים עם אינטגרציות למספר מערכות (CRM, ERP, מערכת הזמנות) עשויים לקחת 6-10 שבועות. ב-EH Automation אנחנו בדרך כלל מסיימים גרסה עובדת ראשונה תוך שלושה שבועות.',
  },
  {
    question: 'האם סוכן AI עובד בעברית ובשפה טבעית?',
    answer: 'כן. מודלי AI מודרניים כמו GPT-4o ו-Claude Sonnet מבינים עברית ברמה גבוהה מאוד, כולל שפה מדוברת, ניבים ישראלים ומושגים עסקיים. הסוכן יכול לנהל שיחה שנשמעת אנושית לחלוטין.',
  },
  {
    question: 'האם הסוכן יכול להתממשק ל-WhatsApp?',
    answer: 'בהחלט. WhatsApp Business API מאפשר חיבור מלא — הסוכן מקבל הודעות, מגיב, שולח קבצים ומעדכן מערכות רקע, הכל דרך הוואטסאפ שהלקוחות שלכם כבר משתמשים בו.',
  },
  {
    question: 'מה קורה אם הסוכן לא יודע לענות?',
    answer: 'מגדירים "מסלול נפילה" — הסוכן מזהה שיחות שמחוץ לסמכותו ומעביר אותן לאדם אמיתי, עם סיכום השיחה. כך שמרים על חוויית לקוח טובה גם כשה-AI מגיע לגבולות יכולתו.',
  },
];

const AiAgentBusinessGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים | EH Automation"
        description="סוכן AI לעסק חוסך 20-30 שעות בשבוע ומשיב ללידים תוך 10 שניות. מדריך מלא: מה זה, כמה עולה, ומתי כדאי להתחיל."
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
        description="סוכן AI לעסק חוסך 20-30 שעות בשבוע ומשיב ללידים תוך 10 שניות. מדריך מלא: מה זה, כמה עולה, ומתי כדאי להתחיל."
        path="/blog/ai-agent-business-guide"
        datePublished="2026-07-28"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                סוכן AI לעסק הוא לא עוד טרנד — הוא כלי פרקטי שמשנה את האופן שבו עסקים ישראלים מנהלים לידים, מענה ללקוחות ותיאום פגישות. אם אתם שוקלים להטמיע סוכן בינה מלאכותית ורוצים להבין מה זה אומר בפועל, כמה זה עולה ואיפה נכון להתחיל — המדריך הזה בשבילכם.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה בעצם סוכן AI לעסק ואיך הוא שונה מצ'אטבוט רגיל?</h2>
              <p>
                הבלבול בין "בוט" ל"סוכן AI" נפוץ מאוד — ומובן. שניהם מנהלים שיחות אוטומטיות, אבל ברמות שונות לגמרי. צ'אטבוט קלאסי עובד לפי עץ החלטות: "אם המשתמש כתב X, הצג תגובה Y". הוא מהיר ופשוט להקמה, אבל קשיח — ברגע שהשאלה של הלקוח יוצאת מהתסריט, הבוט נתקע.
              </p>
              <p>
                סוכן AI, לעומת זאת, מבוסס על מודל שפה גדול (LLM) שמבין שפה טבעית ברמה קרובה לאנושית. הסוכן לא רק מגיב — הוא מסיק מסקנות, מחליט אילו פעולות לבצע ומפעיל כלים חיצוניים: עדכון CRM, שליחת מייל, קביעת פגישה ביומן, יצירת הצעת מחיר. הוא פועל כמו עובד דיגיטלי אוטונומי שמקבל מטרה ומוצא את הדרך להשיגה.
              </p>
              <p>
                דוגמה פרקטית: לקוח שולח הודעת WhatsApp בשתיים בלילה: "שלום, אני רוצה לדעת מה אתם גובים על אוטומציה לעסק שלי — יש לי חנות בגדים עם 3 עובדים". סוכן AI יקרא את ההודעה, יבין את ההקשר, יענה עם מחירים רלוונטיים, ישאל שאלות מכוונות כדי להבין את הצורך לעומק, ויתעד את הפרטים ב-CRM — הכל בלי שאיש מהצוות שלכם נגע בטלפון.
              </p>
              <p>
                ב-<Link to="/solutions/ai-agents" className="text-primary hover:underline">פתרונות סוכני AI</Link> שאנחנו בונים, הסוכן פועל על פלטפורמות כמו WhatsApp, אתר האינטרנט, ואף מייל — ומחובר לכל המערכות שכבר קיימות בעסק.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">למה 67% מהעסקים בישראל מתכננים להטמיע סוכן AI עד סוף 2026?</h2>
              <p>
                הנתון הזה לא מפתיע מי שמכיר את השוק הישראלי: 99% מהעסקים בישראל הם עסקים קטנים ובינוניים, ו-99% מהישראלים משתמשים ב-WhatsApp כערוץ תקשורת ראשי. זה יוצר תנאים מושלמים לסוכן AI — הלקוחות כבר בפלטפורמה, והעסק זקוק למענה שלא תלוי בשעות עבודה.
              </p>
              <p>
                בעולם, נכון לסוף 2025, 88% מהארגונים כבר משתמשים ב-AI בלפחות פונקציה אחת — עלייה מ-78% בשנה שלפניה. ב-2026 הצפי הוא ש-40% מכלל אפליקציות הארגוניות יכללו סוכני AI ייעודיים, לעומת פחות מ-5% ב-2025. זה שינוי מהיר בצורה יוצאת דופן.
              </p>
              <p>
                מה הגורם המרכזי? הפחד מפספוס לידים. עסקים ישראלים מגלים שלקוח שלא מקבל מענה תוך 5 דקות ממשיך לעסק הבא. סוכן AI פותר בדיוק את הבעיה הזו — הוא עונה תוך שניות, 24 שעות ביממה, 7 ימים בשבוע. עסקים שהטמיעו סוכן מדווחים על ירידה בזמן מענה מממוצע של 4 שעות לפחות מ-10 שניות — ועלייה של 25% בשיעור סגירת הלידים.
              </p>
              <p>
                לא פחות חשוב: השוק הישראלי מתאים במיוחד בגלל עלויות כוח האדם. שכר מינימום עומד על כ-32 ש"ח לשעה ועלות עובד מינהלתי מגיעה ל-8,000-12,000 ש"ח לחודש עם נלוות. סוכן AI שמחליף 30-40% מהעבודה המנהלתית עולה שבר מזה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה סוכן AI יכול לעשות עבור העסק שלכם בפועל?</h2>
              <p>
                כדי להבין את הפוטנציאל, חשוב לחשוב על סוגי המשימות שהסוכן יכול לקחת על עצמו. הן מתחלקות לשלוש קטגוריות עיקריות:
              </p>
              <p><strong className="text-foreground">1. מענה ולידים — 24/7 ללא עצירה</strong></p>
              <p>
                הסוכן מקבל לידים נכנסים מכל ערוץ — WhatsApp, טופס באתר, אינסטגרם, פייסבוק. הוא מנהל שיחת "חימום" ראשונית: שואל שאלות מכוונות, מציג מחירים ראשוניים, ומסיים בקביעת שיחה עם בעל העסק. כל הנתונים נרשמים אוטומטית ב-CRM, ואתם מגיעים לפגישה מוכנים עם כל הרקע.
              </p>
              <p><strong className="text-foreground">2. שירות לקוחות קיימים — שאלות חוזרות ונשנות</strong></p>
              <p>
                מחקרים מראים שכ-80% מפניות שירות הלקוחות הן שאלות שחוזרות על עצמן: סטטוס הזמנה, שעות פתיחה, מדיניות החזרות, מחירים. הסוכן מטפל בכולן אוטומטית ומפנה אך ורק פניות מורכבות לצוות האנושי — יחד עם סיכום מלא של השיחה.
              </p>
              <p><strong className="text-foreground">3. תיאום ותפעול — מטלות שאוכלות שעות</strong></p>
              <p>
                קביעת פגישות ביומן, שליחת תזכורות לפני פגישות, אישור תורים, מעקב אחר תשלומים פתוחים, שליחת מסמכים ואישורים — כל אלה הם משימות שסוכן AI מבצע ישירות, ממשק למערכות כמו Google Calendar, מערכות CRM ופלטפורמות תשלום. ה<Link to="/solutions/workflow-automation" className="text-primary hover:underline">אוטומציה של תהליכי עבודה</Link> הופכת לאפשרית ברמה שלא הייתה קיימת לפני שנתיים.
              </p>
              <p>
                העסקים שמטמיעים סוכן AI מדווחים בממוצע על חיסכון של 20-30 שעות עבודה שבועיות — שזה שווה ערך ל-0.5 עד 0.75 משרות. לנקודת הייחוס: מחקר של McKinsey מצא שעובד מידע חוסך 5.9 עד 7.2 שעות בשבוע דרך כלי AI — וסוכן שפועל אוטונומית מתי שהעסק ישן או לא זמין, משלש את המספר הזה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה סוכן AI לעסק ישראלי — ומה ה-ROI הריאלי?</h2>
              <p>
                שאלת המחיר היא הראשונה שבעלי עסקים שואלים, ובצדק. הנה תמונה ריאלית מהשוק הישראלי ב-2026:
              </p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong className="text-foreground">בוט בסיסי (תסריטים קבועים, ללא AI אמיתי):</strong> ₪249-650 לחודש. זה לא סוכן AI — זה צ'אטבוט. מתאים לשאלות נפוצות פשוטות.</li>
                <li><strong className="text-foreground">סוכן AI בסיסי:</strong> ₪1,500-3,500 הקמה + ₪650-1,500 לחודש. מטפל בלידים ובשירות לקוחות בסיסי, עם חיבור ל-WhatsApp.</li>
                <li><strong className="text-foreground">סוכן AI מלא עם אינטגרציות:</strong> ₪5,000-15,000 הקמה + ₪1,500-3,000 לחודש. כולל חיבור ל-CRM, מערכת הזמנות, יומן וכלים נוספים.</li>
                <li><strong className="text-foreground">סוכן מהונדס לצרכים ייחודיים:</strong> ₪15,000-40,000 הקמה. מתאים לחברות עם תהליכים מורכבים.</li>
              </ul>
              <p>
                ה-ROI מחושב בפשטות: עסק שמשלם ₪10,000 הקמה + ₪2,000 לחודש, ובזכות הסוכן סוגר 3 עסקאות נוספות בחודש בממוצע ₪2,500 כל אחת — מחזיר את ההשקעה תוך חודש וחצי בלבד. ב-EH Automation ראינו עסקים שהחזירו את ההשקעה ב-30 יום. בממוצע גלובלי, כל שקל שמושקע ב-AI מחזיר 3.7 שקלים — ROI של 270%.
              </p>
              <p>
                ה<Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> לא נמדדת רק בחיסכון שעות — היא נמדדת בלידים שנסגרים בשעה שתיים בלילה, בלקוחות שמקבלים מענה מיידי שבזכותו לא עוברים למתחרה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מתי כדאי להטמיע סוכן AI ומתי עדיין מוקדם מדי?</h2>
              <p>
                לא כל עסק צריך סוכן AI עכשיו. הנה מבחן פשוט — ענו בכנות על השאלות הבאות:
              </p>
              <p><strong className="text-foreground">הסימנים שהגיע הזמן:</strong></p>
              <ul className="list-disc pr-6 space-y-2">
                <li>אתם מקבלים יותר מ-10 פניות ביום ולא מספיקים לענות לכולן בזמן</li>
                <li>לקוחות כותבים בערב ובסוף שבוע ולא מקבלים מענה עד הבוקר</li>
                <li>הצוות שלכם מבלה יותר מ-3 שעות ביום על שאלות חוזרות ונשנות</li>
                <li>אתם מפסידים לידים לטובת מתחרים שעונים מהר יותר</li>
                <li>קביעת תורים ותיאום פגישות לוקחים זמן לא פרופורציונלי</li>
              </ul>
              <p><strong className="text-foreground">מתי כדאי לחכות:</strong></p>
              <ul className="list-disc pr-6 space-y-2">
                <li>אם הפניות שלכם דורשות שיקול דעת מקצועי מורכב בכל אחת מהן</li>
                <li>אם עדיין לא הגדרתם תהליכי מכירה ושירות ברורים (הסוכן לא ישפר תהליך שבור)</li>
                <li>אם כמות הפניות היא פחות מ-5-7 ביום — התועלת עדיין קיימת אבל ה-ROI יהיה איטי יותר</li>
              </ul>
              <p>
                חשוב להבין: סוכן AI הוא כלי שמגביר תהליך קיים, לא מחליף אותו. עסק עם תהליכי מכירה ברורים יקבל את הערך המלא. עסק עם כאוס תפעולי יקבל כאוס מהיר יותר.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך מתחילים? 5 שלבים לפרויקט סוכן AI מוצלח</h2>
              <p>
                מהניסיון שלנו בעשרות פרויקטים, פרויקטי סוכן AI שמצליחים עוברים דרך 5 שלבים עקביים:
              </p>
              <p><strong className="text-foreground">שלב 1: מיפוי תהליכים (שבוע 1)</strong></p>
              <p>
                לפני שכותבים שורת קוד אחת, יושבים ומגדירים: אילו שיחות הסוכן יקבל? מה הוא מורשה להבטיח? מתי הוא מעביר לאדם? אילו מערכות צריך לחבר? התשובות לשאלות האלה הן ה"תסריט" שעליו הסוכן יפעל.
              </p>
              <p><strong className="text-foreground">שלב 2: בנייה ואינטגרציות (שבועות 2-3)</strong></p>
              <p>
                בניית ה-AI agent עצמו, חיבורו לפלטפורמות (WhatsApp, אתר, מייל) ואינטגרציה עם כלי ה-CRM הקיים. <Link to="/solutions/crm-automation" className="text-primary hover:underline">אוטומציה של ה-CRM</Link> היא קריטית — בלי חיבור ל-CRM, הסוכן פשוט שוכח כל שיחה.
              </p>
              <p><strong className="text-foreground">שלב 3: בדיקות עם מקרי קצה (שבוע 3-4)</strong></p>
              <p>
                מריצים מאות שיחות סינטטיות כדי לוודא שהסוכן מתנהג כמו שרוצים — גם כשהלקוח כותב עברית עם שגיאות כתיב, גם כשהוא שואל שאלה שאינה בתסריט, גם כשהוא מנסה "לבלבל" את הסוכן.
              </p>
              <p><strong className="text-foreground">שלב 4: השקה הדרגתית (שבוע 4-5)</strong></p>
              <p>
                מתחילים עם 20-30% מהפניות — לא כל הדרך. בודקים את הנתונים בזמן אמת, מכווננים ומגדילים הדרגתית.
              </p>
              <p><strong className="text-foreground">שלב 5: אופטימיזציה שוטפת</strong></p>
              <p>
                הסוכן לומד ומשתפר. בחודשים הראשונים כדאי לבדוק את שיחות "הכישלון" שבהן הסוכן העביר לאדם — לרוב אפשר ללמד אותו לטפל בהן בעצמו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה הגבולות של סוכן AI ומה חשוב לדעת לפני ההשקעה?</h2>
              <p>
                כדי להגיע לפרויקט ריאלי, חשוב להבין גם את המגבלות:
              </p>
              <p><strong className="text-foreground">הסוכן לא מחליף שיפוט אנושי מורכב</strong></p>
              <p>
                מכירה של מוצר ב-50,000 ש"ח שדורשת ניהול משא ומתן, הבנת ניואנסים ארגוניים או קשר אישי עמוק — זה עדיין תחום האדם. הסוכן מצטיין בחזרתיות, לא ביחסים.
              </p>
              <p><strong className="text-foreground">דיוק לא מושלם — חייבים לבדוק</strong></p>
              <p>
                מודלי AI עלולים "להמציא" מידע שאינו בבסיס הנתונים שלהם — זה נקרא הזיה (hallucination). הפתרון: לתחם את הסוכן לידע שסיפקתם לו בלבד ולבנות מנגנוני בדיקה. פרויקט שנבנה נכון מצמצם זאת למינימום.
              </p>
              <p><strong className="text-foreground">פרטיות ורגולציה</strong></p>
              <p>
                שיחות לקוחות הן מידע אישי. ודאו שהספק שאתם בוחרים עומד בדרישות חוק הגנת הפרטיות הישראלי ו-GDPR אם יש לקם לקוחות בחו"ל. כל ה<Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציה בוואטסאפ</Link> שלנו מוגנת לפי הסטנדרטים הנדרשים.
              </p>
              <p><strong className="text-foreground">תחזוקה שוטפת נדרשת</strong></p>
              <p>
                המחירים שלכם השתנו? השקתם מוצר חדש? הוספתם שירות? הסוכן צריך עדכון בהתאם. בדומה לאתר שצריך תחזוקה, גם הסוכן צריך מישהו שאחראי עליו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו ענפים מרוויחים הכי הרבה מסוכן AI בישראל?</h2>
              <p>
                מניסיוננו עם עשרות לקוחות, הענפים הבאים רואים את ה-ROI הגבוה ביותר מהטמעת סוכן AI:
              </p>
              <ul className="list-disc pr-6 space-y-3">
                <li>
                  <strong className="text-foreground">שירותי בריאות ורפואה:</strong> קליניקות, מרפאות ומכוני טיפולים נהנים מקביעת תורים אוטומטית, תזכורות שמקטינות no-show ב-40%, ומענה לשאלות נפוצות — בלי שעומס אדמיניסטרטיבי נופל על הצוות הרפואי.
                </li>
                <li>
                  <strong className="text-foreground">נדל"ן:</strong> סוכני נדל"ן מקבלים עשרות פניות ביום על נכסים. הסוכן מסנן את הרציניים, אוסף פרטים ראשוניים ומקבע פגישות — חיסכון של 15-20 שעות שבועיות לסוכן פעיל.
                </li>
                <li>
                  <strong className="text-foreground">מסחר ואיקומרס:</strong> מענה על שאלות מוצר, סטטוס הזמנות, מדיניות החזרות — כל השאלות שחוזרות כל יום ניתנות לאוטומציה מלאה.
                </li>
                <li>
                  <strong className="text-foreground">שירותים מקצועיים (רואי חשבון, עורכי דין, יועצים):</strong> תיאום פגישות, איסוף מסמכים ראשוני, מענה על שאלות כלליות — בלי לבזבז את הזמן המקצועי היקר על לוגיסטיקה.
                </li>
                <li>
                  <strong className="text-foreground">תחום הכושר, ספא ויופי:</strong> קביעת תורים, תזכורות, מבצעים — ערוץ WhatsApp פעיל שמגדיל תפוסה ב-20-30%.
                </li>
              </ul>
              <p>
                הנקודה המשותפת: כל הענפים האלה מתאפיינים בנפח גבוה של שאלות חוזרות ובצורך במענה מהיר. <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> עובדת הכי טוב כשיש תהליך ברור וחוזר — וסוכן AI הוא אוטומציה בדרגת מורכבות גבוהה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">סוכן AI לעומת עובד נוסף — השוואה ריאלית לעסקים ישראלים</h2>
              <p>
                בואו נעשה את ההשוואה בצורה ישירה, מבחינת עלויות ויכולות:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-3 pr-4 text-foreground font-semibold">פרמטר</th>
                      <th className="text-right py-3 pr-4 text-foreground font-semibold">עובד מנהלתי</th>
                      <th className="text-right py-3 pr-4 text-primary font-semibold">סוכן AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">עלות חודשית</td>
                      <td className="py-3 pr-4">₪8,000-12,000</td>
                      <td className="py-3 pr-4 text-primary">₪650-3,000</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">זמינות</td>
                      <td className="py-3 pr-4">8-9 שעות ביום</td>
                      <td className="py-3 pr-4 text-primary">24/7 ללא הפסקה</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">זמן מענה</td>
                      <td className="py-3 pr-4">דקות עד שעות</td>
                      <td className="py-3 pr-4 text-primary">פחות מ-10 שניות</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">שיחות במקביל</td>
                      <td className="py-3 pr-4">1-2</td>
                      <td className="py-3 pr-4 text-primary">ללא הגבלה</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">עקביות</td>
                      <td className="py-3 pr-4">משתנה (מצב, עייפות)</td>
                      <td className="py-3 pr-4 text-primary">קבועה תמיד</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">שיפוט מורכב</td>
                      <td className="py-3 pr-4 text-primary">גבוה</td>
                      <td className="py-3 pr-4">מוגבל</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                ההמלצה שלנו: לא "במקום" אלא "בנוסף". הסוכן לוקח את כל העבודה החוזרת והמנהלתית, ומשחרר את הצוות האנושי לעסוק בעבודה שדורשת שיפוט, יצירתיות וקשר אנושי. ב-EH Automation ראינו עסקים שבעזרת סוכן AI הכפילו את נפח הלקוחות שהם מטפלים בהם — בלי להוסיף ולו עובד אחד.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לדעת איזה סוכן AI מתאים לעסק שלכם?</h3>
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

export default AiAgentBusinessGuide;

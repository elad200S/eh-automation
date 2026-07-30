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
    answer: 'צ\'אטבוט רגיל עובד לפי כללים קשיחים ומגיב לפי תסריט קבוע מראש. סוכן AI, לעומת זאת, מבין שפה טבעית, זוכר הקשר משיחות קודמות, מקבל החלטות עצמאיות ויכול לבצע פעולות ממשיות — כמו עדכון CRM, שליחת הצעת מחיר, או תיאום פגישה — בלי התערבות אנושית בכל שלב.',
  },
  {
    question: 'כמה עולה סוכן AI לעסק קטן בישראל?',
    answer: 'עלות סוכן AI לעסק קטן-בינוני בישראל נעה בין 500 ל-3,000 ₪ לחודש, תלוי ברמת ההתאמה האישית ובנפח הפעילות. פתרונות SaaS מוכנים מתחילים מ-200 ₪ לחודש, בעוד סוכן AI מותאם אישית עשוי לעלות 3,500–12,000 ₪ הקמה חד-פעמית בתוספת דמי תפעול חודשיים. רוב העסקים מחזירים את ההשקעה תוך 30–60 יום.',
  },
  {
    question: 'אילו תהליכים עסקיים הכי כדאי להתחיל לאטמט עם סוכן AI?',
    answer: 'נקודות הכניסה המומלצות הן: מענה ראשוני ללידים (הכי מהיר ל-ROI), תזכורות ועדכוני סטטוס ללקוחות, מענה לשאלות נפוצות, ותיאום פגישות ראשוניות. אלה תהליכים חוזרים ששוחקים זמן יקר של צוות, וסוכן AI יכול לטפל בהם בצורה מלאה מסביב לשעון.',
  },
  {
    question: 'האם סוכן AI מתאים לעסק קטן או רק לחברות גדולות?',
    answer: 'דווקא עסקים קטנים עם 1–20 עובדים מקבלים את הערך הגבוה ביותר מסוכן AI, כי כל שעה שנחסכת מוסיפה יותר אחוז מהתפוקה הכוללת. כשהצוות קטן, הסוכן מתפקד כמעשה עוזר נוסף שלא עולה כמו משרה מלאה ועובד 24/7 בלי ימי מחלה.',
  },
  {
    question: 'כמה זמן לוקח להקים סוכן AI ולראות תוצאות?',
    answer: 'סוכן AI פשוט — כמו בוט ווטסאפ שעונה ללידים ומזמין פגישות — ניתן להקים תוך 1–2 שבועות. סוכן מורכב יותר שמתחבר ל-CRM, מנהל פולו-אפ רב-שלבי ומייצר דוחות, עשוי לקחת 4–8 שבועות. תוצאות ראשונות (ירידה בשעות עבודה ידנית, עלייה בזמן מענה ללידים) נראות כבר בשבועות הראשונים.',
  },
];

const AiAgentBusinessGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים | EH Automation"
        description="סוכן AI לעסק: מה זה, איך עובד, כמה עולה בישראל ומתי כדאי להתחיל. מדריך מלא ומעשי לבעלי עסקים עם נתונים ומחירים עדכניים לשנת 2026."
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
        description="סוכן AI לעסק: מה זה, איך עובד, כמה עולה בישראל ומתי כדאי להתחיל. מדריך מלא ומעשי לבעלי עסקים עם נתונים ומחירים עדכניים לשנת 2026."
        path="/blog/ai-agent-business-guide"
        datePublished="2026-07-30"
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
                סוכן AI לעסק הוא לא עוד צ'אטבוט — הוא תוכנה אוטונומית שמבינה שפה טבעית, מקבלת החלטות ומבצעת פעולות ממשיות בלי שתצטרכו לנהל כל שלב בעצמכם. לפי Gartner, עד 2028 כ-33% מכלל התוכנה העסקית תכלול סוכני AI — לעומת פחות מ-1% ב-2024. המדריך הזה יסביר לכם בדיוק מה זה, כמה זה עולה בישראל, ואיך מחליטים אם זה מתאים לעסק שלכם.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה בדיוק סוכן AI ואיך הוא שונה מצ'אטבוט רגיל?</h2>
              <p>
                כשרוב בעלי העסקים שומעים "בינה מלאכותית", הם חושבים על צ'אטבוט שעונה על שאלות לפי תסריט. סוכן AI הוא משהו שונה בתכלית. בעוד שצ'אטבוט רגיל מגיב לפי כללים קשיחים — "אם הלקוח שואל X, ענה Y" — סוכן AI חושב. הוא מבין שפה טבעית, כולל ניסוחים שונים, טעויות כתיב, וגם הודעות קוליות בוואטסאפ. הוא זוכר את כל ההיסטוריה של השיחה, מבין הקשר, ויכול לבצע פעולות ממשיות בעולם.
              </p>
              <p>
                מה פירוש "פעולות ממשיות"? סוכן AI יכול לפתוח ליד חדש ב-CRM שלכם, לשלוח הצעת מחיר, לתאם פגישה ביומן, לעדכן סטטוס הזמנה, לשלוח חשבונית — ועוד עשרות פעולות שבדרך כלל דורשות התערבות אנושית. הוא לא רק עונה, הוא עושה. זה ההבדל המהותי שהופך אותו לכלי עסקי ממשי ולא רק לממשק שיחה.
              </p>
              <p>
                דמיינו עובד שעובד 24 שעות ביממה, 7 ימים בשבוע, עונה ללידים תוך שניות בחצות, מעולם לא עייף, לא שוכח פולו-אפ, ולא מסתדר בזמן עם לקוח. זה סוכן AI. ל<Link to="/solutions/ai-agents" className="text-primary hover:underline">סוכני AI</Link> יש יכולת לשנות לחלוטין את האופן שבו עסק מתנהל — לא בתאוריה, אלא בפרקטיקה של יום יום.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה סוכן AI יכול לעשות בפועל לעסק שלי?</h2>
              <p>
                השאלה הנכונה היא לא מה סוכן AI יכול לעשות, אלא מה הוא לא יכול. בפועל, עסקים ישראלים שכבר אימצו סוכני AI משתמשים בהם לשורה ארוכה של משימות, ואלה הבולטות ביניהן:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>מענה ראשוני ללידים</strong> — כשמישהו ממלא טופס ביצירת קשר או שולח הודעה בוואטסאפ, הסוכן עונה תוך שניות, שואל שאלות מוקדמות לאיסוף מידע, ומעביר לצוות רק את הלידים החמים.</li>
                <li><strong>תיאום פגישות ראשוניות</strong> — הסוכן בודק זמינות ביומן, מציע מועדים, שולח קישור לאישור, וזה הכל בלי שתגעו במקלדת.</li>
                <li><strong>פולו-אפ אוטומטי</strong> — ליד שלא ענה? הסוכן ישלח הודעות מעקב בפרקי זמן שנקבעו מראש — גם לאחר שבועיים ושלושה חודשים.</li>
                <li><strong>מענה לשאלות נפוצות</strong> — מחירים, שעות פתיחה, מדיניות ביטולים, מה כלול בחבילה — הסוכן עונה תמיד, בסבלנות, באופן עקבי.</li>
                <li><strong>עדכוני סטטוס להזמנות ושירותים</strong> — לקוח ששאל "מה הסטטוס של הבקשה שלי?" יקבל תשובה אוטומטית שמשאבת מידע ישירות מהמערכות שלכם.</li>
                <li><strong>איסוף משוב ואחרי-שירות</strong> — אחרי סיום שירות, הסוכן יוצר קשר אוטומטית, בודק שביעות רצון, ומזמין לחוות דעת בגוגל.</li>
              </ul>
              <p>
                כל אחד מהתהליכים האלה, לבדו, שווה שעות עבודה מדי שבוע. כשמשלבים כמה מהם יחד, ה<Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה העסקית</Link> מתחילה לחולל שינוי משמעותי: עסקים שמשתמשים בסוכני AI מדווחים על עלייה ממוצעת של 66% בפרודוקטיביות ועל 57% חיסכון בעלויות בתפקידים שבהם הסוכן פועל, לפי מחקרים גלובליים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה סוכן AI לעסק בישראל ב-2026?</h2>
              <p>
                זו השאלה שכל בעל עסק שואל ראשון, ויש לה כמה תשובות — תלוי בסוג הפתרון שבוחרים:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="font-semibold text-foreground mb-1">פתרון SaaS מוכן מהמדף</p>
                  <p className="text-sm">200–700 ₪ לחודש. כלים כמו ManyChat, Tidio, או ChatBot.com. מוגבלים בהתאמה אישית ובאינטגרציות, אבל טובים להתחיל ולהבין מה עובד לעסק שלכם.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="font-semibold text-foreground mb-1">סוכן AI מותאם אישית (המסלול המומלץ)</p>
                  <p className="text-sm">3,500–12,000 ₪ הקמה + 300–800 ₪ לחודש תפעול. מחובר ל-CRM שלכם, לוואטסאפ, ליומן, ולמערכות הפנימיות. עשוי בדיוק לתהליכים שלכם.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="font-semibold text-foreground mb-1">פרויקט AI מלא עם ריבוי סוכנים</p>
                  <p className="text-sm">20,000 ₪ ומעלה. לחברות עם נפח גבוה ותהליכים מורכבים. כולל אינטגרציות מרובות, הדרכה, ותמיכה שוטפת.</p>
                </div>
              </div>
              <p>
                לרוב העסקים הקטנים והבינוניים בישראל — מרפאות, סלוני יופי, יועצים, עסקי שירות — המסלול המעשי הוא סוכן AI מותאם אישית בטווח של 500–3,000 ₪ לחודש. זה פחות ממה שעולה לשכור עוזר-ה שמשרה חלקית, ועם ביצועים עקביים הרבה יותר.
              </p>
              <p>
                השוו את זה לשכר עובד: עמדת שירות לקוחות בישראל עולה 7,000–12,000 ₪ לחודש ברוטו, עובדת 8 שעות ביום, 5 ימים בשבוע. סוכן AI עובד 24/7, לא לוקח חופשה, לא מתפטר, ומטפל בעשרות שיחות במקביל. <Link to="/solutions/workflow-automation" className="text-primary hover:underline">אוטומציית תהליכי עבודה</Link> מסוג זה מחזירה את ההשקעה מהר מאוד.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ה-ROI של סוכן AI — ומתי מחזירים את ההשקעה?</h2>
              <p>
                נתוני ROI של סוכני AI מרשימים באופן יוצא דופן: המחקרים מראים ROI ממוצע של 171%, כש-74% מהעסקים שאימצו סוכני AI מחזירים את ההשקעה בתוך השנה הראשונה. בחברות קטנות ובינוניות, זמן ההחזר עוד קצר יותר — ברוב המקרים 30–60 יום.
              </p>
              <p>
                מאיפה בא ה-ROI הזה? מכמה כיוונים במקביל:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>חיסכון בשעות עבודה</strong> — אם הסוכן חוסך 2 שעות ביום לעובד בעלות 60 ₪ לשעה, זה 3,600 ₪ לחודש בחיסכון ישיר.</li>
                <li><strong>עלייה בשיעור המרת לידים</strong> — מענה תוך שניות במקום שעות מעלה משמעותית את שיעור הלידים שסוגרים. עסקים מדווחים על עלייה של 20–40% בהמרה לאחר הטמעת סוכן AI.</li>
                <li><strong>הפחתת לידים שאובדים</strong> — כשאין מענה מהיר, לקוחות פוטנציאליים ממשיכים הלאה לפי המתחרה. סוכן AI מבטיח שאף ליד לא "נופל בין הכיסאות".</li>
                <li><strong>שירות לקוחות 24/7</strong> — לקוחות שמקבלים מענה בחצות בוואטסאפ הופכים ללקוחות מרוצים יותר, שמפנים יותר לקוחות נוספים.</li>
              </ul>
              <p>
                חשוב לבנות ROI ריאלי לפני שמתחילים. אם עסק מקבל 50 לידים בחודש, ממיר 20% מהם, וכל לקוח שווה 2,000 ₪ — הסוכן צריך להעלות את ההמרה ב-2-3 אחוזים כדי לשלם על עצמו. זה לרוב קל הרבה יותר להשיג ממה שנדמה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה קורה בישראל — ולמה הזמן לפעול הוא עכשיו?</h2>
              <p>
                ישראל היא מדינה יוצאת דופן בכל הנוגע לאימוץ טכנולוגיה. לפי מחקר של 5WPR ו-Louder שפורסם ב-2026, ישראל מדורגת במקום ה-1 בעולם באימוץ AI לנפש — ו-95% מעובדי הטק בישראל משתמשים ב-AI מדי יום. אבל בקרב עסקים קטנים ובינוניים, שמהווים 99% מסך העסקים בישראל, אימוץ הטכנולוגיה עדיין איטי.
              </p>
              <p>
                זה יוצר הזדמנות. העסקים שמאמצים סוכן AI עכשיו נהנים מיתרון תחרותי ברור על פני מתחרים שעדיין עובדים בצורה ידנית. לקוח שפנה לשלושה עסקים זהים ורק אחד חזר אליו תוך דקה — הוא יסגור עם אותו אחד, גם אם מחיריו גבוהים קצת יותר. זמן תגובה מהיר הוא כבר לא "יתרון" — הוא ציפייה.
              </p>
              <p>
                בנוסף, 99% מהישראלים משתמשים בוואטסאפ, שמהווה ערוץ התקשורת העסקי המרכזי בישראל. <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציה לוואטסאפ</Link> בשילוב סוכן AI היא לכן הנקודה הכי גבוהה מבחינת השפעה — כי זה בדיוק המקום שבו הלקוחות שלכם כבר נמצאים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">האם העסק שלי מוכן לסוכן AI? 5 שאלות לפני שמתחילים</h2>
              <p>
                לפני שמשקיעים, כדאי לעשות בדיקת התאמה. הנה 5 שאלות שיעזרו לכם להבין אם הזמן מתאים:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                  <p className="font-semibold text-foreground mb-1">1. יש לי תהליכים חוזרים?</p>
                  <p className="text-sm">אם כל יום עושים את אותן פעולות — עונים לאותן שאלות, שולחים אותם מסמכים, בודקים אותם עדכונים — זה סימן שיש מה לאטמט. סוכן AI מצטיין בדיוק בתהליכים חוזרים ומוגדרים.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                  <p className="font-semibold text-foreground mb-1">2. אני מאבד לידים בגלל זמן תגובה איטי?</p>
                  <p className="text-sm">אם אתם לפעמים חוזרים ללידים אחרי שעות או ימים, סוכן AI יכול לפתור את הבעיה הזאת מיידית. זה לרוב ה-ROI המהיר ביותר להשיג.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                  <p className="font-semibold text-foreground mb-1">3. יש לי ערוץ תקשורת ברור עם הלקוחות?</p>
                  <p className="text-sm">וואטסאפ, אתר, אינסטגרם — אם יש ערוץ ברור שדרכו מגיעות פניות, ניתן לחבר אליו סוכן AI. ככל שהערוץ יותר מוגדר, כך ההקמה פשוטה יותר.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                  <p className="font-semibold text-foreground mb-1">4. יש לי מידע על העסק שניתן לארגן?</p>
                  <p className="text-sm">תפריט שירותים, מחירים, שאלות נפוצות, מדיניות — הסוכן צריך מידע בסיס כדי לפעול. אם המידע הזה קיים (גם בצורה לא מסודרת), ניתן לעבד אותו ולהכניס לסוכן.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border-r-4 border-primary">
                  <p className="font-semibold text-foreground mb-1">5. אני מוכן להקדיש זמן להגדרה ראשונית?</p>
                  <p className="text-sm">סוכן AI הוא לא פלאי. ההתחלה דורשת בנייה של תסריטים, הגדרת תהליכים, ובדיקות. מי שמשקיע כמה שבועות בהגדרה נכונה, מקבל מכונה שעובדת לבד אחר כך.</p>
                </div>
              </div>
              <p>
                אם עניתם "כן" על לפחות 3 מ-5 השאלות — העסק שלכם מוכן. אם עניתם "לא" על רוב השאלות, כדאי להתחיל בתהליכי <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> בסיסיים לפני שמגיעים לסוכן AI.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך מתחילים? 4 צעדים מעשיים</h2>
              <p>
                כשהחלטתם שרוצים סוכן AI, הנה המפה הברורה קדימה:
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">1</span>
                  <div>
                    <p className="font-semibold text-foreground">מפו את התהליך הבעייתי ביותר</p>
                    <p className="text-sm mt-1">אל תנסו לאטמט הכל בבת אחת. בחרו תהליך אחד שמייצר הכי הרבה כאב — בדרך כלל מענה ראשוני ללידים או תיאום פגישות — והתחילו משם. ניצחון מהיר אחד שווה יותר מפרויקט ענק שלא מסתיים.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">2</span>
                  <div>
                    <p className="font-semibold text-foreground">תעדו את התהליך הנוכחי</p>
                    <p className="text-sm mt-1">כתבו בדיוק מה קורה כיום: מאיפה מגיע ליד, מה קורה לו, מה השאלות הנפוצות, מה התסריטים שחוזרים. ככל שהמפה מדויקת יותר, כך הסוכן יהיה מדויק ויעיל יותר.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">3</span>
                  <div>
                    <p className="font-semibold text-foreground">בחרו ספק שמתאים לעסק שלכם</p>
                    <p className="text-sm mt-1">אל תבחרו ספק רק לפי מחיר. בדקו: האם הם מכירים את ענף העסק שלכם? האם יש להם ניסיון בהטמעות דומות? האם הם מציעים תמיכה שוטפת? סוכן AI שנבנה בלי הבנת ההקשר הספציפי שלכם יהיה פחות אפקטיבי.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">4</span>
                  <div>
                    <p className="font-semibold text-foreground">הפעילו, מדדו, שפרו</p>
                    <p className="text-sm mt-1">אחרי ההשקה, עקבו אחרי המדדים החשובים: זמן תגובה, אחוז לידים שמקבלים מענה, שביעות רצון לקוחות. שיפור אחוזון פה ושם עשוי לשנות את ה-ROI הכולל דרמטית.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה לחפש בספק שמקים סוכן AI לעסק שלכם?</h2>
              <p>
                השוק מתמלא במהירות בספקים שמציעים "סוכן AI לעסק", ולא כולם שווים. כדי לא לבזבז כסף וזמן על פתרון שלא עובד, בדקו את הנקודות הבאות לפני שחותמים:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>ניסיון בישראל ובעברית</strong> — סוכן AI שעובד עם שפה עברית (כולל כתיב מימין לשמאל, ניסוחים מקומיים, ומינוח ענפי) הוא עסק אחר לגמרי מסוכן שנבנה לשוק האנגלוסקסי ותורגם.</li>
                <li><strong>התמחות בענף שלכם</strong> — מרפאה, עסק שירות, איקומרס — לכל ענף יש תהליכים ייחודיים. ספק שמכיר את הענף שלכם יקים סוכן יעיל יותר בפחות זמן.</li>
                <li><strong>אינטגרציות עם הכלים שיש לכם</strong> — אם יש לכם CRM, יומן, מערכת לניהול הזמנות — הסוכן צריך להתחבר אליהם. שאלו בדיוק אילו חיבורים כלולים.</li>
                <li><strong>שקיפות במחירים ובמבנה</strong> — בדקו אם יש עלויות נסתרות: תשלום לפי הודעה, עלות שדרוג, עלות שינויים עתידיים.</li>
                <li><strong>תמיכה שוטפת אחרי ההשקה</strong> — הסוכן צריך תחזוקה, עדכונים, ושיפורים. ספק שנעלם אחרי ההתקנה הוא בעיה בינוני-ארוך טווח.</li>
              </ul>
              <p>
                ב-EH Automation, בנינו עשרות <Link to="/solutions/ai-agents" className="text-primary hover:underline">סוכני AI</Link> לעסקים ישראלים בתחומים מגוונים — מרפאות, סלוני יופי, יועצים, עסקי נדל"ן, ועוד. כל פרויקט מתחיל בהבנת התהליך הקיים, ממשיך בבנייה מותאמת אישית, ונלווה בתמיכה שוטפת. <Link to="/solutions/crm-automation" className="text-primary hover:underline">חיבור ל-CRM</Link> ולכלים הקיימים הוא חלק סטנדרטי מהעבודה שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">סיכום — האם כדאי להתחיל עם סוכן AI כבר עכשיו?</h2>
              <p>
                התשובה הקצרה: כן, אם יש לכם תהליכים חוזרים, ליד שמגיע לוואטסאפ או לאתר, ורצון לצמוח בלי לגייס עוד עובדים. הזמן הטוב ביותר להקים סוכן AI היה שנה שעברה — הזמן הבא אחריו הוא עכשיו.
              </p>
              <p>
                המספרים ברורים: ROI ממוצע של 171%, חיסכון של 66% בזמן בתפקידים שמטופלים על ידי הסוכן, ועלות שמתחילה ב-500 ₪ לחודש. זה לא מדע בדיוני — זה כבר המציאות של עסקים ישראלים שעשו את הצעד.
              </p>
              <p>
                המתחרה שלכם אולי כבר הקים סוכן AI. הלקוח הבא שיפנה לשניכם — הוא יסגור עם מי שעונה קודם. שווה לחשוב על זה.
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

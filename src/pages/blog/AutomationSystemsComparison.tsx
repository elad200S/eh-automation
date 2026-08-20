import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'איך יודעים אם העסק שלי בכלל צריך מערכת אוטומציה, או שזה מוקדם מדי?',
    answer: 'הסימן הכי ברור הוא משימה חוזרת שמישהו בצוות עושה ידנית כל שבוע — העתקת פרטי ליד מטופס לגיליון, שליחת תזכורת פגישה בוואטסאפ, או הפקת חשבונית באופן ידני. אם התהליך חוזר על עצמו יותר מכמה פעמים בשבוע ואפשר לתאר אותו ב"אם קורה X, תעשה Y" — הוא בשל לאוטומציה. עסקים עם פחות מעשרה תהליכים חוזרים כאלה יכולים להתחיל בכלי חינמי או זול (למשל שכבת החינם של Make עם 1,000 פעולות בחודש) ולבדוק תוצאה לפני שמשקיעים במערכת מלאה.',
  },
  {
    question: 'מה ההבדל בין Make, Zapier ו-n8n, ואיך בוחרים ביניהם?',
    answer: 'Zapier הכי פשוט להתחלה — ממשק אינטואיטיבי, אלפי אינטגרציות מוכנות, אבל יקר יחסית בנפח גבוה (סביב ₪110-270 לחודש למנוי סטנדרטי). Make (לשעבר Integromat) מציע גמישות ויזואלית לתהליכים מורכבים במחיר נגיש יותר (מתחיל סביב ₪40 לחודש), ומתאים לעסק שכבר יודע מה הוא רוצה לבנות. n8n הוא הזול ביותר לטווח ארוך — אפשר להריץ אותו self-hosted תמורת כ-20$ לחודש בלבד או אפילו בחינם על שרת עצמי — אבל דורש יותר ידע טכני להקמה ותחזוקה. עסק שרוצה להתחיל מהר בלי ידע טכני יבחר Zapier או Make; עסק עם צוות טכני או מיישם אוטומציה שמלווה אותו יכול לחסוך משמעותית עם n8n.',
  },
  {
    question: 'כמה עולה להקים מערכת אוטומציה לעסק קטן בישראל ב-2026?',
    answer: 'הקמה של תהליך אוטומציה ראשון בישראל מתחילה בדרך כלל מסביב ל-1,200-1,500 ₪ ללא מע"מ, ועולה לפי מספר האינטגרציות והמורכבות. מבחינת עלות שוטפת, פתרונות בסיסיים לעסק קטן נעים בין כ-300 ₪ לחודש ועד כ-2,500 ₪ לחודש לחבילה מלאה שמחברת כמה מערכות יחד (CRM, וואטסאפ, יומן, חשבוניות). זה בנוסף לעלות מנוי הפלטפורמה עצמה (Make, Zapier או n8n), שיכולה לנוע בין כמה עשרות שקלים לכמה מאות שקלים בחודש, תלוי בנפח הפעולות.',
  },
  {
    question: 'תוך כמה זמן מערכת אוטומציה מחזירה את ההשקעה בפועל?',
    answer: 'לפי דו"ח ROI לאוטומציית תהליכים עסקיים ל-2026, אוטומציה עסקית מניבה בממוצע 240% החזר על ההשקעה, בזכות שילוב של חיסכון בזמן, הפחתת טעויות ושיפור פרודוקטיביות. מחקר Total Economic Impact של Forrester על Microsoft Power Automate מצא ROI של 248% על פני שלוש שנים, עם החזר השקעה תוך פחות מחצי שנה. בארגונים בינוניים-גדולים, טווח ה-ROI לאוטומציית תהליכים עסקיים נע בין 30% ל-200% ומעלה, עם תקופת החזר טיפוסית של 3 עד 18 חודשים — תלוי בהיקף התהליך שמאטמטים ובכמה שעות עבודה אנושיות הוא חוסך בפועל.',
  },
  {
    question: 'אילו טעויות הכי נפוצות עסקים עושים כשהם בוחרים פלטפורמת אוטומציה?',
    answer: 'הטעות הראשונה היא לבחור כלי לפי מחיר בלבד בלי לבדוק אם הוא תומך באינטגרציות שהעסק כבר משתמש בהן (CRM, וואטסאפ Business, מערכת חשבוניות). הטעות השנייה היא לנסות לאטמט תהליך מורכב מדי כפרויקט ראשון — עדיף להתחיל בתהליך אחד קטן וברור (למשל תזכורת פגישה אוטומטית) ולהרחיב בהדרגה. הטעות השלישית היא לוותר על מיישם אוטומציה מנוסה כדי "לחסוך" בעלות ההקמה, ואז לגלות שהתהליך שנבנה לבד שובר כשמערכת אחת מתעדכנת. חשוב גם לזכור: לפי סקרי אימוץ AI ואוטומציה בארגונים, 89% מהמנהלים מדווחים שהאוטומציה מגבירה מהירות עבודה, אך רק 6% מהם בטוחים שיש להם דוגמה ברורה ומדידה ל-ROI ברמת הארגון כולו — כלומר בלי מדידה מסודרת מההתחלה, קשה לדעת אם ההשקעה באמת השתלמה.',
  },
  {
    question: 'האם אפשר להתחיל עם כלי חינמי ולעבור למערכת בתשלום מאוחר יותר?',
    answer: 'כן, וזו בדרך כלל האסטרטגיה הנכונה. Make מציעה שכבת חינם עם עד 1,000 פעולות בחודש, ו-n8n אפשר להריץ בחינם לגמרי על שרת עצמי (למשל Google Cloud) אם יש לעסק יכולת טכנית בסיסית. ההמלצה: להתחיל בתהליך אחד קטן בשכבת החינם, לוודא שהוא באמת עובד וחוסך זמן, ורק אז לשדרג למנוי בתשלום כשנפח הפעולות גדל או כשצריך אינטגרציות מתקדמות יותר שלא זמינות בחינם.',
  },
];

const AutomationSystemsComparison = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="מערכות אוטומציה לעסקים — איך בוחרים 2026 | HEY Digital"
        description="מדריך לבחירת מערכת אוטומציה לעסק ב-2026 — Make, Zapier ו-n8n בהשוואה, מחירים אמיתיים בישראל, קריטריונים לבחירה, ROI וטעויות שכדאי להימנע מהן בהקמה."
        path="/blog/automation-systems-comparison"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'מערכות אוטומציה לעסקים — איך בוחרים נכון', path: '/blog/automation-systems-comparison' },
      ]} />
      <ArticleSchema
        title="מערכות אוטומציה לעסקים — איך בוחרים נכון"
        description="מדריך לבחירת מערכת אוטומציה לעסק ב-2026 — Make, Zapier ו-n8n בהשוואה, מחירים אמיתיים בישראל, קריטריונים לבחירה, ROI וטעויות שכדאי להימנע מהן בהקמה."
        path="/blog/automation-systems-comparison"
        datePublished="2026-08-20"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">מערכות אוטומציה לעסקים — איך בוחרים נכון</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                מערכות אוטומציה לעסקים הן הכלים שמריצים תהליך עסקי חוזר — כמו טיפול בליד חדש או תזכורת פגישה — בלי שבן אדם צריך לבצע כל שלב ידנית, ולפי דוח שוק האוטומציה העסקית ל-2026 השוק העולמי צפוי להגיע ל-18.83 מיליארד דולר השנה. הבעיה היא לא מחסור באפשרויות — יש עשרות פלטפורמות — אלא בחירה נכונה: לא כל כלי אוטומציה מתאים לכל עסק, וטעות בבחירה עולה בזמן, בכסף ובאמון של הצוות בתהליך החדש. במדריך הזה נעבור על הקריטריונים שבאמת קובעים, מחירים אמיתיים בישראל, והשוואה בין הכלים המובילים.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה בעצם ההבדל בין "מערכת אוטומציה" ל"תוכנה" רגילה?</h2>
              <p>
                מערכת אוטומציה היא לא תוכנה נוספת שהעסק "מתפעל" — היא שכבת חיבור בין תוכנות שכבר קיימות אצלו. במקום שמישהו יעביר פרטי ליד מטופס באתר לגיליון אקסל ומשם לקבוצת וואטסאפ, פלטפורמת אוטומציה כמו Make, Zapier או n8n מזהה את הטופס החדש ומריצה לבד את כל השרשרת: הוספה ל-CRM, שליחת הודעת פתיחה ועדכון לצוות המכירות — הכל תוך שניות, בלי שאף אחד נגע בעכבר.
              </p>
              <p>
                לפי נתוני אימוץ אוטומציה עסקית ל-2026, כבר 88% מהארגונים משתמשים כיום באוטומציית AI בלפחות פונקציה עסקית אחת — עלייה חדה מ-55% בלבד ב-2023. אצל עסקים קטנים-בינוניים הקצב עוד יותר מהיר: שיעור האימוץ כמעט הכפיל את עצמו מ-22% ל-38% תוך שנתיים בלבד, לפי מחקר StealthAgents מ-2026. המשמעות: מערכת אוטומציה כבר לא כלי של חברות גדולות בלבד — היא הופכת לסטנדרט אצל עסק ישראלי ממוצע.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו סוגי פלטפורמות אוטומציה קיימות ב-2026, ומה ההבדל ביניהן?</h2>
              <p>
                שלוש הפלטפורמות שהכי נפוצות אצל עסקים ישראליים הן Make, Zapier ו-n8n, וכל אחת פונה לסוג אחר של משתמש. Zapier היא הכלי הכי נגיש למי שלא טכני בכלל — ממשק פשוט של "אם קורה X, תעשה Y" עם אלפי אינטגרציות מוכנות מראש. Make (לשעבר Integromat) מציע בונה ויזואלי גמיש יותר, שמאפשר לבנות תהליכים מסועפים עם תנאים ותנאי-משנה — פחות פשוט מ-Zapier, אבל חזק משמעותית לתהליכים מורכבים. n8n שונה משתי הפלטפורמות — הוא open-source ואפשר להריץ אותו על שרת עצמי, מה שהופך אותו לזול בטווח ארוך אבל דורש ידע טכני להקמה ולתחזוקה.
              </p>
              <p>
                מעבר לשלוש אלה קיימת גם Microsoft Power Automate, שמתאימה בעיקר לארגונים שכבר עובדים בסביבת Office 365 ו-Microsoft 365, ומציעה אינטגרציה עמוקה עם Excel, Teams ו-SharePoint. עסק שכבר בנה אתר או מערכת פנימית בעזרת <Link to="/blog/base44-israeli-startup-guide" className="text-primary hover:underline">Base44</Link> או <Link to="/blog/lovable-ai-website-builder-guide" className="text-primary hover:underline">Lovable</Link> בדרך כלל יעדיף Make או n8n לחיבור אליהן, כי הן מתממשקות בקלות דרך Webhooks ו-API סטנדרטי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה מערכת אוטומציה לעסק בישראל ב-2026?</h2>
              <p>
                מבחינת מחירי מנוי לפלטפורמה עצמה: Make מתחילה סביב 40 ₪ לחודש לתוכנית הבסיסית ומציעה גם שכבת חינם עם עד 1,000 פעולות בחודש. Zapier יקר יותר — מנוי סטנדרטי לנפח פעילות ממוצע נע בין כ-110 ל-270 ₪ ומעלה לחודש. n8n הוא הזול ביותר לטווח ארוך — אפשר להריץ אותו self-hosted תמורת כ-20$ לחודש בלבד, ולעיתים אפילו בחינם על שרת ענן עצמי (למשל Google Cloud), אבל התחזוקה דורשת יותר ידע טכני.
              </p>
              <p>
                מעבר למחיר המנוי, יש עלות הקמה חד-פעמית: הקמה של תהליך אוטומציה ראשון בישראל מתחילה בדרך כלל מסביב ל-1,200-1,500 ₪ ללא מע"מ, ועולה לפי מספר האינטגרציות והמורכבות. עסק קטן שרוצה חבילה מלאה שמחברת כמה מערכות יחד (CRM, וואטסאפ, יומן, חשבוניות) ישלם בממוצע בין 300 ₪ לחודש לפתרון בסיסי ועד 2,500 ₪ לחודש לחבילה מקיפה יותר. זה משמעותית זול יותר ממשרה נוספת בצוות שתטפל באותן משימות ידנית.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו קריטריונים באמת קובעים איזו מערכת אוטומציה מתאימה לעסק שלך?</h2>
              <p>
                לפני שבודקים מחיר, צריך לבדוק שלושה דברים בסדר הזה. ראשית — אילו מערכות העסק כבר משתמש בהן (CRM, וואטסאפ Business, מערכת סליקה או חשבוניות), ולוודא שהפלטפורמה מתחברת אליהן ישירות בלי עקיפות מורכבות. שנית — מי בצוות יתחזק את התהליך אחרי ההקמה: אם אין איש טכני קבוע, כלי פשוט כמו Zapier או ליווי של <Link to="/solutions/business-automation" className="text-primary hover:underline">מיישם אוטומציה חיצוני</Link> חשובים יותר מגמישות מקסימלית. שלישית — כמה תהליכים באמת רוצים לאטמט בשנה הקרובה: עסק עם תהליך אחד-שניים לא צריך פלטפורמה ארגונית יקרה, ועסק שמתכנן להרחיב לעשרות תהליכים כדאי שיבחר כלי שגדל איתו בלי שיצטרך להחליף פלטפורמה באמצע הדרך.
              </p>
              <p>
                קריטריון נוסף שרוב בעלי העסקים מדלגים עליו הוא מהירות תגובה בזמן אמת. תהליך שרץ פעם ביום מספיק לדוחות, אבל תזכורת פגישה או מענה ראשוני ללקוח חייבים לרוץ תוך שניות ולא דקות — לא כל פלטפורמה מתחייבת לאותה רמת עדכון בזמן אמת, וכדאי לבדוק את זה מראש ולא לגלות אחרי ההקמה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">טבלת השוואה — Make מול Zapier מול n8n מול Power Automate</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted/50 text-foreground">
                      <th className="p-3 text-right font-semibold border-b border-border">קריטריון</th>
                      <th className="p-3 text-right font-semibold border-b border-border">Make</th>
                      <th className="p-3 text-right font-semibold border-b border-border">Zapier</th>
                      <th className="p-3 text-right font-semibold border-b border-border">n8n</th>
                      <th className="p-3 text-right font-semibold border-b border-border">Power Automate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">מחיר התחלתי</td>
                      <td className="p-3">~40 ₪/חודש</td>
                      <td className="p-3">~110-270 ₪/חודש</td>
                      <td className="p-3">~20$/חודש (self-hosted)</td>
                      <td className="p-3">תלוי מנוי Microsoft 365</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">קלות הקמה</td>
                      <td className="p-3">בינונית</td>
                      <td className="p-3">גבוהה מאוד</td>
                      <td className="p-3">נמוכה — דורש ידע טכני</td>
                      <td className="p-3">בינונית</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">גמישות לתהליכים מורכבים</td>
                      <td className="p-3">גבוהה</td>
                      <td className="p-3">בינונית</td>
                      <td className="p-3">גבוהה מאוד</td>
                      <td className="p-3">בינונית</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">מתאים ל-</td>
                      <td className="p-3">עסק שיודע מה הוא רוצה לבנות</td>
                      <td className="p-3">מתחילים, לא-טכניים</td>
                      <td className="p-3">עסק עם צוות טכני או מיישם</td>
                      <td className="p-3">ארגון בסביבת Microsoft</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">עלות בטווח ארוך</td>
                      <td className="p-3">נמוכה-בינונית</td>
                      <td className="p-3">גבוהה בנפח גדול</td>
                      <td className="p-3">הזולה ביותר</td>
                      <td className="p-3">משתלמת אם כבר יש מנוי</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ה-ROI האמיתי של מערכת אוטומציה, ותוך כמה זמן היא מחזירה את עצמה?</h2>
              <p>
                לפי דו"ח ROI לאוטומציית תהליכים עסקיים ל-2026, אוטומציה עסקית מניבה בממוצע 240% החזר על ההשקעה — שילוב של חיסכון בזמן עבודה, הפחתת טעויות אנוש, ושיפור בפרודוקטיביות. מחקר Total Economic Impact שביצעה חברת Forrester על Microsoft Power Automate ב-2024 מצא ROI של 248% על פני שלוש שנים, עם החזר השקעה תוך פחות מחצי שנה משלב ההטמעה. בארגונים בינוניים-גדולים, טווח ה-ROI לאוטומציית תהליכים עסקיים נע בין 30% ל-200% ומעלה, עם תקופת החזר טיפוסית של 3 עד 18 חודשים.
              </p>
              <p>
                המספרים האלה נשמעים מרשימים, אבל הם תלויים לגמרי בבחירת התהליך הנכון לאוטומציה. תהליך שחוסך כמה דקות בשבוע לא יחזיר את עצמו מהר; תהליך שעד היום דרש שעה ביום של עובד — למשל מענה ראשוני ללידים או תזכורות פגישה — יכול להחזיר את עלות ההקמה תוך חודש-חודשיים. שוק האוטומציה העסקית העולמי, שהוערך ב-16.32 מיליארד דולר ב-2025, צפוי להגיע ל-18.83 מיליארד דולר ב-2026 (קצב צמיחה שנתי של 15.4%) ול-33.43 מיליארד דולר עד 2030 — סימן לכך שיותר ויותר עסקים מוצאים שהחישוב הזה משתלם להם.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו טעויות עסקים עושים כשהם בוחרים מערכת אוטומציה, ואיך נמנעים מהן?</h2>
              <p>
                הטעות הכי נפוצה היא לבחור פלטפורמה לפי מחיר בלבד, בלי לבדוק מראש שהיא מתחברת לכלים שהעסק כבר עובד איתם — CRM קיים, וואטסאפ Business, מערכת סליקה. עסק שגילה אחרי ההקמה שהאינטגרציה הדרושה לא נתמכת נאלץ לבנות פתרון עוקף מורכב, או להחליף פלטפורמה מהתחלה. הטעות השנייה היא לנסות לאטמט תהליך שלם ומורכב כפרויקט ראשון — עדיף להתחיל בתהליך אחד קטן וברור (כמו תזכורת פגישה אוטומטית או <Link to="/blog/crm-whatsapp-integration" className="text-primary hover:underline">חיבור CRM לוואטסאפ</Link>), לוודא שהוא עובד ומודד תוצאה, ואז להרחיב בהדרגה.
              </p>
              <p>
                טעות שלישית וחשובה: לוותר על מדידה מסודרת. לפי סקרי אימוץ AI ואוטומציה בארגונים, 89% מהמנהלים מדווחים שהאוטומציה מגבירה מהירות עבודה, אבל רק 6% מהם בטוחים שיש להם דוגמה ברורה ומדידה ל-ROI ברמת הארגון כולו. המשמעות המעשית: לפני שמתחילים, כדאי לרשום בדיוק כמה זמן התהליך גוזל היום ולמדוד מול הזמן אחרי האוטומציה — אחרת קשה לדעת אם ההשקעה באמת השתלמה, ואם כדאי להרחיב אותה לתהליכים נוספים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך זה נראה אצלנו ב-HEY Digital, בפועל?</h2>
              <p>
                כשלקוח פונה אלינו בלי לדעת איזו פלטפורמה לבחור, אנחנו לא מתחילים מהכלי — אנחנו מתחילים ממיפוי התהליכים שבאמת חוזרים על עצמם אצלו כל שבוע. אצל קליניקה, למשל, זה כמעט תמיד קביעת תורים ותזכורות (ראו את המדריך המלא שלנו על <Link to="/blog/clinic-automation" className="text-primary hover:underline">אוטומציה לקליניקה</Link>); אצל סוכנות נדל"ן זה בדרך כלל טיפול בלידים חדשים וסינון ראשוני (מפורט ב<Link to="/blog/real-estate-automation" className="text-primary hover:underline">אוטומציה לנדל"ן</Link>). רק אחרי שברור מה מאטמטים, אנחנו בוחרים בין Make, Zapier או n8n — לפי המערכות שכבר קיימות אצל הלקוח והיכולת הטכנית של הצוות שלו להמשיך ולתחזק את זה.
              </p>
              <p>
                בהשוואה ל<Link to="/blog/automation-tools-comparison" className="text-primary hover:underline">מדריך ה-Make מול Zapier מול n8n</Link> שכתבנו קודם, ובהמשך ל<Link to="/blog/business-automation-guide-2026" className="text-primary hover:underline">מדריך האוטומציה העסקית המלא ל-2026</Link>, המאמר הזה נועד לפתור בעיה שונה: לא "מה כל כלי עושה", אלא "איך בוחרים בכלל, לפי אילו קריטריונים". רוב הלקוחות שמגיעים אלינו כבר שמעו על Make או Zapier — מה שחסר להם זה מסגרת החלטה שלוקחת בחשבון את התקציב, הצוות והתהליכים הספציפיים שלהם, ולא רק את מה שכתוב בעמוד התמחור של הכלי.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">לא בטוחים איזו מערכת אוטומציה מתאימה לעסק שלכם?</h3>
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

export default AutomationSystemsComparison;

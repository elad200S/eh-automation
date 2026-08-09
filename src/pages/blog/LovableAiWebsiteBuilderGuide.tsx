import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'כמה עולה Lovable בישראל ב-2026?',
    answer: 'נכון לאוגוסט 2026, לפי מדריך התמחור המעודכן של eesel.ai, יש ל-Lovable שלוש תוכניות עיקריות: Free בחינם (5 קרדיטים ביום, עד 150 בחודש), Pro ב-$25 לחודש (100 קרדיטים חודשיים בתוספת 5 יומיים) ו-Business ב-$50 לחודש עם תמיכת SSO ומרכז אבטחה. לעסקים גדולים יש תוכנית Enterprise עם עלות מותאמת אישית, שמתחילה בדרך כלל מ-$500 לחודש ומעלה ומחייבת התחייבות שנתית.'
  },
  {
    question: 'מה ההבדל בין Lovable ל-Base44?',
    answer: 'Lovable מייצרת קוד React/TypeScript אמיתי שאפשר לייצא ל-GitHub ולתת למפתח להמשיך לעבוד עליו — היא מיועדת בעיקר לאתרים ואפליקציות ציבוריות עם ממשק משתמש מעוצב. Base44 היא פלטפורמה סגורה יותר, עם backend מובנה (מסד נתונים, אחסון, הרשאות) שמתאימה בעיקר לכלים פנימיים כמו CRM ודאשבורדים. ב-HEY Digital אנחנו משתמשים בשתיהן: אתר החברה עצמו נבנה ב-Lovable, והמערכת הפנימית שלנו לניהול לקוחות (0CAI) בנויה על Base44.'
  },
  {
    question: 'האם Lovable בטוחה לשימוש בייצור עם לקוחות אמיתיים?',
    answer: 'לא באופן אוטומטי. ביקורת אבטחה שפורסמה בדצמבר 2025 מצאה כי כ-10.3% מהאפליקציות שנבנו ב-Lovable חושפות מידע רגיש בגלל הגדרות הרשאה שגויות, ו-The Next Web דיווח על מקרה שבו פרויקט נותר חשוף למשך 48 ימים לאחר שדוח באג נסגר בלי טיפול. לפני שמעלים אפליקציה עם נתוני לקוחות אמיתיים לאוויר, צריך לעבור בדיקת הרשאות (RLS), לוודא שאין מפתחות API חשופים בצד הלקוח, ורצוי שמפתח או מומחה יעברו על הקוד שנוצר.'
  },
  {
    question: 'כמה זמן לוקח לבנות אתר או אפליקציה ב-Lovable?',
    answer: 'אתר תדמית בסיסי עם כמה עמודים ניתן להקים תוך שעה עד יום עבודה. אפליקציה עם התחברות משתמשים, מסד נתונים וטופס לידים לוקחת בדרך כלל בין יום לשלושה ימים. פרויקט עם אינטגרציות מורכבות (תשלומים, WhatsApp, מערכת CRM חיצונית) יכול לקחת שבוע עד שבועיים, במיוחד כשצריך לחבר בין הקוד שנוצר ל-AI לבין לוגיקה עסקית מדויקת.'
  },
  {
    question: 'האם צריך ידע בתכנות כדי להשתמש ב-Lovable?',
    answer: 'לא כדי להתחיל — אפשר לתאר בעברית או באנגלית מה רוצים לבנות, ו-Lovable מייצר אתר עובד. אבל ככל שהפרויקט גדל ומורכב יותר (לוגיקה עסקית, הרשאות משתמשים, אינטגרציות חיצוניות), חוסר ידע בקוד הופך למגבלה אמיתית — קשה לדעת אם הקוד שנוצר בטוח, יעיל ותקין בלי לפחות למידה בסיסית או ליווי של מי שכן מבין.'
  },
  {
    question: 'מתי כדאי לשכור מומחה לעבודה עם Lovable במקום לבנות לבד?',
    answer: 'כדאי לשקול ליווי מקצועי כשהאתר או האפליקציה יעלו לאוויר עם נתוני לקוחות אמיתיים, כשיש צורך באינטגרציה לתשלומים או ל-CRM, כשהעיצוב חייב לשקף מותג עסקי מדויק, או כשפשוט אין לכם זמן ללמוד את הפלטפורמה. ב-HEY Digital בנינו את האתר שלנו על Lovable ומלווים עסקים ישראלים בתהליך דומה — משילוב טכני ועד חיבור לאוטומציות.'
  },
];

const LovableAiWebsiteBuilderGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Lovable — בניית אתר עם AI בלי קוד | HEY Digital"
        description="Lovable היא פלטפורמת AI שבונה אתר או אפליקציה מלאה מתיאור בשפה טבעית. מדריך מלא: איך זה עובד, כמה זה עולה ב-2026, ומתי כדאי להיעזר במומחה."
        path="/blog/lovable-ai-website-builder-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Lovable — איך בונים אתר או אפליקציה עם AI בלי לכתוב שורת קוד', path: '/blog/lovable-ai-website-builder-guide' },
      ]} />
      <ArticleSchema
        title="Lovable — איך בונים אתר או אפליקציה עם AI בלי לכתוב שורת קוד"
        description="Lovable היא פלטפורמת AI שבונה אתר או אפליקציה מלאה מתיאור בשפה טבעית. מדריך מלא: איך זה עובד, כמה זה עולה ב-2026, ומתי כדאי להיעזר במומחה."
        path="/blog/lovable-ai-website-builder-guide"
        datePublished="2026-08-09"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">כלי No-Code</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Lovable — איך בונים אתר או אפליקציה עם AI בלי לכתוב שורת קוד</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Lovable היא פלטפורמת AI שהופכת תיאור בעברית או באנגלית לאתר או אפליקציה עובדים — עם קוד React/TypeScript אמיתי מאחורי הקלעים. תוך פחות משנתיים היא צמחה למיליוני משתמשים ולחברה בשווי מיליארדי דולרים, ובמדריך הזה תלמדו איך היא עובדת בפועל, כמה זה עולה ב-2026, ומה הסיכונים שכדאי להכיר לפני שמעלים משהו לאוויר.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה Lovable ואיך זה עובד בפועל?</h2>
              <p>
                Lovable היא פלטפורמת "Vibe Coding" — כלי שבו כותבים בשפה טבעית מה רוצים לבנות, וה-AI מייצר עבורכם אתר או אפליקציה שלמים. במקום לגרור אלמנטים כמו בבוני אתרים ותיקים (Wix, Squarespace), כותבים משפט כמו "בנה לי אתר תדמית לקליניקת שיניים עם עמוד בית, טופס יצירת קשר וגלריית תמונות" — ו-Lovable מייצר את המבנה, העיצוב והקוד בתוך דקות.
              </p>
              <p>
                ההבדל המהותי בין Lovable לרוב כלי ה-No-Code: היא לא בונה "בתוך קופסה סגורה". כל אתר שנוצר הוא קוד React ו-TypeScript אמיתי, שאפשר לייצא ישירות ל-GitHub ולהמשיך לפתח עליו עם כל מפתח או כלי חיצוני. זו הסיבה שהיא נחשבת לכלי מעבר בין "בונה אתרים" לבין "עוזר פיתוח" — אפשר להתחיל לבד, ולתת למפתח להמשיך כשהפרויקט גדל.
              </p>
              <p>
                לפלטפורמה אין מסד נתונים מובנה משלה — היא מתחברת ל-Supabase כ-backend חיצוני עבור אימות משתמשים, טבלאות נתונים ואחסון קבצים. זה שונה מ-Base44, שמגיעה עם backend סגור ומובנה. ב-HEY Digital ניצלנו את זה בדיוק: <strong>אתר החברה שאתם קוראים עכשיו נבנה על Lovable</strong>, ואנחנו יודעים מהצד הראשון איפה הכלי מצטיין ואיפה הוא דורש עבודה נוספת.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה Lovable ב-2026 — ומה מקבלים בכל תוכנית?</h2>
              <p>
                Lovable עובדת על מודל קרדיטים משתנה — כל הודעה שאתם שולחים לבנייה או עריכה "שורפת" כמות קרדיטים שתלויה במורכבות הבקשה. לפי מדריך התמחור המעודכן של eesel.ai מ-2026, מבנה התוכניות נכון לאוגוסט הוא:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>Free (חינם):</strong> 5 קרדיטים ביום, עד 150 בחודש. מספיק לניסיון ולבניית פרויקט ציבורי ראשון, לא לשימוש בייצור.</li>
                <li><strong>Pro — $25 לחודש:</strong> 100 קרדיטים חודשיים בתוספת 5 קרדיטים יומיים, פרויקטים פרטיים, דומיין מותאם אישית והרשאות משתמשים.</li>
                <li><strong>Business — $50 לחודש:</strong> מתאים לצוותים — כולל תמיכה ב-SSO, מרכז אבטחה ואפשרות Opt-out ממודלי האימון של Lovable.</li>
                <li><strong>Enterprise:</strong> מחיר מותאם אישית, בדרך כלל החל מ-$500 לחודש עם התחייבות שנתית — לארגונים עם דרישות אבטחה וקנה מידה גבוה.</li>
              </ul>
              <p>
                חשוב לדעת: החל ממאי 2026 Lovable הגדילה את כמות הקרדיטים בתוכניות Starter ו-Pro, אבל גם שינתה את עלות הבקשות המורכבות — יצירה של כמה קבצים בבת אחת עולה כיום 2-3 קרדיטים במקום קרדיט אחד. משמעות הדבר: פרויקט עם הרבה עריכות ואיטרציות "שורף" קרדיטים מהר יותר ממה שנדמה בהתחלה, ולכן כדאי לתכנן את הבקשות מראש ולא "לנחש" בצ'אט.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה משתמשים יש ל-Lovable וכמה היא שווה ב-2026?</h2>
              <p>
                הנתונים ממחישים למה Lovable הפכה לשם נרדף ל-Vibe Coding. לפי netpanto.ai, נכון לפברואר 2026 לפלטפורמה כ-8 מיליון משתמשים, אחרי שחצתה 25 מיליון פרויקטים מצטברים בדצמבר 2025 (בזמן סבב הגיוס Series B). מבחינת הכנסות — Bloomberg דיווח במרץ 2026 שהחברה חצתה 400 מיליון דולר ARR עם צוות של 146 עובדים בלבד, ו-TechCrunch דיווח ביוני 2026 שההכנסה השנתית המוערכת הגיעה ל-500 מיליון דולר, עם כמיליון פרויקטים חדשים נוצרים בכל שבוע.
              </p>
              <p>
                Lovable גייסה $552.5 מיליון בסך הכל בארבעה סבבי גיוס, כשהאחרון (Series B, בהובלת CapitalG וקרן Anthology של Menlo Ventures) תמחר אותה בשווי של 6.6 מיליארד דולר. אלה מספרים חריגים אפילו בעולם ה-AI — והם מסבירים למה כמעט כל בעל עסק שרוצה אתר או MVP מהיר שומע היום את השם Lovable, יחד עם Base44 ו-GitHub Copilot, כחלק מגל ה-Vibe Coding של 2026.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך בונים אתר או אפליקציה ב-Lovable — שלב אחר שלב?</h2>
              <p>
                התהליך בפועל נראה כך:
              </p>
              <ol className="list-decimal list-inside space-y-3 mr-4">
                <li>
                  <strong>תיאור הפרויקט הראשוני:</strong> כותבים פרומפט אחד שמתאר את העסק והמטרה — "אתר תדמית למשרד עורכי דין עם עמוד שירותים, אודות, וטופס תיאום פגישה". Lovable מייצר גרסה ראשונית מלאה תוך דקות.
                </li>
                <li>
                  <strong>איטרציות בצ'אט:</strong> כל שינוי — "הוסף עמוד המלצות", "שנה את הצבע הראשי לירוק", "הוסף אנימציית גלילה" — מבוצע דרך הודעה בצ'אט, לא דרך עורך גרפי ידני.
                </li>
                <li>
                  <strong>חיבור Supabase (אם צריך):</strong> כשהפרויקט דורש התחברות משתמשים, טופס ששומר נתונים או מסד נתונים — מחברים חשבון Supabase בלחיצה, ו-Lovable בונה את הטבלאות והלוגיקה סביבו.
                </li>
                <li>
                  <strong>עיצוב ומיתוג:</strong> אפשר להעלות לוגו, לוח צבעים וגופנים — Lovable מתאימה את כל האתר למיתוג. לתוצאה שנראית ייחודית ולא "עוד אתר AI" נדרשת בדרך כלל עבודת עיצוב ידנית נוספת.
                </li>
                <li>
                  <strong>בדיקת קוד ואבטחה:</strong> לפני שמעלים לאוויר — בודקים הרשאות גישה לנתונים (Row Level Security ב-Supabase), במיוחד אם יש טופס שאוסף פרטי לקוחות.
                </li>
                <li>
                  <strong>פרסום ודומיין:</strong> לחיצה אחת מפרסמת את האתר על תת-דומיין של Lovable, או מחברים דומיין מותאם אישית (כלול מתוכנית Starter ומעלה).
                </li>
              </ol>
              <p>
                לעסק ישראלי שרוצה <Link to="/solutions/web-development" className="text-primary hover:underline">אתר תדמית מהיר</Link>, זה תהליך שיכול להסתיים תוך יום עבודה — אבל ברגע שרוצים לחבר את האתר למערכת CRM, ל-WhatsApp או לתהליכי <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link>, נדרשת בדרך כלל עבודה נוספת מעבר לפרומפטים הבסיסיים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">האם Lovable בטוחה לשימוש בייצור עם לקוחות אמיתיים?</h2>
              <p>
                כאן חשוב להיות כנים: לא תמיד. ביקורת אבטחה שפורסמה בדצמבר 2025 מצאה שכ-10.3% מהאפליקציות שנבנו ב-Lovable חושפות מידע רגיש בגלל הגדרות הרשאה שגויות, לפי הדיווח של geminatesolutions.com. The Next Web תיעד "משבר אבטחה" ממושך של הפלטפורמה — פרויקט אחד נותר חשוף במשך 48 ימים אחרי שדוח באג (bug bounty) נסגר בלי טיפול הולם, וחשף פרטים של כ-18,000 משתמשים.
              </p>
              <p>
                הבעיה היא לא ייחודית ל-Lovable — היא מאפיינת את כל תחום ה-Vibe Coding. מחקרים שצוטטו ב-2026 מצביעים על כך שבין 40% ל-62% מהקוד שנוצר על ידי AI מכיל פרצות אבטחה כלשהן, ושב-91.5% מהאפליקציות שנבנו בשיטת Vibe Coding ברבעון הראשון של 2026 נמצא לפחות פגם אחד שקשור להזיה (hallucination) של המודל. הסיבה: AI מייצר קוד שעובד — לא בהכרח קוד בטוח — וכשמשתמש בלי רקע טכני רואה שהאתר "נראה טוב", הוא נוטה לעצור שם בלי לבדוק מה קורה מתחת למכסה המנוע.
              </p>
              <p>
                המשמעות המעשית לבעל עסק: אתר תדמית סטטי בלי טפסים שאוספים מידע רגיש הוא סיכון נמוך. אבל ברגע שיש התחברות משתמשים, פרטי תשלום או נתוני לקוחות — מומלץ מאוד שמפתח או מומחה יעברו על הגדרות ה-RLS (Row Level Security) ב-Supabase, יוודאו שאין מפתחות API חשופים בצד הלקוח, ושתהיה בדיקה לפני עלייה לאוויר. זה בדיוק סוג העבודה שאנחנו עושים ב-HEY Digital עבור לקוחות שבונים על Lovable.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Lovable מול Base44 — מה ההבדל ומתי לבחור איזה?</h2>
              <p>
                שתי הפלטפורמות נחשבות לכלי ה-Vibe Coding המובילים בישראל ב-2026, אבל הן בנויות לשימושים שונים. פירטנו את זה בהרחבה ב<Link to="/blog/base44-israeli-startup-guide" className="text-primary hover:underline">מדריך המלא ל-Base44</Link>, וזה סיכום ההבדלים המרכזיים:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-3 px-4 font-semibold text-foreground">קריטריון</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Lovable</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Base44</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">מיועד ל</td>
                      <td className="py-3 px-4">אתרים ואפליקציות ציבוריות, SaaS</td>
                      <td className="py-3 px-4">כלים פנימיים, CRM, MVP מהיר</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">ייצוא קוד</td>
                      <td className="py-3 px-4">כן — React/TypeScript + GitHub</td>
                      <td className="py-3 px-4">לא — האפליקציה חיה ב-Base44</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">Backend</td>
                      <td className="py-3 px-4">מחבר Supabase חיצוני</td>
                      <td className="py-3 px-4">מובנה — DB, Auth, Storage כלולים</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">מחיר התחלתי בתשלום</td>
                      <td className="py-3 px-4">$25/חודש (Pro)</td>
                      <td className="py-3 px-4">$16/חודש (Starter)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">תמיכה בעברית/RTL</td>
                      <td className="py-3 px-4">⚠️ דורשת הגדרה ידנית</td>
                      <td className="py-3 px-4">✅ מלאה ומובנית</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">שווי חברה (2026)</td>
                      <td className="py-3 px-4">$6.6 מיליארד</td>
                      <td className="py-3 px-4">נמכרה ל-Wix ב-$80 מיליון</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                <strong>כלל אצבע:</strong> אם המוצר שאתם בונים פונה החוצה — אתר תדמית, חנות, אפליקציית SaaS שלקוחות ישלמו עליה — Lovable מתאימה יותר בזכות הקוד הניתן לייצוא ולעריכה עתידית. אם מדובר בכלי פנימי לניהול הפעילות שלכם (CRM, דאשבורד, מערכת HR) — Base44 בדרך כלל תהיה מהירה וזולה יותר להתחלה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה היתרונות והחסרונות האמיתיים של Lovable?</h2>
              <p>
                אחרי שבנינו עליה את אתר החברה שלנו, אלה התובנות המרכזיות:
              </p>
              <div className="space-y-4">
                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">✅ עקומת למידה כמעט אפסית</h3>
                  <p className="text-sm">אין צורך בידע קודם בתכנות כדי לקבל תוצאה ראשונית שנראית מקצועית. זו הסיבה שהפלטפורמה מגיעה ל-8 מיליון משתמשים תוך פחות משנתיים.</p>
                </div>
                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">✅ קוד אמיתי, לא "קופסה שחורה"</h3>
                  <p className="text-sm">בניגוד לבוני אתרים סגורים, כל פרויקט הוא קוד React/TypeScript שניתן לייצוא, מה שמאפשר להעביר את הפרויקט למפתח כשהעסק גדל, בלי "לנעול" את עצמכם לפלטפורמה אחת.</p>
                </div>
                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">⚠️ אפליקציות מורכבות עדיין נתקעות בקצוות</h3>
                  <p className="text-sm">לוגיקה עסקית עם הרבה תנאים, אינטגרציות מרובות ומקרי קצה נדירים היא המקום שבו Vibe Coding מפסיק להספיק — ונדרש מפתח שייכנס לקוד באופן ידני.</p>
                </div>
                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">⚠️ אבטחה היא תוספת, לא ברירת מחדל</h3>
                  <p className="text-sm">כפי שפורט למעלה, עשירית מהאפליקציות שנבדקו חשפו מידע. אבטחה חייבת להיות שלב מפורש בתהליך — לא הנחה סמויה שהפלטפורמה "כבר דואגת לזה".</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מתי כדאי לשכור מומחה לעבודה עם Lovable במקום לבנות לבד?</h2>
              <p>
                Lovable נגישה מספיק שבעל עסק יכול לבנות גרסה ראשונה תוך יום. אבל יש נקודות שבהן ליווי מקצועי חוסך זמן, כסף וסיכון:
              </p>
              <ul className="list-disc list-inside space-y-3 mr-4">
                <li>
                  <strong>לפני עלייה לאוויר עם נתוני לקוחות אמיתיים:</strong> בדיקת הרשאות, אבטחת API ו-RLS ב-Supabase — לא שלב לוותר עליו.
                </li>
                <li>
                  <strong>חיבור לאינטגרציות עסקיות:</strong> חיבור טופס לידים ל-CRM, ל-WhatsApp או לתהליכי <Link to="/solutions/workflow-automation" className="text-primary hover:underline">אוטומציית עבודה</Link> — דורש בדרך כלל שילוב מעבר למה שהצ'אט של Lovable בונה לבד.
                </li>
                <li>
                  <strong>עיצוב שמייצג את המותג:</strong> ה-UI שנוצר אוטומטית פונקציונלי, אבל לא תמיד ייחודי — לעסקים שרוצים להתבדל, עיצוב מותאם משתלם.
                </li>
                <li>
                  <strong>ביצועים וקנה מידה:</strong> אתר עם תעבורה גבוהה, טעינת תמונות רבות או תהליכים כבדים דורש לרוב אופטימיזציה שמעבר לפרומפט בסיסי.
                </li>
              </ul>
              <p>
                ב-HEY Digital בנינו את אתר החברה שלנו על Lovable, וכיום מלווים עסקים ישראלים שבוחרים באותה דרך — מהקמה ראשונית ועד חיבור מלא של <Link to="/solutions/crm-automation" className="text-primary hover:underline">CRM ואוטומציה</Link> סביב האתר.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים אתר או אפליקציה בנויים על Lovable, מאובטחים ומחוברים למערכות שלכם?</h3>
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

export default LovableAiWebsiteBuilderGuide;

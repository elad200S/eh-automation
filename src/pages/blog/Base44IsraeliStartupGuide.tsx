import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  {
    question: 'האם Base44 עדיין חינמי אחרי הרכישה של Wix?',
    answer: 'כן — נכון לאוגוסט 2026, Base44 עדיין מציעה מסלול חינמי עם 25 קרדיטים בחודש לצורך בדיקה. מסלולים בתשלום מתחילים מ-$16 לחודש (Starter) ועולים עד $160 לחודש (Elite). מאז הרכישה ב-$80 מיליון, המוצר ממשיך לפעול עצמאית תחת מטריית Wix, אך אין שינוי מחירים שפורסם עד כה.'
  },
  {
    question: 'מה ההבדל בין Base44 ל-Lovable?',
    answer: 'שתי הפלטפורמות מאפשרות בניית אפליקציה בהנחיה טקסטואלית בלי לכתוב קוד. ההבדל המרכזי: Base44 מיועדת לכלים פנימיים, CRM, דאשבורדים ו-MVP מהירים — האפליקציה חיה בתוך הפלטפורמה ואין ייצוא קוד. Lovable מיועדת לאפליקציות ציבוריות עם ממשק משתמש מעוצב, ומספקת קוד React/TypeScript שאפשר לייצא ל-GitHub ולתת למפתח להמשיך.'
  },
  {
    question: 'כמה זמן לוקח לבנות CRM ב-Base44?',
    answer: 'לבעל עסק שאין לו ניסיון בפיתוח — בין שעה לכמה ימים, תלוי במורכבות. CRM בסיסי עם ניהול לקוחות, צינור עסקאות ותזכורות ניתן לבנות בכמה שעות. מערכת מורכבת עם אינטגרציות ל-API חיצוני, לוגיקה מותנית מורכבת ותצוגות מרובות דורשת יותר ניסיון ועשויה לקחת כמה ימי עבודה.'
  },
  {
    question: 'האם Base44 תומכת עברית ו-RTL?',
    answer: 'כן. Base44 בנתה תמיכה מלאה בעברית ועיצוב RTL (ימין לשמאל) בדיוק בשביל השוק הישראלי. אפשר לבנות אפליקציות בעברית מלאה, כולל ממשק משתמש, שדות טופס, הודעות ותוכן — ללא עבודה ידנית על הגדרות שפה.'
  },
  {
    question: 'מה ה-use cases הנפוצים ביותר של Base44 לעסקים ישראלים?',
    answer: 'לפי נתוני הפלטפורמה, הייסטים הנפוצים ביותר הם: מערכות CRM מותאמות אישית בלי עלות לייסנס, פורטלי לקוחות שמחליפים אקסל, כלי מעקב לידים ופולו-אפ, דאשבורדים לדיווח ואנליטיקס פנימי, וכלי HR לניהול כניסה, חופשות ואונבורדינג. כל אלה הם תחומים שבהם עסק בינוני-קטן משלם היום ₪500-3,000 בחודש למערכות מסחריות.'
  },
  {
    question: 'מתי כדאי לשכור מומחה לבניית אפליקציה ב-Base44 במקום לבנות לבד?',
    answer: 'כדאי לשקול מומחה כשצריך אינטגרציה מורכבת ל-API חיצוני (Stripe, WhatsApp, מערכת ERP), כשיש לוגיקה עסקית מסובכת שצריך "לתרגם" לפרומפטים נכונים, כשיש צורך בעיצוב מותאם לזהות המותג, או כשהזמן של בעל העסק שווה יותר מהזמן שייקח ללמוד את הפלטפורמה. ב-HEY Digital אנו בונים על Base44 כבר מיומה הראשון — ניצור עבורכם מערכת תפעולית תוך ימים בודדים.'
  },
];

const Base44IsraeliStartupGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Base44 — המדריך המלא לסטארטאפ הישראלי של Wix | HEY Digital"
        description="Base44 הישראלי נמכר ל-Wix ב-80 מיליון דולר. מדריך מלא: כמה עולה, איך בונים CRM ואפליקציה ללא קוד, ומה מתאים לעסק שלך ב-2026."
        path="/blog/base44-israeli-startup-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Base44 — המדריך המלא לסטארטאפ הישראלי של Wix', path: '/blog/base44-israeli-startup-guide' },
      ]} />
      <ArticleSchema
        title="Base44 — המדריך המלא לסטארטאפ הישראלי של Wix"
        description="Base44 הישראלי נמכר ל-Wix ב-80 מיליון דולר. מדריך מלא: כמה עולה, איך בונים CRM ואפליקציה ללא קוד, ומה מתאים לעסק שלך ב-2026."
        path="/blog/base44-israeli-startup-guide"
        datePublished="2026-08-04"
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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Base44 — הסטארטאפ הישראלי שWix קנתה ב-80 מיליון $, ואיך בונים עליו מערכת לעסק</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Base44 הוא כלי No-Code ישראלי שמאפשר לבנות אפליקציה, CRM או מערכת פנימית מלאה — בלי לכתוב שורת קוד אחת. בתוך שישה חודשים מהשקתו, מייסדו מאור שלמה מכר אותו ל-Wix ב-$80 מיליון. במדריך הזה תלמדו בדיוק מה זה, כמה זה עולה, ואיך בעל עסק ישראלי יכול להשתמש בו כדי לחסוך אלפי שקלים בחודש על מערכות מדף.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה Base44 ולמה כולם מדברים עליו ב-2026?</h2>
              <p>
                Base44 היא פלטפורמת No-Code המאפשרת לכל אחד — גם בלי שורת קוד אחת — לבנות אפליקציה, אתר, לוח מחוונים (דאשבורד) או מערכת CRM מלאה. הדרך לעשות זאת פשוטה: כותבים בשפה פשוטה מה רוצים שהאפליקציה תעשה — "בנה לי CRM לניהול לידים עם עמוד לקוח, היסטוריית שיחות ומשימות פתוחות" — ו-Base44 בונה את זה אוטומטית.
              </p>
              <p>
                הפלטפורמה שונה ממרבית כלי ה-No-Code הקיימים כי היא לא רק frontend. היא מגיעה עם backend מובנה, בסיס נתונים (database) מקורי, אחסון קבצים ומנגנון התחברות משתמשים (authentication) — הכל בתוך אותה חבילה, ללא צורך לחבר שירותים חיצוניים. זה אומר שאפשר להשיק מערכת אמיתית לעסק, כולל הגנת סיסמאות, ניהול גישות ואחסון נתונים — בלי ידע טכני.
              </p>
              <p>
                הסיבה שהעולם התאהב ב-Base44: מאור שלמה, מייסד החברה, הצליח להגיע ל-<strong>מיליון דולר ARR תוך שלושה שבועות בלבד מההשקה</strong> — לבד, ללא השקעת הון חוץ, ללא מחלקת מכירות ופרסום. עד להשיג הרכישה, הפלטפורמה צמחה ל-<strong>400,000 משתמשים</strong> ו-$3.5M ARR. Wix שילמה $80 מיליון עבורה — כפול 22 מה-ARR, אחד מהמכפילים הגבוהים בענף ה-No-Code ב-2026.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מי הוא מאור שלמה ולמה הסיפור הזה מרתק?</h2>
              <p>
                מאור שלמה הוא יזם ישראלי בן 31 שהקים את Base44 לחלוטין לבד — ללא שותפים, ללא משקיעים, ללא עובדים — וניהל את הכל תוך שהוא מתמודד עם ADHD. לפני Base44 כיהן שבע שנים כמנכ"ל Explorium, חברת Data Intelligence שגייסה מאות מיליוני דולרים. כשעזב, הוא לא ניסה לגייס ולבנות "כמו שצריך" — הוא ישב ובנה.
              </p>
              <p>
                הסיפור שלו מדגים בדיוק מה Vibe Coding (בניית תוכנה בעזרת AI בשפה טבעית) מאפשר בשנת 2026: אדם אחד, בלי צוות, בלי תקציב שיווק — מצליח לבנות מוצר שמגיע ל-400,000 משתמשים ונמכר ב-$80 מיליון תוך חצי שנה. <strong>כ-6 חודשים בלבד עברו מהקמה ועד האקזיט</strong>, כשעובד ראשון הצטרף רק חודש וחצי לפני הרכישה.
              </p>
              <p>
                Wix — חברת בניית האתרים הישראלית שנסחרת בבורסת NASDAQ — רכשה את Base44 כחלק מאסטרטגיה של שילוב AI בתהליכי הפיתוח שלה. העסקה עמדה על $80 מיליון במזומן, עם אפשרות לתוספת בכפוף ליעדים שונים עד 2029. בפועל, Base44 ממשיכה לפעול כמוצר עצמאי תחת מטריית Wix.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה Base44 בישראל ב-2026 — ומה מקבלים בכל מסלול?</h2>
              <p>
                Base44 עובדת על מודל קרדיטים: כל פעולה שמבצעים בפלטפורמה (בניית רכיב, שאילתת נתונים, שינוי לוגיקה) צורכת קרדיטים. הנה פירוט המסלולים נכון לאוגוסט 2026:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>Free (חינם):</strong> 25 קרדיטים בחודש. מיועד לניסיון ראשוני בלבד — לא לשימוש בייצור.</li>
                <li><strong>Starter — $16 לחודש:</strong> קרדיטים מוגברים, domain מותאם אישית, אחסון מובנה. מתאים לפרויקט יחיד קטן.</li>
                <li><strong>Builder — $40 לחודש:</strong> קרדיטים נוספים, אינטגרציה עם Stripe, Google Workspace ואחרים. מתאים לעסק שרוצה כלי פנימי אחד-שניים.</li>
                <li><strong>Pro — $80 לחודש:</strong> קרדיטים גבוהים, שימוש בייצור מלא, תמיכה מהירה. עבור עסקים שמשתמשים בפלטפורמה כמערכת מרכזית.</li>
                <li><strong>Elite — $160 לחודש:</strong> קרדיטים ללא הגבלה מעשית, SLA, שימוש ארגוני. לצוותים גדולים ולחברות עם מורכבות גבוהה.</li>
              </ul>
              <p>
                <strong>חשוב לדעת:</strong> תוכנית שנתית זולה בכ-25% מתוכנית חודשית. לעסק ישראלי שמחפש להחליף מערכת CRM מסחרית שעולה ₪1,500-4,000 בחודש (כמו Salesforce, Monday ואחרות) — Base44 Pro במחיר של כ-$80 עם שימוש חופשי ב-seats יכולה להיות חיסכון משמעותי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך בונים אפליקציה ב-Base44 — מה התהליך בפועל?</h2>
              <p>
                התהליך פשוט יותר ממה שנשמע. הנה שלבי הבנייה הסטנדרטיים:
              </p>
              <ol className="list-decimal list-inside space-y-3 mr-4">
                <li>
                  <strong>בחירת נקודת התחלה:</strong> אפשר להתחיל מתבנית מוכנה (CRM, ניהול פרויקטים, פורטל לקוחות, SaaS בסיסי) או מקנבס ריק. לרוב העסקים — תבנית חוסכת 80% מהעבודה הראשונית.
                </li>
                <li>
                  <strong>פרומפט לממשק ה-Builder:</strong> כותבים בממשק הצ'אט של Base44 בדיוק מה רוצים: "הוסף שדה 'מקור ליד' עם ערכים: גוגל / פייסבוק / המלצה / אחר. כשעורכים את הליד, הצג את ההיסטוריה של כל האינטראקציות מתחת." — ו-Base44 בונה את זה.
                </li>
                <li>
                  <strong>בסיס הנתונים:</strong> הפלטפורמה מגיעה עם טבלאות נתונים מובנות (נראות כמו Google Sheets). אפשר להגדיר שדות, קשרים בין טבלאות ולוגיקה — ישירות בממשק, ללא SQL.
                </li>
                <li>
                  <strong>עיצוב המסכים:</strong> Base44 מייצרת ממשק ויזואלי אוטומטי שאפשר לשנות. חיבור בין הנתונים לתצוגה — שלושה קליקים.
                </li>
                <li>
                  <strong>הגדרת משתמשים וגישות:</strong> מגדירים תפקידים (מנהל / עובד / לקוח) עם הרשאות שונות. האימות (login) מובנה — ללא שירות חיצוני.
                </li>
                <li>
                  <strong>פרסום:</strong> לחיצה אחת. Base44 מארחת את האפליקציה, כולל HTTPS ו-domain מותאם אישית.
                </li>
              </ol>
              <p>
                כלל האצבע של עסקים שבנו על Base44: CRM פשוט — 2-4 שעות עבודה; מערכת מורכבת עם אינטגרציות — 2-5 ימים. אם אתם בונים עם <Link to="/solutions/business-automation" className="text-primary hover:underline">אוטומציה עסקית</Link> מובנית — כלומר שהאפליקציה מבצעת פעולות אוטומטיות כמו שליחת תזכורות, עדכון סטטוסים או הפקת דוחות — הזמן עולה, אבל גם הערך.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אילו מערכות אפשר לבנות על Base44 לעסק ישראלי?</h2>
              <p>
                ה-use cases הנפוצים ביותר בקרב עסקים ישראלים שעובדים עם Base44 (לפי נתוני הפלטפורמה ולפי הניסיון שלנו ב-HEY Digital):
              </p>

              <div className="space-y-4">
                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">🗂️ CRM מותאם אישית — ללא עמלת ייסנס לסיט</h3>
                  <p className="text-sm">מערכות CRM כמו Salesforce, HubSpot ו-Monday גובות לפי משתמש — $20-150 לסיט בחודש. עסק עם 5 עובדי מכירות משלם $100-750 בחודש רק על הייסנס. ב-Base44 בונים CRM מותאם לתהליך המכירה הספציפי שלכם, בלי מגבלת סיטים, בפחות מ-$80 לחודש לחבילת Pro.</p>
                </div>

                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">📋 פורטל לקוחות / ספקים</h3>
                  <p className="text-sm">במקום ניהול הזמנות ועדכונים בווטסאפ ואקסל — בונים פורטל שבו הלקוח נכנס, רואה את הסטטוס של ההזמנה שלו, מעלה מסמכים ומאשר הצעות מחיר. ניתן לבנות כזה ב-Base44 תוך יום עבודה.</p>
                </div>

                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">📊 דאשבורד דיווח ואנליטיקס</h3>
                  <p className="text-sm">חיבור נתונים ממקורות שונים (שיחות, לידים, מכירות) לדאשבורד אחד שמתעדכן בזמן אמת. מנהלים שעבדו עם 4-5 קבצי אקסל נפרדים ראו חיסכון של 3-5 שעות בשבוע לאחר הקמת דאשבורד Base44.</p>
                </div>

                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">👥 כלי HR פנימי</h3>
                  <p className="text-sm">ניהול כניסה/יציאה, בקשות חופשה, מסמכי אונבורדינג לעובדים חדשים ומעקב ציוד — כולם בכלי אחד שהצוות משתמש בו דרך ממשק פשוט. עסקים בסדר גודל 5-50 עובדים מוצאים בזה חלופה מצוינת לתוכנות HR שעולות אלפי שקלים בחודש.</p>
                </div>

                <div className="p-5 border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">🔄 מעקב לידים ופולו-אפ</h3>
                  <p className="text-sm">שילוב Base44 עם <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">אוטומציה של WhatsApp</Link> יוצר מערכת שמקבלת ליד מטופס, פותחת כרטיס ב-Base44, ושולחת פולו-אפ אוטומטי לאחר 24 שעות. ללא עזיבת שום ליד לגורלו.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Base44 מול Lovable — מה ההבדל ומתי לבחור כל אחד?</h2>
              <p>
                שתי הפלטפורמות נחשבות ל"כלי Vibe Coding" המובילים ב-2026 — כלומר, בונות אפליקציה בהנחיה טקסטואלית. אבל הן מיועדות לשימושים שונים:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-3 px-4 font-semibold text-foreground">קריטריון</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Base44</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Lovable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">מיועד ל</td>
                      <td className="py-3 px-4">כלים פנימיים, CRM, MVP מהיר</td>
                      <td className="py-3 px-4">אפליקציות ציבוריות, SaaS, אתרים</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">ייצוא קוד</td>
                      <td className="py-3 px-4">לא — האפליקציה חיה ב-Base44</td>
                      <td className="py-3 px-4">כן — React/TypeScript + GitHub</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">Backend מובנה</td>
                      <td className="py-3 px-4">כן — DB, Auth, Storage כלולים</td>
                      <td className="py-3 px-4">חלקי — מחבר Supabase חיצוני</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">מחיר התחלתי</td>
                      <td className="py-3 px-4">$16/חודש (Starter)</td>
                      <td className="py-3 px-4">$20/חודש (Pro)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">תמיכה בעברית/RTL</td>
                      <td className="py-3 px-4">✅ מלאה</td>
                      <td className="py-3 px-4">⚠️ חלקית (צריך הגדרה ידנית)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">זמן ל-MVP</td>
                      <td className="py-3 px-4">שעות לימים</td>
                      <td className="py-3 px-4">שעות לשבועות</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong>כלל האצבע:</strong> אם אתם בונים משהו לשימוש <em>פנימי</em> בעסק (CRM, כלי HR, דאשבורד, פורטל ספקים) — Base44 היא הבחירה המהירה, הזולה והישראלית יותר. אם אתם בונים <em>מוצר ציבורי</em> שלקוחות ישלמו עליו (SaaS, אפליקציה מתחרה, פרויקט שצריך קוד לייצא למפתח) — Lovable מתאימה יותר. ב-HEY Digital אנו משתמשים בשתיהן: הפלטפורמה הפנימית שלנו לניהול לקוחות (0CAI) בנויה על Base44, ואתר HEY Digital עצמו נבנה ב-Lovable.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">האם Base44 מתאים לבנות עליו מערכת ל-CRM + וואטסאפ + אוטומציה?</h2>
              <p>
                כן — עם הסתייגות אחת. Base44 לבדה מתאימה לניהול הנתונים, הממשק ותהליכי העבודה הפנימיים. אוטומציות מורכבות שיוצאות מחוץ לפלטפורמה — כמו שליחת הודעות WhatsApp, טריגרים מבוססי זמן, אינטגרציה ל-Google Calendar או שליחת מיילים מ-Gmail — מצריכות לרוב חיבור עם כלי אוטומציה כמו Make.com.
              </p>
              <p>
                הארכיטקטורה הנפוצה שאנו בונים עם לקוחות:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>Base44</strong> — מסד הנתונים, הממשק ותהליכי העבודה</li>
                <li><strong>Make.com</strong> — האוטומציות שמחברות בין Base44 לעולם החיצון (WhatsApp, מייל, Google Calendar)</li>
                <li><strong>WhatsApp Business API</strong> — ערוץ התקשורת עם לקוחות</li>
              </ul>
              <p>
                שילוב כזה יוצר מערכת שמנהלת לידים, שולחת פולו-אפ אוטומטי, מתזמנת פגישות ומעדכנת את הצוות — הכל בלי להיכנס ידנית לשום מקום. לפרטים על <Link to="/solutions/crm-automation" className="text-primary hover:underline">אינטגרציית CRM ואוטומציה</Link> — ראו את עמוד הפתרונות שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ה-ROI של בניית מערכת על Base44 לעומת רכישת תוכנה מדף?</h2>
              <p>
                ההשוואה הנפוצה ביותר שאנו רואים אצל לקוחות:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-3 px-4 font-semibold text-foreground">מדד</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">CRM מדף (Monday/HubSpot)</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">בנייה ב-Base44</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">עלות חודשית (5 משתמשים)</td>
                      <td className="py-3 px-4">₪500-2,000/חודש</td>
                      <td className="py-3 px-4">$40-80/חודש (≈₪150-300)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">התאמה לתהליך שלכם</td>
                      <td className="py-3 px-4">מוגבלת — מתאימים אתם לכלי</td>
                      <td className="py-3 px-4">מלאה — הכלי מתאים אליכם</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">זמן הטמעה</td>
                      <td className="py-3 px-4">שבועות עד חודשים</td>
                      <td className="py-3 px-4">ימים עד שבועיים</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">שינוי עתידי</td>
                      <td className="py-3 px-4">תלוי בספק / תוספת מחיר</td>
                      <td className="py-3 px-4">מיידי — שינוי בפרומפט</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">ייצוא נתונים</td>
                      <td className="py-3 px-4">תלוי בתנאי שירות</td>
                      <td className="py-3 px-4">תמיד — הנתונים שלכם</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                עסקים שעברו ממערכת מדף ל-Base44 (עם סיוע של מומחה) מדווחים על <strong>חיסכון ממוצע של ₪1,000-2,500 בחודש</strong> על עלויות ייסנס, בנוסף לחיסכון של 5-10 שעות שבועיות על עבודה ידנית שהמערכת המותאמת מבצעת אוטומטית. בפרויקטים שאנו מבצעים ב-HEY Digital — החזר ההשקעה בהקמה מגיע בדרך כלל תוך 3-4 חודשים.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מתי כדאי לשכור מומחה לבנות עבורכם על Base44?</h2>
              <p>
                Base44 נגישה מספיק שבעל עסק יכול ללמוד אותה בסוף שבוע ולבנות גרסה ראשונה. אבל יש מצבים שבהם שיתוף פעולה עם מומחה מוסיף ערך ממשי:
              </p>
              <ul className="list-disc list-inside space-y-3 mr-4">
                <li>
                  <strong>אינטגרציות מורכבות:</strong> חיבור ל-WhatsApp API, לאמצעי תשלום (Stripe, PayPlus), ל-ERP קיים או לממשקי API של ספקים — מצריך ידע שמעבר לפרומפטים רגילים.
                </li>
                <li>
                  <strong>לוגיקה עסקית מסובכת:</strong> תהליכים עם תנאים מרובים, מספר אחריות מקבילות ואוטומציות שמתפרסות על מספר מערכות. פרומפטים "כלליים" מייצרים לוגיקה שבירה — מומחה בונה אותה נכון מהפעם הראשונה.
                </li>
                <li>
                  <strong>ממשק שמשקף את המותג:</strong> ה-UI שBase44 מייצרת אוטומטית הוא פונקציונלי אבל לא תמיד מעוצב. לפרויקטים שמוכרים ללקוחות חיצוניים — עיצוב מותאם שווה את ההשקעה.
                </li>
                <li>
                  <strong>הגנה, backup ותחזוקה:</strong> מערכת בייצור צריכה ניטור, תיעוד ותכנון התאוששות מתקלות — לא רק "בנינו את זה ועובד".
                </li>
              </ul>
              <p>
                ב-HEY Digital אנו בונים על Base44 מאז יומה הראשון — זה הכלי שעליו רצה המערכת הפנימית שלנו לניהול לקוחות. אנחנו <Link to="/solutions/workflow-automation" className="text-primary hover:underline">מיישמים אוטומציות</Link> ו<Link to="/solutions/web-development" className="text-primary hover:underline">מפתחים כלים דיגיטליים</Link> מותאמים — ומשלבים Base44 כשזה הכלי הנכון לצורך.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עתיד Base44 אחרי הרכישה על ידי Wix?</h2>
              <p>
                השאלה שכולם שואלים: "Wix רכשה אותם — האם הם עדיין רלוונטיים?" התשובה היא כן — לפחות בטווח הנראה לעין. ישנן כמה סיבות לכך:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>Wix שילמה $80 מיליון כדי לשלב את יכולות ה-AI של Base44 — לא כדי לסגור אותו.</li>
                <li>Base44 ממשיכה לפעול כמוצר עצמאי, עם צוות נפרד ומפות דרכים עצמאיות.</li>
                <li>העסקה כוללת יעדי ביצוע עד 2029 — כלומר יש אינטרס ישיר של Wix שBase44 תמשיך לגדול.</li>
                <li>400,000 משתמשים לפני הרכישה, עם קצב צמיחה חד — הבסיס קיים.</li>
              </ul>
              <p>
                הסיכון העיקרי הוא שינוי מחירים לאחר שילוב מלא ב-Wix, או הפניית המוצר לצרכים של Wix יותר מאשר לצרכי עסקים עצמאיים. זו הסיבה שרוב המומחים ממליצים לבנות ארכיטקטורה שאינה תלויה ב-Base44 לבד — אלא להשתמש בה ככלי ניהול נתונים, עם מעטפת של Make.com לאוטומציות, שמאפשרת גמישות גבוהה להחלפת כלי ה-frontend אם יהיה צורך.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לבנות מערכת על Base44 לעסק שלכם?</h3>
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

export default Base44IsraeliStartupGuide;

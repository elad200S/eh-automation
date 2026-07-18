import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'מה ROI טוב לפרויקט אוטומציה?', answer: 'ROI של 200-300% בשנה הראשונה נחשב טוב לפרויקט אוטומציה. כלומר, אם השקעתם ₪10,000, חסכתם ₪20,000-30,000. ROI של מעל 300% נחשב מצוין — ולרוב מושג כשהאוטומציה מגדילה הכנסות (יותר לידים, המרות גבוהות יותר) ולא רק חוסכת עלויות.' },
  { question: 'כמה זמן לוקח להגיע ל-ROI חיובי?', answer: '60% מהעסקים מדווחים על ROI חיובי תוך 12 חודשים. עסקים קטנים עם אוטומציה פשוטה (פולו-אפ, תזכורות) מגיעים ל-ROI חיובי בדרך כלל תוך 2-4 חודשים. פרויקטים גדולים יותר לוקחים 6-12 חודשים.' },
  { question: 'האם אוטומציה שלא חוסכת שעות עדיין שווה?', answer: 'כן — אוטומציה שמגדילה הכנסות (פולו-אפ שסוגר יותר עסקאות, מענה מהיר יותר ללידים) יכולה להיות בעלת ROI גבוה מאוד גם אם לא חוסכת שעות ישירות. חשוב לחשב את שני הצדדים.' },
  { question: 'מה עלויות נסתרות של אוטומציה?', answer: 'עלויות שלעתים מוחמצות: זמן הכשרת הצוות, שדרוגים ותחזוקה שוטפת, עלויות כלים נוספים (CRM, WhatsApp API), ומקרים שבהם האוטומציה נשברת ודורשת תיקון. חשוב להוסיף 15-25% לאומדן הפרויקט לעלויות אלה.' },
  { question: 'האם ROI שלילי בשנה הראשונה הוא כישלון?', answer: 'לא בהכרח. פרויקטים גדולים עם השקעה גבוהה בהקמה עשויים להגיע ל-ROI חיובי רק בשנה השנייה — ואז לייצר ערך עצום לשנים הבאות. חשוב לחשב ROI מצטבר ל-3 שנים, לא רק לשנה הראשונה.' },
];

const AutomationRoiCalculator = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="ROI של אוטומציה — איך מחשבים כמה חסכת? | HEY Digital"
        description="מדריך מעשי לחישוב ROI של אוטומציה עסקית: נוסחאות, דוגמאות מספריות, ומסגרת לקבלת החלטה. 60% מהעסקים מגיעים ל-ROI תוך 12 חודשים."
        path="/blog/automation-roi-calculator"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'ROI אוטומציה', path: '/blog/automation-roi-calculator' },
      ]} />
      <ArticleSchema
        title="ROI של אוטומציה — איך מחשבים כמה חסכת?"
        description="מדריך מעשי לחישוב ROI של אוטומציה עסקית: נוסחאות, דוגמאות מספריות, ומסגרת לקבלת החלטה. 60% מהעסקים מגיעים ל-ROI תוך 12 חודשים."
        path="/blog/automation-roi-calculator"
        datePublished="2026-09-01"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">מדריכים</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">ROI של אוטומציה — איך מחשבים כמה חסכת?</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ROI של אוטומציה הוא השאלה שכל בעל עסק שואל לפני שהוא משקיע. המדריך הזה נותן כלים מספריים פשוטים לחישוב ה-ROI הצפוי — ומסביר למה 60% מהארגונים שמטמיעים אוטומציה מגיעים ל-ROI חיובי תוך 12 חודשים.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה זה ROI ואיך הנוסחה עובדת לאוטומציה?</h2>
              <p>
                ROI — Return on Investment — הוא אחוז התשואה על ההשקעה. הנוסחה הבסיסית היא:
              </p>
              <div className="p-4 bg-card rounded-xl border border-border font-mono text-sm text-center">
                <p className="text-foreground font-semibold">ROI = ((ערך שנוצר - עלות ההשקעה) / עלות ההשקעה) × 100</p>
              </div>
              <p>
                לדוגמה: אוטומציה שעלתה ₪10,000 להקמה ו-₪500/חודש לתחזוקה, וחוסכת ₪4,000 לחודש בשכר ובטעויות:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>עלות שנתית: ₪10,000 (הקמה) + ₪6,000 (תחזוקה שנתית) = ₪16,000</li>
                <li>ערך שנתי: ₪4,000 × 12 = ₪48,000</li>
                <li>ROI שנתי: ((₪48,000 - ₪16,000) / ₪16,000) × 100 = 200%</li>
              </ul>
              <p>
                ROI של 200% אומר שהכפלתם את השקעה הראשונית פי 2. לא רע לשנה הראשונה — ובשנה השנייה עלות ההקמה נעלמת, ורוב ה-₪48,000 הם רווח.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4 מקורות חיסכון שחייבים לחשב לפני פרויקט אוטומציה</h2>
              <p>
                הטעות הנפוצה ביותר בחישוב ROI לאוטומציה: חישוב רק חיסכון ישיר בשכר. בפועל, ישנם 4 מקורות חיסכון שכדאי לחשב:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">1. חיסכון בשעות עבודה — הכי קל לחשב</h3>
                  <p className="text-sm">מפו כמה שעות הצוות מבלה בשבוע על התהליך שרוצים לאטמט. הכפילו בעלות שעת עבודה ריאלית (שכר ברוטו × 1.35 לתנאים). לדוגמה: 15 שעות × ₪80 = ₪1,200/שבוע = ₪62,400/שנה.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">2. עלות שגיאות — לרוב מוחמץ</h3>
                  <p className="text-sm">תהליכים ידניים מייצרים שגיאות. כמה עולות שגיאות בתהליך הנוכחי — החזרות, תיקונים, כסף שנאבד? בדרך כלל ₪5,000-30,000 בשנה לתהליכים בינוניים. אוטומציה מצמצמת שגיאות ב-70-90%.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">3. גידול בהכנסות — לרוב המשמעותי ביותר</h3>
                  <p className="text-sm">מענה מהיר יותר ללידים, פולו-אפ שיטתי, ניהול לקוחות טוב יותר — כל אלה מגדילים המרות. עסקים מדווחים על גידול של 25-60% בהמרות לאחר אוטומציה. חשבו כמה הכנסה נוספת זה מייצר.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">4. מניעת עלויות עתידיות — עסקים גדלים</h3>
                  <p className="text-sm">כשהעסק גדל, אוטומציה מאפשרת לטפל בנפח גדל ב-50-100% בלי לשכור עובד נוסף. ₪8,000/חודש × 12 = ₪96,000/שנה שלא תצטרכו להוציא.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">דוגמה מספרית מלאה — עסק שירותים עם 3 עובדים</h2>
              <p>
                הנה חישוב ROI ריאלי לעסק שירותים קטן (יועץ, קליניקה, סוכנות) עם 3 עובדים:
              </p>
              <div className="space-y-2">
                <p><strong className="text-foreground">תהליכים לאוטומציה:</strong> מענה ללידים, פולו-אפ, קביעת פגישות, שליחת הצעות מחיר.</p>
                <p><strong className="text-foreground">עלות ידנית נוכחית:</strong></p>
                <ul className="list-disc list-inside pr-4 space-y-1">
                  <li>8 שעות/שבוע × ₪100/שעה = ₪800/שבוע = ₪41,600/שנה (שעות עבודה)</li>
                  <li>שגיאות ופספוסים: ~₪10,000/שנה</li>
                  <li>לידים שנאבדים (20% מ-100 לידים/חודש × ₪500 ממוצע לעסקה): ₪12,000/שנה</li>
                  <li><strong className="text-foreground">סה"כ עלות נוכחית: ~₪63,600/שנה</strong></li>
                </ul>
                <p><strong className="text-foreground">עלות האוטומציה:</strong></p>
                <ul className="list-disc list-inside pr-4 space-y-1">
                  <li>הקמה: ₪8,000 חד-פעמי</li>
                  <li>תחזוקה שוטפת: ₪1,000/חודש = ₪12,000/שנה</li>
                  <li><strong className="text-foreground">סה"כ עלות שנה ראשונה: ₪20,000</strong></li>
                </ul>
                <p><strong className="text-foreground">ROI שנה ראשונה:</strong> ((₪63,600 - ₪20,000) / ₪20,000) × 100 = 218%</p>
                <p><strong className="text-foreground">ROI שנה שנייה ואילך:</strong> ((₪63,600 - ₪12,000) / ₪12,000) × 100 = 430%</p>
              </div>
              <p>
                25-30% עלייה בפרודוקטיביות היא הממוצע שמדווחים עסקים שמטמיעים אוטומציה. לעסק שמרוויח ₪500,000 בשנה, זה ₪125,000-150,000 ערך נוסף — מספרים שמצדיקים השקעה משמעותית.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך מחשבים ROI לאוטומציה שמגדילה הכנסות (לא רק חוסכת)?</h2>
              <p>
                חישוב ROI לחיסכון עלויות הוא פשוט יחסית. אבל לאוטומציה שמגדילה הכנסות — כמו פולו-אפ שמחזיר לקוחות, או מענה מהיר שסוגר יותר עסקאות — החישוב מורכב קצת יותר.
              </p>
              <p>
                הגישה הנכונה: בצעו בדיקת A/B. חודש אחד — תהליך ידני רגיל. חודש שני — עם אוטומציה. מדדו:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>שיעור המרה (לידים לעסקאות): עלה? כמה אחוז?</li>
                <li>ממוצע ערך עסקה: השתנה?</li>
                <li>מספר לידים שחזרו לאחר פולו-אפ: כמה?</li>
              </ul>
              <p>
                לדוגמה: אם פולו-אפ אוטומטי הגדיל שיעור המרה מ-15% ל-20% על 100 לידים בחודש, ועסקה ממוצעת היא ₪2,000 — זה 5 עסקאות נוספות × ₪2,000 = ₪10,000 הכנסה נוספת לחודש = ₪120,000 לשנה.
              </p>
              <p>
                לפרטים על בניית אוטומציה שמגדילה המרות, ראו את <Link to="/solutions/business-automation" className="text-primary hover:underline">פתרון אוטומציה עסקית</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה עלויות שלעתים נשכחות בחישוב ROI?</h2>
              <p>
                חישוב ROI שאינו מכסה את כל העלויות ייצר ציפיות לא ריאליות. הנה עלויות שלעתים נשכחות:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">זמן הכשרת הצוות:</strong> 5-15 שעות לעובד ללמוד לעבוד עם הכלים החדשים = עלות ריאלית.</li>
                <li><strong className="text-foreground">עלויות כלים נוספים:</strong> WhatsApp Business API (₪175-450/חודש), CRM (₪200-800/חודש), ועוד כלים שהאוטומציה דורשת.</li>
                <li><strong className="text-foreground">תחזוקה ועדכונים:</strong> אוטומציות נשברות. ממשקי API משתנים. צריך תקציב לתיקונים שוטפים.</li>
                <li><strong className="text-foreground">זמן אפיון:</strong> 5-10 שעות של זמן ניהולי להגדרת דרישות ובדיקת התוצאות. זה שווה כסף.</li>
                <li><strong className="text-foreground">עלות אי-זמינות:</strong> אוטומציה שנשברת ב"שעת שיא" עלולה לעלות לקוחות. צריך לחשב סיכון זה.</li>
              </ul>
              <p>
                כלל האצבע: הוסיפו 20-25% לאומדן הבסיסי כ"ריפוד" לעלויות אלה. אם ה-ROI עדיין חיובי — כדאי לקדם.
              </p>
              <p>
                לפרטים על ניהול תהליכי אוטומציה מלאים, ראו את <Link to="/solutions/workflow-automation" className="text-primary hover:underline">פתרון אוטומציית תהליכי עבודה</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לחשב ROI לפרויקט אוטומציה ספציפי?</h3>
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

export default AutomationRoiCalculator;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'אילו כלים אוטומציה מרצי קורסים ישתמשו בהם?', answer: 'הכלים הנפוצים: ActiveCampaign או Mailchimp לשיווק מייל אוטומטי, ManyChat לבוט פייסבוק, WhatsApp Business API לתקשורת ישירה, n8n או Make.com לחיבור הכלים, ו-Stripe לניהול תשלומים. ניתן לבנות מערכת מלאה בכ-₪500-2,000 לחודש.' },
  { question: 'כמה עולה אוטומציה לשיווק קורסים?', answer: 'מערכת אוטומציה בסיסית לשיווק קורסים מתחילה מ-₪500-1,500 לחודש לכלים. פרויקט הקמה מלא עם בניית קמפיינים, אימיילים, ובוט — ₪5,000-15,000 חד-פעמי. ה-ROI תלוי במחיר הקורס ובנפח המכירות.' },
  { question: 'האם צריך ידע בשיווק כדי לבנות אוטומציה לקורסים?', answer: 'ידע בסיסי בשיווק דיגיטלי עוזר, אבל לא הכרחי. ספק אוטומציה טוב יבנה עבורכם את הקמפיינים והמסרים. מה שחשוב הוא שתדעו מי הקהל שלכם ומה הערך של הקורס — את השאר ניתן לבנות.' },
  { question: 'מה ה-funnel אוטומטי לקורס אונליין?', answer: 'Funnel אוטומטי קלאסי: מודעה → דף נחיתה (ליד מגנט) → סדרת מיילים אוטומטיים (5-7 מיילים על פני 10 ימים) → הצעת מכר → onboarding לרכישה. כל שלב ניתן לאטמט ולהפעיל 24/7 בלי להיות בפנים.' },
  { question: 'מה אחוזי ההמרה הריאליים לקורס אונליין?', answer: 'אחוזי המרה ממוצעים לקורס אונליין: מבקרי אתר לליד מגנט — 3-8%. מליד לסטודנט — 1-5%. עם אוטומציה וסדרת מיילים טובה, ניתן להגיע ל-3-7% ממודעה לרכישה — גבוה מהממוצע בענף.' },
];

const CourseSalesAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה לחינוך ומכירת קורסים — מהרשמה עד מכירה | EH Automation"
        description="כיצד לבנות מערכת אוטומציה שמוכרת קורסים אונליין 24/7: funnel מלא, סדרת מיילים, בוט WhatsApp, ועלייה של 40-60% בהמרות."
        path="/blog/course-sales-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציה מכירת קורסים', path: '/blog/course-sales-automation' },
      ]} />
      <ArticleSchema
        title="אוטומציה לחינוך ומכירת קורסים — מהרשמה עד מכירה"
        description="כיצד לבנות מערכת אוטומציה שמוכרת קורסים אונליין 24/7: funnel מלא, סדרת מיילים, בוט WhatsApp, ועלייה של 40-60% בהמרות."
        path="/blog/course-sales-automation"
        datePublished="2026-09-08"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">שיווק</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">אוטומציה לחינוך ומכירת קורסים — מהרשמה עד מכירה</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                אוטומציה שיווקית לקורסים אונליין מאפשרת למרצה למכור 24/7 — גם כשהוא ישן, מלמד, או בחופשה. בניית מסלול אוטומטי מלא, מהליד הראשון ועד לרכישה, מגדילה המרות ב-40-60% לעומת שיווק ידני.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">למה רוב מרצי הקורסים לא מרוויחים כמה שהם יכולים?</h2>
              <p>
                שוק הקורסים האונליין בישראל צמח משמעותית בשנים האחרונות. אלפי מרצים, מאמנים, ומומחים יצרו קורסים מצוינים — אבל רובם מרוויחים הרבה פחות ממה שהם יכולים. הסיבה? הם מרוכזים בהוראה אבל לא בשיווק.
              </p>
              <p>
                מרצה ממוצע מבלה 10-20 שעות שבועיות בניסיון לשווק: פוסטים לאינסטגרם, תגובות לתגובות, מיילים ידניים ללקוחות פוטנציאליים. כל זה בלי מסלול ברור שמוביל לרכישה. וכשהוא עסוק בלמד — השיווק נעצר.
              </p>
              <p>
                אוטומציה שיווקית לקורסים פותרת בדיוק את הבעיה הזו: היא בונה מסלול שמוכר אוטומטית, ממשוך ליד ראשוני ועד לרכישה, 24 שעות ביממה. המרצה מקבש ולומד — האוטומציה מוכרת.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מהו Funnel אוטומטי לקורס — 5 שלבים שעובדים?</h2>
              <p>
                Funnel (משפך שיווקי) הוא המסלול שלקוח עובר מ"לא שמע עליך מעולם" ל"שילם ולמד". הנה 5 שלבים של funnel אוטומטי לקורס:
              </p>
              <ol className="list-decimal list-inside space-y-4 pr-4">
                <li>
                  <strong className="text-foreground">מודעה/תוכן — משיכת תשומת לב:</strong>
                  <p className="text-sm mt-1">פוסט אינסטגרם, מודעת פייסבוק, או וידאו TikTok שמפנה לדף נחיתה עם "ליד מגנט" — מדריך חינמי, וובינר, או שיעור ניסיון.</p>
                </li>
                <li>
                  <strong className="text-foreground">ליד מגנט — החלפת מייל בערך:</strong>
                  <p className="text-sm mt-1">הגולש מקבל את המדריך החינמי בתמורה למייל. עכשיו יש לכם את הרשות לשלוח לו תוכן.</p>
                </li>
                <li>
                  <strong className="text-foreground">סדרת מיילים — חימום אוטומטי:</strong>
                  <p className="text-sm mt-1">5-7 מיילים על פני 7-14 ימים. כל מייל מספק ערך (טיפ, סיפור הצלחה, תובנה) ובונה אמון. המייל האחרון — הצעת הקורס.</p>
                </li>
                <li>
                  <strong className="text-foreground">הצעת מכר — הציג את הקורס:</strong>
                  <p className="text-sm mt-1">מייל עם הצעה ברורה: מה כולל הקורס, כמה עולה, עד מתי, ומה ה"הפסד" מאי-רכישה. כולל ספירה לאחור לדחיפות אמיתית.</p>
                </li>
                <li>
                  <strong className="text-foreground">Onboarding — כניסה חלקה לקורס:</strong>
                  <p className="text-sm mt-1">אחרי רכישה — ברוכים הבאים אוטומטי, קישורים לפלטפורמת הלמידה, ותזכורות לשיעורים. סטודנט שמרגיש שמחכים לו — יגמור את הקורס.</p>
                </li>
              </ol>
              <p>
                כל שלב בfunnel הזה ניתן לאטמט לחלוטין. ה-ROI: 40-60% עלייה בהמרות לעומת שיווק ידני.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">WhatsApp ל-קורסים — ערוץ שמשפר המרות ב-40%</h2>
              <p>
                בישראל, WhatsApp הוא ערוץ הייל המלך. שיעורי פתיחה של WhatsApp: 90%+. שיעורי פתיחה של מייל: 20-30%. ההשלכה: תוכן שיווקי שנשלח ב-WhatsApp יגיע ל-3-4 פעמים יותר אנשים מאותו תוכן במייל.
              </p>
              <p>
                כיצד ניתן להשתמש ב-WhatsApp לשיווק קורסים:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li><strong className="text-foreground">קבוצת WhatsApp חינמית:</strong> ליד מגנט בצורת קבוצת WhatsApp עם תוכן יומי. לאחר שנבנה אמון — הצעת הקורס לקבוצה.</li>
                <li><strong className="text-foreground">תזכורות לוובינר:</strong> 24 שעות ושעה לפני הוובינר — תזכורת ב-WhatsApp שמגדילה שיעור הגעה ב-50%.</li>
                <li><strong className="text-foreground">הצעת מכר ישירה:</strong> להשתמש ב-WhatsApp Business API לשליחת הצעה עם קישור לרכישה ישירה.</li>
                <li><strong className="text-foreground">תמיכה בסטודנטים:</strong> בוט שעונה על שאלות נפוצות ומפנה לחומרי הקורס.</li>
              </ul>
              <p>
                לפרטים על הטמעת WhatsApp Business API לשיווק, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">אוטומציה לא רק מוכרת — גם שומרת סטודנטים</h2>
              <p>
                אחד הנתונים הכי מדאיגים בענף הקורסים: 70-80% מהסטודנטים שקנו קורס לא גומרים אותו. זה נראה כמו בעיה של הלקוח — אבל בעצם זו בעיה של ה-onboarding.
              </p>
              <p>
                אוטומציה engagement לסטודנטים פותרת את זה:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>שיעור 1 לא נצפה תוך 48 שעות → תזכורת: "ראינו שעדיין לא התחלת — הנה קישור לשיעור ראשון."</li>
                <li>5 ימים בלי כניסה → "מתגעגעים! השיעור הבא ייקח רק 20 דקות."</li>
                <li>גמר שיעור → "כל הכבוד! הנה תרגיל קצר לחיזוק הנושא."</li>
                <li>גמר הקורס → "ברוכים הבאים למועדון הבוגרים! הנה הצעה לקורס המתקדם."</li>
              </ul>
              <p>
                סטודנטים שמסיימים קורסים — גם קונים יותר קורסים. אוטומציה engagement מגדילה את שיעור הסיום ב-30-50% ואת הרכישות החוזרות ב-25%.
              </p>
              <p>
                לפרטים על בניית אוטומציה שלמה לעסק קורסים, ראו את <Link to="/solutions/business-automation" className="text-primary hover:underline">פתרון האוטומציה העסקית</Link> שלנו.
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים לבנות מערכת שמוכרת קורסים בשבילכם?</h3>
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

export default CourseSalesAutomation;

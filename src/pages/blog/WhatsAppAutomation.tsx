import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'האם צריך WhatsApp Business API לאוטומציה?', answer: 'תלוי בסוג. תגובות אוטומטיות להודעות נכנסות — אפשר גם עם חשבון Business רגיל. שליחת הודעות יזומות (תזכורות, פולו-אפ) — דורש WhatsApp Business API. ה-API מצריך אישור Meta שלוקח 3-7 ימים.' },
  { question: 'כמה עולה WhatsApp Business API?', answer: 'עלות לפי שיחה: ₪0.15-0.50 לשיחה (24 שעות). מי שמאשר שיחה — ישלם פחות. עלות חודשית ממוצעת לעסק עם 200 שיחות: ₪100-300. פלטפורמות השליחה (כמו WATI) עולות ₪150-500 לחודש.' },
  { question: 'האם מותר לשלוח הודעות שיווקיות בוואטסאפ?', answer: 'כן, עם תבניות מאושרות בלבד. הודעות שיווקיות דורשות אישור מ-Meta מראש. לקוחות שסגרו שיחה או לא יזמו — ניתן לפנות אליהם רק עם תבניות. הפרת הכללים עלולה לחסום את המספר.' },
  { question: 'כמה זמן לוקח להקים אוטומציית WhatsApp?', answer: 'אוטומציה בסיסית (מענה לשאלות נפוצות + פולו-אפ): 3-5 ימי עבודה. מערכת מלאה עם CRM, תזכורות ומסעות לקוח: 2-4 שבועות. ההקמה הטכנית מהירה — האתגר הוא בניית התכנים.' },
  { question: 'האם אוטומציית WhatsApp מרגישה ללקוח כמו בוט?', answer: 'תלוי באיכות הכתיבה. אוטומציה טובה כתובה בשפה טבעית, כוללת שם הלקוח, ומגיבה בצורה הגיונית להקשר. לקוחות שמקבלים תגובה רלוונטית תוך שניות — לעתים קרובות לא מחשידים שמדובר באוטומציה.' },
];

const WhatsAppAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי | EH Automation"
        description="מדריך מעשי לאוטומציית WhatsApp לעסקים — אילו הודעות אפשר לאטמט ואילו חייבות להישאר אנושיות."
        path="/blog/whatsapp-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציית WhatsApp', path: '/blog/whatsapp-automation' },
      ]} />
      <ArticleSchema
        title="WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי"
        description="מדריך מעשי לאוטומציית WhatsApp לעסקים — אילו הודעות אפשר לאטמט ואילו חייבות להישאר אנושיות."
        path="/blog/whatsapp-automation"
        datePublished="2026-05-08"
      />
      <FAQSchema items={faqItems} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                WhatsApp הוא הערוץ הכי פעיל לתקשורת עם לקוחות בישראל. אבל לא כל הודעה צריכה לצאת ממך באופן אישי — ולא כל הודעה כדאי לאטמט.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              רוב בעלי העסקים שמגיעים אלי מבינים שהם מבלים שעות ביום על הודעות שחוזרות על עצמן. "מה המחיר?", "אתה זמין ביום שישי?", "איך מגיעים אליך?" — אותן שאלות, עשרות פעמים. הן לא קשות לענות עליהן, אבל הן גוזלות זמן, מפריעות לריכוז, ומצטברות לשעות שלא חזרות. זה בדיוק המקום שבו אוטומציה של WhatsApp עושה את העבודה.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה כדאי לאטמט</h2>
              <p className="mb-4">
                הצעד הראשון הוא תמיד אישור קבלת פנייה. כשמישהו שולח הודעה לעסק ולא מקבל תגובה תוך דקות, הוא מניח שאף אחד לא ראה. אישור אוטומטי קצר — "קיבלנו את פנייתך, נחזור אליך תוך שעה" — משנה את החוויה לחלוטין. הלקוח רגוע, ואתה לא מרגיש לחוץ לענות מיד.
              </p>
              <p className="mb-4">
                מידע שנשאל שוב ושוב הוא מועמד מצוין לאוטומציה. מחירים, שעות פעילות, כתובת, תהליך ההתחלה — אם השאלה חוזרת יותר מפעמיים בשבוע, שווה לבנות תגובה אוטומטית שמכסה אותה. זה לא מרגיש פחות אישי כשהתשובה מדויקת ומהירה.
              </p>
              <p>
                תזכורות לפגישות, פולו-אפ ללידים שלא ענו, ועדכוני סטטוס הזמנה — כל אלה פעולות שאפשר לאטמט לחלוטין. הלקוח מקבל מידע בזמן אמת, ואתה לא צריך לזכור לשלוח.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה כדאי להשאיר אנושי</h2>
              <p className="mb-4">
                שיחת מכירה אמיתית — לקוח שמתלבט, שוקל, ורוצה להרגיש שמקשיבים לו — לא מקבלת תשובה טובה מבוט. ניסיון לאטמט שיחה כזו לרוב מסיים אותה. הלקוח מרגיש שמעבירים אותו ממסך למסך ולא מתייחסים אליו.
              </p>
              <p className="mb-4">
                טיפול בתלונות ובמצבים רגישים חייב להיות אנושי. גם אם התגובה הראשונה היא אוטומטית — "קיבלנו את הפנייה, מישהו יחזור אליך תוך שעה" — הטיפול עצמו צריך לבוא מאדם. לקוח מתוסכל שמקבל תגובת בוט על בעיה רצינית מתוסכל פי שניים.
              </p>
              <p>
                ניהול משא ומתן על מחיר, שיחות שדורשות הקשבה ממשית לצרכי הלקוח, וכל מצב שבו ההקשר חשוב לתשובה — אלה נשארים אצלך. האוטומציה מפנה לך את הזמן כדי שתוכל להיות שם באמת כשצריך.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">איך זה נראה בפועל</h2>
              <p className="mb-4">
                לקוח שולח הודעה → מיד מקבל אישור קבלה ושאלה שפותחת שיחה. אם הוא שואל שאלת מידע — מקבל תשובה אוטומטית מסודרת. אם הוא ליד רציני שרוצה לדבר — ההודעה מגיעה אליך מסודרת עם ההקשר, ואתה ממשיך משם.
              </p>
              <p>
                אחרי פגישה יוצאת תזכורת אוטומטית. אחרי 48 שעות בלי תשובה — פולו-אפ קצר ועניני. כל זה קורה בלי שתצטרך לזכור, לבדוק, או לשלוח ידנית. השינוי המורגש הוא לא רק בחיסכון בזמן — אלא בירידה ברמת הלחץ.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              לפרטים על השירות: <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline font-medium">אוטומציית WhatsApp לעסקים</Link> — כולל דוגמאות, תהליך ועלויות.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על אוטומציית WhatsApp</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה לראות איך זה עובד לעסק שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחה קצרה ואבנה לך תמונה של מה אפשר לאטמט ומה לא.</p>
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

export default WhatsAppAutomation;

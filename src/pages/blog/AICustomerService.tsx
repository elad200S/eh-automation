import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'האם סוכן AI יכול לטפל בתלונות לקוחות?', answer: 'סוכן AI מטפל היטב בתלונות סטנדרטיות — בקשות החזר, שגיאות בהזמנה, שאלות על מדיניות. מקרים מורכבים שדורשים שיקול דעת או אמפתיה גבוהה מועברים אוטומטית לנציג אנושי.' },
  { question: 'כמה עולה סוכן AI לשירות לקוחות?', answer: 'עלות ממוצעת בישראל ב-2026: ₪5,000-15,000 להקמה + ₪500-1,500 לחודש לתחזוקה ושיפור. התמחור תלוי בנפח השיחות ומורכבות הלוגיקה.' },
  { question: 'באילו ערוצים סוכן AI יכול לעבוד?', answer: 'WhatsApp, צ\'אט באתר, מייל, אינסטגרם ופייסבוק מסנג\'ר — הכל מאותה מערכת ניהול מרכזית. ב-2026 רוב הסוכנים תומכים ב-Omnichannel מהקופסה.' },
  { question: 'כמה זמן לוקח ל"לאמן" את הסוכן על העסק שלי?', answer: 'שלב האימון הראשוני לוקח 1-2 שבועות. הסוכן לומד את מדיניות השירות, שאלות נפוצות ותהליכים. לאחר מכן הוא משתפר בהדרגה מכל שיחה.' },
  { question: 'האם הסוכן יכול לגשת למידע אמיתי על הלקוח?', answer: 'כן, כשהסוכן מחובר ל-CRM. הוא רואה היסטוריית הזמנות, סטטוס, העדפות — ומשלב זאת בתשובות. זה יוצר חוויה אישית שמרגישה אנושית.' },
];

const AICustomerService = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לשירות לקוחות — עונה 24/7 בלי לשכור עובד | HEY Digital"
        description="סוכן AI לשירות לקוחות מטפל בפניות, מחזיר תשובות ומסלים מקרים מורכבים — אוטומטית, כל הזמן."
        path="/blog/ai-customer-service"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'סוכן AI לשירות לקוחות', path: '/blog/ai-customer-service' },
      ]} />
      <ArticleSchema
        title="סוכן AI לשירות לקוחות — עונה 24/7 בלי לשכור עובד"
        description="סוכן AI לשירות לקוחות מטפל בפניות, מחזיר תשובות ומסלים מקרים מורכבים — אוטומטית, כל הזמן."
        path="/blog/ai-customer-service"
        datePublished="2026-06-08"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">סוכני AI</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                סוכן AI לשירות לקוחות — עונה 24/7 בלי לשכור עובד
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                80% מהפניות לשירות לקוחות חוזרות על עצמן. סוכן AI מטפל בהן בלי עייפות, בלי שכחה ובלי ימי מחלה — ומשאיר לצוות האנושי רק מה שבאמת דורש אנשים.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              שירות לקוחות הוא הצוואר הבקבוק של רוב העסקים הצומחים. ככל שיותר לקוחות — יותר פניות, יותר שאלות, יותר תלונות. הפתרון הרגיל הוא לשכור עוד אנשים. אבל ב-2026 יש אלטרנטיבה שעובדת: סוכן AI שמטפל בחלק גדול מהפניות בצורה אוטומטית.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה ההבדל בין בוט לסוכן AI?</h2>
              <p className="mb-4">
                בוט רגיל עובד עם תסריטים קבועים — "לחץ 1 לשירות, 2 לתמיכה". סוכן AI מבין שפה טבעית: הלקוח יכול לכתוב "קניתי מוצר לפני שבועיים ורוצה להחזיר אותו, מה עושים?" — והסוכן מבין מה הוא רוצה, בודק מדיניות ההחזרות, ועונה בדיוק.
              </p>
              <p>
                ההבדל המעשי: בוט תוקע אנשים. סוכן AI פותר בעיות. לקוחות שמתעסקים עם בוט מחפשים מסלול מילוט לאדם אמיתי. לקוחות שמתעסקים עם סוכן AI מקבלים תשובות ולא צריכים להמשיך.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">אילו פניות סוכן AI מטפל בהן?</h2>
              <p className="mb-4">
                על פי הניסיון שלנו עם לקוחות, אלה הקטגוריות שמרכיבות 70-80% מהפניות:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>שאלות על מצב הזמנה / סטטוס</li>
                <li>בקשות לשינוי פגישה או ביטול</li>
                <li>שאלות על מחיר, זמינות ותנאי שירות</li>
                <li>תלונות בסיסיות ובקשות החזר</li>
                <li>שאלות טכניות נפוצות על מוצר</li>
              </ul>
              <p>
                את כולן סוכן AI יכול לטפל בצורה מלאה. מה שנשאר לאנשים: מקרים מורכבים, לקוחות VIP ומצבים שדורשים אמפתיה ושיקול דעת.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה הסוכן "לומד" על העסק שלך?</h2>
              <p className="mb-4">
                הסוכן מאומן על מידע שאתה מספק: מדיניות החזרות, שאלות נפוצות, קטלוג מוצרים, נהלי שירות. ככל שיש יותר מידע — הסוכן עונה בצורה מדויקת יותר. בפרקטיקה, לוקח בין שבוע לשבועיים להאמין סוכן עד הנקודה שהוא מטפל בפניות בצורה עצמאית.
              </p>
              <p>
                חשוב: הסוכן לא ממציא תשובות. אם הוא לא יודע — הוא אומר זאת ומעביר לאדם. זה שונה מ-AI "הזוי" שממציא מידע; בסוכן שירות לקוחות מוגדרים גבולות ברורים.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">בערוצים אילו הסוכן עובד?</h2>
              <p>
                WhatsApp הוא הערוץ הדומיננטי בישראל, אבל סוכן AI יכול לעבוד גם בצ'אט באתר, בדוא"ל ובאינסטגרם — הכל מאותו מקום ניהול. ב-2026 רוב הלקוחות מצפים לתגובה מיידית גם בשעה 10 בלילה; סוכן AI הוא הדרך היחידה לתת את זה בלי לבעור.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה להבין איך סוכן AI עובד לפרקטיקה? <Link to="/solutions/ai-agents" className="text-primary hover:underline font-medium">ראו את פתרון סוכני ה-AI שלנו</Link>.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על סוכן AI לשירות לקוחות</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה שסוכן AI יטפל בשירות הלקוחות שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — נבין יחד כמה פניות אפשר לאטמט.</p>
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

export default AICustomerService;

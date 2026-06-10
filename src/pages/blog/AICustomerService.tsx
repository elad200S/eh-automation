import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const AICustomerService = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="סוכן AI לשירות לקוחות — עונה 24/7 בלי לשכור עובד | EH Automation"
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

import { Link } from 'react-router-dom';
import { Zap, Bot, Settings, BookOpen } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const categories = [
  { label: 'אוטומציה', icon: Zap, color: 'bg-primary/10 text-primary' },
  { label: 'סוכני AI', icon: Bot, color: 'bg-secondary/10 text-secondary' },
  { label: 'מערכות עסקיות', icon: Settings, color: 'bg-accent/10 text-accent' },
  { label: 'מדריכים', icon: BookOpen, color: 'bg-primary/10 text-primary' },
];

const articles = [
  {
    title: 'סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים',
    category: 'סוכני AI',
    excerpt: 'סוכן AI לעסק עובד 24/7, חוסך 20-30 שעות שבועיות ומחזיר ROI של 171% בממוצע. מדריך מלא: מה זה, כמה עולה, ואיך מתחילים נכון בישראל.',
    readTime: '10 דקות קריאה',
    href: '/blog/ai-agent-business-guide',
  },
  {
    title: 'אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026',
    category: 'אוטומציה',
    excerpt: '82% מהעסקים הקטנים כבר משתמשים באוטומציה. איך מזהים מה לאטמט קודם, כמה זה עולה בשקלים, ומתי צריך מיישם — מדריך מעשי עם נתונים ממקורות.',
    readTime: '8 דקות קריאה',
    href: '/blog/business-automation-guide-2026',
  },
  {
    title: 'Zapier — כל מה שצריך לדעת לפני שמשתמשים',
    category: 'כלי אוטומציה',
    excerpt: 'Zapier מחבר 7,000+ אפליקציות ומאפשר אוטומציה בלי קוד. מדריך מלא: מה זה Zapier, כמה זה עולה, ומתי כדאי לבחור בו לעסק שלכם.',
    readTime: '10 דקות קריאה',
    href: '/blog/zapier-complete-guide',
  },
  {
    title: 'WhatsApp Business API — מדריך התחלה מלא 2026',
    category: 'אוטומציה',
    excerpt: 'WhatsApp Business API מאפשר שליחת הודעות בקנה מידה גדול, אוטומציה מלאה וחיבור ל-CRM. מחירים, דרישות ומה שונה מאפליקציית WhatsApp רגילה.',
    readTime: '10 דקות קריאה',
    href: '/blog/whatsapp-business-api-guide',
  },
  {
    title: 'אוטומציה לחינוך ומכירת קורסים — מהרשמה ועד מכירה',
    category: 'שיווק',
    excerpt: 'אוטומציה לקורסים מגדילה המרות ב-40-60% ומשפרת השלמת קורסים ב-30-50%. מדריך מלא ממכירה ועד שימור תלמידים.',
    readTime: '10 דקות קריאה',
    href: '/blog/course-sales-automation',
  },
  {
    title: 'ROI של אוטומציה — איך מחשבים כמה חסכת?',
    category: 'מדריכים',
    excerpt: '60% מהארגונים מחזירים את ההשקעה באוטומציה תוך 12 חודשים. מדריך מעשי לחישוב ROI עם נוסחה, דוגמאות ומחשבון להורדה.',
    readTime: '10 דקות קריאה',
    href: '/blog/automation-roi-calculator',
  },
  {
    title: 'אוטומציה לעסק ניהול אירועים — מA עד Z',
    category: 'אוטומציה',
    excerpt: 'מנהל אירועים חוסך 3 שעות ביום עם אוטומציה: תיאום ספקים, תשלומים, תקשורת לקוחות — הכל על אוטופיילוט. מדריך מלא לעסק ניהול אירועים.',
    readTime: '10 דקות קריאה',
    href: '/blog/events-management-automation',
  },
  {
    title: 'איך AI Agent מחליף עובד שלם — בצורה אחראית',
    category: 'סוכני AI',
    excerpt: 'AI Agent עולה ₪650 לחודש לעומת עובד ב-₪7,000-10,000. מדריך לבעלי עסקים: אילו תפקידים AI יכול לבצע, מה הגבולות, וכיצד עושים זאת נכון.',
    readTime: '10 דקות קריאה',
    href: '/blog/ai-agent-replaces-employee',
  },
  {
    title: 'n8n — המדריך המלא לעסקים בישראל 2026',
    category: 'כלי אוטומציה',
    excerpt: 'n8n הוא כלי האוטומציה הגדל הכי מהר בישראל — קוד פתוח, 500+ אינטגרציות, ויכול לפעול בחינם. כל מה שצריך לדעת לפני שמתחילים.',
    readTime: '10 דקות קריאה',
    href: '/blog/n8n-guide-israel',
  },
  {
    title: 'אוטומציה למסעדות — הזמנות, תזכורות ומשובים',
    category: 'אוטומציה',
    excerpt: 'בוט הזמנות שולחן WhatsApp, תזכורות שמורידות no-show ב-40%, ופולו-אפ שמגדיל הזמנות חוזרות ב-27%. המדריך המלא לאוטומציה במסעדות.',
    readTime: '10 דקות קריאה',
    href: '/blog/restaurant-automation',
  },
  {
    title: 'Chatbot לאתר עסקי — כמה זה שווה ב-2026?',
    category: 'סוכני AI',
    excerpt: 'מדריך מחירים ו-ROI לצ\'אטבוט לאתר עסקי: ₪200-20,000+, ROI תוך 3-6 חודשים, ו-40% חיסכון בעלויות שירות לקוחות.',
    readTime: '10 דקות קריאה',
    href: '/blog/website-chatbot-guide',
  },
  {
    title: 'אוטומציה לקליניקות — קביעת תורים בלי מזכירה',
    category: 'אוטומציה',
    excerpt: 'אוטומציה לקליניקה מצמצמת no-show ב-40% ועולה ₪300-1,000 לחודש — שבר ממחיר מזכירה. המדריך המלא לקביעת תורים אוטומטית.',
    readTime: '10 דקות קריאה',
    href: '/blog/clinic-automation',
  },
  {
    title: 'בינה מלאכותית לעסקים קטנים — מאיפה מתחילים?',
    category: 'סוכני AI',
    excerpt: '39% מהעסקים הישראליים כבר משתמשים ב-AI. מדריך מעשי לעסקים קטנים: מה AI עושה, כמה זה עולה, ואיפה להתחיל בלי לבזבז כסף.',
    readTime: '10 דקות קריאה',
    href: '/blog/ai-for-small-business',
  },
  {
    title: 'אוטומציה לנדל"ן — 5 תהליכים שחוסכים שעות בשבוע',
    category: 'אוטומציה',
    excerpt: '40% מהלידים בנדל"ן נאבדים ללא מענה מהיר. גלו 5 תהליכי אוטומציה שמגדילים המרות ב-60% וחוסכים 15-20 שעות שבועיות.',
    readTime: '10 דקות קריאה',
    href: '/blog/real-estate-automation',
  },
  {
    title: 'בוט WhatsApp לעסקים — המדריך המלא 2026',
    category: 'אוטומציה',
    excerpt: 'כל מה שצריך לדעת על בוט WhatsApp לעסקים: איך עובד, מה עולה, מה אפשר לאטמט — ומה לא.',
    readTime: '6 דקות קריאה',
    href: '/blog/whatsapp-bot-guide',
  },
  {
    title: 'Make.com vs Zapier vs n8n — מה מתאים לעסק שלך?',
    category: 'כלי אוטומציה',
    excerpt: 'השוואה מעשית בין שלושת כלי האוטומציה הפופולריים ביותר: מחיר, יכולות וקלות שימוש.',
    readTime: '7 דקות קריאה',
    href: '/blog/automation-tools-comparison',
  },
  {
    title: 'תזכורות פגישות אוטומטיות — איך מורידים no-show ב-60%',
    category: 'אוטומציה',
    excerpt: 'תזכורת פגישה אוטומטית דרך WhatsApp מורידה ביטולים ב-40-60%. כך בונים את זה נכון.',
    readTime: '5 דקות קריאה',
    href: '/blog/appointment-reminder-automation',
  },
  {
    title: 'סוכן AI לשירות לקוחות — עונה 24/7 בלי לשכור עובד',
    category: 'סוכני AI',
    excerpt: '80% מהפניות לשירות לקוחות חוזרות על עצמן. סוכן AI מטפל בהן אוטומטית, כל הזמן.',
    readTime: '6 דקות קריאה',
    href: '/blog/ai-customer-service',
  },
  {
    title: 'CRM + WhatsApp — האינטגרציה שכל עסק ישראלי צריך',
    category: 'מערכות עסקיות',
    excerpt: 'חיבור CRM לWhatsApp מייצר תמונה שלמה על כל לקוח: שיחות, סטטוסים, עסקאות — במקום אחד.',
    readTime: '6 דקות קריאה',
    href: '/blog/crm-whatsapp-integration',
  },
  {
    title: 'אוטומציה שיווקית — מהליד הראשון ועד לסגירה',
    category: 'שיווק',
    excerpt: 'איך לבנות מסע לקוח אוטומטי שמסנן, מחמם וסוגר לידים — בלי לעסוק בכל אחד ידנית.',
    readTime: '7 דקות קריאה',
    href: '/blog/marketing-automation',
  },
  {
    title: '5 תהליכים שכל עסק קטן צריך לאטמט היום',
    category: 'אוטומציה',
    excerpt: 'סקירה של התהליכים העסקיים הנפוצים ביותר שבהם אוטומציה יכולה לחסוך עשרות שעות בשבוע.',
    readTime: '5 דקות קריאה',
    href: '/blog/5-automation-processes',
  },
  {
    title: 'סוכן AI לעסק: מתי זה שווה ומתי לא',
    category: 'סוכני AI',
    excerpt: 'מדריך מעשי שעוזר לבעלי עסקים להבין אם סוכן AI מתאים לעסק שלהם – ומה הציפיות הריאליות.',
    readTime: '7 דקות קריאה',
    href: '/blog/ai-agent-for-business',
  },
  {
    title: 'איך לבחור CRM שבאמת ישתמשו בו',
    category: 'מערכות עסקיות',
    excerpt: 'הבעיה לא הכלי – הבעיה היא ההטמעה. טיפים מעשיים לבחירת CRM שהצוות שלך באמת ישתמש בו.',
    readTime: '6 דקות קריאה',
    href: '/blog/how-to-choose-crm',
  },
  {
    title: 'WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי',
    category: 'אוטומציה',
    excerpt: 'הערוץ הכי פעיל בישראל — אבל לא כל הודעה צריכה לצאת ממך אישית. מה כדאי לאטמט ומה לא.',
    readTime: '6 דקות קריאה',
    href: '/blog/whatsapp-automation',
  },
  {
    title: 'למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר',
    category: 'אוטומציה',
    excerpt: 'רוב הלידים לא נעלמים כי הם לא מתאימים — הם נעלמים כי אף אחד לא חזר אליהם בזמן.',
    readTime: '5 דקות קריאה',
    href: '/blog/lead-follow-up',
  },
];

const Blog = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="בלוג אוטומציה עסקית | HEY Digital"
        description="מאמרים, מדריכים וטיפים על אוטומציה עסקית, סוכני AI, מערכות CRM ותהליכי עבודה חכמים."
        path="/blog"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
      ]} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">בלוג</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">תובנות על אוטומציה ובינה מלאכותית</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                מאמרים מעשיים, מדריכים וטיפים שיעזרו לך להבין איך אוטומציה ו-AI יכולים לשנות את העסק שלך.
              </p>
            </div>
          </div>
        </section>

        <Section id="categories">
          <div className="max-w-4xl">
            <h2 className="text-xl font-semibold text-foreground mb-6">קטגוריות</h2>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card cursor-default">
                  <cat.icon className={`w-4 h-4 ${cat.color.split(' ')[1]}`} />
                  <span className="text-sm font-medium text-foreground">{cat.label}</span>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-6">מאמרים אחרונים</h2>
            <div className="space-y-6">
              {articles.map((article, index) => (
                <Link key={index} to={article.href}>
                  <article className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">{article.category}</span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                    <p className="text-xs text-primary font-medium mt-4">קראו עוד ←</p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Cross-links */}
            <nav aria-label="קישורים קשורים" className="mt-12 p-8 bg-muted/30 rounded-xl border border-border">
              <p className="text-muted-foreground mb-4">מאמרים חדשים מתווספים באופן שוטף.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/solutions" className="text-sm text-primary hover:underline">ראו את הפתרונות שלנו →</Link>
                <button onClick={openPopup} className="text-sm text-primary hover:underline">שאלו אותנו ישירות →</button>
              </div>
            </nav>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
};

export default Blog;

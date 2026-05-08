import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const canAutomate = [
  'הודעת אישור קבלת פנייה — מיד כשמישהו כותב, הוא מקבל תגובה אוטומטית',
  'שליחת פרטים שנשאלים כל הזמן: מחיר, מיקום, שעות פעילות',
  'איסוף מידע בסיסי לפני שיחה — שם, סוג הצורך, מספר טלפון',
  'תזכורות לפגישות ומעקב אחרי לידים שלא ענו',
  'עדכון סטטוס הזמנה או שירות ללקוח קיים',
];

const keepHuman = [
  'שיחת מכירה אמיתית — לקוח שמתלבט צריך אדם, לא בוט',
  'טיפול בתלונות ובמצבים רגישים',
  'ניהול משא ומתן על מחיר',
  'שיחות שדורשות הקשבה אמיתית לצרכי הלקוח',
];

const WhatsAppAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי | EH Automation"
        description="מדריך מעשי לאוטומציית WhatsApp לעסקים — אילו הודעות אפשר לאטמט ואילו חייבות להישאר אנושיות."
        path="/blog/whatsapp-automation"
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

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">אוטומציה</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />6 דקות קריאה</span>
              </div>
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
          <div className="max-w-3xl">

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              רוב בעלי העסקים שמגיעים אלי מבינים שהם מבלים שעות ביום על הודעות שחוזרות על עצמן. "מה המחיר?", "אתה זמין ביום שישי?", "איך מגיעים אליך?" — אותן שאלות, עשרות פעמים. זה בדיוק המקום שבו אוטומציה של WhatsApp עושה את העבודה.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-6">מה כדאי לאטמט</h2>
            <div className="space-y-3 mb-10">
              {canAutomate.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6">מה כדאי להשאיר אנושי</h2>
            <div className="space-y-3 mb-10">
              {keepHuman.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">איך זה נראה בפועל</h2>
            <div className="p-6 bg-card rounded-xl border border-border mb-10">
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>• לקוח שולח הודעה → <strong className="text-foreground">אישור קבלה אוטומטי + שאלת כוונות</strong></li>
                <li>• הלקוח עונה → <strong className="text-foreground">המערכת מסננת: ליד רציני עובר אליך, שאלת מידע מקבלת תשובה אוטומטית</strong></li>
                <li>• אחרי פגישה → <strong className="text-foreground">תזכורת אוטומטית יוצאת בלי שתזכור</strong></li>
                <li>• לאחר 48 שעות בלי תשובה → <strong className="text-foreground">פולו-אפ אוטומטי קצר ועניני</strong></li>
              </ul>
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

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const CRMWhatsAppIntegration = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="CRM + WhatsApp — האינטגרציה שכל עסק ישראלי צריך ב-2026 | EH Automation"
        description="חיבור CRM ל-WhatsApp מייצר תמונה אחת על כל לקוח: שיחות, סטטוסים, עסקאות — הכל במקום אחד."
        path="/blog/crm-whatsapp-integration"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'CRM + WhatsApp אינטגרציה', path: '/blog/crm-whatsapp-integration' },
      ]} />
      <ArticleSchema
        title="CRM + WhatsApp — האינטגרציה שכל עסק ישראלי צריך ב-2026"
        description="חיבור CRM ל-WhatsApp מייצר תמונה אחת על כל לקוח: שיחות, סטטוסים, עסקאות — הכל במקום אחד."
        path="/blog/crm-whatsapp-integration"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">מערכות עסקיות</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                CRM + WhatsApp — האינטגרציה שכל עסק ישראלי צריך ב-2026
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ישראל היא מדינת WhatsApp. 78% מהעסקים משתמשים ב-CRM. אבל רוב העסקים מנהלים אותם בנפרד — ומפספסים את כל הערך שביניהם.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              הסיטואציה הנפוצה שאנחנו רואים: מנהל מכירות פותח את ה-CRM, רואה לקוח — אבל כל ההיסטוריה של השיחה איתו נמצאת בווטסאפ על הטלפון שלו, לא בCRM. אם הוא חולה, אף אחד לא יכול להמשיך מאיפה שהפסיק. זה לא ניהול מידע — זה ניהול שאלה.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה אינטגרציה של CRM + WhatsApp בעצם עושה?</h2>
              <p className="mb-4">
                כשהשניים מחוברים, כל הודעת WhatsApp שנשלחת ללקוח — או מתקבלת ממנו — מתועדת אוטומטית בCRM. בנוסף, פעולות בCRM יכולות לשלוח הודעות WhatsApp: לקוח עבר לשלב "הצעת מחיר נשלחה"? WhatsApp יוצא מיד. לקוח שלא ענה 3 ימים? פולו-אפ אוטומטי.
              </p>
              <p>
                התוצאה: תמונה שלמה של כל לקוח במקום אחד, ותהליכי מכירה שממשיכים לרוץ אפילו כשאף אחד לא זוכר לעקוב.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5 דברים שאפשר לאטמט עם האינטגרציה הזו</h2>
              <ul className="list-disc list-inside space-y-3 mb-4">
                <li><strong className="text-foreground">ברכת לקוח חדש</strong> — ליד נפתח בCRM = הודעת WhatsApp יוצאת תוך שניות</li>
                <li><strong className="text-foreground">עדכון סטטוס</strong> — הזמנה בוצעה / נשלחה / אושרה — הלקוח מקבל עדכון אוטומטי</li>
                <li><strong className="text-foreground">פולו-אפ על עסקאות תקועות</strong> — עסקה לא זזה 5 ימים = הודעה יוצאת אוטומטית</li>
                <li><strong className="text-foreground">תזכורת לפגישה</strong> — כמה שעות לפני הפגישה, WhatsApp יוצא לבד</li>
                <li><strong className="text-foreground">בקשת ביקורת</strong> — עסקה נסגרה = בקשת Google Review אוטומטית</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">אילו CRM תומכים בחיבור ל-WhatsApp?</h2>
              <p className="mb-4">
                בישראל, ה-CRM הנפוצים שמחברים לWhatsApp הם: HubSpot, Monday CRM, Pipedrive ו-Base44 (פופולרי מאוד בשוק הישראלי). החיבור נעשה דרך WhatsApp Business API ומערכת אוטומציה כמו Make.com או n8n שמחברת בין השניים.
              </p>
              <p>
                חשוב: לא כל CRM תומך בחיבור ישיר. לפעמים צריך שכבת אוטומציה בינים שמתרגמת בין מה שה-CRM שולח לפורמט שWhatsApp API מקבל.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">כמה זמן לוקח להקים?</h2>
              <p>
                אינטגרציה בסיסית — חיבור שמתעד שיחות WhatsApp ב-CRM ושולח הודעות אוטומטיות — אפשר להקים תוך 3-5 ימי עבודה. אינטגרציה מלאה עם לוגיקה מורכבת, סגמנטציה ומסעות לקוח אוטומטיים — 2-4 שבועות. ברוב המקרים, ה-ROI על ההשקעה הזו מגיע תוך החודש הראשון.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות כיצד CRM + WhatsApp נראה בפועל? <Link to="/solutions/crm-automation" className="text-primary hover:underline font-medium">ראו את פתרון אוטומציית ה-CRM שלנו</Link>.
            </p>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה לחבר את ה-CRM שלך לWhatsApp?</h3>
              <p className="text-sm text-muted-foreground mb-6">נבדוק יחד מה ה-CRM שלך תומך ונבנה את האינטגרציה הנכונה.</p>
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

export default CRMWhatsAppIntegration;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה אחוז מהביטולים אפשר למנוע עם תזכורות אוטומטיות?', answer: 'מחקרים רפואיים ועסקיים עקביים מראים ירידה של 40-60% בשיעור ה-no-show עם תזכורות אוטומטיות. ההפחתה הגבוהה ביותר נרשמת כשמשלבים תזכורת 48 שעות + 24 שעות + 2 שעות לפני הפגישה.' },
  { question: 'באיזה ערוץ הכי טוב לשלוח תזכורת פגישה?', answer: 'WhatsApp הוא הערוץ הכי אפקטיבי בישראל — שיעורי פתיחה של 95-98% לעומת מייל שנע בין 20-30%. תזכורת WhatsApp 24 שעות לפני הפגישה היא הצעד הבודד שמוריד הכי הרבה no-show.' },
  { question: 'האם צריך WhatsApp Business API לתזכורות אוטומטיות?', answer: 'כן. תזכורות פרואקטיביות (שיוצאות מהעסק ללקוח בלי שהלקוח שאל) דורשות WhatsApp Business API. אישור API לוקח 3-7 ימי עבודה.' },
  { question: 'האם אפשר לתת ללקוח לבטל פגישה דרך WhatsApp?', answer: 'כן, וזה אחד היתרונות הגדולים. הלקוח מקבל בתזכורת לינק לביטול או שינוי מועד. אם הוא מבטל — החריץ נפתח אוטומטית לשאר הלקוחות.' },
  { question: 'האם המערכת מתחברת ליומן Google?', answer: 'כן. רוב מערכות התזכורת האוטומטית מתחברות ל-Google Calendar, Outlook ו-Calendly. הפגישה נרשמת ביומן ומשם המערכת יודעת מתי לשלוח.' },
];

const AppointmentReminderAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="תזכורות פגישות אוטומטיות — איך מורידים no-show ב-60% | EH Automation"
        description="תזכורת פגישה אוטומטית דרך WhatsApp מורידה ביטולי פגישות ב-40-60%. הנה איך עסקים בונים את זה."
        path="/blog/appointment-reminder-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'תזכורות פגישות אוטומטיות', path: '/blog/appointment-reminder-automation' },
      ]} />
      <ArticleSchema
        title="תזכורות פגישות אוטומטיות — איך מורידים no-show ב-60%"
        description="תזכורת פגישה אוטומטית דרך WhatsApp מורידה ביטולי פגישות ב-40-60%. הנה איך עסקים בונים את זה."
        path="/blog/appointment-reminder-automation"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                תזכורות פגישות אוטומטיות — איך מורידים no-show ב-60%
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                פגישה שלא מגיעה אליה אף אחד שווה ריק ביומן, אובדן הכנסה וניסיון ליצור קשר בלחץ. רוב ה-no-show האלה ניתן למנוע בקלות.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              מחקרים רפואיים עקביים מראים שתזכורות אוטומטיות מורידות no-show ב-40 עד 60 אחוז. זה לא נתון שמגיע רק מקליניקות — עסקים בתחומי ייעוץ, יופי, נדל"ן וכל מקצוע שמנהל יומן פגישות מדווחים על אותה תמונה. הבעיה היא שרוב בעלי העסקים עדיין עושים את זה ידנית או לא עושים בכלל.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">למה לקוחות לא מגיעים?</h2>
              <p className="mb-4">
                שכחה היא הסיבה מספר אחת. לא כוונה רעה, לא חוסר עניין — פשוט לקוח שקבע פגישה שלושה שבועות מראש ופשוט שכח. הסיבה השנייה היא שינוי בסדר יום שהלקוח לא הספיק לדווח עליו — כי לא היה לו ממי לפחד ולא היה ממי לבקש לשנות.
              </p>
              <p>
                תזכורת אוטומטית פותרת את שתי הבעיות: מזכירה ומאפשרת ביטול מראש, כך שאפשר למלא את החלק הריק ביומן.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">איך נראית מערכת תזכורות אוטומטית?</h2>
              <p className="mb-4">
                התהליך שעובד הכי טוב בישראל, בהתבסס על מה שאנחנו בונים ללקוחות, הוא שלוש נקודות מגע:
              </p>
              <ul className="list-disc list-inside space-y-3 mb-4">
                <li><strong className="text-foreground">48 שעות לפני</strong> — הודעת WhatsApp עם פרטי הפגישה ואפשרות לאשר או לבטל</li>
                <li><strong className="text-foreground">24 שעות לפני</strong> — אם לא אושר, תזכורת נוספת עם לינק לשינוי מועד</li>
                <li><strong className="text-foreground">2 שעות לפני</strong> — תזכורת קצרה עם כתובת / לינק לפגישה זום</li>
              </ul>
              <p>
                כל אחת מהנקודות האלה מחוברת ל-CRM וליומן. אם לקוח מבטל — חריץ פנוי מוצג אוטומטית ללקוחות אחרים שביקשו להיכנס לרשימת המתנה.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">אילו עסקים מרוויחים הכי הרבה?</h2>
              <p className="mb-4">
                כל עסק שמנהל יומן פגישות — אבל המובילים הם:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>קליניקות ורופאים — כל פגישה שלא מגיעה שווה ₪200-800</li>
                <li>יועצים ומאמנים — no-show אחד בשבוע שווה אלפי שקלים בשנה</li>
                <li>מטפלים ושירותי יופי — יומן מלא = הכנסה יציבה</li>
                <li>תיווך נדל"ן — ביקורי נכסים שלא מגיעים עולים בזמן ודלק</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה צריך כדי להקים את זה?</h2>
              <p className="mb-4">
                שלושה דברים: מערכת ניהול יומן (Calendly, Google Calendar, או CRM עם יומן), WhatsApp Business API, ומערכת אוטומציה שמחברת ביניהם. זה נשמע מורכב, אבל בפועל זה תהליך של כמה ימי עבודה ואחרי זה רץ לבד.
              </p>
              <p>
                חשוב: זה לא בוט ווטסאפ רגיל. זה מחייב WhatsApp Business API — שמצריך אישור מ-Meta. התהליך לוקח כמה ימים אבל הוא שווה את זה. ההבדל בין חשבון עסקי רגיל ל-API הוא שה-API שולח הודעות פרואקטיביות, לא רק עונה.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות איך בונים מערכת כזו? <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline font-medium">ראו את פתרון אוטומציית WhatsApp שלנו</Link>.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על תזכורות פגישה אוטומטיות</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">כמה no-show אתה מפסיד בחודש?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ קצרה — נחשב יחד כמה אוטומציה כזו שווה לעסק שלך.</p>
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

export default AppointmentReminderAutomation;

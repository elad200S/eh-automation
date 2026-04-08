import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const processes = [
  {
    title: 'מענה על לידים נכנסים',
    description: 'כל ליד שמגיע מהאתר, מפייסבוק או מווטסאפ — מקבל מענה אוטומטי תוך שניות. לא צריך להיות ליד הטלפון 24/7.',
    saving: 'חיסכון: 2–4 שעות שבועיות',
  },
  {
    title: 'שליחת הצעות מחיר',
    description: 'הלקוח ממלא פרטים → הצעת המחיר נוצרת ונשלחת אוטומטית. PDF מוכן תוך דקות, בלי לגעת בקובץ.',
    saving: 'חיסכון: 3–5 שעות שבועיות',
  },
  {
    title: 'מעקב אחרי לקוחות',
    description: 'תזכורות אוטומטיות ללקוחות שלא הגיבו, אחרי 24 שעות, 3 ימים, שבוע. בלי לשכוח אף אחד.',
    saving: 'חיסכון: 1–2 שעות שבועיות',
  },
  {
    title: 'דוחות ועדכוני סטטוס',
    description: 'בסוף כל שבוע — דוח עם כל הלידים, הסטטוסים, ההכנסות. ישר לווטסאפ או לאימייל, בלי להכין ידנית.',
    saving: 'חיסכון: 1–3 שעות שבועיות',
  },
  {
    title: 'ניהול תורים ופגישות',
    description: 'הלקוח בוחר זמן → הפגישה נרשמת ביומן → הוא מקבל תזכורת יום לפני. אפס עיסוק מצדך.',
    saving: 'חיסכון: 2–3 שעות שבועיות',
  },
];

const AutomationProcesses = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="5 תהליכים שכל עסק קטן צריך לאטמט היום | EH Automation"
        description="סקירה של התהליכים העסקיים הנפוצים ביותר שבהם אוטומציה יכולה לחסוך עשרות שעות בשבוע."
        path="/blog/5-automation-processes"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: '5 תהליכים לאוטומציה', path: '/blog/5-automation-processes' },
      ]} />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">אוטומציה</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />5 דקות קריאה</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                5 תהליכים שכל עסק קטן צריך לאטמט היום
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב בעלי העסקים מבזבזים בין 10 ל-20 שעות בשבוע על דברים שאפשר לעשות לגמרי אוטומטית — בלי קוד, בלי מתכנת, בלי תקציב גדול.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl">

            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              אוטומציה לא חייבת להיות מורכבת. ברוב העסקים הקטנים, 5 תהליכים פשוטים יכולים לשחרר עשרות שעות בשבוע — שעות שאפשר להשקיע בלקוחות, בצמיחה, או פשוט בנשימה. הנה 5 התהליכים שכדאי להתחיל איתם.
            </p>

            <div className="space-y-6 mb-12">
              {processes.map((p, i) => (
                <div key={i} className="p-6 bg-card rounded-xl border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-2">{p.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.description}</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-medium text-green-600">{p.saving}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20 mb-12">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">מאיפה מתחילים?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    לא צריך לאטמט הכל בבת אחת. תבחרו תהליך אחד שגוזל לכם הכי הרבה זמן, ותתחילו משם. בדרך כלל תוך שבוע–שבועיים רואים חיסכון ממשי — ואז ממשיכים.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה לדעת מה אפשר לאטמט אצלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת אסטרטגיה קצרה — בלי עלות, בלי מחויבות.</p>
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

export default AutomationProcesses;

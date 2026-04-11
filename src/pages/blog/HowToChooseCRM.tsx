import { Link } from 'react-router-dom';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const mistakes = [
  {
    mistake: 'בוחרים לפי תכונות, לא לפי שימוש',
    explanation: 'CRM עם 200 פיצ\'רים שנמצא בשימוש רק בגלל הפיצ\'ר הראשון — זה בזבוז. בחרו מה שהצוות ישתמש בו ביום-יום.',
  },
  {
    mistake: 'לא מערבים את הצוות בהחלטה',
    explanation: 'אם המוכרים לא רצו בזה — הם לא ישתמשו בזה. שאלו מה מפריע להם כרגע, ואז בחרו פתרון.',
  },
  {
    mistake: 'מצפים שהמערכת תפתור בעיות תהליך',
    explanation: 'CRM לא מתקן תהליך שבור — הוא מעצים תהליך שעובד. קודם בנו את התהליך, אחר כך הכניסו אותו למערכת.',
  },
];

const questions = [
  'כמה אנשים ישתמשו ביום-יום?',
  'מה הפעולה הכי חשובה שאנחנו רוצים לעקוב אחריה?',
  'האם אנחנו צריכים חיבור לכלים אחרים (ווטסאפ, אימייל, טפסים)?',
  'מי יהיה אחראי על תחזוקת הנתונים?',
  'כמה אנחנו מוכנים להשקיע בחודש?',
];

const HowToChooseCRM = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="איך לבחור CRM שבאמת ישתמשו בו | EH Automation"
        description="הבעיה לא הכלי – הבעיה היא ההטמעה. טיפים מעשיים לבחירת CRM שהצוות שלך באמת ישתמש בו."
        path="/blog/how-to-choose-crm"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'איך לבחור CRM', path: '/blog/how-to-choose-crm' },
      ]} />
      <ArticleSchema
        title="איך לבחור CRM שבאמת ישתמשו בו"
        description="הבעיה לא הכלי – הבעיה היא ההטמעה. טיפים מעשיים לבחירת CRM שהצוות שלך באמת ישתמש בו."
        path="/blog/how-to-choose-crm"
        datePublished="2026-04-08"
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
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">מערכות עסקיות</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />6 דקות קריאה</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                איך לבחור CRM שבאמת ישתמשו בו
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                הבעיה לא הכלי. עסקים רבים קנו CRM מצוין — ואחרי שלושה חודשים הוא עלה אבק. הנה למה זה קורה ואיך להימנע מזה.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl">

            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              CRM הוא אחד הכלים הכי חשובים שעסק יכול לאמץ — ואחד הכי מבוזבזים. לא בגלל שהמערכות גרועות, אלא בגלל שאנשים בוחרים לא נכון ולא מטמיעים נכון. הנה איך לעשות את זה אחרת.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-6">3 הטעויות הנפוצות</h2>
            <div className="space-y-4 mb-12">
              {mistakes.map((m, i) => (
                <div key={i} className="p-5 bg-card rounded-xl border border-border">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{m.mistake}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6">5 שאלות לפני שבוחרים</h2>
            <div className="space-y-3 mb-12">
              {questions.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-muted/40 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-foreground leading-relaxed">{q}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">מה אנחנו ממליצים</h2>
            <div className="p-6 bg-card rounded-xl border border-border mb-10">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                לרוב העסקים הקטנים והבינוניים, CRM פשוט שמחובר לווטסאפ, לטפסים ולאוטומציות — שווה יותר מ-CRM מורכב שאף אחד לא פותח.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                הגדרת הצלחה פשוטה: <strong className="text-foreground">האם הצוות פותח את המערכת בלי שמאלצים אותו?</strong> אם כן — בחרתם נכון.
              </p>
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה עזרה לבחור CRM לעסק שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחה קצרה — ואמליץ על מה שמתאים לגודל ולסגנון של העסק שלך.</p>
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

export default HowToChooseCRM;

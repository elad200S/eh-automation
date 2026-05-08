import { Link } from 'react-router-dom';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const mistakes = [
  {
    title: 'פולו-אפ אחד ואז ויתור',
    desc: 'רוב העסקים שולחים הודעה אחת. אם לא ענו — נגמר. אבל המחקרים מראים שרוב הסגירות קורות אחרי 3-5 נגיעות.',
  },
  {
    title: 'עיכוב בחזרה לליד',
    desc: 'ליד שמילא טופס ומחכה שעה לתשובה — כבר קורא הצעה של מתחרה. הזמן הקריטי הוא דקות, לא שעות.',
  },
  {
    title: 'פולו-אפ ידני שתלוי בזיכרון',
    desc: 'כשאתה עמוס, הלידים נופלים בין הכיסאות. לא כי לא אכפת לך — אלא כי אין מערכת שמזכירה לך.',
  },
];

const sequence = [
  { time: 'מיד בקבלת הפנייה', action: 'אישור קבלה + שאלה פותחת שיחה' },
  { time: 'אחרי 24 שעות בלי תשובה', action: 'הודעת המשך קצרה ועניינית' },
  { time: 'אחרי 3 ימים', action: 'הצעת ערך נוספת — טיפ, שאלה, או תוכן רלוונטי' },
  { time: 'אחרי שבוע', action: 'שאלה ישירה: "עדיין רלוונטי?" — בלי לחץ' },
];

const LeadFollowUp = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר | EH Automation"
        description="הסיבה האמיתית שלידים נעלמים — וסדר פעולות פשוט שעוזר לסגור יותר, בלי מאמץ נוסף."
        path="/blog/lead-follow-up"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'פולו-אפ אוטומטי', path: '/blog/lead-follow-up' },
      ]} />
      <ArticleSchema
        title="למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר"
        description="הסיבה האמיתית שלידים נעלמים — וסדר פעולות פשוט שעוזר לסגור יותר, בלי מאמץ נוסף."
        path="/blog/lead-follow-up"
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
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />5 דקות קריאה</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב הלידים לא נעלמים כי הם לא מתאימים — הם נעלמים כי אף אחד לא חזר אליהם בזמן. זה בעיה שיש לה פתרון פשוט.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl">

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              אתה מוציא כסף על פרסום, מקבל פניות, ואז חלק גדול מהן פשוט נעלם. הליד לא ענה, אתה עמוס, ועברת הלאה. אחרי שבוע — כבר מאוחר מדי. זה לא בעיה של מכירות, זה בעיה של תזמון ומעקב.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-6">3 טעויות נפוצות שגורמות ללידים להיעלם</h2>
            <div className="space-y-4 mb-10">
              {mistakes.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">סדר פעולות שעובד</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              אוטומציה של פולו-אפ לא אומרת הודעות קרות וגנריות. אומרת שיש רצף מתוכנן שיוצא בזמן הנכון, בלי שתצטרך לזכור.
            </p>
            <div className="space-y-3 mb-10">
              {sequence.map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{step.time}</p>
                    <p className="text-sm font-medium text-foreground">{step.action}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-card rounded-xl border border-border mb-10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">חשוב:</strong> הרצף הזה לא צריך להיות זהה לכל ליד. עסקים שמפלחים לפי מקור הפנייה (אתר, ווטסאפ, רשתות חברתיות) ומתאימים את ההודעות — רואים שיפור משמעותי בשיעור ההיענות.
              </p>
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה לבנות רצף פולו-אפ לעסק שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">נסתכל יחד על מאיפה מגיעים הלידים שלך ואיך לא לאבד אף אחד מהם.</p>
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

export default LeadFollowUp;

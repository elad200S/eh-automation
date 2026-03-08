import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import eladHeadshot from '@/assets/elad-headshot.png';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const values = [
  {
    title: 'בנייה, לא מכירה',
    description: 'אנחנו לא מוכרים חלומות. אנחנו בונים מערכות שעובדות. כל פרויקט מתחיל מאפיון מדויק ומסתיים במערכת שאפשר למדוד.',
  },
  {
    title: 'פשטות לפני מורכבות',
    description: 'הפתרון הטוב ביותר הוא הפשוט ביותר שעובד. אנחנו לא מוסיפים שכבות מיותרות – רק מה שהעסק באמת צריך.',
  },
  {
    title: 'שקיפות מלאה',
    description: 'אתם יודעים מה נבנה, למה, ובכמה. אין הפתעות, אין עלויות נסתרות, אין הבטחות שלא ניתן לעמוד בהן.',
  },
  {
    title: 'תוצאות מדידות',
    description: 'כל מערכת שאנחנו בונים צריכה להראות תוצאות. אם זה לא חוסך זמן או כסף – משהו לא עובד.',
  },
];

const highlights = [
  'מתמחה באוטומציה עסקית ובינה מלאכותית',
  'עובד עם עסקים B2B, סוכנויות ויועצים',
  'מתמקד בבניית מערכות שעובדות לאורך זמן',
  'מלווה מאפיון ועד הטמעה בבהירות מלאה',
  'בונה פתרונות מותאמים, לא תבניות גנריות',
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>אודות | EH Automation</title>
        <meta name="description" content="הכירו את EH Automation – סטודיו לאוטומציה עסקית ובינה מלאכותית שעוזר לעסקים לצמוח חכם יותר." />
        <html lang="he" dir="rtl" />
      </Helmet>

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">אודות</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                סטודיו לאוטומציה עסקית ובינה מלאכותית
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EH Automation הוא סטודיו בוטיק שעוזר לעסקים קטנים, סוכנויות ויועצים לבנות תשתית טכנולוגית חכמה שמחליפה תהליכים ידניים במערכות אוטומטיות.
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <Section id="founder">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-1">
                <p className="text-sm font-medium text-primary mb-2">המייסד</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                  אלעד חנינה
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  פועל בעולמות ה-B2B ועוזר לעסקים לבנות תשתית אוטומטית יציבה.
                  הגישה פשוטה: לבנות אוטומציות חכמות שמחליפות תהליכים ידניים,
                  חוסכות זמן וכסף, ומורידות מהעסק את הפעולות שהוא לא צריך להתעסק בהן.
                </p>
                <ul className="space-y-3">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-2">
                <div className="relative">
                  <div className="aspect-square max-w-[320px] mx-auto rounded-2xl bg-muted border border-border overflow-hidden shadow-lg">
                    <img src={eladHeadshot} alt="אלעד חנינה - EH Automation" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl border border-primary/20 -z-10" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section id="values" className="bg-muted/30">
          <div className="max-w-4xl">
            <p className="text-sm font-medium text-primary mb-2">הגישה שלנו</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-10">עקרונות עבודה</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="p-6 bg-card rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <span className="font-mono text-sm font-bold text-primary">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-background to-primary-light/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">מוכנים לדבר?</h2>
            <p className="text-muted-foreground mb-8">שיחת אפיון ראשונית ללא עלות. נבין מה העסק צריך ונראה אם אנחנו הכתובת הנכונה.</p>
            <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-[#3b82f6] via-[#2563eb] to-[#1e40af] text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all">
              שיחת אסטרטגיה
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default About;

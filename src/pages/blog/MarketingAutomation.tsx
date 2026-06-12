import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'מה זה אוטומציה שיווקית ולמה היא חשובה?', answer: 'אוטומציה שיווקית היא מערכת שמטפלת בתקשורת עם לקוחות פוטנציאליים — שליחת הודעות, מיון לידים ופולו-אפ — בצורה אוטומטית. היא חשובה כי מגדילה את מספר הלידים שמגיעים לסגירה בלי להגדיל את עלויות כוח האדם.' },
  { question: 'מה זה Lead Scoring?', answer: 'Lead Scoring הוא מדד שמשייך ניקוד ללידים לפי פעולותיהם. ביקור באתר, פתיחת מייל, לחיצה על קישור — כל אחד מוסיף נקודות. כשליד מגיע לסף מסוים, הוא מסומן כ"חם" ומועבר לטיפול אנושי.' },
  { question: 'כמה זמן לוקח לבנות מסע לקוח אוטומטי?', answer: 'מסע בסיסי (ליד → מענה → פולו-אפ → פגישה) אפשר לבנות תוך שבוע-שבועיים. מסע מלא עם סגמנטציה, Lead Scoring ומסעות מרובים — חודש-חודשיים.' },
  { question: 'האם אוטומציה שיווקית מתאימה לעסק קטן?', answer: 'בהחלט. עסק עם 10-50 לידים בחודש יכול להרוויח מאוד מאוטומציה: פחות שכחה, יותר מענה מהיר, ופולו-אפ שיטתי. אין סף כניסה — אפילו תהליך אחד אוטומטי מייצר ערך מיידי.' },
  { question: 'מה ההבדל בין אוטומציה שיווקית ל-CRM?', answer: 'CRM מנהל את המידע על הלקוחות (כרטיסים, היסטוריה, עסקאות). אוטומציה שיווקית היא השכבה שפועלת — שולחת הודעות, עוקבת אחרי פעולות ומחליטה מה לעשות הלאה. בפועל, השניים עובדים יחד.' },
];

const MarketingAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה שיווקית — מהליד הראשון ועד לסגירה | EH Automation"
        description="אוטומציה שיווקית לעסקים: איך לבנות מסע לקוח אוטומטי שמסנן, מחמם וסוגר לידים — בלי לעסוק בכל אחד ידנית."
        path="/blog/marketing-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציה שיווקית', path: '/blog/marketing-automation' },
      ]} />
      <ArticleSchema
        title="אוטומציה שיווקית — מהליד הראשון ועד לסגירה"
        description="אוטומציה שיווקית לעסקים: איך לבנות מסע לקוח אוטומטי שמסנן, מחמם וסוגר לידים — בלי לעסוק בכל אחד ידנית."
        path="/blog/marketing-automation"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">שיווק</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                אוטומציה שיווקית — מהליד הראשון ועד לסגירה
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב בעלי העסקים מתעסקים בלידים שלא מוכנים לקנות, ומאבדים את אלה שכן. אוטומציה שיווקית נכונה פותרת את שתי הבעיות.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              אוטומציה שיווקית היא לא רק שליחת מיילים. היא מסע שהלקוח הפוטנציאלי עובר — מהרגע שהוא שמע על העסק שלך ועד שהוא סוגר עסקה. כשהמסע הזה מתנהל ידנית, הוא תלוי בזיכרון שלך, בזמן שיש לך ובמצב הרוח שלך. כשהוא אוטומטי — הוא רץ בכל מקרה.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה זה "מסע לקוח אוטומטי"?</h2>
              <p className="mb-4">
                מסע לקוח הוא הרצף של נקודות המגע בין הלקוח לעסק. ברמה פשוטה: ליד מגיע → מקבל מסר ראשוני → אם לא ענה, מקבל פולו-אפ → אם הפגין עניין, מקבל הצעת ערך → אם ביקש פגישה, מקבל אישור ותזכורות → עסקה נסגרה → מקבל בקשת ביקורת.
              </p>
              <p>
                כשכל זה קורה אוטומטית בהתאם לפעולות שהלקוח עושה — זה מסע לקוח אוטומטי. הלקוח מרגיש שמתייחסים אליו באופן אישי; בפועל, המערכת עושה הכל.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Lead Scoring — איך לדעת מי שווה את הזמן שלך</h2>
              <p className="mb-4">
                לא כל ליד שווה אותו דבר. ליד שביקר באתר 5 פעמים, פתח 3 מיילים ושאל על מחיר — הוא חם הרבה יותר מליד שמלא טופס פעם אחת ולא חזר.
              </p>
              <p className="mb-4">
                אוטומציה שיווקית מאפשרת לשייך ניקוד ללידים לפי פעולותיהם: ביקור באתר = +5 נקודות, פתיחת מייל = +3, לחיצה על קישור = +8, בקשת פגישה = +20. כשליד מגיע לסף מסוים — סוכן מכירות מקבל התראה.
              </p>
              <p>
                התוצאה: הצוות שלך מתמקד בלידים שמוכנים, לא מבזבז שעות על לידים קרים.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הכלים שאנחנו משתמשים בהם</h2>
              <p className="mb-4">
                לאוטומציה שיווקית מלאה בישראל, השילוב שעובד הכי טוב עבור רוב העסקים:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong className="text-foreground">Make.com</strong> — "דביק" שמחבר בין כל הכלים</li>
                <li><strong className="text-foreground">WhatsApp Business API</strong> — ערוץ התקשורת הראשי</li>
                <li><strong className="text-foreground">CRM</strong> (HubSpot / Base44 / Pipedrive) — ניהול הלידים</li>
                <li><strong className="text-foreground">Calendly</strong> — קביעת פגישות אוטומטית</li>
                <li><strong className="text-foreground">Google Sheets / Airtable</strong> — לוגיקה ודיווח</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מאיפה מתחילים?</h2>
              <p className="mb-4">
                אל תנסה לבנות מסע לקוח שלם ביום אחד. הדרך שעובדת: התחל בנקודת הכאב הגדולה ביותר. ברוב העסקים זו אחת משתיים — לידים שלא מקבלים מענה מהיר, או עסקאות שנתקעות בשלב "שלחתי הצעה ולא קיבלתי תשובה".
              </p>
              <p>
                אטמט את הנקודה הזו קודם, ראה תוצאות, ואז המשך לשלב הבא. אוטומציה שיווקית שנבנית בהדרגה מחזיקה לאורך זמן — אוטומציה שנבנית מיד שלמה לפעמים קורסת על עצמה.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לבנות מסע לקוח אוטומטי לעסק שלך? <Link to="/solutions/business-automation" className="text-primary hover:underline font-medium">ראו את פתרון האוטומציה העסקית שלנו</Link>.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על אוטומציה שיווקית</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה שנמפה לך את המסע כולו?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת אסטרטגיה חינם — נצייר יחד את מסע הלקוח שלך מהליד ועד לסגירה.</p>
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

export default MarketingAutomation;

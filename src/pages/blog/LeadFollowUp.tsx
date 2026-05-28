import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const LeadFollowUp = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר | EH Automation"
        description="הסיבה האמיתית שלידים נעלמים — וסדר פעולות פשוט שעוזר לסגור יותר, בלי מאמץ נוסף."
        path="/blog/lead-follow-up"
        type="article"
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
                למה הלידים שלך לא סוגרים — ואיך פולו-אפ אוטומטי עוזר
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב הלידים לא נעלמים כי הם לא מתאימים — הם נעלמים כי אף אחד לא חזר אליהם בזמן. זה בעיה שיש לה פתרון פשוט.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              אתה מוציא כסף על פרסום, מקבל פניות, ואז חלק גדול מהן פשוט נעלם. הליד לא ענה, אתה עמוס, ועברת הלאה. אחרי שבוע — כבר מאוחר מדי. זה לא בעיה של מכירות, זה בעיה של תזמון ומעקב. והדבר המפתיע הוא שרוב העסקים שמפסידים לידים לא עושים טעות אחת גדולה — הם עושים כמה טעויות קטנות שמצטברות.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הטעות הראשונה: פולו-אפ אחד ואז ויתור</h2>
              <p className="mb-4">
                רוב העסקים שולחים הודעה אחת. אם לא ענו — נגמר. מבחינתם, הליד "לא היה רלוונטי". אבל הנתונים מראים תמונה אחרת לגמרי: רוב הסגירות קורות אחרי 3 עד 5 נגיעות. ליד שלא ענה פעם אחת לא אמר לא — הוא פשוט לא היה פנוי, לא ראה, או חיכה שתחזור שוב.
              </p>
              <p>
                הפתרון פשוט אבל דורש עקביות: לא רק לשלוח פולו-אפ שני — אלא לבנות רצף שיוצא אוטומטית, בלי שתצטרך לזכור. כשהרצף קורה מעצמו, אתה לא צריך להחליט כל פעם אם להמשיך להרים טלפון.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הטעות השנייה: לחזור ללידים מאוחר מדי</h2>
              <p className="mb-4">
                ליד שמילא טופס ומחכה שעה לתשובה — כבר קורא הצעה של מתחרה. הזמן הקריטי הוא הדקות הראשונות אחרי הפנייה, לא שעה לאחר מכן. בשלב הזה הלקוח פעיל, מעוניין, ומוכן לשמוע. ככל שהמענה הראשון מאוחר יותר — כך ההזדמנות מתקררת.
              </p>
              <p>
                מענה אוטומטי ראשוני — גם אם הוא לא ממצה — שומר את הליד חם. "קיבלנו את הפנייה, נחזור אליך תוך שעה" שווה יותר משתיקה של שעה ומענה מלא בסוף. הלקוח יודע שראו אותו.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הטעות השלישית: פולו-אפ שתלוי בזיכרון</h2>
              <p className="mb-4">
                כשאתה עמוס — והרבה פעמים אתה עמוס — הלידים נופלים בין הכיסאות. לא כי לא אכפת לך, אלא כי אין מערכת שמזכירה לך. אתה מתכוון לחזור אל הליד הזה בצהריים, ואז נכנסת שיחה, ואז ישיבה, ואז נגמר היום. הליד לא קיבל פולו-אפ.
              </p>
              <p>
                כשהמערכת מנהלת את הרצף, הבעיה הזו נעלמת. לא צריך לזכור, לא צריך לבדוק, לא צריך לתעדף. ההודעה יוצאת בזמן שנקבע — בין אם אתה בפגישה, בחופשה, או בשיחת טלפון אחרת.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">רצף שעובד בפועל</h2>
              <p className="mb-4">
                הרצף הבסיסי שעובד לרוב העסקים נראה כך: מיד עם קבלת הפנייה יוצא אישור קבלה עם שאלה קצרה שפותחת שיחה. אחרי 24 שעות בלי תשובה — הודעת המשך קצרה ועניינית. אחרי 3 ימים — הצעת ערך נוספת, טיפ, שאלה, או תוכן רלוונטי. אחרי שבוע — שאלה ישירה: "עדיין רלוונטי?" בלי לחץ.
              </p>
              <p>
                מה שמשנה את הטון של הרצף הזה הוא שלא מדובר בהטרדה — מדובר בנוכחות. לקוח שמקבל 4 הודעות לאורך שבוע, כל אחת עם ערך קטן, לא מרגיש לחוץ. הוא מרגיש שיש מישהו שחושב עליו.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">התאמה לפי מקור הפנייה</h2>
              <p className="mb-4">
                ליד שמגיע מפרסום בפייסבוק מתנהג אחרת מליד שהגיע דרך המלצה אישית. הראשון בדרך כלל יותר קר ודורש יותר חימום. השני כבר עם בסיס אמון ויכול לזוז מהר יותר לשיחה. כשמבנים רצף פולו-אפ, שווה להתאים את הטון והקצב לפי מאיפה הגיע הליד.
              </p>
              <p>
                עסקים שמפלחים את הלידים לפי מקור ומשנים את ההודעות בהתאם — רואים שיפור ברור בשיעור ההיענות. זה לא עבודה גדולה יותר — זה תכנון חכם יותר מראש.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות איך בונים מערכת כזו? <Link to="/solutions/business-automation" className="text-primary hover:underline font-medium">ראה את הפתרון לאוטומציה עסקית</Link> — כולל אוטומציית לידים ופולו-אפ.
            </p>

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

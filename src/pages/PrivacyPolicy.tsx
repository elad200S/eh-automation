import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>מדיניות פרטיות | EH Automation</title>
        <meta name="description" content="מדיניות הפרטיות של EH Automation - מידע על איסוף ושימוש במידע אישי" />
        <html lang="he" dir="rtl" />
      </Helmet>

      <main className="bg-background min-h-screen py-16 px-4" dir="rtl">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לעמוד הבית
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            מדיניות פרטיות
          </h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. כללי</h2>
              <p className="text-muted-foreground leading-relaxed">
                אתר זה מופעל על ידי EH Automation (להלן: "אנחנו" או "החברה"). אנו מכבדים את פרטיות המבקרים באתר ומחויבים להגן על המידע האישי שלהם. מדיניות פרטיות זו מסבירה אילו פרטים אנו אוספים, כיצד אנו משתמשים בהם, ומה הזכויות שלך בנוגע למידע זה.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                השימוש באתר מהווה הסכמה לתנאים המפורטים במדיניות זו. אנו ממליצים לקרוא מדיניות זו בעיון.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. איזה מידע נאסף</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו אוספים מידע אישי שאתם מספקים לנו באופן ישיר דרך טפסי יצירת הקשר באתר:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>שם מלא</li>
                <li>מספר טלפון</li>
                <li>סוג העיסוק או התחום העסקי</li>
                <li>סוג האוטומציה או השירות המבוקש</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                בנוסף, ייתכן שנאסוף מידע טכני כללי כגון כתובת IP, סוג הדפדפן, ודפים שנצפו באתר באמצעות כלי אנליטיקה.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. מטרות השימוש במידע</h2>
              <p className="text-muted-foreground leading-relaxed">
                המידע שנאסף משמש למטרות הבאות:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>יצירת קשר ומענה לפניות</li>
                <li>הבנת הצרכים העסקיים שלכם והתאמת הצעות שירות</li>
                <li>שיפור השירותים והתכנים באתר</li>
                <li>שליחת עדכונים רלוונטיים (בכפוף להסכמתכם)</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלכם לצדדים שלישיים למטרות שיווק.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ייתכן שנשתף מידע עם ספקי שירות הפועלים מטעמנו (כגון שירותי אחסון או ניהול טפסים), וזאת אך ורק לצורך מתן השירותים המבוקשים. כמו כן, אנו עשויים לחשוף מידע אם נדרש לכך על פי חוק או צו בית משפט.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. עוגיות (Cookies) וכלי אנליטיקה</h2>
              <p className="text-muted-foreground leading-relaxed">
                האתר עשוי להשתמש בעוגיות (Cookies) ובכלי אנליטיקה כדי לשפר את חוויית הגלישה ולנתח את השימוש באתר.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                עוגיות הן קבצי טקסט קטנים הנשמרים במכשיר שלכם. ניתן לנהל את העדפות העוגיות דרך הגדרות הדפדפן או באמצעות חלון ההעדפות המוצג בכניסה לאתר.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                אנו משתמשים בעוגיות חיוניות לתפקוד האתר, ובעוגיות אנליטיקה לצורך הבנת דפוסי השימוש באתר.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. אבטחת מידע</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו נוקטים באמצעים סבירים כדי להגן על המידע האישי שלכם מפני גישה בלתי מורשית, שימוש לרעה או אובדן. עם זאת, אין שיטת העברה או אחסון מידע באינטרנט שהיא בטוחה ב-100%.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                אנו מתחייבים לעשות כמיטב יכולתנו לשמור על אבטחת המידע שלכם.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. זכויות המשתמש</h2>
              <p className="text-muted-foreground leading-relaxed">
                בהתאם לחוק, עומדות לכם הזכויות הבאות בנוגע למידע האישי שלכם:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li><strong>עיון במידע:</strong> הזכות לבקש לעיין במידע שאנו מחזיקים עליכם</li>
                <li><strong>תיקון מידע:</strong> הזכות לבקש תיקון של מידע שגוי או לא מדויק</li>
                <li><strong>מחיקת מידע:</strong> הזכות לבקש את מחיקת המידע שלכם ממערכותינו</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                לכל בקשה בנושא זכויות אלו, ניתן לפנות אלינו בפרטי הקשר המופיעים מטה.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. יצירת קשר</h2>
              <p className="text-muted-foreground leading-relaxed">
                לכל שאלה או בקשה בנוגע למדיניות פרטיות זו, או לצורך מימוש זכויותיכם, ניתן ליצור קשר:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mt-3">
                <p className="text-foreground">
                  <strong>EH Automation</strong>
                </p>
                <p className="text-muted-foreground mt-1">
                  דוא"ל: <a href="mailto:eladauto66@gmail.com" className="text-primary hover:underline">eladauto66@gmail.com</a>
                </p>
                <p className="text-muted-foreground">
                  טלפון: <a href="tel:0547108219" className="text-primary hover:underline">054-710-8219</a>
                </p>
              </div>
            </section>

            {/* Last updated */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                מדיניות זו עודכנה לאחרונה: דצמבר 2024
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>מדיניות Cookies | EH Automation</title>
        <meta name="description" content="מדיניות ה-Cookies של EH Automation - מידע על השימוש ב-Cookies באתר" />
        <html lang="he" dir="rtl" />
      </Helmet>

      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לעמוד הראשי
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">מדיניות Cookies</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. מהם Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies הם קבצי טקסט קטנים המאוחסנים במכשיר שלך (מחשב, טלפון נייד, טאבלט) 
                כאשר אתה מבקר באתר אינטרנט. Cookies מאפשרים לאתר לזכור את העדפותיך ולשפר את חוויית הגלישה שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. סוגי ה-Cookies שאנו משתמשים בהם</h2>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-2">Cookies חיוניים</h3>
                  <p className="text-muted-foreground text-sm">
                    Cookies אלו נדרשים לתפקוד הבסיסי של האתר. הם מאפשרים ניווט באתר ושימוש בתכונות בסיסיות 
                    כגון שמירת העדפות Cookies. ללא Cookies אלו, האתר לא יכול לפעול כראוי.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-2">Cookies אנליטיקה</h3>
                  <p className="text-muted-foreground text-sm">
                    Cookies אלו עוזרים לנו להבין כיצד מבקרים משתמשים באתר. הם אוספים מידע אנונימי 
                    על דפים שנצפו, זמן שהייה באתר ודרכי הגעה לאתר. מידע זה עוזר לנו לשפר את האתר.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-2">Cookies שיווק</h3>
                  <p className="text-muted-foreground text-sm">
                    Cookies אלו משמשים להצגת פרסומות רלוונטיות עבורך. הם עוקבים אחר הפעילות שלך 
                    באתרים שונים כדי להציג תוכן פרסומי מותאם אישית.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. ניהול העדפות Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                בעת ביקורך הראשון באתר, תוצג לך הודעה המבקשת את הסכמתך לשימוש ב-Cookies. 
                תוכל לבחור לאשר את כל ה-Cookies, לדחות Cookies לא חיוניים, או לנהל את ההעדפות שלך באופן מפורט.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                ניתן לשנות את העדפות ה-Cookies בכל עת על ידי לחיצה על כפתור "העדפות" בסרגל ההסכמה 
                או דרך הגדרות הדפדפן שלך.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. ניהול Cookies בדפדפן</h2>
              <p className="text-muted-foreground leading-relaxed">
                רוב הדפדפנים מאפשרים לך לנהל את העדפות ה-Cookies שלך. תוכל להגדיר את הדפדפן לחסום Cookies, 
                למחוק Cookies קיימים או להתריע לפני שמירת Cookie חדש. שים לב שחסימת Cookies עלולה לפגוע 
                בחוויית הגלישה ובתפקוד חלק מהתכונות באתר.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                להלן קישורים להוראות ניהול Cookies בדפדפנים הנפוצים:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Microsoft Edge</li>
                <li>Safari</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies צד שלישי</h2>
              <p className="text-muted-foreground leading-relaxed">
                חלק מה-Cookies באתר מוגדרים על ידי ספקי שירות חיצוניים (צד שלישי) כגון Google Analytics 
                לצורכי אנליטיקה. לספקים אלו יש מדיניות פרטיות משלהם המסדירה את השימוש במידע שנאסף.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. עדכונים למדיניות זו</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר עם תאריך העדכון החדש. 
                המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. יצירת קשר</h2>
              <p className="text-muted-foreground leading-relaxed">
                לשאלות או בירורים בנוגע למדיניות ה-Cookies שלנו, ניתן ליצור קשר:
              </p>
              <p className="text-muted-foreground mt-2">
                אימייל: <a href="mailto:eladauto66@gmail.com" className="text-primary hover:underline">eladauto66@gmail.com</a><br />
                טלפון: <a href="tel:0547108219" className="text-primary hover:underline">054-710-8219</a>
              </p>
            </section>

            <p className="text-sm text-muted-foreground border-t border-border pt-6 mt-8">
              עדכון אחרון: יולי 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
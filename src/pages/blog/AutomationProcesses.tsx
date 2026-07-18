import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה אוטומציה לעסק קטן?', answer: 'תהליך בסיסי (מענה ללידים, פולו-אפ, תזכורות פגישה) עולה בדרך כלל ₪1,500-5,000 להקמה. לאחר מכן עלות שוטפת של ₪200-500 לחודש עבור הכלים. ה-ROI מגיע תוך חודש-חודשיים ברוב המקרים.' },
  { question: 'האם צריך ידע טכני כדי לבנות אוטומציות?', answer: 'לא. כלים כמו Make.com מאפשרים לבנות אוטומציות מורכבות בלי שורת קוד. רוב הפתרונות שאנחנו בונים מנוהלים על ידי בעל העסק בעצמו אחרי שבוע-שבועיים של הכרות.' },
  { question: 'מה התהליך שכדאי לאטמט ראשון?', answer: 'מענה ללידים נכנסים — זהו התהליך שמייצר את ה-ROI המהיר ביותר. ליד שמקבל תגובה תוך דקות לעומת תגובה אחרי שעה — שיעור ההמרה שלו גבוה ב-78% (לפי מחקר HubSpot).' },
  { question: 'כמה זמן לוקח להקים אוטומציה?', answer: 'תהליך בסיסי: 3-5 ימי עבודה. פתרון מלא עם כמה תהליכים מקושרים: 2-4 שבועות. לאחר ההקמה — האוטומציה רצה לבד ללא תחזוקה שוטפת.' },
  { question: 'האם אוטומציה מתאימה לעסק של אדם אחד?', answer: 'בהחלט — ואולי אפילו יותר. כשאתה מנהל הכל לבד, כל שעה שמתפנה שווה זהב. אוטומציה מאפשרת לעסק קטן לתת רמת שירות שמתחרה עם עסקים גדולים יותר.' },
];

const AutomationProcesses = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="5 תהליכים שכל עסק קטן צריך לאטמט היום | HEY Digital"
        description="סקירה של התהליכים העסקיים הנפוצים ביותר שבהם אוטומציה יכולה לחסוך עשרות שעות בשבוע."
        path="/blog/5-automation-processes"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: '5 תהליכים לאוטומציה', path: '/blog/5-automation-processes' },
      ]} />
      <ArticleSchema
        title="5 תהליכים שכל עסק קטן צריך לאטמט היום"
        description="סקירה של התהליכים העסקיים הנפוצים ביותר שבהם אוטומציה יכולה לחסוך עשרות שעות בשבוע."
        path="/blog/5-automation-processes"
        datePublished="2026-04-08"
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
                5 תהליכים שכל עסק קטן צריך לאטמט היום
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                רוב בעלי העסקים מבזבזים בין 10 ל-20 שעות בשבוע על דברים שאפשר לעשות לגמרי אוטומטית — בלי קוד, בלי מתכנת, בלי תקציב גדול.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              אוטומציה לא חייבת להיות מורכבת. ברוב העסקים הקטנים, 5 תהליכים פשוטים יכולים לשחרר עשרות שעות בשבוע — שעות שאפשר להשקיע בלקוחות, בצמיחה, או פשוט בנשימה. הבעיה היא שרוב בעלי העסקים לא יודעים מאיפה להתחיל, ואז לא מתחילים בכלל.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. מענה אוטומטי על לידים נכנסים</h2>
              <p className="mb-4">
                כל עסק מכיר את הסיטואציה: ליד נכנס מהאתר בשעה 11 בלילה, ואתה רואה אותו רק למחרת בבוקר. עד אז הוא כבר דיבר עם שלושה מתחרים. מענה אוטומטי פותר את הבעיה הזו בצורה פשוטה — הליד שולח פנייה ותוך שניות מקבל הודעה חזרה עם פרטים בסיסיים ושאלה שפותחת שיחה.
              </p>
              <p>
                זה לא מחליף שיחה אנושית, אבל זה שומר על הליד חם עד שאתה פנוי. הפרש של שעה-שעתיים בתגובה יכול לקבוע אם הסגירה קורה אצלך או אצל המתחרה.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. שליחת הצעות מחיר</h2>
              <p className="mb-4">
                הצעת מחיר ידנית לוקחת בממוצע 20-40 דקות. לעסק שמקבל 10 פניות בשבוע — זה 4-7 שעות שבועיות על עניין אדמינסטרטיבי בלבד. כשהתהליך אוטומטי, הלקוח ממלא טופס עם פרטי הצורך, המערכת מחשבת ומייצרת PDF מותאם אישית — והכל נשלח אליו תוך דקות.
              </p>
              <p>
                היתרון הנוסף: כל ההצעות נשמרות ומאורגנות. אפשר לעקוב אחרי מי פתח, מי לא ענה, ומתי לשלוח פולו-אפ — בלי לנהל גיליון אקסל ידנית.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. מעקב אחרי לקוחות שלא ענו</h2>
              <p className="mb-4">
                זה התחום שבו הכי הרבה כסף נשאר על השולחן. ליד שהתעניין אבל לא ענה — לא בהכרח איבד עניין. לפעמים הוא פשוט היה עסוק, שכח, או חיכה שתחזור אליו. מערכת אוטומטית שולחת תזכורת אחרי 24 שעות, עוד אחת אחרי 3 ימים, ואחת נוספת אחרי שבוע.
              </p>
              <p>
                הטון חשוב כאן: לא לחץ, אלא הצעת ערך קצרה בכל הודעה. רוב הסגירות שקורות דרך פולו-אפ קורות דווקא בהודעה השלישית — שרוב בעלי העסקים לא שולחים כי הם שכחו.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. דוחות שבועיים אוטומטיים</h2>
              <p className="mb-4">
                כל בעל עסק צריך לדעת בסוף השבוע: כמה לידים נכנסו, כמה הפכו לעסקאות, מה הסטטוס של הפייפליין. הכנת הדוח הזה ידנית לוקחת שעה-שעתיים. כשהיא אוטומטית — הדוח פשוט מגיע אליך כל יום ראשון בבוקר לווטסאפ.
              </p>
              <p>
                היתרון הגדול של אוטומציה כאן הוא לא רק החיסכון בזמן — אלא העקביות. דוח שמגיע בכל שבוע, גם כשאתה עמוס, יוצר הרגל של קבלת החלטות מבוסס נתונים.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. ניהול תורים ופגישות</h2>
              <p className="mb-4">
                ניהול יומן ידנית הוא תהליך שלם: הלקוח שואל מתי אתה פנוי, אתה בודק, מציע שעה, הוא לא יכול, אתה מציע שוב — ובינתיים עשרות הודעות הלוך ושוב. כשהתהליך אוטומטי, הלקוח מקבל לינק לבחירת שעה, בוחר לבד, ומיד מקבל אישור עם פרטי הפגישה.
              </p>
              <p>
                מה שמשנה את התמונה באמת הוא התזכורת האוטומטית: הלקוח מקבל הודעה יום לפני הפגישה, ואם הוא לא יכול — יש לינק לשינוי. זה מוריד דרמטית את אחוז ה-no-show.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מאיפה מתחילים?</h2>
              <p className="mb-4">
                לא צריך לאטמט הכל בבת אחת. הדרך הנכונה היא לזהות את התהליך שלוקח לך הכי הרבה זמן ביחס לערך שהוא מייצר — ולהתחיל משם. ברוב המקרים, תהליך אחד שעובד טוב מניע בעל עסק להמשיך לשני, לשלישי.
              </p>
              <p>
                השאלה הנכונה לשאול היא לא "מה אפשר לאטמט?" אלא "מה אני עושה שוב ושוב כל שבוע ומרגיש שהיה אפשר לא לעשות ידנית?" שם נמצא נקודת ההתחלה.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות מה כוללת אוטומציה עסקית בפועל? <Link to="/solutions/business-automation" className="text-primary hover:underline font-medium">ראה את הפתרון לאוטומציה עסקית</Link> — תהליכים, כלים ותוצאות.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על אוטומציה לעסקים</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
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

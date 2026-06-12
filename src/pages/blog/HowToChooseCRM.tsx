import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'מה ה-CRM הכי טוב לעסק קטן?', answer: 'תלוי בצרכים. לעסקים שמחפשים חינמי ואיכותי — HubSpot CRM. לעסקים ישראלים שרוצים ממשק עברי ותמיכה מקומית — Base44. לעסקים עם מכירות מורכבות — Pipedrive. אל תבחרו לפי שם — בחרו לפי הפשטות.' },
  { question: 'כמה עולה CRM לעסק?', answer: 'יש CRM חינמיים (HubSpot Free, Base44 Starter) שמתאימים לעסקים קטנים. פתרונות בתשלום נעים בין ₪100 ל-₪500 לחודש לעסק קטן-בינוני. המחיר לא קובע את ההצלחה — ההטמעה קובעת.' },
  { question: 'כמה זמן לוקח להטמיע CRM בצוות?', answer: '2-6 שבועות לשימוש שוטף. השבוע הראשון — הגדרה טכנית. השבועיים הבאים — הכשרה ובנייה של הרגלים. אחרי חודש — הצוות כבר לא חושב על זה, פשוט משתמש.' },
  { question: 'האם אפשר לעבור CRM בלי לאבד נתונים?', answer: 'כן. כל CRM רציני מאפשר ייצוא נתונים לקובץ CSV ויבוא לתוכנה חדשה. תהליך המעבר לוקח בדרך כלל יום עד שלושה ימי עבודה.' },
  { question: 'מה ההבדל בין CRM לגיליון אקסל?', answer: 'אקסל מאחסן מידע. CRM מנהל פעולות: שולח תזכורות, מתריע על לידים שתקועים, שולח הודעות אוטומטיות, ועוקב אחרי כל נגיעה עם לקוח. כשהצוות גדול מ-2 אנשים — אקסל הופך לבעיה.' },
];

const HowToChooseCRM = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="איך לבחור CRM שבאמת ישתמשו בו | EH Automation"
        description="הבעיה לא הכלי – הבעיה היא ההטמעה. טיפים מעשיים לבחירת CRM שהצוות שלך באמת ישתמש בו."
        path="/blog/how-to-choose-crm"
        type="article"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">מערכות עסקיות</span>
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
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              CRM הוא אחד הכלים הכי חשובים שעסק יכול לאמץ — ואחד הכי מבוזבזים. לא בגלל שהמערכות גרועות. בגלל שאנשים בוחרים לפי הדגמה מרשימה, חותמים על מנוי, ואז מגלים שהצוות לא פותח את המערכת. הכסף הלך, וחזרו לגיליון אקסל.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הטעות הנפוצה ביותר: לבחור לפי תכונות</h2>
              <p className="mb-4">
                מרבית ההחלטות על CRM מתקבלות לאחר דמו שבו איש מכירות מראה 50 פיצ'רים מרשימים. הבעיה היא שהעסק ישתמש ב-3 מהם. CRM עם 200 יכולות שנמצא בשימוש בגלל אחת מהן הוא בזבוז תקציב ובזבוז זמן. השאלה הנכונה היא לא "מה המערכת יכולה לעשות?" אלא "מה אנחנו באמת צריכים לעשות כל יום?"
              </p>
              <p>
                ההמלצה הפשוטה: לפני שבוחרים, רשמו 3 תהליכים שאתם רוצים שה-CRM יפתור. אם המערכת עונה על 3 האלה בצורה פשוטה — זה מספיק. אל תשלמו על כל השאר.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">הטמעה בלי הצוות — כישלון בטוח</h2>
              <p className="mb-4">
                טעות שנייה ונפוצה לא פחות: מנהל שמחליט לבד על CRM ומפתיע את הצוות. אם המוכרים, נציגי השירות, או כל מי שצריך להשתמש במערכת — לא היו שותפים להחלטה, הם לא ישתמשו בה. לא מתוך עקשנות, אלא כי לא הבינו את הערך וכי המערכת לא מותאמת לאיך שהם עובדים.
              </p>
              <p>
                הדרך הנכונה היא להכניס את הצוות כבר בשלב הבחירה. לשאול אותם מה מפריע להם היום, איפה הם מאבדים מידע, מה לוקח להם זמן מיותר. כשה-CRM פותר בעיה שהם הרגישו — הם ישתמשו בו.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">CRM לא מתקן תהליך שבור</h2>
              <p className="mb-4">
                זו אולי הטעות הכי קשה לשמוע: אם תהליך המכירה שלכם לא עובד — CRM לא יתקן אותו. הוא יעצים את מה שקיים. תהליך טוב עם CRM יהיה טוב יותר. תהליך שבור עם CRM יהיה שבור בצורה מסודרת יותר.
              </p>
              <p>
                לפני שבוחרים כלי, שווה לשאול: האם יש לנו תהליך ברור ממגע ראשון עם ליד ועד סגירה? האם כל אחד בצוות יודע מה תפקידו בכל שלב? אם לא — קודם מסדרים את התהליך, ואחר כך מחפשים כלי שיתמוך בו.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5 שאלות שכדאי לשאול לפני ההחלטה</h2>
              <p className="mb-4">
                לפני שבוחרים מערכת, ענו בכנות על חמש שאלות פשוטות: כמה אנשים ישתמשו ביומיום? מה הפעולה הכי חשובה שרוצים לעקוב אחריה? האם צריך חיבור לכלים אחרים כמו ווטסאפ, אימייל, או טפסים? מי יהיה אחראי על תחזוקת הנתונים? וכמה מוכנים להשקיע בחודש?
              </p>
              <p>
                התשובות לשאלות האלה מגדירות את הפרופיל של המערכת שמתאימה לכם — עוד לפני שפתחתם אפילו דף השוואה.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה בדרך כלל עובד לעסקים קטנים ובינוניים</h2>
              <p className="mb-4">
                מניסיון, לרוב העסקים הקטנים והבינוניים CRM פשוט שמחובר לווטסאפ, לטפסים ולאוטומציות — שווה יותר מ-CRM מורכב שאף אחד לא פותח. הפשטות היא יתרון, לא חסרון. מערכת שכולם יודעים לעבוד איתה ביום הראשון שווה יותר ממערכת שדורשת הכשרה של שבוע.
              </p>
              <p>
                הגדרת הצלחה שאני משתמש בה: האם הצוות פותח את המערכת בלי שמאלצים אותו? אם כן — בחרתם נכון. אם צריך להזכיר להם בכל פגישה — משהו לא עובד, ולא בהכרח המערכת אשמה.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות איך אנחנו מטמיעים CRM? <Link to="/solutions/crm-automation" className="text-primary hover:underline font-medium">ראה את הפתרון לאוטומציית CRM</Link> — תהליך, כלים ותוצאות.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על בחירת CRM</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
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

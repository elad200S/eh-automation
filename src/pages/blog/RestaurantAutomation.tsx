import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה אוטומציה למסעדה?', answer: 'אוטומציה בסיסית למסעדה — בוט הזמנות שולחן WhatsApp + תזכורות — מתחילה מ-₪600-1,500 לחודש. מערכת מלאה עם ניהול משוב, פולו-אפ ולקוחות חוזרים עולה ₪2,000-4,000 לחודש. ה-ROI ברור: כל שולחן שמתמלא במקום no-show שווה ₪200-500.' },
  { question: 'האם צריך לשנות את מערכת ניהול המסעדה?', answer: 'לא בהכרח. מרבית פתרונות האוטומציה מתממשקים עם תוכנות ניהול מסעדות קיימות (RESTIGO, Tabit, ועוד) דרך API. בחלק מהמקרים פועלים במקביל בלי לשנות את מה שעובד.' },
  { question: 'האם בוט הזמנות שולחן עובד בסוף שבוע?', answer: 'בדיוק — זה אחד היתרונות הגדולים ביותר. הבוט עובד 24/7, כולל שישי בלילה כשלקוחות רוצים לקבוע ל"מחר". בלי בוט, ההזמנה נאבדת. עם בוט — השולחן מקובל ואתם ישנים בשקט.' },
  { question: 'מה קורה אם לקוח מבטל הזמנה?', answer: 'כשלקוח מבטל, המערכת יכולה לשלוח הודעה לרשימת המתנה אוטומטית ולהציע את השולחן הפנוי. בנוסף, ניתן להגדיר מדיניות ביטול — למשל, ביטול תוך 2 שעות מהארוחה מחייב מינימום. הבוט מנהל זאת לפי הכללים שהגדרתם.' },
  { question: 'האם לקוחות יירגזו מבוט WhatsApp?', answer: 'להיפך — לקוחות מישראל רגילים ומעדיפים תקשורת ב-WhatsApp. הודעת אישור הזמנה, תזכורת לפני הארוחה, ושאלת משוב אחרי — כל אלה נתפסים כשירות מקצועי ולא כספאם. המפתח הוא תוכן רלוונטי בתזמון הנכון.' },
];

const RestaurantAutomation = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="אוטומציה למסעדות — הזמנות, תזכורות ומשובים | HEY Digital"
        description="אוטומציה למסעדה: בוט הזמנות שולחן WhatsApp, תזכורות שמורידות no-show ב-40%, ופולו-אפ שמחזיר לקוחות חוזרים. מדריך מלא 2026."
        path="/blog/restaurant-automation"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'אוטומציה למסעדות', path: '/blog/restaurant-automation' },
      ]} />
      <ArticleSchema
        title="אוטומציה למסעדות — הזמנות, תזכורות ומשובים"
        description="אוטומציה למסעדה: בוט הזמנות שולחן WhatsApp, תזכורות שמורידות no-show ב-40%, ופולו-אפ שמחזיר לקוחות חוזרים. מדריך מלא 2026."
        path="/blog/restaurant-automation"
        datePublished="2026-08-01"
      />
      <FAQSchema items={faqItems} />
      <Navbar />
      <main className="bg-background min-h-screen pt-16" dir="rtl">
        <section className="pt-8 pb-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />חזרה לבלוג
            </Link>
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">אוטומציה למסעדות — הזמנות, תזכורות ומשובים</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                אוטומציה למסעדות היא הדרך הפשוטה ביותר למלא את כל השולחנות, להוריד no-show, ולהחזיר לקוחות — בלי להוסיף עובד. מסעדות שהטמיעו בוט WhatsApp עם AI מדווחות על 27% גידול בהזמנות חוזרות. הנה המדריך המלא.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">למה 20% מהשולחנות במסעדה נשארים ריקים בגלל no-show?</h2>
              <p>
                No-show — שולחן שהוזמן ואף אחד לא הגיע — הוא אחת מהבעיות הכי יקרות בתחום ההסעדה. במסעדה שגובה ₪200-500 לארוחה לסועד, שולחן של 4 שחסר = ₪800-2,000 הכנסה שנאבדה לאותו ערב. ומסעדה שיש לה no-show של 15-20% מהשולחנות בשישי בלילה — מפסידה עשרות אלפים בחודש.
              </p>
              <p>
                הגורמים הנפוצים ל-no-show: לקוחות ששכחו, לקוחות שקבעו בכמה מקומות ובחרו אחר, ולקוחות שרצו לבטל אבל "לא מצאו את הטלפון". כל אלה ניתנים לצמצום משמעותי עם מערכת תזכורות אוטומטית.
              </p>
              <p>
                מחקרים בתחום ההסעדה מראים שתזכורת אוטומטית 24 שעות לפני הארוחה — עם אפשרות פשוטה לאשר, לבטל, או לשנות — מורידה no-show ב-35-40%. עבור מסעדה עם 20 שולחנות, זה יכול לאמר 3-4 שולחנות נוספים ביום שישי בלילה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">איך בוט הזמנות שולחן WhatsApp עובד — מהצעת מחיר ועד ישיבה?</h2>
              <p>
                בוט הזמנות שולחן ל-WhatsApp הוא הדרך הנוחה ביותר לקבל הזמנות במסעדה ב-2026. הסיבה פשוטה: 90% מהישראלים משתמשים ב-WhatsApp, ולקוח שרוצה לקבוע שולחן לשישי בחמישי בלילה — ישלח הודעת WhatsApp הרבה לפני שיחייג לטלפון.
              </p>
              <p>
                הנה הזרימה האופיינית של בוט הזמנות שולחן:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">לקוח שולח הודעה:</strong> "שלום, רוצה לקבוע שולחן לשישי בערב ל-4 אנשים." הבוט מגיב תוך שניות.</li>
                <li><strong className="text-foreground">בדיקת זמינות:</strong> הבוט בודק את מערכת ניהול ההזמנות ומציג את השעות הפנויות. "יש לנו מקום ב-19:30, 20:00 ו-21:00 — מה מועדף?"</li>
                <li><strong className="text-foreground">אישור הזמנה:</strong> לקוח בוחר שעה, הבוט שולח אישור עם כתובת, חניה, ומדיניות ביטול. ההזמנה נרשמת אוטומטית במערכת.</li>
                <li><strong className="text-foreground">תזכורת ראשונה:</strong> יום לפני — "תזכורת: מחר בשישי ב-19:30 ל-4 אנשים. לאישור הגעה שלחו 1, לביטול שלחו 2."</li>
                <li><strong className="text-foreground">תזכורת שנייה:</strong> 3 שעות לפני — "מחכים לכם הערב! חניה זמינה ב..."</li>
                <li><strong className="text-foreground">פולו-אפ לאחר הארוחה:</strong> יום למחרת — "תודה שביקרתם! נשמח לדעת איך היה. גם קישור לביקורת גוגל."</li>
              </ol>
              <p>
                כל השלבים הללו קורים אוטומטית, בלי שאף אחד מהצוות נגע בטלפון. לפרטים על בניית בוט WhatsApp לעסק, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">27% יותר הזמנות חוזרות — איך פולו-אפ אוטומטי מחזיר לקוחות?</h2>
              <p>
                על פי נתוני Tabit Israel, מסעדות שהטמיעו בוט WhatsApp עם AI מדווחות על 27% גידול בהזמנות חוזרות. לא מפתיע — כי פולו-אפ חכם מחזיר לקוחות שבלאו הכי נהנו.
              </p>
              <p>
                איך זה עובד בפועל? אחרי כל ביקור, הלקוח מקבל הודעת "תודה" עם אפשרות לדרג או לכתוב ביקורת. שבוע לאחר מכן — הצעה לחזור: "חזרנו עם תפריט מיוחד לסוף שבוע הזה." חודש לאחר מכן — "לא ראינו אתכם בזמן האחרון — הזמינו שולחן ב-10% הנחה."
              </p>
              <p>
                הרעיון פשוט: לקוח שנהנה אבל לא חוזר — לרוב לא חוזר כי שכח, לא כי לא רצה. תזכורת חכמה בזמן הנכון מחזירה אותו — והמסעדה מרוויחה לקוח חוזר שעולה הרבה פחות מרכישת לקוח חדש.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">ניהול משובים אוטומטי — ביקורות גוגל שמשפרות SEO</h2>
              <p>
                ביקורות גוגל הן אחד מגורמי הדירוג החשובים ביותר לעסקי מסעדנות. לקוח שמחפש "מסעדה טובה בתל אביב" יראה תחילה את המסעדות עם הכי הרבה ביקורות טובות. אבל מי זוכר לבקש מלקוח ביקורת בסוף הארוחה?
              </p>
              <p>
                פולו-אפ אוטומטי פותר זאת: 2-3 שעות לאחר הארוחה, הלקוח מקבל הודעת WhatsApp: "היה לנו כיף לארח אתכם! אם נהניתם — נשמח שתשתפו אחרים." קישור ישיר לדף גוגל ביזנס. שיעור הלחיצה על קישורים כאלה עמד על 15-25% — בהרבה יותר ממה שמקבלים דרך בקשה אנושית.
              </p>
              <p>
                בנוסף, ניתן לנהל ביקורות שליליות: אם לקוח מדרג את הביקור ב-1-2, ניתן להגדיר תהליך שמפנה אותו לשיחה פרטית עם המנהל לפני שהוא פורסם את הביקורת ברשת. זה מאפשר לטפל בבעיה ולהפוך לקוח מאוכזב ללקוח מרוצה.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">ניהול הזמנות למנות — מהזמנה ועד להכנה במטבח</h2>
              <p>
                מעבר להזמנות שולחן, מסעדות רבות בישראל עברו לניהול הזמנות ל-take-away ומשלוחים דרך WhatsApp. הבעיה: ניהול הזמנות ידני ב-WhatsApp הוא כאוס — הזמנות מגיעות מתוך שיחות, מישהו עונה "אוקיי" ואז שוכח, ויש כפלים ושגיאות.
              </p>
              <p>
                בוט הזמנות מסדר את התהליך: לקוח שולח הזמנה, הבוט מאשר, שולח לא זה מה שביקשתי? מחשב עלות, מבקש אישור תשלום, ומעביר את ההזמנה למטבח בפורמט ברור. בלי עמימות, בלי "מה אמרת?"
              </p>
              <p>
                מסעדות שהטמיעו בוט הזמנות כזה מדווחות על ירידה של 30% בשגיאות הזמנה, וחיסכון של שעה-שעתיים ליום בניהול הזמנות. לפרטים על אינטגרציה עם CRM ומערכות ניהול, ראו את <Link to="/solutions/business-automation" className="text-primary hover:underline">פתרון האוטומציה העסקית</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כלי אוטומציה פופולריים למסעדות ישראליות ב-2026</h2>
              <p>
                בשוק הישראלי, ישנם כמה פתרונות פופולריים לאוטומציה במסעדות:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Tabit Israel — מערכת ניהול מסעדה ישראלית</h3>
                  <p className="text-sm">מערכת POS ישראלית עם יכולות הזמנות שולחן מובנות. מתאימה למסעדות גדולות עם תקציב גבוה.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">RESTIGO — ERP למסעדות</h3>
                  <p className="text-sm">מערכת מקיפה לניהול מסעדה הכוללת הזמנות, מלאי, נוכחות ועוד. אינטגרציה לWhatsApp דרך API.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">n8n + WhatsApp API — פתרון מותאם אישית</h3>
                  <p className="text-sm">בנייה מותאמת אישית שמתחברת לכל מערכת קיימת. הכי גמיש, מתאים לכל גודל מסעדה, ולרוב חסכוני יותר בטווח הארוך.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים למלא את כל השולחנות ולהוריד no-show?</h3>
              <p className="text-sm text-muted-foreground mb-6">שיחת ייעוץ חינם — בלי מחויבות.</p>
              <button onClick={openPopup} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
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

export default RestaurantAutomation;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה chatbot לאתר עסקי?', answer: 'עלות chatbot לאתר בישראל נעה בין ₪200 לחודש לפתרון בסיסי ועד ₪20,000+ לפרויקט מורכב עם אינטגרציות מרובות. עסק קטן ממוצע משלם ₪500-2,000 לחודש עבור chatbot שמטפל ביכולת מלאה, כולל WhatsApp.' },
  { question: 'האם chatbot מחליף את צוות שירות הלקוחות?', answer: 'לא. Chatbot מטפל ב-60-80% מהשאלות החוזרות והשגרתיות, כך שהצוות האנושי מתפנה לטפל בנושאים מורכבים ורגישים שדורשים שיקול דעת אנושי. זה שיפור משמעותי ביעילות הצוות, לא החלפה.' },
  { question: 'כמה זמן לוקח לבנות chatbot לאתר?', answer: 'Chatbot בסיסי שעונה על שאלות נפוצות ניתן לבנות תוך 1-2 שבועות. Chatbot מתקדם עם אינטגרציות CRM, שיחות מורכבות ויכולת קביעת פגישות לוקח 3-6 שבועות.' },
  { question: 'מה ה-ROI של chatbot לאתר?', answer: 'עסקים מדווחים על ROI תוך 3-6 חודשים. Chatbot שמטפל ב-100 פניות ביום חוסך 3-5 שעות עבודה יומית, שוות ₪1,500-2,500 ליום. בנוסף — לקוחות שמקבלים מענה מיידי סוגרים 40% יותר.' },
  { question: 'האם chatbot עובד בעברית?', answer: 'כן — מודלי AI מודרניים (GPT-4, Claude) תומכים בעברית ברמה גבוהה מאוד, כולל עברית מדוברת לא פורמלית. צ\'אטבוט לעסק ישראלי צריך להיות מוגדר בעברית ולתמוך גם בערבית ואנגלית לפי הצורך.' },
];

const WebsiteChatbotGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="Chatbot לאתר עסקי — כמה זה שווה ב-2026? | EH Automation"
        description="המדריך המלא ל-chatbot לאתר עסקי: עלויות, ROI, מה לחפש ומה להימנע. עסקים מדווחים על ROI תוך 3-6 חודשים."
        path="/blog/website-chatbot-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'Chatbot לאתר עסקי', path: '/blog/website-chatbot-guide' },
      ]} />
      <ArticleSchema
        title="Chatbot לאתר עסקי — כמה זה שווה ב-2026?"
        description="המדריך המלא ל-chatbot לאתר עסקי: עלויות, ROI, מה לחפש ומה להימנע. עסקים מדווחים על ROI תוך 3-6 חודשים."
        path="/blog/website-chatbot-guide"
        datePublished="2026-07-25"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">סוכני AI</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Chatbot לאתר עסקי — כמה זה שווה ב-2026?</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chatbot לאתר עסקי הפך מ"nice to have" לכלי שיש לו ROI ברור ומדיד. ב-2026, עסקים ישראליים מדווחים על החזר השקעה תוך 3-6 חודשים, חיסכון של 40% בעלויות שירות לקוחות, וגידול במכירות — כי לקוח שמקבל מענה מיידי לשאלה סוגר בהסתברות גבוהה יותר.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ההבדל בין chatbot של 2020 ל-chatbot AI של 2026?</h2>
              <p>
                כשאנשים שומעים "chatbot", רבים עדיין חושבים על הצ'אטבוטים הגרועים של שנות ה-2010 — תפריטים נוקשים של "לחצו 1 לשירות, 2 לתמיכה", שלא ממש עזרו לאף אחד. Chatbot AI של 2026 הוא חיה אחרת לגמרי.
              </p>
              <p>
                מודלי שפה מודרניים (GPT-4, Claude Sonnet) מסוגלים לנהל שיחה טבעית בעברית, להבין הקשר, להגיב לשאלות מורכבות שלא תוכנתו מראש, ולקרוא מסמכים ונתונים על העסק שלכם. Chatbot שמוגדר עם המחירון, השירותים, ומדיניות העסק שלכם — יכול לענות על 70-80% מהשאלות של לקוחות חדשים, 24 שעות ביממה.
              </p>
              <p>
                ההבדל המרכזי: chatbot מודרני לא "עושה שגיאות" בגלל שהמשתמש ניסח שאלה בצורה לא צפויה. הוא מבין כוונה, לא רק מילות מפתח. וכשהוא לא יודע — הוא אומר זאת בכנות ומסלים לאדם אמיתי.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">כמה עולה chatbot לאתר — מדרגות מחיר לפי רמות ב-2026?</h2>
              <p>
                על בסיס נתונים מ-53 פרויקטים בישראל, מדרגות המחיר של chatbot לאתר ב-2026 נראות כך:
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">רמה בסיסית — ₪200-800/חודש</h3>
                  <p className="text-sm">Chatbot שעונה על שאלות נפוצות מתוך מסד ידע מוגדר. מתאים לעסקים קטנים עם שאלות פשוטות וחוזרות. לרוב ללא אינטגרציה ל-CRM.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">רמה בינונית — ₪800-3,000/חודש</h3>
                  <p className="text-sm">Chatbot עם יכולת שיחה מלאה, אינטגרציה ל-CRM, קביעת פגישות, ועדכון פרטי לקוחות. כולל אינטגרציה ל-WhatsApp. מתאים לרוב עסקי השירות.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-1">רמה מתקדמת — ₪3,000-20,000+ / הקמה + ₪1,500+/חודש</h3>
                  <p className="text-sm">Chatbot מותאם אישית עם אינטגרציות מרובות, יכולת ביצוע פעולות (הזמנה, תשלום, עדכון), וזיכרון שיחה ארוך-טווח. מתאים לחברות בינוניות וגדולות.</p>
                </div>
              </div>
              <p>
                חשוב להבין: המחיר הגבוה יותר לא אומר בהכרח "יותר טוב". הוא אומר "מותאם יותר לצורך המורכב יותר". עסק קטן שמשלם ₪500/חודש על chatbot שחוסך לו ₪3,000/חודש — זה ROI מצוין, גם אם הפתרון אינו "enterprise".
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מה ה-ROI של chatbot — איך לחשב אם זה משתלם לעסק שלך?</h2>
              <p>
                עסקים שהטמיעו chatbot מדווחים על ROI תוך 3-6 חודשים בממוצע. אבל איך מחשבים את ה-ROI לעסק ספציפי? הנה מסגרת פשוטה:
              </p>
              <p>
                <strong className="text-foreground">חיסכון בשירות לקוחות:</strong> אם chatbot מטפל ב-50 פניות ביום שכל אחת לוקחת 3 דקות לענות עליה ידנית = 150 דקות = 2.5 שעות ביום. בעלות של ₪100 לשעה = ₪250 ליום = ₪5,500 לחודש חיסכון פוטנציאלי.
              </p>
              <p>
                <strong className="text-foreground">גידול בהמרות:</strong> לקוח שמקבל מענה מיידית לשאלה ("האם יש לכם מוצר X?") נמצא ב"רגע ההחלטה". Chatbot שעונה מיידית לעומת המתנה לאיש מכירות — יכול להגדיל המרות ב-20-40%.
              </p>
              <p>
                <strong className="text-foreground">חיסכון בשגיאות:</strong> Chatbot שמשדר מידע עקבי על מחירים, מדיניות, ותנאים — מצמצם אי-הבנות ובעיות שעולות בכסף אחר כך.
              </p>
              <p>
                חברות שמשקיעות ב-AI בצורה מובנית רואות צמיחה כפולה בהכנסות ו-40% חיסכון נוסף בעלויות. לפרטים על הטמעת סוכן AI לאתר, ראו את <Link to="/solutions/ai-agents" className="text-primary hover:underline">פתרון סוכני AI</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5 דברים שכל chatbot עסקי חייב לכלול ב-2026</h2>
              <p>
                לא כל chatbot נוצר שווה. לפני שבוחרים פתרון, וודאו שהוא כולל:
              </p>
              <ul className="list-disc list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">עברית טבעית:</strong> הבנת עברית מדוברת, כולל שגיאות כתיב, ניבים, וביטויים לא פורמליים. chatbot שמסרב לענות כי המשתמש כתב "כמה עולה" במקום "מה המחיר" — לא שווה הכסף.</li>
                <li><strong className="text-foreground">מסלול אסקלציה:</strong> כשהשאלה מורכבת מדי, כשמישהו ממש כועס, או כשמישהו מבקש לדבר עם אדם — הchatbot צריך להעביר בצורה חלקה לנציג. חוסם בדרך = לקוח מתוסכל שעזב.</li>
                <li><strong className="text-foreground">אינטגרציה ל-CRM:</strong> שיחה עם chatbot שלא נשמרת בCRM = עוד "בוא נתחיל מהתחלה" עם הלקוח. כל שיחה צריכה להיות מתועדת.</li>
                <li><strong className="text-foreground">אנליטיקה:</strong> מה השאלות הנפוצות ביותר? איפה השיחות נשברות? בלי נתונים, אי אפשר לשפר.</li>
                <li><strong className="text-foreground">עדכון קל:</strong> מחירים, שירותים ומדיניות משתנים. chatbot שדורש מפתח כדי לעדכן אותו — בעיה.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Chatbot לאתר לעומת chatbot ל-WhatsApp — מה ההבדל?</h2>
              <p>
                בישראל ב-2026, השאלה אינה "האם לשים chatbot באתר או בWhatsApp" — השאלה היא "מה אחוז הפניות שמגיעות מכל ערוץ?". לרוב עסקים ישראליים, WhatsApp הוא הערוץ הדומיננטי, אבל האתר חשוב לפניות ממגוגל.
              </p>
              <p>
                <strong className="text-foreground">Chatbot לאתר:</strong> מתאים ללקוחות שמחפשים ב-Google ומגיעים לאתר. מציג את עצמו כ"צ'אט" בפינת האתר. עוזר להפוך ביקורים לפניות.
              </p>
              <p>
                <strong className="text-foreground">Chatbot ל-WhatsApp:</strong> מתאים ללקוחות קיימים ולהמלצות. בישראל, WhatsApp הוא ערוץ התקשורת הראשי — שיעורי פתיחה של 90%+ לעומת 20-30% למייל.
              </p>
              <p>
                הפתרון האידיאלי: שניהם, מחוברים לאותו CRM. לקוח שמתחיל שיחה באתר ואז עובר לWhatsApp — נזוהה אוטומטית ומקבל המשך שיחה עקבי.
              </p>
              <p>
                לפרטים על חיבור chatbot ל-WhatsApp, ראו את <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline">פתרון אוטומציית WhatsApp</Link> שלנו.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">מאיפה מתחילים — 4 שלבים להטמעת chatbot בעסק?</h2>
              <p>
                להלן תהליך הטמעת chatbot לאתר עסקי בצורה נכונה:
              </p>
              <ol className="list-decimal list-inside space-y-3 pr-4">
                <li><strong className="text-foreground">מפו את השאלות הנפוצות ביותר:</strong> מהן 20 השאלות שהצוות עונה עליהן הכי הרבה? מחירים? שעות פעילות? אזורי שירות? תנאי תשלום? אלה הבסיס לchatbot.</li>
                <li><strong className="text-foreground">הגדירו מסלולי שיחה:</strong> מה הchatbot צריך להשיג — לענות על שאלה? לקבוע פגישה? לאסוף פרטי יצירת קשר? לכל מטרה יש מסלול שיחה שונה.</li>
                <li><strong className="text-foreground">בחרו פלטפורמה ושותף:</strong> פלטפורמות כמו Tidio, Intercom, או פתרון מותאם אישית בn8n. חשוב לבחור שותף שמבין את העסק שלכם, לא רק את הטכנולוגיה.</li>
                <li><strong className="text-foreground">בדקו, שפרו, ובדקו שוב:</strong> שבוע ראשון — עקבו מקרוב אחרי השיחות. איפה הchatbot נשבר? מה שאלות שלא ידע לענות? שפרו ואופטמיזו ברציפות.</li>
              </ol>
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
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצים chatbot שעובד בשבילכם 24/7?</h3>
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

export default WebsiteChatbotGuide;

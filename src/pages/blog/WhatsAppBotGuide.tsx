import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { SEOHead, BreadcrumbSchema, ArticleSchema, FAQSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const faqItems = [
  { question: 'כמה עולה בוט WhatsApp לעסק?', answer: 'בשוק הישראלי ב-2026, בוט WhatsApp בסיסי עולה ₪3,500-5,000 חד-פעמי. בוט AI מתקדם עם אינטגרציית CRM עולה ₪8,000-12,000. יש גם מודלים של תשלום חודשי שמתחילים מ-₪400-500 לחודש.' },
  { question: 'מה ההבדל בין WhatsApp Business רגיל ל-WhatsApp Business API?', answer: 'WhatsApp Business רגיל (חינמי) מאפשר לענות להודעות נכנסות בלבד. WhatsApp Business API מאפשר לשלוח הודעות פרואקטיביות — תזכורות, עדכונים, קמפיינים — וזה מה שצריך לבנות בוט אמיתי.' },
  { question: 'האם בוט WhatsApp עובד בעברית?', answer: 'כן. בוטי AI ב-2026 מבינים עברית היטב, כולל עברית לא רשמית וקיצורים שנפוצים בהודעות ישראליות.' },
  { question: 'כמה זמן לוקח לבנות בוט WhatsApp?', answer: 'בוט בסיסי אפשר להקים תוך 3-7 ימי עבודה. בוט AI מתקדם עם אינטגרציות CRM דורש 2-4 שבועות.' },
  { question: 'האם הבוט פועל 24 שעות ביממה?', answer: 'כן. הבוט מגיב אוטומטית בכל שעה, כולל לילות וסופי שבוע — בלי עלות נוספת על שעות לא סטנדרטיות.' },
];

const WhatsAppBotGuide = () => {
  const { openPopup } = useContactPopup();
  return (
    <>
      <SEOHead
        title="בוט WhatsApp לעסקים — המדריך המלא 2026 | EH Automation"
        description="כל מה שצריך לדעת על בוט WhatsApp לעסקים: איך עובד, מה עולה, מה אפשר לאטמט — ומה לא."
        path="/blog/whatsapp-bot-guide"
        type="article"
      />
      <BreadcrumbSchema items={[
        { name: 'בית', path: '/' },
        { name: 'בלוג', path: '/blog' },
        { name: 'בוט WhatsApp לעסקים — המדריך המלא', path: '/blog/whatsapp-bot-guide' },
      ]} />
      <ArticleSchema
        title="בוט WhatsApp לעסקים — המדריך המלא 2026"
        description="כל מה שצריך לדעת על בוט WhatsApp לעסקים: איך עובד, מה עולה, מה אפשר לאטמט — ומה לא."
        path="/blog/whatsapp-bot-guide"
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
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4 inline-block">אוטומציה</span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                בוט WhatsApp לעסקים — המדריך המלא 2026
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ישראל היא אחת המדינות עם אחוז האימוץ הגבוה ביותר בעולם לווטסאפ — 99% מהאוכלוסייה. אם העסק שלך עדיין עונה ידנית לכל הודעה, אתה מפסיד שעות בכל שבוע.
              </p>
            </div>
          </div>
        </section>

        <Section id="content">
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <p>
              בוט WhatsApp הוא לא רק "תשובה אוטומטית". כשהוא בנוי נכון, הוא יכול לקבל לידים, לענות על שאלות נפוצות, לשלוח הצעות מחיר, לתאם פגישות ולעדכן סטטוסים — בלי שאתה נוגע בטלפון. המדריך הזה מסביר בדיוק איך זה עובד ומה לצפות.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה זה בוט WhatsApp בעצם?</h2>
              <p className="mb-4">
                בוט WhatsApp הוא מערכת אוטומציה שמחוברת לחשבון WhatsApp Business שלך ומגיבה להודעות לפי חוקים שהגדרת מראש — או בעזרת AI שמבין שפה טבעית. ברמה הבסיסית, הבוט עונה על שאלות נפוצות ואוסף פרטי קשר. ברמה מתקדמת, הוא מנהל שיחה שלמה, מסווג לידים ומזין אותם ישירות לCRM שלך.
              </p>
              <p>
                ההבדל בין בוט פשוט לבוט חכם הוא בדרך כלל ה-AI. בוט רגיל עובד עם מילות מפתח — "מחיר", "שעות פתיחה", "פגישה". בוט AI מבין גם "כמה זה עולה בערך?" ו"יש לכם מקום מחר בצהריים?" ועונה בהתאם.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה אפשר לאטמט עם בוט WhatsApp?</h2>
              <p className="mb-4">
                רוב העסקים שמגיעים אלינו מתחילים מאחד מארבעה תרחישים:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong className="text-foreground">מענה על לידים נכנסים</strong> — הלקוח שואל "מה המחיר?" בחצות, הבוט עונה מיד ומשאיר אותו חם</li>
                <li><strong className="text-foreground">קביעת פגישות</strong> — הבוט שואל מתי נוח, מציע שעות פנויות ורושם ישירות ביומן</li>
                <li><strong className="text-foreground">תזכורות אוטומטיות</strong> — הלקוח קיבל תזכורת לפגישה מחר ואישר? הכל מסונכרן בלי שנגעת</li>
                <li><strong className="text-foreground">שאלות נפוצות</strong> — שעות פתיחה, מיקום, תנאי תשלום — הבוט עונה 24/7 בלי לעייף</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">כמה זה עולה?</h2>
              <p className="mb-4">
                בשוק הישראלי ב-2026 המחירים נעים בין ₪3,500 לבוט בסיסי ועד ₪12,000+ לסוכן AI מלא עם CRM. אבל המחיר האמיתי שצריך להסתכל עליו הוא החזר ההשקעה: עסק שמשלם ₪500 בחודש על בוט ומייצר ממנו 3 לידים נוספים בחודש — כבר הרוויח.
              </p>
              <p>
                הטעות הכי נפוצה שאנחנו רואים: עסקים משלמים על בוט יקר שנבנה לפני שנתיים ועולה 30-50% יותר ממה שהשוק מציע היום. כדאי לבדוק.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">מה לא לאטמט</h2>
              <p className="mb-4">
                לא כל שיחה מתאימה לבוט. כשלקוח מתלונן, כשיש עסקה גדולה ומורכבת, או כשמישהו צריך תמיכה רגשית — נגיעה אנושית חיונית. בוט טוב יודע מתי להעביר לאדם, לא רק מתי לענות.
              </p>
              <p>
                הכלל שלנו: אם השיחה דורשת שיקול דעת — אדם. אם היא דורשת מידע — בוט.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">איך להתחיל?</h2>
              <p>
                הצעד הראשון הוא למפות את ה-5 השאלות שהכי הרבה לקוחות שואלים אותך בווטסאפ. אלו הן הבסיס לבוט. מכאן, ניתן להחליט אם רוצים פתרון פשוט שאפשר להקים בשבוע, או סוכן AI מלא שדורש כמה שבועות.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              רוצה לראות איך בוט WhatsApp נראה בפועל? <Link to="/solutions/whatsapp-automation" className="text-primary hover:underline font-medium">ראו את פתרון אוטומציית WhatsApp שלנו</Link>.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">שאלות נפוצות על בוט WhatsApp</h2>
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 rounded-xl border border-border text-center">
              <h3 className="text-lg font-semibold text-foreground mb-3">רוצה בוט WhatsApp לעסק שלך?</h3>
              <p className="text-sm text-muted-foreground mb-6">נבנה לך אחד שמתאים בדיוק לתהליך שלך — שיחת ייעוץ בחינם.</p>
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

export default WhatsAppBotGuide;

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/AdminSidebar';

const publishedArticles = [
  { date: '08/06/2026', title: 'בוט WhatsApp לעסקים — המדריך המלא', keywords: 'בוט ווטסאפ, צ\'אטבוט לעסקים', category: 'WhatsApp', url: '/blog/whatsapp-bot-guide' },
  { date: '08/06/2026', title: 'Make vs Zapier vs n8n — השוואה מלאה', keywords: 'make.com, zapier, n8n', category: 'כלי אוטומציה', url: '/blog/automation-tools-comparison' },
  { date: '08/06/2026', title: 'תזכורות פגישות אוטומטיות — מורידים no-show ב-60%', keywords: 'תזכורת פגישה אוטומטית', category: 'אוטומציה', url: '/blog/appointment-reminder-automation' },
  { date: '08/06/2026', title: 'סוכן AI לשירות לקוחות — עונה 24/7', keywords: 'שירות לקוחות AI', category: 'סוכני AI', url: '/blog/ai-customer-service' },
  { date: '08/06/2026', title: 'CRM + WhatsApp — האינטגרציה שכל עסק צריך', keywords: 'crm whatsapp, אינטגרציה crm', category: 'CRM', url: '/blog/crm-whatsapp-integration' },
  { date: '08/06/2026', title: 'אוטומציה שיווקית — מהליד הראשון ועד לסגירה', keywords: 'אוטומציה שיווקית', category: 'שיווק', url: '/blog/marketing-automation' },
  { date: '08/05/2026', title: 'WhatsApp לעסק: מה לאטמט ומה להשאיר אנושי', keywords: 'אוטומציית WhatsApp', category: 'WhatsApp', url: '/blog/whatsapp-automation' },
  { date: '08/05/2026', title: 'למה הלידים שלך לא סוגרים — פולו-אפ אוטומטי', keywords: 'פולו אפ אוטומטי, לידים', category: 'אוטומציה', url: '/blog/lead-follow-up' },
  { date: '08/04/2026', title: '5 תהליכים שכל עסק קטן צריך לאטמט', keywords: 'אוטומציה עסקית, עסק קטן', category: 'אוטומציה', url: '/blog/5-automation-processes' },
  { date: '08/04/2026', title: 'סוכן AI לעסק: מתי זה שווה ומתי לא', keywords: 'סוכן AI לעסק', category: 'סוכני AI', url: '/blog/ai-agent-for-business' },
  { date: '08/04/2026', title: 'איך לבחור CRM שבאמת ישתמשו בו', keywords: 'CRM לעסק, בחירת CRM', category: 'CRM', url: '/blog/how-to-choose-crm' },
];

const upcomingArticles = [
  { date: '21/06/2026', title: 'אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026', keywords: 'אוטומציה עסקית, ייעול תהליכים', status: 'agent' },
  { date: '23/06/2026', title: 'סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים', keywords: 'סוכן AI לעסק, AI לעסקים', status: 'agent' },
  { date: '25/06/2026', title: 'חנות איקומרס — איך פותחים ומה חייב להיות בה ב-2026', keywords: 'חנות איקומרס, חנות אונליין', status: 'agent' },
  { date: '28/06/2026', title: "צ'אטבוט לוואטסאפ לעסקים — מדריך שלם ומעשי", keywords: "צ'אטבוט לוואטסאפ, WhatsApp bot", status: 'agent' },
  { date: '30/06/2026', title: 'אתר תדמית לעסק — למה זה קריטי ב-2026 ומה חייב להיות בו', keywords: 'אתר תדמית לעסק, בניית אתר עסקי', status: 'agent' },
  { date: '02/07/2026', title: 'ייעול תהליכים בעסק — 7 צעדים פרקטיים שעובדים', keywords: 'ייעול תהליכים בעסק, שיפור תהליכים', status: 'agent' },
  { date: '05/07/2026', title: 'אוטומציה לנדל"ן — 5 תהליכים שחוסכים 12 שעות בשבוע', keywords: 'אוטומציה נדל"ן, CRM נדל"ן', status: 'agent' },
  { date: '07/07/2026', title: 'הטמעת AI בעסקים — מדריך מעשי לבעלי עסקים', keywords: 'הטמעת AI בעסקים, בינה מלאכותית', status: 'agent' },
  { date: '09/07/2026', title: 'Make.com אוטומציה — המדריך המלא לעסקים ישראלים', keywords: 'Make אוטומציה, Make.com', status: 'planned' },
  { date: '12/07/2026', title: 'אוטומציה לקליניקה — קביעת תורים ותזכורות בלי מזכירה', keywords: 'אוטומציה קליניקה, קביעת תור אוטומטי', status: 'planned' },
  { date: '14/07/2026', title: 'אתר תדמית לעורך דין — מה לקוחות מחפשים ומה ממיר', keywords: 'אתר תדמית עורך דין, אתר לעו"ד', status: 'planned' },
  { date: '16/07/2026', title: 'Shopify ישראל — מדריך פתיחת חנות 2026', keywords: 'Shopify ישראל, Shopify עברית', status: 'planned' },
];

const trafficProjection = [
  { month: 'יוני 26', visits: 80, articles: 16 },
  { month: 'יולי 26', visits: 280, articles: 29 },
  { month: 'אוג 26', visits: 620, articles: 42 },
  { month: 'ספט 26', visits: 1100, articles: 55 },
  { month: 'אוק 26', visits: 1700, articles: 68 },
  { month: 'נוב 26', visits: 2500, articles: 81 },
  { month: 'דצ 26', visits: 3500, articles: 94 },
];

const maxVisits = 3500;

const agents = [
  {
    name: 'HEY Blog — ראשון',
    id: 'trig_01Kdih14qZ32veLgi4QJy9HE',
    cron: 'כל יום ראשון',
    nextRun: '21/06/2026 09:00',
    nextArticle: 'אוטומציה עסקית — המדריך המלא לבעלי עסקים ב-2026',
    enabled: true,
  },
  {
    name: 'HEY Blog — שלישי',
    id: 'trig_0138J2bzMqN1fKBpmebXkowQ',
    cron: 'כל יום שלישי',
    nextRun: '23/06/2026 09:00',
    nextArticle: 'סוכן AI לעסק — כל מה שצריך לדעת לפני שמתחילים',
    enabled: true,
  },
  {
    name: 'HEY Blog — חמישי',
    id: 'trig_01WgvegRBXjW2ShJb1sgoBdL',
    cron: 'כל יום חמישי',
    nextRun: '25/06/2026 09:00',
    nextArticle: 'חנות איקומרס — איך פותחים ומה חייב להיות בה ב-2026',
    enabled: true,
  },
];

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const isAdmin = user?.email === 'eladauto66@gmail.com' || user?.email === 'elad200226@gmail.com';

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">טוען...</div>
    </div>
  );
  if (!user) return null;

  const nextPublish = upcomingArticles[0];
  const daysToNext = Math.ceil((new Date('2026-06-21').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <AdminSidebar isAdmin={isAdmin} />

      <div className="md:mr-52 p-6 md:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">פאנל ניהול תוכן</h1>
        <p className="text-muted-foreground mt-1">HEY Digital — לוח בקרה SEO/GEO</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">11</div>
          <div className="text-sm text-muted-foreground">מאמרים פורסמו</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">156</div>
          <div className="text-sm text-muted-foreground">מאמרים מתוכננים</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">3</div>
          <div className="text-sm text-muted-foreground">סוכנים פעילים</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-yellow-400 mb-1">{Math.max(0, daysToNext)}י</div>
          <div className="text-sm text-muted-foreground">לפרסום הבא</div>
        </div>
      </div>

      {/* Agents */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold">סוכני פרסום — Claude Cloud Agents</h2>
            <p className="text-xs text-muted-foreground mt-1">רצים בענן Anthropic — לא תלויים במחשב שלך</p>
          </div>
          <a
            href="https://claude.ai/code/routines"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded-full"
          >
            ניהול סוכנים ←
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="border border-border rounded-xl p-5 bg-background/40">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-foreground">{agent.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{agent.cron} — 09:00 ישראל</div>
                </div>
                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">🟢 פעיל</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">פרסום הבא:</span>
                  <span className="font-medium text-foreground">{agent.nextRun}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">מאמר הבא:</span>
                  <span className="text-xs text-foreground text-left">{agent.nextArticle}</span>
                </div>
              </div>
              <a
                href={`https://claude.ai/code/routines/${agent.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center text-xs text-primary hover:underline border border-primary/20 rounded-lg py-2"
              >
                פתח סוכן → שלח פקודות ישירות
              </a>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
          <p className="font-medium text-foreground mb-1">💬 איך לדבר עם הסוכן ישירות?</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            לחץ "פתח סוכן" על הסוכן הרצוי → תיפתח סביבת Claude עם הסוכן. שם אפשר לתת פקודות ישירות: לשנות נושא, לבקש פרסום מוקדם, לערוך את תוכנית התוכן, או להריץ את הסוכן עכשיו.
          </p>
        </div>
      </div>

      {/* Traffic Projection */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-2">צפי כניסות אורגניות חודשיות</h2>
        <p className="text-xs text-muted-foreground mb-6">הערכה שמרנית על בסיס 3 מאמרים/שבוע (ראשון, שלישי, חמישי) + FAQSchema + GEO</p>
        <div className="flex items-end gap-3 h-40">
          {trafficProjection.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-primary font-medium">{item.visits.toLocaleString()}</span>
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all"
                style={{ height: `${(item.visits / maxVisits) * 120}px` }}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-6 text-xs text-muted-foreground">
          <span>📈 צפי: <strong className="text-foreground">+3,500 כניסות/חודש</strong> עד דצמבר 2026</span>
          <span>📝 <strong className="text-foreground">94 מאמרים</strong> פעילים עד סוף השנה</span>
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-5">תוכנית תוכן — יוני–יולי 2026 (הבאים בתור)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-right pb-3 pr-2">תאריך</th>
                <th className="text-right pb-3 pr-4">נושא</th>
                <th className="text-right pb-3 pr-4 hidden md:table-cell">מילות מפתח</th>
                <th className="text-right pb-3">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {upcomingArticles.map((a, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 pr-2 text-muted-foreground whitespace-nowrap">{a.date}</td>
                  <td className="py-3 pr-4 font-medium">{a.title}</td>
                  <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell text-xs">{a.keywords}</td>
                  <td className="py-3">
                    {a.status === 'agent' ? (
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium whitespace-nowrap">🤖 סוכן פעיל</span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs whitespace-nowrap">📅 מתוכנן</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* "סוכן פעיל" = agent ענן מתוזמן (ראשון/שלישי/חמישי) שיפרסם אוטומטית ללא התערבות</p>
      </div>

      {/* Published */}
      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5">מאמרים שפורסמו ({publishedArticles.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-right pb-3 pr-2">תאריך</th>
                <th className="text-right pb-3 pr-4">נושא</th>
                <th className="text-right pb-3 pr-4 hidden md:table-cell">מילות מפתח</th>
                <th className="text-right pb-3 hidden md:table-cell">קטגוריה</th>
                <th className="text-right pb-3">FAQSchema</th>
              </tr>
            </thead>
            <tbody>
              {publishedArticles.map((a, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 pr-2 text-muted-foreground whitespace-nowrap">{a.date}</td>
                  <td className="py-3 pr-4">
                    <Link to={a.url} className="text-primary hover:underline font-medium">{a.title}</Link>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell text-xs">{a.keywords}</td>
                  <td className="py-3 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-full bg-muted text-xs">{a.category}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-primary text-lg">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Dashboard;

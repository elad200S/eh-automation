import { Link } from 'react-router-dom';

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
  { date: '16/06/2026', title: 'אוטומציה לנדל"ן — 5 תהליכים שחוסכים שעות', keywords: 'אוטומציה נדל"ן, תיווך אוטומטי', status: 'agent' },
  { date: '25/06/2026', title: 'בינה מלאכותית לעסקים קטנים — מאיפה מתחילים?', keywords: 'בינה מלאכותית לעסקים, AI לעסק קטן', status: 'agent' },
  { date: '01/07/2026', title: 'אוטומציה לקליניקות — קביעת תורים בלי מזכירה', keywords: 'אוטומציה קליניקה, קביעת תור אוטומטי', status: 'agent' },
  { date: '08/07/2026', title: 'Chatbot לאתר עסקי — כמה זה שווה ב-2026?', keywords: 'chatbot לאתר, צ\'אטבוט עסקי', status: 'agent' },
  { date: '01/08/2026', title: 'אוטומציה למסעדות — הזמנות, תזכורות ומשובים', keywords: 'אוטומציה מסעדה', status: 'planned' },
  { date: '08/08/2026', title: 'n8n — המדריך המלא לעסקים בישראל 2026', keywords: 'n8n, n8n עברית', status: 'planned' },
  { date: '16/08/2026', title: 'איך AI Agent מחליף עובד שלם — בצורה אחראית', keywords: 'סוכן AI עובד', status: 'planned' },
  { date: '25/08/2026', title: 'אוטומציה לניהול אירועים — מA עד Z', keywords: 'אוטומציה אירועים', status: 'planned' },
  { date: '01/09/2026', title: 'ROI של אוטומציה — איך מחשבים כמה חסכת?', keywords: 'ROI אוטומציה', status: 'planned' },
  { date: '08/09/2026', title: 'אוטומציה לחינוך ומכירת קורסים', keywords: 'אוטומציה קורסים', status: 'planned' },
  { date: '16/09/2026', title: 'WhatsApp Business API — מדריך התחלה מלא 2026', keywords: 'WhatsApp Business API', status: 'planned' },
  { date: '25/09/2026', title: 'Zapier — כל מה שצריך לדעת לפני שמשתמשים', keywords: 'zapier עברית, zapier לעסק', status: 'planned' },
];

const trafficProjection = [
  { month: 'יוני 26', visits: 60, articles: 11 },
  { month: 'יולי 26', visits: 160, articles: 15 },
  { month: 'אוג 26', visits: 320, articles: 19 },
  { month: 'ספט 26', visits: 550, articles: 23 },
  { month: 'אוק 26', visits: 850, articles: 27 },
  { month: 'נוב 26', visits: 1200, articles: 31 },
  { month: 'דצ 26', visits: 1600, articles: 35 },
];

const maxVisits = 1600;

const Dashboard = () => {
  const nextPublish = upcomingArticles[0];
  const daysToNext = Math.ceil((new Date('2026-06-16').getTime() - new Date('2026-06-12').getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10" dir="rtl">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground">פאנל ניהול תוכן</h1>
          <p className="text-muted-foreground mt-1">EH Automation — לוח בקרה SEO/GEO</p>
        </div>
        <Link to="/" className="text-sm text-primary hover:underline">← חזרה לאתר</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">11</div>
          <div className="text-sm text-muted-foreground">מאמרים פורסמו</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">12</div>
          <div className="text-sm text-muted-foreground">מאמרים מתוכננים</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">4</div>
          <div className="text-sm text-muted-foreground">סוכנים פעילים</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-yellow-400 mb-1">{daysToNext}י</div>
          <div className="text-sm text-muted-foreground">לפרסום הבא</div>
        </div>
      </div>

      {/* Traffic Projection */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-2">צפי כניסות אורגניות חודשיות</h2>
        <p className="text-xs text-muted-foreground mb-6">הערכה שמרנית על בסיס 4 מאמרים/חודש + FAQSchema + GEO</p>
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
          <span>📈 צפי: <strong className="text-foreground">+1,600 כניסות/חודש</strong> עד דצמבר 2026</span>
          <span>📝 <strong className="text-foreground">35 מאמרים</strong> פעילים עד סוף השנה</span>
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-5">תוכנית תוכן — יוני–ספטמבר 2026</h2>
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
        <p className="text-xs text-muted-foreground mt-4">* "סוכן פעיל" = agent ענן מתוזמן שיפרסם אוטומטית ללא התערבות</p>
      </div>

      {/* Published */}
      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5">מאמרים שפורסמו (11)</h2>
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
  );
};

export default Dashboard;

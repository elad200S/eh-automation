import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/AdminSidebar';

// ── Live data source ──────────────────────────────────────────────────────────
// Everything below is parsed at runtime from blog-topics-queue.md on GitHub —
// no hardcoded article lists or dates. That file is the single source of truth
// for both the publishing routines and this panel, so they can never drift apart.

const QUEUE_URL = 'https://raw.githubusercontent.com/elad200S/heydigital.co.il/main/blog-topics-queue.md';

type PublishedRow = { date: string; title: string; url: string };
type QueueRow = { date: string; title: string; keywords: string; category: string; slug: string; status: string };

const parseQueueMarkdown = (md: string) => {
  const lines = md.split('\n');

  // "מאמרים שפורסמו" table: | date | title | url |
  const publishedStart = lines.findIndex((l) => l.includes('## מאמרים שפורסמו'));
  const published: PublishedRow[] = [];
  if (publishedStart !== -1) {
    for (let i = publishedStart; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith('---') && published.length > 0) break;
      const m = l.match(/^\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(.+?)\s*\|\s*(\/blog\/[^\s|]+)\s*\|$/);
      if (m) published.push({ date: m[1], title: m[2].replace(/\s*\(פורסם ✓\)\s*$/, ''), url: m[3] });
    }
  }

  // Every "| YYYY-MM-DD | topic | keywords | category | slug | status |" row in the whole file, in document order
  const queue: QueueRow[] = [];
  for (const raw of lines) {
    const l = raw.trim();
    const m = l.match(/^\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*([a-z0-9-]+)\s*\|\s*(ממתין|פורסם ✓)\s*\|$/);
    if (m) queue.push({ date: m[1], title: m[2], keywords: m[3], category: m[4], slug: m[5], status: m[6] });
  }

  return { published, queue };
};

// Real cron schedule for the 3 blog-publish routines (Sun/Tue/Thu, 06:00 UTC = 09:00 Israel standard time)
const ROUTINE_CRON = [
  { name: 'HEY Blog — ראשון', id: 'trig_01Kdih14qZ32veLgi4QJy9HE', dayOfWeek: 0 },
  { name: 'HEY Blog — שלישי', id: 'trig_0138J2bzMqN1fKBpmebXkowQ', dayOfWeek: 2 },
  { name: 'HEY Blog — חמישי', id: 'trig_01WgvegRBXjW2ShJb1sgoBdL', dayOfWeek: 4 },
];

const nextOccurrence = (dayOfWeek: number, hourLocal = 9) => {
  const now = new Date();
  const d = new Date(now);
  d.setHours(hourLocal, 0, 0, 0);
  let diff = (dayOfWeek - d.getDay() + 7) % 7;
  if (diff === 0 && d.getTime() <= now.getTime()) diff = 7;
  d.setDate(d.getDate() + diff);
  return d;
};

const formatHe = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} 09:00`;

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

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [published, setPublished] = useState<PublishedRow[] | null>(null);
  const [pending, setPending] = useState<QueueRow[] | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    fetch(QUEUE_URL)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((md) => {
        const { published: pub, queue } = parseQueueMarkdown(md);
        setPublished(pub);
        setPending(queue.filter((r) => r.status === 'ממתין'));
      })
      .catch(() => setFetchError(true));
  }, []);

  const isAdmin = user?.email === 'eladauto66@gmail.com' || user?.email === 'elad200226@gmail.com';

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">טוען...</div>
    </div>
  );
  if (!user) return null;

  const agents = ROUTINE_CRON.map((r) => ({ ...r, nextRun: nextOccurrence(r.dayOfWeek) }));
  const soonestAgent = agents.reduce((a, b) => (a.nextRun < b.nextRun ? a : b));
  const daysToNext = Math.max(0, Math.ceil((soonestAgent.nextRun.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const nextThree = (pending ?? []).slice(0, 15);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <AdminSidebar isAdmin={isAdmin} />

      <div className="md:mr-52 p-6 md:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">פאנל ניהול תוכן</h1>
        <p className="text-muted-foreground mt-1">HEY Digital — לוח בקרה SEO/GEO</p>
        {fetchError && (
          <p className="text-xs text-red-400 mt-2">⚠️ לא הצלחתי לטעון את blog-topics-queue.md מ-GitHub — הנתונים למטה עשויים להיות חלקיים.</p>
        )}
      </div>

      {/* Stats — computed live from the queue file, not hardcoded */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">{published ? published.length : '…'}</div>
          <div className="text-sm text-muted-foreground">מאמרים פורסמו</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">{pending ? pending.length : '…'}</div>
          <div className="text-sm text-muted-foreground">מאמרים בתור</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-primary mb-1">3</div>
          <div className="text-sm text-muted-foreground">סוכנים פעילים</div>
        </div>
        <div className="bg-muted/30 border border-border rounded-xl p-5">
          <div className="text-3xl font-bold text-yellow-400 mb-1">{daysToNext}י</div>
          <div className="text-sm text-muted-foreground">לפרסום הבא</div>
        </div>
      </div>

      {/* Agents */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold">סוכני פרסום — Claude Cloud Agents</h2>
            <p className="text-xs text-muted-foreground mt-1">רצים בענן Anthropic — לא תלויים במחשב שלך. תאריכי "פרסום הבא" מחושבים בזמן אמת (לא קבועים בקוד).</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="border border-border rounded-xl p-5 bg-background/40">
              <div className="flex items-start justify-between mb-3">
                <div className="font-semibold text-foreground">{agent.name}</div>
                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium whitespace-nowrap">🟢 פעיל</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">פרסום הבא:</span>
                <span className="font-medium text-foreground">{formatHe(agent.nextRun)}</span>
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
        <p className="mt-4 text-xs text-muted-foreground">
          ⚠️ "פעיל" כאן מבוסס על ההגדרה הידועה (לא בדיקת חיים בזמן אמת מול claude.ai — זה ידרוש חיבור backend נפרד). לסטטוס הרצה אחרון בפועל, לחצו "פתח סוכן".
        </p>
      </div>

      {/* Traffic Projection — explicitly labeled as an estimate, not real Analytics data */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-2">צפי כניסות אורגניות חודשיות <span className="text-xs font-normal text-yellow-400">(הערכה — לא מחובר ל-Google Analytics עדיין)</span></h2>
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
          <span>📈 הערכה: <strong className="text-foreground">+3,500 כניסות/חודש</strong> עד דצמבר 2026</span>
          <span>📝 <strong className="text-foreground">94 מאמרים</strong> אם הקצב נשמר עד סוף השנה</span>
        </div>
      </div>

      {/* Upcoming — real, live, in the actual priority order the agents will publish */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-5">תוכנית תוכן — הבאים בתור (סדר פרסום אמיתי)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-right pb-3 pr-2">#</th>
                <th className="text-right pb-3 pr-4">נושא</th>
                <th className="text-right pb-3 pr-4 hidden md:table-cell">קטגוריה</th>
                <th className="text-right pb-3 hidden md:table-cell">מילות מפתח</th>
              </tr>
            </thead>
            <tbody>
              {nextThree.length === 0 && (
                <tr><td colSpan={4} className="py-4 text-muted-foreground text-center">{fetchError ? 'שגיאת טעינה' : 'טוען מ-GitHub...'}</td></tr>
              )}
              {nextThree.map((a, i) => (
                <tr key={a.slug} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 pr-2 text-muted-foreground">{i + 1}</td>
                  <td className="py-3 pr-4 font-medium">{a.title}</td>
                  <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">
                    <span className="px-2 py-1 rounded-full bg-muted text-xs">{a.category}</span>
                  </td>
                  <td className="py-3 text-muted-foreground hidden md:table-cell text-xs">{a.keywords}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* הסדר כאן זהה בדיוק לסדר שהסוכנים יפרסמו בו — נטען חי מ-blog-topics-queue.md בכל טעינת עמוד.</p>
      </div>

      {/* Published — real, live */}
      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5">מאמרים שפורסמו {published ? `(${published.length})` : ''}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-right pb-3 pr-2">תאריך</th>
                <th className="text-right pb-3 pr-4">נושא</th>
              </tr>
            </thead>
            <tbody>
              {(published ?? []).length === 0 && (
                <tr><td colSpan={2} className="py-4 text-muted-foreground text-center">{fetchError ? 'שגיאת טעינה' : 'טוען מ-GitHub...'}</td></tr>
              )}
              {(published ?? []).map((a) => (
                <tr key={a.url} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-3 pr-2 text-muted-foreground whitespace-nowrap">{a.date}</td>
                  <td className="py-3 pr-4">
                    <Link to={a.url} className="text-primary hover:underline font-medium">{a.title}</Link>
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

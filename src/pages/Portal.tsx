import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, FileText, Bot, TrendingUp, Calendar, Users, PhoneCall, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type LeadStatus = 'חדש' | 'נוצר קשר' | 'סגור' | 'לא רלוונטי';
type Lead = { id: number; name: string; phone: string; source: string; date: string; status: LeadStatus };

type ClientStatus = 'בביצוע' | 'ממתין ללקוח' | 'הושלם';
type Client = { id: number; name: string; project: string; status: ClientStatus; nextDelivery: string; paid: boolean };

// ── Mock data (replace with Supabase queries later) ───────────────────────────

const MOCK_LEADS: Lead[] = [
  { id: 1, name: 'דוד לוי', phone: '054-1234567', source: 'בוט', date: '13/06/2026', status: 'חדש' },
  { id: 2, name: 'מיכל כהן', phone: '050-9876543', source: 'טופס יצירת קשר', date: '11/06/2026', status: 'נוצר קשר' },
  { id: 3, name: 'יוסי אברהם', phone: '052-5551234', source: 'בוט', date: '08/06/2026', status: 'סגור' },
  { id: 4, name: 'רחל גולן', phone: '053-7778899', source: 'טופס יצירת קשר', date: '05/06/2026', status: 'לא רלוונטי' },
];

const MOCK_CLIENTS: Client[] = [
  { id: 1, name: 'עסק א׳ — קליניקת שיניים', project: 'אוטומציית WhatsApp + CRM', status: 'בביצוע', nextDelivery: '20/06/2026', paid: true },
  { id: 2, name: 'עסק ב׳ — סוכנות נדל"ן', project: 'מעקב לידים אוטומטי', status: 'ממתין ללקוח', nextDelivery: '25/06/2026', paid: false },
  { id: 3, name: 'עסק ג׳ — יועץ עסקי', project: 'דשבורד + דוחות', status: 'הושלם', nextDelivery: '—', paid: true },
];

// ── Status badges ──────────────────────────────────────────────────────────────

const LEAD_STATUS_STYLE: Record<LeadStatus, string> = {
  'חדש':          'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'נוצר קשר':    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'סגור':         'bg-primary/10 text-primary border-primary/20',
  'לא רלוונטי':  'bg-muted/50 text-muted-foreground border-border',
};

const CLIENT_STATUS_STYLE: Record<ClientStatus, string> = {
  'בביצוע':          'bg-primary/10 text-primary border-primary/20',
  'ממתין ללקוח':    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'הושלם':           'bg-muted/50 text-muted-foreground border-border',
};

// ── Portal ─────────────────────────────────────────────────────────────────────

const Portal = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">טוען...</div>
      </div>
    );
  }

  if (!user) return null;

  const isEHAutomation = user.email === 'eladauto66@gmail.com' || user.email === 'elad200226@gmail.com';

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-eh.png" alt="EH Automation" className="h-8" />
            <div>
              <div className="text-sm font-semibold text-foreground">פאנל {isEHAutomation ? 'ניהול' : 'לקוח'}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            יציאה
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            שלום{isEHAutomation ? ', אלעד' : ''} 👋
          </h1>
          <p className="text-muted-foreground">הפאנל האישי שלך — כל המידע במקום אחד.</p>
        </div>

        {isEHAutomation ? <EHAutomationPortal /> : <DefaultPortal />}
      </main>
    </div>
  );
};

// ── EH Automation full portal ──────────────────────────────────────────────────

const EHAutomationPortal = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clients'>('overview');

  return (
    <div className="space-y-6">

      {/* Tab nav */}
      <div className="flex gap-2 border-b border-border pb-0">
        {([
          { key: 'overview', label: 'סקירה כללית' },
          { key: 'leads',    label: 'לידים נכנסים' },
          { key: 'clients',  label: 'לקוחות פעילים' },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'leads'    && <LeadsTab />}
      {activeTab === 'clients'  && <ClientsTab />}
    </div>
  );
};

// ── Overview tab ───────────────────────────────────────────────────────────────

const OverviewTab = () => (
  <div className="space-y-8">

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'מאמרים פעילים',    value: '11',     icon: FileText,   color: 'text-primary' },
        { label: 'סוכנים פעילים',    value: '4',      icon: Bot,        color: 'text-primary' },
        { label: 'לידים החודש',       value: '4',      icon: PhoneCall,  color: 'text-blue-400' },
        { label: 'לקוחות פעילים',    value: '2',      icon: Users,      color: 'text-yellow-400' },
      ].map(s => (
        <div key={s.label} className="bg-muted/30 border border-border rounded-xl p-5">
          <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
          <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    {/* Quick links */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="/dashboard" className="group bg-muted/20 border border-border hover:border-primary/50 rounded-xl p-6 transition-all">
        <div className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">פאנל ניהול תוכן</div>
        <div className="text-sm text-muted-foreground">תוכנית עבודה, מאמרים וסוכנים</div>
        <div className="text-primary text-sm mt-4">פתח ←</div>
      </Link>
      <a href="https://claude.ai/code/routines" target="_blank" rel="noopener noreferrer" className="group bg-muted/20 border border-border hover:border-primary/50 rounded-xl p-6 transition-all">
        <div className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">סוכני פרסום</div>
        <div className="text-sm text-muted-foreground">ניהול 4 הסוכנים האוטומטיים</div>
        <div className="text-primary text-sm mt-4">פתח ←</div>
      </a>
      <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="group bg-muted/20 border border-border hover:border-primary/50 rounded-xl p-6 transition-all">
        <div className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Google Search Console</div>
        <div className="text-sm text-muted-foreground">מעקב חיפושים וביצועי SEO</div>
        <div className="text-primary text-sm mt-4">פתח ←</div>
      </a>
    </div>

    {/* Next articles */}
    <div className="bg-muted/30 border border-border rounded-xl p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">מאמרים הבאים בתור</h2>
      <div className="space-y-2">
        {[
          { date: '16/06', title: 'אוטומציה לנדל"ן' },
          { date: '25/06', title: 'AI לעסק קטן' },
          { date: '01/07', title: 'אוטומציה לקליניקות' },
          { date: '08/07', title: 'Chatbot לאתר עסקי' },
        ].map(a => (
          <div key={a.date} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12">{a.date}</span>
              <span className="text-sm text-foreground">{a.title}</span>
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">🤖 סוכן</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Leads tab ──────────────────────────────────────────────────────────────────

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  const updateStatus = (id: number, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const newCount = leads.filter(l => l.status === 'חדש').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">לידים נכנסים</h2>
          {newCount > 0 && (
            <p className="text-xs text-blue-400 mt-0.5">{newCount} לידים חדשים ממתינים לטיפול</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {leads.map(lead => (
          <div key={lead.id} className="bg-muted/20 border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-sm">{lead.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${LEAD_STATUS_STYLE[lead.status]}`}>{lead.status}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{lead.phone}</span>
                <span>מקור: {lead.source}</span>
                <span>{lead.date}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['חדש', 'נוצר קשר', 'סגור', 'לא רלוונטי'] as LeadStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(lead.id, s)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    lead.status === s
                      ? LEAD_STATUS_STYLE[s]
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Clients tab ────────────────────────────────────────────────────────────────

const ClientsTab = () => {
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  const statusIcon = (s: ClientStatus) => {
    if (s === 'בביצוע') return <Clock className="w-4 h-4 text-primary" />;
    if (s === 'ממתין ללקוח') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">לקוחות פעילים</h2>

      <div className="space-y-3">
        {clients.map(client => (
          <div key={client.id} className="bg-muted/20 border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  {statusIcon(client.status)}
                  <span className="font-semibold text-foreground text-sm">{client.name}</span>
                </div>
                <p className="text-xs text-muted-foreground pr-6">{client.project}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${CLIENT_STATUS_STYLE[client.status]}`}>
                  {client.status}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${client.paid ? 'bg-primary/10 text-primary border-primary/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {client.paid ? '✓ שולם' : '⏳ ממתין לתשלום'}
                </span>
              </div>
            </div>
            {client.nextDelivery !== '—' && (
              <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>אספקה הבאה: <strong className="text-foreground">{client.nextDelivery}</strong></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Default client portal ──────────────────────────────────────────────────────

const DefaultPortal = () => (
  <div className="bg-muted/20 border border-border rounded-2xl p-10 text-center">
    <div className="text-4xl mb-4">🚀</div>
    <h2 className="text-xl font-bold text-foreground mb-3">הפאנל שלך מוכן</h2>
    <p className="text-muted-foreground mb-6">אנחנו מגדירים את הפאנל האישי שלך. נחזור אליך בקרוב.</p>
    <a href="mailto:eladauto66@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm">
      צור קשר עם EH Automation
    </a>
  </div>
);

export default Portal;

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { FileText, Bot, Calendar, Users, PhoneCall, CheckCircle, Clock } from 'lucide-react';
import { AdminSidebar } from '@/components/AdminSidebar';

// ── Types ──────────────────────────────────────────────────────────────────────

type LeadStatus = 'חדש' | 'נוצר קשר' | 'סגור' | 'לא רלוונטי';
type Lead = {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: LeadStatus;
  created_at: string;
};

type ClientStatus = 'בביצוע' | 'ממתין ללקוח' | 'הושלם';
type Client = {
  id: string;
  name: string;
  email: string | null;
  project: string;
  status: ClientStatus;
  next_delivery: string | null;
  paid: boolean;
};

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

const formatDate = (iso: string | null) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

// ── Portal ─────────────────────────────────────────────────────────────────────

const Portal = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">טוען...</div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = user.email === 'eladauto66@gmail.com' || user.email === 'elad200226@gmail.com';

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AdminSidebar isAdmin={isAdmin} />

      <main className="md:mr-52 px-6 py-10">
        <div className="max-w-5xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              שלום{isAdmin ? ', אלעד' : ''} 👋
            </h1>
            <p className="text-muted-foreground">הפאנל האישי שלך — כל המידע במקום אחד.</p>
          </div>

          {isAdmin ? <AdminPortal /> : <ClientPortal email={user.email} />}
        </div>
      </main>
    </div>
  );
};

// ── Admin portal ───────────────────────────────────────────────────────────────

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clients'>('overview');

  return (
    <div className="space-y-6">
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

const OverviewTab = () => {
  const [counts, setCounts] = useState({ leads: 0, clients: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      (supabase as any).from('eh_clients').select('id', { count: 'exact', head: true }).neq('status', 'הושלם'),
    ]).then(([l, c]: any) => {
      setCounts({ leads: l?.count ?? 0, clients: c?.count ?? 0 });
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'מאמרים פעילים',  value: '11',              icon: FileText,  color: 'text-primary' },
          { label: 'סוכנים פעילים',  value: '4',               icon: Bot,       color: 'text-primary' },
          { label: 'לידים החודש',     value: String(counts.leads),   icon: PhoneCall, color: 'text-blue-400' },
          { label: 'לקוחות פעילים',  value: String(counts.clients), icon: Users,     color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="bg-muted/30 border border-border rounded-xl p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

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
};

// ── Leads tab ──────────────────────────────────────────────────────────────────

type Submission = {
  id: string;
  name: string;
  phone: string;
  business: string;
  automation_type: string;
  created_at: string;
};

const AUTOMATION_LABELS: Record<string, string> = {
  leads: 'ניהול לידים',
  quotes: 'הצעות מחיר',
  scheduling: 'תזמון פגישות',
  data: 'ניהול נתונים',
  custom: 'מותאם אישית',
};

const LeadsTab = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = () =>
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
        .then(({ data }) => {
          if (!mounted) return;
          if (data) setSubmissions(data as Submission[]);
          setLoading(false);
        });

    load();

    const channel = supabase
      .channel('contact_submissions-portal')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          setSubmissions(prev => {
            if (payload.eventType === 'INSERT') {
              const row = payload.new as Submission;
              if (prev.some(s => s.id === row.id)) return prev;
              return [row, ...prev];
            }
            if (payload.eventType === 'UPDATE') {
              const row = payload.new as Submission;
              return prev.map(s => s.id === row.id ? row : s);
            }
            if (payload.eventType === 'DELETE') {
              const row = payload.old as Submission;
              return prev.filter(s => s.id !== row.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <div className="text-muted-foreground text-sm">טוען לידים...</div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">לידים נכנסים מהאתר</h2>
        <p className="text-xs text-muted-foreground mt-0.5">סה״כ {submissions.length} פניות</p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">אין לידים עדיין</div>
      ) : (
        <div className="bg-muted/20 border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold text-foreground text-xs">שם</th>
                  <th className="px-4 py-3 font-semibold text-foreground text-xs">טלפון</th>
                  <th className="px-4 py-3 font-semibold text-foreground text-xs">עסק</th>
                  <th className="px-4 py-3 font-semibold text-foreground text-xs">סוג אוטומציה</th>
                  <th className="px-4 py-3 font-semibold text-foreground text-xs">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, i) => (
                  <tr key={s.id} className={`border-b border-border/40 last:border-0 ${i % 2 === 1 ? 'bg-muted/10' : ''}`}>
                    <td className="px-4 py-3 text-foreground font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <a href={`tel:${s.phone}`} className="hover:text-primary transition-colors" dir="ltr">{s.phone}</a>
                        <a
                          href={`https://wa.me/972${s.phone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(`שלום ${s.name}, מדבר אלעד מ-EH Automation בהמשך לפנייתך באתר.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#25D366] hover:bg-[#1fba59] text-white transition-colors"
                          title="שלח וואטסאפ"
                          aria-label="שלח וואטסאפ"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">{s.business}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {AUTOMATION_LABELS[s.automation_type] ?? s.automation_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{formatDate(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


// ── Clients tab ────────────────────────────────────────────────────────────────

const ClientsTab = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from('eh_clients').select('*').order('created_at', { ascending: false })
      .then(({ data }: any) => {
        if (data) setClients(data as Client[]);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: ClientStatus) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    await (supabase as any).from('eh_clients').update({ status }).eq('id', id);
  };

  const togglePaid = async (id: string, paid: boolean) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, paid } : c));
    await (supabase as any).from('eh_clients').update({ paid }).eq('id', id);
  };

  const statusIcon = (s: ClientStatus) => {
    if (s === 'בביצוע') return <Clock className="w-4 h-4 text-primary" />;
    if (s === 'ממתין ללקוח') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
  };

  if (loading) return <div className="text-muted-foreground text-sm">טוען לקוחות...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">לקוחות פעילים</h2>

      {clients.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">אין לקוחות עדיין</div>
      ) : (
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
                  {client.email && (
                    <p className="text-xs text-muted-foreground pr-6">{client.email}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1">
                    {(['בביצוע', 'ממתין ללקוח', 'הושלם'] as ClientStatus[]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(client.id, s)}
                        className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                          client.status === s
                            ? CLIENT_STATUS_STYLE[s]
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => togglePaid(client.id, !client.paid)}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                      client.paid
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    {client.paid ? '✓ שולם' : '⏳ ממתין לתשלום'}
                  </button>
                </div>
              </div>
              {client.next_delivery && (
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>אספקה הבאה: <strong className="text-foreground">{formatDate(client.next_delivery)}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Client portal (for non-admin users) ───────────────────────────────────────

const ClientLeadsTab = ({ email }: { email: string }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from('eh_leads').select('*').eq('owner_email', email).order('created_at', { ascending: false })
      .then(({ data }: any) => {
        if (data) setLeads(data as Lead[]);
        setLoading(false);
      });
  }, [email]);

  const updateStatus = async (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    await (supabase as any).from('eh_leads').update({ status }).eq('id', id);
  };

  const newCount = leads.filter(l => l.status === 'חדש').length;

  if (loading) return <div className="text-muted-foreground text-sm">טוען לידים...</div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">לידים נכנסים</h2>
        {newCount > 0 && (
          <p className="text-xs text-blue-400 mt-0.5">{newCount} לידים חדשים ממתינים לטיפול</p>
        )}
      </div>
      {leads.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">אין לידים עדיין</div>
      ) : (
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
                  <span>{formatDate(lead.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(['חדש', 'נוצר קשר', 'סגור', 'לא רלוונטי'] as LeadStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(lead.id, s)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      lead.status === s ? LEAD_STATUS_STYLE[s] : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ClientPortal = ({ email }: { email: string }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'project' | 'leads'>('project');

  useEffect(() => {
    (supabase as any).from('eh_clients').select('*').eq('email', email).single()
      .then(({ data }: any) => {
        if (data) setClient(data as Client);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <div className="text-muted-foreground text-sm">טוען...</div>;

  if (!client) {
    return (
      <div className="bg-muted/20 border border-border rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-xl font-bold text-foreground mb-3">הפאנל שלך מוכן</h2>
        <p className="text-muted-foreground mb-6">אנחנו מגדירים את הפאנל האישי שלך. נחזור אליך בקרוב.</p>
        <a href="mailto:eladauto66@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm">
          צור קשר עם EH Automation
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-0">
        {([
          { key: 'project', label: 'הפרויקט שלי' },
          { key: 'leads',   label: 'לידים נכנסים' },
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

      {activeTab === 'project' && (
        <div className="space-y-6">
          <div className="bg-muted/20 border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">הפרויקט שלך</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">שם הפרויקט</span>
                <span className="text-sm font-medium text-foreground">{client.project}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">סטטוס</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${CLIENT_STATUS_STYLE[client.status]}`}>{client.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">תשלום</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${client.paid ? 'bg-primary/10 text-primary border-primary/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {client.paid ? '✓ שולם' : '⏳ ממתין לתשלום'}
                </span>
              </div>
              {client.next_delivery && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">אספקה הבאה</span>
                  <span className="text-sm font-medium text-foreground">{formatDate(client.next_delivery)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <a href="mailto:eladauto66@gmail.com" className="text-sm text-primary hover:underline">
              צור קשר עם EH Automation
            </a>
          </div>
        </div>
      )}

      {activeTab === 'leads' && <ClientLeadsTab email={email} />}
    </div>
  );
};

export default Portal;

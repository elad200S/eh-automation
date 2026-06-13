import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, FileText, Bot, TrendingUp, Calendar } from 'lucide-react';

const Portal = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
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

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-eh.png" alt="EH Automation" className="h-8" />
            <div>
              <div className="text-sm font-semibold text-foreground">פאנל לקוח</div>
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

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            שלום{isEHAutomation ? ', EH Automation' : ''} 👋
          </h1>
          <p className="text-muted-foreground">הפאנל האישי שלך — כל המידע על הפרויקט שלך במקום אחד.</p>
        </div>

        {isEHAutomation ? <EHAutomationPortal /> : <DefaultPortal email={user.email} />}

      </main>
    </div>
  );
};

const EHAutomationPortal = () => (
  <div className="space-y-8">

    {/* Quick stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'מאמרים פעילים', value: '11', icon: FileText, color: 'text-primary' },
        { label: 'סוכנים פעילים', value: '4', icon: Bot, color: 'text-primary' },
        { label: 'פרסום הבא', value: '16/6', icon: Calendar, color: 'text-yellow-400' },
        { label: 'צפי כניסות/חודש', value: '1,600+', icon: TrendingUp, color: 'text-primary' },
      ].map((stat) => (
        <div key={stat.label} className="bg-muted/30 border border-border rounded-xl p-5">
          <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
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
      <div className="space-y-3">
        {[
          { date: '16/06', title: 'אוטומציה לנדל"ן', status: '🤖 סוכן' },
          { date: '25/06', title: 'AI לעסק קטן', status: '🤖 סוכן' },
          { date: '01/07', title: 'אוטומציה לקליניקות', status: '🤖 סוכן' },
          { date: '08/07', title: 'Chatbot לאתר עסקי', status: '🤖 סוכן' },
        ].map((a) => (
          <div key={a.date} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-12">{a.date}</span>
              <span className="text-sm text-foreground">{a.title}</span>
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">{a.status}</span>
          </div>
        ))}
      </div>
    </div>

  </div>
);

const DefaultPortal = ({ email }: { email?: string }) => (
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

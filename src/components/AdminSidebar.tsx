import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Globe, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

const adminItems: NavItem[] = [
  { label: 'פאנל ראשי',   href: '/portal',    icon: LayoutDashboard },
  { label: 'ניהול תוכן',  href: '/dashboard', icon: FileText },
];

const clientItems: NavItem[] = [
  { label: 'הפאנל שלי', href: '/portal', icon: LayoutDashboard },
];

export const AdminSidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const items = isAdmin ? adminItems : clientItems;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 right-0 h-full w-52 bg-card border-l border-border z-20 flex-col" dir="rtl">
        <div className="p-4 border-b border-border">
          <img src="/logo-hey.png" alt="HEY Digital" className="h-7" />
          <p className="text-xs text-muted-foreground mt-1.5">{isAdmin ? 'פאנל ניהול' : 'פאנל לקוח'}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-border/50">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Globe className="w-4 h-4 shrink-0" />
              חזרה לאתר
            </a>
          </div>
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          {user?.email && (
            <p className="text-xs text-muted-foreground px-3 py-1 truncate">{user.email}</p>
          )}
          <button
            onClick={async () => { await signOut(); navigate('/login'); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            יציאה
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur px-4 py-3 flex items-center justify-between" dir="rtl">
        <img src="/logo-hey.png" alt="HEY Digital" className="h-6" />
        <div className="flex items-center gap-3">
          {items.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-xs font-medium transition-colors ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={async () => { await signOut(); navigate('/login'); }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            יציאה
          </button>
        </div>
      </header>
    </>
  );
};

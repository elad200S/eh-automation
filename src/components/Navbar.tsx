import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { label: 'צ׳אט בוטים חכמים לעסקים', href: '/services/chatbots' },
  { label: 'בניית וארכיטקטורת CRM', href: '/services/crm' },
  { label: 'מערכות אוטומציה עסקיות', href: '/services/automation' },
  { label: 'סוכני AI חכמים', href: '/services/ai-agents' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-foreground">
          EH <span className="gradient-text">Automation</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            עמוד הבית
          </Link>

          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              שירותים
              <ChevronDown className={cn('w-4 h-4 transition-transform', dropdownOpen && 'rotate-180')} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setDropdownOpen(false)}
                    className={cn(
                      'block px-4 py-2.5 text-sm hover:bg-muted transition-colors',
                      location.pathname === s.href ? 'text-primary font-medium' : 'text-foreground'
                    )}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background pb-4 animate-fade-in">
          <div className="container flex flex-col gap-2 pt-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm text-foreground"
            >
              עמוד הבית
            </Link>
            <p className="text-xs font-semibold text-muted-foreground mt-2 mb-1">שירותים</p>
            {services.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'py-2 text-sm pr-4',
                  location.pathname === s.href ? 'text-primary font-medium' : 'text-foreground'
                )}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

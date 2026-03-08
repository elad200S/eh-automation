import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const solutions = [
  { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
  { label: 'אוטומציה עסקית', href: '/solutions/business-automation' },
  { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
  { label: 'אוטומציית CRM', href: '/solutions/crm-automation' },
  { label: 'אוטומציית תהליכי עבודה', href: '/solutions/workflow-automation' },
];

const industries = [
  { label: 'סוכנויות', href: '/industries/agencies' },
  { label: 'יועצים', href: '/industries/consultants' },
  { label: 'מאמנים', href: '/industries/coaches' },
  { label: 'נדל"ן', href: '/industries/real-estate' },
  { label: 'מסחר אלקטרוני', href: '/industries/ecommerce' },
];

const navItems = [
  { label: 'בית', href: '/' },
  { label: 'פתרונות', href: '/solutions', children: solutions },
  { label: 'תעשיות', href: '/industries', children: industries },
  { label: 'מקרי בוחן', href: '/case-studies' },
  { label: 'בלוג', href: '/blog' },
  { label: 'אודות', href: '/about' },
  { label: 'צור קשר', href: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-foreground">
          EH <span className="gradient-text">Automation</span>
        </Link>

        {/* Desktop nav */}
        <div ref={dropdownRef} className="hidden lg:flex items-center gap-5">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                  className={cn(
                    'flex items-center gap-1 text-sm transition-colors',
                    location.pathname.startsWith(item.href)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', openDropdown === item.href && 'rotate-180')} />
                </button>
                {openDropdown === item.href && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-sm font-medium text-primary hover:bg-muted transition-colors border-b border-border mb-1"
                    >
                      כל ה{item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'block px-4 py-2.5 text-sm hover:bg-muted transition-colors',
                          location.pathname === child.href ? 'text-primary font-medium' : 'text-foreground'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-sm transition-colors',
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}

          {/* CTA */}
          <Link
            to="/contact"
            className="mr-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            שיחת אסטרטגיה →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background pb-4 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container flex flex-col gap-1 pt-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                      className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground"
                    >
                      {item.label}
                      <ChevronDown className={cn('w-4 h-4 transition-transform', openDropdown === item.href && 'rotate-180')} />
                    </button>
                    {openDropdown === item.href && (
                      <div className="pr-4 pb-2 flex flex-col gap-1">
                        <Link to={item.href} className="py-2 text-sm text-primary font-medium">
                          כל ה{item.label}
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              'py-2 text-sm',
                              location.pathname === child.href ? 'text-primary font-medium' : 'text-muted-foreground'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'block py-2.5 text-sm',
                      location.pathname === item.href ? 'text-primary font-medium' : 'text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Link
              to="/contact"
              className="mt-3 text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
            >
              שיחת אסטרטגיה →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

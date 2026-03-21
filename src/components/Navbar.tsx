import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactPopup } from '@/contexts/ContactPopupContext';

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
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { openPopup } = useContactPopup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDownOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('touchstart', handlePointerDownOutside, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleMobileNavigate = (href: string) => {
    closeMobileMenu();

    if (location.pathname !== href) {
      navigate(href);
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 right-0 left-0 bg-background/90 backdrop-blur-md border-b border-border transition-shadow duration-300',
        mobileOpen ? 'z-[10002]' : 'z-50',
        scrolled && 'shadow-md'
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-foreground">
          EH <span className="gradient-text">Automation</span>
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                  className={cn(
                    'flex items-center gap-1 text-sm transition-all duration-200',
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
                  'text-sm transition-all duration-200',
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}

          <button
            type="button"
            onClick={openPopup}
            className="mr-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
          >
            שיחת אסטרטגיה →
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 top-16 bg-black/40 z-[10000] lg:hidden" onClick={closeMobileMenu} />

          <div
            id="mobile-navigation"
            className="fixed top-16 right-0 left-0 bottom-0 lg:hidden border-t border-border bg-background overflow-y-auto pb-4 z-[10001]"
          >
            <div className="container flex flex-col gap-1 pt-3">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                        className="flex items-center justify-between w-full min-h-14 py-3.5 px-3 text-base font-medium text-foreground active:bg-muted/50 rounded-lg transition-colors"
                      >
                        {item.label}
                        <ChevronDown className={cn('w-4 h-4 transition-transform', openDropdown === item.href && 'rotate-180')} />
                      </button>

                      {openDropdown === item.href && (
                        <div className="pr-4 pb-2 flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate(item.href)}
                            className="min-h-12 w-full flex items-center py-3 px-3 text-base text-primary font-medium active:bg-muted/50 rounded-lg transition-colors text-right"
                          >
                            כל ה{item.label}
                          </button>

                          {item.children.map((child) => (
                            <button
                              key={child.href}
                              type="button"
                              onClick={() => handleMobileNavigate(child.href)}
                              className={cn(
                                'min-h-12 w-full flex items-center py-3 px-3 text-base active:bg-muted/50 rounded-lg transition-colors text-right',
                                location.pathname === child.href ? 'text-primary font-medium' : 'text-muted-foreground'
                              )}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMobileNavigate(item.href)}
                      className={cn(
                        'min-h-14 w-full flex items-center py-3.5 px-3 text-base active:bg-muted/50 rounded-lg transition-colors text-right',
                        location.pathname === item.href ? 'text-primary font-medium' : 'text-foreground'
                      )}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openPopup();
                }}
                className="mt-3 text-center px-4 py-3.5 text-base font-medium rounded-lg bg-primary text-primary-foreground active:scale-[0.97] transition-all"
              >
                שיחת אסטרטגיה →
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

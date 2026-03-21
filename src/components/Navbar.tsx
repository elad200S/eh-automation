import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
] as const;

type NavItem = (typeof navItems)[number];

const DesktopDropdownItem = ({ item, pathname }: { item: NavItem; pathname: string }) => {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-1 py-2 text-sm transition-all duration-200',
          pathname.startsWith(item.href) ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} />
      </Link>

      {open && item.children && (
        <div className="absolute top-full right-0 mt-1 w-56 rounded-lg border border-border bg-popover py-2 shadow-lg animate-fade-in">
          <Link
            to={item.href}
            className="mb-1 block border-b border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-muted"
          >
            כל ה{item.label}
          </Link>
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className={cn(
                'block px-4 py-2.5 text-sm transition-colors hover:bg-muted',
                pathname === child.href ? 'text-primary font-medium' : 'text-foreground'
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileMenuPortal = ({
  mobileOpen,
  pathname,
  openDropdown,
  setOpenDropdown,
  onClose,
  onNavigate,
  onOpenPopup,
}: {
  mobileOpen: boolean;
  pathname: string;
  openDropdown: string | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onOpenPopup: () => void;
}) => {
  if (!mobileOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[10050] lg:hidden bg-background/98 backdrop-blur-md">
      <div className="flex h-full flex-col">
        <div className="border-b border-border">
          <div className="container flex h-16 items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors active:bg-muted/50"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>

            <Link to="/" onClick={onClose} className="text-xl font-bold text-foreground">
              EH <span className="gradient-text">Automation</span>
            </Link>
          </div>
        </div>

        <div className="container flex-1 overflow-y-auto overscroll-contain py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <div className="flex items-stretch rounded-xl border border-transparent">
                      <button
                        type="button"
                        onClick={() => onNavigate(item.href)}
                        className={cn(
                          'flex min-h-14 flex-1 items-center rounded-r-xl px-4 py-4 text-right text-base font-medium transition-colors active:bg-muted/50',
                          pathname.startsWith(item.href) ? 'text-primary' : 'text-foreground'
                        )}
                      >
                        {item.label}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown((current) => (current === item.href ? null : item.href))}
                        className="flex h-14 w-14 items-center justify-center rounded-l-xl text-muted-foreground transition-colors active:bg-muted/50"
                        aria-label={`${openDropdown === item.href ? 'Close' : 'Open'} ${item.label} submenu`}
                        aria-expanded={openDropdown === item.href}
                      >
                        <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', openDropdown === item.href && 'rotate-180')} />
                      </button>
                    </div>

                    {openDropdown === item.href && (
                      <div className="flex flex-col gap-1 pr-4 pb-2 pt-1">
                        {item.children.map((child) => (
                          <button
                            key={child.href}
                            type="button"
                            onClick={() => onNavigate(child.href)}
                            className={cn(
                              'flex min-h-12 w-full items-center rounded-lg px-4 py-3 text-right text-base transition-colors active:bg-muted/50',
                              pathname === child.href ? 'font-medium text-primary' : 'text-muted-foreground'
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
                    onClick={() => onNavigate(item.href)}
                    className={cn(
                      'flex min-h-14 w-full items-center rounded-xl px-4 py-4 text-right text-base transition-colors active:bg-muted/50',
                      pathname === item.href ? 'font-medium text-primary' : 'text-foreground'
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
                onClose();
                onOpenPopup();
              }}
              className="mt-3 rounded-xl bg-primary px-4 py-4 text-base font-medium text-primary-foreground transition-all active:scale-[0.97]"
            >
              שיחת אסטרטגיה →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openPopup } = useContactPopup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
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
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 border-b border-border bg-background/90 backdrop-blur-md transition-shadow duration-300',
          scrolled && 'shadow-md',
          mobileOpen ? 'z-[10040]' : 'z-50'
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            EH <span className="gradient-text">Automation</span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdownItem key={item.href} item={item} pathname={location.pathname} />
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'text-sm transition-all duration-200',
                    location.pathname === item.href ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            <button
              type="button"
              onClick={openPopup}
              className="mr-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:scale-[0.97]"
            >
              שיחת אסטרטגיה →
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors active:bg-muted/50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <MobileMenuPortal
        mobileOpen={mobileOpen}
        pathname={location.pathname}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        onClose={closeMobileMenu}
        onNavigate={handleMobileNavigate}
        onOpenPopup={openPopup}
      />
    </>
  );
};

export default Navbar;

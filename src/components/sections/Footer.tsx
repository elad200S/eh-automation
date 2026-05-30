import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const NEWSLETTER_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzKNGnoiCqfq7qBFTS1QvNbbSxROFKEjFtfX-aZ-qaudOa34Ov0PUwgw5asEa1yUWUoyg/exec';

function extractName(email: string): string {
  const local = email.split('@')[0] || '';
  return local
    .replace(/[._\-+]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const footerNav = [
  {
    title: 'פתרונות',
    links: [
      { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
      { label: 'אוטומציה עסקית', href: '/solutions/business-automation' },
      { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
      { label: 'אוטומציית CRM', href: '/solutions/crm-automation' },
      { label: 'אוטומציית תהליכי עבודה', href: '/solutions/workflow-automation' },
      { label: 'בניית אתרים', href: '/solutions/web-development' },
    ],
  },

  {
    title: 'החברה',
    links: [
      { label: 'אודות', href: '/about' },
      { label: 'בלוג', href: '/blog' },
      { label: 'צור קשר', href: '/contact' },
    ],
  },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1BzC7fVZH5/?mibextid=wwXIfr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/elad-automation',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/elad.archive?igsh=czhjYWgzZDJpdXgx&utm_source=qr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const Footer = () => {
  const { openPopup } = useContactPopup();
  const { ref, style } = useScrollReveal(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => setShowAnim(true), 30);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const name = extractName(email);
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', name);
    await fetch(NEWSLETTER_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div ref={ref} style={style} className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-bold text-foreground">
              EH <span className="gradient-text">Automation</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
              סטודיו לאוטומציה עסקית ובינה מלאכותית. אנחנו עוזרים לעסקים קטנים, סוכנויות ויועצים לבנות מערכות חכמות שעובדות בשבילם 24/7.
            </p>

            {/* Contact */}
            <ul className="mt-5 space-y-2">
              <li>
                <a href="tel:0547108219" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span dir="ltr">054-710-8219</span>
                </a>
              </li>
              <li>
                <a href="mailto:eladauto66@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>eladauto66@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/tLz26QNqvV2kMKsG8" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">חיים לסקוב 22, נתניה</a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{group.title}</h4>
              <nav className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Newsletter</p>
            {submitted ? (
              <div
                className={`transition-all duration-500 ${showAnim ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}
              >
                <div className="relative p-4 rounded-xl bg-primary/10 border border-primary/20 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-2 animate-bounce">🎉</div>
                    <p className="text-base font-bold text-foreground">Welcome!</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      אתה חלק מהמשפחה.<br />נשלח לך רק את הטוב ביותר.
                    </p>
                    <div className="mt-3 flex justify-center gap-1">
                      {['✦','✦','✦'].map((s, i) => (
                        <span key={i} className="text-primary text-xs animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="כתובת אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <input
                  type="tel"
                  required
                  placeholder="מספר טלפון"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {loading ? '...' : 'להרשמה'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            מוכנים לבנות מערכת אוטומציה חכמה?
          </p>
          <button
            onClick={openPopup}
            className="px-5 py-2.5 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            שיחת אסטרטגיה →
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EH Automation. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">מדיניות פרטיות</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">מדיניות Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

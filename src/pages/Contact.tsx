import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/1wnxhbnt67r06tawrqfh7lhgh1xtxcwe';
import { SEOHead, LocalBusinessSchema } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Section from '@/components/Section';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', phone: '', business: '', automationType: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidPhone = (phone: string): boolean => /^0[5-9][0-9]-?[0-9]{7}$/.test(phone.trim());
  const normalizePhone = (phone: string): string => phone.trim().replace(/-/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedBusiness = formData.business.trim();
    
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast({ title: 'שם לא תקין', description: 'השם חייב להכיל בין 2 ל-100 תווים', variant: 'destructive' });
      return;
    }
    if (!isValidPhone(formData.phone)) {
      toast({ title: 'מספר טלפון לא תקין', description: 'נא להזין מספר טלפון ישראלי תקין (לדוגמה: 050-1234567)', variant: 'destructive' });
      return;
    }
    if (trimmedBusiness.length < 2 || trimmedBusiness.length > 200) {
      toast({ title: 'סוג עיסוק לא תקין', description: 'סוג העיסוק חייב להכיל בין 2 ל-200 תווים', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: normalizePhone(formData.phone),
          business: formData.business.trim(),
          automation_type: formData.automationType || 'general',
          source: 'website',
          submitted_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      toast({ title: 'הטופס נשלח בהצלחה', description: 'ניצור איתך קשר בהקדם.' });
      setFormData({ name: '', phone: '', business: '', automationType: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({ title: 'שגיאה בשליחת הטופס', description: 'אנא נסה שוב מאוחר יותר.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="צור קשר | EH Automation"
        description="רוצים לדבר על אוטומציה לעסק? השאירו פרטים ונחזור אליכם תוך 24 שעות. שיחת אפיון ראשונית ללא עלות."
        path="/contact"
      />
      <LocalBusinessSchema />

      <Navbar />

      <main className="bg-background min-h-screen pt-16">
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary mb-3">צור קשר</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">בואו נדבר על העסק שלכם</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                שיחת אפיון ראשונית ללא עלות. נבין מה העסק צריך ונראה אם אנחנו יכולים לעזור.
              </p>
            </div>
          </div>
        </section>

        <Section id="contact-form">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-3">
                <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                  <h2 className="text-xl font-semibold text-foreground mb-6">השאירו פרטים</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">שם מלא *</label>
                      <input type="text" id="name" required minLength={2} maxLength={100} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="הזינו את שמכם" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">טלפון *</label>
                      <input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="050-1234567" dir="ltr" />
                    </div>
                    <div>
                      <label htmlFor="business" className="block text-sm font-medium text-foreground mb-2">סוג עיסוק *</label>
                      <input type="text" id="business" required minLength={2} maxLength={200} value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="לדוגמה: חברת שירותים, סוכנות דיגיטל..." />
                    </div>
                    <div>
                      <label htmlFor="automationType" className="block text-sm font-medium text-foreground mb-2">סוג האוטומציה המבוקשת *</label>
                      <select id="automationType" required value={formData.automationType} onChange={(e) => setFormData({ ...formData, automationType: e.target.value })} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                        <option value="">בחרו אפשרות</option>
                        <option value="ai-agents">סוכני AI</option>
                        <option value="business-automation">אוטומציה עסקית</option>
                        <option value="whatsapp">אוטומציית WhatsApp</option>
                        <option value="crm">אוטומציית CRM</option>
                        <option value="workflows">אוטומציית תהליכי עבודה</option>
                        <option value="custom">תהליך מותאם אישית</option>
                      </select>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-[#3b82f6] via-[#2563eb] to-[#1e40af] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? <span className="animate-pulse">שולח...</span> : (
                        <>קביעת שיחה<ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </form>
                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span>אפיון ללא התחייבות</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span>מענה תוך 24 שעות</span>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="md:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">WhatsApp</h3>
                      <p className="text-xs text-muted-foreground">מענה מהיר</p>
                    </div>
                  </div>
                  <a href="https://wa.link/kw53y2" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] font-medium text-sm hover:bg-[#25D366]/20 transition-colors">
                    שלחו הודעה ב-WhatsApp
                  </a>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">פרטי קשר</h3>
                  <ul className="space-y-3">
                    <li><a href="tel:0547108219" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"><Phone className="w-4 h-4 flex-shrink-0" /><span dir="ltr">054-710-8219</span></a></li>
                    <li><a href="mailto:eladauto66@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"><Mail className="w-4 h-4 flex-shrink-0" /><span>eladauto66@gmail.com</span></a></li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>חיים לסקוב 22, נתניה</span></li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">מה קורה אחרי שתשלחו?</h3>
                  <ol className="space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-primary">1</span></span>
                      נקרא את הפנייה ונבין את הצרכים
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-primary">2</span></span>
                      ניצור קשר תוך 24 שעות לקביעת שיחה
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-primary">3</span></span>
                      בשיחה נמפה את התהליכים ונראה אם יש התאמה
                    </li>
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </Section>

        <Footer />
      </main>
    </>
  );
};

export default Contact;

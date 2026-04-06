import { useState } from 'react';
import Section from '@/components/Section';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/mkf9676ndwn4v1s2cm6tllxyrlqxi2nj';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    automationType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^0[5-9][0-9]-?[0-9]{7}$/;
    return phoneRegex.test(phone.trim());
  };

  const normalizePhone = (phone: string): string => {
    return phone.trim().replace(/-/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = formData.name.trim();
    
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast({ title: 'שם לא תקין', description: 'השם חייב להכיל בין 2 ל-100 תווים', variant: 'destructive' });
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      toast({ title: 'מספר טלפון לא תקין', description: 'נא להזין מספר טלפון ישראלי תקין (לדוגמה: 050-1234567)', variant: 'destructive' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload: Record<string, string> = {
        full_name: formData.name.trim(),
        phone: normalizePhone(formData.phone),
        form_type: 'main_form',
      };
      const biz = formData.business.trim();
      if (biz) payload.improvement_goal = biz;

      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <Section id="contact" withSeparator={false}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
          בוא נבדוק מה יכול להתאים לעסק שלך
        </h2>
        
        <p className="text-muted-foreground text-center mb-12">
          שיחת היכרות קצרה, בלי התחייבות
        </p>
        
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                id="name"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="הזינו את שמכם"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                טלפון *
              </label>
              <input
                type="tel"
                id="phone"
                required
                pattern="^0[5-9][0-9]-?[0-9]{7}$"
                title="נא להזין מספר טלפון ישראלי תקין (לדוגמה: 050-1234567)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="050-1234567"
                dir="ltr"
              />
            </div>
            
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-foreground mb-2">
                מה היית רוצה לייעל בעסק?
              </label>
              <textarea
                id="business"
                rows={3}
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="לדוגמה: ניהול לידים, מעקב לקוחות, תהליכי עבודה..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-gradient group w-full"
            >
              {isSubmitting ? (
                <span className="animate-pulse">שולח...</span>
              ) : (
                <>
                  קביעת שיחת אפיון
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>אפיון ראשוני – ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>מענה מיידי (בכל זאת אוטומציה)</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;

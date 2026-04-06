import { useState } from 'react';
import { X, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { useToast } from '@/hooks/use-toast';
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/mkf9676ndwn4v1s2cm6tllxyrlqxi2nj';

const ContactPopup = () => {
  const { isOpen, closePopup } = useContactPopup();
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
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name.trim(),
          phone: normalizePhone(formData.phone),
          business: formData.business.trim(),
          automation_type: formData.automationType,
        });

      if (error) throw error;

      toast({ title: 'הטופס נשלח בהצלחה', description: 'ניצור איתך קשר בהקדם.' });
      setFormData({ name: '', phone: '', business: '', automationType: '' });
      closePopup();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({ title: 'שגיאה בשליחת הטופס', description: 'אנא נסה שוב מאוחר יותר.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePopup} />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in z-10">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 left-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
          aria-label="סגירה"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">
            שיחת אפיון לאוטומציה עסקית
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            מלאו את הפרטים ונחזור אליכם לשיחה ראשונית
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="popup-name" className="block text-sm font-medium text-foreground mb-1.5">
                שם מלא *
              </label>
              <input
                type="text"
                id="popup-name"
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
              <label htmlFor="popup-phone" className="block text-sm font-medium text-foreground mb-1.5">
                טלפון *
              </label>
              <input
                type="tel"
                id="popup-phone"
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
              <label htmlFor="popup-business" className="block text-sm font-medium text-foreground mb-1.5">
                סוג עיסוק *
              </label>
              <input
                type="text"
                id="popup-business"
                required
                minLength={2}
                maxLength={200}
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="לדוגמה: חברת שירותים, מסחר אלקטרוני..."
              />
            </div>

            <div>
              <label htmlFor="popup-automationType" className="block text-sm font-medium text-foreground mb-1.5">
                סוג האוטומציה המבוקשת *
              </label>
              <select
                id="popup-automationType"
                required
                value={formData.automationType}
                onChange={(e) => setFormData({ ...formData, automationType: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">בחרו אפשרות</option>
                <option value="leads">אוטומציה ללידים</option>
                <option value="quotes">אוטומציה להצעות מחיר</option>
                <option value="scheduling">אוטומציה לקביעת תורים</option>
                <option value="data">אוטומציה לניהול נתונים</option>
                <option value="custom">תהליך מותאם אישית</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-l from-primary to-primary/90 text-primary-foreground rounded-xl font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">שולח...</span>
              ) : (
                <>
                  קביעת שיחה
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>מענה מיידי</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;

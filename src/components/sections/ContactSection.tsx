import { useState } from 'react';
import Section from '@/components/Section';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    automationType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'הטופס נשלח בהצלחה',
      description: 'ניצור איתך קשר בהקדם.',
    });
    
    setFormData({ name: '', phone: '', business: '', automationType: '' });
    setIsSubmitting(false);
  };

  return (
    <Section id="contact" withSeparator={false}>
      <div className="max-w-2xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
          שיחת איפיון לאוטומציה עסקית
        </h2>
        
        <p className="text-muted-foreground text-center mb-12">
          מלאו את הפרטים ונחזור אליכם לשיחה ראשונית
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="050-0000000"
                dir="ltr"
              />
            </div>
            
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-foreground mb-2">
                סוג עיסוק *
              </label>
              <input
                type="text"
                id="business"
                required
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="לדוגמה: חברת שירותים, מסחר אלקטרוני..."
              />
            </div>
            
            <div>
              <label htmlFor="automationType" className="block text-sm font-medium text-foreground mb-2">
                סוג האוטומציה המבוקשת *
              </label>
              <select
                id="automationType"
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
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-primary to-primary/90 text-primary-foreground rounded-xl font-medium text-lg shadow-lg glow-primary hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">שולח...</span>
                </>
              ) : (
                <>
                  קביעת שיחה
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          {/* Trust indicators */}
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
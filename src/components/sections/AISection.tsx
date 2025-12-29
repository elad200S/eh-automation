import Section from '@/components/Section';
import { Brain, Database, GitBranch } from 'lucide-react';

const AISection = () => {
  return (
    <Section id="ai">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 06
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          איך אוטומציה ובינה מלאכותית התחברו למהפכה אחת
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          המעבר מאוטומציה מבוססת כללים קבועים למערכות חכמות
          שמקבלות החלטות על בסיס נתונים, מאפשר גמישות ודיוק
          שלא היו אפשריים קודם.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 border-r-2 border-primary bg-background-secondary rounded-l-lg">
            <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">קבלת החלטות</h3>
              <p className="text-muted-foreground">מערכות שלומדות מדפוסים ומתאימות את עצמן באופן דינמי.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 border-r-2 border-primary/60 bg-background-secondary rounded-l-lg">
            <Database className="w-6 h-6 text-primary/80 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">ניתוח נתונים</h3>
              <p className="text-muted-foreground">עיבוד מידע בזמן אמת והסקת מסקנות אוטומטית.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 border-r-2 border-primary/40 bg-background-secondary rounded-l-lg">
            <GitBranch className="w-6 h-6 text-primary/60 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">זרימות עבודה דינמיות</h3>
              <p className="text-muted-foreground">תהליכים שמשתנים על פי הקשר ותנאים משתנים.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AISection;

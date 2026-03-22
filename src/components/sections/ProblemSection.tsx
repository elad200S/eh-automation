import Section from '@/components/Section';

const ProblemSection = () => {
  return (
    <Section id="problem">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          מרגיש שהעסק עובד אבל לא באמת מסודר?
        </h2>
        
        <div className="bg-card rounded-2xl border border-border p-8 text-right space-y-4">
          <p className="text-foreground/90 leading-relaxed">לידים נכנסים ממקומות שונים</p>
          <p className="text-foreground/90 leading-relaxed">אין מעקב ברור</p>
          <p className="text-foreground/90 leading-relaxed">דברים נופלים בין הכיסאות</p>
          <p className="text-foreground/90 leading-relaxed">יותר מדי עבודה ידנית</p>
          
          <div className="pt-4 border-t border-border">
            <p className="text-foreground font-medium">
              התוצאה: בזבוז זמן, איבוד כסף וחוסר שליטה
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProblemSection;

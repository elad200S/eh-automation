import Section from '@/components/Section';

const useCases = [
  {
    title: 'אוטומציה ללידים בעסק',
    description: 'קליטת לידים אוטומטית, סיווג והפניה לאיש המכירות המתאים.',
  },
  {
    title: 'אוטומציה להצעות מחיר',
    description: 'יצירה, שליחה ומעקב אחר הצעות מחיר ללא מגע יד.',
  },
  {
    title: 'אוטומציה לקביעת תורים',
    description: 'סנכרון לוחות זמנים, תזכורות ועדכונים אוטומטיים.',
  },
  {
    title: 'אוטומציה לניהול נתונים',
    description: 'העברת מידע בין מערכות, עדכון אוטומטי ודוחות.',
  },
];

const UseCasesSection = () => {
  return (
    <Section id="use-cases">
      <div className="max-w-4xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 05
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          אוטומציות בפועל
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-8 bg-background-secondary rounded-lg border border-border-subtle hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xl font-medium text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default UseCasesSection;

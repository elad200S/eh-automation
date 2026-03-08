import Section from '@/components/Section';

const concepts = [
  {
    title: 'אוטומציה עסקית',
    description: 'חיבור מערכות, ייעול תהליכים והעברת מידע אוטומטית בין כלים דיגיטליים.',
  },
  {
    title: 'סוכני AI',
    description: 'בוטים חכמים שמנהלים שיחות, עונים ללקוחות ומבצעים פעולות בזמן אמת.',
  },
  {
    title: 'תשתית מערכות',
    description: 'בניית CRM, תהליכי מכירה וניהול לקוחות שעובדים יחד בצורה חלקה.',
  },
];

const ValuePropositionSection = () => {
  return (
    <Section id="value-proposition" className="pt-8 md:pt-10">
      <div className="max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary mb-2">סטודיו לאוטומציה</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            בונים מערכות שעובדות במקומכם
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            EH Automation הוא סטודיו לאוטומציה עסקית ובינה מלאכותית. אנחנו עוזרים לעסקים קטנים, 
            סוכנויות ויועצים לבנות תשתית טכנולוגית שמחליפה תהליכים ידניים במערכות חכמות.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {concepts.map((concept, index) => (
            <div key={index} className="p-6 bg-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm font-semibold text-primary">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{concept.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ValuePropositionSection;

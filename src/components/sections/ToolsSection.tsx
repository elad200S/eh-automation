import Section from '@/components/Section';

const tools = [
  { name: 'Make', logo: 'M' },
  { name: 'Airtable', logo: 'A' },
  { name: 'Google Sheets', logo: 'G' },
  { name: 'WhatsApp', logo: 'W' },
  { name: 'Telegram', logo: 'T' },
  { name: 'CRM', logo: 'C' },
];

const ToolsSection = () => {
  return (
    <Section id="tools">
      <div className="max-w-4xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 04
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          כלים ופלטפורמות לאוטומציה עסקית
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="aspect-square flex flex-col items-center justify-center p-4 bg-background-secondary rounded-lg border border-border-subtle hover:border-border transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-2">
                <span className="text-xl font-mono font-semibold text-primary">{tool.logo}</span>
              </div>
              <span className="text-xs text-muted-foreground">{tool.name}</span>
            </div>
          ))}
        </div>
        
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          עבודה עם פלטפורמות אוטומציה מובילות מאפשרת בניית תהליכים יציבים, סקיילביליים ומבוססי דאטה.
        </p>
      </div>
    </Section>
  );
};

export default ToolsSection;

import { useState } from 'react';
import Section from '@/components/Section';

const toolCategories = [
  {
    name: 'תקשורת',
    tools: [
      { 
        name: 'WhatsApp', 
        color: '#25D366',
        usage: 'שליחת הודעות אוטומטיות ללקוחות, תזכורות ועדכוני סטטוס'
      },
      { 
        name: 'Telegram', 
        color: '#0088cc',
        usage: 'התראות פנימיות לצוות, בוטים לניהול משימות'
      },
      { 
        name: 'Gmail', 
        color: '#EA4335',
        usage: 'אוטומציה של מיילים, מעקב ומענה אוטומטי'
      },
    ]
  },
  {
    name: 'נתונים',
    tools: [
      { 
        name: 'Airtable', 
        color: '#18BFFF',
        usage: 'בסיס נתונים גמיש לניהול לידים, פרויקטים ותהליכים'
      },
      { 
        name: 'Google Sheets', 
        color: '#34A853',
        usage: 'דוחות אוטומטיים, סנכרון נתונים בין מערכות'
      },
      { 
        name: 'Notion', 
        color: '#000000',
        usage: 'מרכז ידע ותיעוד תהליכים, ניהול פרויקטים'
      },
    ]
  },
  {
    name: 'תפעול',
    tools: [
      { 
        name: 'Make', 
        color: '#6D00CC',
        usage: 'בניית זרימות עבודה מורכבות וחיבור בין מערכות'
      },
      { 
        name: 'Calendly', 
        color: '#006BFF',
        usage: 'קביעת פגישות אוטומטית וסנכרון יומנים'
      },
      { 
        name: 'Stripe', 
        color: '#635BFF',
        usage: 'תשלומים אוטומטיים, חשבוניות ומעקב הכנסות'
      },
    ]
  },
  {
    name: 'CRM',
    tools: [
      { 
        name: 'HubSpot', 
        color: '#FF7A59',
        usage: 'ניהול לקוחות, משפכי מכירות ואוטומציה שיווקית'
      },
      { 
        name: 'Monday', 
        color: '#FF3D57',
        usage: 'ניהול פרויקטים, משימות ותהליכי עבודה'
      },
      { 
        name: 'Pipedrive', 
        color: '#25292C',
        usage: 'מעקב דילים, ניהול צינור מכירות אוטומטי'
      },
    ]
  },
];

const ToolsSection = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <Section id="tools">
      <div className="max-w-5xl">
        <div className="text-technical mb-4">
          <span className="text-primary font-semibold">//</span> 04
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          כלים ופלטפורמות לאוטומציה עסקית
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12">
          אלו הכלים והמערכות שמהם נבנית תשתית האוטומציה בפועל.
        </p>
        
        <div className="space-y-8">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-border" />
                {category.name}
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="relative group"
                    onMouseEnter={() => setHoveredTool(`${categoryIndex}-${toolIndex}`)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <div className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${tool.color}15` }}
                      >
                        <span 
                          className="text-xl font-bold"
                          style={{ color: tool.color }}
                        >
                          {tool.name[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground block">{tool.name}</span>
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className={`absolute z-20 bottom-full mb-2 right-0 w-64 p-3 bg-card rounded-lg border border-border shadow-xl transition-all duration-200 ${
                      hoveredTool === `${categoryIndex}-${toolIndex}` 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      <p className="text-sm text-foreground font-medium mb-1">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{tool.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-12">
          עבודה עם פלטפורמות אוטומציה מובילות מאפשרת בניית תהליכים יציבים, סקיילביליים ומבוססי דאטה.
        </p>
      </div>
    </Section>
  );
};

export default ToolsSection;
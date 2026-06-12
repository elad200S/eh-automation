import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import RevealText from '@/components/RevealText';

type ToolEntry = {
  name: string;
  weight: number;
  spacing: string;
  upper?: boolean;
  lower?: boolean;
  mono?: boolean;
  italic?: boolean;
  size: string;
  color?: string;
};

// Mix of sizes, weights and styles — screaming contrast like premium marquees
const tools: ToolEntry[] = [
  { name: 'WhatsApp',        weight: 800, spacing: '-0.03em', size: '1.55rem', upper: false },
  { name: 'Gmail',           weight: 300, spacing: '0.18em',  size: '0.85rem', upper: true  },
  { name: 'HubSpot',         weight: 900, spacing: '-0.04em', size: '1.8rem',  italic: true },
  { name: 'Google Sheets',   weight: 300, spacing: '0.06em',  size: '0.9rem'  },
  { name: 'MAKE',            weight: 900, spacing: '0.08em',  size: '1.4rem',  upper: true, mono: true },
  { name: 'n8n',             weight: 800, spacing: '0.02em',  size: '2rem',    mono: true  },
  { name: 'Airtable',        weight: 300, spacing: '0.05em',  size: '0.95rem', italic: true },
  { name: 'Calendly',        weight: 800, spacing: '-0.03em', size: '1.6rem'  },
  { name: 'Google Calendar', weight: 300, spacing: '0.1em',   size: '0.85rem', upper: true },
  { name: 'ZAPIER',          weight: 900, spacing: '-0.04em', size: '2rem',    upper: true, italic: true },
  { name: 'slack',           weight: 300, spacing: '0.08em',  size: '0.9rem',  lower: true },
  { name: 'Stripe',          weight: 900, spacing: '-0.04em', size: '1.75rem' },
];

const duplicatedTools = [...tools, ...tools];

const ToolsSection = () => {
  const { ref: subtitleRef, style: subtitleStyle } = useScrollReveal<HTMLParagraphElement>(0);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isPaused     = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollPos = 0;
    const speed = 1.1;
    const animate = () => {
      if (!isPaused.current && el) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
        el.scrollLeft = scrollPos;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  return (
    <Section id="tools">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">אינטגרציות</p>
        <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          מתחבר למערכות שכבר יש לך
        </RevealText>
        <p ref={subtitleRef} style={subtitleStyle} className="text-muted-foreground max-w-xl mx-auto">
          אין צורך להחליף את כל מה שעובד. המערכת נבנית סביב הכלים הקיימים ומחברת ביניהם בצורה חכמה.
        </p>
      </div>

      {/* Dark marquee strip — lusion.co style */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: 'hsl(220,15%,11%)',
        }}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        <div
          ref={scrollRef}
          className="overflow-hidden py-5"
          style={{ direction: 'ltr' }}
        >
          <div className="flex items-center w-max">
            {duplicatedTools.map((tool, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="whitespace-nowrap cursor-default select-none px-6 transition-colors duration-200"
                  style={{
                    fontWeight: tool.weight,
                    fontFamily: tool.mono ? '"IBM Plex Mono", monospace' : 'Heebo, sans-serif',
                    fontStyle: tool.italic ? 'italic' : 'normal',
                    letterSpacing: tool.spacing,
                    fontSize: tool.size,
                    textTransform: tool.upper ? 'uppercase' : tool.lower ? 'lowercase' : 'none',
                    color: tool.weight >= 800
                      ? 'hsl(215,20%,88%)'
                      : 'hsl(215,20%,52%)',
                    lineHeight: 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = 'hsl(160,84%,60%)'; }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLSpanElement).style.color = tool.weight >= 800
                      ? 'hsl(215,20%,88%)'
                      : 'hsl(215,20%,52%)';
                  }}
                >
                  {tool.name}
                </span>
                <span
                  className="select-none"
                  style={{ color: 'hsl(220,15%,25%)', fontSize: '0.7rem', flexShrink: 0 }}
                >
                  /
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ToolsSection;

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
  size?: string;
};

const tools: ToolEntry[] = [
  { name: 'WhatsApp',        weight: 600, spacing: '-0.01em', size: '1.15rem' },
  { name: 'Gmail',           weight: 400, spacing: '0.07em',  size: '1.05rem' },
  { name: 'HubSpot',         weight: 700, spacing: '-0.02em', size: '1.2rem'  },
  { name: 'Google Sheets',   weight: 300, spacing: '0.04em',  size: '1rem'    },
  { name: 'MAKE',            weight: 500, spacing: '0.14em',  size: '0.95rem', upper: true, mono: true },
  { name: 'n8n',             weight: 800, spacing: '0.02em',  size: '1.25rem', mono: true  },
  { name: 'Airtable',        weight: 400, spacing: '0.03em',  size: '1.1rem'  },
  { name: 'Calendly',        weight: 600, spacing: '-0.015em',size: '1.15rem' },
  { name: 'Google Calendar', weight: 300, spacing: '0.04em',  size: '1rem'    },
  { name: 'ZAPIER',          weight: 800, spacing: '-0.01em', size: '1.2rem',  upper: true },
  { name: 'slack',           weight: 500, spacing: '0.01em',  size: '1.15rem', lower: true },
  { name: 'Stripe',          weight: 600, spacing: '-0.01em', size: '1.2rem'  },
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
          borderTop: '1px solid hsl(220,15%,18%)',
          borderBottom: '1px solid hsl(220,15%,18%)',
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
                  className="whitespace-nowrap cursor-default select-none px-7 transition-colors duration-200"
                  style={{
                    fontWeight: tool.weight,
                    fontFamily: tool.mono ? '"IBM Plex Mono", monospace' : 'Heebo, sans-serif',
                    letterSpacing: tool.spacing,
                    fontSize: tool.size ?? '1.1rem',
                    textTransform: tool.upper ? 'uppercase' : tool.lower ? 'lowercase' : 'none',
                    color: 'hsl(215,20%,72%)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = 'hsl(160,84%,55%)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = 'hsl(215,20%,72%)'; }}
                >
                  {tool.name}
                </span>
                <span
                  className="select-none"
                  style={{ color: 'hsl(220,15%,30%)', fontSize: '0.75rem', flexShrink: 0 }}
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

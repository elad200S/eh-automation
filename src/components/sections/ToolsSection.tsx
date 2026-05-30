import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import RevealText from '@/components/RevealText';

const tools = [
  { name: 'WhatsApp',        weight: 700, spacing: '-0.01em', upper: false, mono: false },
  { name: 'Gmail',           weight: 400, spacing: '0.06em',  upper: false, mono: false },
  { name: 'HubSpot',         weight: 700, spacing: '-0.02em', upper: false, mono: false },
  { name: 'Google Sheets',   weight: 300, spacing: '0.04em',  upper: false, mono: false },
  { name: 'Make',            weight: 500, spacing: '0.12em',  upper: true,  mono: true  },
  { name: 'n8n',             weight: 700, spacing: '0.01em',  upper: false, mono: true  },
  { name: 'Airtable',        weight: 400, spacing: '0.02em',  upper: false, mono: false },
  { name: 'Calendly',        weight: 600, spacing: '-0.01em', upper: false, mono: false },
  { name: 'Google Calendar', weight: 300, spacing: '0.03em',  upper: false, mono: false },
  { name: 'Zapier',          weight: 700, spacing: '0.01em',  upper: false, mono: false },
  { name: 'Slack',           weight: 400, spacing: '0.05em',  upper: false, mono: false },
  { name: 'Stripe',          weight: 600, spacing: '-0.01em', upper: false, mono: false },
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
    const speed = 1.3;
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
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">אינטגרציות</p>
        <RevealText className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          מתחבר למערכות שכבר יש לך
        </RevealText>
        <p ref={subtitleRef} style={subtitleStyle} className="text-muted-foreground mb-10 max-w-xl mx-auto">
          אין צורך להחליף את כל מה שעובד. המערכת נבנית סביב הכלים הקיימים ומחברת ביניהם בצורה חכמה.
        </p>

        <div
          ref={scrollRef}
          className="overflow-hidden"
          style={{ direction: 'ltr' }}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <div className="flex items-center w-max">
            {duplicatedTools.map((tool, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="whitespace-nowrap cursor-default select-none px-7 transition-colors duration-200 hover:text-primary"
                  style={{
                    fontWeight: tool.weight,
                    fontFamily: tool.mono ? '"IBM Plex Mono", monospace' : 'Heebo, sans-serif',
                    letterSpacing: tool.spacing,
                    textTransform: tool.upper ? 'uppercase' : 'none',
                    fontSize: '1.15rem',
                    color: 'hsl(215,20%,72%)',
                  }}
                >
                  {tool.name}
                </span>
                <span
                  className="select-none"
                  style={{ color: 'hsl(215,20%,28%)', fontSize: '0.5rem' }}
                >
                  ◆
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

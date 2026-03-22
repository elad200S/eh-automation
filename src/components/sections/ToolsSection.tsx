import { useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import { useIsMobile } from '@/hooks/use-mobile';
import gmailIcon from '@/assets/icons/gmail.png';

// SVG Brand Logos
const MakeLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#6D00CC" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-5.5 28.5l-7-7 7-7 2.8 2.8-4.2 4.2 4.2 4.2-2.8 2.8zm11 0l-2.8-2.8 4.2-4.2-4.2-4.2 2.8-2.8 7 7-7 7z"/>
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect fill="#EA4B71" rx="10" width="48" height="48"/>
    <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">n8n</text>
  </svg>
);

const AirtableLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#FCB400" d="M23.06 6.24L4.65 14.13c-.91.39-.89 1.68.03 2.04l18.48 7.59c.52.21 1.11.21 1.63 0l18.48-7.59c.92-.36.94-1.65.03-2.04L24.9 6.24a2.21 2.21 0 00-1.84 0z"/>
    <path fill="#18BFFF" d="M25.09 26.63V44.4c0 .85.88 1.42 1.65 1.07l17.54-7.74c.47-.21.77-.67.77-1.18V18.78c0-.85-.88-1.42-1.65-1.07l-17.54 7.74a1.3 1.3 0 00-.77 1.18z"/>
    <path fill="#F82B60" d="M22.91 26.63V44.4c0 .85-.88 1.42-1.65 1.07L3.72 37.73a1.3 1.3 0 01-.77-1.18V18.78c0-.85.88-1.42 1.65-1.07l17.54 7.74c.47.21.77.67.77 1.18z"/>
  </svg>
);

const GoogleSheetsLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#43A047" d="M37 45H11c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h19l10 10v29c0 1.66-1.34 3-3 3z"/>
    <path fill="#C8E6C9" d="M40 13H30V3l10 10z"/>
    <path fill="#2E7D32" d="M30 13l10 10V13z"/>
    <path fill="#E8F5E9" d="M31 23H17v14h14V23zm-12 2h4v4h-4v-4zm0 6h4v4h-4v-4zm6-6h4v4h-4v-4zm0 6h4v4h-4v-4z"/>
  </svg>
);

const WhatsAppLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#25D366" d="M24 4C12.95 4 4 12.95 4 24c0 3.54.93 6.87 2.55 9.76L4 44l10.56-2.77A19.88 19.88 0 0024 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"/>
    <path fill="#fff" d="M34.55 29.25c-.45-.22-2.65-1.31-3.06-1.46-.41-.15-.71-.22-1.01.22-.3.45-1.16 1.46-1.42 1.76-.26.3-.52.34-.97.11-.45-.22-1.9-.7-3.62-2.24-1.34-1.19-2.24-2.67-2.5-3.12-.26-.45-.03-.69.2-.91.2-.2.45-.52.67-.78.22-.26.3-.45.45-.75.15-.3.08-.56-.04-.78-.11-.22-1.01-2.44-1.39-3.34-.37-.88-.74-.76-1.01-.78-.26-.01-.56-.01-.86-.01-.3 0-.78.11-1.19.56-.41.45-1.56 1.53-1.56 3.72 0 2.2 1.6 4.32 1.82 4.62.22.3 3.14 4.79 7.61 6.72 1.06.46 1.89.73 2.54.94.85.27 1.62.23 2.23.14.68-.1 2.09-.86 2.39-1.68.3-.82.3-1.53.21-1.68-.09-.15-.34-.24-.71-.41z"/>
  </svg>
);

const HubSpotLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#FF7A59" d="M36.5 19.9v-5.65a3.25 3.25 0 10-2.6 0v5.65a7.8 7.8 0 00-4.15 2.35l-10.9-7.1a4.7 4.7 0 10-1.5 2.3l10.9 7.1a7.8 7.8 0 101.5 9.15l-10.9 7.1a4.7 4.7 0 101.5 2.3l10.9-7.1a7.8 7.8 0 004.15 2.35v5.65a3.25 3.25 0 102.6 0v-5.65a7.8 7.8 0 000-13.45z"/>
    <circle cx="35.2" cy="26.6" r="5.2" fill="#FF7A59"/>
  </svg>
);

const CalendlyLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#006BFF" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z"/>
    <path fill="#fff" d="M32 16H16c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2zm-2 4v2h-4v-2h4zm-6 0v2h-4v-2h4zm-6 0v2h-2v-2h2zm0 4v2h-2v-2h2zm0 4v2h-2v-2h2zm4-4v2h-4v-2h4zm0 4v2h-4v-2h4zm6-4v2h-4v-2h4zm0 4v2h-4v-2h4zm4-4v2h-2v-2h2zm0 4v2h-2v-2h2z"/>
  </svg>
);

const GmailLogo = () => (
  <img src={gmailIcon} alt="Gmail" className="w-8 h-8 object-contain" />
);

const GoogleCalendarLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#4285F4" d="M36 4H12C9.79 4 8 5.79 8 8v32c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4z"/>
    <path fill="#fff" d="M36 8H12c-.55 0-1 .45-1 1v2h26V9c0-.55-.45-1-1-1z"/>
    <rect fill="#fff" x="13" y="14" width="22" height="28" rx="1"/>
    <path fill="#EA4335" d="M18 22h4v4h-4zm0 6h4v4h-4z"/>
    <path fill="#FBBC04" d="M24 22h4v4h-4z"/>
    <path fill="#34A853" d="M24 28h4v4h-4z"/>
    <path fill="#4285F4" d="M30 22h2v4h-2zm0 6h2v4h-2z"/>
  </svg>
);

const ZapierLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#FF4A00" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z"/>
    <path fill="#fff" d="M33.5 22h-7.09l5.01-5.01a1.5 1.5 0 00-2.12-2.12L24.3 19.88 24 20.17l-.3-.29-5-5.01a1.5 1.5 0 00-2.12 2.12L21.59 22H14.5a1.5 1.5 0 000 3h7.09l-5.01 5.01a1.5 1.5 0 002.12 2.12l5-5.01.3-.29.3.29 5 5.01a1.5 1.5 0 002.12-2.12L26.41 25H33.5a1.5 1.5 0 000-3z"/>
  </svg>
);

const SlackLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#E01E5A" d="M13 28a3 3 0 11-3 3v-3h3zm1.5 0a3 3 0 113 3h-3v-3z"/>
    <path fill="#36C5F0" d="M17.5 13a3 3 0 113-3h-3v3zm0 1.5a3 3 0 11-3 3v-3h3z"/>
    <path fill="#2EB67D" d="M32.5 17.5a3 3 0 113-3v3h-3zm-1.5 0a3 3 0 11-3-3h3v3z"/>
    <path fill="#ECB22E" d="M28 32.5a3 3 0 11-3 3h3v-3zm0-1.5a3 3 0 113-3v3h-3z"/>
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <rect fill="#635BFF" rx="8" width="48" height="48"/>
    <path fill="#fff" d="M22.1 19.3c0-1.1.9-1.5 2.3-1.5 2.1 0 4.7.6 6.8 1.7V13c-2.3-.9-4.5-1.3-6.8-1.3-5.6 0-9.3 2.9-9.3 7.8 0 7.6 10.5 6.4 10.5 9.7 0 1.3-1.1 1.7-2.7 1.7-2.3 0-5.3-.9-7.6-2.2v6.6c2.6 1.1 5.2 1.6 7.6 1.6 5.7 0 9.6-2.8 9.6-7.8-.1-8.2-10.4-6.7-10.4-9.8z"/>
  </svg>
);

const tools = [
  { name: 'WhatsApp', Logo: WhatsAppLogo, benefit: 'תקשורת מיידית עם לידים' },
  { name: 'Gmail', Logo: GmailLogo, benefit: 'שליחת מיילים אוטומטית' },
  { name: 'HubSpot', Logo: HubSpotLogo, benefit: 'מעקב מסודר אחרי כל ליד' },
  { name: 'Google Sheets', Logo: GoogleSheetsLogo, benefit: 'ניהול נתונים בזמן אמת' },
  { name: 'Make', Logo: MakeLogo, benefit: 'חיבור בין מערכות בקלות' },
  { name: 'n8n', Logo: N8nLogo, benefit: 'אוטומציות מתקדמות וגמישות' },
  { name: 'Airtable', Logo: AirtableLogo, benefit: 'בסיס נתונים חכם לעסק' },
  { name: 'Calendly', Logo: CalendlyLogo, benefit: 'תיאום פגישות אוטומטי' },
  { name: 'Google Calendar', Logo: GoogleCalendarLogo, benefit: 'סנכרון יומן אוטומטי' },
  { name: 'Zapier', Logo: ZapierLogo, benefit: 'חיבור אלפי אפליקציות' },
  { name: 'Slack', Logo: SlackLogo, benefit: 'התראות והודעות צוותיות' },
  { name: 'Stripe', Logo: StripeLogo, benefit: 'גביית תשלומים אוטומטית' },
];

// Duplicate for infinite scroll effect
const duplicatedTools = [...tools, ...tools];

const ToolsSection = () => {
  const isMobile = useIsMobile();
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused.current && el) {
        scrollPos += speed;
        // Reset when we've scrolled through original set
        const halfWidth = el.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <Section id="tools">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          מתחבר למערכות שכבר יש לך
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          אין צורך להחליף את כל מה שעובד. המערכת נבנית סביב הכלים הקיימים ומחברת ביניהם בצורה חכמה.
        </p>

        <div
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; setActiveTooltip(null); }}
          style={{ direction: 'ltr' }}
        >
          <div className="flex gap-5 w-max">
            {duplicatedTools.map((tool, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 w-24 flex-shrink-0 cursor-default"
                onMouseEnter={() => !isMobile && setActiveTooltip(index)}
                onMouseLeave={() => !isMobile && setActiveTooltip(null)}
                onClick={() => isMobile && setActiveTooltip(activeTooltip === index ? null : index)}
              >
                <tool.Logo />
                <span className="text-xs font-medium text-muted-foreground">{tool.name}</span>

                {/* Desktop tooltip */}
                {!isMobile && activeTooltip === index && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded-lg px-3 py-2 whitespace-nowrap z-50 shadow-lg animate-fade-in" dir="rtl">
                    {tool.benefit}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
                )}

                {/* Mobile inline tooltip */}
                {isMobile && activeTooltip === index && (
                  <span className="text-[10px] text-primary font-medium mt-1 animate-fade-in" dir="rtl">
                    {tool.benefit}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ToolsSection;

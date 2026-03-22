import Section from '@/components/Section';
import gmailIcon from '@/assets/icons/gmail.png';

// SVG Brand Logos as components
const MakeLogo = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <path fill="#6D00CC" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-5.5 28.5l-7-7 7-7 2.8 2.8-4.2 4.2 4.2 4.2-2.8 2.8zm11 0l-2.8-2.8 4.2-4.2-4.2-4.2 2.8-2.8 7 7-7 7z"/>
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

const tools = [
  { name: 'WhatsApp', Logo: WhatsAppLogo },
  { name: 'Gmail', Logo: GmailLogo },
  { name: 'HubSpot', Logo: HubSpotLogo },
  { name: 'Google Sheets', Logo: GoogleSheetsLogo },
  { name: 'Make', Logo: MakeLogo },
  { name: 'Airtable', Logo: AirtableLogo },
  { name: 'Calendly', Logo: CalendlyLogo },
];

const ToolsSection = () => {
  return (
    <Section id="tools">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          מתחבר למערכות שכבר יש לך
        </h2>
        
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          אין צורך להחליף את כל מה שעובד. המערכת נבנית סביב הכלים הקיימים ומחברת ביניהם בצורה חכמה.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 w-24"
            >
              <tool.Logo />
              <span className="text-xs font-medium text-muted-foreground">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ToolsSection;

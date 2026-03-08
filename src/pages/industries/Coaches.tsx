import IndustryPageLayout, { IndustryPageData } from '@/components/IndustryPageLayout';

const data: IndustryPageData = {
  slug: 'industries/coaches',
  metaTitle: 'אוטומציה למאמנים | EH Automation',
  metaDescription: 'פתרונות אוטומציה למאמנים עסקיים ואישיים – ניהול מתאמנים, תזכורות, תשלומים ומערכות שירות.',
  hero: {
    label: 'תעשיות / מאמנים',
    headline: 'התמקדו באימון, השאירו את השאר למערכות',
    subtext: 'מערכות אוטומציה שמטפלות בניהול מתאמנים, תזכורות, תשלומים ואונבורדינג – כדי שתוכלו להתמקד במה שאתם הכי טובים בו.',
  },
  painPoints: {
    title: 'האתגרים של מאמנים',
    items: [
      { title: 'ניהול מתאמנים רבים', description: 'מעקב אחרי תוכניות, התקדמות ותשלומים של עשרות מתאמנים הופך למורכב.' },
      { title: 'ביטולים ואי-הגעות', description: 'מתאמנים שלא מגיעים לפגישות בלי להודיע – פוגע בזמן ובהכנסה.' },
      { title: 'גביית תשלומים ידנית', description: 'מעקב אחרי מי שילם, תזכורות תשלום וחידושים – הכל ידני.' },
      { title: 'קושי לגדול מעבר למספר מסוים של לקוחות', description: 'בלי מערכות, יש תקרת זכוכית למספר הלקוחות שאפשר לנהל.' },
    ],
  },
  systems: {
    title: 'מערכות שאנחנו בונים למאמנים',
    items: [
      { title: 'מערכת ניהול מתאמנים', description: 'פרופיל לכל מתאמן, מעקב התקדמות, תוכניות ותשלומים – הכל במקום אחד.' },
      { title: 'תזכורות ומעקב אוטומטי', description: 'תזכורות לפגישות, מעקב אחרי ביטולים, והודעות מוטיבציה אוטומטיות.' },
      { title: 'מערכת תשלומים אוטומטית', description: 'גביה חוזרת, תזכורות תשלום, חשבוניות אוטומטיות וחידוש מנויים.' },
    ],
  },
  howWeHelp: {
    title: 'איך אנחנו עוזרים',
    points: [
      'בונים מערכת ניהול מתאמנים מרכזית',
      'מטמיעים מערכת תזכורות שמפחיתה ביטולים',
      'מאטמטים גביית תשלומים וחידוש מנויים',
      'מקימים אונבורדינג אוטומטי למתאמנים חדשים',
      'מחברים את כל הכלים: יומן, WhatsApp, תשלומים',
    ],
  },
  relatedSolutions: {
    title: 'פתרונות רלוונטיים למאמנים',
    links: [
      { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
      { label: 'אוטומציה עסקית', href: '/solutions/business-automation' },
      { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
    ],
  },
};

const Coaches = () => <IndustryPageLayout data={data} />;
export default Coaches;

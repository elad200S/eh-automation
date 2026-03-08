import IndustryPageLayout, { IndustryPageData } from '@/components/IndustryPageLayout';

const data: IndustryPageData = {
  slug: 'industries/consultants',
  metaTitle: 'אוטומציה ליועצים | EH Automation',
  metaDescription: 'פתרונות אוטומציה ליועצים עסקיים – ניהול לידים, תיאום פגישות, הצעות מחיר ומעקב לקוחות אוטומטי.',
  hero: {
    label: 'תעשיות / יועצים',
    headline: 'יותר ייעוץ, פחות אדמיניסטרציה',
    subtext: 'יועצים מצליחים הם אלו שמתמקדים בלקוחות ולא בתפעול. אנחנו בונים מערכות שמטפלות בכל מה שמסביב.',
  },
  painPoints: {
    title: 'האתגרים של יועצים',
    items: [
      { title: 'תיאום פגישות לוקח יותר מדי זמן', description: 'הלוך-חזור על מועדים, תזכורות ושינויים – מבזבז שעות כל שבוע.' },
      { title: 'מעקב אחרי לקוחות פעילים', description: 'קשה לזכור מי צריך חזרה, מי בשלב מסוים ומה הסטטוס של כל לקוח.' },
      { title: 'הצעות מחיר ידניות', description: 'כל הצעה דורשת זמן הכנה, שליחה ומעקב – תהליך שחוזר על עצמו כל שבוע.' },
      { title: 'קושי לגדול מעבר ליכולת האישית', description: 'כשאתה היועץ, המנהל והמזכירה – קשה לקחת עוד לקוחות.' },
    ],
  },
  systems: {
    title: 'מערכות שאנחנו בונים ליועצים',
    items: [
      { title: 'מערכת תיאום פגישות אוטומטית', description: 'לקוח בוחר מועד → נשלח אישור → סנכרון ליומן → תזכורות אוטומטיות.' },
      { title: 'CRM מותאם ליועצים', description: 'ניהול לידים, לקוחות פעילים ומעקב אחרי כל אינטראקציה – הכל במקום אחד.' },
      { title: 'אוטומציית הצעות מחיר', description: 'יצירת הצעות מחיר מותאמות → שליחה אוטומטית → מעקב ותזכורת אם לא נענה.' },
    ],
  },
  howWeHelp: {
    title: 'איך אנחנו עוזרים',
    points: [
      'בונים מערכת CRM שמנהלת את כל הלקוחות והלידים',
      'מטמיעים מערכת תיאום פגישות שעובדת לבד',
      'מאטמטים הצעות מחיר, חשבוניות ומעקב תשלומים',
      'מקימים מערכת תזכורות ומעקבים אוטומטית',
      'מייעלים את תהליך האונבורדינג של לקוחות חדשים',
    ],
  },
  relatedSolutions: {
    title: 'פתרונות רלוונטיים ליועצים',
    links: [
      { label: 'אוטומציית CRM', href: '/solutions/crm-automation' },
      { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
      { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
    ],
  },
};

const Consultants = () => <IndustryPageLayout data={data} />;
export default Consultants;

import IndustryPageLayout, { IndustryPageData } from '@/components/IndustryPageLayout';

const data: IndustryPageData = {
  slug: 'industries/real-estate',
  metaTitle: 'אוטומציה לנדל"ן | EH Automation',
  metaDescription: 'פתרונות אוטומציה לסוכני נדל"ן – ניהול לידים, מעקב נכסים, תיאום סיורים ותקשורת לקוחות אוטומטית.',
  hero: {
    label: 'תעשיות / נדל"ן',
    headline: 'סגרו יותר עסקאות עם פחות מאמץ תפעולי',
    subtext: 'מערכות אוטומציה שמנהלות לידים, נכסים ותקשורת לקוחות – כדי שתוכלו להתמקד בסגירת עסקאות.',
  },
  painPoints: {
    title: 'האתגרים בתחום הנדל"ן',
    items: [
      { title: 'לידים שלא מקבלים מענה מהיר', description: 'בנדל"ן, מהירות התגובה קובעת. ליד שלא נענה תוך דקות עובר למתחרה.' },
      { title: 'מעקב ידני אחרי עשרות נכסים ולקוחות', description: 'טבלאות אקסל, פתקיות וזיכרון – שיטה שנשברת ככל שהעסק גדל.' },
      { title: 'תיאום סיורים לוקח זמן', description: 'תיאום בין לקוחות, בעלי נכסים ויומנים – תהליך שבולע שעות.' },
      { title: 'חוסר מעקב אחרי לקוחות קודמים', description: 'לקוחות שלא סגרו עכשיו עלולים לסגור בעוד חצי שנה – אם תזכרו לחזור אליהם.' },
    ],
  },
  systems: {
    title: 'מערכות שאנחנו בונים לנדל"ן',
    items: [
      { title: 'מערכת ניהול לידים מהירה', description: 'ליד נכנס מפרסום → מקבל מענה אוטומטי → מסווג → מוקצה לסוכן המתאים.' },
      { title: 'מעקב נכסים ולקוחות', description: 'מאגר נכסים עם סטטוסים, מחירים והתאמה אוטומטית ללקוחות רלוונטיים.' },
      { title: 'תיאום סיורים אוטומטי', description: 'לקוח בוחר מועד → סנכרון ליומן → תזכורות → עדכון בעל הנכס.' },
    ],
  },
  howWeHelp: {
    title: 'איך אנחנו עוזרים',
    points: [
      'בונים מערכת ניהול לידים שנותנת מענה מיידי',
      'מקימים מאגר נכסים עם התאמה אוטומטית ללקוחות',
      'מטמיעים מערכת תיאום סיורים שעובדת לבד',
      'מאטמטים מעקב אחרי לקוחות לטווח ארוך',
      'מחברים את כל הכלים: WhatsApp, CRM, יומן, פרסום',
    ],
  },
  relatedSolutions: {
    title: 'פתרונות רלוונטיים לנדל"ן',
    links: [
      { label: 'אוטומציית CRM', href: '/solutions/crm-automation' },
      { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
      { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
    ],
  },
};

const RealEstate = () => <IndustryPageLayout data={data} />;
export default RealEstate;

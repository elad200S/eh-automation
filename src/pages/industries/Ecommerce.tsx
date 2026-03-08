import IndustryPageLayout, { IndustryPageData } from '@/components/IndustryPageLayout';

const data: IndustryPageData = {
  slug: 'industries/ecommerce',
  metaTitle: 'אוטומציה למסחר אלקטרוני | EH Automation',
  metaDescription: 'אוטומציה לחנויות אונליין – ניהול הזמנות, מעקב מלאי, שיווק אוטומטי ושירות לקוחות.',
  hero: {
    label: 'תעשיות / מסחר אלקטרוני',
    headline: 'חנות אונליין שרצה על אוטומט',
    subtext: 'מניהול הזמנות ומלאי ועד שיווק אוטומטי ושירות לקוחות – מערכות שמאפשרות לחנות שלך לצמוח בלי לטבוע בתפעול.',
  },
  painPoints: {
    title: 'האתגרים של חנויות אונליין',
    items: [
      { title: 'ניהול הזמנות ומשלוחים ידני', description: 'ככל שהמכירות גדלות, ניהול ידני של הזמנות הופך לצוואר בקבוק.' },
      { title: 'מעקב מלאי לא מסונכרן', description: 'מכירה של מוצר שאזל מהמלאי, או מלאי שלא מתעדכן בין ערוצים.' },
      { title: 'שירות לקוחות שגוזל זמן', description: 'שאלות חוזרות על זמני אספקה, מדיניות החזרות וסטטוס הזמנות.' },
      { title: 'שיווק שלא עובד בצורה שיטתית', description: 'מיילים שנשלחים ידנית, קמפיינים שלא מחוברים לנתוני הרכישה.' },
    ],
  },
  systems: {
    title: 'מערכות שאנחנו בונים למסחר אלקטרוני',
    items: [
      { title: 'ניהול הזמנות אוטומטי', description: 'הזמנה חדשה → אישור ללקוח → עדכון מלאי → יצירת משלוח → מעקב אספקה.' },
      { title: 'שיווק מבוסס התנהגות', description: 'מיילים אוטומטיים לעגלות נטושות, המלצות מוצרים ותוכניות נאמנות.' },
      { title: 'בוט שירות לקוחות', description: 'מענה אוטומטי על שאלות נפוצות, סטטוס הזמנות ומדיניות החזרות.' },
    ],
  },
  howWeHelp: {
    title: 'איך אנחנו עוזרים',
    points: [
      'מאטמטים את כל תהליך ההזמנה מקצה לקצה',
      'מסנכרנים מלאי בין כל ערוצי המכירה',
      'בונים מערכת שיווק אוטומטית מבוססת נתונים',
      'מקימים בוט שירות לקוחות שעובד 24/7',
      'מחברים את החנות ל-CRM, Stripe, שילוח ועוד',
    ],
  },
  relatedSolutions: {
    title: 'פתרונות רלוונטיים למסחר אלקטרוני',
    links: [
      { label: 'אוטומציה עסקית', href: '/solutions/business-automation' },
      { label: 'סוכני AI חכמים', href: '/solutions/ai-agents' },
      { label: 'אוטומציית WhatsApp', href: '/solutions/whatsapp-automation' },
    ],
  },
};

const Ecommerce = () => <IndustryPageLayout data={data} />;
export default Ecommerce;

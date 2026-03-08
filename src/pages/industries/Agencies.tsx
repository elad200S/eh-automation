import IndustryPageLayout, { IndustryPageData } from '@/components/IndustryPageLayout';

const data: IndustryPageData = {
  slug: 'industries/agencies',
  metaTitle: 'אוטומציה לסוכנויות | EH Automation',
  metaDescription: 'פתרונות אוטומציה מותאמים לסוכנויות דיגיטל ושיווק – ניהול לקוחות, דוחות אוטומטיים ותהליכי אונבורדינג.',
  hero: {
    label: 'תעשיות / סוכנויות',
    headline: 'יותר לקוחות, פחות כאבי ראש תפעוליים',
    subtext: 'סוכנויות שמצליחות לגדול הן אלו שבנו תשתית אוטומטית. אנחנו עוזרים לסוכנויות לנהל יותר לקוחות עם פחות עומס.',
  },
  painPoints: {
    title: 'האתגרים של סוכנויות',
    items: [
      { title: 'ניהול עשרות לקוחות במקביל', description: 'כל לקוח צריך דוחות, עדכונים ותקשורת שוטפת. ללא מערכת, זה הופך לכאוס.' },
      { title: 'אונבורדינג שלוקח יותר מדי זמן', description: 'כל לקוח חדש דורש הגדרות, גישות, מידע ותכנון – תהליך שחוזר על עצמו כל פעם.' },
      { title: 'דוחות ידניים שבולעים שעות', description: 'הכנת דוחות חודשיים ללקוחות גוזלת זמן יקר שיכול ללכת לעבודה אמיתית.' },
      { title: 'קשה לשמור על עקביות בשירות', description: 'כשהצוות גדל, קשה לוודא שכל לקוח מקבל את אותה רמת שירות.' },
    ],
  },
  systems: {
    title: 'מערכות שאנחנו בונים לסוכנויות',
    items: [
      { title: 'אונבורדינג לקוחות אוטומטי', description: 'לקוח חדש → נוצר פרויקט → נשלחים טפסים → מוגדרות גישות → הכל מוכן לעבודה.' },
      { title: 'דוחות ביצועים אוטומטיים', description: 'נתונים נאספים מ-Google Ads, Meta, Analytics → נשלח דוח מעוצב ללקוח.' },
      { title: 'מערכת ניהול משימות מרכזית', description: 'כל המשימות, הסטטוסים והדדליינים במקום אחד – עם התראות אוטומטיות.' },
    ],
  },
  howWeHelp: {
    title: 'איך אנחנו עוזרים',
    points: [
      'ממפים את כל התהליכים הקיימים ומזהים איפה אפשר לחסוך זמן',
      'בונים מערכות אוטומציה שמתאימות לכלים שכבר משתמשים בהם',
      'מקימים דאשבורדים לניהול לקוחות ופרויקטים',
      'מטמיעים תהליכי אונבורדינג שרצים לבד',
      'מדריכים את הצוות על ניהול ותחזוקת המערכות',
    ],
  },
  relatedSolutions: {
    title: 'פתרונות רלוונטיים לסוכנויות',
    links: [
      { label: 'אוטומציה עסקית', href: '/solutions/business-automation' },
      { label: 'אוטומציית CRM', href: '/solutions/crm-automation' },
      { label: 'אוטומציית תהליכי עבודה', href: '/solutions/workflow-automation' },
    ],
  },
};

const Agencies = () => <IndustryPageLayout data={data} />;
export default Agencies;

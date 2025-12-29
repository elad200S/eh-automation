import Section from '@/components/Section';

const reasons = [
  {
    title: 'עסקים פועלים על דאטה, לא על תחושות',
    description: 'החלטות עסקיות מבוססות על מידע מדויק ובזמן אמת.',
  },
  {
    title: 'עומס תפעולי הוא צוואר הבקבוק האמיתי',
    description: 'רוב העסקים נתקעים לא בגלל חוסר לקוחות, אלא בגלל חוסר יכולת לטפל בהם.',
  },
  {
    title: 'תלות בעובדים היא סיכון עסקי',
    description: 'כל תהליך שתלוי באדם ספציפי הוא נקודת כשל פוטנציאלית.',
  },
  {
    title: 'הטכנולוגיה זמינה היום גם לעסקים קטנים',
    description: 'כלים שהיו שמורים לחברות גדולות נגישים עכשיו לכולם.',
  },
  {
    title: 'היתרון הוא ביישום, לא בכלי',
    description: 'הכלים זהים לכולם. ההבדל הוא באיך מיישמים אותם.',
  },
];

const WhyNowSection = () => {
  return (
    <Section id="why-now">
      <div className="max-w-3xl">
        <div className="text-technical mb-4">
          <span className="text-primary">//</span> 07
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          למה אוטומציה בשילוב בינה מלאכותית היא הכלי היעיל ביותר היום
        </h2>
        
        <div className="space-y-8">
          {reasons.map((reason, index) => (
            <div key={index} className="group">
              <h3 className="text-xl font-medium text-foreground mb-2 flex items-center gap-3">
                <span className="text-primary font-mono text-sm">0{index + 1}</span>
                {reason.title}
              </h3>
              <p className="text-muted-foreground pr-8">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyNowSection;

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
        <p className="text-sm font-medium text-primary mb-2">למה עכשיו</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          למה אוטומציה בשילוב AI היא הכלי היעיל ביותר היום
        </h2>
        
        <div className="space-y-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <div className="pt-0.5">
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyNowSection;

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Section from '@/components/Section';
import { fadeUp, staggerContainer, cardReveal } from '@/lib/animations';

const stats = [
  { value: '0', label: 'הזנה ידנית', sub: 'כל ליד נשמר אוטומטית' },
  { value: '2+', label: 'שנות ניסיון', sub: 'בניית אוטומציות עסקיות' },
  { value: 'מיידי', label: 'מענה לכל ליד', sub: 'תוך שניות מהרגע שנכנס' },
];

const CaseStudySection = () => {
  return (
    <Section id="case-study">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
          className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center"
        >
          ככה זה נראה בפועל
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
          className="text-muted-foreground text-center mb-10"
        >
          דוגמה אמיתית מעסק שעבדנו איתו
        </motion.p>

        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px 0px' }}
        >
          <motion.div variants={cardReveal} className="bg-card rounded-2xl border border-border p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2" />

            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Quote className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-mono text-muted-foreground">תעשייה</span>
                <h3 className="text-lg font-semibold text-foreground">סוכנות גיוס עובדים לארה"ב</h3>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4">
                <span className="text-destructive font-bold text-sm mt-0.5 flex-shrink-0 w-8 text-right">לפני</span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  לידים מקמפיין מטא נכנסו ידנית — הזנה ידנית של פרטים, מעקב לא מסודר, וחלק מהלידים פשוט הלכו לאיבוד.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-success font-bold text-sm mt-0.5 flex-shrink-0 w-8 text-right">אחרי</span>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  כל ליד נשמר אוטומטית ב-Google Sheets עם כל הפרטים הרלוונטים. בעל העסק מקבל מייל מיידי עם סיכום הליד ומגיע לשיחה מוכן. אחוז ההמרה עלה כי הלידים מגיעים עם כוונה אמיתית.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Google Sheets', 'Meta Ads', 'Gmail', 'דף נחיתה'].map((tool) => (
                <span key={tool} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cardReveal} className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default CaseStudySection;

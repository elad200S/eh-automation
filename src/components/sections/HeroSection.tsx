import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroAutomationFlow from './HeroAutomationFlow';
import { useContactPopup } from '@/contexts/ContactPopupContext';
import { blurFadeUp, staggerContainer } from '@/lib/animations';

const bullets = [
  'טיפול אוטומטי בלידים נכנסים',
  'חיבור בין טפסים, CRM ו-WhatsApp',
  'פחות כאוס, יותר שליטה',
];

const HeroSection = () => {
  const { openPopup } = useContactPopup();

  return (
    <section className="min-h-[80vh] md:min-h-[85vh] flex flex-col relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container relative z-10 pt-16 md:pt-24 pb-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={blurFadeUp} className="text-technical mb-6">
            <span className="text-primary font-semibold">//</span> AI Automation Studio
          </motion.div>

          <motion.h1
            variants={blurFadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            הכל עובד גם כשאתה לא
          </motion.h1>

          <motion.p
            variants={blurFadeUp}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            אני בונה מערכות שמחברות בין לידים, לקוחות ותהליכים, כך שכל פנייה מטופלת, הכל מתועד, והעסק עובד בצורה חלקה וברורה
          </motion.p>

          <motion.div
            variants={blurFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground/80">
                <Check className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={blurFadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={openPopup} className="cta-gradient group">
              בדיקת התאמה לעסק
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full flex-1 flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        <HeroAutomationFlow />
      </motion.div>

      <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;

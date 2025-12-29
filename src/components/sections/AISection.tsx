import { useState, useEffect } from 'react';
import Section from '@/components/Section';
import { Brain, Database, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: Brain,
    title: 'מאוטומציה לאינטליגנציה',
    content: 'המעבר מאוטומציה מבוססת כללים קבועים למערכות חכמות שמקבלות החלטות על בסיס נתונים.',
  },
  {
    icon: Database,
    title: 'קבלת החלטות מבוססת דאטה',
    content: 'מערכות שלומדות מדפוסים, מזהות חריגות ומתאימות את עצמן באופן דינמי לתנאים משתנים.',
  },
  {
    icon: GitBranch,
    title: 'זרימות עבודה דינמיות',
    content: 'תהליכים שמשתנים על פי הקשר – לא רק מה קורה, אלא למה ומתי.',
  },
];

const progressivePoints = [
  'הבינה המלאכותית לא מחליפה את האוטומציה – היא משדרגת אותה',
  'מה שפעם דרש התערבות אנושית עכשיו קורה אוטומטית',
  'ההבדל בין עסק שצומח לעסק שנתקע הוא היכולת לקבל החלטות מהירות על בסיס מידע',
  'הטכנולוגיה כבר כאן – השאלה היא רק מי מיישם אותה נכון',
];

const AISection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visiblePoints, setVisiblePoints] = useState(0);

  useEffect(() => {
    // Progressive reveal of bullet points
    const timer = setInterval(() => {
      setVisiblePoints((prev) => {
        if (prev < progressivePoints.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Section id="ai">
      <div className="max-w-4xl">
        <div className="text-technical mb-4">
          <span className="text-primary font-semibold">//</span> 06
        </div>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          איך אוטומציה ובינה מלאכותית התחברו למהפכה אחת
        </h2>
        
        {/* Slides */}
        <div className="relative mb-12">
          <div className="bg-card rounded-2xl border border-border p-8 min-h-[200px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-500",
                  currentSlide === index 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 absolute inset-8 translate-x-8"
                )}
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <slide.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{slide.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{slide.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentSlide === index 
                      ? "w-8 bg-primary" 
                      : "bg-border hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
        
        {/* Progressive points */}
        <div className="bg-muted/50 rounded-xl p-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">נקודות מפתח</h4>
          <div className="space-y-3">
            {progressivePoints.map((point, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 transition-all duration-500",
                  index < visiblePoints 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium",
                  index < visiblePoints ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <p className="text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AISection;
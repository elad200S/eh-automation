import { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

const POPUP_DELAY_MS = 22000;
const STORAGE_KEY = 'timed_cta_dismissed';

const TimedCTAPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openPopup } = useContactPopup();

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (wasDismissed) return;

    const timer = setTimeout(() => setIsVisible(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleCTA = () => {
    handleDismiss();
    openPopup();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4" onClick={handleDismiss}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" />
      <div
        className="relative z-10 w-full max-w-lg bg-gradient-to-br from-muted/80 via-background to-muted/60 rounded-2xl border border-border p-10 md:p-14 shadow-2xl animate-in zoom-in-95 fade-in duration-300 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-4 left-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="סגור"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          רוצה לבדוק אם זה מתאים לעסק שלך?
        </h2>
        <p className="text-muted-foreground mb-8">
          שיחת היכרות קצרה, בלי התחייבות. נבין מה העסק צריך ונראה אם אפשר לעזור.
        </p>
        <button onClick={handleCTA} className="cta-gradient group">
          לתיאום שיחת היכרות
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default TimedCTAPopup;

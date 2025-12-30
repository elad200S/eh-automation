import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Cookie className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            האתר משתמש בעוגיות לשיפור חווית השימוש.{' '}
            <a 
              href="/privacy" 
              className="text-primary hover:underline"
            >
              מדיניות פרטיות
            </a>
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          מאשר
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

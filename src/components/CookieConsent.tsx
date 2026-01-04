import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    const dismissed = sessionStorage.getItem('cookie-banner-dismissed');
    
    if (!consent && !dismissed) {
      setIsVisible(true);
    } else if (consent) {
      try {
        const stored = JSON.parse(consent);
        setPreferences(stored);
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem('cookie-consent', JSON.stringify(state));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allEnabled: ConsentState = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    saveConsent(allEnabled);
  };

  const handleDeny = () => {
    const essentialOnly: ConsentState = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handleClose = () => {
    // Close without choosing - hide for this session only, reappear on refresh
    sessionStorage.setItem('cookie-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Top Sticky Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Text Content */}
            <p className="text-sm text-muted-foreground text-center sm:text-right flex-1">
              אנו משתמשים ב-Cookies כדי לשפר את חווית הגלישה שלך.{' '}
              <a 
                href="/privacy" 
                className="text-primary hover:underline font-medium"
              >
                מדיניות פרטיות
              </a>
              {' · '}
              <a 
                href="/cookies" 
                className="text-primary hover:underline font-medium"
              >
                מדיניות Cookies
              </a>
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                העדפות
              </button>
              <button
                onClick={handleDeny}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
              >
                דחה
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                אשר
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">העדפות Cookies</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Cookies חיוניים</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Cookies אלו נדרשים לתפקוד האתר ואינם ניתנים לכיבוי.
                </p>
              </div>
              <Switch 
                checked={true} 
                disabled 
                className="mr-4"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Cookies אנליטיקה</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  עוזרים לנו להבין כיצד מבקרים משתמשים באתר.
                </p>
              </div>
              <Switch 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
                className="mr-4"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Cookies שיווק</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  משמשים להצגת פרסומות רלוונטיות עבורך.
                </p>
              </div>
              <Switch 
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
                className="mr-4"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setShowPreferences(false)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              ביטול
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              שמור העדפות
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;

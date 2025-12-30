import { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  MousePointer2, 
  Link2, 
  ZoomIn,
  RotateCcw,
  X
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  highlightLinks: false,
  bigCursor: false,
};

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch {
        // Use defaults
      }
    }
  }, []);

  const saveSettings = (newSettings: AccessibilitySettings) => {
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    setSettings(newSettings);
    applySettings(newSettings);
  };

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${s.fontSize}%`;
    
    // High contrast
    if (s.highContrast) {
      root.style.setProperty('--foreground', '0 0% 0%');
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--muted-foreground', '0 0% 20%');
      root.classList.add('high-contrast');
    } else {
      root.style.setProperty('--foreground', '220 30% 15%');
      root.style.setProperty('--background', '210 20% 98%');
      root.style.setProperty('--muted-foreground', '220 15% 45%');
      root.classList.remove('high-contrast');
    }

    // Highlight links
    if (s.highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }

    // Big cursor
    if (s.bigCursor) {
      root.classList.add('big-cursor');
    } else {
      root.classList.remove('big-cursor');
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(150, Math.max(80, settings.fontSize + delta));
    saveSettings({ ...settings, fontSize: newSize });
  };

  const toggleHighContrast = () => {
    saveSettings({ ...settings, highContrast: !settings.highContrast });
  };

  const toggleHighlightLinks = () => {
    saveSettings({ ...settings, highlightLinks: !settings.highlightLinks });
  };

  const toggleBigCursor = () => {
    saveSettings({ ...settings, bigCursor: !settings.bigCursor });
  };

  const resetAll = () => {
    saveSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="תפריט נגישות"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            className="fixed bottom-24 left-6 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                <h3 className="font-medium">הגדרות נגישות</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Type className="w-4 h-4" />
                  <span>גודל טקסט</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustFontSize(-10)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="הקטן טקסט"
                  >
                    A-
                  </button>
                  <span className="w-16 text-center text-sm font-mono text-muted-foreground">
                    {settings.fontSize}%
                  </span>
                  <button
                    onClick={() => adjustFontSize(10)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="הגדל טקסט"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <button
                onClick={toggleHighContrast}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.highContrast 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-primary/10'
                }`}
              >
                <Contrast className="w-5 h-5" />
                <span>ניגודיות גבוהה</span>
                {settings.highContrast && (
                  <span className="mr-auto text-xs bg-white/20 px-2 py-0.5 rounded">פעיל</span>
                )}
              </button>

              {/* Highlight Links */}
              <button
                onClick={toggleHighlightLinks}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.highlightLinks 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-primary/10'
                }`}
              >
                <Link2 className="w-5 h-5" />
                <span>הדגש קישורים</span>
                {settings.highlightLinks && (
                  <span className="mr-auto text-xs bg-white/20 px-2 py-0.5 rounded">פעיל</span>
                )}
              </button>

              {/* Big Cursor */}
              <button
                onClick={toggleBigCursor}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.bigCursor 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-primary/10'
                }`}
              >
                <MousePointer2 className="w-5 h-5" />
                <span>סמן גדול</span>
                {settings.bigCursor && (
                  <span className="mr-auto text-xs bg-white/20 px-2 py-0.5 rounded">פעיל</span>
                )}
              </button>

              {/* Zoom indicator */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <ZoomIn className="w-5 h-5" />
                <span>השתמש ב-Ctrl+/- לזום</span>
              </div>

              {/* Reset */}
              <button
                onClick={resetAll}
                className="w-full flex items-center justify-center gap-2 p-3 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>איפוס הגדרות</span>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                אנו מחויבים לנגישות לכולם
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccessibilityButton;

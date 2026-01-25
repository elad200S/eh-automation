import { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Type, 
  Contrast, 
  MousePointer2, 
  Link2, 
  RotateCcw,
  X,
  Pause,
  ImageOff,
  AlignLeft,
  Minus,
  Plus,
  BookOpen,
  Space,
  ArrowUpDown
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  textSpacing: boolean;
  pauseAnimations: boolean;
  hideImages: boolean;
  dyslexiaFont: boolean;
  lineHeight: number;
  textAlign: 'right' | 'center' | 'left';
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  highlightLinks: false,
  bigCursor: false,
  textSpacing: false,
  pauseAnimations: false,
  hideImages: false,
  dyslexiaFont: false,
  lineHeight: 100,
  textAlign: 'right',
};

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
        applySettings({ ...defaultSettings, ...parsed });
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
      root.classList.add('high-contrast');
    } else {
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

    // Text spacing
    if (s.textSpacing) {
      root.classList.add('text-spacing');
    } else {
      root.classList.remove('text-spacing');
    }

    // Pause animations
    if (s.pauseAnimations) {
      root.classList.add('pause-animations');
    } else {
      root.classList.remove('pause-animations');
    }

    // Hide images
    if (s.hideImages) {
      root.classList.add('hide-images');
    } else {
      root.classList.remove('hide-images');
    }

    // Dyslexia font
    if (s.dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }

    // Line height
    root.style.setProperty('--a11y-line-height', `${s.lineHeight / 100}`);
    if (s.lineHeight !== 100) {
      root.classList.add('custom-line-height');
    } else {
      root.classList.remove('custom-line-height');
    }

    // Text alignment
    root.classList.remove('text-align-right', 'text-align-center', 'text-align-left');
    if (s.textAlign !== 'right') {
      root.classList.add(`text-align-${s.textAlign}`);
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(150, Math.max(80, settings.fontSize + delta));
    saveSettings({ ...settings, fontSize: newSize });
  };

  const adjustLineHeight = (delta: number) => {
    const newHeight = Math.min(200, Math.max(100, settings.lineHeight + delta));
    saveSettings({ ...settings, lineHeight: newHeight });
  };

  const cycleTextAlign = () => {
    const alignments: ('right' | 'center' | 'left')[] = ['right', 'center', 'left'];
    const currentIndex = alignments.indexOf(settings.textAlign);
    const nextIndex = (currentIndex + 1) % alignments.length;
    saveSettings({ ...settings, textAlign: alignments[nextIndex] });
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    if (typeof settings[key] === 'boolean') {
      saveSettings({ ...settings, [key]: !settings[key] });
    }
  };

  const resetAll = () => {
    saveSettings(defaultSettings);
  };

  const alignLabels = {
    right: 'ימין',
    center: 'מרכז',
    left: 'שמאל',
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-[75%] -translate-y-1/2 scale-[0.85] origin-left z-[9999] w-14 h-14 rounded-r-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center pr-1 hover:bg-primary/90 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            className="fixed left-14 top-[75%] -translate-y-1/2 z-[9999] w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
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
            <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Type className="w-4 h-4" />
                  <span>גודל טקסט</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustFontSize(-10)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1"
                    aria-label="הקטן טקסט"
                  >
                    <Minus className="w-3 h-3" />
                    A
                  </button>
                  <span className="w-14 text-center text-sm font-mono text-muted-foreground">
                    {settings.fontSize}%
                  </span>
                  <button
                    onClick={() => adjustFontSize(10)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1"
                    aria-label="הגדל טקסט"
                  >
                    <Plus className="w-3 h-3" />
                    A
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>גובה שורה</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustLineHeight(-25)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="הקטן גובה שורה"
                  >
                    <Minus className="w-3 h-3 mx-auto" />
                  </button>
                  <span className="w-14 text-center text-sm font-mono text-muted-foreground">
                    {settings.lineHeight}%
                  </span>
                  <button
                    onClick={() => adjustLineHeight(25)}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="הגדל גובה שורה"
                  >
                    <Plus className="w-3 h-3 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Toggle Options */}
              <ToggleButton
                active={settings.highContrast}
                onClick={() => toggleSetting('highContrast')}
                icon={<Contrast className="w-5 h-5" />}
                label="ניגודיות גבוהה"
              />

              <ToggleButton
                active={settings.highlightLinks}
                onClick={() => toggleSetting('highlightLinks')}
                icon={<Link2 className="w-5 h-5" />}
                label="הדגש קישורים"
              />

              <ToggleButton
                active={settings.textSpacing}
                onClick={() => toggleSetting('textSpacing')}
                icon={<Space className="w-5 h-5" />}
                label="ריווח טקסט"
              />

              <ToggleButton
                active={settings.dyslexiaFont}
                onClick={() => toggleSetting('dyslexiaFont')}
                icon={<BookOpen className="w-5 h-5" />}
                label="גופן דיסלקציה"
              />

              <ToggleButton
                active={settings.bigCursor}
                onClick={() => toggleSetting('bigCursor')}
                icon={<MousePointer2 className="w-5 h-5" />}
                label="סמן גדול"
              />

              <ToggleButton
                active={settings.pauseAnimations}
                onClick={() => toggleSetting('pauseAnimations')}
                icon={<Pause className="w-5 h-5" />}
                label="עצור אנימציות"
              />

              <ToggleButton
                active={settings.hideImages}
                onClick={() => toggleSetting('hideImages')}
                icon={<ImageOff className="w-5 h-5" />}
                label="הסתר תמונות"
              />

              {/* Text Alignment */}
              <button
                onClick={cycleTextAlign}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium bg-muted hover:bg-primary/10 transition-colors"
              >
                <AlignLeft className="w-5 h-5" />
                <span>יישור טקסט</span>
                <span className="mr-auto text-xs bg-primary/10 px-2 py-0.5 rounded">
                  {alignLabels[settings.textAlign]}
                </span>
              </button>

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

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ToggleButton = ({ active, onClick, icon, label }: ToggleButtonProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted hover:bg-primary/10'
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <span className="mr-auto text-xs bg-white/20 px-2 py-0.5 rounded">פעיל</span>
    )}
  </button>
);

export default AccessibilityButton;
import { useState } from 'react';
import { Eye, Type, Contrast } from 'lucide-react';

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(150, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.style.setProperty('--foreground', '220 30% 5%');
      document.documentElement.style.setProperty('--background', '0 0% 100%');
      document.documentElement.style.setProperty('--muted-foreground', '220 20% 25%');
    } else {
      document.documentElement.style.setProperty('--foreground', '220 30% 15%');
      document.documentElement.style.setProperty('--background', '210 20% 98%');
      document.documentElement.style.setProperty('--muted-foreground', '220 15% 45%');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-primary hover:shadow-xl transition-all focus-ring"
        aria-label="אפשרויות נגישות"
      >
        <Eye className="w-5 h-5 text-primary" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-card border border-border rounded-xl p-4 min-w-[220px] shadow-xl animate-fade-up">
          <h3 className="text-sm font-medium text-foreground mb-4">נגישות</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                <Type className="w-4 h-4 inline ml-2" />
                גודל טקסט
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => adjustFontSize(-10)}
                  className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  A-
                </button>
                <span className="px-3 py-1.5 text-sm text-muted-foreground font-mono">
                  {fontSize}%
                </span>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  A+
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={toggleHighContrast}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  highContrast ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary/10'
                }`}
              >
                <Contrast className="w-4 h-4" />
                ניגודיות גבוהה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityButton;
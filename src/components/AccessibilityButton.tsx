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
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--background', '0 0% 0%');
    } else {
      document.documentElement.style.setProperty('--foreground', '0 0% 95%');
      document.documentElement.style.setProperty('--background', '0 0% 5.5%');
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center hover:border-primary transition-colors focus-ring"
        aria-label="אפשרויות נגישות"
      >
        <Eye className="w-5 h-5 text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-background-secondary border border-border rounded-lg p-4 min-w-[200px] animate-fade-up">
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
                  className="px-3 py-1 bg-secondary rounded text-sm hover:bg-muted transition-colors"
                >
                  A-
                </button>
                <span className="px-3 py-1 text-sm text-muted-foreground">
                  {fontSize}%
                </span>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="px-3 py-1 bg-secondary rounded text-sm hover:bg-muted transition-colors"
                >
                  A+
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={toggleHighContrast}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded text-sm transition-colors ${
                  highContrast ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'
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

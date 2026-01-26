import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import botIcon from '@/assets/icons/bot.png';

interface ChatChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseBot: () => void;
  onChooseWhatsApp: () => void;
}

const ChatChoiceModal = ({ isOpen, onClose, onChooseBot, onChooseWhatsApp }: ChatChoiceModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-200" />
      
      {/* Modal */}
      <div 
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative bg-background border border-border shadow-2xl z-10",
          "animate-in duration-300",
          isMobile 
            ? "w-full rounded-t-2xl slide-in-from-bottom pb-safe" 
            : "w-full max-w-md rounded-2xl fade-in zoom-in-95"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="סגור"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            איך תרצה להתקדם?
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            אפשר להמשיך בשתי דרכים – תבחר מה הכי נוח לך:
          </p>

          <div className="space-y-3">
            {/* WhatsApp option */}
            <button
              onClick={onChooseWhatsApp}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 44 44" className="w-10 h-10">
                  {/* White ring border */}
                  <circle cx="22" cy="22" r="21" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
                  {/* Green WhatsApp circle */}
                  <circle cx="22" cy="22" r="17" fill="#25D366" />
                  {/* WhatsApp phone icon */}
                  <path fill="#fff" d="M29.5 27.1c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-1 1.2-.18.2-.36.23-.66.08-.3-.15-1.3-.48-2.45-1.52-.9-.81-1.52-1.8-1.7-2.11-.18-.3-.02-.47.13-.62.14-.14.3-.36.46-.53.15-.18.2-.3.3-.51.1-.2.05-.38-.03-.53-.08-.15-.7-1.65-.94-2.26-.25-.6-.5-.52-.7-.53l-.58-.01c-.2 0-.54.08-.82.38-.28.3-1.07 1.04-1.07 2.55s1.1 2.96 1.25 3.16c.15.2 2.15 3.28 5.22 4.6.73.32 1.3.5 1.74.65.73.23 1.4.2 1.92.12.59-.09 1.8-.74 2.06-1.45.26-.71.26-1.32.18-1.45-.08-.13-.28-.2-.58-.36z"/>
                </svg>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  לדבר עם אלעד ב-WhatsApp
                </p>
                <p className="text-sm text-muted-foreground">
                  תשובה מהירה ואישית
                </p>
              </div>
            </button>

            {/* Bot option */}
            <button
              onClick={onChooseBot}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={botIcon} alt="Bot" className="w-10 h-10 object-contain" />
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  לברר עוד עם הבוט
                </p>
                <p className="text-sm text-muted-foreground">
                  שאלות ותשובות מיידיות
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatChoiceModal;

import { X, MessageCircle, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseBot: () => void;
  onChooseWhatsApp: () => void;
}

const ChatChoiceModal = ({ isOpen, onClose, onChooseBot, onChooseWhatsApp }: ChatChoiceModalProps) => {
  const isMobileHook = useIsMobile();
  // Default to false during SSR/initial render, use hook value once available
  const isMobile = isMobileHook ?? false;

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
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full bg-muted border border-border">
                <MessageCircle className="w-6 h-6 text-foreground" />
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
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full bg-muted border border-border">
                <Bot className="w-6 h-6 text-foreground" />
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

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import botIcon from '@/assets/icons/bot.png';

interface ChatChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseBot: () => void;
  onChooseWhatsApp: () => void;
}

const ChatChoiceModal = ({ isOpen, onClose, onChooseBot, onChooseWhatsApp }: ChatChoiceModalProps) => {
  const isMobile = useIsMobile();

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
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full bg-white shadow-sm">
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <path fill="#25D366" d="M16 0C7.163 0 0 7.163 0 16c0 2.837.739 5.499 2.032 7.812L.105 31.4a.75.75 0 0 0 .916.917l7.71-1.937A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"/>
                  <path fill="#fff" d="M23.79 19.32c-.35-.175-2.07-1.02-2.39-1.135-.32-.117-.553-.175-.786.175-.233.35-.903 1.135-1.108 1.368-.204.233-.408.263-.758.088-.35-.175-1.477-.544-2.813-1.735-1.04-.927-1.742-2.072-1.946-2.422-.204-.35-.022-.54.153-.714.157-.157.35-.408.525-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.03-.612-.087-.175-.785-1.893-1.075-2.593-.284-.68-.572-.588-.786-.599l-.67-.012c-.233 0-.612.088-.932.437-.32.35-1.224 1.197-1.224 2.918s1.253 3.385 1.428 3.618c.175.233 2.466 3.765 5.975 5.28.835.36 1.486.576 1.994.737.838.266 1.6.228 2.202.138.672-.1 2.07-.846 2.362-1.663.292-.817.292-1.517.204-1.663-.088-.146-.32-.233-.67-.408z"/>
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
                <img src={botIcon} alt="Bot" className="w-9 h-9 object-contain" />
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

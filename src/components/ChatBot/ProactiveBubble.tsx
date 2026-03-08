import { X } from 'lucide-react';

interface ProactiveBubbleProps {
  message: string;
  quickReplies?: string[];
  onQuickReply: (text: string) => void;
  onDismiss: () => void;
}

const ProactiveBubble = ({ message, quickReplies, onQuickReply, onDismiss }: ProactiveBubbleProps) => {
  return (
    <div
      dir="rtl"
      className="fixed bottom-24 right-6 w-[300px] max-w-[calc(100vw-48px)] z-[9997] animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="bg-background border border-border rounded-2xl shadow-lg p-4 relative">
        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="absolute top-2 left-2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="סגור"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Message */}
        <p className="text-sm text-foreground leading-relaxed pr-0 pl-5 whitespace-pre-line">
          {message}
        </p>

        {/* Quick replies */}
        {quickReplies && quickReplies.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            {quickReplies.map((text, i) => (
              <button
                key={i}
                onClick={() => onQuickReply(text)}
                className="text-right px-3 py-2 bg-primary/10 hover:bg-primary/20 text-foreground text-sm rounded-lg transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Small triangle pointer toward the chat button */}
      <div className="absolute -bottom-2 right-8 w-4 h-4 bg-background border-b border-r border-border rotate-45 transform" />
    </div>
  );
};

export default ProactiveBubble;

import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import QuickReplies from './QuickReplies';
import LeadCaptureForm from './LeadCaptureForm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  showLeadForm?: boolean;
  quickReplies?: string[];
  showWhatsApp?: boolean;
  onQuickReply?: (text: string) => void;
  onLeadSubmit?: (name: string, phone: string) => void;
  isLoading?: boolean;
}

const URL_REGEX = /(https?:\/\/[^\s<]+)/g;

const linkifyContent = (text: string) => {
  const parts = text.split(URL_REGEX);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary hover:text-primary/80 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const ChatMessage = memo(({ role, content, showQuickReplies, showLeadForm, quickReplies, showWhatsApp, onQuickReply, onLeadSubmit, isLoading }: ChatMessageProps) => {
  const isUser = role === 'user';
  const linkedContent = useMemo(() => linkifyContent(content), [content]);

  return (
    <div className={cn('flex mb-3', isUser ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{linkedContent}</p>
        {showQuickReplies && onQuickReply && (
          <QuickReplies onSelect={onQuickReply} disabled={isLoading} />
        )}
        {quickReplies && quickReplies.length > 0 && onQuickReply && (
          <div className="flex flex-col gap-2 mt-3">
            {quickReplies.map((text, i) => (
              <button
                key={i}
                onClick={() => onQuickReply(text)}
                disabled={isLoading}
                className="text-right px-3 py-2 bg-primary/10 hover:bg-primary/20 text-foreground text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {text}
              </button>
            ))}
          </div>
        )}
        {showWhatsApp && (
          <a
            href="https://wa.link/kw53y2"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#25D366] hover:bg-[#1fba59] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <img src="/whatsapp-icon.png" alt="" className="w-4 h-4 object-cover rounded" />
            דבר עם אלעד ישירות בוואטסאפ
          </a>
        )}
        {showLeadForm && onLeadSubmit && (
          <LeadCaptureForm onSubmit={onLeadSubmit} />
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
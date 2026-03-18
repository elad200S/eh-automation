import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import QuickReplies from './QuickReplies';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  onQuickReply?: (text: string) => void;
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

const ChatMessage = memo(({ role, content, showQuickReplies, onQuickReply, isLoading }: ChatMessageProps) => {
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
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;

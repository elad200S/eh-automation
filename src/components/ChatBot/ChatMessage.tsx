import { cn } from '@/lib/utils';
import QuickReplies from './QuickReplies';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  onQuickReply?: (text: string) => void;
  isLoading?: boolean;
}

const ChatMessage = ({ role, content, showQuickReplies, onQuickReply, isLoading }: ChatMessageProps) => {
  const isUser = role === 'user';

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
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
        {showQuickReplies && onQuickReply && (
          <QuickReplies onSelect={onQuickReply} disabled={isLoading} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

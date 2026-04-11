import { useRef, useEffect, useState, KeyboardEvent, useCallback } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import type { Message } from './useChatBot';

const WHATSAPP_NUMBER = '972547108219';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClose: () => void;
  maxInputLength: number;
}

const ChatWindow = ({ messages, isLoading, onSendMessage, onClose, maxInputLength }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stickToBottom, setStickToBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const checkIfNearBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const threshold = 100;
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  const handleScroll = useCallback(() => {
    const isNearBottom = checkIfNearBottom();
    setStickToBottom(isNearBottom);
    setShowScrollButton(!isNearBottom);
  }, [checkIfNearBottom]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior, block: 'end' });
    }
  }, []);

  useEffect(() => {
    if (stickToBottom) {
      scrollToBottom('smooth');
      setHasNewMessage(false);
    } else if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        setHasNewMessage(true);
      }
    }
  }, [messages, isLoading, stickToBottom, scrollToBottom]);

  useEffect(() => {
    if (stickToBottom) {
      setHasNewMessage(false);
    }
  }, [stickToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom('instant');
  }, [scrollToBottom]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !isLoading) {
      onSendMessage(trimmed);
      setInputValue('');
      setStickToBottom(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (text: string) => {
    if (!isLoading) {
      onSendMessage(text);
      setStickToBottom(true);
    }
  };

  const handleScrollToBottomClick = () => {
    setStickToBottom(true);
    scrollToBottom('smooth');
  };

  const handleLeadSubmit = (name: string, phone: string) => {
    const text = encodeURIComponent(`שלום אלעד, שמי ${name}. מספרי ${phone}. דיברתי עם הבוט שלך ואשמח לשמוע עוד!`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div
      dir="rtl"
      className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-xl flex flex-col z-[9998] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
            <img src="/bot icon eh automation.png" alt="Bot" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-medium text-sm leading-tight">EH Automation</p>
            <p className="text-xs text-primary-foreground/70 leading-tight">בוט חכם • עונה מיד</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-primary-foreground/10 rounded-full transition-colors"
            aria-label="WhatsApp"
            title="דבר עם אלעד ישירות"
          >
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-5 h-5 object-cover rounded" />
          </a>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
            aria-label="סגור צ'אט"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 scroll-smooth"
      >
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              showQuickReplies={message.showQuickReplies}
              showLeadForm={message.showLeadForm}
              onQuickReply={handleQuickReply}
              onLeadSubmit={handleLeadSubmit}
              isLoading={isLoading}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} className="h-1" />
        </div>
      </div>

      {/* Scroll to bottom / New message indicator */}
      {(showScrollButton || hasNewMessage) && (
        <button
          onClick={handleScrollToBottomClick}
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1 transition-all animate-in fade-in slide-in-from-bottom-2 ${
            hasNewMessage
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
          {hasNewMessage ? '↓ הודעה חדשה' : 'להודעה האחרונה'}
        </button>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, maxInputLength))}
            onKeyDown={handleKeyDown}
            placeholder="הקלד הודעה..."
            disabled={isLoading}
            className="flex-1 text-sm"
            dir="rtl"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="shrink-0"
            aria-label="שלח"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
import { useRef, useEffect, useState, KeyboardEvent, useCallback } from 'react';
import { X, Send, Bot, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import type { Message } from './useChatBot';

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

  // Check if user is near bottom
  const checkIfNearBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    const threshold = 100;
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const isNearBottom = checkIfNearBottom();
    setStickToBottom(isNearBottom);
    setShowScrollButton(!isNearBottom);
  }, [checkIfNearBottom]);

  // Scroll to bottom function
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior, block: 'end' });
    }
  }, []);

  // Auto-scroll when messages change or during streaming
  useEffect(() => {
    if (stickToBottom) {
      scrollToBottom('smooth');
      setHasNewMessage(false);
    } else if (messages.length > 0) {
      // Check if the last message is from the bot (new message indicator)
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        setHasNewMessage(true);
      }
    }
  }, [messages, isLoading, stickToBottom, scrollToBottom]);

  // Clear new message indicator when user scrolls to bottom
  useEffect(() => {
    if (stickToBottom) {
      setHasNewMessage(false);
    }
  }, [stickToBottom]);

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
    // Initial scroll to bottom
    scrollToBottom('instant');
  }, [scrollToBottom]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !isLoading) {
      onSendMessage(trimmed);
      setInputValue('');
      // Force stick to bottom when sending
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

  return (
    <div
      dir="rtl"
      className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-xl flex flex-col z-[9998] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-medium text-sm">הבוט של אלעד</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
          aria-label="סגור צ'אט"
        >
          <X className="w-5 h-5" />
        </button>
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
              onQuickReply={handleQuickReply}
              isLoading={isLoading}
            />
          ))}
          {isLoading && <TypingIndicator />}
          {/* Bottom anchor for scrolling */}
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

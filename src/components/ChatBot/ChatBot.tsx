import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useChatBot } from './useChatBot';
import ChatWindow from './ChatWindow';
import ChatChoiceModal from './ChatChoiceModal';
import ProactiveBubble from './ProactiveBubble';

const PROACTIVE_MSG_1 = 'היי 👋\nרוצה לראות איזה אוטומציות יכולות לעבוד בעסק שלך?';
const PROACTIVE_MSG_2 = 'רוצה לראות דוגמה לאוטומציה שיכולה לחסוך שעות עבודה לעסק?';
const QUICK_REPLIES_1 = ['כן, תראה לי', 'יש לי שאלה'];
const MAX_PROACTIVE = 2;
const TIME_TRIGGER_MS = 8000;
const SCROLL_THRESHOLD = 0.5;

const ChatBot = () => {
  const { messages, isLoading, isOpen, hasBeenOpened, sendMessage, toggleOpen, openChat, maxInputLength } = useChatBot();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  // Proactive bubble state
  const [proactiveBubble, setProactiveBubble] = useState<{
    message: string;
    quickReplies?: string[];
  } | null>(null);
  const proactiveCountRef = useRef(0);
  const userInteractedRef = useRef(false);
  const dismissedRef = useRef(false);

  // Track if user has interacted with chat
  useEffect(() => {
    if (hasBeenOpened || isOpen) {
      userInteractedRef.current = true;
      setProactiveBubble(null);
    }
  }, [hasBeenOpened, isOpen]);

  // Time-based trigger (8s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userInteractedRef.current && !dismissedRef.current && proactiveCountRef.current < MAX_PROACTIVE) {
        setProactiveBubble({ message: PROACTIVE_MSG_1, quickReplies: QUICK_REPLIES_1 });
        proactiveCountRef.current += 1;
      }
    }, TIME_TRIGGER_MS);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-based trigger (50% of page)
  useEffect(() => {
    const handleScroll = () => {
      if (userInteractedRef.current || dismissedRef.current) return;
      if (proactiveCountRef.current >= MAX_PROACTIVE) return;
      // Only trigger second message after first was shown and dismissed/ignored
      if (proactiveCountRef.current < 1) return;
      // Don't show if bubble is already visible
      if (proactiveBubble) return;

      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= SCROLL_THRESHOLD) {
        setProactiveBubble({ message: PROACTIVE_MSG_2, quickReplies: QUICK_REPLIES_1 });
        proactiveCountRef.current += 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [proactiveBubble]);

  // Attention animation logic
  useEffect(() => {
    if (hasBeenOpened) {
      setShowAnimation(false);
      return;
    }

    const initialTimer = setTimeout(() => {
      if (!hasBeenOpened) setShowAnimation(true);
    }, 4000);

    const intervalId = setInterval(() => {
      if (!hasBeenOpened) {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2000);
      }
    }, 10000 + Math.random() * 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [hasBeenOpened]);

  // Scroll-triggered choice modal
  useEffect(() => {
    if (hasShownModal) return;

    const handleScroll = () => {
      const problemSection = document.getElementById('problem');
      if (!problemSection) return;

      const rect = problemSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

      if (isVisible && !hasShownModal) {
        setShowChoiceModal(true);
        setHasShownModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownModal]);

  const handleChooseBot = () => {
    setShowChoiceModal(false);
    openChat();
  };

  const handleChooseWhatsApp = () => {
    setShowChoiceModal(false);
    window.open('https://wa.link/kw53y2', '_blank');
  };

  const handleProactiveDismiss = useCallback(() => {
    setProactiveBubble(null);
    dismissedRef.current = true;
  }, []);

  const handleProactiveReply = useCallback((text: string) => {
    setProactiveBubble(null);
    userInteractedRef.current = true;
    openChat();
    // Small delay so chat window renders before sending
    setTimeout(() => sendMessage(text), 300);
  }, [openChat, sendMessage]);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onClose={toggleOpen}
          maxInputLength={maxInputLength}
        />
      )}

      {/* Proactive Bubble */}
      {proactiveBubble && !isOpen && (
        <ProactiveBubble
          message={proactiveBubble.message}
          quickReplies={proactiveBubble.quickReplies}
          onQuickReply={handleProactiveReply}
          onDismiss={handleProactiveDismiss}
        />
      )}

      {/* Choice Modal */}
      <ChatChoiceModal
        isOpen={showChoiceModal}
        onClose={() => setShowChoiceModal(false)}
        onChooseBot={handleChooseBot}
        onChooseWhatsApp={handleChooseWhatsApp}
      />

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className={`
          fixed bottom-6 right-6 w-14 h-14 
          bg-primary hover:bg-primary/90 text-primary-foreground 
          rounded-full shadow-lg flex items-center justify-center 
          z-[9998] transition-all duration-300
          hover:scale-105 active:scale-95
          ${showAnimation && !hasBeenOpened ? 'animate-chat-attention' : ''}
        `}
        aria-label={isOpen ? 'סגור צ\'אט' : 'פתח צ\'אט'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default ChatBot;

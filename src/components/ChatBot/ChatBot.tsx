import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useChatBot } from './useChatBot';
import ChatWindow from './ChatWindow';
import ChatChoiceModal from './ChatChoiceModal';

const ChatBot = () => {
  const { messages, isLoading, isOpen, hasBeenOpened, sendMessage, toggleOpen, openChat, maxInputLength } = useChatBot();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  // Attention animation logic
  useEffect(() => {
    if (hasBeenOpened) {
      setShowAnimation(false);
      return;
    }

    // Start animation after 4 seconds
    const initialTimer = setTimeout(() => {
      if (!hasBeenOpened) {
        setShowAnimation(true);
      }
    }, 4000);

    // Repeat animation every 10-15 seconds (subtle, non-aggressive)
    const intervalId = setInterval(() => {
      if (!hasBeenOpened) {
        setShowAnimation(true);
        // Animation lasts ~2 seconds, then reset
        setTimeout(() => setShowAnimation(false), 2000);
      }
    }, 10000 + Math.random() * 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [hasBeenOpened]);

  // Scroll-triggered modal for "איפה עסקים נתקעים" section
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
    window.open('http://wa.me/972547108219', '_blank');
  };

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

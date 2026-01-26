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
    window.open('https://wa.link/rl0yzm', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.link/rl0yzm', '_blank');
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

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9998]">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="שלח הודעה בוואטסאפ"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

        {/* Chat Button */}
        <button
          onClick={toggleOpen}
          className={`
            w-14 h-14 
            bg-primary hover:bg-primary/90 text-primary-foreground 
            rounded-full shadow-lg flex items-center justify-center 
            transition-all duration-300
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
      </div>
    </>
  );
};

export default ChatBot;

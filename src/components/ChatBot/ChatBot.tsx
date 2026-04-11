import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useChatBot } from './useChatBot';
import ChatWindow from './ChatWindow';
import ChatChoiceModal from './ChatChoiceModal';
import ProactiveBubble from './ProactiveBubble';
import { useEngagement } from '@/contexts/EngagementContext';

const PROACTIVE_MSG = 'היי 👋\nרוצה לראות איזה אוטומציות יכולות לעבוד בעסק שלך?';
const QUICK_REPLIES = ['כן, תראה לי', 'יש לי שאלה'];

// Timing constants
const PROACTIVE_DELAY_MS = 20_000;  // 20s - chatbot warm-up
const CHOICE_DELAY_MS = 75_000;     // 75s - final choice popup

const POPUP_ID_PROACTIVE = 'proactive-bubble';
const POPUP_ID_CHOICE = 'choice-modal';

const ChatBot = () => {
  const { messages, isLoading, isOpen, hasBeenOpened, sendMessage, toggleOpen, openChat, maxInputLength } = useChatBot();
  const { isAnyPopupOpen, hasInteracted, registerPopup, unregisterPopup, markInteracted, wasShown, markShown } = useEngagement();

  const [showAnimation, setShowAnimation] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [proactiveBubble, setProactiveBubble] = useState<{ message: string; quickReplies?: string[] } | null>(null);

  const userOpenedChatRef = useRef(false);

  // Track user interaction
  useEffect(() => {
    if (hasBeenOpened || isOpen) {
      userOpenedChatRef.current = true;
      markInteracted();
      setProactiveBubble(null);
      unregisterPopup(POPUP_ID_PROACTIVE);
    }
  }, [hasBeenOpened, isOpen, markInteracted, unregisterPopup]);

  // Popup 1: Proactive bubble at 20s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userOpenedChatRef.current || wasShown(POPUP_ID_PROACTIVE)) return;
      // Don't show if another popup is active
      if (isAnyPopupOpen) return;

      setProactiveBubble({ message: PROACTIVE_MSG, quickReplies: QUICK_REPLIES });
      markShown(POPUP_ID_PROACTIVE);
      registerPopup(POPUP_ID_PROACTIVE);
    }, PROACTIVE_DELAY_MS);

    return () => clearTimeout(timer);
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Popup 3: Choice modal at 75s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userOpenedChatRef.current || wasShown(POPUP_ID_CHOICE)) return;
      if (isAnyPopupOpen) {
        // If something else is open, retry after 5s
        const retry = setTimeout(() => {
          if (!userOpenedChatRef.current && !wasShown(POPUP_ID_CHOICE) && !isAnyPopupOpen) {
            setShowChoiceModal(true);
            markShown(POPUP_ID_CHOICE);
            registerPopup(POPUP_ID_CHOICE);
          }
        }, 5000);
        return () => clearTimeout(retry);
      }

      setShowChoiceModal(true);
      markShown(POPUP_ID_CHOICE);
      registerPopup(POPUP_ID_CHOICE);
    }, CHOICE_DELAY_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attention animation
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
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [hasBeenOpened]);

  const handleChooseBot = () => {
    setShowChoiceModal(false);
    unregisterPopup(POPUP_ID_CHOICE);
    markInteracted();
    openChat();
  };

  const handleChooseWhatsApp = () => {
    setShowChoiceModal(false);
    unregisterPopup(POPUP_ID_CHOICE);
    markInteracted();
    window.open('https://wa.link/kw53y2', '_blank');
  };

  const handleProactiveDismiss = useCallback(() => {
    setProactiveBubble(null);
    unregisterPopup(POPUP_ID_PROACTIVE);
  }, [unregisterPopup]);

  const handleProactiveReply = useCallback((text: string) => {
    setProactiveBubble(null);
    unregisterPopup(POPUP_ID_PROACTIVE);
    markInteracted();
    openChat();
    setTimeout(() => sendMessage(text), 300);
  }, [openChat, sendMessage, unregisterPopup, markInteracted]);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9997]"
            onClick={toggleOpen}
          />
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onClose={toggleOpen}
            maxInputLength={maxInputLength}
          />
        </>
      )}

      {proactiveBubble && !isOpen && (
        <ProactiveBubble
          message={proactiveBubble.message}
          quickReplies={proactiveBubble.quickReplies}
          onQuickReply={handleProactiveReply}
          onDismiss={handleProactiveDismiss}
        />
      )}

      <ChatChoiceModal
        isOpen={showChoiceModal}
        onClose={() => {
          setShowChoiceModal(false);
          unregisterPopup(POPUP_ID_CHOICE);
        }}
        onChooseBot={handleChooseBot}
        onChooseWhatsApp={handleChooseWhatsApp}
      />

      <button
        onClick={toggleOpen}
        className={`
          fixed bottom-6 right-6 w-14 h-14
          z-[9998] transition-all duration-300
          hover:scale-105 active:scale-95
          ${isOpen ? 'bg-muted rounded-xl flex items-center justify-center shadow-lg' : ''}
        `}
        aria-label={isOpen ? 'סגור צ\'אט' : 'פתח צ\'אט'}
      >
        {isOpen
          ? <X className="w-6 h-6 text-foreground" />
          : <img
              src="/bot-icon.png"
              alt="פתח צ'אט"
              className={`w-full h-full object-contain transition-all duration-300 ${showAnimation && !hasBeenOpened ? 'animate-chat-attention' : ''}`}
            />
        }
      </button>
    </>
  );
};

export default ChatBot;

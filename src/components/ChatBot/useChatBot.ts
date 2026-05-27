import { useState, useCallback, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  showLeadForm?: boolean;
  quickReplies?: string[];
  showWhatsApp?: boolean;
}

// ─── Script ───────────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'היי! ספר לי על העסק שלך — ואני אגיד לך מה אפשר לאוטמט ולחסוך.',
  showQuickReplies: true,
};

type Step = {
  botMessages: string[];
  quickReplies?: string[];
  showLeadForm?: boolean;
  showWhatsApp?: boolean;
};

const SCRIPT: Record<string, Step[]> = {
  'יש לי תהליך ידני שמבזבז זמן': [
    {
      botMessages: ['איזה תהליך? לדוגמה — הכנסת נתונים, מעקב לידים, שליחת עדכונים ללקוחות...'],
      quickReplies: ['הכנסת נתונים ידנית', 'מעקב אחרי לידים', 'עדכונים ללקוחות', 'משהו אחר'],
    },
    {
      botMessages: [
        'נשמע קלאסי 😅\nרוב העסקים שמגיעים אלינו מבזבזים 5-10 שעות בשבוע בדיוק על זה.',
        'אפשר לאוטמט את זה לגמרי — ולפנות לך את הזמן לדברים שבאמת מניעים את העסק.',
        'רוצה שאלעד יציג לך בדיוק איך? 15 דקות ומקבלים תמונה ברורה.',
      ],
      showLeadForm: true,
      showWhatsApp: true,
    },
  ],
  'אני רוצה יותר לידים בלי כאב ראש': [
    {
      botMessages: ['מאיפה מגיעים הלידים שלך היום? (אתר, פייסבוק, המלצות, כמה מהם?)'],
      quickReplies: ['בעיקר מאתר / פייסבוק', 'בעיקר מהמלצות', 'ממקורות שונים', 'עדיין בונה את זה'],
    },
    {
      botMessages: [
        'מעולה — זה בדיוק המקום שבו אוטומציה עושה הכי הרבה הבדל.',
        'מעקב אוטומטי, תזכורות, חיבור ל-CRM — הכל בלי לזכור ידנית.',
        'רוצה לראות מה מתאים לעסק שלך? שיחה של 15 דקות עם אלעד וכבר יש הצעה.',
      ],
      showLeadForm: true,
      showWhatsApp: true,
    },
  ],
  'אני רוצה סדר ודוחות בעסק': [
    {
      botMessages: ['באיזה תחום הכי חסר לך סדר? מכירות, פיננסי, לקוחות, משהו אחר?'],
      quickReplies: ['מכירות ולידים', 'פיננסים והוצאות', 'ניהול לקוחות', 'הכל ביחד 😅'],
    },
    {
      botMessages: [
        'ברור — בלי נתונים מסודרים קשה לקבל החלטות.',
        'דשבורד חי, דוחות אוטומטיים, התראות — הכל אפשרי בלי לגעת בזה.',
        'אלעד יכול למפות את זה בדיוק לעסק שלך. 15 דקות, לא מתחייבים.',
      ],
      showLeadForm: true,
      showWhatsApp: true,
    },
  ],
};

// Generic fallback for free-text or unrecognized inputs
const FALLBACK_STEP: Step = {
  botMessages: [
    'מעניין! כל עסק שונה — לכן אנחנו מתאימים אוטומציה ספציפית לך.',
    'אלעד יכול לשמוע ממך 15 דקות ולתת תמונה ברורה של מה אפשרי.',
  ],
  showLeadForm: true,
  showWhatsApp: true,
};

const NUDGE_MESSAGE: Message = {
  id: 'nudge',
  role: 'assistant',
  content: 'רוב העסקים שמגיעים לפה מבזבזים זמן על תהליכים ידניים.\nרוצה לבדוק אם זה גם המצב אצלך?',
};

const RESET_PHRASES = ['שיחה חדשה', 'התחל מחדש', 'איפוס', 'reset', 'new chat', 'פתיחת שיחה חדשה'];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // Track where we are in the script per topic
  const scriptStateRef = useRef<{ topic: string; stepIndex: number } | null>(null);
  const nudgeTimerRef = useRef<number | null>(null);

  // Nudge timer
  useEffect(() => {
    if (!hasBeenOpened && !showNudge) {
      const delay = 20000 + Math.random() * 10000;
      nudgeTimerRef.current = window.setTimeout(() => {
        if (!hasBeenOpened) {
          setShowNudge(true);
          setMessages(prev => {
            if (!prev.some(m => m.id === 'nudge')) {
              return [...prev, { ...NUDGE_MESSAGE, id: `nudge-${Date.now()}` }];
            }
            return prev;
          });
        }
      }, delay);
    }
    return () => {
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, [hasBeenOpened, showNudge]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    scriptStateRef.current = null;
  }, []);

  const isResetCommand = useCallback((text: string): boolean => {
    const normalized = text.trim().toLowerCase();
    return RESET_PHRASES.some(phrase => normalized === phrase.toLowerCase());
  }, []);

  // Deliver bot messages one by one with a small delay (typing feel)
  const deliverBotMessages = useCallback((steps: string[], extras: Partial<Message> = {}) => {
    setIsLoading(true);
    steps.forEach((content, i) => {
      const isLast = i === steps.length - 1;
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}-${i}`,
            role: 'assistant',
            content,
            ...(isLast ? extras : {}),
          },
        ]);
        if (isLast) setIsLoading(false);
      }, 600 + i * 900);
    });
  }, []);

  const sendMessage = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    if (isResetCommand(trimmedText)) {
      resetChat();
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedText,
    };
    setMessages(prev => [...prev, userMessage]);

    // Determine next script step
    const state = scriptStateRef.current;

    if (!state) {
      // First message — look up topic in script
      const topic = Object.keys(SCRIPT).find(k => k === trimmedText);
      if (topic) {
        const step = SCRIPT[topic][0];
        scriptStateRef.current = { topic, stepIndex: 0 };
        deliverBotMessages(step.botMessages, {
          quickReplies: step.quickReplies,
          showLeadForm: step.showLeadForm,
          showWhatsApp: step.showWhatsApp,
        });
      } else {
        // Free-text input on first message — use fallback
        scriptStateRef.current = { topic: '__fallback__', stepIndex: 0 };
        deliverBotMessages(FALLBACK_STEP.botMessages, {
          showLeadForm: FALLBACK_STEP.showLeadForm,
          showWhatsApp: FALLBACK_STEP.showWhatsApp,
        });
      }
      return;
    }

    // Subsequent messages — advance script
    const { topic, stepIndex } = state;

    if (topic === '__fallback__') {
      // Already showed fallback — just show closing message
      deliverBotMessages(['מעולה! אלעד יחזור אליך בהקדם 👍']);
      return;
    }

    const steps = SCRIPT[topic];
    const nextIndex = stepIndex + 1;

    if (nextIndex < steps.length) {
      scriptStateRef.current = { topic, stepIndex: nextIndex };
      const step = steps[nextIndex];
      deliverBotMessages(step.botMessages, {
        quickReplies: step.quickReplies,
        showLeadForm: step.showLeadForm,
        showWhatsApp: step.showWhatsApp,
      });
    } else {
      // End of script
      deliverBotMessages(['תודה! אלעד יחזור אליך בהקדם 👍']);
    }
  }, [isLoading, isResetCommand, resetChat, deliverBotMessages]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState) {
        setHasBeenOpened(true);
        if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
      }
      return newState;
    });
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasBeenOpened(true);
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
  }, []);

  return {
    messages,
    isLoading,
    isOpen,
    hasBeenOpened,
    sendMessage,
    resetChat,
    toggleOpen,
    openChat,
    maxInputLength: 500,
  };
}

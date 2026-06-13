import { useState, useCallback, useRef, useEffect, type MutableRefObject } from 'react';

const SUPABASE_CHAT_URL = 'https://wotfxbniypocfsgpawak.supabase.co/functions/v1/chat';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdGZ4Ym5peXBvY2ZzZ3Bhd2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjUyNzQsImV4cCI6MjA5Njk0MTI3NH0._fL3RSiTsq6XoOPIAKw-FnMRFVYskCNxolefjEUelec';

async function fetchAIResponse(history: { role: string; content: string }[]): Promise<string> {
  try {
    const res = await fetch(SUPABASE_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ messages: history }),
    });

    if (!res.ok || !res.body) return 'משהו השתבש. נסה שוב.';

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      for (const line of decoder.decode(value, { stream: true }).split('\n')) {
        if (!line.startsWith('data: ') || line.includes('[DONE]')) continue;
        try {
          const json = JSON.parse(line.slice(6));
          result += json.choices?.[0]?.delta?.content ?? '';
        } catch { /* skip */ }
      }
    }
    return result.trim() || 'אלעד יחזור אליך בהקדם.';
  } catch {
    return 'משהו השתבש. נסה שוב.';
  }
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  showLeadForm?: boolean;
  quickReplies?: string[];
  showWhatsApp?: boolean;
}

// ─── Page context ─────────────────────────────────────────────────────────────

const PAGE_GREETINGS: { prefix: string; greeting: string }[] = [
  { prefix: '/blog/5-automation-processes',   greeting: 'קראת על תהליכי אוטומציה — יש לך תהליך שרוצה לאוטמט?' },
  { prefix: '/blog/ai-agent-for-business',    greeting: 'קראת על סוכני AI — רוצה להבין מה מתאים לעסק שלך ספציפית?' },
  { prefix: '/blog/how-to-choose-crm',        greeting: 'קראת על בחירת CRM — אני יכול לעזור לך לבחור את המתאים לך.' },
  { prefix: '/blog/whatsapp-automation',      greeting: 'קראת על WhatsApp אוטומציה — יש שאלה על ההגדרה?' },
  { prefix: '/blog/lead-follow-up',           greeting: 'קראת על מעקב לידים — רוצה לראות איך זה עובד בפועל?' },
  { prefix: '/blog/',                         greeting: 'קראת מאמרים שלנו? יש שאלה על משהו ספציפי?' },
  { prefix: '/solutions/ai-agents',           greeting: 'מתעניין בסוכני AI? אספר לך מה מתאים לעסק שלך ספציפית.' },
  { prefix: '/solutions/whatsapp-automation', greeting: 'רוצה להפוך את WhatsApp לכלי מכירות אוטומטי? ספר לי על העסק.' },
  { prefix: '/solutions/crm-automation',      greeting: 'CRM זה לב העסק — אני אעזור לך להבין איזה מערכת מתאימה לך.' },
  { prefix: '/solutions/',                    greeting: 'אוטומציה עסקית יכולה לחסוך שעות בשבוע — על מה אתה רוצה לדעת?' },
  { prefix: '/about',                         greeting: 'יש לך שאלות עלינו? אשמח לעזור.' },
  { prefix: '/contact',                       greeting: 'יצרת קשר? אני כאן אם יש שאלות בינתיים.' },
];

function getGreeting(path: string): string {
  for (const { prefix, greeting } of PAGE_GREETINGS) {
    if (path.startsWith(prefix)) return greeting;
  }
  return 'היי! ספר לי על העסק שלך — ואני אגיד לך מה אפשר לאוטמט ולחסוך.';
}

function makeInitialMessage(path: string): Message {
  return {
    id: 'welcome',
    role: 'assistant',
    content: getGreeting(path),
    showQuickReplies: true,
  };
}

// ─── Script ───────────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = makeInitialMessage('/');

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

export function useChatBot(currentPath: string = '/') {
  const initialMsg = makeInitialMessage(currentPath);
  const [messages, setMessages] = useState<Message[]>([initialMsg]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  // Track where we are in the script per topic
  const scriptStateRef = useRef<{ topic: string; stepIndex: number } | null>(null);

  // Full conversation history for AI
  const aiHistoryRef = useRef<{ role: string; content: string }[]>([
    { role: 'assistant', content: initialMsg.content },
  ]);
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
    const msg = makeInitialMessage(currentPath);
    setMessages([msg]);
    setIsLoading(false);
    scriptStateRef.current = null;
    aiHistoryRef.current = [{ role: 'assistant', content: msg.content }];
  }, [currentPath]);

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

  const deliverAI = useCallback(async () => {
    setIsLoading(true);
    const reply = await fetchAIResponse(aiHistoryRef.current);
    aiHistoryRef.current.push({ role: 'assistant', content: reply });
    setMessages(prev => [...prev, { id: `ai-${Date.now()}`, role: 'assistant', content: reply }]);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    if (isResetCommand(trimmedText)) {
      resetChat();
      return;
    }

    // Add user message
    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: trimmedText };
    setMessages(prev => [...prev, userMessage]);
    aiHistoryRef.current.push({ role: 'user', content: trimmedText });

    const state = scriptStateRef.current;

    if (!state) {
      const topic = Object.keys(SCRIPT).find(k => k === trimmedText);
      if (topic) {
        const step = SCRIPT[topic][0];
        scriptStateRef.current = { topic, stepIndex: 0 };
        step.botMessages.forEach(m => aiHistoryRef.current.push({ role: 'assistant', content: m }));
        deliverBotMessages(step.botMessages, {
          quickReplies: step.quickReplies,
          showLeadForm: step.showLeadForm,
          showWhatsApp: step.showWhatsApp,
        });
      } else {
        scriptStateRef.current = { topic: '__ai__', stepIndex: 0 };
        await deliverAI();
      }
      return;
    }

    const { topic, stepIndex } = state;

    if (topic === '__ai__' || topic === '__fallback__') {
      await deliverAI();
      return;
    }

    const steps = SCRIPT[topic];
    const nextIndex = stepIndex + 1;

    if (nextIndex < steps.length) {
      scriptStateRef.current = { topic, stepIndex: nextIndex };
      const step = steps[nextIndex];
      step.botMessages.forEach(m => aiHistoryRef.current.push({ role: 'assistant', content: m }));
      deliverBotMessages(step.botMessages, {
        quickReplies: step.quickReplies,
        showLeadForm: step.showLeadForm,
        showWhatsApp: step.showWhatsApp,
      });
    } else {
      // Script done — switch to AI
      scriptStateRef.current = { topic: '__ai__', stepIndex: 0 };
      await deliverAI();
    }
  }, [isLoading, isResetCommand, resetChat, deliverBotMessages, deliverAI]);

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

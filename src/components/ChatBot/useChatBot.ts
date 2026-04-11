import { useState, useCallback, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  showQuickReplies?: boolean;
  showLeadForm?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'היי! ספר לי על העסק שלך — ואני אגיד לך מה אפשר לאוטמט ולחסוך.',
  showQuickReplies: true,
};

const NUDGE_MESSAGE: Message = {
  id: 'nudge',
  role: 'assistant',
  content: 'רוב העסקים שמגיעים לפה מבזבזים זמן על תהליכים ידניים.\nרוצה לבדוק אם זה גם המצב אצלך?',
  showQuickReplies: true,
};

const LEAD_CAPTURE_MESSAGE: Message = {
  id: 'lead-capture',
  role: 'assistant',
  content: 'נשמע שיש פה פוטנציאל 💡\nרוצה שאלעד יחזור אליך לשיחה קצרה? השאר שם ומספר:',
  showLeadForm: true,
};

const RESET_PHRASES = ['שיחה חדשה', 'התחל מחדש', 'איפוס', 'reset', 'new chat', 'פתיחת שיחה חדשה'];
const MAX_MESSAGES_PER_MINUTE = 10;
const MAX_INPUT_LENGTH = 1500;
const MAX_HISTORY = 30;

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const messageTimestamps = useRef<number[]>([]);
  const nudgeTimerRef = useRef<number | null>(null);
  const botResponseCountRef = useRef(0);
  const leadShownRef = useRef(false);

  // Setup nudge timer - show after 20-30 seconds if chat not opened
  useEffect(() => {
    if (!hasBeenOpened && !showNudge) {
      const delay = 20000 + Math.random() * 10000; // 20-30 seconds
      nudgeTimerRef.current = window.setTimeout(() => {
        if (!hasBeenOpened) {
          setShowNudge(true);
          // Add nudge message to chat (will be visible when opened)
          setMessages(prev => {
            // Only add if not already there
            if (!prev.some(m => m.id === 'nudge')) {
              return [...prev, { ...NUDGE_MESSAGE, id: `nudge-${Date.now()}` }];
            }
            return prev;
          });
        }
      }, delay);
    }

    return () => {
      if (nudgeTimerRef.current) {
        clearTimeout(nudgeTimerRef.current);
      }
    };
  }, [hasBeenOpened, showNudge]);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    messageTimestamps.current = messageTimestamps.current.filter(t => t > oneMinuteAgo);
    return messageTimestamps.current.length < MAX_MESSAGES_PER_MINUTE;
  }, []);

  const resetChat = useCallback(() => {
    setMessages([{ ...INITIAL_MESSAGE, id: `welcome-${Date.now()}` }]);
    setIsLoading(false);
    botResponseCountRef.current = 0;
    leadShownRef.current = false;
  }, []);

  const isResetCommand = useCallback((text: string): boolean => {
    const normalized = text.trim().toLowerCase();
    return RESET_PHRASES.some(phrase => normalized === phrase.toLowerCase());
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    // Check for reset command
    if (isResetCommand(trimmedText)) {
      resetChat();
      return;
    }

    // Rate limit check
    if (!checkRateLimit()) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'לאט לאט... נסה שוב בעוד כמה שניות',
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Validate input length
    const validatedText = trimmedText.slice(0, MAX_INPUT_LENGTH);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: validatedText,
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      // Limit history
      if (updated.length > MAX_HISTORY) {
        return [INITIAL_MESSAGE, ...updated.slice(-MAX_HISTORY + 1)];
      }
      return updated;
    });

    messageTimestamps.current.push(Date.now());
    setIsLoading(true);

    try {
      // Prepare messages for API (exclude welcome message quick replies flag)
      const apiMessages = messages
        .filter(m => m.id !== 'welcome' || m.content)
        .map(m => ({ role: m.role, content: m.content }))
        .concat([{ role: 'user' as const, content: validatedText }]);

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        let errorText = 'משהו השתבש, נסה שוב';
        if (response.status === 429) {
          errorText = 'יותר מדי בקשות, נסה שוב בעוד דקה';
        } else if (response.status === 402) {
          errorText = 'השירות לא זמין כרגע';
        }

        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: errorText,
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      // Handle streaming response
      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      const assistantId = `assistant-${Date.now()}`;

      // Add empty assistant message
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put back and wait
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            /* ignore partial leftovers */
          }
        }
      }

      // After 3rd bot response, show lead capture form
      botResponseCountRef.current += 1;
      if (botResponseCountRef.current >= 3 && !leadShownRef.current) {
        leadShownRef.current = true;
        setMessages(prev => [
          ...prev,
          { ...LEAD_CAPTURE_MESSAGE, id: `lead-${Date.now()}` },
        ]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'משהו השתבש, נסה שוב',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, checkRateLimit, isResetCommand, resetChat]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState) {
        setHasBeenOpened(true);
        // Clear nudge timer when opened
        if (nudgeTimerRef.current) {
          clearTimeout(nudgeTimerRef.current);
        }
      }
      return newState;
    });
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasBeenOpened(true);
    if (nudgeTimerRef.current) {
      clearTimeout(nudgeTimerRef.current);
    }
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
    maxInputLength: MAX_INPUT_LENGTH,
  };
}

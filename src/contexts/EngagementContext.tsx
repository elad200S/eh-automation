import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface EngagementContextType {
  /** Whether any popup/bubble is currently visible */
  isAnyPopupOpen: boolean;
  /** Whether user has meaningfully interacted (opened chat, submitted form, etc.) */
  hasInteracted: boolean;
  /** Register that a popup is now showing */
  registerPopup: (id: string) => void;
  /** Register that a popup was closed/dismissed */
  unregisterPopup: (id: string) => void;
  /** Mark user as having interacted */
  markInteracted: () => void;
  /** Check if a specific popup was already shown */
  wasShown: (id: string) => boolean;
  /** Mark a popup as shown (so it won't show again) */
  markShown: (id: string) => void;
}

const EngagementContext = createContext<EngagementContextType>({
  isAnyPopupOpen: false,
  hasInteracted: false,
  registerPopup: () => {},
  unregisterPopup: () => {},
  markInteracted: () => {},
  wasShown: () => false,
  markShown: () => {},
});

export const useEngagement = () => useContext(EngagementContext);

export const EngagementProvider = ({ children }: { children: ReactNode }) => {
  const [activePopups, setActivePopups] = useState<Set<string>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);
  const shownRef = useRef<Set<string>>(new Set());

  const isAnyPopupOpen = activePopups.size > 0;

  const registerPopup = useCallback((id: string) => {
    setActivePopups(prev => new Set(prev).add(id));
  }, []);

  const unregisterPopup = useCallback((id: string) => {
    setActivePopups(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const markInteracted = useCallback(() => setHasInteracted(true), []);

  const wasShown = useCallback((id: string) => shownRef.current.has(id), []);

  const markShown = useCallback((id: string) => {
    shownRef.current.add(id);
  }, []);

  return (
    <EngagementContext.Provider value={{
      isAnyPopupOpen,
      hasInteracted,
      registerPopup,
      unregisterPopup,
      markInteracted,
      wasShown,
      markShown,
    }}>
      {children}
    </EngagementContext.Provider>
  );
};

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ContactPopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const ContactPopupContext = createContext<ContactPopupContextType>({
  isOpen: false,
  openPopup: () => {},
  closePopup: () => {},
});

export const useContactPopup = () => useContext(ContactPopupContext);

export const ContactPopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = useCallback(() => setIsOpen(true), []);
  const closePopup = useCallback(() => setIsOpen(false), []);

  return (
    <ContactPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </ContactPopupContext.Provider>
  );
};

import { createContext, useContext, useEffect, useState } from 'react';

export interface SimpleUser {
  email: string;
}

interface AuthContextType {
  user: SimpleUser | null;
  loading: boolean;
  login: (user: SimpleUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  signOut: () => {},
});

const STORAGE_KEY = 'eh_portal_session';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  const login = (newUser: SimpleUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

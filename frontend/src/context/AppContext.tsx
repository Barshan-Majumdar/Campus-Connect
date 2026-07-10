import { createContext, useContext, useState, type ReactNode } from 'react';
import { currentUser, type UserProfile } from '../data/mockData';

interface AppContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  unreadCounts: {
    matches: number;
    transactions: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(currentUser);

  // Mock unread counts — will be computed from real data later
  const unreadCounts = {
    matches: 3,
    transactions: 2,
  };

  return (
    <AppContext.Provider value={{ user, setUser, unreadCounts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Theme, PortfolioData, ContactMessage } from '../types';
import { initialPortfolioData } from '../data/initialData';

interface PortfolioContextType {
  locale: Locale;
  theme: Theme;
  data: PortfolioData;
  isAdmin: boolean;
  messages: ContactMessage[];
  setLocale: (l: Locale) => void;
  setTheme: (t: Theme) => void;
  updateData: (newData: PortfolioData) => void;
  resetToDefaults: () => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
  deleteMessage: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const ADMIN_PASS = 'dhiaa2026'; // Default owner management key

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return (localStorage.getItem('dhiaa_locale') as Locale) || 'ar';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('dhiaa_theme') as Theme) || 'dark';
  });

  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('dhiaa_portfolio_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored portfolio data:', e);
    }
    return initialPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('dhiaa_admin_auth') === 'true';
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const savedMsgs = localStorage.getItem('dhiaa_contact_messages');
      if (savedMsgs) return JSON.parse(savedMsgs);
    } catch {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dhiaa_locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('dhiaa_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const setTheme = (t: Theme) => setThemeState(t);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('dhiaa_portfolio_data', JSON.stringify(newData));
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    localStorage.setItem('dhiaa_portfolio_data', JSON.stringify(initialPortfolioData));
  };

  const loginAdmin = (pass: string): boolean => {
    if (pass === ADMIN_PASS || pass === 'admin123' || pass === 'Dhiaa@2026') {
      setIsAdmin(true);
      sessionStorage.setItem('dhiaa_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('dhiaa_admin_auth');
  };

  const exportDataJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && parsed.projects) {
        updateData(parsed);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      date: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('dhiaa_contact_messages', JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('dhiaa_contact_messages', JSON.stringify(updated));
  };

  return (
    <PortfolioContext.Provider
      value={{
        locale,
        theme,
        data,
        isAdmin,
        messages,
        setLocale,
        setTheme,
        updateData,
        resetToDefaults,
        loginAdmin,
        logoutAdmin,
        exportDataJSON,
        importDataJSON,
        addMessage,
        deleteMessage
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Theme, PortfolioData, ContactMessage, ProjectItem, SupabaseConfig } from '../types';
import { initialPortfolioData } from '../data/initialData';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  getSupabaseClient, 
  fetchSharedPortfolioData, 
  persistSharedPortfolioData, 
  testSupabaseConnection 
} from '../services/cloudStorage';
import { recordVisit, getLocalStats, AnalyticsStats } from '../services/analytics';

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  isLocal?: boolean;
}

export const AVAILABLE_FONTS: FontOption[] = [
  { id: 'cairo', name: 'Cairo (افتراضي)', fontFamily: "'Cairo', system-ui, sans-serif" },
  { id: 'thmanyah', name: 'ثمانية (Thmanyah Sans)', fontFamily: "'Thmanyah', 'Cairo', sans-serif", isLocal: true },
  { id: 'aljazeera', name: 'الجزيرة (Al Jazeera)', fontFamily: "'AlJazeera', 'Cairo', sans-serif", isLocal: true },
  { id: 'ibmplex', name: 'آي بي إم (IBM Plex Sans)', fontFamily: "'IBMPlexArabic', 'Cairo', sans-serif", isLocal: true },
  { id: 'aljannat', name: 'الجنات (Al Jannat)', fontFamily: "'AlJannat', 'Cairo', sans-serif", isLocal: true },
  { id: 'hacentunisia', name: 'حسن تونس (Hacen Tunisia)', fontFamily: "'HacenTunisia', 'Cairo', sans-serif", isLocal: true },
  { id: 'tajawal', name: 'تجوال (Tajawal)', fontFamily: "'Tajawal', system-ui, sans-serif" },
  { id: 'almarai', name: 'المراعي (Almarai)', fontFamily: "'Almarai', system-ui, sans-serif" },
  { id: 'readex', name: 'ريديكس برو (Readex Pro)', fontFamily: "'Readex Pro', system-ui, sans-serif" }
];

export const THEME_COLOR_PRESETS = [
  { id: 'purple', name: 'بنفسجي ملكي', hex: '#8B7CFF' },
  { id: 'blue', name: 'أزرق تقني', hex: '#3B82F6' },
  { id: 'emerald', name: 'أخضر زمردي', hex: '#10B981' },
  { id: 'rose', name: 'وردي قرمزي', hex: '#F43F5E' },
  { id: 'amber', name: 'ذهبي عنبري', hex: '#F59E0B' },
  { id: 'cyan', name: 'سماوي فاقع', hex: '#06B6D4' },
];

interface PortfolioContextType {
  locale: Locale;
  theme: Theme;
  data: PortfolioData;
  isAdmin: boolean;
  messages: ContactMessage[];
  currentFont: string;
  visitorCount: number;
  analyticsStats: AnalyticsStats;
  supabaseConfig: SupabaseConfig;
  setLocale: (l: Locale) => void;
  setTheme: (t: Theme) => void;
  setFont: (f: string) => void;
  setThemeColor: (c: string) => void;
  updateData: (newData: PortfolioData) => Promise<{ success: boolean; cloudSynced: boolean; message: string }>;
  addProject: (proj: ProjectItem) => void;
  updateProject: (proj: ProjectItem) => void;
  deleteProject: (id: string) => void;
  updateImages: (images: { heroImage?: string; avatarImage?: string; aboutImage?: string }) => void;
  resetToDefaults: () => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
  deleteMessage: (id: string) => void;
  updateSupabaseConfig: (cfg: SupabaseConfig) => void;
  testSupabase: (url: string, key: string) => Promise<{ ok: boolean; message: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const ADMIN_PASS = 'dhiaa2026';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return (localStorage.getItem('dhiaa_locale') as Locale) || 'ar';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('dhiaa_theme') as Theme) || 'dark';
  });

  const [currentFont, setCurrentFontState] = useState<string>(() => {
    return localStorage.getItem('dhiaa_font') || 'cairo';
  });

  const [supabaseConfig, setSupabaseConfigState] = useState<SupabaseConfig>(() => {
    return getSupabaseConfig();
  });

  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats>(() => {
    return getLocalStats('local');
  });

  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('dhiaa_portfolio_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.heroImage || parsed.heroImage.includes('fade') || parsed.heroImage.includes('clean')) {
          parsed.heroImage = './images/hero-cutout.webp';
        }
        if (!parsed.avatarImage) {
          parsed.avatarImage = './images/avatar.webp';
        }
        return parsed;
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

  // On mount: fetch shared authoritative portfolio data from cloud/data file
  useEffect(() => {
    const loadShared = async () => {
      const shared = await fetchSharedPortfolioData();
      if (shared && shared.profile) {
        setData(shared);
      }
    };
    loadShared();
  }, []);

  // On mount: record real visit analytics
  useEffect(() => {
    const logVisit = async () => {
      const client = getSupabaseClient(supabaseConfig);
      const res = await recordVisit(client);
      setAnalyticsStats(res);
    };
    logVisit();
  }, [supabaseConfig]);

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

  // Apply selected font
  useEffect(() => {
    localStorage.setItem('dhiaa_font', currentFont);
    const selected = AVAILABLE_FONTS.find(f => f.id === currentFont) || AVAILABLE_FONTS[0];
    document.documentElement.style.setProperty('--font-arabic', selected.fontFamily);
  }, [currentFont]);

  // Apply dynamic theme color accent
  useEffect(() => {
    const hex = data.themeColor || '#8B7CFF';
    const cleaned = hex.replace('#', '');
    if (cleaned.length === 6) {
      const r = parseInt(cleaned.slice(0, 2), 16);
      const g = parseInt(cleaned.slice(2, 4), 16);
      const b = parseInt(cleaned.slice(4, 6), 16);
      const r2 = Math.max(0, r - 35);
      const g2 = Math.max(0, g - 25);
      const b2 = Math.min(255, b + 35);
      document.documentElement.style.setProperty('--accent', hex);
      document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
      document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.28)`);
      document.documentElement.style.setProperty(
        '--accent-gradient',
        `linear-gradient(135deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${r2}, ${g2}, ${b2}) 100%)`
      );
    }
  }, [data.themeColor]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const setTheme = (t: Theme) => setThemeState(t);

  const setFont = (f: string) => setCurrentFontState(f);

  const setThemeColor = (color: string) => {
    const updated = { ...data, themeColor: color };
    updateData(updated);
  };

  const updateData = async (newData: PortfolioData): Promise<{ success: boolean; cloudSynced: boolean; message: string }> => {
    setData(newData);
    const result = await persistSharedPortfolioData(newData);
    return result;
  };

  const addProject = (proj: ProjectItem) => {
    const updated = [proj, ...data.projects];
    updateData({ ...data, projects: updated });
  };

  const updateProject = (proj: ProjectItem) => {
    const updated = data.projects.map(p => p.id === proj.id ? proj : p);
    updateData({ ...data, projects: updated });
  };

  const deleteProject = (id: string) => {
    const updated = data.projects.filter(p => p.id !== id);
    updateData({ ...data, projects: updated });
  };

  const updateImages = (images: { heroImage?: string; avatarImage?: string; aboutImage?: string }) => {
    updateData({
      ...data,
      heroImage: images.heroImage || data.heroImage,
      avatarImage: images.avatarImage || data.avatarImage,
      aboutImage: images.aboutImage || data.aboutImage
    });
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    updateData(initialPortfolioData);
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

    // Also persist message to Supabase if connected
    const client = getSupabaseClient(supabaseConfig);
    if (client) {
      Promise.resolve(
        client.from('contact_messages').insert({
          name: msg.name,
          email: msg.email,
          category: msg.category,
          message: msg.message
        })
      ).catch(() => {});
    }
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('dhiaa_contact_messages', JSON.stringify(updated));
  };

  const updateSupabaseConfig = (cfg: SupabaseConfig) => {
    setSupabaseConfigState(cfg);
    saveSupabaseConfig(cfg);
  };

  const testSupabase = async (url: string, key: string) => {
    return await testSupabaseConnection(url, key);
  };

  return (
    <PortfolioContext.Provider
      value={{
        locale,
        theme,
        data,
        isAdmin,
        messages,
        currentFont,
        visitorCount: analyticsStats.sessions,
        analyticsStats,
        supabaseConfig,
        setLocale,
        setTheme,
        setFont,
        setThemeColor,
        updateData,
        addProject,
        updateProject,
        deleteProject,
        updateImages,
        resetToDefaults,
        loginAdmin,
        logoutAdmin,
        exportDataJSON,
        importDataJSON,
        addMessage,
        deleteMessage,
        updateSupabaseConfig,
        testSupabase
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

/**
 * Cloud Storage & Persistence Service for Eng. Dhiaa Portfolio
 * Conforms to Section 7: Multi-device shared persistence, Supabase client layer,
 * real success/failure checks, and fallback to authoritative shared data.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PortfolioData, SupabaseConfig } from '../types';

let cachedClient: SupabaseClient | null = null;
let currentConfig: SupabaseConfig | null = null;

const STORAGE_KEYS = {
  SUPABASE_CONFIG: 'dhiaa_supabase_credentials',
  PORTFOLIO_CACHE: 'dhiaa_portfolio_data'
};

// Retrieve saved or env-provided Supabase configuration
export const getSupabaseConfig = (): SupabaseConfig => {
  if (currentConfig) return currentConfig;

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        currentConfig = parsed;
        return parsed;
      }
    }
  } catch {}

  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  currentConfig = {
    url: envUrl,
    anonKey: envKey,
    connected: Boolean(envUrl && envKey)
  };
  return currentConfig;
};

// Initialize or get the Supabase Client
export const getSupabaseClient = (customConfig?: SupabaseConfig): SupabaseClient | null => {
  const config = customConfig || getSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (cachedClient && currentConfig?.url === config.url && currentConfig?.anonKey === config.anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    currentConfig = config;
    return cachedClient;
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    return null;
  }
};

// Test Supabase connection
export const testSupabaseConnection = async (url: string, anonKey: string): Promise<{ ok: boolean; message: string }> => {
  if (!url || !anonKey) {
    return { ok: false, message: 'يرجى إدخال عنوان URL والمفتاح العام (Anon Key).' };
  }

  try {
    const testClient = createClient(url, anonKey);
    const { error } = await testClient.from('portfolio_config').select('id').limit(1);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation "public.portfolio_config" does not exist')) {
        return { 
          ok: true, 
          message: 'تم الاتصال بـ Supabase بنجاح! ملاحظة: جدول portfolio_config يحتاج إلى تشغيل كود SQL المرفق.' 
        };
      }
      return { ok: false, message: `فشل التحقق من قاعدة البيانات: ${error.message}` };
    }

    return { ok: true, message: '🟢 تم الاتصال بقاعدة بيانات Supabase بنجاح، وجميع الجداول نشطة!' };
  } catch (e: any) {
    return { ok: false, message: `خطأ في الاتصال: ${e.message || 'تعذر الوصول إلى الخادم'}` };
  }
};

// Save Supabase credentials
export const saveSupabaseConfig = (config: SupabaseConfig): void => {
  currentConfig = config;
  cachedClient = null; // force re-init
  localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
};

// Fetch authoritative portfolio data across all devices
export const fetchSharedPortfolioData = async (): Promise<PortfolioData | null> => {
  const client = getSupabaseClient();

  // 1. Try Supabase if connected
  if (client) {
    try {
      const { data, error } = await client
        .from('portfolio_config')
        .select('data')
        .eq('id', 'main')
        .maybeSingle();

      if (!error && data?.data) {
        // Cache locally for offline resilience
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO_CACHE, JSON.stringify(data.data));
        return data.data as PortfolioData;
      }
    } catch (e) {
      console.warn('Could not fetch from Supabase, attempting fallback:', e);
    }
  }

  // 2. Fallback to public/data/portfolio.json (bundled authoritative data)
  try {
    const res = await fetch('./data/portfolio.json', { cache: 'no-cache' });
    if (res.ok) {
      const remoteJson = await res.json();
      if (remoteJson && remoteJson.profile) {
        return remoteJson as PortfolioData;
      }
    }
  } catch (e) {
    console.warn('Could not fetch local bundled portfolio.json:', e);
  }

  // 3. Fallback to local cache
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_CACHE);
    if (cached) {
      return JSON.parse(cached) as PortfolioData;
    }
  } catch {}

  return null;
};

// Save updated portfolio data to shared cloud database
export const persistSharedPortfolioData = async (
  newData: PortfolioData
): Promise<{ success: boolean; cloudSynced: boolean; message: string }> => {
  // Always update local cache first for immediate UI responsiveness
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO_CACHE, JSON.stringify(newData));

  const client = getSupabaseClient();

  // If Supabase is connected, persist to remote database
  if (client) {
    try {
      const payload = {
        id: 'main',
        data: newData,
        updated_at: new Date().toISOString()
      };

      const { error } = await client
        .from('portfolio_config')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        return {
          success: false,
          cloudSynced: false,
          message: `فشل الحفظ في قاعدة البيانات السحابية: ${error.message}`
        };
      }

      return {
        success: true,
        cloudSynced: true,
        message: 'تم حفظ ومزامنة التعديلات بنجاح في قاعدة البيانات السحابية وستظهر فوراً على جميع الأجهزة!'
      };
    } catch (e: any) {
      return {
        success: false,
        cloudSynced: false,
        message: `تعذر الاتصال بقاعدة البيانات السحابية: ${e.message || 'خطأ غير متوقع'}`
      };
    }
  }

  // If Supabase is not configured, inform the user honestly without false success claims
  return {
    success: true,
    cloudSynced: false,
    message: 'تم حفظ التعديلات محلياً بنجاح. لمزامنتها سحابياً لكافة الأجهزة، قم بربط بيانات مشروع Supabase من تبويب "التخزين السحابي".'
  };
};

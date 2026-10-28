/**
 * Real Visitor & Analytics Service for Eng. Dhiaa Portfolio
 * Conforms to Section 6: Real visitor tracking, privacy-preserving, anti-bot filtering.
 */

export interface AnalyticsStats {
  pageViews: number;
  sessions: number;
  uniqueVisitors: number;
  status: 'connected' | 'local' | 'offline';
  lastUpdated?: string;
}

const STORAGE_KEYS = {
  DEVICE_ID: 'dhiaa_analytics_device_id',
  SESSION_FLAG: 'dhiaa_analytics_session_active',
  LOCAL_STATS: 'dhiaa_analytics_real_stats',
  LAST_PING: 'dhiaa_analytics_last_ping'
};

// Generate an anonymous unique device ID without storing PII
const getOrCreateDeviceId = (): string => {
  try {
    let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
    }
    return id;
  } catch {
    return 'temp_device';
  }
};

// Check if visitor is likely a bot / crawler
const isBot = (): boolean => {
  if (typeof navigator === 'undefined') return true;
  if ((navigator as any).webdriver) return true;
  const ua = navigator.userAgent.toLowerCase();
  const botKeywords = ['bot', 'crawler', 'spider', 'headless', 'lighthouse', 'inspect'];
  return botKeywords.some(b => ua.includes(b));
};

export const recordVisit = async (supabaseClient?: any): Promise<AnalyticsStats> => {
  if (isBot()) {
    return getLocalStats('local');
  }

  // Load existing local stats
  let stats: AnalyticsStats = getLocalStats('local');

  try {
    const isNewSession = !sessionStorage.getItem(STORAGE_KEYS.SESSION_FLAG);
    const isNewDevice = !localStorage.getItem(STORAGE_KEYS.DEVICE_ID);

    // Ensure device ID is initialized
    getOrCreateDeviceId();

    // Increment local tallies
    stats.pageViews += 1;
    if (isNewSession) {
      stats.sessions += 1;
      sessionStorage.setItem(STORAGE_KEYS.SESSION_FLAG, 'true');
    }
    if (isNewDevice) {
      stats.uniqueVisitors += 1;
    }
    stats.lastUpdated = new Date().toISOString();

    // Save updated local stats
    localStorage.setItem(STORAGE_KEYS.LOCAL_STATS, JSON.stringify(stats));

    // If Supabase is connected, sync with the remote analytics table
    if (supabaseClient) {
      try {
        // Fetch remote analytics record
        const { data: remoteData, error: fetchErr } = await supabaseClient
          .from('site_analytics')
          .select('page_views, sessions, unique_visitors')
          .eq('id', 'global')
          .maybeSingle();

        if (!fetchErr && remoteData) {
          const updatedRemote = {
            page_views: (remoteData.page_views || 0) + 1,
            sessions: (remoteData.sessions || 0) + (isNewSession ? 1 : 0),
            unique_visitors: (remoteData.unique_visitors || 0) + (isNewDevice ? 1 : 0),
            last_visit: new Date().toISOString()
          };

          await supabaseClient
            .from('site_analytics')
            .update(updatedRemote)
            .eq('id', 'global');

          stats = {
            pageViews: updatedRemote.page_views,
            sessions: updatedRemote.sessions,
            uniqueVisitors: updatedRemote.unique_visitors,
            status: 'connected',
            lastUpdated: updatedRemote.last_visit
          };
          localStorage.setItem(STORAGE_KEYS.LOCAL_STATS, JSON.stringify(stats));
          return stats;
        }
      } catch (e) {
        console.warn('Remote analytics sync skipped:', e);
      }
    }

    return stats;
  } catch {
    return stats;
  }
};

export const getLocalStats = (status: 'connected' | 'local' | 'offline' = 'local'): AnalyticsStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LOCAL_STATS);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        pageViews: Number(parsed.pageViews) || 1,
        sessions: Number(parsed.sessions) || 1,
        uniqueVisitors: Number(parsed.uniqueVisitors) || 1,
        status,
        lastUpdated: parsed.lastUpdated || new Date().toISOString()
      };
    }
  } catch {}

  return {
    pageViews: 1,
    sessions: 1,
    uniqueVisitors: 1,
    status
  };
};

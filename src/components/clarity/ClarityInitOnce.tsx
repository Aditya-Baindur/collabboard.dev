// src/components/ClarityInitOnce.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Clarity from '@microsoft/clarity';

declare global {
  interface Window {
    __CLARITY_LOADED__?: boolean;
    clarity?: (...args: unknown[]) => void;
  }
}

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
  version: string;
};

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// --- SINGLETON GUARDS ----------------------------------------------------
// Module-level guard (persists through component remounts in the same module)
let moduleInited = false;
// Prevent adding multiple listeners if component is remounted
let moduleListenerAttached = false;

function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('cookie-preferences');
    if (!raw) return true;
    const prefs = JSON.parse(raw) as CookiePreferences;
    if (typeof prefs.analytics === 'boolean') return prefs.analytics;
    return true;
  } catch {
    return true;
  }
}

function initClarityOnce() {
  // window-level guard (persists across module reloads)
  if (typeof window !== 'undefined' && window.__CLARITY_LOADED__) return;

  // session guard (once per browser tab session)
  if (sessionStorage.getItem('clarity:loaded') === '1') return;

  if (!CLARITY_ID || process.env.NODE_ENV !== 'production') return;
  if (!hasAnalyticsConsent()) return;

  try {
    Clarity.init(CLARITY_ID);
    Clarity.consent(true);
    window.__CLARITY_LOADED__ = true;
    sessionStorage.setItem('clarity:loaded', '1');
    moduleInited = true;
  } catch {
    // ignore
  }
}

export default function ClarityInitOnce() {
  const pathname = usePathname();

  // 1) Try to init at mount
  useEffect(() => {
    initClarityOnce();

    // 2) Listen for consent changes exactly once per page lifetime
    if (!moduleListenerAttached) {
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<CookiePreferences>).detail;
        if (detail?.analytics) {
          initClarityOnce();
        } else {
          try {
            window.clarity?.('consent', false);
            Clarity.consent(false);
          } catch {}
          // clear guards so if user re-enables later, we can re-init
          if (typeof window !== 'undefined') window.__CLARITY_LOADED__ = false;
          sessionStorage.removeItem('clarity:loaded');
          moduleInited = false;
        }
      };

      window.addEventListener('cookiePreferencesChanged', handler as EventListener);
      moduleListenerAttached = true;
    }
  }, []);

  // 3) Tag SPA route changes (only if we already initialized)
  useEffect(() => {
    // guard both paths: module + window flag
    const loaded = moduleInited || (typeof window !== 'undefined' && !!window.__CLARITY_LOADED__);
    if (!loaded) return;

    try {
      Clarity.setTag('path', pathname || '/');
      Clarity.event('page_view');
    } catch {}
  }, [pathname]);

  return null;
}

// utils/cookieUtils.ts

import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
  version: string;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
  timestamp: Date.now(),
  version: '1.0',
};

/**
 * Get cookie preferences from localStorage
 */
export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

  try {
    const stored = localStorage.getItem('cookie-preferences');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading cookie preferences:', error);
  }

  return DEFAULT_PREFERENCES;
};

/**
 * Get cookie preferences from server-side cookie
 */
export const getCookiePreferencesFromCookie = (cookieString: string): CookiePreferences => {
  try {
    const cookies = parseCookies(cookieString);
    const consentCookie = cookies['cookie-consent'];

    if (consentCookie) {
      const decoded = atob(consentCookie);
      return JSON.parse(decoded);
    }
  } catch (error) {
    console.error('Error parsing cookie preferences from cookie:', error);
  }

  return DEFAULT_PREFERENCES;
};

/**
 * Check if a specific cookie category is consented
 */
export const hasConsentFor = (category: keyof CookiePreferences): boolean => {
  const preferences = getCookiePreferences();
  return preferences[category] === true;
};

/**
 * Parse cookie string into object
 */
const parseCookies = (cookieString: string): Record<string, string> => {
  return cookieString.split(';').reduce(
    (acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    },
    {} as Record<string, string>
  );
};

/**
 * Check if user has made any cookie choice
 */
export const hasUserMadeCookieChoice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return localStorage.getItem('cookie-preferences') !== null;
};

/**
 * Revoke all non-essential cookies
 */
export const revokeAllCookies = (): void => {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    timestamp: Date.now(),
    version: '1.0',
  };

  localStorage.setItem('cookie-preferences', JSON.stringify(preferences));

  // Create cookie for server-side access
  const cookieValue = btoa(JSON.stringify(preferences));
  document.cookie = `cookie-consent=${cookieValue}; path=/; max-age=31536000; SameSite=Strict`;

  // Dispatch event
  window.dispatchEvent(
    new CustomEvent('cookiePreferencesChanged', {
      detail: preferences,
    })
  );
};

/**
 * Hook for React components to use cookie preferences
 */
export const useCookiePreferences = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Load initial preferences
    setPreferences(getCookiePreferences());

    // Listen for changes
    const handleChange = (event: CustomEvent) => {
      setPreferences(event.detail);
    };

    window.addEventListener('cookiePreferencesChanged', handleChange as EventListener);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handleChange as EventListener);
    };
  }, []);

  return preferences;
};

/**
 * Set and persist cookie preferences
 */
export const setCookiePreferences = (preferences: CookiePreferences) => {
  const updated = {
    ...preferences,
    timestamp: Date.now(),
    version: '1.0',
  };

  // Save to localStorage
  localStorage.setItem('cookie-preferences', JSON.stringify(updated));

  // Save to cookie (for SSR)
  const cookieValue = btoa(JSON.stringify(updated));
  document.cookie = `cookie-consent=${cookieValue}; path=/; max-age=31536000; SameSite=Strict`;

  // Notify all listeners
  window.dispatchEvent(
    new CustomEvent('cookiePreferencesChanged', {
      detail: updated,
    })
  );
};

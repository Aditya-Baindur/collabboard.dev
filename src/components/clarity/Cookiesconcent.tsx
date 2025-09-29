// src/components/CookieConsent.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  setCookiePreferences,
  getCookiePreferences,
  DEFAULT_PREFERENCES,
  type CookiePreferences,
} from '@/utils/cookieUtils';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    // Show if no saved preferences exist
    const prefs = getCookiePreferences();
    const hasChoice =
      prefs.timestamp !== DEFAULT_PREFERENCES.timestamp || // user changed something
      !!localStorage.getItem('cookie-preferences');

    if (!hasChoice) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  const acceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: Date.now(),
      version: '1.0',
    };
    setCookiePreferences(prefs);
    setVisible(false);
  };

  const decline = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: Date.now(),
      version: '1.0',
    };
    setCookiePreferences(prefs);
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed left-4 right-4 bottom-4 z-50 mx-auto max-w-md"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 36 }}
          transition={{ duration: 0.22 }}
        >
          <div className="relative rounded-lg border border-border bg-white p-4 shadow-lg ">
            <button
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 "
              onClick={decline}
              aria-label="Close cookie consent"
            >
              <X className="h-3 w-3" />
            </button>

            <h3 className="mb-2 text-base font-semibold text-foreground">We value your privacy</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              We use cookies for essential site features, analytics, and personalization. Click
              “Accept all” to enable analytics and personalization, or “Decline” to keep only
              essential cookies.
            </p>

            <div className="flex justify-center gap-3">
              <Button size="sm" onClick={acceptAll}>
                Accept all
              </Button>
              <Button size="sm" variant="outline" onClick={decline}>
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

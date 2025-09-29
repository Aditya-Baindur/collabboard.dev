// components/TweetEmbed.tsx
'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

type Props = {
  tweetId: string; // e.g. '1972495491666710839'
  theme?: 'light' | 'dark';
  lang?: string;
};

export default function TweetEmbed({ tweetId, theme = 'light', lang = 'en' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tryRender = () => {
      // @ts-expect-error twttr is injected by widgets.js
      if (window.twttr?.widgets && ref.current) {
        // @ts-expect-error: twttr is injected globally by Twitter widgets.js and may not be typed
        window.twttr.widgets.createTweet(tweetId, ref.current, {
          theme,
          lang,
          dnt: true,
        });
      }
    };
    tryRender();
  }, [tweetId, theme, lang]);

  return (
    <>
      <div ref={ref} />
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </>
  );
}

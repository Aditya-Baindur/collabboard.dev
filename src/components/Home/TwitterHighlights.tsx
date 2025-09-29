'use client';

import { Tweet } from 'react-tweet';

const tweets = [
  { id: '1972495491666710839', label: 'AI Meeting Recaps' },
  { id: '1970528170042012082', label: 'Facilitation Rituals' },
  { id: '1968754630683031975', label: 'Product Updates' },
];

export default function TwitterHighlights() {
  return (
    <section className="bg-gradient-to-b from-white via-white/80 to-[var(--color-company-bg)] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
            Live on X (Twitter)
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What the Colabboard crew is sharing in real-time
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Product drops, facilitation rituals, and the behind-the-scenes experiments powering more
            intentional collaboration.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tweets.map((tweet) => (
            <article
              key={tweet.id}
              className="group flex h-full flex-col gap-6 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_40px_100px_-70px_rgba(138,107,255,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_120px_-60px_rgba(138,107,255,0.5)]"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-logo-purple)]">
                {tweet.label}
              </div>
              <div className="-mx-2 -mb-2 flex-1 overflow-hidden rounded-2xl bg-white/60 p-2">
                <Tweet id={tweet.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

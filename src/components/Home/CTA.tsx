'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

const celebratoryMessages = [
  'You’re 45 seconds away from your first workshop ✨',
  'Templates, timers and AI notes are ready for you 💡',
  'Invite your team and make meetings feel magical 🌈'
];

export default function CTA() {
  const [messageIndex, setMessageIndex] = useState(0);

  const onCelebrate = () => {
    setMessageIndex((index) => (index + 1) % celebratoryMessages.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-400 to-sky-400 py-24 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-16 top-12 h-48 w-48 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-sky-200/60 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center lg:px-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">
          <Sparkles className="h-3.5 w-3.5" />
          Start co-creating today
        </span>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Launch your next workshop in minutes.
        </h2>
        <p className="max-w-2xl text-lg text-white/80">
          Create a free workspace, invite collaborators and explore gorgeous Excalidraw frames built for product, design and research rituals.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button className="group flex items-center gap-2 bg-white text-emerald-600 hover:bg-white/90" onClick={onCelebrate}>
            Claim your workspace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
            Talk to our team
          </Button>
        </div>
        <p className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white/90 transition">
          {celebratoryMessages[messageIndex]}
        </p>
      </div>
    </section>
  );
}

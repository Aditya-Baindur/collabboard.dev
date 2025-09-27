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
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,155,255,0.12),_transparent_60%)]" aria-hidden />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center lg:px-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600">
          <Sparkles className="h-3.5 w-3.5 text-slate-400" />
          Start co-creating today
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Launch your next workshop in minutes.
        </h2>
        <p className="max-w-2xl text-lg text-slate-600">
          Create a free workspace, invite collaborators and explore gorgeous Excalidraw frames built for product, design and research rituals.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button className="group flex items-center gap-2 bg-slate-900 text-white shadow-[0_40px_120px_-70px_rgba(15,23,42,0.6)] hover:bg-slate-800" onClick={onCelebrate}>
            Claim your workspace
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            Talk to our team
          </Button>
        </div>
        <p className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 shadow-sm transition">
          {celebratoryMessages[messageIndex]}
        </p>
      </div>
    </section>
  );
}

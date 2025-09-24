'use client';

import { useState } from 'react';
import { ArrowRight, LineChart, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const floatingNotes = [
  {
    title: 'Sprint Retro',
    body: 'Dot vote, timers & breakout tasks in one board.',
    top: '12%',
    left: '8%',
    rotation: '-6deg',
    color: 'from-amber-200 via-amber-100 to-white'
  },
  {
    title: 'Workshop Agenda',
    body: 'Frame templates keep facilitators on track.',
    top: '58%',
    left: '18%',
    rotation: '8deg',
    color: 'from-sky-200 via-white to-sky-50'
  },
  {
    title: 'Feedback Wall',
    body: 'Comment threads stay attached to every idea.',
    top: '22%',
    left: '60%',
    rotation: '3deg',
    color: 'from-violet-200 via-white to-violet-50'
  }
];

export default function Hero() {
  const [showCursors, setShowCursors] = useState(true);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed850,transparent_60%)]" aria-hidden />
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-emerald-400 blur-[140px]" />
        <div className="absolute top-48 right-1/4 h-72 w-72 rounded-full bg-indigo-500 blur-[140px]" />
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 lg:px-12">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-medium tracking-wide">colabboard</span>
        </div>
        <nav className="hidden items-center gap-10 text-sm text-slate-200 md:flex">
          {['Features', 'Workflow', 'Pricing', 'FAQ'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
              {item}
            </Link>
          ))}
        </nav>
        <div className="hidden gap-3 md:flex">
          <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
            Sign in
          </Button>
          <Button className="bg-white text-slate-900 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300">
            Join the beta
          </Button>
        </div>
      </header>

      <div className="relative z-20 mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-6 lg:flex-row lg:items-center lg:gap-24 lg:px-12">
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <Users className="h-3.5 w-3.5" />
            Real-time product workshops
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Visual collaboration designed for facilitators who move fast.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Host guided workshops, capture ideas in beautiful Excalidraw frames, and turn conversations into structured plans your
            team can execute instantly.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button className="group flex items-center gap-2 bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300">
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <button
              onClick={() => setShowCursors((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white hover:text-white"
            >
              <LineChart className="h-4 w-4" />
              {showCursors ? 'Pause live cursors' : 'Preview live cursors'}
            </button>
          </div>

          <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-slate-400">Facilitators onboarded</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">12k+</dd>
            </div>
            <div>
              <dt className="text-slate-400">Workshop templates</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">84</dd>
            </div>
            <div>
              <dt className="text-slate-400">Average session rating</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">4.9/5</dd>
            </div>
          </dl>
        </div>

        <div className="relative flex flex-1 justify-center lg:justify-end">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.45)] backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,#1f2937_0%,#111827_100%)]" />
              <div className="absolute inset-0 opacity-50">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.4),transparent_55%)]" />
              </div>

              <div className="relative h-full w-full">
                {floatingNotes.map((note) => (
                  <div
                    key={note.title}
                    className="absolute w-52 max-w-full rounded-2xl border border-white/10 bg-gradient-to-br p-4 text-left text-sm text-slate-900 shadow-lg"
                    style={{ top: note.top, left: note.left, rotate: note.rotation }}
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{note.title}</div>
                    <p className="mt-2 text-slate-700">{note.body}</p>
                  </div>
                ))}

                {showCursors && (
                  <>
                    <span className="absolute left-[28%] top-[38%] flex items-center gap-2 text-xs font-medium text-emerald-200">
                      <span className="flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
                      Anne editing frame
                    </span>
                    <span className="absolute right-[20%] top-[55%] flex items-center gap-2 text-xs font-medium text-sky-200">
                      <span className="flex h-2.5 w-2.5 animate-ping rounded-full bg-sky-400" />
                      Miguel sketching
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[0, 1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-9 w-9 rounded-full border-2 border-slate-900 bg-white/90 backdrop-blur"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(16,185,129,${0.6 - item * 0.1}), rgba(59,130,246,${0.5 - item * 0.1}))`
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">Live collaborators</span>
              </div>
              <span className="text-xs text-slate-400">Auto-saved 2s ago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

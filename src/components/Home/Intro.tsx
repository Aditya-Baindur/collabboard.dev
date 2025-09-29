'use client';
import type { CSSProperties } from 'react';
import { ArrowRight, PlayCircle, Sparkles, Wand2, MoveUpRight, LoaderCircle } from 'lucide-react';
import Link from 'next/link';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { label: 'Features', href: '#features' },
  { label: 'Library', href: '#library' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const highlights = [
  'Live cursors & synced canvases',
  'Guided rituals that feel human',
  'AI notes delivered to your tools',
];

type HeroArtifact = {
  title: string;
  subtitle: string;
  gradient: string;
  accent: string;
  style: CSSProperties;
  rotation: string;
};

const heroArtifacts: HeroArtifact[] = [
  {
    title: 'Sprint Ritual',
    subtitle: '04: Time to ideate',
    gradient: 'from-sky-100 via-white to-white',
    accent: 'bg-sky-500/10 text-sky-600',
    style: { top: '12%', right: '5%' },
    rotation: '-3deg',
  },
  {
    title: 'Research Playback',
    subtitle: 'AI-suggested clusters',
    gradient: 'from-emerald-100 via-white to-white',
    accent: 'bg-emerald-500/10 text-emerald-600',
    style: { bottom: '8%', left: '6%' },
    rotation: '4deg',
  },
];

export default function Hero() {
  const router = useRouter();

  const [starting, setStarting] = useState(false);

  const StartUpSequence = (link: string) => {
    router.push(link);
    setStarting(true);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,155,255,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute -right-32 top-[-240px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-100 via-white to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-40 bottom-[-280px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-100 via-white to-transparent blur-3xl"
        aria-hidden
      />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Button className="bg-slate-900 text-white shadow-[0_20px_45px_-20px_rgba(15,23,42,0.55)] hover:bg-slate-800">
            Join the beta
          </Button>
        </div>
      </header>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:gap-24 lg:px-12">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            Modern facilitation OS
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[54px]">
              Bring every{' '}
              <div className="p-1 text-logo-blue bg-logo-mint inline-block rounded">Whiteboard</div>{' '}
              ritual into one calm, elegant workspace.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              colabboard keeps your workshops flowing — from structured Excalidraw canvases to AI
              summaries that land in your tools moments after you wrap.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              className="group flex items-center gap-2 bg-slate-900 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.8)] hover:bg-slate-800"
              onClick={() => StartUpSequence('/draw')}
            >
              Start for free
              {starting ? (
                <LoaderCircle className="h-6 w-6 animate-spin text-logo-purple" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <PlayCircle className="h-4 w-4 text-slate-500 transition group-hover:text-slate-700" />
              Watch 90s demo <MoveUpRight />
            </Button>
          </div>

          <ul className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/5 text-slate-700">
                  <Wand2 className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.35)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-slate-100">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,155,255,0.25),_transparent_60%)]"
                aria-hidden
              />
              <div className="absolute inset-x-10 top-8 rounded-2xl border border-white/60 bg-white/90 p-6 shadow-[0_25px_60px_-45px_rgba(79,155,255,0.6)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.26em] text-slate-500">
                    Workshop canvas
                  </span>
                  <span className="text-xs font-semibold text-emerald-500">Live</span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Frame 01</span>
                      <span>02:30 timer</span>
                    </div>
                    <p className="mt-2 text-base font-semibold text-slate-800">Ideation prompts</p>
                    <p className="text-sm text-slate-500">
                      “Where can we remove friction for new teams?”
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                        EA
                      </span>
                      <div className="text-sm">
                        <div className="font-semibold text-slate-700">Eva added 4 stickies</div>
                        <div className="text-xs text-slate-400">
                          “Unclear onboarding emails” highlighted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {heroArtifacts.map((artifact) => (
                <div
                  key={artifact.title}
                  className={`absolute w-48 max-w-[70%] rounded-3xl border border-slate-100 bg-gradient-to-br ${artifact.gradient} p-5 text-sm text-slate-700 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.35)]`}
                  style={{
                    rotate: artifact.rotation,
                    ...artifact.style,
                  }}
                >
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${artifact.accent}`}
                  >
                    {artifact.subtitle}
                  </span>
                  <p className="mt-3 text-base font-semibold text-slate-800">{artifact.title}</p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    Auto-organised talking points and voting queues.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 flex w-max -translate-x-1/2 items-center gap-4 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-medium text-slate-500 shadow-[0_25px_70px_-60px_rgba(15,23,42,0.4)]">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gradient-to-br from-slate-100 via-white to-slate-100 text-[11px] font-semibold text-slate-600 shadow-sm"
                >
                  {['AK', 'JM', 'LS', 'EV'][i]}
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-400">Teams collaborating now</span>
          </div>
        </div>
      </div>
    </section>
  );
}

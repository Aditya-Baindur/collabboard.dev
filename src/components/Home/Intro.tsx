'use client';

import type { CSSProperties } from 'react';
import {
  ArrowRight,
  LoaderCircle,
  Menu,
  MoveUpRight,
  PlayCircle,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
};

const contactEmail =
  'mailto:hello@collabboard.dev?subject=Hello%20Colabboard%20team&body=Hi%20Colabboard%20team%2C%0A%0AWe%27d%20love%20to%20learn%20more%20about%20colabboard.%0A%0ABest%2C%0A';

const navigation: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Library', href: '#library' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: contactEmail },
];

const highlights = [
  'Live cursors & synced canvases',
  'Guided rituals that feel human',
  'AI notes delivered to your tools',
];

type HeroArtifact = {
  title: string;
  subtitle: string;
  style: CSSProperties;
  rotation: string;
  accentColor: string;
  accentBackground: string;
};

const heroArtifacts: HeroArtifact[] = [
  {
    title: 'Sprint Ritual',
    subtitle: '04: Time to ideate',
    style: { top: '12%', right: '5%' },
    rotation: '-3deg',
    accentColor: 'var(--color-logo-blue)',
    accentBackground: 'rgba(79,155,255,0.18)',
  },
  {
    title: 'Research Playback',
    subtitle: 'AI-suggested clusters',
    style: { bottom: '8%', left: '6%' },
    rotation: '4deg',
    accentColor: 'var(--color-logo-purple)',
    accentBackground: 'rgba(138,107,255,0.18)',
  },
];

export default function Hero() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const renderNavItem = (item: NavItem, index: number) => {
    const commonClass =
      'transition hover:text-[var(--color-logo-purple)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-logo-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

    if (item.href.startsWith('#')) {
      return (
        <Link key={item.label} href={item.href} className={commonClass} onClick={closeMenu}>
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={`${item.label}-${index}`}
        href={item.href}
        className={commonClass}
        onClick={closeMenu}
      >
        {item.label}
      </a>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-company-bg)]">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at top, rgba(79,155,255,0.12), transparent 55%)',
        }}
        aria-hidden
      />
      <div
        className="absolute -right-32 top-[-240px] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'linear-gradient(140deg, rgba(79,155,255,0.25), rgba(138,107,255,0.18) 45%, rgba(96,246,195,0.18))',
          filter: 'blur(0px)',
        }}
        aria-hidden
      />
      <div
        className="absolute -left-40 bottom-[-280px] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'linear-gradient(160deg, rgba(96,246,195,0.32), rgba(79,155,255,0.22) 55%, rgba(255,255,255,0.65))',
        }}
        aria-hidden
      />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:py-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600"
        >
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-700 md:flex">
          {navigation.map((item, index) => renderNavItem(item, index))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="h-11 rounded-full bg-[var(--color-logo-purple)] px-5 text-sm font-medium text-white shadow-[0_18px_38px_-22px_rgba(138,107,255,0.8)] transition hover:bg-[var(--color-logo-blue)]">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Button
            className="bg-slate-900 text-white shadow-[0_20px_45px_-20px_rgba(15,23,42,0.55)] hover:bg-slate-800"
            onClick={() => {
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join the beta
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:text-[var(--color-logo-purple)] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {menuOpen ? (
        <div className="mx-6 mb-6 rounded-3xl border border-white/50 bg-white/90 p-6 text-sm text-slate-700 shadow-xl backdrop-blur md:hidden">
          <nav className="flex flex-col gap-4">
            {navigation.map((item, index) => renderNavItem(item, index))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <SignedOut>
              <SignInButton>
                <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="w-full rounded-full bg-[var(--color-logo-purple)] px-4 py-2 text-sm font-medium text-white">
                  Sign up free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="text-sm font-medium text-slate-700">Your workspace</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <Button
              className="bg-slate-900 text-white shadow-[0_20px_45px_-20px_rgba(15,23,42,0.55)] hover:bg-slate-800"
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Join the beta
            </Button>
          </div>
        </div>
      ) : null}

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:gap-24 lg:px-12">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-logo-purple)]" />
            Modern facilitation OS
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[54px]">
              Bring every{' '}
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[0.9em] font-semibold text-[var(--color-logo-blue)] shadow-sm">
                whiteboard
              </span>{' '}
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
              onClick={() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="group inline-flex items-center gap-2 border-slate-200 bg-white text-slate-700 transition hover:bg-[var(--color-logo-mint)]/40"
              asChild
            >
              <a
                href="https://www.youtube.com/results?search_query=colabboard"
                target="_blank"
                rel="noreferrer"
              >
                <PlayCircle className="h-4 w-4 text-[var(--color-logo-purple)] transition group-hover:text-slate-700" />
                Watch 90s demo <MoveUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-logo-mint)]/40 text-slate-700">
                  <Wand2 className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_45px_120px_-60px_rgba(79,155,255,0.35)] backdrop-blur">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white via-[var(--color-company-bg)] to-white">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at top, rgba(79,155,255,0.25), transparent 60%)',
                }}
                aria-hidden
              />
              <div className="absolute inset-x-6 top-8 rounded-2xl border border-white/60 bg-white/90 p-6 shadow-[0_25px_60px_-45px_rgba(79,155,255,0.6)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.26em] text-slate-500">
                    Workshop canvas
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-logo-purple)]">
                    Live
                  </span>
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
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-logo-mint)]/45 text-[var(--color-logo-purple)]">
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
            </div>

            {heroArtifacts.map((artifact) => (
              <div
                key={artifact.title}
                className="absolute w-48 max-w-[70%] rounded-3xl border border-white/60 bg-white/90 p-5 text-sm text-slate-700 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur"
                style={{
                  rotate: artifact.rotation,
                  background:
                    artifact.title === 'Sprint Ritual'
                      ? 'linear-gradient(135deg, rgba(79,155,255,0.28), rgba(255,255,255,0.92))'
                      : 'linear-gradient(135deg, rgba(138,107,255,0.32), rgba(255,255,255,0.92))',
                  ...artifact.style,
                }}
              >
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
                  style={{
                    backgroundColor: artifact.accentBackground,
                    color: artifact.accentColor,
                  }}
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

          <div className="absolute -bottom-8 left-1/2 flex w-max -translate-x-1/2 items-center gap-4 rounded-full border border-white/60 bg-white/90 px-5 py-3 text-xs font-medium text-slate-500 shadow-[0_25px_70px_-60px_rgba(15,23,42,0.4)] backdrop-blur">
            <div className="flex -space-x-3">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gradient-to-br from-[var(--color-logo-blue)]/18 via-white to-[var(--color-logo-mint)]/24 text-[11px] font-semibold text-slate-600 shadow-sm"
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

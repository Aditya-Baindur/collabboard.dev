// components/EmailSignup.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { BrandLogo } from '../BrandLogo';

type ApiError = { error?: string; code?: string };

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      toast.error('Please enter a valid email.');
      return;
    }

    try {
      setBusy(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as ApiError;

        if (data.code === '23505' || (data.error && /duplicate/i.test(data.error))) {
          toast.error('This email is already subscribed.');
        } else {
          toast.error(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      toast.success('Thanks! You’re on the list.');
      setEmail('');
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      className="flex w-full items-center bg-gradient-to-br from-[var(--color-logo-blue)] via-[var(--color-logo-purple)] to-[var(--color-logo-mint)] py-16 text-white"
      id="waitlist"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 text-center">
        <BrandLogo className="h-12 w-auto drop-shadow-[0_18px_30px_rgba(12,74,110,0.35)]" />

        <p className="max-w-xl text-balance text-lg text-white/80">
          Join the launch list to receive fresh workshop rituals, template drops and AI automation
          tips.
        </p>

        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-stretch gap-3 sm:flex-row"
          aria-label="Email signup form"
        >
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy}
              required
              className="h-14 w-full rounded-full border-0 bg-white/90 px-5 text-base text-slate-900 placeholder:text-slate-400 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.55)] focus-visible:ring-2 focus-visible:ring-[var(--color-logo-purple)]"
            />
          </div>

          <Button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/95 px-6 text-lg font-semibold text-[var(--color-logo-purple)] shadow-[0_25px_60px_-35px_rgba(15,23,42,0.6)] transition hover:bg-white"
            disabled={busy}
          >
            {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

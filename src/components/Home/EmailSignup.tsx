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
    <section className="w-full min-h-[30vh] bg-logo-blue flex items-center">
      <div className="mx-auto w-full max-w-xl px-4 flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <BrandLogo className="h-12 w-auto" />

        {/* Signup form */}
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
              className="h-14 text-lg bg-amber-50"
            />
          </div>

          <Button
            type="submit"
            className="inline-flex h-14 items-center gap-2 px-6 text-lg bg-amber-50"
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

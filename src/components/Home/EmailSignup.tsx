// components/EmailSignup.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail } from 'lucide-react';

type ApiError = { error?: string; code?: string };

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setMsg({ type: 'error', text: 'Please enter a valid email.' });
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

        // Supabase unique violation often surfaces with code 23505 or similar
        if (data.code === '23505' || (data.error && /duplicate/i.test(data.error))) {
          setMsg({ type: 'error', text: 'This email is already subscribed.' });
        } else {
          setMsg({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
        }
        return;
      }

      setMsg({ type: 'success', text: 'Thanks! You’re on the list.' });
      setEmail('');
    } catch {
      setMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-xl items-center justify-center px-4 py-10">
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
            />
          </div>

          <Button type="submit" className="inline-flex items-center gap-2" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Subscribe
          </Button>
        </form>
      </div>

      {msg && (
        <div
          className={`mx-auto max-w-xl px-4 pb-6 text-sm ${
            msg.type === 'success' ? 'text-emerald-600' : 'text-red-600'
          }`}
          role={msg.type === 'error' ? 'alert' : 'status'}
        >
          {msg.text}
        </div>
      )}
    </section>
  );
}

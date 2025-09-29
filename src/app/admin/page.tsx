'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setMessage('Logged in successfully!');
      window.location.href = '/admin/emails';
    } else {
      setMessage('Wrong password, try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-md px-4 py-12">
        <Card className="mx-auto rounded-2xl shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter the password to access Collabboard.dev admin
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              {message && <p className="text-center text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

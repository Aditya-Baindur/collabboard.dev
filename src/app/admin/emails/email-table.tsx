// components/admin/email-table.tsx
'use client';

import { useMemo, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, RefreshCw, Copy } from 'lucide-react';

type User = {
  id: string;
  email: string;
  time: string;
};

export default function EmailTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [q, setQ] = useState('');
  const [isPending, startTransition] = useTransition();
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => u.email.toLowerCase().includes(term));
  }, [q, users]);

  const refresh = () => {
    startTransition(async () => {
      const res = await fetch('/api/users', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users ?? []);
      }
    });
  };

  const copyEmail = async (email: string, id: string) => {
    try {
      setCopyingId(id);
      await navigator.clipboard.writeText(email);
    } finally {
      setTimeout(() => setCopyingId(null), 600);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search email…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="sm:max-w-xs"
        />
        <Button
          variant="outline"
          onClick={refresh}
          className="ml-auto inline-flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      <div className="rounded-lg border">
        <ScrollArea className="h-[420px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Email</TableHead>
                <TableHead className="w-[40%]">Created</TableHead>
                <TableHead className="w-[20%]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    {q ? 'No matches.' : 'No users yet.'}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => {
                  const date = new Date(u.time);
                  const when = isNaN(date.getTime())
                    ? u.time
                    : new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(date);

                  return (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.email}</TableCell>
                      <TableCell>{when}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyEmail(u.email, u.id)}
                          aria-label={`Copy ${u.email}`}
                        >
                          {copyingId === u.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

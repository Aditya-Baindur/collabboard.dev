// app/admin/emails/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmailTable from './email-table';

export const dynamic = 'force-dynamic'; // always fetch fresh in dev
// export const revalidate = 0; // alternative to force-dynamic

type User = {
  id: string;
  email: string;
  time: string; // ISO string
};

async function getUsers() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || // define in .env for prod
    'http://localhost:3000'; // fallback for dev

  const res = await fetch(`${base}/api/users`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load users');
  const json = await res.json();
  return json.users ?? [];
}

export default async function AdminEmailsPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Card className="mx-auto rounded-2xl shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Email Registry</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest signups from Collabboard.dev&apos;s email signup
            </p>
          </CardHeader>
          <CardContent>
            <EmailTable initialUsers={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

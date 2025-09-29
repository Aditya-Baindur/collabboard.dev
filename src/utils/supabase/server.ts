// For reading/writing with the user's session via cookies
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// For privileged server-only operations (bypass RLS)
import { createClient as createAdminClient } from '@supabase/supabase-js';

export function createClient() {
  // In App Router, cookies() is sync
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) =>
              (await cookieStore).set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore.
          }
        },
      },
    }
  );
}

// Admin client: server-only key (bypasses RLS)
export const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

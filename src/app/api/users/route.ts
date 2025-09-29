import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email ?? '').trim();

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({ email }) // time is default now()
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ user: data }, { status: 201 });
  } catch (e: unknown) {
    const errorMessage =
      typeof e === 'object' && e !== null && 'message' in e
        ? (e as { message?: string }).message
        : undefined;
    return NextResponse.json({ error: errorMessage ?? 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('time', { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json({ users: data });
  } catch (e: unknown) {
    const errorMessage =
      typeof e === 'object' && e !== null && 'message' in e
        ? (e as { message?: string }).message
        : undefined;
    return NextResponse.json({ error: errorMessage ?? 'Internal error' }, { status: 500 });
  }
}

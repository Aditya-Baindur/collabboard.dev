import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  const secret = process.env.GET_EMAIL_PASSWORD;

  if (password === secret) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}

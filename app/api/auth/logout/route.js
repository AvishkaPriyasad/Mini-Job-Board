import { NextResponse } from 'next/server';

export async function POST() {
  try {
    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': `token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${
            process.env.NODE_ENV === 'production' ? 'Secure;' : ''
          }`
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
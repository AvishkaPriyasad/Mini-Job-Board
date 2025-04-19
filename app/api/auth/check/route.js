import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { isAuthenticated: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths
  const publicPaths = ['/', '/jobs'];
  // Auth paths
  const authPaths = ['/auth/login', '/auth/signup'];
  // Admin paths
  const adminPaths = ['/dashboard/admin', '/api/admin'];

  // Redirect unauthenticated users from protected paths
  if (!token && !publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect authenticated users away from auth paths
  if (token && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Admin route protection
  if (adminPaths.some(path => pathname.startsWith(path))) {
    try {
      const authCheck = await fetch(`${request.nextUrl.origin}/api/auth/check`, {
        headers: { Cookie: `token=${token}` }
      });
      
      if (!authCheck.ok) throw new Error('Auth check failed');
      
      const { user } = await authCheck.json();
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Admin verification error:', error);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/admin/:path*'
  ]
};
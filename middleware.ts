import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Don't check authentication for the login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const isLoggedIn = request.cookies.get('admin_session')

  // Add this condition after the login page check
  if (request.nextUrl.pathname.startsWith('/api/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}


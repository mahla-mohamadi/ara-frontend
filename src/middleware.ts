import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const res = await fetch('http://localhost/ara-backend/public/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    if (!data.valid) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/'], // Add other paths if needed
}


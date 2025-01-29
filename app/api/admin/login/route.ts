import { NextRequest, NextResponse } from 'next/server'
import { getAdminPassword } from '@/lib/redis'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const storedPassword = await getAdminPassword(username)

  if (storedPassword === password) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', 'true', { httpOnly: true, secure: true, sameSite: 'strict' })
    return response
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}


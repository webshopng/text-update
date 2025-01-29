import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  const host = request.headers.get('host') || 'localhost:3000'
  const baseUrl = `${protocol}://${host}`

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}


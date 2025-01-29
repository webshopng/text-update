import { redis } from '@/lib/redis'

export async function GET() {
  const sitemap = await redis.get('sitemap')

  if (!sitemap) {
    return new Response('Sitemap not found', { 
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
  }

  // Create headers object with required XML headers
  const headers = new Headers({
    'Content-Type': 'application/xml; charset=utf-8',
    'Accept': 'application/xml',
    'Cache-Control': 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff'
  })

  // Return native Response object instead of NextResponse
  return new Response(sitemap as string, { headers })
}


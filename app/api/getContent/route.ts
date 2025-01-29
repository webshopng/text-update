import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const page = url.searchParams.get('page')
  const section = url.searchParams.get('section')

  if (!page || !section) {
    return NextResponse.json({ error: 'Missing page or section parameter' }, { status: 400 })
  }

  try {
    const content = await redis.hget(`page:${page}`, section)
    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}


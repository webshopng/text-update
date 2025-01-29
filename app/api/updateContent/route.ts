import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { refreshCache } from '@/lib/cache'

export async function POST(req: NextRequest) {
  const { page, section, content } = await req.json()

  if (!page || !section || content === undefined) {
    return NextResponse.json({ error: 'Missing page, section, or content' }, { status: 400 })
  }

  try {
    // Store content without sanitization for scripts and advertisements
    if (page === 'scripts' || page === 'advertisements') {
      await redis.hset(`page:${page}`, { [section]: content })
    } else {
      // For other pages, store content with HTML entities preserved
      await redis.hset(`page:${page}`, { [section]: content })
    }
    
    // Refresh the cache immediately after updating content
    await refreshCache(redis)
    
    return NextResponse.json({ message: 'Content updated successfully' })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}


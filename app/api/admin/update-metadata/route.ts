import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { PageMetadata } from '@/lib/metadata'

export async function POST(req: NextRequest) {
  const { page, metadata } = await req.json()

  if (!page || !metadata) {
    return NextResponse.json({ error: 'Missing page or metadata' }, { status: 400 })
  }

  try {
    await redis.hset(`metadata:${page}`, metadata as PageMetadata)
    return NextResponse.json({ message: 'Metadata updated successfully' })
  } catch (error) {
    console.error('Error updating metadata:', error)
    return NextResponse.json({ error: 'Failed to update metadata' }, { status: 500 })
  }
}


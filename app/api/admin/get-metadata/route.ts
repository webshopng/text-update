import { NextRequest, NextResponse } from 'next/server'
import { getMetadata } from '@/lib/metadata'

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page')
  
  if (!page) {
    return NextResponse.json({ error: 'Missing page parameter' }, { status: 400 })
  }

  try {
    const metadata = await getMetadata(page)
    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 })
  }
}


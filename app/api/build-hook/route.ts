import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { redis } from '@/lib/redis'
import { defaultMetadata, PageMetadata } from '@/lib/metadata'

export async function POST() {
  try {
    const updatedMetadata: Record<string, PageMetadata> = { ...defaultMetadata }

    // Fetch all metadata from Redis
    for (const page of Object.keys(defaultMetadata)) {
      const storedMetadata = await redis.hgetall(`metadata:${page}`)
      if (storedMetadata) {
        updatedMetadata[page] = { ...defaultMetadata[page], ...storedMetadata }
      }
    }

    // Generate the new file content
    const fileContent = `import { Metadata } from 'next'

export interface PageMetadata extends Metadata {
  pageTitle: string;
  pageDescription: string;
}

export const metadata: Record<string, PageMetadata> = ${JSON.stringify(updatedMetadata, null, 2)}

export const getMetadata = (page: string): PageMetadata => metadata[page] || metadata.home
`

    // Write the updated metadata back to the file
    const metadataPath = path.join(process.cwd(), 'lib', 'metadata.ts')
    await writeFile(metadataPath, fileContent, 'utf8')

    return NextResponse.json({ message: 'Metadata file updated successfully' })
  } catch (error) {
    console.error('Error updating metadata file:', error)
    return NextResponse.json({ error: 'Failed to update metadata file' }, { status: 500 })
  }
}


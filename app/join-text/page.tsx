import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { JoinTextClient } from './join-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['join-text']

export default async function JoinText() {
  const content = await getCachedContent(redis)
  const joinTextContent = content['join-text'] || {}

  return (
    <>
      <PageHeader
        title={joinTextContent.title || "Join Text Tool"}
        description={joinTextContent.description || "Combine multiple text fragments into a single piece"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <JoinTextClient content={joinTextContent} />
      </div>
    </>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TruncateTextClient } from './truncate-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['truncate-text']

export default async function TruncateText() {
  const content = await getCachedContent(redis)
  const truncateTextContent = content['truncate-text'] || {}

  return (
    <>
      <PageHeader
        title={truncateTextContent.title || "Truncate Text Online"}
        description={truncateTextContent.description || "Easily truncate your text to a specific length"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TruncateTextClient content={truncateTextContent} />
      </div>
    </>
  )
}


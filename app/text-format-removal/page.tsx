import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextFormatRemovalClient } from './text-format-removal-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['text-format-removal']

export default async function TextFormatRemoval() {
  const content = await getCachedContent(redis)
  const formatRemovalContent = content['text-format-removal'] || {}

  return (
    <>
      <PageHeader
        title={formatRemovalContent.title || "Text Format Removal"}
        description={formatRemovalContent.description || "Remove formatting from text"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextFormatRemovalClient content={formatRemovalContent} />
      </div>
    </>
  )
}


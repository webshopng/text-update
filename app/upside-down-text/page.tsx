import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { UpsideDownTextClient } from './upside-down-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['upside-down-text']

export default async function UpsideDownText() {
  const content = await getCachedContent(redis)
  const upsideDownTextContent = content['upside-down-text'] || {}

  return (
    <>
      <PageHeader
        title={upsideDownTextContent.title || "Upside Down Text Generator"}
        description={upsideDownTextContent.description || "Convert your text to upside down characters"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <UpsideDownTextClient content={upsideDownTextContent} />
      </div>
    </>
  )
}


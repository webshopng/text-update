import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { BackwardsTextClient } from './backwards-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['backwards-text']

export default async function BackwardsText() {
  const content = await getCachedContent(redis)
  const backwardsTextContent = content['backwards-text'] || {}

  return (
    <>
      <PageHeader
        title={backwardsTextContent.title || "Backwards Text Generator, Two Types"}
        description={backwardsTextContent.description || "Generate backwards text in two different ways"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <BackwardsTextClient content={backwardsTextContent} />
      </div>
    </>
  )
}


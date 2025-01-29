import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { WeirdTextGeneratorClient } from './weird-text-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['weird-text-generator']

export default async function WeirdTextGenerator() {
  const content = await getCachedContent(redis)
  const weirdTextContent = content['weird-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={weirdTextContent.title || "Weird Text Generator"}
        description={weirdTextContent.description || "Transform your text into weird and unique styles"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <WeirdTextGeneratorClient content={weirdTextContent} />
      </div>
    </>
  )
}


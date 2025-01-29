import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RandomGroupGeneratorClient } from './random-group-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['random-group-generator']

export default async function RandomGroupGenerator() {
  const content = await getCachedContent(redis)
  const randomGroupContent = content['random-group-generator'] || {}

  return (
    <>
      <PageHeader
        title={randomGroupContent.title || "Random Group Generator"}
        description={
          randomGroupContent.description ||
          "Generate random groups from a list of items"
        }
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RandomGroupGeneratorClient content={randomGroupContent} />
      </div>
    </>
  )
}


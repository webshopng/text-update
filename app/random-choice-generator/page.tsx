import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RandomChoiceGeneratorClient } from './random-choice-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['random-choice-generator']

export default async function RandomChoiceGenerator() {
  const content = await getCachedContent(redis)
  const randomChoiceContent = content['random-choice-generator'] || {}

  return (
    <>
      <PageHeader
        title={randomChoiceContent.title || "Random Choice Generator"}
        description={
          randomChoiceContent.description ||
          "Generate random choices from a list of options"
        }
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RandomChoiceGeneratorClient content={randomChoiceContent} />
      </div>
    </>
  )
}


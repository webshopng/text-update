import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { WordCounterClient } from './word-counter-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['word-counter']

export default async function WordCounter() {
  const content = await getCachedContent(redis)
  const counterContent = content['word-counter'] || {}

  return (
    <>
      <PageHeader
        title={counterContent.title || "Word Counter"}
        description={counterContent.description || "Count words, characters, and more"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <WordCounterClient content={counterContent} />
      </div>
    </>
  )
}


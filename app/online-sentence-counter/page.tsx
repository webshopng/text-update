import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { OnlineSentenceCounterClient } from './online-sentence-counter-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('online-sentence-counter')
}

export default async function OnlineSentenceCounter() {
  const content = await getCachedContent(redis)
  const onlineSentenceCounterContent = content['online-sentence-counter'] || {}

  return (
    <>
      <PageHeader
        title={onlineSentenceCounterContent.title || "Online Sentence Counter"}
        description={onlineSentenceCounterContent.description || "Count sentences and analyze your text with advanced features"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <OnlineSentenceCounterClient content={onlineSentenceCounterContent} />
      </div>
    </>
  )
}


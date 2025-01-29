import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { OnlineTxtShuffleClient } from './online-txt-shuffle-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('online-txt-shuffle')
}

export default async function OnlineTxtShuffle() {
  const content = await getCachedContent(redis)
  const onlineTxtShuffleContent = content['online-txt-shuffle'] || {}

  return (
    <>
      <PageHeader
        title={onlineTxtShuffleContent.title || "Online TXT Shuffle"}
        description={onlineTxtShuffleContent.description || "Randomly shuffle lines, words, or characters in your text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <OnlineTxtShuffleClient content={onlineTxtShuffleContent} />
      </div>
    </>
  )
}


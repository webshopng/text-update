import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { ReverseTextClient } from './reverse-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['reverse-text']

export default async function ReverseText() {
  const content = await getCachedContent(redis)
  const reverseTextContent = content['reverse-text'] || {}

  return (
    <>
      <PageHeader
        title={reverseTextContent.title || "Reverse Text Generator"}
        description={reverseTextContent.description || "Reverse your text instantly"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <ReverseTextClient content={reverseTextContent} />
      </div>
    </>
  )
}


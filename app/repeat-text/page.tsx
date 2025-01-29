import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RepeatTextClient } from './repeat-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['repeat-text']

export default async function RepeatText() {
  const content = await getCachedContent(redis)
  const repeatTextContent = content['repeat-text'] || {}

  return (
    <>
      <PageHeader
        title={repeatTextContent.title || "Repeat Text Tool"}
        description={repeatTextContent.description || "Easily repeat text multiple times with customizable options"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RepeatTextClient content={repeatTextContent} />
      </div>
    </>
  )
}


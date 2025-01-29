import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextSplitClient } from './text-split-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['text-split']

export default async function TextSplit() {
  const content = await getCachedContent(redis)
  const splitContent = content['text-split'] || {}

  return (
    <>
      <PageHeader
        title={splitContent.title || "Text Split Tool"}
        description={splitContent.description || "Split your text into lines, sentences, or custom delimiters"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextSplitClient content={splitContent} />
      </div>
    </>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextReplaceClient } from './text-replace-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['text-replace']

export default async function TextReplace() {
  const content = await getCachedContent(redis)
  const replaceContent = content['text-replace'] || {}

  return (
    <>
      <PageHeader
        title={replaceContent.title || "Find and Replace Tool"}
        description={replaceContent.description || "Find and replace text with options"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[690px]">
        <TextReplaceClient content={replaceContent} />
      </div>
    </>
  )
}


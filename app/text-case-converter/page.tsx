import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextCaseConverterClient } from './text-case-converter-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['text-case-converter']

export default async function TextCaseConverter() {
  const content = await getCachedContent(redis)
  const caseContent = content['text-case-converter'] || {}

  return (
    <>
      <PageHeader
        title={caseContent.title || "Text Case Converter"}
        description={caseContent.description || "Convert the text case of words, titles, sentences"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextCaseConverterClient content={caseContent} />
      </div>
    </>
  )
}

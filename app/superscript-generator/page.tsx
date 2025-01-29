import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { SuperscriptGeneratorClient } from './superscript-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['superscript-generator']

export default async function SuperscriptGenerator() {
  const content = await getCachedContent(redis)
  const superscriptContent = content['superscript-generator'] || {}

  return (
    <>
      <PageHeader
        title={superscriptContent.title || "Superscript Generator"}
        description={superscriptContent.description || "Convert your text to superscript characters"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <SuperscriptGeneratorClient content={superscriptContent} />
      </div>
    </>
  )
}


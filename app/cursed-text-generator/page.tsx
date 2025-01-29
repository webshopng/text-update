import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { CursedTextGeneratorClient } from './cursed-text-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['cursed-text-generator']

export default async function CursedTextGenerator() {
  const content = await getCachedContent(redis)
  const cursedTextContent = content['cursed-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={cursedTextContent.title || "Cursed Text Generator"}
        description={cursedTextContent.description || "Transform your text into spooky, cursed styles"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <CursedTextGeneratorClient content={cursedTextContent} />
      </div>
    </>
  )
}


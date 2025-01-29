import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { CrazyFontGeneratorClient } from './crazy-font-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['crazy-font-generator']

export default async function CrazyFontGenerator() {
  const content = await getCachedContent(redis)
  const crazyFontContent = content['crazy-font-generator'] || {}

  return (
    <>
      <PageHeader
        title={crazyFontContent.title || "Crazy Font Generator"}
        description={crazyFontContent.description || "Transform your text into wild and crazy fonts"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <CrazyFontGeneratorClient content={crazyFontContent} />
      </div>
    </>
  )
}


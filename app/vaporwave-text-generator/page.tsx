import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { VaporwaveTextGeneratorClient } from './vaporwave-text-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['vaporwave-text-generator']

export default async function VaporwaveTextGenerator() {
  const content = await getCachedContent(redis)
  const vaporwaveTextContent = content['vaporwave-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={vaporwaveTextContent.title || "Vaporwave Text Generator"}
        description={vaporwaveTextContent.description || "Transform your text into Vaporwave aesthetic"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <VaporwaveTextGeneratorClient content={vaporwaveTextContent} />
      </div>
    </>
  )
}


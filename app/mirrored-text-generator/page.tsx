import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { MirroredTextGeneratorClient } from './mirrored-text-generator-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('mirrored-text-generator')
}

export default async function MirroredTextGenerator() {
  const content = await getCachedContent(redis)
  const mirroredTextContent = content['mirrored-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={mirroredTextContent.title || "Mirrored Text Generator"}
        description={mirroredTextContent.description || "Create mirrored text easily with our advanced tool"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <MirroredTextGeneratorClient content={mirroredTextContent} />
      </div>
    </>
  )
}


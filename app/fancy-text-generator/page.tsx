import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { FancyTextGeneratorClient } from './fancy-text-generator-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('fancy-text-generator')
}

export default async function FancyTextGenerator() {
  const content = await getCachedContent(redis)
  const fancyTextContent = content['fancy-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={fancyTextContent.title || "Fancy Text Generator"}
        description={fancyTextContent.description || "Transform your text into stylish and fancy formats"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <FancyTextGeneratorClient content={fancyTextContent} />
      </div>
    </>
  )
}


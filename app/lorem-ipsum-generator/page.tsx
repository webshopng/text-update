import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { LoremIpsumGeneratorClient } from './lorem-ipsum-generator-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('lorem-ipsum-generator')
}

export default async function LoremIpsumGenerator() {
  const content = await getCachedContent(redis)
  const loremIpsumContent = content['lorem-ipsum-generator'] || {}

  return (
    <>
      <PageHeader
        title={loremIpsumContent.title || "Lorem Ipsum Generator"}
        description={loremIpsumContent.description || "Generate custom Lorem Ipsum text for your design and development needs"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <LoremIpsumGeneratorClient content={loremIpsumContent} />
      </div>
    </>
  )
}


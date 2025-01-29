import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextToHexlClient } from './text-to-hexl-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('text-to-hexl')
}

export default async function TextToHexl() {
  const content = await getCachedContent(redis)
  const textToHexlContent = content['text-to-hexl'] || {}

  return (
    <>
      <PageHeader
        title={textToHexlContent.title || "Text to Hexl Converter"}
        description={textToHexlContent.description || "Convert text to hexadecimal dump format"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextToHexlClient content={textToHexlContent} />
      </div>
    </>
  )
}


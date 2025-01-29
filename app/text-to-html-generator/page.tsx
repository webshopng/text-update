import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextToHtmlGeneratorClient } from './text-to-html-generator-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('text-to-html-generator')
}

export default async function TextToHtmlGenerator() {
  const content = await getCachedContent(redis)
  const textToHtmlContent = content['text-to-html-generator'] || {}

  return (
    <>
      <PageHeader
        title={textToHtmlContent.title || "Text to HTML Generator"}
        description={textToHtmlContent.description || "Convert plain text to HTML with advanced formatting options"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextToHtmlGeneratorClient content={textToHtmlContent} />
      </div>
    </>
  )
}


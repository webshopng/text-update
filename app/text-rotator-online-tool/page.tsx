import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextRotatorOnlineToolClient } from './text-rotator-online-tool-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('text-rotator-online-tool')
}

export default async function TextRotatorOnlineTool() {
  const content = await getCachedContent(redis)
  const textRotatorContent = content['text-rotator-online-tool'] || {}

  return (
    <>
      <PageHeader
        title={textRotatorContent.title || "Text Rotator Online Tool"}
        description={textRotatorContent.description || "Rotate your text by a specified number of positions"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TextRotatorOnlineToolClient content={textRotatorContent} />
      </div>
    </>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { HexToTextClient } from './hex-to-text-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('hex-to-text')
}

export default async function HexToText() {
  const content = await getCachedContent(redis)
  const hexToTextContent = content['hex-to-text'] || {}

  return (
    <>
      <PageHeader
        title={hexToTextContent.title || "Hex to Text Converter"}
        description={hexToTextContent.description || "Convert hexadecimal values to readable text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <HexToTextClient content={hexToTextContent} />
      </div>
    </>
  )
}


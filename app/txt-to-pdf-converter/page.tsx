import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TxtToPdfConverterClient } from './txt-to-pdf-converter-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['txt-to-pdf-converter']

export default async function TxtToPdfConverter() {
  const content = await getCachedContent(redis)
  const converterContent = content['txt-to-pdf-converter'] || {}

  return (
    <>
      <PageHeader
        title={converterContent.title || "TXT to PDF Converter"}
        description={converterContent.description || "Convert your text files to PDF format"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <TxtToPdfConverterClient content={converterContent} />
      </div>
    </>
  )
}


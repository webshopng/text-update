import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { HTMLTableGeneratorClient } from './html-table-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['html-table-generator']

export default async function HTMLTableGenerator() {
const content = await getCachedContent(redis)
const tableGeneratorContent = content['html-table-generator'] || {}

return (
  <>
    <PageHeader
      title={tableGeneratorContent.title || "HTML Table Generator"}
      description={tableGeneratorContent.description || "Generate HTML tables with ease"}
    />
    <div className="container mx-auto px-4 py-8 max-w-[700px]">
      <HTMLTableGeneratorClient content={tableGeneratorContent} />
    </div>
  </>
)
}


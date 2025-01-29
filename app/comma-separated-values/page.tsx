import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { CommaSeparatedValuesClient } from './comma-separated-values-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['comma-separated-values']

export default async function CommaSeparatedValues() {
  const content = await getCachedContent(redis)
  const csvContent = content['comma-separated-values'] || {}

  return (
    <>
      <PageHeader
        title={csvContent.title || "Comma Separated Values Online"}
        description={csvContent.description || "Convert text to CSV and CSV to text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <CommaSeparatedValuesClient content={csvContent} />
      </div>
    </>
  )
}


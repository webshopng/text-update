import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RemoveNumbersFromTextClient } from './remove-numbers-from-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['remove-numbers-from-text'] || {}

export default async function RemoveNumbersFromText() {
  const content = await getCachedContent(redis)
  const removeNumbersContent = content['remove-numbers-from-text'] || {}

  return (
    <>
      <PageHeader
        title={removeNumbersContent.title || "Remove Numbers From Text"}
        description={removeNumbersContent.description || "Easily remove numbers from your text content."}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RemoveNumbersFromTextClient content={removeNumbersContent} />
      </div>
    </>
  )
}


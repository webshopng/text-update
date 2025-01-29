import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RemoveSymbolsFromTextClient } from './remove-symbols-from-text-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['remove-symbols-from-text']

export default async function RemoveSymbolsFromText() {
const content = await getCachedContent(redis)
const removeSymbolsContent = content['remove-symbols-from-text'] || {}

return (
  <>
    <PageHeader
      title={removeSymbolsContent.title || "Remove Symbols From Text"}
      description={removeSymbolsContent.description || "Easily remove symbols from your text content."}
    />
    <div className="container mx-auto px-4 py-8 max-w-[700px]">
      <RemoveSymbolsFromTextClient content={removeSymbolsContent} />
    </div>
  </>
)
}


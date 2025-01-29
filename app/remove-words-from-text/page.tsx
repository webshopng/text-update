import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RemoveWordsFromTextClient } from './remove-words-from-text-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('remove-words-from-text')
}

export default async function RemoveWordsFromText() {
  const content = await getCachedContent(redis)
  const removeWordsContent = content['remove-words-from-text'] || {}

  return (
    <>
      <PageHeader
        title={removeWordsContent.title || "Remove Words from Text"}
        description={removeWordsContent.description || "Easily remove specific words or phrases from your text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RemoveWordsFromTextClient content={removeWordsContent} />
      </div>
    </>
  )
}


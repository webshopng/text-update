import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RemoveLineBreaksClient } from './remove-line-breaks-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('remove-line-breaks')
}

export default async function RemoveLineBreaks() {
  const content = await getCachedContent(redis)
  const removeLineBreaksContent = content['remove-line-breaks'] || {}

  return (
    <>
      <PageHeader
        title={removeLineBreaksContent.title || "Remove Line Breaks"}
        description={removeLineBreaksContent.description || "Easily remove line breaks from your text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RemoveLineBreaksClient content={removeLineBreaksContent} />
      </div>
    </>
  )
}


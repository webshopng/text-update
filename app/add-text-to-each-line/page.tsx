import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { AddTextToEachLineClient } from './add-text-to-each-line-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('add-text-to-each-line')
}

export default async function AddTextToEachLine() {
  const content = await getCachedContent(redis)
  const addTextToEachLineContent = content['add-text-to-each-line'] || {}

  return (
    <>
      <PageHeader
        title={addTextToEachLineContent.title || "Add Text to Each Line"}
        description={addTextToEachLineContent.description || "Add text to the beginning or end of each line in your text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <AddTextToEachLineClient content={addTextToEachLineContent} />
      </div>
    </>
  )
}


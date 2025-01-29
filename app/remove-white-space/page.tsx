import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { RemoveWhiteSpaceClient } from './remove-white-space-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('remove-white-space')
}

export default async function RemoveWhiteSpace() {
  const content = await getCachedContent(redis)
  const removeWhiteSpaceContent = content['remove-white-space'] || {}

  return (
    <>
      <PageHeader
        title={removeWhiteSpaceContent.title || "Remove White Space"}
        description={removeWhiteSpaceContent.description || "Easily remove unnecessary white space from your text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <RemoveWhiteSpaceClient content={removeWhiteSpaceContent} />
      </div>
    </>
  )
}


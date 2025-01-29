import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { UnindentTextOnlineClient } from './unindent-text-online-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('unindent-text-online')
}

export default async function UnindentTextOnline() {
  const content = await getCachedContent(redis)
  const unindentTextOnlineContent = content['unindent-text-online'] || {}

  return (
    <>
      <PageHeader
        title={unindentTextOnlineContent.title || "Unindent Text Online"}
        description={unindentTextOnlineContent.description || "Easily remove indentation from your text online"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <UnindentTextOnlineClient content={unindentTextOnlineContent} />
      </div>
    </>
  )
}


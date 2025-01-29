import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { ReverseListOnlineClient } from './reverse-list-online-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('reverse-list-online')
}

export default async function ReverseListOnline() {
  const content = await getCachedContent(redis)
  const reverseListContent = content['reverse-list-online'] || {}

  return (
    <>
      <PageHeader
        title={reverseListContent.title || "Reverse List Online"}
        description={reverseListContent.description || "Easily reverse the order of items in your list"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <ReverseListOnlineClient content={reverseListContent} />
      </div>
    </>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { IndentTextOnlineClient } from './indent-text-online-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('indent-text-online')
}

export default async function IndentTextOnline() {
  const content = await getCachedContent(redis)
  const indentTextOnlineContent = content['indent-text-online'] || {}

  return (
    <>
      <PageHeader
        title={indentTextOnlineContent.title || "Indent Text Online"}
        description={indentTextOnlineContent.description || "Easily indent and format your text online"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <IndentTextOnlineClient content={indentTextOnlineContent} />
      </div>
    </>
  )
}


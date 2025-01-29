import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { CapitalizeEachWordClient } from './capitalize-each-word-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['capitalize-each-word']

export default async function CapitalizeEachWord() {
  const content = await getCachedContent(redis)
  const capitalizeEachWordContent = content['capitalize-each-word'] || {}

  return (
    <>
      <PageHeader
        title={capitalizeEachWordContent.title || "Capitalize Each Word"}
        description={capitalizeEachWordContent.description || "Capitalize each word in your text"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <CapitalizeEachWordClient content={capitalizeEachWordContent} />
      </div>
    </>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { WingdingsTranslatorClient } from './wingdings-translator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['wingdings-translator']

export default async function WingdingsTranslator() {
  const content = await getCachedContent(redis)
  const wingdingsContent = content['wingdings-translator'] || {}

  return (
    <>
      <PageHeader
        title={wingdingsContent.title || "Wingdings Translator"}
        description={wingdingsContent.description || "Translate text to Wingdings and back"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <WingdingsTranslatorClient content={wingdingsContent} />
      </div>
    </>
  )
}


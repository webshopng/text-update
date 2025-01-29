import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { CamelCaseTextGeneratorClient } from './camel-case-text-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['camel-case-text-generator']

export default async function CamelCaseTextGenerator() {
  const content = await getCachedContent(redis)
  const camelCaseContent = content['camel-case-text-generator'] || {}

  return (
    <>
      <PageHeader
        title={camelCaseContent.title || "Camel Case Text Generator"}
        description={camelCaseContent.description || "Convert your text to camel case"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <CamelCaseTextGeneratorClient content={camelCaseContent} />
      </div>
    </>
  )
}


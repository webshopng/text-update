import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { OpenAITokensToWordsClient } from './openai-tokens-to-words-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('openai-tokens-to-words')
}

export default async function OpenAITokensToWords() {
  const content = await getCachedContent(redis)
  const openAITokensContent = content['openai-tokens-to-words'] || {}

  return (
    <>
      <PageHeader
        title={openAITokensContent.title || "Open AI Tokens to Words"}
        description={openAITokensContent.description || "Convert OpenAI tokens to words and estimate token count"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <OpenAITokensToWordsClient content={openAITokensContent} />
      </div>
    </>
  )
}


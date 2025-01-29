import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { MistralAITokensToWordsClient } from './mistral-ai-tokens-to-words-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('mistral-ai-tokens-to-words')
}

export default async function MistralAITokensToWords() {
  const content = await getCachedContent(redis)
  const mistralAITokensContent = content['mistral-ai-tokens-to-words'] || {}

  return (
    <>
      <PageHeader
        title={mistralAITokensContent.title || "Mistral AI Tokens to Words"}
        description={mistralAITokensContent.description || "Convert Mistral AI tokens to words and estimate token count"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <MistralAITokensToWordsClient content={mistralAITokensContent} />
      </div>
    </>
  )
}


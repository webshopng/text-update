import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { AnthropicAITokensToWordsClient } from './anthropic-ai-tokens-to-words-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('anthropic-ai-tokens-to-words')
}

export default async function AnthropicAITokensToWords() {
  const content = await getCachedContent(redis)
  const anthropicAITokensContent = content['anthropic-ai-tokens-to-words'] || {}

  return (
    <>
      <PageHeader
        title={anthropicAITokensContent.title || "Anthropic AI Tokens to Words"}
        description={anthropicAITokensContent.description || "Convert Anthropic AI tokens to words and estimate token count"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <AnthropicAITokensToWordsClient content={anthropicAITokensContent} />
      </div>
    </>
  )
}


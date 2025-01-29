import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { GeminiAITokensToWordsClient } from './gemini-ai-tokens-to-words-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('gemini-ai-tokens-to-words')
}

export default async function GeminiAITokensToWords() {
  const content = await getCachedContent(redis)
  const geminiAITokensContent = content['gemini-ai-tokens-to-words'] || {}

  return (
    <>
      <PageHeader
        title={geminiAITokensContent.title || "Gemini AI Tokens to Words"}
        description={geminiAITokensContent.description || "Convert Gemini AI tokens to words and estimate token count"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <GeminiAITokensToWordsClient content={geminiAITokensContent} />
      </div>
    </>
  )
}


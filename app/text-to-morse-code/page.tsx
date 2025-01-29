import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TextToMorseCodeClient } from './text-to-morse-code-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('text-to-morse-code')
}

export default async function TextToMorseCode() {
  const content = await getCachedContent(redis)
  const textToMorseCodeContent = content['text-to-morse-code'] || {}

  return (
    <>
      <PageHeader
        title={textToMorseCodeContent.title || "Text to Morse Code Converter"}
        description={textToMorseCodeContent.description || "Convert text to Morse code and Morse code to text"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <TextToMorseCodeClient content={textToMorseCodeContent} />
      </div>
    </>
  )
}


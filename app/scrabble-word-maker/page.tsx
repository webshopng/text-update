import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { ScrabbleWordMakerClient } from './scrabble-word-maker-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('scrabble-word-maker')
}

export default async function ScrabbleWordMaker() {
  const content = await getCachedContent(redis)
  const scrabbleWordMakerContent = content['scrabble-word-maker'] || {}

  return (
    <>
      <PageHeader
        title={scrabbleWordMakerContent.title || "Scrabble Word Maker"}
        description={scrabbleWordMakerContent.description || "Generate valid Scrabble words from your letters"}
        category="Games"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <ScrabbleWordMakerClient content={scrabbleWordMakerContent} />
      </div>
    </>
  )
}


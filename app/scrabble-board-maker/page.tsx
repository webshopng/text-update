import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { ScrabbleBoardMakerClient } from './scrabble-board-maker-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('scrabble-board-maker')
}

export default async function ScrabbleBoardMaker() {
  const content = await getCachedContent(redis)
  const scrabbleBoardMakerContent = content['scrabble-board-maker'] || {}

  return (
    <>
      <PageHeader
        title={scrabbleBoardMakerContent.title || "Scrabble Board Maker"}
        description={scrabbleBoardMakerContent.description || "Create custom Scrabble boards with ease"}
        category="Games"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <ScrabbleBoardMakerClient content={scrabbleBoardMakerContent} />
      </div>
    </>
  )
}


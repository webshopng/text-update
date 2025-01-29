import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { TypingSpeedTestClient } from './typing-speed-test-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return getMetadata('typing-speed-test')
}

export default async function TypingSpeedTest() {
  const content = await getCachedContent(redis)
  const typingSpeedContent = content['typing-speed-test'] || {}

  return (
    <>
      <PageHeader
        title={typingSpeedContent.title || "Typing Speed Test"}
        description={typingSpeedContent.description || "Test your typing speed and accuracy with our advanced typing test"}
        category="Text"
        type="Interactive"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <TypingSpeedTestClient content={typingSpeedContent} />
      </div>
    </>
  )
}


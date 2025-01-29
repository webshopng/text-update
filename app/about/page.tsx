import { metadata as metadataLib } from '@/lib/metadata'
import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { StyledContent } from '@/app/components/styled-content'
import { Metadata } from 'next'

export const metadata: Metadata = metadataLib.about

export default async function AboutPage() {
  const content = await getCachedContent(redis)
  const aboutContent = content['about'] || {}

  return (
    <>
      <PageHeader
        title={aboutContent.title || "About Calculator Tools"}
        description={aboutContent.description || "Learn more about our mission and services"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[696px]">
        <Card className="bg-white/80 dark:bg-indigo-950/80 backdrop-blur-sm">
          <CardContent className="space-y-6 pt-6">
            <StyledContent content={aboutContent.content || ''} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}


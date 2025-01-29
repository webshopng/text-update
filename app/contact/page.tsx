import { metadata as metadataLib } from '@/lib/metadata'
import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { StyledContent } from '@/app/components/styled-content'
import { Metadata } from 'next'

export const metadata: Metadata = metadataLib.contact

export default async function ContactPage() {
  const content = await getCachedContent(redis)
  const contactContent = content['contact'] || {}

  return (
    <>
      <PageHeader
        title={contactContent.title || "Contact"}
        description={contactContent.description || "Get in touch with our team"}
      />
      <div className="container mx-auto px-4 py-8 max-w-[696px]">
        <Card className="bg-white/80 dark:bg-indigo-950/80 backdrop-blur-sm">
          <CardContent className="space-y-6 pt-6">
            <StyledContent content={contactContent.content || ''} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}


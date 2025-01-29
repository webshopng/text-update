import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { SandTableDesignMakerClient } from './sand-table-design-maker-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('sand-table-design-maker')
}

export default async function SandTableDesignMaker() {
  const content = await getCachedContent(redis)
  const sandTableDesignContent = content['sand-table-design-maker'] || {}

  return (
    <>
      <PageHeader
        title={sandTableDesignContent.title || "Sand Table Design Maker Online"}
        description={sandTableDesignContent.description || "Create beautiful sand table designs online with our easy-to-use tool"}
        category="Design"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <SandTableDesignMakerClient content={sandTableDesignContent} />
      </div>
    </>
  )
}


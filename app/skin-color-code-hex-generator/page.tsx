import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { SkinColorCodeHexGeneratorClient } from './skin-color-code-hex-generator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata =
  metadataLib['skin-color-code-hex-generator'] || {}

export default async function SkinColorCodeHexGenerator() {
  const content = await getCachedContent(redis)
  const skinColorContent = content['skin-color-code-hex-generator'] || {}

  return (
    <>
      <PageHeader
        title={skinColorContent.title || 'Skin Color Code Hex Generator'}
        description={
          skinColorContent.description ||
          'Generate hex codes for various skin colors.'
        }
      />
      <div className="container mx-auto px-4 py-8 max-w-[700px]">
        <SkinColorCodeHexGeneratorClient content={skinColorContent} />
      </div>
    </>
  )
}


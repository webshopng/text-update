import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { IndentationRichTextEditorClient } from './indentation-rich-text-editor-client'
import { Metadata } from 'next'
import { getMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata('indentation-rich-text-editor')
}

export default async function IndentationRichTextEditor() {
  const content = await getCachedContent(redis)
  const indentationRichTextEditorContent = content['indentation-rich-text-editor'] || {}

  return (
    <>
      <PageHeader
        title={indentationRichTextEditorContent.title || "Indentation Rich Text Editor"}
        description={indentationRichTextEditorContent.description || "Create and edit indented rich text with ease"}
        category="Text"
        type="Free"
      />
      <div className="container mx-auto px-4 py-8 max-w-[800px]">
        <IndentationRichTextEditorClient content={indentationRichTextEditorContent} />
      </div>
    </>
  )
}


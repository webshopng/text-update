'use client'

import { sanitizeContent } from '@/lib/sanitize'

interface StyledContentProps {
  content: string | undefined
  variant?: 'default' | 'hero' | 'subtitle'
}

export function StyledContent({ content, variant = 'default' }: StyledContentProps) {
const getClassName = () => {
  switch (variant) {
    case 'hero':
      return 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6'
    case 'subtitle':
      return 'text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10'
    default:
      return 'prose dark:prose-invert max-w-none'
  }
}

  const sanitizedContent = sanitizeContent(content)

  if (!sanitizedContent) {
    return null
  }

  // Use dangerouslySetInnerHTML to render HTML content
  return (
    <div
      className={getClassName()}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}


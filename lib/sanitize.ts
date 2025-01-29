import DOMPurify from 'isomorphic-dompurify'

const ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 
  'strong', 'em', 'u', 'span', 'div', 'a'
]

const ALLOWED_ATTR = ['class', 'href', 'target']

// Tailwind class mappings
const CLASS_MAPPINGS: Record<string, string> = {
  'text-center': 'text-center',
  'text-left': 'text-left',
  'text-right': 'text-right',
  'text-justify': 'text-justify',
  // Headers
  'h1': 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  'h2': 'scroll-m-20 text-3xl font-semibold tracking-tight',
  'h3': 'scroll-m-20 text-2xl font-semibold tracking-tight',
  'h4': 'scroll-m-20 text-xl font-semibold tracking-tight',
  // Lists
  'ul': 'my-6 ml-6 list-disc [&>li]:mt-2',
  'ol': 'my-6 ml-6 list-decimal [&>li]:mt-2',
  // Paragraphs
  'p': 'leading-7 [&:not(:first-child)]:mt-6',
  // Links
  'a': 'text-blue-600 hover:underline dark:text-blue-400'
}

export function sanitizeContent(content: string | undefined): string {
  // If content is empty, undefined, or not a string, return empty string
  if (!content || typeof content !== 'string') return ''

  // Remove any escaped HTML entities that might be double-encoded
  const decodedContent = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')

  // Clean the HTML with DOMPurify
  const cleanHtml = DOMPurify.sanitize(decodedContent, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    KEEP_CONTENT: true
  })

  return cleanHtml
}


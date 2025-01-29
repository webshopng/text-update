import { Redis } from '@upstash/redis'

type PageContent = Record<string, Record<string, string>>
let cachedContent: PageContent | null = null
let lastCacheTime: number = 0
const CACHE_TTL = 60 * 1000 // 1 minute in milliseconds

export const getCachedContent = async (redis: Redis, page?: string) => {
const currentTime = Date.now()

if (!cachedContent || currentTime - lastCacheTime > CACHE_TTL) {
const pages = [
'header', 'home', 'footer', 'about', 'contact', 'terms', 'privacy',
'word-counter', 'text-case-converter', 'text-replace', 'text-split', 'join-text', 'repeat-text', 'upside-down-text', 'reverse-text', 'backwards-text', 'truncate-text', 'comma-separated-values', 'wingdings-translator', 'cursed-text-generator',
'weird-text-generator', 'superscript-generator', 'crazy-font-generator',
'scripts', 'advertisements', 'layout',
'typing-speed-test',
'remove-words-from-text',
'reverse-list-online',
'mirrored-text-generator',
'openai-tokens-to-words',
'anthropic-ai-tokens-to-words',
'gemini-ai-tokens-to-words',
'mistral-ai-tokens-to-words',
'indentation-rich-text-editor',
'indent-text-online',
'unindent-text-online',
'scrabble-board-maker',
'scrabble-word-maker',
'add-text-to-each-line',
'text-to-morse-code',
'online-txt-shuffle',
'text-rotator-online-tool',
'text-to-hexl',
'hex-to-text',
'lorem-ipsum-generator',
'fancy-text-generator',
'remove-line-breaks',
'remove-white-space',
'online-sentence-counter',
'text-to-html-generator',
'sand-table-design-maker',
'random-choice-generator',
'random-group-generator',
'vaporwave-text-generator', // Added vaporwave-text-generator
'text-format-removal',
'capitalize-each-word', // Added capitalize-each-word
'remove-numbers-from-text',
'skin-color-code-hex-generator', // Added skin-color-code-hex-generator
'txt-to-pdf-converter', // Added txt-to-pdf-converter
'remove-symbols-from-text',
'html-table-generator', // Added html-table-generator
'camel-case-text-generator',
'text-case-converter',
]
cachedContent = {}
await Promise.all(pages.map(async (p) => {
const pageContent = await redis.hgetall(`page:${p}`)
const pageMetadata = await redis.hgetall(`metadata:${p}`)
cachedContent![p] = { ...pageContent, ...pageMetadata }
}))
lastCacheTime = currentTime
}

return page ? cachedContent[page] : cachedContent
}

export const refreshCache = async (redis: Redis) => {
cachedContent = null
lastCacheTime = 0
return getCachedContent(redis)
}


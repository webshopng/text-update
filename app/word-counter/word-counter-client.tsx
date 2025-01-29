"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, ClipboardPaste } from 'lucide-react'
import { StyledContent } from '@/app/components/styled-content'

interface WordCounterClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function WordCounterClient({ content }: WordCounterClientProps) {
  const [text, setText] = useState('')

  const getStats = useCallback(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const characters = text.length
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0)
    
    return {
      words: words.length,
      characters,
      sentences: sentences.length,
      paragraphs: paragraphs.length
    }
  }, [text])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setText('')
  }, [])

  const stats = getStats()

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Text Analysis Tools"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.words}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Words</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.characters}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Characters</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.sentences}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Sentences</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.paragraphs}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Paragraphs</span>
            </div>
          </div>

          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
            />
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                title="Copy"
              >
                <Copy className="size-4" />
              </button>
              <button
                onClick={handlePaste}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                title="Paste"
              >
                <ClipboardPaste className="size-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                title="Clear"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


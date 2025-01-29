"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Trash2, ClipboardPaste, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface GeminiAITokensToWordsClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

// This is a simple tokenizer for demonstration purposes
// For production use, consider using a more accurate tokenizer like GPT-3 uses
const simpleTokenizer = (text: string): string[] => {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

export function GeminiAITokensToWordsClient({ content }: GeminiAITokensToWordsClientProps) {
  const [inputText, setInputText] = useState('')
  const [tokenCount, setTokenCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [error, setError] = useState('')

  const handleTokenize = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to tokenize.')
      return
    }

    const tokens = simpleTokenizer(inputText)
    setTokenCount(tokens.length)
    setWordCount(inputText.trim().split(/\s+/).length)
    setCharacterCount(inputText.length)
  }, [inputText])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(inputText)
  }, [inputText])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setInputText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setInputText('')
    setTokenCount(0)
    setWordCount(0)
    setCharacterCount(0)
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Gemini AI Tokens to Words"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input Text</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to tokenize..."
                className="min-h-[200px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4 mt-2"
              />
              <div className="absolute top-9 right-2 flex items-center gap-2">
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

            <Button onClick={handleTokenize} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tokenize Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="token-count">Estimated Token Count</Label>
                <Input
                  id="token-count"
                  value={tokenCount}
                  readOnly
                  className="mt-1 bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="word-count">Word Count</Label>
                <Input
                  id="word-count"
                  value={wordCount}
                  readOnly
                  className="mt-1 bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="character-count">Character Count</Label>
                <Input
                  id="character-count"
                  value={characterCount}
                  readOnly
                  className="mt-1 bg-gray-100 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Short Text</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: Hello, Gemini AI!</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: 3 tokens, 3 words, 17 characters</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Medium Text</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: Gemini AI is a powerful language model developed by Google.</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: 9 tokens, 9 words, 61 characters</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Punctuation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: How does Gemini AI work? It's fascinating!</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: 7 tokens, 7 words, 41 characters</p>
        </div>
      </div>

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Trash2, ClipboardPaste, FileText } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface OnlineSentenceCounterClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function OnlineSentenceCounterClient({ content }: OnlineSentenceCounterClientProps) {
  const [inputText, setInputText] = useState('')
  const [stats, setStats] = useState({
    sentences: 0,
    words: 0,
    characters: 0,
    averageWordsPerSentence: 0,
    longestSentence: 0,
    shortestSentence: 0,
  })
  const [error, setError] = useState('')

  const analyzeSentences = useCallback(() => {
    setError('')
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.')
      return
    }

    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
    const words = inputText.trim().split(/\s+/)
    const characters = inputText.length

    const sentenceCount = sentences.length
    const wordCount = words.length
    const averageWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount * 10) / 10 : 0
    const longestSentence = Math.max(...sentences.map(s => s.trim().split(/\s+/).length))
    const shortestSentence = Math.min(...sentences.map(s => s.trim().split(/\s+/).length))

    setStats({
      sentences: sentenceCount,
      words: wordCount,
      characters,
      averageWordsPerSentence,
      longestSentence,
      shortestSentence,
    })
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
    setStats({
      sentences: 0,
      words: 0,
      characters: 0,
      averageWordsPerSentence: 0,
      longestSentence: 0,
      shortestSentence: 0,
    })
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Online Sentence Counter"}
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
                placeholder="Enter your text here..."
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

            <Button onClick={analyzeSentences} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FileText className="h-4 w-4 mr-2" />
              Analyze Sentences
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {stats.sentences > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Sentences</h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.sentences}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Words</h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.words}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Characters</h4>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.characters}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Avg. Words/Sentence</h4>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.averageWordsPerSentence}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Longest Sentence</h4>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.longestSentence} words</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Shortest Sentence</h4>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.shortestSentence} words</p>
                </div>
              </div>
            )}

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Basic Sentence Count</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"This is a sentence. Here's another one! And a third?"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Sentences: 3"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Average Words per Sentence</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Short sentence. A bit longer sentence here. This is the longest sentence of them all."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Average Words per Sentence: 5"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Longest Sentence</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Short. Medium length sentence. This is definitely the longest sentence in this example."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Longest Sentence: 9 words"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Shortest Sentence</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Go! This is a normal sentence. Another average one here."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Shortest Sentence: 1 word"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Character Count</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello, world!"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Characters: 13"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Word Count</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"The quick brown fox jumps over the lazy dog."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Words: 9"}
          </pre>
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


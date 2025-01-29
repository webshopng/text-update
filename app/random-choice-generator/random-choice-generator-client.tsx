"use client"

import { useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, Dice2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface RandomChoiceGeneratorClientProps {
  content: {
    title?: string
    description?: string
    content?: string
  }
}

export function RandomChoiceGeneratorClient({
  content,
}: RandomChoiceGeneratorClientProps) {
  const [choicesText, setChoicesText] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const generateRandomChoice = useCallback(() => {
    setError('')
    const choices = choicesText
      .split('\n')
      .map((choice) => choice.trim())
      .filter((choice) => choice !== '')

    if (choices.length === 0) {
      setError('Please enter at least one choice.')
      return
    }

    const randomIndex = Math.floor(Math.random() * choices.length)
    setResult(choices[randomIndex])
  }, [choicesText])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(result)
  }, [result])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setChoicesText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setChoicesText('')
    setResult('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Random Choice Generator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={choicesText}
                onChange={(e) => setChoicesText(e.target.value)}
                placeholder="Enter choices, one per line..."
                className="min-h-[300px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
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

            <Button
              onClick={generateRandomChoice}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Dice2 className="h-4 w-4 mr-2" />
              Generate Random Choice
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="result">Result</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
                <Textarea
                  id="result"
                  value={result}
                  readOnly
                  className="min-h-[100px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Single Choice</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Multiple Choices</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Banana"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Long Choices</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"This is a long choice.\nAnother long choice here.\nA third long choice."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"This is a long choice."}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Empty Lines</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\n\nBanana\n\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Cherry"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Duplicate Choices</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana\nApple\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">No Choices</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {""}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Please enter at least one choice."}
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


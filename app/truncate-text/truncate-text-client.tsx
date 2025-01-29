"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, Scissors } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface TruncateTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TruncateTextClient({ content }: TruncateTextClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [truncateLength, setTruncateLength] = useState('100')
  const [error, setError] = useState('')
  const [addEllipsis, setAddEllipsis] = useState(true)
  const [preserveWords, setPreserveWords] = useState(true)

  const handleTruncate = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to truncate.')
      return
    }

    const length = parseInt(truncateLength, 10)
    if (isNaN(length) || length < 1) {
      setError('Please enter a valid truncate length.')
      return
    }

    let truncated = inputText

    if (preserveWords) {
      if (truncated.length > length) {
        truncated = truncated.substr(0, length)
        truncated = truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" ")))
      }
    } else {
      truncated = truncated.substr(0, length)
    }

    if (addEllipsis && truncated.length < inputText.length) {
      truncated = truncated.trim() + "..."
    }

    setOutputText(truncated)
  }, [inputText, truncateLength, addEllipsis, preserveWords])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

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
    setOutputText('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Truncate Text Online"}
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
                placeholder="Enter text to truncate..."
                className="min-h-[100px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4 mt-2"
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

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="truncate-length">Truncate Length</Label>
                <Input
                  id="truncate-length"
                  type="number"
                  min="1"
                  value={truncateLength}
                  onChange={(e) => setTruncateLength(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="add-ellipsis"
                  checked={addEllipsis}
                  onCheckedChange={(checked) => setAddEllipsis(checked as boolean)}
                />
                <Label htmlFor="add-ellipsis">Add ellipsis (...)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="preserve-words"
                  checked={preserveWords}
                  onCheckedChange={(checked) => setPreserveWords(checked as boolean)}
                />
                <Label htmlFor="preserve-words">Preserve whole words</Label>
              </div>
            </div>

            <Button onClick={handleTruncate} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <Scissors className="h-4 w-4 mr-2" />
              Truncate Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Result</Label>
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
                  id="output-text"
                  value={outputText}
                  readOnly
                  className="min-h-[100px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
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


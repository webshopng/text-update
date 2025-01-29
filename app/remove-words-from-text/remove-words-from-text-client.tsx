"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Trash2, ClipboardPaste, Eraser } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface RemoveWordsFromTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function RemoveWordsFromTextClient({ content }: RemoveWordsFromTextClientProps) {
  const [inputText, setInputText] = useState('')
  const [wordsToRemove, setWordsToRemove] = useState('')
  const [outputText, setOutputText] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(true)
  const [error, setError] = useState('')

  const handleRemoveWords = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to process.')
      return
    }
    if (!wordsToRemove) {
      setError('Please enter words to remove.')
      return
    }

    try {
      const words = wordsToRemove.split(',').map(word => word.trim())
      let processedText = inputText

      words.forEach(word => {
        let regex
        if (wholeWord) {
          regex = new RegExp(`\\b${word}\\b`, caseSensitive ? 'g' : 'gi')
        } else {
          regex = new RegExp(word, caseSensitive ? 'g' : 'gi')
        }
        processedText = processedText.replace(regex, '')
      })

      // Remove extra spaces
      processedText = processedText.replace(/\s+/g, ' ').trim()

      setOutputText(processedText)
    } catch (err) {
      setError('Error processing text. Please check your input.')
    }
  }, [inputText, wordsToRemove, caseSensitive, wholeWord])

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
    setWordsToRemove('')
    setOutputText('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Remove Words from Text"}
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

            <div>
              <Label htmlFor="words-to-remove">Words to Remove</Label>
              <Input
                id="words-to-remove"
                value={wordsToRemove}
                onChange={(e) => setWordsToRemove(e.target.value)}
                placeholder="Enter words to remove, separated by commas"
                className="mt-2"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                />
                <Label htmlFor="case-sensitive">Case sensitive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whole-word"
                  checked={wholeWord}
                  onCheckedChange={(checked) => setWholeWord(checked as boolean)}
                />
                <Label htmlFor="whole-word">Whole words only</Label>
              </div>
            </div>

            <Button onClick={handleRemoveWords} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <Eraser className="h-4 w-4 mr-2" />
              Remove Words
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
                  className="min-h-[200px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Before</h4>
          <p className="text-zinc-600 dark:text-zinc-400">The quick brown fox jumps over the lazy dog.</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">After</h4>
          <p className="text-zinc-600 dark:text-zinc-400">The quick fox jumps over the dog.</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">Words removed: brown, lazy</p>
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


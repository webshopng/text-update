"use client"

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Search } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface ScrabbleWordMakerClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

// This is a simplified dictionary for demonstration purposes
const SCRABBLE_DICTIONARY = new Set([
  "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY",
  "BA", "BE", "BI", "BO", "BY", "DE", "DO", "ED", "EF", "EH", "EL", "EM", "EN", "ER", "ES", "ET",
  "EX", "FA", "FE", "GO", "HA", "HE", "HI", "HM", "HO", "ID", "IF", "IN", "IS", "IT", "JO", "KA",
  "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM", "MO", "MU", "MY", "NA", "NE", "NO", "NU", "OD",
  "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP", "OR", "OS", "OW", "OX", "OY", "PA", "PE", "PI",
  "PO", "QI", "RE", "SH", "SI", "SO", "TA", "TE", "TI", "TO", "UH", "UM", "UN", "UP", "US", "UT",
  "WE", "WO", "XI", "XU", "YA", "YE", "YO", "ZA"
]);

export function ScrabbleWordMakerClient({ content }: ScrabbleWordMakerClientProps) {
  const [letters, setLetters] = useState('')
  const [minLength, setMinLength] = useState(2)
  const [maxLength, setMaxLength] = useState(15)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState('')

  const generateWords = useCallback(() => {
    setError('')
    if (!letters) {
      setError('Please enter some letters.')
      return
    }

    const availableLetters = letters.toUpperCase().split('')
    const words: string[] = []

    const backtrack = (current: string, remaining: string[]) => {
      if (current.length >= minLength && current.length <= maxLength && SCRABBLE_DICTIONARY.has(current)) {
        words.push(current)
      }

      if (current.length >= maxLength) return

      for (let i = 0; i < remaining.length; i++) {
        backtrack(current + remaining[i], [...remaining.slice(0, i), ...remaining.slice(i + 1)])
      }
    }

    backtrack('', availableLetters)
    setResults(words.sort((a, b) => b.length - a.length))
  }, [letters, minLength, maxLength])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(results.join('\n'))
  }, [results])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setLetters(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setLetters('')
    setResults([])
    setError('')
  }, [])

  useEffect(() => {
    if (letters) {
      generateWords()
    }
  }, [letters, minLength, maxLength, generateWords])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Scrabble Word Maker"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="letters">Enter your letters</Label>
              <Textarea
                id="letters"
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="Enter your letters here..."
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-length">Minimum Word Length</Label>
                <Input
                  id="min-length"
                  type="number"
                  min="2"
                  max="15"
                  value={minLength}
                  onChange={(e) => setMinLength(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max-length">Maximum Word Length</Label>
                <Input
                  id="max-length"
                  type="number"
                  min="2"
                  max="15"
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            <Button onClick={generateWords} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Generate Words
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Results ({results.length} words found)</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </div>
                <Textarea 
                  value={results.join('\n')}
                  readOnly
                  className="min-h-[200px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Input Letters</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <p className="text-lg font-mono">AEINRST</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Generated Words</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">After:</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <p className="text-sm">TRAINS, STAIN, SATIN, SAINT, RAISE, RAIN, SANE, SEAT, SENT, STAR, ...</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Advanced Options</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Customization:</p>
          <ul className="text-sm list-disc list-inside">
            <li>Set minimum word length</li>
            <li>Set maximum word length</li>
            <li>Copy results to clipboard</li>
            <li>Paste letters from clipboard</li>
          </ul>
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


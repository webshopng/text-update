"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Trash2, ClipboardPaste, Replace } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { StyledContent } from '@/app/components/styled-content'

interface TextReplaceClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TextReplaceClient({ content }: TextReplaceClientProps) {
  const [inputText, setInputText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)

  const getStats = useCallback(() => {
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length
    const chars = inputText.length
    const matches = searchText ? (inputText.match(new RegExp(searchText, 'gi')) || []).length : 0
    const occurrences = matches

    return { words, chars, matches, occurrences }
  }, [inputText, searchText])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }, [])

  const handleReplaceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceText(e.target.value)
  }, [])

  const handleReplace = useCallback(() => {
    if (!searchText) {
      setOutputText(inputText)
      return
    }

    let flags = 'g'
    if (!caseSensitive) flags += 'i'

    let searchRegex = searchText
    if (wholeWord) searchRegex = `\\b${searchRegex}\\b`

    const regex = new RegExp(searchRegex, flags)
    const result = inputText.replace(regex, replaceText)
    setOutputText(result)
  }, [inputText, searchText, replaceText, caseSensitive, wholeWord])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setInputText(clipboardText)
    } catch (err) {
      console.error('Failed to paste:', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setInputText('')
    setSearchText('')
    setReplaceText('')
    setOutputText('')
  }, [])

  const stats = getStats()

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Find and Replace Tool"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-red-100/50 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.words}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Words</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-blue-100/50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.chars}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Characters</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-green-100/50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.matches}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Matches</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] bg-purple-100/50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.occurrences}</span>
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Occurrences</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={handleInputChange}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search" className="text-sm text-zinc-500 dark:text-zinc-400">Find</Label>
                <Input
                  id="search"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="mt-1.5"
                  placeholder="Text to find..."
                />
              </div>
              <div>
                <Label htmlFor="replace" className="text-sm text-zinc-500 dark:text-zinc-400">Replace with</Label>
                <Input
                  id="replace"
                  value={replaceText}
                  onChange={handleReplaceChange}
                  className="mt-1.5"
                  placeholder="Replacement text..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                />
                <Label htmlFor="case-sensitive" className="text-sm text-zinc-500 dark:text-zinc-400">
                  Case sensitive
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whole-word"
                  checked={wholeWord}
                  onCheckedChange={(checked) => setWholeWord(checked as boolean)}
                />
                <Label htmlFor="whole-word" className="text-sm text-zinc-500 dark:text-zinc-400">
                  Whole word
                </Label>
              </div>
            </div>

            <Button onClick={handleReplace} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <Replace className="h-4 w-4 mr-2" />
              Replace Text
            </Button>

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

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


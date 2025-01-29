"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, ArrowUpDown } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Label } from "@/components/ui/label"

interface ReverseListOnlineClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function ReverseListOnlineClient({ content }: ReverseListOnlineClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [delimiter, setDelimiter] = useState('newline')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [error, setError] = useState('')

  const handleReverse = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to reverse.')
      return
    }

    let items: string[]
    switch (delimiter) {
      case 'newline':
        items = inputText.split('\n')
        break
      case 'comma':
        items = inputText.split(',')
        break
      case 'custom':
        if (!customDelimiter) {
          setError('Please enter a custom delimiter.')
          return
        }
        items = inputText.split(customDelimiter)
        break
      default:
        items = inputText.split('\n')
    }

    const reversedItems = items.reverse()
    let result: string

    switch (delimiter) {
      case 'newline':
        result = reversedItems.join('\n')
        break
      case 'comma':
        result = reversedItems.join(', ')
        break
      case 'custom':
        result = reversedItems.join(customDelimiter)
        break
      default:
        result = reversedItems.join('\n')
    }

    setOutputText(result)
  }, [inputText, delimiter, customDelimiter])

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
            {content.title || "Reverse List Online"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input List</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your list items..."
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

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="delimiter">Delimiter</Label>
                <Select value={delimiter} onValueChange={setDelimiter}>
                  <SelectTrigger id="delimiter" className="mt-1">
                    <SelectValue placeholder="Select delimiter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newline">New Line</SelectItem>
                    <SelectItem value="comma">Comma</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {delimiter === 'custom' && (
                <div className="flex-1">
                  <Label htmlFor="custom-delimiter">Custom Delimiter</Label>
                  <input
                    id="custom-delimiter"
                    type="text"
                    value={customDelimiter}
                    onChange={(e) => setCustomDelimiter(e.target.value)}
                    placeholder="Enter custom delimiter"
                    className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>
              )}
            </div>

            <Button onClick={handleReverse} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Reverse List
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Reversed List</Label>
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
          <pre className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {"1. First item\n2. Second item\n3. Third item\n4. Fourth item"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">After</h4>
          <pre className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {"4. Fourth item\n3. Third item\n2. Second item\n1. First item"}
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


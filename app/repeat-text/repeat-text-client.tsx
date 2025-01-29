"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Repeat } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface RepeatTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function RepeatTextClient({ content }: RepeatTextClientProps) {
  const [inputText, setInputText] = useState('')
  const [repeatCount, setRepeatCount] = useState('2')
  const [separator, setSeparator] = useState('newline')
  const [customSeparator, setCustomSeparator] = useState('')
  const [outputText, setOutputText] = useState('')
  const [error, setError] = useState('')
  const [addNumbering, setAddNumbering] = useState(false)

  const handleRepeatText = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to repeat.')
      return
    }

    const count = parseInt(repeatCount, 10)
    if (isNaN(count) || count < 1) {
      setError('Please enter a valid number of repetitions.')
      return
    }

    let actualSeparator = ''
    switch (separator) {
      case 'newline':
        actualSeparator = '\n'
        break
      case 'space':
        actualSeparator = ' '
        break
      case 'custom':
        actualSeparator = customSeparator
        break
    }

    let result = ''
    for (let i = 0; i < count; i++) {
      if (addNumbering) {
        result += `${i + 1}. `
      }
      result += inputText
      if (i < count - 1) {
        result += actualSeparator
      }
    }

    setOutputText(result)
  }, [inputText, repeatCount, separator, customSeparator, addNumbering])

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
            {content.title || "Repeat Text Tool"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to repeat..."
                className="min-h-[100px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
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

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="repeat-count">Repeat Count</Label>
                <Input
                  id="repeat-count"
                  type="number"
                  min="1"
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="separator">Separator</Label>
                <Select value={separator} onValueChange={setSeparator}>
                  <SelectTrigger id="separator" className="mt-1">
                    <SelectValue placeholder="Select separator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newline">New Line</SelectItem>
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {separator === 'custom' && (
                <div className="flex-1">
                  <Label htmlFor="custom-separator">Custom Separator</Label>
                  <Input
                    id="custom-separator"
                    value={customSeparator}
                    onChange={(e) => setCustomSeparator(e.target.value)}
                    className="mt-1"
                    placeholder="Enter custom separator"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="add-numbering"
                checked={addNumbering}
                onCheckedChange={(checked) => setAddNumbering(checked as boolean)}
              />
              <Label htmlFor="add-numbering">Add numbering to each repetition</Label>
            </div>

            <Button onClick={handleRepeatText} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <Repeat className="h-4 w-4 mr-2" />
              Repeat Text
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

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


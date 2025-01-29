"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface AddTextToEachLineClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function AddTextToEachLineClient({ content }: AddTextToEachLineClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [textToAdd, setTextToAdd] = useState('')
  const [position, setPosition] = useState('start')
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(true)
  const [trimLines, setTrimLines] = useState(false)
  const [error, setError] = useState('')

  const handleAddText = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to process.')
      return
    }
    if (!textToAdd) {
      setError('Please enter text to add.')
      return
    }

    const lines = inputText.split('\n')
    const processedLines = lines.map(line => {
      if (ignoreEmptyLines && line.trim() === '') {
        return line
      }
      const trimmedLine = trimLines ? line.trim() : line
      return position === 'start' ? textToAdd + trimmedLine : trimmedLine + textToAdd
    })
    setOutputText(processedLines.join('\n'))
  }, [inputText, textToAdd, position, ignoreEmptyLines, trimLines])

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
    setTextToAdd('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Add Text to Each Line"}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="text-to-add">Text to Add</Label>
                <Input
                  id="text-to-add"
                  value={textToAdd}
                  onChange={(e) => setTextToAdd(e.target.value)}
                  placeholder="Enter text to add"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position" className="mt-1">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start of line</SelectItem>
                    <SelectItem value="end">End of line</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ignore-empty-lines"
                  checked={ignoreEmptyLines}
                  onCheckedChange={(checked) => setIgnoreEmptyLines(checked as boolean)}
                />
                <Label htmlFor="ignore-empty-lines">Ignore empty lines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trim-lines"
                  checked={trimLines}
                  onCheckedChange={(checked) => setTrimLines(checked as boolean)}
                />
                <Label htmlFor="trim-lines">Trim lines</Label>
              </div>
            </div>

            <Button onClick={handleAddText} className="w-full">
              <Type className="w-4 h-4 mr-2" />
              Add Text to Each Line
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Add Prefix</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"• Apple\n• Banana\n• Cherry"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Add Suffix</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Red\nGreen\nBlue"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Red color\nGreen color\nBlue color"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Ignore Empty Lines</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"First\n\nSecond\n\nThird"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"- First\n\n- Second\n\n- Third"}
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


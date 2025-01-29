"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Label } from "@/components/ui/label"

interface WeirdTextGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const weirdTextStyles = {
  bubbles: (text: string) => text.split('').map(char => char + '̊').join(''),
  medieval: (text: string) => text.split('').map(char => char + '҉').join(''),
  matrix: (text: string) => text.split('').map(char => char + '̸̧').join(''),
  glitch: (text: string) => text.split('').map(char => char + '̷').join(''),
  wavy: (text: string) => text.split('').map(char => char + '゙').join(''),
}

export function WeirdTextGeneratorClient({ content }: WeirdTextGeneratorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('bubbles')
  const [error, setError] = useState('')

  const handleGenerate = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to transform.')
      return
    }

    const transformFunction = weirdTextStyles[selectedStyle as keyof typeof weirdTextStyles];
    if (transformFunction) {
      setOutputText(transformFunction(inputText));
    } else {
      setError('Invalid style selected.');
    }
  }, [inputText, selectedStyle])

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
            {content.title || "Weird Text Generator"}
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
                placeholder="Enter text to make weird..."
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
                <Label htmlFor="weird-style">Weird Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger id="weird-style" className="mt-1">
                    <SelectValue placeholder="Select weird style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubbles">Bubbles</SelectItem>
                    <SelectItem value="medieval">Medieval</SelectItem>
                    <SelectItem value="matrix">Matrix</SelectItem>
                    <SelectItem value="glitch">Glitch</SelectItem>
                    <SelectItem value="wavy">Wavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Type className="h-4 w-4 mr-2" />
              Generate Weird Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Weird Result</Label>
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


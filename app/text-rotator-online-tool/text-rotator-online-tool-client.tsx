"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, RotateCw } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface TextRotatorOnlineToolClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TextRotatorOnlineToolClient({ content }: TextRotatorOnlineToolClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [rotationAmount, setRotationAmount] = useState('1')
  const [rotationType, setRotationType] = useState('characters')
  const [direction, setDirection] = useState('right')
  const [error, setError] = useState('')

  const rotateText = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to rotate.')
      return
    }

    const amount = parseInt(rotationAmount, 10)
    if (isNaN(amount) || amount < 0) {
      setError('Please enter a valid rotation amount.')
      return
    }

    let result = ''
    switch (rotationType) {
      case 'characters':
        const chars = inputText.split('')
        const rotatedChars = direction === 'right'
          ? [...chars.slice(-amount), ...chars.slice(0, -amount)]
          : [...chars.slice(amount), ...chars.slice(0, amount)]
        result = rotatedChars.join('')
        break
      case 'words':
        const words = inputText.split(/\s+/)
        const rotatedWords = direction === 'right'
          ? [...words.slice(-amount), ...words.slice(0, -amount)]
          : [...words.slice(amount), ...words.slice(0, amount)]
        result = rotatedWords.join(' ')
        break
      case 'lines':
        const lines = inputText.split('\n')
        const rotatedLines = direction === 'right'
          ? [...lines.slice(-amount), ...lines.slice(0, -amount)]
          : [...lines.slice(amount), ...lines.slice(0, amount)]
        result = rotatedLines.join('\n')
        break
      default:
        setError('Invalid rotation type.')
        return
    }

    setOutputText(result)
  }, [inputText, rotationAmount, rotationType, direction])

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
            {content.title || "Text Rotator Online Tool"}
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
                placeholder="Enter text to rotate..."
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rotation-amount">Rotation Amount</Label>
                <Input
                  id="rotation-amount"
                  type="number"
                  min="1"
                  value={rotationAmount}
                  onChange={(e) => setRotationAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="rotation-type">Rotation Type</Label>
                <Select value={rotationType} onValueChange={setRotationType}>
                  <SelectTrigger id="rotation-type" className="mt-1">
                    <SelectValue placeholder="Select rotation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="characters">Characters</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="lines">Lines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="direction">Direction</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger id="direction" className="mt-1">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={rotateText} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <RotateCw className="h-4 w-4 mr-2" />
              Rotate Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Rotated Result</Label>
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
          <h4 className="text-lg font-semibold mb-2">Character Rotation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello World"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After (Right, 3):</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"ldHello Wor"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Word Rotation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"The quick brown fox jumps"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After (Left, 2):</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"brown fox jumps The quick"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Line Rotation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Line 1\nLine 2\nLine 3\nLine 4"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After (Right, 1):</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Line 4\nLine 1\nLine 2\nLine 3"}
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


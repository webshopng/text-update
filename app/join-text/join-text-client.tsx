"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Merge } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface JoinTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function JoinTextClient({ content }: JoinTextClientProps) {
  const [inputTexts, setInputTexts] = useState(['', ''])
  const [delimiter, setDelimiter] = useState('newline')
  const [customDelimiter, setCustomDelimiter] = useState('')
  const [outputText, setOutputText] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = useCallback((index: number, value: string) => {
    setInputTexts(prev => {
      const newTexts = [...prev]
      newTexts[index] = value
      return newTexts
    })
  }, [])

  const handleAddInput = useCallback(() => {
    setInputTexts(prev => [...prev, ''])
  }, [])

  const handleRemoveInput = useCallback((index: number) => {
    setInputTexts(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleJoinTexts = useCallback(() => {
    setError('')
    let joinedText = ''
    let actualDelimiter = ''

    switch (delimiter) {
      case 'newline':
        actualDelimiter = '\n'
        break
      case 'space':
        actualDelimiter = ' '
        break
      case 'custom':
        actualDelimiter = customDelimiter
        break
      default:
        actualDelimiter = ''
    }

    joinedText = inputTexts.filter(text => text.trim() !== '').join(actualDelimiter)
    setOutputText(joinedText)
  }, [inputTexts, delimiter, customDelimiter])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

  const handlePaste = useCallback(async (index: number) => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      handleInputChange(index, clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [handleInputChange])

  const handleClear = useCallback(() => {
    setInputTexts(['', ''])
    setOutputText('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Join Text Tool"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            {inputTexts.map((text, index) => (
              <div key={index} className="relative">
                <Textarea
                  value={text}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`Enter text fragment ${index + 1}...`}
                  className="min-h-[100px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
                />
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button
                    onClick={() => handlePaste(index)}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    title="Paste"
                  >
                    <ClipboardPaste className="size-4" />
                  </button>
                  {inputTexts.length > 2 && (
                    <button
                      onClick={() => handleRemoveInput(index)}
                      className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      title="Remove"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <Button onClick={handleAddInput} variant="outline" className="w-full">
              Add Another Text Fragment
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="delimiter">Join with</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter">
                  <SelectValue placeholder="Select delimiter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newline">New Line</SelectItem>
                  <SelectItem value="space">Space</SelectItem>
                  <SelectItem value="custom">Custom Delimiter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {delimiter === 'custom' && (
              <div className="flex-1">
                <Label htmlFor="custom-delimiter">Custom Delimiter</Label>
                <Input
                  id="custom-delimiter"
                  value={customDelimiter}
                  onChange={(e) => setCustomDelimiter(e.target.value)}
                  placeholder="Enter custom delimiter"
                />
              </div>
            )}
          </div>

          <Button onClick={handleJoinTexts} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
            <Merge className="h-4 w-4 mr-2" />
            Join Texts
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


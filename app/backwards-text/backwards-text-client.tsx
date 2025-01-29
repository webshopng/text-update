"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, ArrowLeftRight } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

interface BackwardsTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function BackwardsTextClient({ content }: BackwardsTextClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('letters')

  const reverseLetters = useCallback((text: string) => {
    return text.split('').reverse().join('')
  }, [])

  const reverseWords = useCallback((text: string) => {
    return text.split(/\s+/).map(word => word.split('').reverse().join('')).join(' ')
  }, [])

  const handleReverse = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to reverse.')
      return
    }
    
    setOutputText(activeTab === 'letters' ? reverseLetters(inputText) : reverseWords(inputText))
  }, [inputText, activeTab, reverseLetters, reverseWords])

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
            {content.title || "Backwards Text Generator, Two Types"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Tabs defaultValue="letters" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="letters">Reverse Letters</TabsTrigger>
              <TabsTrigger value="words">Reverse Words</TabsTrigger>
            </TabsList>
            <TabsContent value="letters">
              <p className="text-sm text-muted-foreground mt-2">
                This mode reverses the order of all letters in the text.
              </p>
            </TabsContent>
            <TabsContent value="words">
              <p className="text-sm text-muted-foreground mt-2">
                This mode reverses the letters within each word, keeping word order intact.
              </p>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input Text</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to reverse..."
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

            <Button onClick={handleReverse} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Generate Backwards Text
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


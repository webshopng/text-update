"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, ClipboardPaste, Type, FileSymlink } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface WingdingsTranslatorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const wingdingsMap: { [key: string]: string } = {
  'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 'f': '', 'g': '', 'h': '',
  'i': '', 'j': '🖋', 'k': '', 'l': '', 'm': '', 'n': '', 'o': '', 'p': '',
  'q': '✏', 'r': '', 's': '', 't': '', 'u': '', 'v': '', 'w': '', 'x': '',
  'y': '', 'z': '', 'A': '✈', 'B': '🖊', 'C': '🖎', 'D': '✂', 'E': '🖈', 'F': '🖉',
  'G': '', 'H': 'ℍ', 'I': '🖁', 'J': '🖂', 'K': '🖃', 'L': '🖄', 'M': '🖅', 'N': '🖆',
  'O': '🖇', 'P': '🖈', 'Q': '🖉', 'R': '🖊', 'S': '🖋', 'T': '🖌', 'U': '🖍', 'V': '🖎',
  'W': '🖏', 'X': '🖐', 'Y': '🖑', 'Z': '🖒', '0': '0', '1': '1', '2': '2', '3': '3',
  '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', ' ': ' '
}

const reverseWingdingsMap = Object.fromEntries(
  Object.entries(wingdingsMap).map(([key, value]) => [value, key])
)

export function WingdingsTranslatorClient({ content }: WingdingsTranslatorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('text-to-wingdings')

  const handleTranslate = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to translate.')
      return
    }

    try {
      if (activeTab === 'text-to-wingdings') {
        const translated = inputText.split('').map(char => wingdingsMap[char.toLowerCase()] || char).join('')
        setOutputText(translated)
      } else {
        const translated = inputText.split('').map(char => reverseWingdingsMap[char] || char).join('')
        setOutputText(translated)
      }
    } catch (err) {
      setError('Error translating text. Please check your input.')
    }
  }, [inputText, activeTab])

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
            {content.title || "Wingdings Translator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Tabs defaultValue="text-to-wingdings" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-wingdings">Text to Wingdings</TabsTrigger>
              <TabsTrigger value="wingdings-to-text">Wingdings to Text</TabsTrigger>
            </TabsList>
            <TabsContent value="text-to-wingdings">
              <p className="text-sm text-muted-foreground mt-2">
                Convert plain text to Wingdings symbols.
              </p>
            </TabsContent>
            <TabsContent value="wingdings-to-text">
              <p className="text-sm text-muted-foreground mt-2">
                Convert Wingdings symbols back to plain text.
              </p>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Enter ${activeTab === 'text-to-wingdings' ? 'text' : 'Wingdings'} to translate...`}
                className="min-h-[200px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
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

            <Button onClick={handleTranslate} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              {activeTab === 'text-to-wingdings' ? (
                <FileSymlink className="h-4 w-4 mr-2" />
              ) : (
                <Type className="h-4 w-4 mr-2" />
              )}
              Translate
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Result</h3>
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


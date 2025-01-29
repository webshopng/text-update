"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface CrazyFontGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const crazyFonts = {
  'ᶠᵃⁿᶜʸ': (text: string) => text.split('').map(char => char.toLowerCase().replace(/[a-z]/g, c => String.fromCharCode(c.charCodeAt(0) + 8272))).join(''),
  'ᵇᵘᵇᵇˡᵉ': (text: string) => text.split('').map(char => char.toLowerCase().replace(/[a-z]/g, c => String.fromCharCode(c.charCodeAt(0) + 8256))).join(''),
  'uʍop ǝpᴉsdn': (text: string) => text.split('').map(char => {
    const flipped = '∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z'.split('')[
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(char.toUpperCase())
    ]
    return flipped || char
  }).reverse().join(''),
  'sᴛʀᴏᴋᴇ': (text: string) => text.split('').map(char => char.toLowerCase().replace(/[a-z]/g, c => String.fromCharCode(c.charCodeAt(0) + 8272))).join(''),
  'ｖａｐｏｒｗａｖｅ': (text: string) => text.split('').map(char => char.replace(/[A-Za-z0-9]/g, c => String.fromCharCode(c.charCodeAt(0) + 65248))).join(''),
}

export function CrazyFontGeneratorClient({ content }: CrazyFontGeneratorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedFont, setSelectedFont] = useState('ᶠᵃⁿᶜʸ')
  const [error, setError] = useState('')

  const handleGenerate = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to convert.')
      return
    }

    const fontFunction = crazyFonts[selectedFont as keyof typeof crazyFonts];
    if (fontFunction) {
      setOutputText(fontFunction(inputText));
    } else {
      setError('Invalid font selected.');
    }
  }, [inputText, selectedFont])

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
            {content.title || "Crazy Font Generator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to crazy font..."
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
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crazy font" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(crazyFonts).map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white">
              <Type className="h-4 w-4 mr-2" />
              Generate Crazy Font
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
                  className="min-h-[100px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Sample component boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">Before</h4>
              <p className="text-zinc-600 dark:text-zinc-400">Hello World</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">After</h4>
              <p className="text-zinc-600 dark:text-zinc-400">ʰᵉˡˡᵒ ʷᵒʳˡᵈ</p>
            </div>
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


"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, FlipHorizontal } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface MirroredTextGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const mirrorChar = (char: string): string => {
  const mirrorMap: { [key: string]: string } = {
    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ǫ', 'h': 'ʜ',
    'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
    'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'y', 'z': 'z', 'A': 'A', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ᖷ',
    'G': 'ᕼ', 'H': 'H', 'I': 'I', 'J': 'ᒐ', 'K': 'ᐴ', 'L': '⅃', 'M': 'M', 'N': 'И',
    'O': 'O', 'P': 'ꟼ', 'Q': 'Ọ', 'R': 'Я', 'S': 'Ƨ', 'T': 'T', 'U': 'U', 'V': 'V',
    'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z', '0': '0', '1': '1', '2': 'ς', '3': 'Ɛ',
    '4': 'ᔭ', '5': 'ϛ', '6': '9', '7': '7', '8': '8', '9': '6', '&': '⅋', '.': '˙',
    ',': '\'', '?': '¿', '!': '¡', '"': '„', '\'': ',', '(': ')', ')': '(', '[': ']',
    ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '\\': '/', '/': '\\'
  }
  return mirrorMap[char.toLowerCase()] || char
}

export function MirroredTextGeneratorClient({ content }: MirroredTextGeneratorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [error, setError] = useState('')
  const [reverseText, setReverseText] = useState(true)
  const [mirrorLetters, setMirrorLetters] = useState(true)

  const handleMirror = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to mirror.')
      return
    }

    let result = inputText

    if (mirrorLetters) {
      result = result.split('').map(mirrorChar).join('')
    }

    if (reverseText) {
      result = result.split('').reverse().join('')
    }

    setOutputText(result)
  }, [inputText, reverseText, mirrorLetters])

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
            {content.title || "Mirrored Text Generator"}
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
                placeholder="Enter text to mirror..."
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reverse-text"
                  checked={reverseText}
                  onCheckedChange={(checked) => setReverseText(checked as boolean)}
                />
                <Label htmlFor="reverse-text">Reverse text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mirror-letters"
                  checked={mirrorLetters}
                  onCheckedChange={(checked) => setMirrorLetters(checked as boolean)}
                />
                <Label htmlFor="mirror-letters">Mirror individual letters</Label>
              </div>
            </div>

            <Button onClick={handleMirror} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FlipHorizontal className="h-4 w-4 mr-2" />
              Generate Mirrored Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Mirrored Result</Label>
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

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Standard Mirroring</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: Hello World</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: blɿoW ollɘH</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Reverse Only</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: Hello World</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: dlroW olleH</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Mirror Letters Only</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Input: Hello World</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Output: Hɘllo Woɿlb</p>
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


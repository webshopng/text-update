"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, FileCode } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface HexToTextClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function HexToTextClient({ content }: HexToTextClientProps) {
  const [inputHex, setInputHex] = useState('')
  const [outputText, setOutputText] = useState('')
  const [inputFormat, setInputFormat] = useState('space')
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true)
  const [error, setError] = useState('')

  const convertHexToText = useCallback(() => {
    setError('')
    if (!inputHex) {
      setError('Please enter some hexadecimal values to convert.')
      return
    }

    try {
      let cleanedHex = inputHex
      if (ignoreWhitespace) {
        cleanedHex = cleanedHex.replace(/\s/g, '')
      } else if (inputFormat === 'space') {
        cleanedHex = cleanedHex.replace(/\s+/g, '')
      } else if (inputFormat === '0x') {
        cleanedHex = cleanedHex.replace(/0x/g, '')
      }

      if (!/^[0-9A-Fa-f]+$/.test(cleanedHex)) {
        setError('Invalid hexadecimal input. Please enter valid hex values.')
        return
      }

      const bytes = new Uint8Array(cleanedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
      const decodedText = new TextDecoder().decode(bytes)
      setOutputText(decodedText)
    } catch (err) {
      setError('Error converting hex to text. Please check your input.')
    }
  }, [inputHex, inputFormat, ignoreWhitespace])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setInputHex(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setInputHex('')
    setOutputText('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Hex to Text Converter"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-hex">Input Hexadecimal</Label>
              <Textarea
                id="input-hex"
                value={inputHex}
                onChange={(e) => setInputHex(e.target.value)}
                placeholder="Enter hexadecimal values to convert to text..."
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
                <Label htmlFor="input-format">Input Format</Label>
                <Select value={inputFormat} onValueChange={setInputFormat}>
                  <SelectTrigger id="input-format" className="mt-1">
                    <SelectValue placeholder="Select input format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="space">Space-separated</SelectItem>
                    <SelectItem value="0x">0x-prefixed</SelectItem>
                    <SelectItem value="continuous">Continuous string</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ignore-whitespace"
                  checked={ignoreWhitespace}
                  onCheckedChange={(checked) => setIgnoreWhitespace(checked as boolean)}
                />
                <Label htmlFor="ignore-whitespace">Ignore all whitespace</Label>
              </div>
            </div>

            <Button onClick={convertHexToText} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FileCode className="h-4 w-4 mr-2" />
              Convert Hex to Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Converted Text</Label>
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
          <h4 className="text-lg font-semibold mb-2">Space-separated Hex</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"48 65 6c 6c 6f 20 57 6f 72 6c 64"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello World"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">0x-prefixed Hex</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"0x48 0x65 0x78 0x20 0x74 0x6F 0x20 0x54 0x65 0x78 0x74"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hex to Text"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Continuous Hex String</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"436F6E76657274206865782076616C756573"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Convert hex values"}
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


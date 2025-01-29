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

interface TextToHexlClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TextToHexlClient({ content }: TextToHexlClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [bytesPerLine, setBytesPerLine] = useState('16')
  const [showAscii, setShowAscii] = useState(true)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [error, setError] = useState('')

  const convertToHexl = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to convert.')
      return
    }

    const bytes = new TextEncoder().encode(inputText)
    const bytesPerLineInt = parseInt(bytesPerLine, 10)
    let result = ''
    let lineNumber = 0

    for (let i = 0; i < bytes.length; i += bytesPerLineInt) {
      if (showLineNumbers) {
        result += lineNumber.toString(16).padStart(8, '0') + ': '
      }

      const lineBytes = bytes.slice(i, i + bytesPerLineInt)
      const hexValues = Array.from(lineBytes).map(byte => byte.toString(16).padStart(2, '0'))
      result += hexValues.join(' ').padEnd(bytesPerLineInt * 3 - 1, ' ')

      if (showAscii) {
        result += '  |'
        for (const byte of lineBytes) {
          result += byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.'
        }
        result += '|'
      }

      result += '\n'
      lineNumber += bytesPerLineInt
    }

    setOutputText(result.trim())
  }, [inputText, bytesPerLine, showAscii, showLineNumbers])

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
            {content.title || "Text to Hexl Converter"}
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
                placeholder="Enter text to convert to hexl format..."
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
                <Label htmlFor="bytes-per-line">Bytes per Line</Label>
                <Select value={bytesPerLine} onValueChange={setBytesPerLine}>
                  <SelectTrigger id="bytes-per-line" className="mt-1">
                    <SelectValue placeholder="Select bytes per line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 bytes</SelectItem>
                    <SelectItem value="16">16 bytes</SelectItem>
                    <SelectItem value="32">32 bytes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-ascii"
                  checked={showAscii}
                  onCheckedChange={(checked) => setShowAscii(checked as boolean)}
                />
                <Label htmlFor="show-ascii">Show ASCII</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-line-numbers"
                  checked={showLineNumbers}
                  onCheckedChange={(checked) => setShowLineNumbers(checked as boolean)}
                />
                <Label htmlFor="show-line-numbers">Show Line Numbers</Label>
              </div>
            </div>

            <Button onClick={convertToHexl} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FileCode className="h-4 w-4 mr-2" />
              Convert to Hexl
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Hexl Output</Label>
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
                  className="min-h-[200px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500 font-mono"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Basic Conversion</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello, World!"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"00000000: 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21  |Hello, World!|"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Custom Bytes per Line</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"The quick brown fox"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After (8 bytes per line):</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"00000000: 54 68 65 20 71 75 69 63  |The quic|\n00000008: 6b 20 62 72 6f 77 6e 20  |k brown |\n00000010: 66 6f 78              |fox|"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Without ASCII</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"OpenAI GPT"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After (No ASCII, No Line Numbers):</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"4f 70 65 6e 41 49 20 47 50 54"}
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


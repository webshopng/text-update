"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, FileCode } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface TextToHtmlGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TextToHtmlGeneratorClient({ content }: TextToHtmlGeneratorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputHtml, setOutputHtml] = useState('')
  const [paragraphStyle, setParagraphStyle] = useState('p')
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true)
  const [convertUrls, setConvertUrls] = useState(true)
  const [error, setError] = useState('')

  const convertTextToHtml = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to convert.')
      return
    }

    let html = inputText

    // Convert URLs to links
    if (convertUrls) {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      html = html.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    }

    // Preserve line breaks
    if (preserveLineBreaks) {
      html = html.replace(/\n/g, '<br>')
    }

    // Wrap in paragraph tags
    const paragraphs = html.split(/\n{2,}/)
    html = paragraphs.map(p => `<${paragraphStyle}>${p.trim()}</${paragraphStyle}>`).join('\n\n')

    setOutputHtml(html)
  }, [inputText, paragraphStyle, preserveLineBreaks, convertUrls])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputHtml)
  }, [outputHtml])

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
    setOutputHtml('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Text to HTML Generator"}
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
                <Label htmlFor="paragraph-style">Paragraph Style</Label>
                <Select value={paragraphStyle} onValueChange={setParagraphStyle}>
                  <SelectTrigger id="paragraph-style" className="mt-1">
                    <SelectValue placeholder="Select paragraph style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p">Paragraph (&lt;p&gt;)</SelectItem>
                    <SelectItem value="div">Div (&lt;div&gt;)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col justify-end space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserve-line-breaks"
                    checked={preserveLineBreaks}
                    onCheckedChange={(checked) => setPreserveLineBreaks(checked as boolean)}
                  />
                  <Label htmlFor="preserve-line-breaks">Preserve line breaks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="convert-urls"
                    checked={convertUrls}
                    onCheckedChange={(checked) => setConvertUrls(checked as boolean)}
                  />
                  <Label htmlFor="convert-urls">Convert URLs to links</Label>
                </div>
              </div>
            </div>

            <Button onClick={convertTextToHtml} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FileCode className="h-4 w-4 mr-2" />
              Convert to HTML
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputHtml && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-html">Generated HTML</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy HTML
                  </Button>
                </div>
                <Textarea 
                  id="output-html"
                  value={outputHtml}
                  readOnly
                  className="min-h-[200px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500 font-mono"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Basic Conversion</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello, world!\n\nThis is a new paragraph."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"<p>Hello, world!</p>\n\n<p>This is a new paragraph.</p>"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Preserve Line Breaks</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Line 1\nLine 2\nLine 3"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"<p>Line 1<br>Line 2<br>Line 3</p>"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Convert URLs</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Check out https://www.example.com"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {'<p>Check out <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">https://www.example.com</a></p>'}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Div Style</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"First paragraph\n\nSecond paragraph"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"<div>First paragraph</div>\n\n<div>Second paragraph</div>"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Mixed Content</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Title\n\nParagraph with a link: https://example.com\nAnd a new line."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {'<p>Title</p>\n\n<p>Paragraph with a link: <a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a><br>And a new line.</p>'}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Multiple Paragraphs</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Paragraph 1\n\nParagraph 2\n\nParagraph 3"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"<p>Paragraph 1</p>\n\n<p>Paragraph 2</p>\n\n<p>Paragraph 3</p>"}
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


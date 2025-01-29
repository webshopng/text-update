"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, FileText } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Checkbox } from "@/components/ui/checkbox"

interface LoremIpsumGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const loremIpsumWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in",
  "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa",
  "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
]

export function LoremIpsumGeneratorClient({ content }: LoremIpsumGeneratorClientProps) {
  const [outputText, setOutputText] = useState('')
  const [paragraphs, setParagraphs] = useState('3')
  const [wordsPerParagraph, setWordsPerParagraph] = useState('50')
  const [format, setFormat] = useState('paragraphs')
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState(true)
  const [error, setError] = useState('')

  const generateLoremIpsum = useCallback(() => {
    setError('')
    if (parseInt(paragraphs) < 1 || parseInt(wordsPerParagraph) < 1) {
      setError('Please enter valid numbers for paragraphs and words.')
      return
    }

    let result = ''
    const numParagraphs = parseInt(paragraphs)
    const numWords = parseInt(wordsPerParagraph)

    for (let i = 0; i < numParagraphs; i++) {
      let paragraph = ''
      for (let j = 0; j < numWords; j++) {
        if (i === 0 && j === 0 && startWithLoremIpsum) {
          paragraph += 'Lorem ipsum dolor sit amet, '
          j += 4
        } else {
          paragraph += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' '
        }
      }
      if (format === 'paragraphs') {
        result += paragraph.trim() + '\n\n'
      } else if (format === 'sentences') {
        result += paragraph.trim() + '. '
      } else {
        result += paragraph
      }
    }

    setOutputText(result.trim())
  }, [paragraphs, wordsPerParagraph, format, startWithLoremIpsum])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText)
  }, [outputText])

  const handleClear = useCallback(() => {
    setOutputText('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Lorem Ipsum Generator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paragraphs">Number of Paragraphs</Label>
                <Input
                  id="paragraphs"
                  type="number"
                  min="1"
                  value={paragraphs}
                  onChange={(e) => setParagraphs(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="words-per-paragraph">Words per Paragraph</Label>
                <Input
                  id="words-per-paragraph"
                  type="number"
                  min="1"
                  value={wordsPerParagraph}
                  onChange={(e) => setWordsPerParagraph(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger id="format" className="mt-1">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="continuous">Continuous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="start-with-lorem-ipsum"
                  checked={startWithLoremIpsum}
                  onCheckedChange={(checked) => setStartWithLoremIpsum(checked as boolean)}
                />
                <Label htmlFor="start-with-lorem-ipsum">Start with "Lorem ipsum"</Label>
              </div>
            </div>

            <Button onClick={generateLoremIpsum} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              <FileText className="h-4 w-4 mr-2" />
              Generate Lorem Ipsum
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Generated Lorem Ipsum</Label>
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
                  className="min-h-[200px] resize-y bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Paragraph Format</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Settings:</p>
          <ul className="text-xs list-disc list-inside mb-2">
            <li>2 paragraphs</li>
            <li>30 words each</li>
            <li>Start with "Lorem ipsum"</li>
          </ul>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">Result:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.

            Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste.
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Sentence Format</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Settings:</p>
          <ul className="text-xs list-disc list-inside mb-2">
            <li>3 sentences</li>
            <li>20 words each</li>
            <li>Don't start with "Lorem ipsum"</li>
          </ul>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">Result:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-40">
            Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut. Aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur. Sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste.
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Continuous Format</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Settings:</p>
          <ul className="text-xs list-disc list-inside mb-2">
            <li>1 paragraph</li>
            <li>50 words</li>
            <li>Start with "Lorem ipsum"</li>
          </ul>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">Result:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
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


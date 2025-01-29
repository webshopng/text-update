"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Trash2, ClipboardPaste, FileSpreadsheet, FileText } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface CommaSeparatedValuesClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function CommaSeparatedValuesClient({ content }: CommaSeparatedValuesClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('text-to-csv')

  const handleTextToCSV = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to convert.')
      return
    }

    try {
      const lines = inputText.split('\n').map(line => line.trim())
      const csv = lines.map(line => line.split(delimiter).map(value => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n')
      setOutputText(csv)
    } catch (err) {
      setError('Error converting text to CSV. Please check your input.')
    }
  }, [inputText, delimiter])

  const handleCSVToText = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some CSV to convert.')
      return
    }

    try {
      const lines = inputText.split('\n').map(line => line.trim())
      const text = lines.map(line => {
        const values = []
        let currentValue = ''
        let insideQuotes = false

        for (let i = 0; i < line.length; i++) {
          if (line[i] === '"') {
            insideQuotes = !insideQuotes
          } else if (line[i] === delimiter && !insideQuotes) {
            values.push(currentValue.replace(/""/g, '"'))
            currentValue = ''
          } else {
            currentValue += line[i]
          }
        }
        values.push(currentValue.replace(/""/g, '"'))
        return values.join(delimiter)
      }).join('\n')
      setOutputText(text)
    } catch (err) {
      setError('Error converting CSV to text. Please check your input.')
    }
  }, [inputText, delimiter])

  const handleConvert = useCallback(() => {
    if (activeTab === 'text-to-csv') {
      handleTextToCSV()
    } else {
      handleCSVToText()
    }
  }, [activeTab, handleTextToCSV, handleCSVToText])

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
            {content.title || "Comma Separated Values Online"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Tabs defaultValue="text-to-csv" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-csv">Text to CSV</TabsTrigger>
              <TabsTrigger value="csv-to-text">CSV to Text</TabsTrigger>
            </TabsList>
            <TabsContent value="text-to-csv">
              <p className="text-sm text-muted-foreground mt-2">
                Convert plain text to CSV format. Each line will be treated as a row.
              </p>
            </TabsContent>
            <TabsContent value="csv-to-text">
              <p className="text-sm text-muted-foreground mt-2">
                Convert CSV format back to plain text.
              </p>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input {activeTab === 'text-to-csv' ? 'Text' : 'CSV'}</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Enter ${activeTab === 'text-to-csv' ? 'text' : 'CSV'} to convert...`}
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

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="delimiter">Delimiter</Label>
                <Input
                  id="delimiter"
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="mt-1"
                  placeholder="Enter delimiter (default is comma)"
                />
              </div>
            </div>

            <Button onClick={handleConvert} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
              {activeTab === 'text-to-csv' ? (
                <FileSpreadsheet className="h-4 w-4 mr-2" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              Convert {activeTab === 'text-to-csv' ? 'to CSV' : 'to Text'}
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


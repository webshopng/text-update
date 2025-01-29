"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, ClipboardPaste, Indent, Outdent, Bold, Italic, Underline, List, ListOrdered } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface IndentationRichTextEditorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function IndentationRichTextEditorClient({ content }: IndentationRichTextEditorClientProps) {
  const [editorContent, setEditorContent] = useState('')
  const [error, setError] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent
    }
  }, [editorContent])

  const handleCommand = useCallback((command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML)
    }
  }, [])

  const handleIndent = useCallback(() => {
    handleCommand('indent')
  }, [handleCommand])

  const handleOutdent = useCallback(() => {
    handleCommand('outdent')
  }, [handleCommand])

  const handleCopy = useCallback(() => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.innerText)
    }
  }, [])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      handleCommand('insertText', clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [handleCommand])

  const handleClear = useCallback(() => {
    setEditorContent('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Indentation Rich Text Editor"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Button onClick={() => handleCommand('bold')} size="sm" variant="outline">
                <Bold className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleCommand('italic')} size="sm" variant="outline">
                <Italic className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleCommand('underline')} size="sm" variant="outline">
                <Underline className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleCommand('insertUnorderedList')} size="sm" variant="outline">
                <List className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleCommand('insertOrderedList')} size="sm" variant="outline">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button onClick={handleIndent} size="sm" variant="outline">
                <Indent className="h-4 w-4" />
              </Button>
              <Button onClick={handleOutdent} size="sm" variant="outline">
                <Outdent className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[300px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 text-base p-4 outline-none"
                onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
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

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Basic Indentation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Item 1\nItem 2\nItem 3"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Item 1\n  Item 2\n    Item 3"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Rich Text Formatting</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Title\nSubtitle\nParagraph"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <h1 className="text-lg font-bold">Title</h1>
            <h2 className="text-md font-semibold">Subtitle</h2>
            <p>Paragraph</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Lists with Indentation</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Fruits\nApples\nBananas\nVegetables\nCarrots\nBroccoli"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <ul className="list-disc pl-5">
              <li>Fruits
                <ul className="list-circle pl-5">
                  <li>Apples</li>
                  <li>Bananas</li>
                </ul>
              </li>
              <li>Vegetables
                <ul className="list-circle pl-5">
                  <li>Carrots</li>
                  <li>Broccoli</li>
                </ul>
              </li>
            </ul>
          </div>
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


"use client"

import { useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, Users } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RandomGroupGeneratorClientProps {
  content: {
    title?: string
    description?: string
    content?: string
  }
}

export function RandomGroupGeneratorClient({
  content,
}: RandomGroupGeneratorClientProps) {
  const [itemsText, setItemsText] = useState('')
  const [numGroups, setNumGroups] = useState('2')
  const [results, setResults] = useState<string[][]>([])
  const [error, setError] = useState('')

  const generateRandomGroups = useCallback(() => {
    setError('')

    const items = itemsText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '')

    const numGroupsInt = parseInt(numGroups, 10)

    if (items.length === 0) {
      setError('Please enter at least one item.')
      return
    }

    if (isNaN(numGroupsInt) || numGroupsInt <= 0) {
      setError('Please enter a valid number of groups.')
      return
    }

    if (numGroupsInt > items.length) {
      setError('Number of groups cannot exceed number of items.')
      return
    }

    const shuffledItems = [...items]
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledItems[i], shuffledItems[j]] = [
        shuffledItems[j],
        shuffledItems[i],
      ]
    }

    const groups: string[][] = Array.from(
      { length: numGroupsInt },
      () => []
    )

    for (let i = 0; i < shuffledItems.length; i++) {
      groups[i % numGroupsInt].push(shuffledItems[i])
    }

    setResults(groups)
  }, [itemsText, numGroups])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(
      results.map((group) => group.join('\n')).join('\n\n')
    )
  }, [results])

  const handlePaste = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setItemsText(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setItemsText('')
    setNumGroups('2')
    setResults([])
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Random Group Generator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
                placeholder="Enter items, one per line..."
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
            <div>
              <Label htmlFor="numGroups">Number of Groups</Label>
              <Input
                type="number"
                id="numGroups"
                value={numGroups}
                onChange={(e) => setNumGroups(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <Button
              onClick={generateRandomGroups}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Generate Groups
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="result">Results</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </div>
                <div className="space-y-4">
                  {results.map((group, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <h5 className="font-semibold mb-2">
                        Group {index + 1}
                      </h5>
                      <pre className="text-sm whitespace-pre-wrap">
                        {group.join('\n')}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Single Item</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Group 1:\nApple"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Multiple Items</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Group 1:\nApple\nCherry\nGroup 2:\nBanana"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Many Items</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana\nCherry\nDate\nElderberry\nFig\nGrape"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Group 1:\nBanana\nElderberry\nGrape\nGroup 2:\nApple\nCherry\nFig"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Empty Lines</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\n\nBanana\n\nCherry"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Group 1:\nApple\nGroup 2:\nBanana\nGroup 3:\nCherry"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">
            More Groups than Items
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Apple\nBanana"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After: (3 Groups)
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Number of groups cannot exceed number of items."}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">No Items</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Before:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {""}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
            After:
          </p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Please enter at least one item."}
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


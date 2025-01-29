'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, Trash2, ClipboardPaste } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { StyledContent } from '@/app/components/styled-content'
import { Label } from '@/components/ui/label'

interface SkinColorCodeHexGeneratorClientProps {
  content: {
    title?: string
    description?: string
    content?: string
  }
}

// Predefined skin color hex codes
const skinColors = [
  { name: 'Porcelain', hex: '#F2E8DF' },
  { name: 'Fair', hex: '#FFE0BD' },
  { name: 'Light', hex: '#FFD3A6' },
  { name: 'Medium', hex: '#D1A375' },
  { name: 'Tan', hex: '#B88B6C' },
  { name: 'Dark', hex: '#8D5524' },
]

export function SkinColorCodeHexGeneratorClient({
  content,
}: SkinColorCodeHexGeneratorClientProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [copiedColor, setCopiedColor] = useState('')
  const [error, setError] = useState('')

  const handleColorClick = useCallback((hex: string) => {
    setSelectedColors(prev => {
      if (prev.includes(hex)) {
        return prev.filter(color => color !== hex)
      }
      return [...prev, hex]
    })
    setCopiedColor('')
  }, [])

  const handleCopy = useCallback(
    (hex: string) => {
      navigator.clipboard.writeText(hex)
      setCopiedColor(hex)
    },
    [setCopiedColor]
  )

  const handleClear = useCallback(() => {
    setSelectedColors([])
    setCopiedColor('')
    setError('')
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || 'Skin Color Code Hex Generator'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skinColors.map(color => (
                <div
                  key={color.hex}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedColors.includes(color.hex)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                  onClick={() => handleColorClick(color.hex)}
                >
                  <div
                    className="w-full h-10 rounded-md mb-2"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-sm font-medium">{color.name}</div>
                  <div className="text-xs font-mono mt-1">{color.hex}</div>
                  {selectedColors.includes(color.hex) && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleCopy(color.hex)}
                      className="mt-2"
                    >
                      {copiedColor === color.hex ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="size-4 mr-2" />
                Clear
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {skinColors.slice(0, 6).map(color => (
          <div key={color.hex} className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">{color.name}</h4>
            <div className="flex items-center mb-2">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-sm font-mono">{color.hex}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl vel nisl.'
              }
            </p>
          </div>
        ))}
      </div>

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


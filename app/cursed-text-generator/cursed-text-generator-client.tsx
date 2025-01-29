"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Skull } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Label } from "@/components/ui/label"

interface CursedTextGeneratorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const cursedStyles = {
  zalgo: (text: string) => {
    const zalgoChars = [
      '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
      '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F',
      '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D', '\u032E', '\u032F',
      '\u0330', '\u0331', '\u0332', '\u0333', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0339', '\u033A', '\u033B', '\u033C', '\u033D', '\u033E', '\u033F',
      '\u0340', '\u0341', '\u0342', '\u0343', '\u0344', '\u0345', '\u0346', '\u0347', '\u0348', '\u0349', '\u034A', '\u034B', '\u034C', '\u034D', '\u034E', '\u034F',
    ];
    return text.split('').map(char => char + zalgoChars.slice(0, Math.floor(Math.random() * 15)).join('')).join('');
  },
  vaporwave: (text: string) => {
    return text.split('').map(char => char + '\u3000').join('');
  },
  creepyLetters: (text: string) => {
    const creepyMap: { [key: string]: string } = {
      'a': 'ą', 'b': 'ҍ', 'c': 'ç', 'd': 'ժ', 'e': 'ҽ', 'f': 'ƒ', 'g': 'ց', 'h': 'հ', 'i': 'ì', 'j': 'ʝ',
      'k': 'ҟ', 'l': 'Ӏ', 'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ք', 'q': 'զ', 'r': 'ɾ', 's': 'ʂ', 't': 'է',
      'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×', 'y': 'վ', 'z': 'Հ'
    };
    return text.toLowerCase().split('').map(char => creepyMap[char] || char).join('');
  },
  mirror: (text: string) => {
    const mirrorMap: { [key: string]: string } = {
      'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'ꞁ',
      'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'ᴎ', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ',
      'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z'
    };
    return text.toLowerCase().split('').map(char => mirrorMap[char] || char).join('');
  }
};

export function CursedTextGeneratorClient({ content }: CursedTextGeneratorClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('zalgo')
  const [error, setError] = useState('')

  const handleGenerate = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to transform.')
      return
    }

    const transformFunction = cursedStyles[selectedStyle as keyof typeof cursedStyles];
    if (transformFunction) {
      setOutputText(transformFunction(inputText));
    } else {
      setError('Invalid style selected.');
    }
  }, [inputText, selectedStyle])

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
            {content.title || "Cursed Text Generator"}
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
                placeholder="Enter text to curse..."
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

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="curse-style">Curse Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger id="curse-style" className="mt-1">
                    <SelectValue placeholder="Select curse style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zalgo">Zalgo</SelectItem>
                    <SelectItem value="vaporwave">Vaporwave</SelectItem>
                    <SelectItem value="creepyLetters">Creepy Letters</SelectItem>
                    <SelectItem value="mirror">Mirror</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerate} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white">
              <Skull className="h-4 w-4 mr-2" />
              Generate Cursed Text
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Cursed Result</Label>
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

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


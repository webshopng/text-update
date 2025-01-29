"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Switch } from "@/components/ui/switch"

interface TextToMorseCodeClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
}

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
)

export function TextToMorseCodeClient({ content }: TextToMorseCodeClientProps) {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('text-to-morse')
  const [separator, setSeparator] = useState('space')
  const [playAudio, setPlayAudio] = useState(false)
  const [error, setError] = useState('')

  const convertTextToMorse = (text: string): string => {
    return text.toUpperCase().split('').map(char => {
      const morse = morseCodeMap[char] || char
      return morse === '/' ? '/' : morse + (separator === 'space' ? ' ' : '/')
    }).join('').trim()
  }

  const convertMorseToText = (morse: string): string => {
    const words = morse.split('/')
    return words.map(word => 
      word.split(separator === 'space' ? ' ' : '/').map(code => 
        reverseMorseCodeMap[code] || code
      ).join('')
    ).join(' ').trim()
  }

  const handleConvert = useCallback(() => {
    setError('')
    if (!inputText) {
      setError('Please enter some text to convert.')
      return
    }

    try {
      if (mode === 'text-to-morse') {
        setOutputText(convertTextToMorse(inputText))
      } else {
        setOutputText(convertMorseToText(inputText))
      }
    } catch (err) {
      setError('Error converting text. Please check your input.')
    }
  }, [inputText, mode, separator])

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

  const playMorseCode = useCallback(() => {
    if (!outputText) return

    const audio = new (window.AudioContext || (window as any).webkitAudioContext)()
    const dotDuration = 60 / 50 // 50 WPM
    const dashDuration = dotDuration * 3
    const pauseDuration = dotDuration

    let startTime = audio.currentTime

    outputText.split('').forEach((char) => {
      if (char === '.') {
        const osc = audio.createOscillator()
        osc.frequency.value = 600
        osc.connect(audio.destination)
        osc.start(startTime)
        osc.stop(startTime + dotDuration)
        startTime += dotDuration + pauseDuration
      } else if (char === '-') {
        const osc = audio.createOscillator()
        osc.frequency.value = 600
        osc.connect(audio.destination)
        osc.start(startTime)
        osc.stop(startTime + dashDuration)
        startTime += dashDuration + pauseDuration
      } else if (char === ' ' || char === '/') {
        startTime += pauseDuration * 3
      }
    })
  }, [outputText])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Text to Morse Code Converter"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input {mode === 'text-to-morse' ? 'Text' : 'Morse Code'}</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Enter ${mode === 'text-to-morse' ? 'text' : 'Morse code'} here...`}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="conversion-mode">Conversion Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger id="conversion-mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-to-morse">Text to Morse</SelectItem>
                    <SelectItem value="morse-to-text">Morse to Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="separator">Separator</Label>
                <Select value={separator} onValueChange={setSeparator}>
                  <SelectTrigger id="separator">
                    <SelectValue placeholder="Select separator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="space">Space</SelectItem>
                    <SelectItem value="slash">Slash (/)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="play-audio"
                checked={playAudio}
                onCheckedChange={setPlayAudio}
              />
              <Label htmlFor="play-audio">Play Morse code audio</Label>
            </div>

            <Button onClick={handleConvert} className="w-full">
              <Type className="w-4 h-4 mr-2" />
              Convert {mode === 'text-to-morse' ? 'Text to Morse' : 'Morse to Text'}
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
                  <div className="space-x-2">
                    {playAudio && mode === 'text-to-morse' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={playMorseCode}
                        className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
                      >
                        Play Audio
                      </Button>
                    )}
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

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Text to Morse Code</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"HELLO WORLD"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {".... . .-.. .-.. --- / .-- --- .-. .-.. -.."}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Morse Code to Text</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"... --- ..."}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"SOS"}
          </pre>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Using Slash Separator</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"MORSE CODE"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"--/---/.-./..././-.-./---/-../."}
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


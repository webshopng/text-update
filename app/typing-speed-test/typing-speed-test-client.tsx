"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Timer, Activity, RotateCcw, Trophy } from 'lucide-react'
import { StyledContent } from '@/app/components/styled-content'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TypingSpeedTestClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

// Sample paragraphs for typing test
const sampleTexts = [
  `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams have been used to display typefaces and test equipment since the invention of printing. The sentence has been used since the late 19th century to test typewriters and computer keyboards.`,
  
  `In a bustling city, where life moves at the speed of light, people rush through their daily routines without pause. The streets are filled with a symphony of sounds: car horns, conversation snippets, and the rhythmic footsteps of countless pedestrians. Every corner tells a story, every moment captures a lifetime of experiences.`,
  
  `Technology continues to reshape our world in unprecedented ways. From artificial intelligence to renewable energy solutions, innovations emerge daily that challenge our understanding of what's possible. The future arrives faster than we can imagine, bringing both opportunities and responsibilities that we must carefully consider.`
]

export function TypingSpeedTestClient({ content }: TypingSpeedTestClientProps) {
  const [currentText, setCurrentText] = useState('')
  const [sampleText, setSampleText] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [wordsPerMinute, setWordsPerMinute] = useState(0)
  const [charsPerMinute, setCharsPerMinute] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  // Get a random sample text
  const getRandomText = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    return sampleTexts[randomIndex]
  }, [])

  // Initialize the test
  const initializeTest = useCallback(() => {
    const newSampleText = getRandomText()
    setSampleText(newSampleText)
    setCurrentText('')
    setTimeLeft(60)
    setIsActive(false)
    setHasStarted(false)
    setWordsPerMinute(0)
    setCharsPerMinute(0)
    setAccuracy(100)
    setErrors(0)
    setTotalKeystrokes(0)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [getRandomText])

  // Start the timer
  const startTimer = useCallback(() => {
    if (!isActive) {
      setIsActive(true)
      setHasStarted(true)
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current)
            setIsActive(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
  }, [isActive])

  // Calculate typing statistics
  const calculateStats = useCallback(() => {
    const words = currentText.trim().split(/\s+/).length
    const characters = currentText.length
    const wordsPerMin = Math.round((words / (60 - timeLeft)) * 60)
    const charsPerMin = Math.round((characters / (60 - timeLeft)) * 60)
    const accuracyRate = Math.round(((characters - errors) / characters) * 100) || 100

    setWordsPerMinute(wordsPerMin)
    setCharsPerMinute(charsPerMin)
    setAccuracy(accuracyRate)

    if (wordsPerMin > bestScore) {
      setBestScore(wordsPerMin)
    }
  }, [currentText, timeLeft, errors, bestScore])

  // Handle text input
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setCurrentText(newText)
    setTotalKeystrokes(prev => prev + 1)

    if (!isActive && newText.length > 0) {
      startTimer()
    }

    // Check for errors
    const expectedText = sampleText.substring(0, newText.length)
    let newErrors = 0
    for (let i = 0; i < newText.length; i++) {
      if (newText[i] !== expectedText[i]) {
        newErrors++
      }
    }
    setErrors(newErrors)
  }, [isActive, sampleText, startTimer])

  // Update stats every second when active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(calculateStats, 1000)
      return () => clearInterval(interval)
    }
  }, [isActive, calculateStats])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Test Your Typing Speed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Stats Display */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="relative flex flex-col items-center justify-center bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4 aspect-square">
              <Timer className="w-6 h-6 text-yellow-600 dark:text-yellow-400 absolute top-2 right-2" />
              <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{timeLeft}</span>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">seconds</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-blue-100 dark:bg-blue-900/20 rounded-lg p-4 aspect-square">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{wordsPerMinute}</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">words/min</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-lg p-4 aspect-square">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">{charsPerMinute}</span>
              <span className="text-sm text-green-600 dark:text-green-400">chars/min</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4 aspect-square">
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{accuracy}</span>
              <span className="text-sm text-purple-600 dark:text-purple-400">% accuracy</span>
            </div>
          </div>

          {/* Sample Text Display */}
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {sampleText}
            </p>
          </div>

          {/* Typing Input */}
          <div className="relative">
            <textarea
              ref={inputRef}
              onChange={handleInput}
              disabled={!isActive && hasStarted}
              placeholder={isActive ? "Start typing..." : timeLeft === 0 ? "Test completed" : "Click 'Start Test' to begin"}
              className="min-h-[200px] resize-y w-full rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={initializeTest}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-12"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {hasStarted ? "Try Again" : "Start Test"}
            </Button>
          </div>

          {/* Results Section */}
          {timeLeft === 0 && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="ml-2">
                <span className="font-semibold">Test completed!</span>
                <br />
                You typed at {wordsPerMinute} words per minute with {accuracy}% accuracy.
                {bestScore === wordsPerMinute && (
                  <span className="block mt-1 text-green-600 dark:text-green-400">
                    🎉 New personal best!
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Sample Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Beginner</h3>
          <div className="space-y-2">
            <p className="text-zinc-600 dark:text-zinc-400">{"< 30 WPM"}</p>
            <div className="h-2 bg-red-200 rounded-full">
              <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Professional</h3>
          <div className="space-y-2">
            <p className="text-zinc-600 dark:text-zinc-400">{"> 60 WPM"}</p>
            <div className="h-2 bg-green-200 rounded-full">
              <div className="h-full w-full bg-green-500 rounded-full"></div>
            </div>
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


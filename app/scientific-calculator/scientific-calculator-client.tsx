"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface ScientificCalculatorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function ScientificCalculatorClient({ content }: ScientificCalculatorClientProps) {
  const [display, setDisplay] = useState('0')
  const [error, setError] = useState('')

  const handleButtonClick = useCallback((value: string) => {
    setDisplay((prev) => {
      if (prev === '0' && value !== '.') {
        return value
      }
      return prev + value
    })
    setError('')
  }, [])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setError('')
  }, [])

  const handleCalculate = useCallback(() => {
    try {
      let expression = display
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**')

      const result = new Function(`return ${expression}`)()
      setDisplay(result.toString())
    } catch (err) {
      setError('Invalid expression')
    }
  }, [display])

  const buttons = [
    'sin', 'cos', 'tan', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=', '^',
    'log', 'ln', 'sqrt', 'π',
    '(', ')', 'e', 'C'
  ]

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Advanced Math Made Simple"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-md">
            <p className="text-right text-2xl font-mono text-zinc-900 dark:text-zinc-100 break-all">{display}</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === '=') handleCalculate()
                  else if (btn === 'C') handleClear()
                  else handleButtonClick(btn)
                }}
                className={`text-sm h-12 cursor-pointer ${
                  btn === '=' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                {btn}
              </Button>
            ))}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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


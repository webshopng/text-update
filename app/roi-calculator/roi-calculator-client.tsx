"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface ROICalculatorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function ROICalculatorClient({ content }: ROICalculatorClientProps) {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [duration, setDuration] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  const calculateROI = useCallback(() => {
    setError('')
    setResult(null)

    const investment = parseFloat(initialInvestment)
    const value = parseFloat(finalValue)
    const years = parseFloat(duration)

    if (isNaN(investment) || isNaN(value) || isNaN(years)) {
      setError('Please enter valid numbers for all fields.')
      return
    }

    if (investment <= 0 || value <= 0 || years <= 0) {
      setError('Please enter positive values for all fields.')
      return
    }

    const totalReturn = value - investment
    const roi = (totalReturn / investment) * 100
    const annualizedRoi = (Math.pow((value / investment), (1 / years)) - 1) * 100

    setResult(`
      Total Return: $${totalReturn.toFixed(2)}
      ROI: ${roi.toFixed(2)}%
      Annualized ROI: ${annualizedRoi.toFixed(2)}%
    `)
  }, [initialInvestment, finalValue, duration])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "ROI Calculator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="Enter initial investment amount"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="finalValue">Final Value ($)</Label>
              <Input
                id="finalValue"
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="Enter final value of investment"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="duration">Investment Duration (Years)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter investment duration in years"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
          </div>

          <Button onClick={calculateROI} className="w-full">Calculate ROI</Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm text-indigo-900 dark:text-indigo-100">
                {result}
              </pre>
            </div>
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


"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface CompoundInterestCalculatorClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function CompoundInterestCalculatorClient({ content }: CompoundInterestCalculatorClientProps) {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [compoundFrequency, setCompoundFrequency] = useState('12')
  const [additionalContribution, setAdditionalContribution] = useState('')
  const [contributionFrequency, setContributionFrequency] = useState('12')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  const calculateCompoundInterest = useCallback(() => {
    setError('')
    setResult(null)

    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(time)
    const n = parseFloat(compoundFrequency)
    const pmt = parseFloat(additionalContribution)
    const pmtFreq = parseFloat(contributionFrequency)

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || isNaN(pmt) || isNaN(pmtFreq)) {
      setError('Please enter valid numbers for all fields.')
      return
    }

    if (p < 0 || r < 0 || t <= 0 || n <= 0 || pmt < 0 || pmtFreq <= 0) {
      setError('Please enter positive values for all fields. Time, compound frequency, and contribution frequency must be greater than zero.')
      return
    }

    const totalCompounds = n * t
    const contributionsPerCompound = pmtFreq / n

    let amount = p * Math.pow(1 + r / n, totalCompounds)
    
    if (pmt > 0) {
      amount += pmt * (Math.pow(1 + r / n, totalCompounds) - 1) / (r / n) * contributionsPerCompound
    }

    const totalContributions = p + (pmt * pmtFreq * t)
    const interestEarned = amount - totalContributions

    setResult(`
      Final Amount: $${amount.toFixed(2)}
      Total Contributions: $${totalContributions.toFixed(2)}
      Interest Earned: $${interestEarned.toFixed(2)}
    `)
  }, [principal, rate, time, compoundFrequency, additionalContribution, contributionFrequency])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Compound Interest Calculator"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter initial investment amount"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter annual interest rate"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="time">Investment Period (Years)</Label>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter investment period in years"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="compoundFrequency">Compound Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger id="compoundFrequency">
                  <SelectValue placeholder="Select compound frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="additionalContribution">Additional Contribution ($)</Label>
              <Input
                id="additionalContribution"
                type="number"
                value={additionalContribution}
                onChange={(e) => setAdditionalContribution(e.target.value)}
                placeholder="Enter additional contribution amount"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div>
              <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
              <Select value={contributionFrequency} onValueChange={setContributionFrequency}>
                <SelectTrigger id="contributionFrequency">
                  <SelectValue placeholder="Select contribution frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="52">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateCompoundInterest} className="w-full">Calculate Compound Interest</Button>

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


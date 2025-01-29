import Link from 'next/link'
import { ArrowRight, Hash, Replace, Type, FileText, AlignLeft, Baseline } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { StyledContent } from './styled-content'

interface FeaturesSectionProps {
  basicCalculatorTitle?: string;
  basicCalculatorList?: string;
  basicCalculatorCTA?: string;
  scientificCalculatorTitle?: string;
  scientificCalculatorList?: string;
  scientificCalculatorCTA?: string;
  dateCalculatorTitle?: string;
  dateCalculatorList?: string;
  dateCalculatorCTA?: string;
}

export function FeaturesSection({ 
  basicCalculatorTitle = "How to Use Basic Calculator",
  basicCalculatorList = "<ul><li>Paste or type your text into the editor</li><li>Get instant word and character counts</li><li>Track sentences and paragraphs</li><li>Copy results with one click</li><li>Works with multiple languages</li></ul>",
  basicCalculatorCTA = "Try Basic Calculator",
  scientificCalculatorTitle = "How to Use Text Replace",
  scientificCalculatorList = "<ul><li>Enter your text and search terms</li><li>Replace single or multiple occurrences</li><li>Use case-sensitive matching</li><li>Support for whole word matching</li><li>Preview changes before applying</li></ul>",
  scientificCalculatorCTA = "Try Text Replace",
  dateCalculatorTitle = "How to Use Date Calculator",
  dateCalculatorList = "<ul><li>Enter start and end dates using the calendar</li><li>Calculate the difference between two dates</li><li>Add or subtract days from a date</li><li>Work with different date formats</li><li>Include or exclude weekends in calculations</li></ul>",
  dateCalculatorCTA = "Try Date Calculator"
}: FeaturesSectionProps) {
  return (
    <div className="bg-muted py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Word Counter */}
          <Card className="p-6 bg-card text-card-foreground">
            <h2 className="text-xl font-bold mb-4">{basicCalculatorTitle}</h2>
            <StyledContent content={basicCalculatorList} />
            <Link
              href="/word-counter"
              className="mt-4 inline-flex items-center text-primary hover:underline font-medium"
            >
              {basicCalculatorCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* Text Analysis Mockup */}
            <div className="mt-8 bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Sample Text Analysis</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">247</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Words</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,428</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Characters</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">12</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Sentences</div>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">4</div>
                  <div className="text-xs text-pink-600 dark:text-pink-400">Paragraphs</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Text Replace */}
          <Card className="p-6 bg-card text-card-foreground">
            <h2 className="text-xl font-bold mb-4">{scientificCalculatorTitle}</h2>
            <StyledContent content={scientificCalculatorList} />
            <Link
              href="/text-replace"
              className="mt-4 inline-flex items-center text-primary hover:underline font-medium"
            >
              {scientificCalculatorCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* Text Replace Mockup */}
            <div className="mt-8 bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">Find and Replace</span>
                </div>
                <div className="grid gap-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Find</div>
                    <div className="font-mono">color</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                    <div className="text-xs text-green-600 dark:text-green-400 mb-1">Replace with</div>
                    <div className="font-mono">colour</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded text-xs">Case sensitive</div>
                    <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded text-xs">Whole word</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Date Calculator */}
          <Card className="p-6 bg-card text-card-foreground">
            <h2 className="text-xl font-bold mb-4">{dateCalculatorTitle}</h2>
            <StyledContent content={dateCalculatorList} />
            <Link
              href="/date-calculator"
              className="mt-4 inline-flex items-center text-primary hover:underline font-medium"
            >
              {dateCalculatorCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* Calculator Mockup */}
            <div className="mt-8 bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Date Difference</span>
                </div>
                <Baseline className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/20 text-center">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Start Date</div>
                    <div className="font-mono">2024-01-01</div>
                  </div>
                  <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/20 text-center">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">End Date</div>
                    <div className="font-mono">2024-12-31</div>
                  </div>
                </div>
                <div className="p-3 rounded bg-emerald-100 dark:bg-emerald-900/40 text-center">
                  <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                    366 days
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}


import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { PageHeader } from "@/app/components/page-header"
import { ScientificCalculatorClient } from './scientific-calculator-client'
import { Metadata } from 'next'
import { metadata as metadataLib } from '@/lib/metadata'

export const metadata: Metadata = metadataLib['scientific-calculator']

export default async function ScientificCalculator() {
  const content = await getCachedContent(redis)
  const calculatorContent = content['scientific-calculator'] || {}

  return (
    <>
      <PageHeader
        title={calculatorContent.title || "Scientific Calculator"}
        description={calculatorContent.description || "Advanced mathematical calculations and functions"}
        category="Math"
        type="Advanced"
      />
      <div className="container mx-auto px-4 py-8 max-w-[690px]">
        <ScientificCalculatorClient content={calculatorContent} />
      </div>
    </>
  )
}


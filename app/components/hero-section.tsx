import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { StyledContent } from './styled-content'
import Link from 'next/link';

interface HeroSectionProps {
  heading?: string;
  subtitle?: string;
  buttonText?: string;
  subText?: string;
}

export function HeroSection({
  heading = "We help with your text needs",
  subtitle = "Easy, pleasant and productive text tools",
  buttonText = "Try Typing Test",
  subText = "or choose one of our 50+ calculator tools"
}: HeroSectionProps) {
  return (
    <div className="bg-gray-50 py-24 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center">

      <StyledContent content={heading} variant="hero" />
      <StyledContent content={subtitle} variant="subtitle" />

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link href="/typing-speed-test">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">{subText}</p>
      </div>
    </div>
  )
}


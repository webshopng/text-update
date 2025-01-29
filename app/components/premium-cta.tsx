import { Button } from "@/components/ui/button"
import Link from "next/link";

interface PremiumCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function PremiumCTA({ 
  title = "Try Our Premium Tools",
  description = "Get unlimited access to all our advanced calculator tools with premium features, ad-free experience, and priority support.",
  buttonText = "Start Free Trial"
}: PremiumCTAProps) {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-[1400px] text-center">
        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg mb-8">
          {description}
        </p>
        <Link href="/about">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  )
}


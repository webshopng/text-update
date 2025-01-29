import { getMetadata } from '@/lib/metadata'
import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import { StyledContent } from './components/styled-content'
import { HeroSection } from './components/hero-section'
import { ReviewsSection } from './components/reviews-section'
import { FeaturesSection } from './components/features-section'
import { PremiumCTA } from './components/premium-cta'
import { HomeClient } from './components/home-client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata('home')
  return metadata
}

export default async function HomePage() {
  const content = await getCachedContent(redis)
  const homeContent = content['home'] || {}

  return (
    <div>
      <HeroSection
        heading={homeContent.heroHeading}
        subtitle={homeContent.heroSubtitle}
        buttonText={homeContent.heroButtonText}
        subText={homeContent.heroSubText}
      />

      <HomeClient />

      <FeaturesSection
        basicCalculatorTitle={homeContent.basicCalculatorTitle}
        basicCalculatorList={homeContent.basicCalculatorList}
        basicCalculatorCTA={homeContent.basicCalculatorCTA}
        scientificCalculatorTitle={homeContent.scientificCalculatorTitle}
        scientificCalculatorList={homeContent.scientificCalculatorList}
        scientificCalculatorCTA={homeContent.scientificCalculatorCTA}
        dateCalculatorTitle={homeContent.dateCalculatorTitle}
        dateCalculatorList={homeContent.dateCalculatorList}
        dateCalculatorCTA={homeContent.dateCalculatorCTA}
      />

      <ReviewsSection
        sectionTitle={homeContent.reviewsSectionTitle}
        peopleTrustTitle={homeContent.peopleTrustTitle}
        peopleTrustDescription={homeContent.peopleTrustDescription}
        businessTrustTitle={homeContent.businessTrustTitle}
        businessTrustDescription={homeContent.businessTrustDescription}
        partnersTrustTitle={homeContent.partnersTrustTitle}
        partnersTrustDescription={homeContent.partnersTrustDescription}
        supportTitle={homeContent.supportTitle}
        supportDescription={homeContent.supportDescription}
        encryptionTitle={homeContent.encryptionTitle}
        encryptionDescription={homeContent.encryptionDescription}
        standardsTitle={homeContent.standardsTitle}
        standardsDescription={homeContent.standardsDescription}
      />

      <PremiumCTA
        title={homeContent.premiumTitle}
        description={homeContent.premiumDescription}
        buttonText={homeContent.premiumButtonText}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="prose dark:prose-invert max-w-none">
          <StyledContent content={homeContent.content || ''} />
        </div>
        <footer className="mt-8 text-sm text-muted-foreground">
          <StyledContent content={homeContent.footer || ''} />
        </footer>
      </div>
    </div>
  )
}


import { Users, Star, Chrome, ClockIcon as Clock24, ShieldCheck, Award } from 'lucide-react'

interface ReviewsSectionProps {
  sectionTitle?: string;
  peopleTrustTitle?: string;
  peopleTrustDescription?: string;
  businessTrustTitle?: string;
  businessTrustDescription?: string;
  partnersTrustTitle?: string;
  partnersTrustDescription?: string;
  supportTitle?: string;
  supportDescription?: string;
  encryptionTitle?: string;
  encryptionDescription?: string;
  standardsTitle?: string;
  standardsDescription?: string;
}

export function ReviewsSection({
  sectionTitle = "Why Choose Calculator Tools?",
  peopleTrustTitle = "People Trust Us",
  peopleTrustDescription = "Over a million users rely on our tools for their daily calculations and conversions.",
  businessTrustTitle = "Businesses Trust Us",
  businessTrustDescription = "One of the highest-rated calculator tools across major platforms.",
  partnersTrustTitle = "Our Partners Trust Us",
  partnersTrustDescription = "Integrated with major browsers and platforms for seamless calculations.",
  supportTitle = "24/7 Customer Support",
  supportDescription = "Get all the help you need with our round-the-clock customer support.",
  encryptionTitle = "256-Bit TLS Encryption",
  encryptionDescription = "We use 256-bit TLS encryption for secure information transfer.",
  standardsTitle = "Security Standards",
  standardsDescription = "ISO/IEC 27001 certified and compliant with GDPR, CCPA, and other standards."
}: ReviewsSectionProps) {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-[1400px]">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">{sectionTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* People Trust Us */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-rose-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{peopleTrustTitle}</h3>
            <p className="text-muted-foreground">
              {peopleTrustDescription}
            </p>
          </div>

          {/* Businesses Trust Us */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center">
                <Star className="w-8 h-8 text-amber-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{businessTrustTitle}</h3>
            <p className="text-muted-foreground">
              {businessTrustDescription}
            </p>
          </div>

          {/* Partners Trust Us */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                <Chrome className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{partnersTrustTitle}</h3>
            <p className="text-muted-foreground">
              {partnersTrustDescription}
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
                <Clock24 className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{supportTitle}</h3>
            <p className="text-muted-foreground">
              {supportDescription}
            </p>
          </div>

          {/* Encryption */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{encryptionTitle}</h3>
            <p className="text-muted-foreground">
              {encryptionDescription}
            </p>
          </div>

          {/* Standards */}
          <div className="max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-violet-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{standardsTitle}</h3>
            <p className="text-muted-foreground">
              {standardsDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


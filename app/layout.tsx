import { Inter } from 'next/font/google'
import { Navigation } from "./components/navigation"
import { Footer } from "./components/footer"
import { ScriptContent } from "./components/script-content"
import { Advertisement } from "./components/advertisement"
import "./globals.css"
import { initializeAdmin } from "@/lib/redis"
import { redis } from '@/lib/redis'
import { getCachedContent } from '@/lib/cache'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

initializeAdmin()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await getCachedContent(redis)
  const headerContent = content['header'] || {}
  const footerContent = content['footer'] || {}
  const scriptsContent = content['scripts'] || {}
  const advertisementsContent = content['advertisements'] || {}
  const layoutContent = content['layout'] || {}


  const headerProps = {
    logoUrl: headerContent.logoUrl,
    logoText: headerContent.logoText,
    menuLinks: headerContent.menuLinks,
  }

  const footerProps = {
    solutionsTitle: footerContent.solutionsTitle,
    solutionsLinks: footerContent.solutionsLinks,
    companyTitle: footerContent.companyTitle,
    companyLinks: footerContent.companyLinks,
    productTitle: footerContent.productTitle,
    productLinks: footerContent.productLinks,
    appsTitle: footerContent.appsTitle,
    appsLinks: footerContent.appsLinks,
    copyrightText: footerContent.copyrightText,
    logoText: footerContent.logoText,
    tagline: footerContent.tagline,
    logoUrl: footerContent.logoUrl,
  }

  return (
    <html lang="en" className="dark:bg-zinc-950" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="3Jhps8u12rqa5Kvyk7UGP0m93nQv_gdhWnKjYR03cC0" />
        <link rel="sitemap" type="application/xml" href="/api/sitemap" />
        <link rel="icon" href="https://s3.hostman.com/ef864d38-bulkwriter/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="https://s3.hostman.com/ef864d38-bulkwriter/favicon-16x16.png" sizes="16x16" />
        {scriptsContent.metaTags && (
          <meta name="custom-meta-tags" content={scriptsContent.metaTags} />
        )}
        {scriptsContent.headScripts && (
          <Script id="head-scripts" strategy="lazyOnload">
            {scriptsContent.headScripts}
          </Script>
        )}
      </head>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-zinc-950`}>
          <div className="flex flex-col min-h-screen">
            <Navigation content={headerProps} />
            {advertisementsContent.afterHeader && (
              <Advertisement content={advertisementsContent.afterHeader} position="afterHeader" />
            )}
            <main className="flex-grow">
              {children}
            </main>
            {advertisementsContent.beforeFooter && (
              <Advertisement content={advertisementsContent.beforeFooter} position="beforeFooter" />
            )}
            <Footer content={footerProps} />
          </div>

        {scriptsContent.bodyScripts && (
          <ScriptContent content={scriptsContent.bodyScripts} position="body" />
        )}
      </body>
    </html>
  )
}


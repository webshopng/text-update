import Head from 'next/head'

interface FaviconProps {
  url?: string
}

export function Favicon({ url }: FaviconProps) {
  const faviconUrl = url || '/favicon.ico'

  return (
    <Head>
      <link rel="icon" href={faviconUrl} sizes="any" />
      <link rel="apple-touch-icon" href={faviconUrl} />
    </Head>
  )
}


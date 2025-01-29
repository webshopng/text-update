import { NextRequest, NextResponse } from 'next/server'
import { getCachedContent } from '@/lib/cache'
import { redis } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const { currentUrl } = await request.json()
    
    // Get all content from cache
    const content = await getCachedContent(redis)
    
    // Function to get lastmod date for a page
    const getLastModified = async (page: string) => {
      const pageData = content[page.replace('/', '')]
      return pageData?.updatedAt || new Date().toISOString()
    }
    
    // Function to determine priority based on page depth
    const getPriority = (url: string) => {
      const depth = (url.match(/\//g) || []).length - 1
      return Math.max(0.1, 1 - (depth * 0.2)).toFixed(1) // Deeper pages get lower priority
    }
    
    // Get all valid pages from content
    const allPages = Object.keys(content)
      .filter(key => key !== 'scripts' && key !== 'advertisements')
      .map(page => `/${page}`)
    
    // Add root URL
    allPages.unshift('/')
    
    // Generate sitemap entries
    const sitemapEntries = await Promise.all(
      allPages.map(async (page) => {
        const lastmod = await getLastModified(page)
        const priority = getPriority(page)
        
        return `
<url>
  <loc>${currentUrl}${page}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${page === '/' ? 'daily' : 'weekly'}</changefreq>
  <priority>${priority}</priority>
</url>`
      })
    )
    
    // Construct the complete sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('')}
</urlset>`
    
    // Save the sitemap to Redis
    await redis.set('sitemap', sitemap)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap generated and saved successfully',
      sitemap // Optionally return the sitemap in the response
    })
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to generate sitemap' 
    }, { status: 500 })
  }
}


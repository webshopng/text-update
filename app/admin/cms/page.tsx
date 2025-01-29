'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ChevronDown, ChevronRight } from 'lucide-react'
import { SimpleEditor } from '@/app/components/simple-editor'
import { useRouter } from 'next/navigation'

// Tool pages configuration
const toolPages = {
  "TEXT": [
    { id: "word-counter", name: "Word Counter" },
    { id: "text-replace", name: "Text Replace" },
    { id: "text-split", name: "Text Split" },
    { id: "join-text", name: "Join Text" },
    { id: "repeat-text", name: "Repeat Text" },
    { id: "upside-down-text", name: "Upside Down Text" },
    { id: "reverse-text", name: "Reverse Text" },
    { id: "backwards-text", name: "Backwards Text" },
    { id: "truncate-text", name: "Truncate Text" },
    { id: "comma-separated-values", name: "Comma Separated Values" },
    { id: "wingdings-translator", name: "Wingdings Translator" },
    { id: "cursed-text-generator", name: "Cursed Text Generator" },
    { id: "weird-text-generator", name: "Weird Text Generator" },
    { id: "superscript-generator", name: "Superscript Generator" },
    { id: "crazy-font-generator", name: "Crazy Font Generator" },
    { id: "typing-speed-test", name: "Typing Speed Test" },
    { id: "remove-words-from-text", name: "Remove Words from Text" },
    { id: "reverse-list-online", name: "Reverse List Online" },
    { id: "mirrored-text-generator", name: "Mirrored Text Generator" },
    { id: "openai-tokens-to-words", name: "Open AI Tokens to Words" },
    { id: "anthropic-ai-tokens-to-words", name: "Anthropic AI Tokens to Words" },
    { id: "gemini-ai-tokens-to-words", name: "Gemini AI Tokens to Words" },
    { id: "mistral-ai-tokens-to-words", name: "Mistral AI Tokens to Words" },
    { id: "indentation-rich-text-editor", name: "Indentation Rich Text Editor" },
    { id: "indent-text-online", name: "Indent Text Online" },
    { id: "unindent-text-online", name: "Unindent Text Online" },
    { id: "scrabble-board-maker", name: "Scrabble Board Maker" },
    { id: "scrabble-word-maker", name: "Scrabble Word Maker" },
    { id: "add-text-to-each-line", name: "Add Text to Each Line" },
    { id: "text-to-morse-code", name: "Text to Morse Code" },
    { id: "online-txt-shuffle", name: "Online TXT Shuffle" },
    { id: "text-rotator-online-tool", name: "Text Rotator Online Tool" },
    { id: "text-to-hexl", name: "Text to Hexl" },
    { id: "hex-to-text", name: "Hex to Text" },
    { id: "lorem-ipsum-generator", name: "Lorem Ipsum Generator" },
    { id: "fancy-text-generator", name: "Fancy Text Generator" },
    { id: "remove-line-breaks", name: "Remove Line Breaks" },
    { id: "remove-white-space", name: "Remove White Space" },
    { id: "online-sentence-counter", name: "Online Sentence Counter" },
    { id: "text-to-html-generator", name: "Text to HTML Generator" },
    { id: "sand-table-design-maker", name: "Sand Table Design Maker" },
    { id: "random-choice-generator", name: "Random Choice Generator" },
    { id: "random-group-generator", name: "Random Group Generator" },
    { id: "vaporwave-text-generator", name: "Vaporwave Text Generator" },
    { id: "text-format-removal", name: "Text Format Removal" },
    { id: "capitalize-each-word", name: "Capitalize Each Word" },
    { id: "remove-numbers-from-text", name: "Remove Numbers From Text" },
    { id: "skin-color-code-hex-generator", name: "Skin Color Code Hex Generator" },
    { id: "txt-to-pdf-converter", name: "TXT to PDF Converter" },
    { id: "remove-symbols-from-text", name: "Remove Symbols From Text" },
    { id: "html-table-generator", name: "HTML Table Generator" },
    { id: "camel-case-text-generator", name: "Camel Case Text Generator" },
    { id: "text-case-converter", name: "Text Case Converter" },
  ],
  "SEO": [
    { id: "sitemap", name: "Sitemap Generator" },
  ]
}

export default function AdminCMS() {
  const [page, setPage] = useState('home')
  const [section, setSection] = useState('heroHeading')
  const [contentMap, setContentMap] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)
      try {
        const sections = getAvailableSections(page)
        const newContentMap: Record<string, string> = {}
        for (const { value } of sections) {
          const response = await fetch(`/api/getContent?page=${page}&section=${value}`)
          const data = await response.json()
          newContentMap[`${page}:${value}`] = data.content || ''
        }
        setContentMap(prev => ({ ...prev, ...newContentMap }))
      } catch (error) {
        console.error('Failed to fetch content:', error)
        setMessage('Failed to load content')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [page])

  const sanitizeContent = (content: string) => {
    // Add your sanitization logic here if needed
    return content;
  }

  const handleSubmit = async (pageId: string, sectionId: string, content: string) => {
    setIsLoading(true)
    try {
      if ((pageId === 'footer' || pageId === 'header') && sectionId === 'logoUrl' && !validateImageUrl(content)) {
        setMessage('Invalid image URL. Please use a valid URL ending with .jpg, .jpeg, .png, or .svg')
        return
      }

      // Allow HTML content for scripts and meta tags
      const sanitizedContent = pageId === 'scripts' ? content : sanitizeContent(content)

      const response = await fetch('/api/updateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageId, section: sectionId, content: sanitizedContent }),
      })
      const data = await response.json()

      if (response.ok) {
        setContentMap(prev => ({
          ...prev,
          [`${pageId}:${sectionId}`]: sanitizedContent
        }))
        setMessage('Content updated successfully')
      } else {
        setMessage(data.error || 'Failed to update content')
      }
    } catch (error) {
      setMessage('Failed to update content')
    } finally {
      setIsLoading(false)
    }
  }

  const getAvailableSections = (selectedPage: string) => {
    // For tool pages, return the standard sections
    if (Object.values(toolPages).flat().some(tool => tool.id === selectedPage)) {
      return [
        { value: 'title', label: 'Page Title', type: 'text' },
        { value: 'description', label: 'Page Description', type: 'text' },
        { value: 'content', label: 'Main Content', type: 'editor' },
      ]
    }

    // For other pages, return their specific sections
    switch (selectedPage) {
      case 'header':
        return [
          { value: 'logoUrl', label: 'Logo Image URL', type: 'text' },
          { value: 'logoText', label: 'Logo Text', type: 'text' },
          { value: 'menuLinks', label: 'Menu Links', type: 'editor' },
        ]
      case 'footer':
        return [
          { value: 'logoUrl', label: 'Logo Image URL', type: 'text' },
          { value: 'logoText', label: 'Logo Text', type: 'text' },
          { value: 'tagline', label: 'Tagline', type: 'text' },
          { value: 'solutionsTitle', label: 'Solutions Title', type: 'text' },
          { value: 'solutionsLinks', label: 'Solutions Links', type: 'editor' },
          { value: 'companyTitle', label: 'Company Title', type: 'text' },
          { value: 'companyLinks', label: 'Company Links', type: 'editor' },
          { value: 'productTitle', label: 'Product Title', type: 'text' },
          { value: 'productLinks', label: 'Product Links', type: 'editor' },
          { value: 'appsTitle', label: 'Apps Title', type: 'text' },
          { value: 'appsLinks', label: 'Apps Links', type: 'editor' },
          { value: 'copyrightText', label: 'Copyright Text', type: 'text' },
        ]
      case 'home':
        return [
          { value: 'heroHeading', label: 'Hero Heading', type: 'text' },
          { value: 'heroSubtitle', label: 'Hero Subtitle', type: 'text' },
          { value: 'heroButtonText', label: 'Hero Button Text', type: 'text' },
          { value: 'heroSubText', label: 'Hero Sub Text', type: 'text' },
          { value: 'basicCalculatorTitle', label: 'Basic Calculator Title', type: 'text' },
          { value: 'basicCalculatorList', label: 'Basic Calculator List', type: 'editor' },
          { value: 'basicCalculatorCTA', label: 'Basic Calculator CTA', type: 'text' },
          { value: 'scientificCalculatorTitle', label: 'Scientific Calculator Title', type: 'text' },
          { value: 'scientificCalculatorList', label: 'Scientific Calculator List', type: 'editor' },
          { value: 'scientificCalculatorCTA', label: 'Scientific Calculator CTA', type: 'text' },
          { value: 'dateCalculatorTitle', label: 'Date Calculator Title', type: 'text' },
          { value: 'dateCalculatorList', label: 'Date Calculator List', type: 'editor' },
          { value: 'dateCalculatorCTA', label: 'Date Calculator CTA', type: 'text' },
          { value: 'reviewsSectionTitle', label: 'Reviews Section Title', type: 'text' },
          { value: 'peopleTrustTitle', label: 'People Trust Title', type: 'text' },
          { value: 'peopleTrustDescription', label: 'People Trust Description', type: 'text' },
          { value: 'businessTrustTitle', label: 'Business Trust Title', type: 'text' },
          { value: 'businessTrustDescription', label: 'Business Trust Description', type: 'text' },
          { value: 'partnersTrustTitle', label: 'Partners Trust Title', type: 'text' },
          { value: 'partnersTrustDescription', label: 'Partners Trust Description', type: 'text' },
          { value: 'supportTitle', label: 'Support Title', type: 'text' },
          { value: 'supportDescription', label: 'Support Description', type: 'text' },
          { value: 'encryptionTitle', label: 'Encryption Title', type: 'text' },
          { value: 'encryptionDescription', label: 'Encryption Description', type: 'text' },
          { value: 'standardsTitle', label: 'Standards Title', type: 'text' },
          { value: 'standardsDescription', label: 'Standards Description', type: 'text' },
          { value: 'premiumTitle', label: 'Premium Section Title', type: 'text' },
          { value: 'premiumDescription', label: 'Premium Section Description', type: 'text' },
          { value: 'premiumButtonText', label: 'Premium Section Button Text', type: 'text' },
        ]
      case 'about':
      case 'contact':
      case 'terms':
      case 'privacy':
        return [
          { value: 'title', label: 'Page Title', type: 'text' },
          { value: 'description', label: 'Page Description', type: 'text' },
          { value: 'content', label: 'Main Content', type: 'editor' },
        ]
      case 'scripts':
        return [
          { value: 'headScripts', label: 'Head Scripts', type: 'textarea' },
          { value: 'bodyScripts', label: 'Body Scripts', type: 'textarea' },
          { value: 'metaTags', label: 'Meta Tags', type: 'textarea' },
        ]
      case 'advertisements':
        return [
          { value: 'afterHeader', label: 'After Header Ad', type: 'textarea' },
          { value: 'beforeFooter', label: 'Before Footer Ad', type: 'textarea' },
        ]
      case 'layout':
        return [
          { value: 'faviconUrl', label: 'Favicon URL', type: 'text' },
        ]
      default:
        return []
    }
  }

  const validateImageUrl = (url: string): boolean => {
    if (!url) return true // Empty URL is valid (will use default icon)

    // Check if URL is valid
    try {
      new URL(url)
    } catch {
      return false
    }

    // Check file extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.svg']
    return validExtensions.some(ext => url.toLowerCase().endsWith(ext))
  }

  const currentSection = getAvailableSections(page).find(s => s.value === section)

  // Update section when page changes to select the first available section
  useEffect(() => {
    const sections = getAvailableSections(page)
    if (sections.length > 0) {
      setSection(sections[0].value)
    }
  }, [page])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? [] : [category]
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId) ? [] : [sectionId]
    )
  }

  const router = useRouter()

  const handleGenerateSitemap = async () => {
    setIsLoading(true)
    try {
      const currentUrl = window.location.origin
      const response = await fetch('/api/admin/generate-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentUrl }),
      })
      const data = await response.json()
      if (data.success) {
        setMessage(`Sitemap generated successfully. URL: ${currentUrl}/sitemap.xml`)
      } else {
        setMessage('Failed to generate sitemap')
      }
    } catch (error) {
      console.error('Error generating sitemap:', error)
      setMessage('Failed to generate sitemap')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <h1 className="text-3xl font-bold mb-6">Admin CMS</h1>
      <div className="grid grid-cols-[300px,1fr] gap-6">
        {/* Left Column - Page Selection */}
        <div className="space-y-2">
          <div className="font-medium mb-4">Pages</div>
          <div className="space-y-1">
            {/* Main Pages - Updated order with privacy */}
            {['home', 'about', 'contact', 'terms', 'privacy', 'header', 'footer', 'scripts', 'advertisements', 'layout'].map((pageName) => (
              <button
                key={pageName}
                type="button"
                onClick={() => setPage(pageName)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  page === pageName
                    ? 'bg-zinc-100 dark:bg-zinc-800 font-medium'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
              </button>
            ))}

            {/* Tool Categories */}
            <div className="pt-4">
              <div className="font-medium mb-2 px-4">Tools</div>
              {Object.entries(toolPages).map(([category, tools]) => (
                <div key={category} className="mb-1">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between"
                  >
                    <span>{category}</span>
                    {expandedCategories.includes(category) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedCategories.includes(category) && (
                    <div className="ml-4">
                      {tools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => setPage(tool.id)}
                          className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                            page === tool.id
                              ? 'bg-zinc-100 dark:bg-zinc-800 font-medium'
                              : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'
                          }`}
                        >
                          {tool.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sitemap Generation */}
            <div className="mt-4">
              <div className="font-medium mb-2 px-4">SEO</div>
              <button
                onClick={handleGenerateSitemap}
                className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg flex items-center justify-between"
              >
                Generate Sitemap
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Section and Content */}
        <div className="space-y-6">
          {/* For tool pages and other pages, show collapsible sections */}
          <div className="space-y-4">
            {getAvailableSections(page).map(({ value, label, type }) => (
              <div key={value} className="border rounded-lg">
                <button
                  onClick={() => toggleSection(value)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
                >
                  <span className="font-medium">{label}</span>
                  {expandedSections.includes(value) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.includes(value) && (
                  <div className="p-4 border-t">
                    <div className="relative">
                      {type === 'textarea' ? (
                        <div className="space-y-2">
                          <Textarea
                            value={contentMap[`${page}:${value}`] || ''}
                            onChange={(e) => setContentMap(prev => ({
                              ...prev,
                              [`${page}:${value}`]: e.target.value
                            }))}
                            className="min-h-[200px] font-mono text-sm"
                            placeholder={`Enter ${label.toLowerCase()}...`}
                          />
                          <Button onClick={() => handleSubmit(page, value, contentMap[`${page}:${value}`] || '')}>
                            Save
                          </Button>
                        </div>
                      ) : type === 'editor' ? (
                        <SimpleEditor
                          initialContent={contentMap[`${page}:${value}`] || ''}
                          onSave={(newContent) => handleSubmit(page, value, newContent)}
                        />
                      ) : (
                        <div className="space-y-2">
                          <Input
                            value={contentMap[`${page}:${value}`] || ''}
                            onChange={(e) => setContentMap(prev => ({
                              ...prev,
                              [`${page}:${value}`]: e.target.value
                            }))}
                            className="w-full"
                          />
                          <Button onClick={() => handleSubmit(page, value, contentMap[`${page}:${value}`] || '')}>
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="fixed inset-0 bg-background/50 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}


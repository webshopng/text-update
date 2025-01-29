import Link from "next/link"
import Image from "next/image"
import { Calculator, Clock, Calendar, Type, Replace, ArrowUpDown, Hash, Sigma, Weight, Ruler, Activity, Scale, BracketsIcon as Bra, Fuel, SplitSquareVertical, Merge, Repeat, FlipVertical, ArrowLeftRight, RotateCcw, Scissors, FileSpreadsheet, FileSymlink, Skull, ArrowUp, TextQuote, Eraser, FlipHorizontal, RefreshCw, Indent, Outdent, Grid, Shuffle, RotateCw, FileCode, FileText, ArrowDown, Dice2, Users, Delete, Table } from 'lucide-react'

interface FooterContent {
  solutionsTitle?: string;
  solutionsLinks?: string;
  companyTitle?: string;
  companyLinks?: string;
  productTitle?: string;
  productLinks?: string;
  appsTitle?: string;
  appsLinks?: string;
  copyrightText?: string;
  logoText?: string;
  tagline?: string;
  logoUrl?: string;
}

const toolCategories = [
  {
    title: "Text Manipulation",
    tools: [
      { name: "Reverse Text", href: "/reverse-text", icon: <ArrowLeftRight className="w-5 h-5 text-orange-500" /> },
      { name: "Backwards Text", href: "/backwards-text", icon: <RotateCcw className="w-5 h-5 text-red-500" /> },
      { name: "Upside Down Text", href: "/upside-down-text", icon: <FlipVertical className="w-5 h-5 text-purple-500" /> },
      { name: "Mirrored Text Generator", href: "/mirrored-text-generator", icon: <FlipHorizontal className="w-5 h-5 text-blue-500" /> },
      { name: "Vaporwave Text Generator", href: "/vaporwave-text-generator", icon: <Type className="w-5 h-5 text-pink-500" /> },
      { name: "Camel Case Text Generator", href: "/camel-case-text-generator", icon: <Type className="w-5 h-5 text-pink-500" /> }
    ]
  },
  {
    title: "Text Formatting & Styling",
    tools: [
      { name: "Superscript Generator", href: "/superscript-generator", icon: <ArrowUp className="w-5 h-5 text-blue-500" /> },
      { name: "Crazy Font Generator", href: "/crazy-font-generator", icon: <TextQuote className="w-5 h-5 text-purple-500" /> },
      { name: "Fancy Text Generator", href: "/fancy-text-generator", icon: <Type className="w-5 h-5 text-purple-500" /> },
      { name: "Cursed Text Generator", href: "/cursed-text-generator", icon: <Skull className="w-5 h-5 text-purple-500" /> },
      { name: "Weird Text Generator", href: "/weird-text-generator", icon: <Type className="w-5 h-5 text-indigo-500" /> },
      { name: "Text Case Converter", href: "/text-case-converter", icon: <Type className="w-5 h-5 text-green-500" /> }
    ]
  },
  {
    title: "Text Conversion & Analysis",
    tools: [
      { name: "Word Counter", href: "/word-counter", icon: <Hash className="w-5 h-5 text-pink-500" /> },
      { name: "Online Sentence Counter", href: "/online-sentence-counter", icon: <FileText className="w-5 h-5 text-blue-500" /> },
      { name: "Open AI Tokens to Words", href: "/openai-tokens-to-words", icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
      { name: "Anthropic AI Tokens to Words", href: "/anthropic-ai-tokens-to-words", icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
      { name: "Gemini AI Tokens to Words", href: "/gemini-ai-tokens-to-words", icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
      { name: "Mistral AI Tokens to Words", href: "/mistral-ai-tokens-to-words", icon: <RefreshCw className="w-5 h-5 text-blue-500" /> },
      { name: "Text to Hexl", href: "/text-to-hexl", icon: <FileCode className="w-5 h-5 text-blue-500" /> },
      { name: "Hex to Text", href: "/hex-to-text", icon: <FileCode className="w-5 h-5 text-blue-500" /> },
      { name: "Text to Morse Code", href: "/text-to-morse-code", icon: <Type className="w-5 h-5 text-blue-500" /> },
      { name: "Wingdings Translator", href: "/wingdings-translator", icon: <FileSymlink className="w-5 h-5 text-emerald-500" /> },
      { name: "Comma Separated Values", href: "/comma-separated-values", icon: <FileSpreadsheet className="w-5 h-5 text-cyan-500" /> },
      { name: "Text to HTML Generator", href: "/text-to-html-generator", icon: <FileCode className="w-5 h-5 text-blue-500" /> },
      { name: "TXT to PDF Converter", href: "/txt-to-pdf-converter", icon: <FileText className="w-5 h-5 text-blue-500" /> }
    ]
  },
  {
    title: "Text Editing & Utilities",
    tools: [
      { name: "Text Split", href: "/text-split", icon: <SplitSquareVertical className="w-5 h-5 text-indigo-500" /> },
      { name: "Join Text", href: "/join-text", icon: <Merge className="w-5 h-5 text-blue-500" /> },
      { name: "Repeat Text", href: "/repeat-text", icon: <Repeat className="w-5 h-5 text-green-500" /> },
      { name: "Truncate Text", href: "/truncate-text", icon: <Scissors className="w-5 h-5 text-yellow-500" /> },
      { name: "Remove Words from Text", href: "/remove-words-from-text", icon: <Eraser className="w-5 h-5 text-red-500" /> },
      { name: "Reverse List Online", href: "/reverse-list-online", icon: <ArrowUpDown className="w-5 h-5 text-cyan-500" /> },
      { name: "Indent Text Online", href: "/indent-text-online", icon: <Indent className="w-5 h-5 text-blue-500" /> },
      { name: "Unindent Text Online", href: "/unindent-text-online", icon: <Outdent className="w-5 h-5 text-blue-500" /> },
      { name: "Add Text to Each Line", href: "/add-text-to-each-line", icon: <Type className="w-5 h-5 text-blue-500" /> },
      { name: "Online TXT Shuffle", href: "/online-txt-shuffle", icon: <Shuffle className="w-5 h-5 text-blue-500" /> },
      { name: "Text Rotator Online Tool", href: "/text-rotator-online-tool", icon: <RotateCw className="w-5 h-5 text-blue-500" /> },
      { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator", icon: <FileText className="w-5 h-5 text-blue-500" /> },
      { name: "Remove Line Breaks", href: "/remove-line-breaks", icon: <ArrowDown className="w-5 h-5 text-blue-500" /> },
      { name: "Remove White Space", href: "/remove-white-space", icon: <Eraser className="w-5 h-5 text-blue-500" /> },
      { name: "Typing Speed Test", href: "/typing-speed-test", icon: <Activity className="w-5 h-5 text-yellow-500" /> },
      { name: "Indentation Rich Text Editor", href: "/indentation-rich-text-editor", icon: <Type className="w-5 h-5 text-blue-500" /> },
      { name: "Scrabble Board Maker", href: "/scrabble-board-maker", icon: <Grid className="w-5 h-5 text-green-500" /> },
      { name: "Scrabble Word Maker", href: "/scrabble-word-maker", icon: <Type className="w-5 h-5 text-green-500" /> },
      { name: "Sand Table Design Maker", href: "/sand-table-design-maker", icon: <Grid className="w-5 h-5 text-yellow-500" /> },
      { name: "Random Choice Generator", href: "/random-choice-generator", icon: <Dice2 className="w-5 h-5 text-orange-500" /> },
      { name: "Random Group Generator", href: "/random-group-generator", icon: <Users className="w-5 h-5 text-orange-500" /> },
      { name: "Text Format Removal", href: "/text-format-removal", icon: <Type className="w-5 h-5 text-zinc-500" /> },
      { name: "Capitalize Each Word", href: "/capitalize-each-word", icon: <Type className="w-5 h-5 text-blue-500" /> },
      { name: "Remove Numbers from Text", href: "/remove-numbers-from-text", icon: <Delete className="w-5 h-5 text-red-500" /> },
      { name: "Remove Symbols From Text", href: "/remove-symbols-from-text", icon: <Delete className="w-5 h-5 text-red-500" /> }
    ]
  },
  {
    title: "Color Tools",
    tools: [
      { name: "Skin Color Code Hex Generator", href: "/skin-color-code-hex-generator", icon: <Type className="w-5 h-5 text-orange-500" /> }
    ]
  },
  {
    title: "HTML Tools",
    tools: [
      { name: "HTML Table Generator", href: "/html-table-generator", icon: <Table className="w-5 h-5 text-blue-500" /> }
    ]
  },
]

// Footer links organized by section
const footerLinks = {
  solutions: [
    { name: "Personal", href: "/personal" },
    { name: "Business", href: "/business" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  product: [
    { name: "Pricing", href: "/pricing" },
    { name: "Premium", href: "/premium" },
    { name: "Features", href: "/features" },
  ],
  apps: [
    { name: "Mobile App", href: "/mobile" },
    { name: "Desktop App", href: "/desktop" },
    { name: "Browser Extension", href: "/extension" },
  ]
}

export function Footer({ content }: { content?: FooterContent }) {
return (
<footer className="border-t bg-white dark:bg-zinc-950">
{/* Tools Grid */}
<div className="container mx-auto px-4 py-12">
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
{toolCategories.map((category) => (
<div key={category.title}>
<h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
{category.title}
</h3>
<ul className="space-y-3">
{category.tools.map((tool) => (
<li key={tool.name}>
<Link
href={tool.href}
className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
>
<span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
{tool.icon}
</span>
{tool.name}
</Link>
</li>
))}
</ul>
</div>
))}
</div>

{/* Bottom Footer */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
{/* Logo and Tagline */}
<div className="col-span-2 md:col-span-1">
<Link href="/" className="flex items-center gap-2">
<div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
 <Type className="size-5 text-white" /> 
</div>
<span className="font-semibold text-xl">{content?.logoText || 'Calculator Tools'}</span>
</Link>
<p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
{content?.tagline || 'We make calculations easy.'}
</p>
</div>

{/* Footer Links */}
<div>
<h3 className="font-semibold mb-3">{content?.solutionsTitle || 'Solutions'}</h3>
<div className="space-y-2" dangerouslySetInnerHTML={{ __html: content?.solutionsLinks || `
<ul>
<li><a href="/personal" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Personal</a></li>
<li><a href="/business" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Business</a></li>
</ul>
`}} />
</div>

<div>
<h3 className="font-semibold mb-3">{content?.companyTitle || 'Company'}</h3>
<div className="space-y-2" dangerouslySetInnerHTML={{ __html: content?.companyLinks || `
<ul>
<li><a href="/about" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">About</a></li>
<li><a href="/contact" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Contact</a></li>
<li><a href="/blog" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Blog</a></li>
</ul>
`}} />
</div>

<div>
<h3 className="font-semibold mb-3">{content?.productTitle || 'Product'}</h3>
<div className="space-y-2" dangerouslySetInnerHTML={{ __html: content?.productLinks || `
<ul>
<li><a href="/pricing" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Pricing</a></li>
<li><a href="/premium" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Premium</a></li>
<li><a href="/features" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Features</a></li>
</ul>
`}} />
</div>

<div>
<h3 className="font-semibold mb-3">{content?.appsTitle || 'Apps'}</h3>
<div className="space-y-2" dangerouslySetInnerHTML={{ __html: content?.appsLinks || `
<ul>
<li><a href="/mobile" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Mobile App</a></li>
<li><a href="/desktop" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Desktop App</a></li>
<li><a href="/extension" class="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Browser Extension</a></li>
</ul>
`}} />
</div>
</div>

{/* Copyright */}
<div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
<p className="text-sm text-zinc-600 dark:text-zinc-400">
{content?.copyrightText || `© ${new Date().getFullYear()} Calculator Tools. All rights reserved.`}
</p>
</div>
</div>
</footer>
)
}

import Link from "next/link"
import { Menu } from 'lucide-react'
import { Skull } from 'lucide-react'
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuList,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ClientLogo } from "./client-logo"
import { ClientNavigation } from "./client-navigation"

interface NavigationContent {
logoUrl?: string;
logoText?: string;
menuLinks?: string;
}

const toolCategories = [
  {
    title: "TEXT",
    tools: [
      { name: "Word Counter", href: "/word-counter", description: "Count words and characters", indicator: "pink" },
      { name: "Text Replace", href: "/text-replace", description: "Find and replace text", indicator: "teal" },
      { name: "Text Split", href: "/text-split", description: "Split text into lines, sentences, or custom delimiters", indicator: "indigo" },
      { name: "Join Text", href: "/join-text", description: "Combine multiple text fragments", indicator: "blue" },
      { name: "Repeat Text", href: "/repeat-text", description: "Repeat text multiple times with custom options", indicator: "green" },
      { name: "Upside Down Text", href: "/upside-down-text", description: "Convert text to upside down characters", indicator: "purple" },
      { name: "Reverse Text", href: "/reverse-text", description: "Reverse your text instantly", indicator: "orange" },
      { name: "Backwards Text", href: "/backwards-text", description: "Generate backwards text in two different ways", indicator: "red" },
      { name: "Truncate Text", href: "/truncate-text", description: "Easily truncate your text to a specific length", indicator: "yellow" },
      { name: "Comma Separated Values", href: "/comma-separated-values", description: "Convert text to CSV and CSV to text", indicator: "cyan" },
      { name: "Wingdings Translator", href: "/wingdings-translator", description: "Translate text to Wingdings and back", indicator: "emerald" },
      { name: "Cursed Text Generator", href: "/cursed-text-generator", description: "Transform your text into spooky, cursed styles", indicator: "purple" },
      { name: "Weird Text Generator", href: "/weird-text-generator", description: "Transform your text into weird and unique styles", indicator: "indigo" },
      { name: "Superscript Generator", href: "/superscript-generator", description: "Convert your text to superscript characters", indicator: "blue" },
      { name: "Crazy Font Generator", href: "/crazy-font-generator", description: "Transform your text into wild and crazy fonts", indicator: "purple" },
      { name: "Typing Speed Test", href: "/typing-speed-test", description: "Test your typing speed and accuracy", indicator: "yellow" },
      { name: "Remove Words from Text", href: "/remove-words-from-text", description: "Easily remove specific words or phrases from your text", indicator: "red" },
      { name: "Reverse List Online", href: "/reverse-list-online", description: "Easily reverse the order of items in your list", indicator: "cyan" },
      { name: "Mirrored Text Generator", href: "/mirrored-text-generator", description: "Create mirrored text easily", indicator: "blue" },
      { name: "Open AI Tokens to Words", href: "/openai-tokens-to-words", description: "Convert OpenAI tokens to words and estimate token count", indicator: "blue" },
      { name: "Anthropic AI Tokens to Words", href: "/anthropic-ai-tokens-to-words", description: "Convert Anthropic AI tokens to words and estimate token count", indicator: "blue" },
      { name: "Gemini AI Tokens to Words", href: "/gemini-ai-tokens-to-words", description: "Convert Gemini AI tokens to words and estimate token count", indicator: "blue" },
      { name: "Mistral AI Tokens to Words", href: "/mistral-ai-tokens-to-words", description: "Convert Mistral AI tokens to words and estimate token count", indicator: "blue" },
      { name: "Indentation Rich Text Editor", href: "/indentation-rich-text-editor", description: "Create and edit indented rich text with ease", indicator: "blue" },
      { name: "Indent Text Online", href: "/indent-text-online", description: "Easily indent and format your text online", indicator: "blue" },
      { name: "Unindent Text Online", href: "/unindent-text-online", description: "Easily remove indentation from your text online", indicator: "blue" },
      { name: "Scrabble Board Maker", href: "/scrabble-board-maker", description: "Create custom Scrabble boards with ease", indicator: "green" },
      { name: "Scrabble Word Maker", href: "/scrabble-word-maker", description: "Generate valid Scrabble words from your letters", indicator: "green" },
      { name: "Add Text to Each Line", href: "/add-text-to-each-line", description: "Add text to the beginning or end of each line", indicator: "blue" },
      { name: "Text to Morse Code", href: "/text-to-morse-code", description: "Convert text to Morse code and vice versa", indicator: "blue" },
      { name: "Online TXT Shuffle", href: "/online-txt-shuffle", description: "Randomly shuffle lines, words, or characters in your text", indicator: "blue" },
      { name: "Text Rotator Online Tool", href: "/text-rotator-online-tool", description: "Rotate your text by a specified number of positions", indicator: "blue" },
      { name: "Text to Hex", href: "/text-to-hexl", description: "Convert text to hexadecimal dump format", indicator: "blue" },
      { name: "Hex to Text", href: "/hex-to-text", description: "Convert hexadecimal values to readable text", indicator: "blue" },
      { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator", description: "Generate custom Lorem Ipsum text", indicator: "blue" },
      { name: "Fancy Text Generator", href: "/fancy-text-generator", description: "Transform your text into stylish and fancy formats", indicator: "purple" },
      { name: "Remove Line Breaks", href: "/remove-line-breaks", description: "Easily remove line breaks from your text", indicator: "blue" },
      { name: "Remove White Space", href: "/remove-white-space", description: "Easily remove unnecessary white space from your text", indicator: "blue" },
      { name: "Online Sentence Counter", href: "/online-sentence-counter", description: "Count sentences and analyze your text", indicator: "blue" },
      { name: "Text to HTML Generator", href: "/text-to-html-generator", description: "Convert plain text to HTML with formatting options", indicator: "blue" },
      { name: "Sand Table Design Maker", href: "/sand-table-design-maker", description: "Create beautiful sand table designs online", indicator: "yellow" },
      { name: "Random Choice Generator", href: "/random-choice-generator", description: "Generate random choices from a list", indicator: "orange" },
      { name: "Random Group Generator", href: "/random-group-generator", description: "Generate random groups from a list", indicator: "orange" },
      { name: "Vaporwave Text Generator", href: "/vaporwave-text-generator", description: "Generate vaporwave style text", indicator: "pink" },
      { name: "Text Format Removal", href: "/text-format-removal", description: "Remove text formatting", indicator: "zinc" },
      { name: "Capitalize Each Word", href: "/capitalize-each-word", description: "Capitalize each word in your text", indicator: "blue" },
      { name: "Remove Numbers from Text", href: "/remove-numbers-from-text", description: "Easily remove numbers from your text", indicator: "red" },
      { name: "TXT to PDF Converter", href: "/txt-to-pdf-converter", description: "Convert text files to PDF", indicator: "blue" },
      { name: "Remove Symbols From Text", href: "/remove-symbols-from-text", description: "Easily remove symbols from your text", indicator: "red" },
      { name: "HTML Table Generator", href: "/html-table-generator", description: "Generate HTML tables with ease", indicator: "blue" },
      { name: "Camel Case Text Generator", href: "/camel-case-text-generator", description: "Convert your text to camel case", indicator: "pink" }
    ]
  },
  {
    title: "TEXT MANIPULATION",
    tools: [
      { name: "Reverse Text", href: "/reverse-text", description: "Reverse your text instantly", indicator: "black" },
      { name: "Backwards Text", href: "/backwards-text", description: "Generate backwards text in two different ways", indicator: "red" },
      { name: "Upside Down Text", href: "/upside-down-text", description: "Convert text to upside down characters", indicator: "purple" },
      { name: "Mirrored Text Generator", href: "/mirrored-text-generator", description: "Create mirrored text easily", indicator: "blue" },
      { name: "Scientific Calculator", href: "/scientific-calculator", description: "Advanced calculations", indicator: "green" }
    ]
  },
  {
    title: "TEXT EDITING & UTILITIES",
    tools: [
      { name: "Text Split", href: "/text-split", description: "Split text into lines, sentences, or custom delimiters", indicator: "indigo" },
      { name: "Join Text", href: "/join-text", description: "Combine multiple text fragments", indicator: "blue" },
      { name: "Repeat Text", href: "/repeat-text", description: "Repeat text multiple times with custom options", indicator: "green" },
      { name: "Truncate Text", href: "/truncate-text", description: "Easily truncate your text to a specific length", indicator: "yellow" },
      { name: "Remove Words from Text", href: "/remove-words-from-text", description: "Easily remove specific words or phrases from your text", indicator: "red" },
      { name: "Reverse List Online", href: "/reverse-list-online", description: "Easily reverse the order of items in your list", indicator: "cyan" },
      { name: "Indent Text Online", href: "/indent-text-online", description: "Easily indent and format your text online", indicator: "blue" },
      { name: "Unindent Text Online", href: "/unindent-text-online", description: "Easily remove indentation from your text online", indicator: "blue" },
      { name: "Add Text to Each Line", href: "/add-text-to-each-line", description: "Add text to the beginning or end of each line", indicator: "blue" },
      { name: "Online TXT Shuffle", href: "/online-txt-shuffle", description: "Randomly shuffle lines, words, or characters in your text", indicator: "blue" },
      { name: "Text Rotator Online Tool", href: "/text-rotator-online-tool", description: "Rotate your text by a specified number of positions", indicator: "blue" },
      { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator", description: "Generate custom Lorem Ipsum text", indicator: "blue" },
      { name: "Remove Line Breaks", href: "/remove-line-breaks", description: "Easily remove line breaks from your text", indicator: "blue" },
      { name: "Remove White Space", href: "/remove-white-space", description: "Easily remove unnecessary white space from your text", indicator: "blue" }
    ]
  },
  {
    title: "FORMATTERS",
    tools: [
      { name: "Text Case Converter", href: "/text-case-converter", description: "Convert text case", indicator: "blue" }
    ]
  },
  {
    title: "TOKENIZERS",
    tools: [
      { name: "Open AI Tokens to Words", href: "/openai-tokens-to-words", description: "Convert OpenAI tokens to words and estimate token count", indicator: "blue" },
      { name: "Anthropic AI Tokens to Words", href: "/anthropic-ai-tokens-to-words", description: "Convert Anthropic AI tokens to words and estimate token count", indicator: "blue" },
      { name: "Gemini AI Tokens to Words", href: "/gemini-ai-tokens-to-words", description: "Convert Gemini AI tokens to words and estimate token count", indicator: "blue" },
      { name: "Mistral AI Tokens to Words", href: "/mistral-ai-tokens-to-words", description: "Convert Mistral AI tokens to words and estimate token count", indicator: "blue" }
    ]
  },
  {
    title: "COLOR",
    tools: [
      { name: "Skin Color Code Hex Generator", href: "/skin-color-code-hex-generator", description: "Generate hex codes for various skin colors", indicator: "orange" }
    ]
  },
  {
    title: "HTML",
    tools: [
      { name: "HTML Table Generator", href: "/html-table-generator", description: "Generate HTML tables with ease", indicator: "blue" }
    ]
  },
]

export function Navigation({ content }: { content?: NavigationContent }) {
return (
<header className="sticky top-0 z-[9999] w-full border-b bg-background">
<div className="container mx-auto px-4 max-w-[1400px] flex h-14 items-center justify-between">
<Link href="/" className="flex items-center space-x-2">
<ClientLogo alt={content?.logoText || 'Calculator Tools'} />
<span className="font-semibold text-xl">{content?.logoText || 'Calculator Tools'}</span>
</Link>

{/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-4">
<NavigationMenu>
<NavigationMenuList>
<NavigationMenuItem>
<NavigationMenuTrigger>All Tools</NavigationMenuTrigger>
<NavigationMenuContent>
<div className="fixed left-0 right-0 top-[3.5rem] bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 min-h-[400px]">
<div className="container mx-auto max-w-7xl">
<div className="grid grid-cols-5 gap-6 p-6" style={{ maxHeight: 'calc(100vh - 3.5rem)', overflowY: 'auto' }}>
{toolCategories.map((category) => (
<div key={category.title} className="space-y-4">
<div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
{category.title}
</div>
<div className="space-y-4">
{category.tools.map((tool) => (
<Link key={tool.href} href={tool.href} legacyBehavior passHref>
<NavigationMenuLink className="block space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 cursor-pointer">
<div className="flex items-center gap-2">
<span className={`w-1.5 h-1.5 rounded-full bg-${tool.indicator}-500`} />
<span className="text-sm font-medium">{tool.name}</span>
</div>
<p className="line-clamp-2 text-xs leading-snug text-zinc-500 dark:text-zinc-400 mt-1">
{tool.description}
</p>
</NavigationMenuLink>
</Link>
))}
</div>
</div>
))}
</div>
</div>
</div>
</NavigationMenuContent>
</NavigationMenuItem>
{content?.menuLinks ? (
<div
className="flex items-center space-x-4"
dangerouslySetInnerHTML={{ __html: content.menuLinks }}
/>
) : (
<>
<NavigationMenuItem>
<Link href="/about" legacyBehavior passHref>
<NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 cursor-pointer">
About
</NavigationMenuLink>
</Link>
</NavigationMenuItem>
<NavigationMenuItem>
<Link href="/contact" legacyBehavior passHref>
<NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 cursor-pointer">
Contact
</NavigationMenuLink>
</Link>
</NavigationMenuItem>
</>
)}
</NavigationMenuList>
</NavigationMenu>
</nav>

{/* Mobile Menu Button */}
<ClientNavigation content={content} toolCategories={toolCategories} />
</div>
</header>
)
}

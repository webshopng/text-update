'use client'

import { useState, useCallback } from 'react'
import { ToolsSearch } from './tools-search'
import { CalculatorIcon } from './calculator-icon'
import { useRouter } from 'next/navigation'

const tools = [
{
name: "Word Counter",
href: "/word-counter",
description: "Count words and characters",
color: "bg-purple-600"
},
{
name: "Text Replace",
href: "/text-replace",
description: "Find and replace text",
color: "bg-pink-600"
},
{
name: "Text Split",
href: "/text-split",
description: "Split text into lines, sentences, or custom delimiters",
color: "bg-indigo-600"
},
{
name: "Join Text",
href: "/join-text",
description: "Combine multiple text fragments",
color: "bg-blue-600"
},
{
name: "Repeat Text",
href: "/repeat-text",
description: "Repeat text multiple times with custom options",
color: "bg-green-600"
},
{
name: "Upside Down Text",
href: "/upside-down-text",
description: "Convert text to upside down characters",
color: "bg-purple-600"
},
{
name: "Reverse Text",
href: "/reverse-text",
description: "Reverse your text instantly",
color: "bg-orange-600"
},
{
name: "Backwards Text",
href: "/backwards-text",
description: "Generate backwards text in two different ways",
color: "bg-red-600"
},
{
name: "Truncate Text",
href: "/truncate-text",
description: "Easily truncate your text to a specific length",
color: "bg-yellow-600"
},
{
name: "Comma Separated Values",
href: "/comma-separated-values",
description: "Convert text to CSV and CSV to text",
color: "bg-cyan-600"
},
{
name: "Wingdings Translator",
href: "/wingdings-translator",
description: "Translate text to Wingdings and back",
color: "bg-emerald-600"
},
{
name: "Cursed Text Generator",
href: "/cursed-text-generator",
description: "Transform your text into spooky, cursed styles",
color: "bg-purple-600"
},
{
name: "Weird Text Generator",
href: "/weird-text-generator",
description: "Transform your text into weird and unique styles",
color: "bg-indigo-600"
},
{
name: "Superscript Generator",
href: "/superscript-generator",
description: "Convert your text to superscript characters",
color: "bg-blue-600"
},
{
name: "Crazy Font Generator",
href: "/crazy-font-generator",
description: "Transform your text into wild and crazy fonts",
color: "bg-purple-600"
},
{
name: "Typing Speed Test",
href: "/typing-speed-test",
description: "Test your typing speed and accuracy",
color: "bg-yellow-600"
},
{
name: "Remove Words from Text",
href: "/remove-words-from-text",
description: "Easily remove specific words or phrases from your text",
color: "bg-red-600"
},
{
name: "Reverse List Online",
href: "/reverse-list-online",
description: "Easily reverse the order of items in your list",
color: "bg-cyan-600"
},
{
name: "Mirrored Text Generator",
href: "/mirrored-text-generator",
description: "Create mirrored text easily",
color: "bg-blue-600"
},
{
name: "Open AI Tokens to Words",
href: "/openai-tokens-to-words",
description: "Convert OpenAI tokens to words and estimate token count",
color: "bg-blue-600"
},
{
name: "Anthropic AI Tokens to Words",
href: "/anthropic-ai-tokens-to-words",
description: "Convert Anthropic AI tokens to words and estimate token count",
color: "bg-blue-600"
},
{
name: "Gemini AI Tokens to Words",
href: "/gemini-ai-tokens-to-words",
description: "Convert Gemini AI tokens to words and estimate token count",
color: "bg-blue-600"
},
{
name: "Mistral AI Tokens to Words",
href: "/mistral-ai-tokens-to-words",
description: "Convert Mistral AI tokens to words and estimate token count",
color: "bg-blue-600"
},
{
name: "Indentation Rich Text Editor",
href: "/indentation-rich-text-editor",
description: "Create and edit indented rich text with ease",
color: "bg-blue-600"
},
{
name: "Indent Text Online",
href: "/indent-text-online",
description: "Easily indent and format your text online",
color: "bg-blue-600"
},
{
name: "Unindent Text Online",
href: "/unindent-text-online",
description: "Easily remove indentation from your text online",
color: "bg-blue-600"
},
{
name: "Scrabble Board Maker",
href: "/scrabble-board-maker",
description: "Create custom Scrabble boards with ease",
color: "bg-green-600"
},
{
name: "Scrabble Word Maker",
href: "/scrabble-word-maker",
description: "Generate valid Scrabble words from your letters",
color: "bg-green-600"
},
{
name: "Add Text to Each Line",
href: "/add-text-to-each-line",
description: "Add text to the beginning or end of each line",
color: "bg-blue-600"
},
{
name: "Text to Morse Code",
href: "/text-to-morse-code",
description: "Convert text to Morse code and vice versa",
color: "bg-blue-600"
},
{
name: "Online TXT Shuffle",
href: "/online-txt-shuffle",
description: "Randomly shuffle lines, words, or characters in your text",
color: "bg-blue-600"
},
{
name: "Text Rotator Online Tool",
href: "/text-rotator-online-tool",
description: "Rotate your text by a specified number of positions",
color: "bg-blue-600"
},
{
name: "Text to Hexl",
href: "/text-to-hexl",
description: "Convert text to hexadecimal dump format",
color: "bg-blue-600"
},
{
name: "Hex to Text",
href: "/hex-to-text",
description: "Convert hexadecimal values to readable text",
color: "bg-blue-600"
},
{
name: "Lorem Ipsum Generator",
href: "/lorem-ipsum-generator",
description: "Generate custom Lorem Ipsum text",
color: "bg-blue-600"
},
{
name: "Fancy Text Generator",
href: "/fancy-text-generator",
description: "Transform your text into stylish and fancy formats",
color: "bg-purple-600"
},
{
name: "Remove Line Breaks",
href: "/remove-line-breaks",
description: "Easily remove line breaks from your text",
color: "bg-blue-600"
},
{
name: "Remove White Space",
href: "/remove-white-space",
description: "Easily remove unnecessary white space from your text",
color: "bg-blue-600"
},
{
name: "Online Sentence Counter",
href: "/online-sentence-counter",
description: "Count sentences and analyze your text",
color: "bg-blue-600"
},
{
name: "Text to HTML Generator",
href: "/text-to-html-generator",
description: "Convert plain text to HTML with formatting options",
color: "bg-blue-600"
},
{
name: "Sand Table Design Maker",
href: "/sand-table-design-maker",
description: "Create beautiful sand table designs online",
color: "bg-yellow-600"
},
{
name: "Random Choice Generator",
href: "/random-choice-generator",
description: "Generate random choices from a list",
color: "bg-orange-600",
},
{
  name: "Random Group Generator",
  href: "/random-group-generator",
  description: "Generate random groups from a list",
  color: "bg-orange-600",
},
{
name: "Vaporwave Text Generator",
href: "/vaporwave-text-generator",
description: "Transform your text into vaporwave aesthetic",
color: "bg-pink-600",
},
{
name: "Text Format Removal",
href: "/text-format-removal",
description: "Remove formatting from text",
color: "bg-zinc-600"
},
{
name: "Capitalize Each Word",
href: "/capitalize-each-word",
description: "Capitalize each word in your text",
color: "bg-blue-600"
},
{
name: "Remove Numbers from Text",
href: "/remove-numbers-from-text",
description: "Easily remove numbers from your text",
color: "bg-red-600"
},
{
name: "Skin Color Code Hex Generator",
href: "/skin-color-code-hex-generator",
description: "Generate hex codes for various skin colors.",
color: "bg-orange-600",
},
{
name: "TXT to PDF Converter",
href: "/txt-to-pdf-converter",
description: "Convert text files to PDF",
color: "bg-blue-600"
},
{
name: "Remove Symbols From Text",
href: "/remove-symbols-from-text",
description: "Easily remove symbols from your text",
color: "bg-red-600"
},
{
name: "HTML Table Generator",
href: "/html-table-generator",
description: "Generate HTML tables with ease",
color: "bg-blue-600"
},
{
name: "Camel Case Text Generator",
href: "/camel-case-text-generator",
description: "Convert your text to camel case",
color: "bg-pink-600"
},
{
name: "Text Case Converter",
href: "/text-case-converter",
description: "Convert your text case",
color: "bg-green-600"
},
]

const categories = [
{
title: "Text Tools",
tools: [
"Word Counter",
"Text Replace",
"Text Split",
"Join Text",
"Repeat Text",
"Upside Down Text",
"Reverse Text",
"Backwards Text",
"Truncate Text",
"Comma Separated Values",
"Wingdings Translator",
"Cursed Text Generator",
"Weird Text Generator",
"Superscript Generator",
"Crazy Font Generator",
"Typing Speed Test",
"Remove Words from Text",
"Indent Text Online",
"Unindent Text Online",
"Scrabble Board Maker",
"Scrabble Word Maker",
"Add Text to Each Line",
"Text to Morse Code",
"Online TXT Shuffle",
"Text Rotator Online Tool",
"Text to Hexl",
"Hex to Text"
]
}
];

export function HomeClient() {
const [searchTerm, setSearchTerm] = useState('')
const [searchValue, setSearchValue] = useState('')
const router = useRouter()

const handleSearch = useCallback((search: string) => {
  if (search.trim() !== '') {
    router.push(`/search?q=${encodeURIComponent(search)}`)
  }
}, [router])

return (
<div className="container mx-auto px-4 py-12">
<ToolsSearch onSearch={setSearchTerm} searchValue={searchValue} setSearchValue={setSearchValue} />

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {tools
    .filter(tool => tool.name.toLowerCase().includes(searchValue))
    .map((tool) => (
      <CalculatorIcon
        key={tool.name}
        href={tool.href}
        name={tool.name}
        description={tool.description}
        color={tool.color}
        label={tool.label}
      />
    ))}
</div>
</div>
)
}

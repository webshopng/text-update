import { Metadata } from 'next'
import { redis } from './redis'

export interface PageMetadata extends Metadata {
  pageTitle: string;
  pageDescription: string;
}

export const defaultMetadata: Record<string, PageMetadata> = {
  home: {
    pageTitle: 'Free Online Text Tools - Home',
    pageDescription: 'A collection of free online text tools for all your text manipulation needs.',
    title: 'Free Online Text Tools - Home',
    description: 'A collection of free online text tools for all your text manipulation needs.',
  },
  about: {
    pageTitle: 'About Our Free Online Text Tools',
    pageDescription: 'Learn more about our free online text tools and how they can help you with your text-based tasks.',
    title: 'About Our Free Online Text Tools',
    description: 'Learn more about our free online text tools and how they can help you with your text-based tasks.',
  },
  contact: {
    pageTitle: 'Contact Us',
    pageDescription: 'Get in touch with our team',
    title: 'Contact Us',
    description: 'Get in touch with our team',
  },
  privacy: {
    pageTitle: 'Privacy Policy',
    pageDescription: 'Our privacy policy for Calculator Tools',
    title: 'Privacy Policy',
    description: 'Our privacy policy for Calculator Tools',
  },
  terms: {
    pageTitle: 'Terms of Use',
    pageDescription: 'Our terms and conditions for using Calculator Tools',
    title: 'Terms of Use',
    description: 'Our terms and conditions for using Calculator Tools',
  },
  'word-counter': {
    pageTitle: 'Word Counter',
    pageDescription: 'Count words, characters, and more',
    title: 'Word Counter',
    description: 'Count words, characters, and more',
  },
  'text-replace': {
    pageTitle: 'Text Replace Tool',
    pageDescription: 'Find and replace text with options',
    title: 'Text Replace Tool',
    description: 'Find and replace text with options',
  },
  
  'join-text': {
    pageTitle: 'Join Text Tool',
    pageDescription: 'Combine multiple text fragments into a single piece',
    title: 'Join Text Tool',
    description: 'Combine multiple text fragments into a single piece',
  },
  'repeat-text': {
    pageTitle: 'Repeat Text Tool',
    pageDescription: 'Easily repeat text multiple times with customizable options',
    title: 'Repeat Text Tool',
    description: 'Easily repeat text multiple times with customizable options',
  },
  'upside-down-text': {
    pageTitle: 'Upside Down Text Generator',
    pageDescription: 'Convert your text to upside down characters',
    title: 'Upside Down Text Generator',
    description: 'Convert your text to upside down characters',
  },
  'reverse-text': {
    pageTitle: 'Reverse Text Generator',
    pageDescription: 'Reverse your text instantly',
    title: 'Reverse Text Generator',
    description: 'Reverse your text instantly',
  },
  'backwards-text': {
    pageTitle: 'Backwards Text Generator, Two Types',
    pageDescription: 'Generate backwards text in two different ways',
    title: 'Backwards Text Generator, Two Types',
    description: 'Generate backwards text in two different ways',
  },
  'truncate-text': {
    pageTitle: 'Truncate Text Online',
    pageDescription: 'Easily truncate your text to a specific length',
    title: 'Truncate Text Online',
    description: 'Easily truncate your text to a specific length',
  },
  'comma-separated-values': {
    pageTitle: 'Comma Separated Values Online',
    pageDescription: 'Convert text to CSV and CSV to text',
    title: 'Comma Separated Values Online',
    description: 'Convert text to CSV and CSV to text',
  },
  'wingdings-translator': {
    pageTitle: 'Wingdings Translator',
    pageDescription: 'Translate text to Wingdings and back',
    title: 'Wingdings Translator',
    description: 'Translate text to Wingdings and back',
  },
  'cursed-text-generator': {
    pageTitle: 'Cursed Text Generator',
    pageDescription: 'Transform your text into spooky, cursed styles',
    title: 'Cursed Text Generator',
    description: 'Transform your text into spooky, cursed styles',
  },
  'weird-text-generator': {
    pageTitle: 'Weird Text Generator',
    pageDescription: 'Transform your text into weird and unique styles',
    title: 'Weird Text Generator',
    description: 'Transform your text into weird and unique styles',
  },
  'superscript-generator': {
    pageTitle: 'Superscript Generator',
    pageDescription: 'Convert your text to superscript characters',
    title: 'Superscript Generator',
    description: 'Convert your text to superscript characters',
  },
  'crazy-font-generator': {
    pageTitle: 'Crazy Font Generator',
    pageDescription: 'Transform your text into wild and crazy fonts',
    title: 'Crazy Font Generator',
    description: 'Transform your text into wild and crazy fonts',
  },
  'typing-speed-test': {
    pageTitle: 'Typing Speed Test',
    pageDescription: 'Test your typing speed and accuracy with our advanced typing test',
    title: 'Typing Speed Test',
    description: 'Test your typing speed and accuracy with our advanced typing test',
  },
  'remove-words-from-text': {
    pageTitle: 'Remove Words from Text',
    pageDescription: 'Easily remove specific words or phrases from your text',
    title: 'Remove Words from Text',
    description: 'Easily remove specific words or phrases from your text',
  },
  'reverse-list-online': {
    pageTitle: 'Reverse List Online',
    pageDescription: 'Easily reverse the order of items in your list',
    title: 'Reverse List Online',
    description: 'Easily reverse the order of items in your list',
  },
  'mirrored-text-generator': {
    pageTitle: 'Mirrored Text Generator',
    pageDescription: 'Create mirrored text easily with our advanced tool',
    title: 'Mirrored Text Generator',
    description: 'Create mirrored text easily with our advanced tool',
  },
  'openai-tokens-to-words': {
    pageTitle: 'OpenAI Tokens to Words',
    pageDescription: 'Convert OpenAI tokens to words and estimate token count',
    title: 'OpenAI Tokens to Words',
    description: 'Convert OpenAI tokens to words and estimate token count',
  },
  'anthropic-ai-tokens-to-words': {
    pageTitle: 'Anthropic AI Tokens to Words',
    pageDescription: 'Convert Anthropic AI tokens to words and estimate token count',
    title: 'Anthropic AI Tokens to Words',
    description: 'Convert Anthropic AI tokens to words and estimate token count',
  },
  'gemini-ai-tokens-to-words': {
    pageTitle: 'Gemini AI Tokens to Words',
    pageDescription: 'Convert Gemini AI tokens to words and estimate token count',
    title: 'Gemini AI Tokens to Words',
    description: 'Convert Gemini AI tokens to words and estimate token count',
  },
  'mistral-ai-tokens-to-words': {
    pageTitle: 'Mistral AI Tokens to Words',
    pageDescription: 'Convert Mistral AI tokens to words and estimate token count',
    title: 'Mistral AI Tokens to Words',
    description: 'Convert Mistral AI tokens to words and estimate token count',
  },
  'indentation-rich-text-editor': {
    pageTitle: 'Indentation Rich Text Editor',
    pageDescription: 'Create and edit indented rich text with ease',
    title: 'Indentation Rich Text Editor',
    description: 'Create and edit indented rich text with ease',
  },
  'indent-text-online': {
    pageTitle: 'Indent Text Online',
    pageDescription: 'Easily indent and format your text online',
    title: 'Indent Text Online',
    description: 'Easily indent and format your text online',
  },
  'unindent-text-online': {
    pageTitle: 'Unindent Text Online',
    pageDescription: 'Easily remove indentation from your text online',
    title: 'Unindent Text Online',
    description: 'Easily remove indentation from your text online',
  },
  'scrabble-board-maker': {
    pageTitle: 'Scrabble Board Maker',
    pageDescription: 'Create custom Scrabble boards with ease',
    title: 'Scrabble Board Maker',
    description: 'Create custom Scrabble boards with ease',
  },
  'scrabble-word-maker': {
    pageTitle: 'Scrabble Word Maker',
    pageDescription: 'Generate valid Scrabble words from your letters',
    title: 'Scrabble Word Maker',
    description: 'Generate valid Scrabble words from your letters',
  },
  'add-text-to-each-line': {
    pageTitle: 'Add Text to Each Line',
    pageDescription: 'Add text to the beginning or end of each line in your text',
    title: 'Add Text to Each Line',
    description: 'Add text to the beginning or end of each line in your text',
  },
  'text-to-morse-code': {
    pageTitle: 'Text to Morse Code Converter',
    pageDescription: 'Convert text to Morse code and Morse code to text',
    title: 'Text to Morse Code Converter',
    description: 'Convert text to Morse code and Morse code to text',
  },
  'online-txt-shuffle': {
    pageTitle: 'Online TXT Shuffle',
    pageDescription: 'Randomly shuffle lines, words, or characters in your text',
    title: 'Online TXT Shuffle',
    description: 'Randomly shuffle lines, words, or characters in your text',
  },
  'text-rotator-online-tool': {
    pageTitle: 'Text Rotator Online Tool',
    pageDescription: 'Rotate your text by a specified number of positions',
    title: 'Text Rotator Online Tool',
    description: 'Rotate your text by a specified number of positions',
  },
  'text-to-hexl': {
    pageTitle: 'Text to Hexl Converter',
    pageDescription: 'Convert text to hexadecimal dump format',
    title: 'Text to Hexl Converter',
    description: 'Convert text to hexadecimal dump format',
  },
  'hex-to-text': {
    pageTitle: 'Hex to Text Converter',
    pageDescription: 'Convert hexadecimal values to readable text',
    title: 'Hex to Text Converter',
    description: 'Convert hexadecimal values to readable text',
  },
  'lorem-ipsum-generator': {
    pageTitle: 'Lorem Ipsum Generator',
    pageDescription: 'Generate custom Lorem Ipsum text for your design and development needs',
    title: 'Lorem Ipsum Generator',
    description: 'Generate custom Lorem Ipsum text for your design and development needs',
  },
  'fancy-text-generator': {
    pageTitle: 'Fancy Text Generator',
    pageDescription: 'Transform your text into stylish and fancy formats',
    title: 'Fancy Text Generator',
    description: 'Transform your text into stylish and fancy formats',
  },
  'remove-line-breaks': {
    pageTitle: 'Remove Line Breaks',
    pageDescription: 'Easily remove line breaks from your text',
    title: 'Remove Line Breaks',
    description: 'Easily remove line breaks from your text',
  },
  'remove-white-space': {
    pageTitle: 'Remove White Space',
    pageDescription: 'Easily remove unnecessary white space from your text',
    title: 'Remove White Space',
    description: 'Easily remove unnecessary white space from your text',
  },
  'online-sentence-counter': {
    pageTitle: 'Online Sentence Counter',
    pageDescription: 'Count sentences and analyze your text with advanced features',
    title: 'Online Sentence Counter',
    description: 'Count sentences and analyze your text with advanced features',
  },
  'text-to-html-generator': {
    pageTitle: 'Text to HTML Generator',
    pageDescription: 'Convert plain text to HTML with advanced formatting options',
    title: 'Text to HTML Generator',
    description: 'Convert plain text to HTML with advanced formatting options',
  },
  'sand-table-design-maker': {
    pageTitle: 'Sand Table Design Maker Online',
    pageDescription: 'Create beautiful sand table designs online with our easy-to-use tool',
    title: 'Sand Table Design Maker Online',
    description: 'Create beautiful sand table designs online with our easy-to-use tool',
  },
  'random-choice-generator': {
    pageTitle: 'Random Choice Generator',
    pageDescription: 'Generate random choices from a list of options',
    title: 'Random Choice Generator',
    description: 'Generate random choices from a list of options',
  },
  'random-group-generator': {
    pageTitle: 'Random Group Generator',
    pageDescription: 'Generate random groups from a list of items',
    title: 'Random Group Generator',
    description: 'Generate random groups from a list of items',
  },
  'vaporwave-text-generator': {
    pageTitle: 'Vaporwave Text Generator',
    pageDescription: 'Transform your text into Vaporwave aesthetic',
    title: 'Vaporwave Text Generator',
    description: 'Transform your text into Vaporwave aesthetic',
  },
  'text-format-removal': {
    pageTitle: 'Text Format Removal',
    pageDescription: 'Remove formatting from text',
    title: 'Text Format Removal',
    description: 'Remove formatting from text',
  },
  'capitalize-each-word': {
    pageTitle: 'Capitalize Each Word',
    pageDescription: 'Capitalize each word in your text',
    title: 'Capitalize Each Word',
    description: 'Capitalize each word in your text',
  },
  'remove-numbers-from-text': {
    pageTitle: 'Remove Numbers From Text',
    pageDescription: 'Easily remove numbers from your text content.',
    title: 'Remove Numbers From Text',
    description: 'Easily remove numbers from your text content.',
  },
  'skin-color-code-hex-generator': {
    pageTitle: 'Skin Color Code Hex Generator',
    pageDescription: 'Generate hex codes for various skin colors.',
    title: 'Skin Color Code Hex Generator',
    description: 'Generate hex codes for various skin colors.',
  },
  'txt-to-pdf-converter': {
    pageTitle: 'TXT to PDF Converter',
    pageDescription: 'Convert your text files to PDF format',
    title: 'TXT to PDF Converter',
    description: 'Convert your text files to PDF format',
  },
  'remove-symbols-from-text': {
    pageTitle: 'Remove Symbols From Text',
    pageDescription: 'Easily remove symbols from your text content.',
    title: 'Remove Symbols From Text',
    description: 'Easily remove symbols from your text content.',
  },
  'html-table-generator': {
    pageTitle: 'HTML Table Generator',
    pageDescription: 'Generate HTML tables with ease',
    title: 'HTML Table Generator',
    description: 'Generate HTML tables with ease',
  },
  'camel-case-text-generator': {
    pageTitle: 'Camel Case Text Generator',
    pageDescription: 'Convert your text to camel case',
    title: 'Camel Case Text Generator',
    description: 'Convert your text to camel case',
  },
  'scientific-calculator': {
    pageTitle: 'Scientific Calculator',
    pageDescription: 'Advanced mathematical calculations and functions',
    title: 'Scientific Calculator',
    description: 'Advanced mathematical calculations and functions',
  },
  'text-split': {
    pageTitle: 'Text Split Tool',
    pageDescription: 'Split your text into lines, sentences, or custom delimiters',
    title: 'Text Split Tool',
    description: 'Split your text into lines, sentences, or custom delimiters',
  },
  'text-case-converter': {
    pageTitle: 'Text Case Converter',
    pageDescription: 'Convert the text case of words, titles, sentences',
    title: 'Text Case Converter',
    description: 'Convert the text case of words, titles, sentences',
  },
}

export async function getMetadata(page: string): Promise<PageMetadata> {
  try {
    const storedMetadata = await redis.hgetall(`metadata:${page}`)
    return { ...defaultMetadata[page], ...storedMetadata }
  } catch (error) {
    console.error(`Error fetching metadata for ${page}:`, error)
    return defaultMetadata[page]
  }
}

export const metadata = defaultMetadata


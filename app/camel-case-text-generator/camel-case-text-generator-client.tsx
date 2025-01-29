"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Label } from "@/components/ui/label"

interface CamelCaseTextGeneratorClientProps {
content: {
title?: string;
description?: string;
content?: string;
}
}

export function CamelCaseTextGeneratorClient({ content }: CamelCaseTextGeneratorClientProps) {
const [inputText, setInputText] = useState('')
const [outputText, setOutputText] = useState('')
const [error, setError] = useState('')

const handleConvert = useCallback(() => {
setError('')
if (!inputText) {
setError('Please enter some text to convert.')
return
}

const words = inputText.trim().split(/\s+/)
const camelCaseText = words.map((word, index) => {
  if (index === 0) {
    return word.charAt(0).toLowerCase() + word.slice(1)
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}).join('')

setOutputText(camelCaseText)
}, [inputText])

const handleCopy = useCallback(() => {
navigator.clipboard.writeText(outputText)
}, [outputText])

const handlePaste = useCallback(async () => {
try {
const clipboardText = await navigator.clipboard.readText()
setInputText(clipboardText)
} catch (err) {
console.error('Failed to read clipboard contents: ', err)
}
}, [])

const handleClear = useCallback(() => {
setInputText('')
setOutputText('')
setError('')
}, [])

return (
<>
<Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
<CardHeader>
<CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
{content.title || "Camel Case Text Generator"}
</CardTitle>
</CardHeader>
<CardContent className="space-y-6 p-6">
<div className="space-y-4">
<div className="relative">
<Label htmlFor="input-text">Input Text</Label> <Textarea
id="input-text"
value={inputText}
onChange={(e) => setInputText(e.target.value)}
placeholder="Enter your text here..."
className="min-h-[200px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4 mt-2"
/>
<div className="absolute top-9 right-2 flex items-center gap-2">
<button
onClick={handlePaste}
className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
title="Paste"
>
<ClipboardPaste className="size-4" />
</button>
<button
onClick={handleClear}
className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
title="Clear"
>
<Trash2 className="size-4" />
</button>
</div>
</div>

<Button onClick={handleConvert} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
<Type className="h-4 w-4 mr-2" />
Generate Camel Case Text
</Button>

{error && (
<Alert variant="destructive">
<AlertDescription>{error}</AlertDescription>
</Alert>
)}

{outputText && (
<div className="space-y-2">
<div className="flex justify-between items-center">
<Label htmlFor="output-text">Result</Label>
<Button
variant="outline"
size="sm"
onClick={handleCopy}
className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
>
<Copy className="h-4 w-4 mr-2" />
Copy Result
</Button>
</div>
<Textarea
id="output-text"
value={outputText}
readOnly
className="min-h-[100px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
/>
</div>
)}
</div>
</CardContent>
</Card>

{/* Sample component boxes */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Basic Example</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"hello world"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"helloWorld"}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Multiple Words</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"this is a sentence"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"thisIsASentence"}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">With Punctuation</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"hello, world!"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"hello,World!"}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Mixed Case</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"hELLo wORLd"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"helloWORLd"}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Multiple Lines</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`line 1
line 2
line 3`}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`line1
Line2
Line3`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Empty Input</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{""}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{""}
</pre>
</div>
</div>

{content.content && (
<div className="mt-12 space-y-8">
<StyledContent content={content.content} />
</div>
)}
</>
)
}


'use client'

import { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, FileText } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { jsPDF } from "jspdf";

interface TxtToPdfConverterClientProps {
content: {
title?: string;
description?: string;
content?: string;
}
}

export function TxtToPdfConverterClient({ content }: TxtToPdfConverterClientProps) {
const [inputText, setInputText] = useState('')
const [error, setError] = useState('')
const textAreaRef = useRef<HTMLTextAreaElement>(null)


const handleConvert = useCallback(() => {
setError('')

if (!inputText) {
setError('Please enter some text to convert.')
return
}

const doc = new jsPDF();
const lines = doc.splitTextToSize(inputText, 180)
doc.text(lines, 10, 10)
doc.save('converted-text.pdf')

}, [inputText])

const handleCopy = useCallback(() => {
navigator.clipboard.writeText(inputText)
}, [inputText])

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
setError('')
if (textAreaRef.current) {
textAreaRef.current.style.height = 'auto'; // Reset height
}
}, [])

const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
setInputText(e.target.value)

// Auto-resize textarea
if (textAreaRef.current) {
textAreaRef.current.style.height = 'auto'; // Reset height
textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
}
}, [])

return (
<>
<Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
<CardHeader>
<CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
{content.title || "TXT to PDF Converter"}
</CardTitle>
</CardHeader>
<CardContent className="space-y-6 p-6">
<div className="space-y-4">
<div className="relative">
<Textarea
ref={textAreaRef}
value={inputText}
onChange={handleTextareaChange}
placeholder="Enter or paste your text here..."
className="min-h-[300px] resize-none focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4"
/>
<div className="absolute top-2 right-2 flex items-center gap-2">
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
<FileText className="h-4 w-4 mr-2" />
Convert to PDF
</Button>

{error && (
<Alert variant="destructive">
<AlertDescription>{error}</AlertDescription>
</Alert>
)}

</div>
</CardContent>
</Card>

{/* Sample component boxes */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Simple Text</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"Hello, world! This is a simple text example."}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">PDF file containing: "Hello, world! This is a simple text example."</p>
</div>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Multiple Lines</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`Line 1
Line 2
Line 3`}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">PDF file containing:</p>
<pre className="text-xs">
{`Line 1
Line 2
Line 3`}
</pre>
</div>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Long Text</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-hidden">
{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">PDF file containing the long text.</p>
</div>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Special Characters</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"!@#$%^&*()_+=-`"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">PDF file containing the special characters.</p>
</div>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Empty Input</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{""}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">Empty PDF file.</p>
</div>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">International Characters</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{"你好，世界！"}
</pre>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
<p className="text-xs">PDF file containing: "你好，世界！"</p>
</div>
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


"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, ClipboardPaste, Table } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface HTMLTableGeneratorClientProps {
content: {
title?: string;
description?: string;
content?: string;
}
}

export function HTMLTableGeneratorClient({ content }: HTMLTableGeneratorClientProps) {
const [rows, setRows] = useState(2)
const [cols, setCols] = useState(2)
const [tableData, setTableData] = useState<string[][]>(
Array(rows).fill(null).map(() => Array(cols).fill(''))
)
const [outputHtml, setOutputHtml] = useState('')
const [error, setError] = useState('')

const handleGenerateTable = useCallback(() => {
setError('')

const html = `<table>
<tbody>
${tableData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
</tbody>
</table>`
setOutputHtml(html)
}, [tableData])

const handleRowsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
const newRows = parseInt(e.target.value, 10)
if (isNaN(newRows) || newRows < 1) {
setError('Please enter a valid number of rows.')
return
}

setRows(newRows)
setTableData(prevData => {
const newData = Array(newRows).fill(null).map(() => Array(cols).fill(''))
for (let i = 0; i < Math.min(prevData.length, newRows); i++) {
for (let j = 0; j < cols; j++) {
  newData[i][j] = prevData[i][j]
}
}
return newData
})
}, [cols])

const handleColsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
const newCols = parseInt(e.target.value, 10)
if (isNaN(newCols) || newCols < 1) {
setError('Please enter a valid number of columns.')
return
}

setCols(newCols)
setTableData(prevData => {
return prevData.map(row => {
const newRow = Array(newCols).fill('')
for (let j = 0; j < Math.min(row.length, newCols); j++) {
newRow[j] = row[j]
}
return newRow
})
})
}, [])

const handleCellChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
setTableData(prevData => {
const newData = [...prevData]
newData[rowIndex] = [...newData[rowIndex]]
newData[rowIndex][colIndex] = value
return newData
})
}, [])

const handleCopy = useCallback(() => {
navigator.clipboard.writeText(outputHtml)
}, [outputHtml])

const handleClear = useCallback(() => {
setRows(2)
setCols(2)
setTableData(Array(2).fill(null).map(() => Array(2).fill('')))
setOutputHtml('')
setError('')
}, [])

return (
<>
<Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
<CardHeader>
<CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
{content.title || "HTML Table Generator"}
</CardTitle>
</CardHeader>
<CardContent className="space-y-6 p-6">
<div className="space-y-4">
<div className="grid grid-cols-2 gap-4">
<div>
<Label htmlFor="rows">Rows</Label>
<Input
id="rows"
type="number"
min="1"
value={rows}
onChange={handleRowsChange}
className="mt-1"
/>
</div>
<div>
<Label htmlFor="cols">Columns</Label>
<Input
id="cols"
type="number"
min="1"
value={cols}
onChange={handleColsChange}
className="mt-1"
/>
</div>
</div>

<div className="overflow-x-auto">
<table>
<thead>
<tr>
{Array.from({ length: cols }, (_, i) => (
<th key={i} className="px-4 py-2 border">
Column {i + 1}
</th>
))}
</tr>
</thead>
<tbody>
{tableData.map((row, rowIndex) => (
<tr key={rowIndex}>
{row.map((cell, colIndex) => (
<td key={colIndex} className="border px-4 py-2">
<Textarea
value={cell}
onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
className="min-h-[50px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-2"
/>
</td>
))}
</tr>
))}
</tbody>
</table>
</div>

<Button onClick={handleGenerateTable} className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white">
<Table className="h-4 w-4 mr-2" />
Generate Table
</Button>

{error && (
<Alert variant="destructive">
<AlertDescription>{error}</AlertDescription>
</Alert>
)}

{outputHtml && (
<div className="space-y-2">
<div className="flex justify-between items-center">
<Label htmlFor="output-html">Generated HTML</Label>
<Button
variant="outline"
size="sm"
onClick={handleCopy}
className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
>
<Copy className="h-4 w-4 mr-2" />
Copy HTML
</Button>
</div>
<Textarea
id="output-html"
value={outputHtml}
readOnly
className="min-h-[200px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500 font-mono"
/>
</div>
)}
</div>
</CardContent>
</Card>

{/* Sample component boxes */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">2x2 Table</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<div className="grid grid-cols-2 gap-2">
<input type="text" value="Row 1, Cell 1" className="border p-2 text-sm" readOnly />
<input type="text" value="Row 1, Cell 2" className="border p-2 text-sm" readOnly />
<input type="text" value="Row 2, Cell 1" className="border p-2 text-sm" readOnly />
<input type="text" value="Row 2, Cell 2" className="border p-2 text-sm" readOnly />
</div>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`<table>
<tbody>
<tr><td>Row 1, Cell 1</td><td>Row 1, Cell 2</td></tr>
<tr><td>Row 2, Cell 1</td><td>Row 2, Cell 2</td></tr>
</tbody>
</table>`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">3x3 Table</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<div className="grid grid-cols-3 gap-2">
{Array(9).fill(0).map((_, i) => (
<input key={i} type="text" value={`Cell ${i + 1}`} className="border p-2 text-sm" readOnly />
))}
</div>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
{`<table>
<tbody>
<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>
<tr><td>Cell 4</td><td>Cell 5</td><td>Cell 6</td></tr>
<tr><td>Cell 7</td><td>Cell 8</td><td>Cell 9</td></tr>
</tbody>
</table>`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg col-span-2">
<h4 className="text-lg font-semibold mb-2">Empty Table</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<div className="grid grid-cols-2 gap-2">
<input type="text" className="border p-2 text-sm" readOnly />
<input type="text" className="border p-2 text-sm" readOnly />
<input type="text" className="border p-2 text-sm" readOnly />
<input type="text" className="border p-2 text-sm" readOnly />
</div>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`<table>
<tbody>
<tr><td></td><td></td></tr>
<tr><td></td><td></td></tr>
</tbody>
</table>`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg col-span-2">
<h4 className="text-lg font-semibold mb-2">1x1 Table</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<input type="text" value="Single Cell" className="border p-2 text-sm" readOnly />
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
{`<table>
<tbody>
<tr><td>Single Cell</td></tr>
</tbody>
</table>`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Large Table (5x5)</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before (truncated):</p>
<div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto">
{Array(25).fill(0).map((_, i) => (
<input key={i} type="text" value={`Cell ${i + 1}`} className="border p-2 text-sm" readOnly />
))}
</div>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After (truncated):</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto max-h-40">
{`<table>
<tbody>
<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 4</td><td>Cell 5</td></tr>
<tr><td>Cell 6</td><td>Cell 7</td><td>Cell 8</td><td>Cell 9</td><td>Cell 10</td></tr>
...
</tbody>
</table>`}
</pre>
</div>
<div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
<h4 className="text-lg font-semibold mb-2">Table with HTML Content</h4>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
<div className="grid grid-cols-2 gap-2">
<input type="text" value="<b>Bold</b>" className="border p-2 text-sm" readOnly />
<input type="text" value="<a href='#'>Link</a>" className="border p-2 text-sm" readOnly />
<input type="text" value="<span style='color:red;'>Red</span>" className="border p-2 text-sm" readOnly />
<input type="text" value="<i>Italic</i>" className="border p-2 text-sm" readOnly />
</div>
<p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-2">After:</p>
<pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
{`<table>
<tbody>
<tr><td><b>Bold</b></td><td><a href='#'>Link</a></td></tr>
<tr><td><span style='color:red;'>Red</span></td><td><i>Italic</i></td></tr>
</tbody>
</table>`}
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


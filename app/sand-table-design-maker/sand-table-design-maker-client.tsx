"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Copy, Trash2, Download, Undo, Redo, Eraser } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface SandTableDesignMakerClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function SandTableDesignMakerClient({ content }: SandTableDesignMakerClientProps) {
  const [canvasSize, setCanvasSize] = useState(500)
  const [brushSize, setBrushSize] = useState(10)
  const [patternType, setPatternType] = useState('freehand')
  const [isDrawing, setIsDrawing] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [undoStack, setUndoStack] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvasSize
      canvas.height = canvasSize
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#f0e68c' // Sand color
        ctx.fillRect(0, 0, canvasSize, canvasSize)
        saveState()
      }
    }
  }, [canvasSize])

  const saveState = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        setUndoStack(prev => [...prev, ctx.getImageData(0, 0, canvasSize, canvasSize)])
        setRedoStack([])
      }
    }
  }, [canvasSize])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }, [])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    saveState()
  }, [saveState])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = '#8b4513' // Dark sand color
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'

      const rect = canvas?.getBoundingClientRect()
      const x = e.clientX - (rect?.left || 0)
      const y = e.clientY - (rect?.top || 0)

      if (patternType === 'freehand') {
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
      } else if (patternType === 'circle') {
        ctx.beginPath()
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (patternType === 'square') {
        ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize)
      }
    }
  }, [isDrawing, brushSize, patternType])

  const handleUndo = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas && undoStack.length > 1) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const currentState = undoStack[undoStack.length - 1]
        const previousState = undoStack[undoStack.length - 2]
        setRedoStack(prev => [...prev, currentState])
        setUndoStack(prev => prev.slice(0, -1))
        ctx.putImageData(previousState, 0, 0)
      }
    }
  }, [undoStack])

  const handleRedo = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas && redoStack.length > 0) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const nextState = redoStack[redoStack.length - 1]
        setUndoStack(prev => [...prev, nextState])
        setRedoStack(prev => prev.slice(0, -1))
        ctx.putImageData(nextState, 0, 0)
      }
    }
  }, [redoStack])

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#f0e68c' // Sand color
        ctx.fillRect(0, 0, canvasSize, canvasSize)
        saveState()
      }
    }
  }, [canvasSize, saveState])

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'sand_table_design.png'
      link.click()
    }
  }, [])

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Sand Table Design Maker Online"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="canvas-size">Canvas Size</Label>
                <Select value={canvasSize.toString()} onValueChange={(value) => setCanvasSize(Number(value))}>
                  <SelectTrigger id="canvas-size">
                    <SelectValue placeholder="Select canvas size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Small (300x300)</SelectItem>
                    <SelectItem value="500">Medium (500x500)</SelectItem>
                    <SelectItem value="700">Large (700x700)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brush-size">Brush Size</Label>
                <Input
                  id="brush-size"
                  type="number"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="pattern-type">Pattern Type</Label>
                <Select value={patternType} onValueChange={setPatternType}>
                  <SelectTrigger id="pattern-type">
                    <SelectValue placeholder="Select pattern type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freehand">Freehand</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={draw}
                className="w-full h-auto cursor-crosshair"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleUndo} disabled={undoStack.length <= 1}>
                <Undo className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button onClick={handleRedo} disabled={redoStack.length === 0}>
                <Redo className="w-4 h-4 mr-2" />
                Redo
              </Button>
              <Button onClick={handleClear} variant="outline">
                <Eraser className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Freehand Drawing</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path d="M20,50 Q40,20 60,50 T100,50" stroke="#8b4513" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Circle Pattern</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <circle cx="30" cy="30" r="10" fill="#8b4513" />
              <circle cx="70" cy="70" r="15" fill="#8b4513" />
              <circle cx="50" cy="50" r="5" fill="#8b4513" />
            </svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Square Pattern</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <rect x="20" y="20" width="20" height="20" fill="#8b4513" />
              <rect x="60" y="60" width="25" height="25" fill="#8b4513" />
              <rect x="45" y="30" width="15" height="15" fill="#8b4513" />
            </svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Mandala Design</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <g transform="translate(50,50)">
                <path d="M0,-40 A40,40 0 0,1 0,40 A40,40 0 0,1 0,-40" fill="none" stroke="#8b4513" strokeWidth="2" />
                <path d="M-35,-20 A40,40 0 0,1 35,-20" fill="none" stroke="#8b4513" strokeWidth="2" />
                <path d="M-35,20 A40,40 0 0,0 35,20" fill="none" stroke="#8b4513" strokeWidth="2" />
                <circle r="5" fill="#8b4513" />
              </g>
            </svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Zen Garden</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path d="M10,50 Q30,30 50,50 T90,50" stroke="#8b4513" strokeWidth="3" fill="none" />
              <path d="M10,70 Q30,50 50,70 T90,70" stroke="#8b4513" strokeWidth="3" fill="none" />
              <circle cx="25" cy="40" r="5" fill="#8b4513" />
              <circle cx="75" cy="60" r="5" fill="#8b4513" />
            </svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Geometric Pattern</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <div className="w-full h-32 bg-[#f0e68c] rounded-lg relative">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <rect x="10" y="10" width="30" height="30" fill="none" stroke="#8b4513" strokeWidth="2" />
              <rect x="60" y="60" width="30" height="30" fill="none" stroke="#8b4513" strokeWidth="2" />
              <line x1="25" y1="25" x2="75" y2="75" stroke="#8b4513" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#8b4513" strokeWidth="2" />
            </svg>
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


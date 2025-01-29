'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Link, Link2Off } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { sanitizeContent } from '@/lib/sanitize'

interface SimpleEditorProps {
  initialContent: string
  onSave: (content: string) => Promise<void>
}

export function SimpleEditor({ initialContent, onSave }: SimpleEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [activeStyles, setActiveStyles] = useState<string[]>([])
  const [activeBlock, setActiveBlock] = useState<string>('p')
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sanitizeContent(initialContent)
    }
  }, [initialContent])

  const updateActiveStyles = useCallback(() => {
    const styles: string[] = []
    if (document.queryCommandState('bold')) styles.push('bold')
    if (document.queryCommandState('italic')) styles.push('italic')
    if (document.queryCommandState('underline')) styles.push('underline')
    if (document.queryCommandState('justifyLeft')) styles.push('alignLeft')
    if (document.queryCommandState('justifyCenter')) styles.push('alignCenter')
    if (document.queryCommandState('justifyRight')) styles.push('alignRight')
    if (document.queryCommandState('justifyFull')) styles.push('alignJustify')
    if (document.queryCommandState('insertUnorderedList')) styles.push('unorderedList')
    if (document.queryCommandState('insertOrderedList')) styles.push('orderedList')
    if (document.queryCommandValue('formatBlock') === 'a') styles.push('link')
    setActiveStyles(styles)

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      let element = range.startContainer as HTMLElement
      while (element && element !== editorRef.current) {
        if (element.nodeType === Node.ELEMENT_NODE) {
          const tagName = element.tagName.toLowerCase()
          if (['p', 'h1', 'h2', 'h3', 'h4'].includes(tagName)) {
            setActiveBlock(tagName)
            return
          }
          if (tagName === 'a') {
            styles.push('link')
          }
        }
        element = element.parentElement as HTMLElement
      }
    }
    setActiveBlock('p')
    setActiveStyles(styles)
  }, [])

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveStyles()
    }
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [updateActiveStyles])

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const execCommand = useCallback((command: string, value: string | undefined = undefined) => {
    focusEditor()
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setContent(sanitizeContent(editorRef.current.innerHTML))
    }
    updateActiveStyles()
  }, [updateActiveStyles])

  const handleFormat = useCallback((tag: string) => {
    focusEditor()
    document.execCommand('formatBlock', false, tag)
    if (editorRef.current) {
      setContent(sanitizeContent(editorRef.current.innerHTML))
    }
    updateActiveStyles()
  }, [updateActiveStyles])

  const handleAlignment = useCallback((alignment: string) => {
    focusEditor()
    document.execCommand(`justify${alignment}`, false)
    if (editorRef.current) {
      setContent(sanitizeContent(editorRef.current.innerHTML))
    }
    updateActiveStyles()
  }, [updateActiveStyles])

  const handleList = useCallback((type: 'ordered' | 'unordered') => {
    focusEditor()
    document.execCommand(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList', false)
    if (editorRef.current) {
      setContent(sanitizeContent(editorRef.current.innerHTML))
    }
    updateActiveStyles()
  }, [updateActiveStyles])

  const handleLink = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const url = prompt('Enter URL:')
      if (url) {
        execCommand('createLink', url)
      }
    } else {
      alert('Please select some text first')
    }
  }, [execCommand])

  const handleUnlink = useCallback(() => {
    execCommand('unlink')
  }, [execCommand])

  const handleSave = async () => {
    const sanitizedContent = sanitizeContent(content)
    await onSave(sanitizedContent)
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button 
            onClick={() => execCommand('bold')} 
            variant={activeStyles.includes('bold') ? "default" : "outline"}
            size="icon"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => execCommand('italic')} 
            variant={activeStyles.includes('italic') ? "default" : "outline"}
            size="icon"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => execCommand('underline')} 
            variant={activeStyles.includes('underline') ? "default" : "outline"}
            size="icon"
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button 
            onClick={() => handleAlignment('Left')} 
            variant={activeStyles.includes('alignLeft') ? "default" : "outline"}
            size="icon"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleAlignment('Center')} 
            variant={activeStyles.includes('alignCenter') ? "default" : "outline"}
            size="icon"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleAlignment('Right')} 
            variant={activeStyles.includes('alignRight') ? "default" : "outline"}
            size="icon"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleAlignment('Full')} 
            variant={activeStyles.includes('alignJustify') ? "default" : "outline"}
            size="icon"
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings and Paragraph */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button 
            onClick={() => handleFormat('p')} 
            variant={activeBlock === 'p' ? "default" : "outline"}
            size="sm"
            title="Paragraph"
          >
            P
          </Button>
          <Button 
            onClick={() => handleFormat('h1')} 
            variant={activeBlock === 'h1' ? "default" : "outline"}
            size="sm"
            title="Heading 1"
          >
            H1
          </Button>
          <Button 
            onClick={() => handleFormat('h2')} 
            variant={activeBlock === 'h2' ? "default" : "outline"}
            size="sm"
            title="Heading 2"
          >
            H2
          </Button>
          <Button 
            onClick={() => handleFormat('h3')} 
            variant={activeBlock === 'h3' ? "default" : "outline"}
            size="sm"
            title="Heading 3"
          >
            H3
          </Button>
          <Button 
            onClick={() => handleFormat('h4')} 
            variant={activeBlock === 'h4' ? "default" : "outline"}
            size="sm"
            title="Heading 4"
          >
            H4
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button 
            onClick={() => handleList('unordered')} 
            variant={activeStyles.includes('unorderedList') ? "default" : "outline"}
            size="icon"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleList('ordered')} 
            variant={activeStyles.includes('orderedList') ? "default" : "outline"}
            size="icon"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Link Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button 
            onClick={handleLink}
            variant={activeStyles.includes('link') ? "default" : "outline"}
            size="icon"
            title="Create Link"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleUnlink}
            variant="outline"
            size="icon"
            title="Remove Link"
          >
            <Link2Off className="h-4 w-4" />
          </Button>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="ml-auto">
          Save
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 prose dark:prose-invert max-w-none"
        onInput={() => {
          if (editorRef.current) {
            setContent(sanitizeContent(editorRef.current.innerHTML))
          }
          updateActiveStyles()
        }}
        onBlur={updateActiveStyles}
        onFocus={updateActiveStyles}
        onKeyUp={updateActiveStyles}
      />
    </div>
  )
}


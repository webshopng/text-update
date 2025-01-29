'use client'

import { useEffect, useRef } from 'react'

interface ScriptContentProps {
  content: string
  position: 'head' | 'body'
}

export function ScriptContent({ content, position }: ScriptContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !content) return

    // Clear any existing content
    containerRef.current.innerHTML = ''

    // Create a temporary container to parse the script content
    const temp = document.createElement('div')
    temp.innerHTML = content

    // Find all script tags
    const scripts = temp.getElementsByTagName('script')
    
    // Convert HTMLCollection to Array and iterate
    Array.from(scripts).forEach(oldScript => {
      const newScript = document.createElement('script')
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value)
      })
      
      // Copy inline content
      newScript.textContent = oldScript.textContent
      
      // Append the new script to the document body to ensure it executes
      document.body.appendChild(newScript)
    })

    // Handle non-script content
    const nonScriptContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    if (nonScriptContent.trim()) {
      const div = document.createElement('div')
      div.innerHTML = nonScriptContent
      if (containerRef.current) {
        containerRef.current.appendChild(div)
      }
    }
  }, [content])

  return <div ref={containerRef} data-script-position={position} />
}


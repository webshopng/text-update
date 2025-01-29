'use client'

import { useEffect, useRef } from 'react'
import DOMPurify from 'isomorphic-dompurify'

interface AdvertisementProps {
  content: string
  position: 'afterHeader' | 'beforeFooter'
}

export function Advertisement({ content, position }: AdvertisementProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adRef.current || !content) return

    // Configure DOMPurify to allow specific tags and attributes
    const purifyConfig = {
      ALLOWED_TAGS: ['img', 'a', 'div', 'script'],
      ALLOWED_ATTR: ['src', 'alt', 'style', 'href', 'target', 'class', 'id'],
      ADD_TAGS: ['script'],
      ADD_ATTR: ['onclick', 'onerror'],
      WHOLE_DOCUMENT: false,
      RETURN_DOM: false,
      SANITIZE_DOM: true
    }

    // Clean existing content
    adRef.current.innerHTML = ''

    // Function to handle script execution
    const executeScript = (scriptContent: string) => {
      try {
        const fn = new Function(scriptContent)
        fn.call(window)
      } catch (error) {
        console.error('Error executing ad script:', error)
      }
    }

    // Extract scripts and content separately
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    // Handle scripts first
    const scripts = tempDiv.getElementsByTagName('script')
    Array.from(scripts).forEach(script => {
      script.remove() // Remove from content to avoid duplication
      if (script.textContent) {
        // Delay script execution to ensure DOM is ready
        setTimeout(() => executeScript(script.textContent), 0)
      }
    })

    // Sanitize and insert remaining HTML content
    const sanitizedContent = DOMPurify.sanitize(tempDiv.innerHTML, purifyConfig)
    adRef.current.innerHTML = sanitizedContent

    // Add error handling for images
    const images = adRef.current.getElementsByTagName('img')
    Array.from(images).forEach(img => {
      img.onerror = () => {
        console.error('Failed to load image:', img.src)
        img.style.display = 'none' // Hide broken images
      }
    })

    // Ensure links open in new tab and have proper security attributes
    const links = adRef.current.getElementsByTagName('a')
    Array.from(links).forEach(link => {
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
    })

    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''
      }
    }
  }, [content])

  return (
    <div className="w-full">
      <div 
        ref={adRef} 
        data-ad-position={position} 
        className="max-w-[728px] mx-auto"
        style={{
          minHeight: '50px',
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
          display: 'block' // Ensure container is block-level
        }}
      />
    </div>
  )
}


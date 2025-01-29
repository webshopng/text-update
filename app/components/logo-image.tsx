"use client"

import Image from "next/image"
import { useState } from "react"

interface LogoImageProps {
  src: string
}

export function LogoImage({ src }: LogoImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="size-5 text-white"
      >
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    )
  }

  return (
    <Image
      src={src}
      alt="Logo"
      width={32}
      height={32}
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  )
}


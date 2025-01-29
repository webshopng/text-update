"use client"

import { Type } from 'lucide-react'

interface ClientLogoProps {
  alt: string
}

export function ClientLogo({ alt }: ClientLogoProps) {
  return (
    <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
      <Type className="size-5 text-white" />
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { defaultMetadata, PageMetadata } from '@/lib/metadata'

export function MetadataManager() {
  const [selectedPage, setSelectedPage] = useState<string>('home')
  const [pageMetadata, setPageMetadata] = useState<PageMetadata>(defaultMetadata.home)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch(`/api/admin/get-metadata?page=${selectedPage}`)
      const data = await response.json()
      setPageMetadata(data)
    }
    fetchMetadata()
  }, [selectedPage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/update-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: selectedPage, metadata: pageMetadata }),
      })
      if (response.ok) {
        setMessage('Metadata updated successfully')
      } else {
        setMessage('Failed to update metadata')
      }
    } catch (error) {
      setMessage('An error occurred while updating metadata')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Metadata</h2>
      <Select onValueChange={setSelectedPage} value={selectedPage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a page" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(defaultMetadata).map((page) => (
            <SelectItem key={page} value={page}>
              {page}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="pageTitle">Page Title</Label>
          <Input
            id="pageTitle"
            value={pageMetadata.pageTitle}
            onChange={(e) => setPageMetadata({ ...pageMetadata, pageTitle: e.target.value, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="pageDescription">Page Description</Label>
          <Input
            id="pageDescription"
            value={pageMetadata.pageDescription}
            onChange={(e) => setPageMetadata({ ...pageMetadata, pageDescription: e.target.value, description: e.target.value })}
          />
        </div>
        <Button type="submit">Update Metadata</Button>
      </form>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}


"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

interface ToolsSearchProps {
  onSearch: (search: string) => void
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export function ToolsSearch({ onSearch, searchValue, setSearchValue }: ToolsSearchProps) {
  // const [searchValue, setSearchValue] = useState('')
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/contact');
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-[1400px] mx-auto mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          className="pl-10 bg-white dark:bg-zinc-900"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Button onClick={handleSearchClick} className="bg-blue-600 hover:bg-blue-700 text-white">
        Suggest a tool
      </Button>
    </div>
  )
}


import { Star, MoreHorizontal } from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ 
  title, 
  description
}: PageHeaderProps) {
  return (
    <div className="border-b bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm w-full">
      <div className="container max-w-[1400px] mx-auto">
        <div className="flex flex-col space-y-4 py-6 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              {title}
              <Star className="h-5 w-5 text-zinc-400 hover:text-zinc-600 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal className="h-5 w-5 text-zinc-400 hover:text-zinc-600 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Rate this tool
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Email me free tools like this
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </h1>
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  )
}


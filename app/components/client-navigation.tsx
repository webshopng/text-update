"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronUp, Calculator } from 'lucide-react'

interface ClientNavigationProps {
content?: {
logoText?: string;
};
toolCategories: {
title: string;
tools: {
name: string;
href: string;
}[];
}[];
}

export function ClientNavigation({ content, toolCategories }: ClientNavigationProps) {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

useEffect(() => {
if (mobileMenuOpen) {
document.body.classList.add('mobile-menu-open')
} else {
document.body.classList.remove('mobile-menu-open')
}

return () => {
document.body.classList.remove('mobile-menu-open')
}
}, [mobileMenuOpen])

const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

const toggleDropdown = (category: string) => {
setOpenDropdowns(prev =>
prev.includes(category)
? prev.filter(item => item !== category)
: [...prev, category]
)
}

const isDropdownOpen = (category: string) => openDropdowns.includes(category)

return (
<>
<button
className="md:hidden cursor-pointer"
onClick={toggleMobileMenu}
aria-label="Toggle mobile menu"
>
{mobileMenuOpen ? (
<X className="h-6 w-6" />
) : (
<Menu className="h-6 w-6" />
)}
</button>

{/* Mobile Menu */}
{mobileMenuOpen && (
<>
<div className="mobile-menu-backdrop" onClick={toggleMobileMenu} />
<div className="mobile-menu">
<div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
<div className="flex justify-between items-center">
<Link href="/" className="flex items-center space-x-2" onClick={toggleMobileMenu}>
{/* Updated Logo */}
<div className="size-7 rounded-lg bg-blue-600 flex items-center justify-center">
<Calculator className="size-4 text-white" />
</div>
<span className="font-semibold text-lg">{content?.logoText || 'Calculator Tools'}</span>
</Link>
<button onClick={toggleMobileMenu} aria-label="Close mobile menu">
<X className="h-5 w-5" />
</button>
</div>
</div>
<nav className="px-4 py-2 space-y-1">
{toolCategories.map((category) => (
<div key={category.title} className="border-b border-gray-200 dark:border-gray-700 py-2">
<button
onClick={() => toggleDropdown(category.title)}
className="flex justify-between items-center w-full py-1 text-left text-sm font-medium cursor-pointer"
>
<span>{category.title}</span>
{isDropdownOpen(category.title) ? (
<ChevronUp className="h-4 w-4" />
) : (
<ChevronDown className="h-4 w-4" />
)}
</button>
{isDropdownOpen(category.title) && (
<div className="pl-4 mt-1 space-y-1">
{category.tools.map((tool) => (
<Link
key={tool.href}
href={tool.href}
className="block py-1 text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
onClick={toggleMobileMenu}
>
{tool.name}
</Link>
))}
</div>
)}
</div>
))}

{/* Additional static links */}
<Link href="/about" className="block py-2 text-sm cursor-pointer" onClick={toggleMobileMenu}>
About
</Link>
<Link href="/contact" className="block py-2 text-sm cursor-pointer" onClick={toggleMobileMenu}>
Contact
</Link>
<Link href="/terms" className="block py-2 text-sm cursor-pointer" onClick={toggleMobileMenu}>
Terms of Use
</Link>
<Link href="/privacy" className="block py-2 text-sm cursor-pointer" onClick={toggleMobileMenu}>
Privacy Policy
</Link>
</nav>
</div>
</>
)}
</>
)
}


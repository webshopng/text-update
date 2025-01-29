import Link from 'next/link'
import { ChevronRight, Calculator, Clock, Calendar, Hash, Replace, ArrowUpDown, Binary, Database, Sigma, Scale, BracketsIcon as Bra, SplitSquareVertical, Merge, Repeat, FlipVertical, ArrowLeftRight, RotateCcw, Scissors, FileSpreadsheet, FileSymlink, Skull, Type, ArrowUp, TextQuote, Activity, Eraser, FlipHorizontal, RefreshCw, Indent, Outdent, Grid, Search, Shuffle, RotateCw, FileCode, FileText, Dice2, Users, ArrowDown } from 'lucide-react'
import Image from 'next/image'

interface CalculatorIconProps {
  href: string
  name: string
  description?: string
  color: string
  label?: string
}

const iconMap = {
  'basic calculator': <Calculator className="w-6 h-6 text-white" />,
  'scientific calculator': <Sigma className="w-6 h-6 text-white" />,
  'roi calculator': <Scale className="w-6 h-6 text-white" />,
  'compound interest calculator': <Bra className="w-6 h-6 text-white" />,
  'time calculator': <Clock className="w-6 h-6 text-white" />,
  'date calculator': <Calendar className="w-6 h-6 text-white" />,
  'word counter': <Hash className="w-6 h-6 text-white" />,
  'text replace': <Replace className="w-6 h-6 text-white" />,
  'case converter': <ArrowUpDown className="w-6 h-6 text-white" />,
  'number converter': <Binary className="w-6 h-6 text-white" />,
  'number base': <Binary className="w-6 h-6 text-white" />,
  'binary calculator': <Database className="w-6 h-6 text-white" />,
  'text split': <SplitSquareVertical className="w-6 h-6 text-white" />,
  'join text': <Merge className="w-6 h-6 text-white" />,
  'repeat text': <Repeat className="w-6 h-6 text-white" />,
  'upside down text': <FlipVertical className="w-6 h-6 text-white" />,
  'reverse text': <ArrowLeftRight className="w-6 h-6 text-white" />,
  'backwards text': <RotateCcw className="w-6 h-6 text-white" />,
  'truncate text': <Scissors className="w-6 h-6 text-white" />,
  'comma separated values': <FileSpreadsheet className="w-6 h-6 text-white" />,
  'wingdings translator': <FileSymlink className="w-6 h-6 text-white" />,
  'cursed text generator': <Skull className="w-6 h-6 text-white" />,
  'weird text generator': <Type className="w-6 h-6 text-white" />,
  'superscript generator': <ArrowUp className="w-6 h-6 text-white" />,
  'crazy font generator': <TextQuote className="w-6 h-6 text-white" />,
  'typing speed test': <Activity className="w-6 h-6 text-white" />,
  'remove words from text': <Eraser className="w-6 h-6 text-white" />,
  'reverse list online': <ArrowUpDown className="w-6 h-6 text-white" />,
  'mirrored text generator': <FlipHorizontal className="w-6 h-6 text-white" />,
  'open ai tokens to words': <RefreshCw className="w-6 h-6 text-white" />,
  'anthropic ai tokens to words': <RefreshCw className="w-6 h-6 text-white" />,
  'gemini ai tokens to words': <RefreshCw className="w-6 h-6 text-white" />,
  'mistral ai tokens to words': <RefreshCw className="w-6 h-6 text-white" />,
  'indentation rich text editor': <Type className="w-6 h-6 text-white" />,
  'indent text online': <Indent className="w-6 h-6 text-white" />,
  'unindent text online': <Outdent className="w-6 h-6 text-white" />,
  'scrabble board maker': <Grid className="w-6 h-6 text-white" />,
  'scrabble word maker': <Search className="w-6 h-6 text-white" />,
  'add text to each line': <Type className="w-6 h-6 text-white" />,
  'text to morse code': <Type className="w-6 h-6 text-white" />,
  'online txt shuffle': <Shuffle className="w-6 h-6 text-white" />,
  'text rotator online tool': <RotateCw className="w-6 h-6 text-white" />,
  'text to hexl': <FileCode className="w-6 h-6 text-white" />,
  'hex to text': <FileCode className="w-6 h-6 text-white" />,
  'lorem ipsum generator': <FileText className="w-6 h-6 text-white" />,
  'fancy text generator': <Type className="w-6 h-6 text-white" />,
  'remove line breaks': <ArrowDown className="w-6 h-6 text-white" />,
  'remove white space': <Eraser className="w-6 h-6 text-white" />,
  'online sentence counter': <FileText className="w-6 h-6 text-white" />,
  'text to html generator': <FileCode className="w-6 h-6 text-white" />,
  'sand table design maker': <Grid className="w-6 h-6 text-white" />,
  'random choice generator': <Dice2 className="w-6 h-6 text-white" />,
  'random group generator': <Users className="w-6 h-6 text-white" />,
}

export function CalculatorIcon({ href, name, description, color, label }: CalculatorIconProps) {
  const icon = iconMap[name.toLowerCase()] || <Calculator className="w-6 h-6 text-white" />

  return (
    <Link
      href={href}
      className="group block p-4 rounded-lg bg-card transition-all hover:bg-muted"
    >
      {label && (
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium tracking-wide text-primary-foreground bg-primary rounded-full">
          {label}
        </span>
      )}
      <div className="flex items-start gap-4 p-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-medium text-base">
            {name}
          </h3>
          {description && (
            <p className="text-muted-foreground text-xs mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}


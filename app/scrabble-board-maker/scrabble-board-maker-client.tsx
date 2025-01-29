"use client"

import { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Trash2, ClipboardPaste, Grid, Download } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StyledContent } from '@/app/components/styled-content'

interface ScrabbleBoardMakerClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

const BOARD_SIZE = 15;
const DOUBLE_LETTER_SCORES = [
  [3, 0], [11, 0], [6, 2], [8, 2], [0, 3], [7, 3], [14, 3],
  [2, 6], [6, 6], [8, 6], [12, 6], [3, 7], [11, 7], [0, 11],
  [7, 11], [14, 11], [6, 12], [8, 12], [3, 14], [11, 14]
];
const TRIPLE_LETTER_SCORES = [
  [5, 1], [9, 1], [1, 5], [5, 5], [9, 5], [13, 5],
  [1, 9], [5, 9], [9, 9], [13, 9], [5, 13], [9, 13]
];
const DOUBLE_WORD_SCORES = [
  [1, 1], [13, 1], [2, 2], [12, 2], [3, 3], [11, 3],
  [4, 4], [10, 4], [4, 10], [10, 10], [3, 11], [11, 11],
  [2, 12], [12, 12], [1, 13], [13, 13]
];
const TRIPLE_WORD_SCORES = [[0, 0], [7, 0], [14, 0], [0, 7], [14, 7], [0, 14], [7, 14], [14, 14]];

export function ScrabbleBoardMakerClient({ content }: ScrabbleBoardMakerClientProps) {
  const [boardState, setBoardState] = useState<string[][]>(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill('')));
  const [inputWord, setInputWord] = useState('');
  const [selectedRow, setSelectedRow] = useState(7);
  const [selectedCol, setSelectedCol] = useState(7);
  const [direction, setDirection] = useState('horizontal');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePlaceWord = useCallback(() => {
    setError('');
    if (!inputWord) {
      setError('Please enter a word to place on the board.');
      return;
    }

    const newBoardState = [...boardState];
    const word = inputWord.toUpperCase();

    if (direction === 'horizontal') {
      if (selectedCol + word.length > BOARD_SIZE) {
        setError('Word does not fit on the board horizontally.');
        return;
      }
      for (let i = 0; i < word.length; i++) {
        newBoardState[selectedRow][selectedCol + i] = word[i];
      }
    } else {
      if (selectedRow + word.length > BOARD_SIZE) {
        setError('Word does not fit on the board vertically.');
        return;
      }
      for (let i = 0; i < word.length; i++) {
        newBoardState[selectedRow + i][selectedCol] = word[i];
      }
    }

    setBoardState(newBoardState);
    setInputWord('');
  }, [inputWord, selectedRow, selectedCol, direction, boardState]);

  const handleClear = useCallback(() => {
    setBoardState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill('')));
    setInputWord('');
    setError('');
  }, []);

  const handleExport = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 30;
    canvas.width = BOARD_SIZE * cellSize;
    canvas.height = BOARD_SIZE * cellSize;

    // Draw the board
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the grid
    ctx.strokeStyle = '#000000';
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw special squares
    const drawSpecialSquare = (row: number, col: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    };

    DOUBLE_LETTER_SCORES.forEach(([row, col]) => drawSpecialSquare(row, col, '#87CEFA'));
    TRIPLE_LETTER_SCORES.forEach(([row, col]) => drawSpecialSquare(row, col, '#4169E1'));
    DOUBLE_WORD_SCORES.forEach(([row, col]) => drawSpecialSquare(row, col, '#FFA07A'));
    TRIPLE_WORD_SCORES.forEach(([row, col]) => drawSpecialSquare(row, col, '#FF4500'));

    // Draw letters
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (boardState[row][col]) {
          ctx.fillText(boardState[row][col], col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
        }
      }
    }

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'scrabble_board.png';
    link.click();
  }, [boardState]);

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Scrabble Board Maker"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="input-word">Word to Place</Label>
                <Input
                  id="input-word"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  placeholder="Enter word..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="direction">Direction</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger id="direction" className="mt-1">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                    <SelectItem value="vertical">Vertical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="row">Row (0-14)</Label>
                <Input
                  id="row"
                  type="number"
                  min="0"
                  max="14"
                  value={selectedRow}
                  onChange={(e) => setSelectedRow(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="column">Column (0-14)</Label>
                <Input
                  id="column"
                  type="number"
                  min="0"
                  max="14"
                  value={selectedCol}
                  onChange={(e) => setSelectedCol(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handlePlaceWord} className="flex-1">
                <Grid className="w-4 h-4 mr-2" />
                Place Word
              </Button>
              <Button onClick={handleClear} variant="outline" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Board
              </Button>
              <Button onClick={handleExport} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Board
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {boardState.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => {
                        let bgColor = 'bg-white dark:bg-zinc-800';
                        if (DOUBLE_LETTER_SCORES.some(([r, c]) => r === rowIndex && c === colIndex)) {
                          bgColor = 'bg-blue-200 dark:bg-blue-800';
                        } else if (TRIPLE_LETTER_SCORES.some(([r, c]) => r === rowIndex && c === colIndex)) {
                          bgColor = 'bg-blue-300 dark:bg-blue-700';
                        } else if (DOUBLE_WORD_SCORES.some(([r, c]) => r === rowIndex && c === colIndex)) {
                          bgColor = 'bg-red-200 dark:bg-red-800';
                        } else if (TRIPLE_WORD_SCORES.some(([r, c]) => r === rowIndex && c === colIndex)) {
                          bgColor = 'bg-red-300 dark:bg-red-700';
                        }
                        return (
                          <td key={colIndex} className={`border border-gray-300 dark:border-gray-600 w-8 h-8 text-center ${bgColor}`}>
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Empty Board</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Empty Scrabble Board
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Placed Word</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">After:</p>
          <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 font-bold text-2xl">
            S C R A B B L E
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Exported Board</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Result:</p>
          <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <img src="/placeholder.svg?height=128&width=128" alt="Exported Scrabble Board" className="max-w-full max-h-full" />
          </div>
        </div>
      </div>

      {content.content && (
        <div className="mt-12 space-y-8">
          <StyledContent content={content.content} />
        </div>
      )}
    </>
  )
}


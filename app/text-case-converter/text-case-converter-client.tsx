'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StyledContent } from '@/app/components/styled-content'
import { Copy, Trash2, ClipboardPaste, Type } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

interface TextCaseConverterClientProps {
  content: {
    title?: string;
    description?: string;
    content?: string;
  }
}

export function TextCaseConverterClient({ content }: TextCaseConverterClientProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");
  const [conversionType, setConversionType] = useState("upper-case");
  const [includeSpaces, setIncludeSpaces] = useState(false);
  const [startWithSecondLetter, setStartWithSecondLetter] = useState(false);

  const handleConvert = useCallback(() => {
    setError("");
    if (!inputText) {
      setError("Please enter some text to convert.");
      return;
    }
  
    let text = inputText;
  
    const handleAlternatingCase = (text: string) => {
      let count = 0;
      return text
        .split("\n")
        .map((line) => {
          return line
            .split("")
            .map((char, index) => {
              if (char === " " && !includeSpaces) {
                return char;
              }
              if (startWithSecondLetter && index > 0) {
                if (count % 2 === 0) {
                  char = char.toUpperCase();
                } else {
                  char = char.toLowerCase();
                }
                count++;
              } else if (!startWithSecondLetter) {
                if (count % 2 === 0) {
                  char = char.toUpperCase();
                } else {
                  char = char.toLowerCase();
                }
                count++;
              }
              return char;
            })
            .join("");
        })
        .join("\n");
    };
  
    const handleFirstLetterEachWord = (text: string) => {
      return text
        .split("\n")
        .map((line) => {
          return line
            .split(" ")
            .map((word, index) => {
              if (index === 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
              } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
              }
            })
            .join(" ");
        })
        .join("\n");
    };

    const toTitleCase = (text: string) => {
      return text
        .toLowerCase()
        .replace(/\b[a-zA-Z]/g, (char) => char.toUpperCase());
    };

    const toSentenceCase = (text: string) => {
      text = text.toLowerCase();

      const sentences = text.split(/([.?!]\s*)/).filter(Boolean);

      const capitalizedSentences = sentences.map((sentence, index) => {
          if (index === 0 || sentence[0] !== ' ') {
              return sentence.charAt(0).toUpperCase() + sentence.slice(1);
          }
          return sentence;
      });

      return capitalizedSentences.join('');
    };
    
    const handleLastLetterEachWord = (text: string) => {
      return text
        .split("\n")
        .map((line) => {
          return line
            .split(" ")
            .map((word) => {
              if (word.length > 0) {
                const lastIndex = word.length - 1;
                return word.slice(0, lastIndex) + word.charAt(lastIndex).toUpperCase();
              }
              return word;
            })
            .join(" ");
        })
        .join("\n");
    };    
  
    if (conversionType === "alternating") {
      text = handleAlternatingCase(text);
    } else if (conversionType === "last-letter") {
      text = handleLastLetterEachWord(text);
    } else if (conversionType == "upper-case") {
      text = inputText.toUpperCase();
    } else if (conversionType == "lower-case") {
      text = inputText.toLowerCase();
    } else if (conversionType == "sentence") {
      text = toSentenceCase(text);
    } else if (conversionType == "title-case") {
      text = toTitleCase(text);
    }
  
    setOutputText(text);
  }, [inputText, conversionType, includeSpaces, startWithSecondLetter]);
  

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText);
  }, [outputText]);

  const handleClear = useCallback(() => {
    setInputText("");
    setOutputText("");
    setError("");
  }, []);

  return (
    <>
      <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
            {content.title || "Text Case Converter"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="input-text">Input Text</Label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[200px] resize-y focus-visible:ring-0 bg-white dark:bg-zinc-900 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-base p-4 mt-2"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="conversion-type">Select Conversion Type</Label>
              <select
                id="conversion-type"
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
                className="w-full rounded-lg p-2"
              >

                <option value="upper-case">Upper Case</option>
                <option value="lower-case">Lower Case</option>
                <option value="sentence">Sentence Case</option>
                <option value="title-case">Title Case</option>
                <option value="alternating">Alternating</option>
                <option value="last-letter">Last letter of each word</option>
                
              </select>
            </div>

            {conversionType === "alternating" && (
              <div className="space-y-2">
                <div>
                  <input
                    type="checkbox"
                    id="include-spaces"
                    checked={includeSpaces}
                    onChange={() => setIncludeSpaces(!includeSpaces)}
                  />
                  <label htmlFor="include-spaces" className="ml-2">
                    Include spaces and line breaks in count
                  </label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="start-with-second-letter"
                    checked={startWithSecondLetter}
                    onChange={() => setStartWithSecondLetter(!startWithSecondLetter)}
                  />
                  <label htmlFor="start-with-second-letter" className="ml-2">
                    Begin with second letter
                  </label>
                </div>
              </div>
            )}

            <Button
              onClick={handleConvert}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Type className="h-4 w-4 mr-2" />
              Convert text case
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {outputText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="output-text">Result</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  className="min-h-[100px] resize-none bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample component boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Upper Case</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"HELLO WORLD"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Lower Case</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"HELLO WORLD"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Sentence Case</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world. hello world!"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello world. Hello world!"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Alternating Case (Default, First Letter)</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"HeLlO wOrLd"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Alternating Case (Start with Second Letter)</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hElLo WoRlD"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Last Letter of Each Word</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hello world"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hellO worlD"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Mixed Case to Title Case</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"hELLo wORLd"}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {"Hello World"}
          </pre>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Multiple Lines</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Before:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {`line 1
line 2
line 3`}
          </pre>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">After:</p>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {`Line 1
Line 2
Line 3`}
          </pre>
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

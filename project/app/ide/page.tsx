"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, FolderIcon, LayoutPanelLeft, Settings, Terminal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {defaultCode} from './defaultcode'
interface Language {
  id: number;
  name: string;
  extension: string;
}

const languages: Language[] = [
  { id: 45, name: "Assembly (NASM 2.14.02)", extension: "asm" },
  { id: 46, name: "Bash (5.0.0)", extension: "sh" },
  { id: 47, name: "Basic (FBC 1.07.1)", extension: "bas" },
  { id: 48, name: "C (GCC 7.4.0)", extension: "c" },
  { id: 52, name: "C++ (GCC 7.4.0)", extension: "cpp" },
  { id: 51, name: "C# (Mono 6.6.0.161)", extension: "cs" },
  { id: 54, name: "C++ (GCC 9.2.0)", extension: "cpp" },
  { id: 60, name: "Go (1.13.5)", extension: "go" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", extension: "java" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)", extension: "js" },
  { id: 78, name: "Kotlin (1.3.70)", extension: "kt" },
  { id: 64, name: "Lua (5.3.5)", extension: "lua" },
  { id: 79, name: "Objective-C (Clang 7.0.1)", extension: "m" },
  { id: 65, name: "OCaml (4.09.0)", extension: "ml" },
  { id: 67, name: "Pascal (FPC 3.0.4)", extension: "pas" },
  { id: 68, name: "PHP (7.4.1)", extension: "php" },
  { id: 71, name: "Python (3.8.1)", extension: "py" },
  { id: 72, name: "Ruby (2.7.0)", extension: "rb" },
  { id: 73, name: "Rust (1.40.0)", extension: "rs" },
  { id: 81, name: "Scala (2.13.2)", extension: "scala" },
  { id: 82, name: "SQL (SQLite 3.27.2)", extension: "sql" },
  { id: 83, name: "Swift (5.2.3)", extension: "swift" },
  { id: 74, name: "TypeScript (3.7.4)", extension: "ts" }
];



export default function IDEPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("54");
  const [folderName, setFolderName] = useState("src");
  const [code, setCode] = useState(defaultCode[54]);
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("main.cpp");

  useEffect(() => {
    const savedLanguageId = localStorage.getItem("selectedLanguageId");
    if (savedLanguageId) {
      setSelectedLanguage(savedLanguageId);
      updateLanguageSettings(savedLanguageId);
    }

    const savedFolderName = localStorage.getItem("folderName");
    if (savedFolderName) {
      setFolderName(savedFolderName);
    }
  }, []);

  const updateLanguageSettings = (languageId: string) => {
    const language = languages.find(lang => lang.id.toString() === languageId);
    if (language) {
      setFileName(`main.${language.extension}`);
      setCode(defaultCode[language.id] || "// Write your code here");
    }
  };

  const handleLanguageChange = (value: string) => {
    localStorage.setItem("selectedLanguageId", value);
    setSelectedLanguage(value);
    updateLanguageSettings(value);
  };

  const handleFolderNameChange = (event: React.FocusEvent<HTMLSpanElement>) => {
    const newName = event.target.innerText;
    setFolderName(newName);
    localStorage.setItem("folderName", newName);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const runCode = async () => {
    const headers = {
      'content-type': 'application/json',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'x-rapidapi-key': '78a6e4d3e7msh23a045e979b827cp19bccbjsn1eae786e5061'
    };
  
    try {
      const submitResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          language_id: parseInt(selectedLanguage),
          source_code: code,
          stdin: "hello world"
        })
      });
  
      const submitData = await submitResponse.json();
      const token = submitData.token;
  
      let resultData;
      let attempts = 0;
      const maxAttempts = 5;
  
      while (attempts < maxAttempts) {
        const getResultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          method: 'GET',
          headers: headers
        });
  
        resultData = await getResultResponse.json();
  
        if (resultData.status.id !== 2) { // Not processing
          break;
        }
  
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for 4 seconds
      }
  
      setOutput(resultData.stdout || resultData.stderr || "No output");
    } catch (error) {
      console.error('Error:', error);
      setOutput("An error occurred while running the code.");
    }
  };
  

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <FileIcon className="h-5 w-5" />
            <span className="font-medium">{fileName}</span>
          </div>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id.toString()}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={runCode}>Run</Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-full border-r bg-muted/40">
            <div className="p-2 font-medium">Explorer</div>
            <ScrollArea className="h-[calc(100vh-6rem)]">
              <div className="p-2">
                <div className="flex items-center space-x-2 py-1">
                  <FolderIcon className="h-4 w-4" />
                  <span
                    contentEditable
                    onBlur={handleFolderNameChange}
                    suppressContentEditableWarning
                  >
                    {folderName}
                  </span>
                </div>
                <div className="flex items-center space-x-2 py-1 pl-4">
                  <FileIcon className="h-4 w-4" />
                  <span>{fileName}</span>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Editor */}
        <ResizablePanel defaultSize={60}>
          <div className="h-full bg-background">
            <ScrollArea className="h-[calc(100vh-6rem)]">
              <textarea
                className="w-full h-full p-4 text-sm font-mono bg-transparent resize-none outline-none"
                value={code}
                onChange={handleCodeChange}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={20}>
          <Tabs defaultValue="output" className="h-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-muted/40">
              <TabsTrigger value="terminal" className="data-[state=active]:bg-background">
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </TabsTrigger>
              <TabsTrigger value="output" className="data-[state=active]:bg-background">
                <LayoutPanelLeft className="h-4 w-4 mr-2" />
                Output
              </TabsTrigger>
            </TabsList>
            <TabsContent value="terminal" className="h-[calc(100vh-6rem)] border-none p-0">
              <ScrollArea className="h-full bg-black text-white">
                <div className="p-4 font-mono text-sm">
                  <p>$ npm install</p>
                  <p className="text-green-400">✓ Packages installed successfully</p>
                  <p>$ _</p>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="output" className="h-[calc(100vh-6rem)] border-none p-0">
              <ScrollArea className="h-full">
                <pre className="p-4 font-mono text-sm">{output}</pre>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

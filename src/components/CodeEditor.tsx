import { useState } from 'react';
import Editor from '@monaco-editor/react';

type Language = 'typescript' | 'javascript' | 'python' | 'java' | 'cpp' | 'c' | 'csharp' | 'go' | 'rust' | 'php';

type OutputType = 'success' | 'error' | 'warning' | 'info';

interface OutputMessage {
  type: OutputType;
  message: string;
}

type CodeEditorProps = {
  initialCode: string;
  language: Language;
  onChange?: (value: string | undefined) => void;
  onRun?: (code: string) => void;
};

const languageLabels: Record<Language, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP'
};

export default function CodeEditor({ initialCode, language, onChange, onRun }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [outputs, setOutputs] = useState<OutputMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    if (onChange) {
      onChange(value);
    }
  };

  const addOutput = (type: OutputType, message: string) => {
    setOutputs(prev => [...prev, { type, message }]);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutputs([{ type: 'info', message: 'Running code...\n' }]);
    
    try {
      const result = await simulateCodeExecution(code, language);
      addOutput('success', result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Warning:')) {
          addOutput('warning', error.message);
        } else {
          addOutput('error', `Error: ${error.message}`);
        }
      } else {
        addOutput('error', 'Unknown error occurred');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const getOutputColor = (type: OutputType): string => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-[400px] border border-gray-300 dark:border-gray-600 rounded-t-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        />
      </div>
      
      {/* Terminal Output */}
      <div className="h-[200px] bg-gray-900 rounded-b-lg p-4 overflow-y-auto font-mono text-sm">
        {outputs.map((output, index) => (
          <pre key={index} className={`${getOutputColor(output.type)} whitespace-pre-wrap mb-2`}>
            {output.message}
          </pre>
        ))}
      </div>
      
      {/* Run Button */}
      <button
        onClick={handleRunCode}
        disabled={isRunning}
        className={`mt-4 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
          isRunning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        } text-white transition-colors`}
      >
        {isRunning ? 'Running...' : 'Run Code'}
      </button>
    </div>
  );
}

// Simulate code execution with different outputs based on language
async function simulateCodeExecution(code: string, language: Language): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate different scenarios
      const rand = Math.random();
      
      if (rand < 0.6) {
        resolve(`[${languageLabels[language]} Output]:\n${code}\n\nExecution successful!\nResult: Sample output for ${languageLabels[language]} code.`);
      } else if (rand < 0.8) {
        reject(new Error('Warning: Potential memory leak detected in line 5'));
      } else {
        reject(new Error(`Compilation error in ${languageLabels[language]}: Syntax error at line 3`));
      }
    }, 1000);
  });
}

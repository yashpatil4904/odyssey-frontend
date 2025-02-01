import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { X, Play, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  timeLimit: number;
  memoryLimit: number;
}

const sampleProblem: Problem = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    }
  ],
  testCases: [
    {
      input: '[2,7,11,15]\n9',
      expectedOutput: '[0,1]'
    },
    {
      input: '[3,2,4]\n6',
      expectedOutput: '[1,2]'
    }
  ],
  timeLimit: 1000,
  memoryLimit: 16
};

const starterCode = `function twoSum(nums, target) {
  // Write your code here
};`;

interface Props {
  onClose: () => void;
}

export default function ClutchModeModal({ onClose }: Props) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal>();

  useEffect(() => {
    if (terminalRef.current && !terminal.current) {
      terminal.current = new Terminal({
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff'
        }
      });
      const fitAddon = new FitAddon();
      terminal.current.loadAddon(fitAddon);
      terminal.current.open(terminalRef.current);
      fitAddon.fit();
    }

    return () => {
      terminal.current?.dispose();
    };
  }, []);

  const runCode = async () => {
    setIsRunning(true);
    terminal.current?.clear();
    terminal.current?.writeln('Running test cases...\r\n');

    try {
      // Create a function from the code
      const fn = new Function('nums', 'target', `
        ${code}
        return twoSum(nums, target);
      `);

      // Run test cases
      let allPassed = true;
      for (const [index, testCase] of sampleProblem.testCases.entries()) {
        terminal.current?.writeln(`Test case ${index + 1}:`);
        terminal.current?.writeln(`Input: ${testCase.input}`);
        
        const [nums, target] = testCase.input.split('\n').map(line => 
          line.includes('[') ? JSON.parse(line) : parseInt(line)
        );

        try {
          const result = fn(nums, target);
          const passed = JSON.stringify(result) === testCase.expectedOutput;
          
          terminal.current?.writeln(
            `Output: ${JSON.stringify(result)}\r\n` +
            `Expected: ${testCase.expectedOutput}\r\n` +
            `${passed ? '\x1b[32mPassed ✓' : '\x1b[31mFailed ✗'}\x1b[0m\r\n`
          );

          allPassed = allPassed && passed;
        } catch (error) {
          terminal.current?.writeln(`\x1b[31mError: ${error.message}\x1b[0m\r\n`);
          allPassed = false;
        }
      }

      if (allPassed) {
        toast.success('🎉 All test cases passed! Double XP earned!');
      } else {
        toast.error('Some test cases failed. Try again!');
      }
    } catch (error) {
      terminal.current?.writeln(`\x1b[31mError: ${error.message}\x1b[0m`);
    }

    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">{sampleProblem.title}</h2>
            <span className={`text-sm px-2 py-1 rounded ${
              sampleProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              sampleProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {sampleProblem.difficulty}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Problem Description */}
          <div className="w-1/3 p-4 border-r border-gray-700 overflow-y-auto">
            <div className="prose prose-invert">
              <h3>Problem Description</h3>
              <p>{sampleProblem.description}</p>
              
              <h4>Examples:</h4>
              {sampleProblem.examples.map((example, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
                  <p><strong>Input:</strong> {example.input}</p>
                  <p><strong>Output:</strong> {example.output}</p>
                  {example.explanation && (
                    <p><strong>Explanation:</strong> {example.explanation}</p>
                  )}
                </div>
              ))}

              <div className="mt-4">
                <p><strong>Constraints:</strong></p>
                <ul>
                  <li>Time Limit: {sampleProblem.timeLimit}ms</li>
                  <li>Memory Limit: {sampleProblem.memoryLimit}MB</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor and Terminal */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="h-1/3 border-t border-gray-700">
              <div className="flex items-center justify-between p-2 bg-gray-800">
                <span className="text-gray-300">Terminal</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => terminal.current?.clear()}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className={`flex items-center space-x-2 px-3 py-1 rounded ${
                      isRunning 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span>Run</span>
                  </button>
                </div>
              </div>
              <div ref={terminalRef} className="h-[calc(100%-40px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
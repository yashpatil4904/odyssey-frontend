import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { X, Play, RefreshCw, Timer, Rocket, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import 'xterm/css/xterm.css';

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
  starterCode: string;
}

const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]' }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your code here
}`,
    timeLimit: 1000,
    memoryLimit: 16
  },
  {
    id: 'palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: `Given a string s, return true if it is a palindrome, or false otherwise.
    A string is a palindrome when it reads the same backward as forward.`,
    examples: [
      {
        input: 's = "racecar"',
        output: 'true',
        explanation: 'It reads the same forwards and backwards.'
      }
    ],
    testCases: [
      { input: '"racecar"', expectedOutput: 'true' },
      { input: '"hello"', expectedOutput: 'false' }
    ],
    starterCode: `function isPalindrome(s) {
  // Write your code here
}`,
    timeLimit: 1000,
    memoryLimit: 16
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.
    A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      }
    ],
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5,4,-1,7,8]', expectedOutput: '23' }
    ],
    starterCode: `function maxSubArray(nums) {
  // Write your code here
}`,
    timeLimit: 1000,
    memoryLimit: 16
  }
];

interface Props {
  onClose: () => void;
}

const ClutchModeModal: React.FC<Props> = ({ onClose }) => {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [code, setCode] = useState<string>(selectedProblem.starterCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<string[]>([]);

  const runCode = async (): Promise<void> => {
    setIsRunning(true);
    setOutput([`=== Running Test Cases ===\n`]);

    try {
      const functionName = code.match(/function\s+(\w+)/)?.[1];
      if (!functionName) throw new Error('Could not find function name');

      const originalConsoleLog = console.log;
      const logs: string[] = [];
      
      console.log = (...args: any[]): void => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        logs.push(message);
        originalConsoleLog.apply(console, args);
      };

      const fn = new Function(code + `\nreturn ${functionName};`)();

      let allPassed = true;
      for (const [index, testCase] of selectedProblem.testCases.entries()) {
        setOutput(prev => [...prev, `Test Case ${index + 1}:`]);
        setOutput(prev => [...prev, `Input: ${testCase.input}`]);
        
        try {
          const args = testCase.input.split('\n').map(arg => {
            if (arg.startsWith('"')) return arg.slice(1, -1);
            if (arg.startsWith('[')) return JSON.parse(arg);
            return Number(arg);
          });

          const startTime = performance.now();
          const result = fn(...args);
          const endTime = performance.now();
          const executionTime = endTime - startTime;

          const resultStr = typeof result === 'object' ? JSON.stringify(result) : result.toString();
          const passed = resultStr === testCase.expectedOutput;
          
          setOutput(prev => [
            ...prev,
            `Output: ${resultStr}`,
            `Expected: ${testCase.expectedOutput}`,
            `Time: ${executionTime.toFixed(2)}ms`,
            passed ? '✓ Passed\n' : '✗ Failed\n'
          ]);

          allPassed = allPassed && passed;
        } catch (error) {
          if (error instanceof Error) {
            setOutput(prev => [...prev, `Error: ${error.message}\n`]);
          }
          allPassed = false;
        }
      }

      console.log = originalConsoleLog;

      if (allPassed) {
        setOutput(prev => [...prev, `=== All Test Cases Passed! ===`]);
        toast.success('🎉 Clutch! Double XP earned!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setOutput(prev => [...prev, `=== Some Test Cases Failed ===`]);
        toast.error('Try again! You can do it!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setOutput(prev => [...prev, `Error: ${error.message}`]);
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">{selectedProblem.title}</h2>
            <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
              selectedProblem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              selectedProblem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {selectedProblem.difficulty}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Timer className="w-4 h-4 mr-1" />
                {selectedProblem.timeLimit}ms
              </div>
              <div className="flex items-center">
                <Rocket className="w-4 h-4 mr-1" />
                {selectedProblem.memoryLimit}MB
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex min-h-0"> {/* min-h-0 is important for nested flex scroll */}
          {/* Problem Description - Scrollable */}
          <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col min-w-[320px]">
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Problem Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProblem.description}</p>
                
                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Examples:</h4>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
                    <p className="mb-2"><strong>Input:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{example.input}</code></p>
                    <p className="mb-2"><strong>Output:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{example.output}</code></p>
                    {example.explanation && (
                      <p className="text-gray-600"><strong>Explanation:</strong> {example.explanation}</p>
                    )}
                  </div>
                ))}

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mt-6 border border-purple-100">
                  <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Clutch Mode Rules
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Only one submission attempt allowed',
                      'All test cases must pass',
                      'Double XP reward for success',
                      'No hints available'
                    ].map((rule, index) => (
                      <li key={index} className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor and Terminal - Scrollable */}
          <div className="flex-1 flex flex-col min-w-[600px]">
            {/* Editor - Takes remaining height */}
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value: string | undefined) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  automaticLayout: true,
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>

            {/* Terminal Section - Fixed height */}
            <div className="h-[30%] min-h-[200px] bg-[#1e1e1e] flex flex-col">
              <div className="flex items-center justify-between p-3 bg-gray-800">
                <span className="text-gray-300 font-medium">Output Terminal</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOutput(['Click Run to test your solution!'])}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded"
                    title="Clear terminal"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className={`flex items-center space-x-2 px-4 py-1.5 rounded font-medium transition-all ${
                      isRunning 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm custom-scrollbar-dark">
                {output.map((line, index) => (
                  <div key={index} className="text-white mb-1">
                    {line.startsWith('✓') ? (
                      <span className="text-green-400 font-medium">{line}</span>
                    ) : line.startsWith('✗') ? (
                      <span className="text-red-400 font-medium">{line}</span>
                    ) : line.startsWith('Error:') ? (
                      <span className="text-red-400">{line}</span>
                    ) : line.startsWith('===') ? (
                      <span className="text-blue-400 font-medium">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS file
const styles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E1 transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #CBD5E1;
    border-radius: 3px;
  }

  .custom-scrollbar-dark {
    scrollbar-width: thin;
    scrollbar-color: #4B5563 transparent;
  }

  .custom-scrollbar-dark::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar-dark::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar-dark::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border-radius: 3px;
  }
`;

export default ClutchModeModal;
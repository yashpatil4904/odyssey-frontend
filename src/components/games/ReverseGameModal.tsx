import React, { useState } from 'react';
import { X, Send, Users, Brain, Trophy, Clock, Star, Code2 } from 'lucide-react';
import Editor from "@monaco-editor/react";
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

const demoProblems = [
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. Try to do it without creating a new string.\n\nExample:\nInput: 'hello'\nOutput: 'olleh'",
    testCases: JSON.stringify([
      { input: "hello", output: "olleh" },
      { input: "world", output: "dlrow" },
      { input: "OpenAI", output: "IAnepO" }
    ], null, 2),
    difficulty: "Easy",
    creator: "Alex Chen",
    solves: 128,
    timeLimit: "10 minutes",
    xpReward: 100
  },
  {
    title: "Reverse Words",
    description: "Write a function that reverses the order of words in a string. Words are separated by single spaces.\n\nExample:\nInput: 'the sky is blue'\nOutput: 'blue is sky the'",
    testCases: JSON.stringify([
      { input: "the sky is blue", output: "blue is sky the" },
      { input: "hello world", output: "world hello" },
      { input: "coding is fun", output: "fun is coding" }
    ], null, 2),
    difficulty: "Medium",
    creator: "Sarah Kim",
    solves: 89,
    timeLimit: "15 minutes",
    xpReward: 200
  },
  {
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list and return the reversed list.\n\nExample:\nInput: 1->2->3->4->5\nOutput: 5->4->3->2->1",
    testCases: JSON.stringify([
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "[1,2]", output: "[2,1]" },
      { input: "[1]", output: "[1]" }
    ], null, 2),
    difficulty: "Hard",
    creator: "Mike Johnson",
    solves: 45,
    timeLimit: "20 minutes",
    xpReward: 300
  }
];

const defaultEditorValue = `// Example test case format:
[
  {
    "input": "your_input_here",
    "output": "expected_output_here"
  }
]`;

export default function ReverseGameModal({ onClose }: Props) {
  const [step, setStep] = useState<'create' | 'preview' | 'challenge'>('create');
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    testCases: defaultEditorValue,
    solution: ''
  });
  const [showDemoProblems, setShowDemoProblems] = useState(true);

  const handlePublish = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9333EA', '#4F46E5', '#10B981']
    });

    // Add a small delay before closing
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <Code2 className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Reverse Engineering Challenge</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Progress Steps */}
          <div className="flex justify-between px-8 py-6 bg-gray-50">
            {['create', 'preview', 'challenge'].map((s, index) => (
              <div 
                key={s}
                className="flex items-center flex-1"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === s 
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Step {index + 1}</div>
                  <div className="text-gray-900 font-semibold capitalize">{s}</div>
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    index < ['create', 'preview', 'challenge'].indexOf(step)
                      ? 'bg-purple-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 'create' && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Create New Challenge</h3>
                  <p className="text-gray-600 mt-1">Design a reverse engineering puzzle for others to solve</p>
                </div>
                <button
                  onClick={() => setShowDemoProblems(!showDemoProblems)}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  {showDemoProblems ? 'Hide Examples' : 'View Examples'}
                </button>
              </div>

              {showDemoProblems && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {demoProblems.map((demo, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 border hover:border-purple-500/50 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-bold text-gray-900 text-lg">{demo.title}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          demo.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          demo.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {demo.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{demo.description.split('\n')[0]}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {demo.solves} solves
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {demo.timeLimit}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-600" />
                          {demo.xpReward} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-6 bg-white rounded-lg p-6 border">
                <div>
                  <label className="block text-gray-900 mb-2 font-medium">Challenge Title</label>
                  <input
                    type="text"
                    value={problem.title}
                    onChange={(e) => setProblem({ ...problem, title: e.target.value })}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter a descriptive title..."
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2 font-medium">Problem Description</label>
                  <textarea
                    value={problem.description}
                    onChange={(e) => setProblem({ ...problem, description: e.target.value })}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 h-32 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Describe the challenge and provide examples..."
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2 font-medium">Test Cases (JSON format)</label>
                  <Editor
                    height="200px"
                    defaultLanguage="json"
                    theme="vs-dark"
                    value={problem.testCases}
                    onChange={(value) => setProblem({ ...problem, testCases: value || '' })}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 16 },
                      theme: 'vs-dark',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="p-6 space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Test Cases</h4>
                <pre className="text-gray-700">{problem.testCases}</pre>
              </div>
            </div>
          )}

          {step === 'challenge' && (
            <div className="p-6 space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Challenge Friends</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter username or email..."
                  />
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Rewards</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <Trophy className="w-6 h-6 text-yellow-600 mb-2" />
                    <p className="text-gray-900 font-bold">Creator XP</p>
                    <p className="text-gray-600">Earn XP when others solve your challenge</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <Users className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-gray-900 font-bold">Community Badge</p>
                    <p className="text-gray-600">Earn badges for popular challenges</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <div className="flex justify-between">
            {step !== 'create' && (
              <button
                onClick={() => setStep(step === 'challenge' ? 'preview' : 'create')}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 border"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === 'create') setStep('preview');
                else if (step === 'preview') setStep('challenge');
                else handlePublish();
              }}
              className={`px-6 py-2.5 rounded-lg ml-auto flex items-center gap-2 transition-all duration-300
                ${step === 'challenge' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 hover:shadow-lg'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
            >
              {step === 'challenge' ? (
                <>
                  <span>Publish Challenge</span>
                  <Trophy className="w-5 h-5" />
                </>
              ) : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
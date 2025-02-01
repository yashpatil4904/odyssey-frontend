import React, { useState } from 'react';
import { X, Send, Users, Brain, Trophy } from 'lucide-react';
import Editor from "@monaco-editor/react";

interface Props {
  onClose: () => void;
}

export default function ReverseGameModal({ onClose }: Props) {
  const [step, setStep] = useState<'create' | 'preview' | 'challenge'>('create');
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    testCases: '',
    solution: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Create Challenge</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {['create', 'preview', 'challenge'].map((s, index) => (
              <div 
                key={s}
                className="flex items-center"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s 
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-full h-1 mx-2 ${
                    index < ['create', 'preview', 'challenge'].indexOf(step)
                      ? 'bg-purple-600'
                      : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 'create' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">Problem Title</label>
                <input
                  type="text"
                  value={problem.title}
                  onChange={(e) => setProblem({ ...problem, title: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
                  placeholder="Enter a catchy title..."
                />
              </div>
              <div>
                <label className="block text-white mb-2">Problem Description</label>
                <textarea
                  value={problem.description}
                  onChange={(e) => setProblem({ ...problem, description: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 h-32"
                  placeholder="Describe your problem..."
                />
              </div>
              <div>
                <label className="block text-white mb-2">Test Cases</label>
                <Editor
                  height="200px"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={problem.testCases}
                  onChange={(value) => setProblem({ ...problem, testCases: value || '' })}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{problem.description}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4">Test Cases</h4>
                <pre className="text-gray-300">{problem.testCases}</pre>
              </div>
            </div>
          )}

          {step === 'challenge' && (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Challenge Friends</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
                    placeholder="Enter username or email..."
                  />
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4">Rewards</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                    <p className="text-white font-bold">Creator XP</p>
                    <p className="text-gray-400">Earn XP when others solve your challenge</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-white font-bold">Community Badge</p>
                    <p className="text-gray-400">Earn badges for popular challenges</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="flex justify-between">
            {step !== 'create' && (
              <button
                onClick={() => setStep(step === 'challenge' ? 'preview' : 'create')}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === 'create') setStep('preview');
                else if (step === 'preview') setStep('challenge');
                else onClose();
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 ml-auto"
            >
              {step === 'challenge' ? 'Publish Challenge' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
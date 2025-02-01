import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import { challenges } from '../data/challanges';
import { Challenge } from '../types';
import ThemeToggle from '../components/ThemeToggle';

const languages = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
] as const;

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedLanguage, setSelectedLanguage] = useState<typeof languages[number]['id']>('typescript');
  
  const challenge = challenges.find(c => c.id === id);
  
  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge not found</h1>
          <Link to="/dashboard/challenges" className="text-green-500 hover:text-green-600">
            Go back to challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/dashboard/challenges"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Link>
            <ThemeToggle />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{challenge.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}>
              {challenge.difficulty}
            </span>
            <span className="text-gray-600 dark:text-gray-400">{challenge.topic}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Problem Statement</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{challenge.problemStatement}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
              <div className="space-y-4">
                {challenge.examples.map((example, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <p className="font-mono text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Input: </span>
                      <span className="text-gray-900 dark:text-white">{example.input}</span>
                    </p>
                    <p className="font-mono text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Output: </span>
                      <span className="text-gray-900 dark:text-white">{example.output}</span>
                    </p>
                    {example.explanation && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Explanation: </span>
                        {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Constraints</h2>
              <ul className="list-disc list-inside space-y-2">
                {challenge.constraints.map((constraint, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{constraint}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <button
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </button>
            </div>
            <CodeEditor
              initialCode={challenge.starterCode[selectedLanguage]}
              language={selectedLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import { challenges } from '../data/challanges';

const languages = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'c', name: 'C' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'php', name: 'PHP' }
] as const;

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedLanguage, setSelectedLanguage] = useState<typeof languages[number]['id']>('typescript');
  
  const challenge = challenges.find(c => c.id === id);
  
  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Challenge not found</h1>
          <Link to="/dashboard/challenges" className="text-green-500 hover:text-green-600">
            Go back to challenges
          </Link>
        </div>
      </div>
    );
  }

  const handleRunCode = async (code: string) => {
    // Here you would typically send the code to your backend
    console.log('Running code:', code);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/dashboard/challenges"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{challenge.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {challenge.difficulty}
            </span>
            <span className="text-gray-600">{challenge.topic}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Problem Description Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Statement</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{challenge.problemStatement}</p>
          </section>

          {/* Examples Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Examples</h2>
            <div className="space-y-4">
              {challenge.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600">Input: </span>
                    <span className="text-gray-900">{example.input}</span>
                  </p>
                  <p className="font-mono text-sm mb-2">
                    <span className="text-gray-600">Output: </span>
                    <span className="text-gray-900">{example.output}</span>
                  </p>
                  {example.explanation && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Explanation: </span>
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Constraints Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Constraints</h2>
            <ul className="list-disc list-inside space-y-2">
              {challenge.constraints.map((constraint, index) => (
                <li key={index} className="text-gray-700">{constraint}</li>
              ))}
            </ul>
          </section>

          {/* Code Editor Section */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Language Selector */}
            <div className="border-b border-gray-200 p-4">
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {languages.map(lang => (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === lang.id
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="h-[400px]">
              <CodeEditor
                initialCode={challenge.starterCode[selectedLanguage]}
                language={selectedLanguage}
                onRun={handleRunCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
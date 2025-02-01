import { useState } from 'react';
import { BookOpen, Code2, Binary, Network, Database, GitGraph, Youtube, ExternalLink } from 'lucide-react';

interface TopicContent {
  title: string;
  description: string;
  keyPoints: string[];
  codeExample: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  applications: string[];
  videoUrl: string;
  practiceProblems: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    url: string;
  }[];
}

interface DSATopic {
  id: string;
  title: string;
  icon: any;
  content: TopicContent;
}

const dsaTopics: DSATopic[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    icon: Code2,
    content: {
      title: 'Arrays in Data Structures',
      description: 'An array is a collection of similar data elements stored at contiguous memory locations. It is the simplest data structure where each data element can be accessed directly by only using its index number.',
      keyPoints: [
        'Fixed size collection of similar data items',
        'Elements are stored in contiguous memory locations',
        'Can be single dimensional or multi-dimensional',
        'Supports random access of elements using index'
      ],
      codeExample: `// Array declaration and initialization
const arr = [1, 2, 3, 4, 5];

// Accessing elements
console.log(arr[0]); // Output: 1

// Modifying elements
arr[2] = 10;
console.log(arr); // Output: [1, 2, 10, 4, 5]`,
      timeComplexity: 'Access: O(1), Search: O(n), Insertion: O(n), Deletion: O(n)',
      spaceComplexity: 'O(n)',
      applications: [
        'Storing and accessing sequential data',
        'Implementing other data structures like stacks, queues',
        'Database records',
        'Contact lists in phones'
      ],
      videoUrl: 'https://www.youtube.com/embed/1txKPCQN4YU',
      practiceProblems: [
        {
          title: 'Two Sum',
          difficulty: 'Easy',
          url: 'https://leetcode.com/problems/two-sum'
        },
        {
          title: 'Container With Most Water',
          difficulty: 'Medium',
          url: 'https://leetcode.com/problems/container-with-most-water'
        },
        {
          title: 'Trapping Rain Water',
          difficulty: 'Hard',
          url: 'https://leetcode.com/problems/trapping-rain-water'
        }
      ]
    }
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    icon: GitGraph,
    content: {
      title: 'Linked Lists',
      description: 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.',
      keyPoints: [
        'Dynamic size',
        'Non-contiguous memory storage',
        'Efficient insertion and deletion',
        'Types: Singly, Doubly, Circular'
      ],
      codeExample: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}`,
      timeComplexity: 'Access: O(n), Search: O(n), Insertion: O(1), Deletion: O(1)',
      spaceComplexity: 'O(n)',
      applications: [
        'Implementation of stacks and queues',
        'Symbol table management in compiler design',
        'Undo functionality in software',
        'Memory allocation in operating systems'
      ],
      videoUrl: '',
      practiceProblems: []
    }
  },
  // Add more topics as needed...
];

export default function DSALearning() {
  const [selectedTopic, setSelectedTopic] = useState<DSATopic | null>(null);

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Hard':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* DSA Topics Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 h-screen fixed">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            DSA Topics
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {dsaTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                selectedTopic?.id === topic.id
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <topic.icon className="w-5 h-5" />
              <span>{topic.title}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {selectedTopic ? (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {selectedTopic.content.title}
            </h1>
            
            <div className="space-y-8">
              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-gray-600">{selectedTopic.content.description}</p>
              </div>

              {/* Video Tutorial */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Youtube className="w-6 h-6 text-red-600 mr-2" />
                  Video Tutorial
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={selectedTopic.content.videoUrl}
                    className="w-full h-[400px] rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Key Points */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Points</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedTopic.content.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">{point}</li>
                  ))}
                </ul>
              </div>

              {/* Code Example */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Code Example</h2>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{selectedTopic.content.codeExample}</code>
                </pre>
              </div>

              {/* Complexity */}
              {selectedTopic.content.timeComplexity && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Complexity Analysis</h2>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Time Complexity:</span> {selectedTopic.content.timeComplexity}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Space Complexity:</span> {selectedTopic.content.spaceComplexity}
                    </p>
                  </div>
                </div>
              )}

              {/* Practice Problems */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Code2 className="w-6 h-6 text-green-600 mr-2" />
                  Practice Problems
                </h2>
                <div className="grid gap-4">
                  {selectedTopic.content.practiceProblems.map((problem, index) => (
                    <a
                      key={index}
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-800">{problem.title}</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Applications</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedTopic.content.applications.map((app, index) => (
                    <li key={index} className="text-gray-600">{app}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Select a Topic</h2>
            <p>Choose a DSA topic from the sidebar to start learning</p>
          </div>
        )}
      </div>
    </div>
  );
}
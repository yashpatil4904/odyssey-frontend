import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { 
  ArrowLeft,
  ChevronRight,
  Search,
  BookOpen,
  Code2,
  FileText,
  Youtube,
  ExternalLink
} from 'lucide-react';

interface TopicContent {
  title: string;
  description: string;
  videoUrl?: string;
  practiceUrl?: string;
  codeExamples: {
    language: string;
    code: string;
  }[];
  resources: {
    title: string;
    url: string;
  }[];
}

interface DSATopic {
  id: string;
  title: string;
  subtopics: {
    id: string;
    title: string;
    content: TopicContent;
  }[];
}

const dsaTopics: DSATopic[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    subtopics: [
      {
        id: 'introduction',
        title: 'Introduction to Arrays',
        content: {
          title: 'Introduction to Arrays',
          description: 'An array is a collection of items stored at contiguous memory locations...',
          videoUrl: 'https://www.youtube.com/embed/1txKPCQN4YU',
          practiceUrl: 'https://leetcode.com/tag/array/',
          codeExamples: [
            {
              language: 'python',
              code: 'arr = [1, 2, 3, 4, 5]\nprint(arr[0])  # Accessing first element'
            },
            {
              language: 'javascript',
              code: 'const arr = [1, 2, 3, 4, 5];\nconsole.log(arr[0]);  // Accessing first element'
            }
          ],
          resources: [
            {
              title: 'Array Data Structure',
              url: 'https://www.geeksforgeeks.org/array-data-structure/'
            }
          ]
        }
      }
    ]
  },
  // Add more topics...
];

const LearningPath = () => {
  const [selectedTopic, setSelectedTopic] = useState<DSATopic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TopicContent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredTopics = dsaTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 h-screen fixed overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">DSA Topics</h1>
            <button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <nav className="p-4">
          {filteredTopics.map((topic) => (
            <div key={topic.id}>
              <button
                onClick={() => setSelectedTopic(topic)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left"
              >
                <span className="font-medium text-gray-700">{topic.title}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              {selectedTopic?.id === topic.id && (
                <div className="ml-4 mt-2 space-y-2">
                  {topic.subtopics.map((subtopic) => (
                    <button
                      key={subtopic.id}
                      onClick={() => setSelectedSubtopic(subtopic.content)}
                      className="w-full p-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg text-left"
                    >
                      {subtopic.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-80 flex-1 p-8">
        {selectedSubtopic ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{selectedSubtopic.title}</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">{selectedSubtopic.description}</p>

              {selectedSubtopic.videoUrl && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Youtube className="w-5 h-5 text-red-600 mr-2" />
                    Video Tutorial
                  </h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={selectedSubtopic.videoUrl}
                      className="rounded-lg w-full h-[400px]"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Code2 className="w-5 h-5 text-green-600 mr-2" />
                  Code Examples
                </h2>
                {selectedSubtopic.codeExamples.map((example, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <pre className="text-gray-100">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  Additional Resources
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {selectedSubtopic.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-gray-700">{resource.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {selectedSubtopic.practiceUrl && (
                <a
                  href={selectedSubtopic.practiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  Practice Problems
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Select a Topic</h2>
            <p>Choose a topic from the sidebar to start learning</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPath;

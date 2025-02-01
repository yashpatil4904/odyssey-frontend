import { useState } from 'react';
import { ArrowLeft, BookOpen, Code2, Target, FileText } from 'lucide-react';
import DSAResources from '../components/DSAResources';

type IconType = typeof BookOpen;

interface Topic {
  name: string;
  videoUrl: string;
  practiceUrl: string;
  description: string;
  pdfResources: {
    title: string;
    url: string;
  }[];
}

interface Course {
  id: string;
  level: string;
  title: string;
  description: string;
  duration: string;
  topics: Topic[];
  objectives: string[];
  prerequisites: string[];
  icon: IconType;
}

const courses: Course[] = [
  {
    id: 'basics',
    level: 'Beginner',
    title: 'DSA Fundamentals',
    description: 'Master the core concepts of Data Structures and Algorithms',
    duration: '8 weeks',
    topics: [
      {
        name: 'Arrays and Strings',
        videoUrl: 'https://www.youtube.com/embed/1txKPCQN4YU',
        practiceUrl: 'https://leetcode.com/tag/array/',
        description: 'Learn about basic data structures and their operations',
        pdfResources: [
          {
            title: 'Arrays & Strings Guide',
            url: 'https://www.geeksforgeeks.org/array-data-structure/'
          },
          {
            title: 'String Algorithms',
            url: 'https://www.geeksforgeeks.org/string-data-structure/'
          }
        ]
      },
      {
        name: 'Linked Lists',
        videoUrl: 'https://www.youtube.com/embed/N3cWQnBeMog',
        practiceUrl: 'https://leetcode.com/tag/linked-list/',
        description: 'Understanding linked data structures and their implementations',
        pdfResources: [
          {
            title: 'Linked List Complete Guide',
            url: 'https://www.geeksforgeeks.org/data-structures/linked-list/'
          }
        ]
      }
    ],
    objectives: [
      'Understand fundamental data structures',
      'Implement basic algorithms',
      'Analyze time complexities',
      'Solve coding problems'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of loops and functions',
      'Simple mathematics'
    ],
    icon: BookOpen
  }
];

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Beginner');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  if (!selectedCourse) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900">
        <DSAResources />
        <div className="mb-8">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="block w-full max-w-xs px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-green-600 focus:outline-none"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter((course) => course.level === selectedLevel)
            .map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:border-green-600 transition-all group shadow-sm"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-50 dark:bg-gray-700 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-gray-600">
                    <course.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white ml-4">{course.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <div className="text-sm text-green-600">Duration: {course.duration}</div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-900">
      <button
        onClick={handleBackClick}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Courses
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <div className="flex items-center mb-6">
          <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
            <selectedCourse.icon className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{selectedCourse.level} Level</p>
          </div>
        </div>

        <div className="space-y-8">
          {selectedCourse.topics.map((topic, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{topic.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>

              {/* PDF Resources */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                  <FileText className="w-5 h-5 text-green-600 mr-2" />
                  Topic Resources
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.pdfResources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <FileText className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-gray-700 dark:text-gray-200">{resource.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={topic.videoUrl}
                  title={topic.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg w-full h-full"
                />
              </div>

              {/* Practice Link */}
              <a
                href={topic.practiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Practice Problems
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn; 
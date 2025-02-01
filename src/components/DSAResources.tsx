import React from 'react';
import { FileText, Download, BookOpen } from 'lucide-react';

interface DSAResource {
  title: string;
  description: string;
  url: string;
  type: 'sheet' | 'pdf';
}

const resources: DSAResource[] = [
  {
    title: 'Complete DSA Sheet',
    description: 'Curated list of 450+ DSA problems',
    url: 'https://docs.google.com/spreadsheets/d/1MGVBJ8HkRbCnU6EQASjJKCqQE8BWng4qgL0n3vCVOxE/edit#gid=0',
    type: 'sheet'
  },
  {
    title: 'Arrays Master Guide',
    description: 'Comprehensive guide on array problems',
    url: '/resources/arrays-master-guide.pdf',
    type: 'pdf'
  },
  {
    title: 'Graph Algorithms',
    description: 'Complete guide to graph algorithms',
    url: '/resources/graph-algorithms.pdf',
    type: 'pdf'
  },
  {
    title: 'Dynamic Programming',
    description: 'DP patterns and problems',
    url: '/resources/dp-patterns.pdf',
    type: 'pdf'
  }
];

const DSAResources = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <BookOpen className="w-5 h-5 text-green-600 mr-2" />
        DSA Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2">
              {resource.type === 'sheet' ? (
                <FileText className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <Download className="w-5 h-5 text-green-600 mr-2" />
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {resource.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DSAResources; 
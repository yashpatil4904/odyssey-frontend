import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  GitBranch, 
  SortAsc, 
  Workflow, 
  Binary, 
  TreePine,
  Boxes,
  Share2,
  Search,
  Combine
} from 'lucide-react';
import SimulationViewer from '../components/simulations/SimulationViewer';

interface SimulationTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'sorting' | 'graphs' | 'trees' | 'searching';
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
}

const topics: SimulationTopic[] = [
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.',
    icon: Combine,
    category: 'sorting',
    difficulty: 'medium',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'bfs',
    title: 'Breadth First Search',
    description: 'A graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.',
    icon: Network,
    category: 'graphs',
    difficulty: 'medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },
  // Add more topics...
];

export default function Simulations() {
  const [selectedTopic, setSelectedTopic] = useState<SimulationTopic | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTopics = topics.filter(topic => {
    const matchesFilter = filter === 'all' || topic.category === filter;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/[0.02] p-8">
      {!selectedTopic ? (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-50" />
            <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
            <div className="relative">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Algorithm Simulations
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Visualize and understand how different algorithms work through interactive simulations. 
                Select a topic to get started with your learning journey.
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {['all', 'sorting', 'graphs', 'trees', 'searching'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === category
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
                      <topic.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      topic.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
                      topic.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Time: {topic.timeComplexity}</span>
                    <span>Space: {topic.spaceComplexity}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <SimulationViewer 
          topic={selectedTopic} 
          onClose={() => setSelectedTopic(null)} 
        />
      )}
    </div>
  );
} 
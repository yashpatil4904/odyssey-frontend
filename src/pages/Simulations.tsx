import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Combine,
  Fingerprint,
  Layers,
  Shuffle,
  Split,
  Radar,
  Sparkles,
  Zap,
  Code2,
  Brain,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import SimulationViewer from '../components/simulations/SimulationViewer';

interface SimulationTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'sorting' | 'graphs' | 'trees' | 'searching' | 'dynamic' | 'advanced';
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  prerequisites?: string[];
  realWorldUses?: string[];
  videoUrl: string;
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
    spaceComplexity: 'O(n)',
    realWorldUses: ['External sorting', 'Stable sorting in databases'],
    videoUrl: '/videos/merge-sort-demo.mp4'
  },
  {
    id: 'bfs',
    title: 'Breadth First Search',
    description: 'A graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.',
    icon: Network,
    category: 'graphs',
    difficulty: 'medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    realWorldUses: ['Social network connections', 'GPS navigation'],
    videoUrl: '/videos/bfs-demo.mp4'
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    description: 'An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements quickly.',
    icon: Zap,
    category: 'sorting',
    difficulty: 'medium',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    realWorldUses: ['Array sorting', 'Numerical analysis'],
    videoUrl: '/videos/quick-sort-demo.mp4'
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'An efficient algorithm for finding a target value within a sorted array by repeatedly dividing the search space in half.',
    icon: Binary,
    category: 'searching',
    difficulty: 'easy',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    realWorldUses: ['Dictionary lookup', 'Database indexing'],
    videoUrl: '/videos/binary-search-demo.mp4'
  },
  {
    id: 'dfs',
    title: 'Depth First Search',
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    icon: GitBranch,
    category: 'graphs',
    difficulty: 'medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    realWorldUses: ['Maze solving', 'Game state analysis'],
    videoUrl: '/videos/dfs-demo.mp4'
  },
  {
    id: 'heap-sort',
    title: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and sort elements.',
    icon: Layers,
    category: 'sorting',
    difficulty: 'hard',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    realWorldUses: ['Priority queues', 'Operating systems'],
    videoUrl: '/videos/heap-sort-demo.mp4'
  },
  // Add more topics...
];

export default function Simulations() {
  const [selectedTopic, setSelectedTopic] = useState<SimulationTopic | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredTopics = topics.filter(topic => {
    const matchesFilter = filter === 'all' || topic.category === filter;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white p-8">
      {!selectedTopic ? (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header with Animated Background */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 right-0 w-1/3 h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-green-100/50 to-transparent" />
              <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
            </motion.div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-green-600">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    Interactive Learning
                  </span>
                </div>

                <h1 className="text-5xl font-bold text-gray-900">
                  <span className="inline-block">
                    Algorithm
                  </span>
                  {' '}
                  <span className="inline-block relative">
                    Simulations
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-2 bg-green-200/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </span>
                </h1>

                <div className="max-w-3xl space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Visualize and understand how different algorithms work through interactive simulations. 
                    Select a topic to get started with your learning journey.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <Code2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Step-by-Step Visualization</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <Brain className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Interactive Learning</span>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                      whileHover={{ y: -2 }}
                    >
                      <Lightbulb className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Real-World Applications</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="inline-flex items-center gap-2 text-green-600 font-medium cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['all', 'sorting', 'graphs', 'trees', 'searching', 'dynamic', 'advanced'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === category
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="group cursor-pointer"
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.realWorldUses?.map((use, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                      <span>Time: {topic.timeComplexity}</span>
                      <span>Space: {topic.spaceComplexity}</span>
                    </div>
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
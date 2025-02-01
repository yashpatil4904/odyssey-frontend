import { useState, useMemo } from 'react';
import { TrendingUp, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChallengeCard from '../components/ChallengesCard';
import SearchBar from '../components/SearchBar';
import { challenges } from '../data/challanges';
import { TopicStats, HardTopic } from '../types';
import ThemeToggle from '../components/ThemeToggle';

const topics = ['All', 'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Heaps', 'Hash Tables', 'Tries', 'Dynamic Programming'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const trendingTopics: TopicStats[] = [
  { name: 'Dynamic Programming', count: 156 },
  { name: 'Binary Trees', count: 124 },
  { name: 'Graph Algorithms', count: 98 },
  { name: 'Hash Tables', count: 87 },
  { name: 'Tries', count: 45 },
];

const hardTopics: HardTopic[] = [
  { name: 'Red-Black Trees', difficulty: 9.2 },
  { name: 'Network Flow', difficulty: 8.9 },
  { name: 'Advanced Graph Theory', difficulty: 8.7 },
  { name: 'Dynamic Programming', difficulty: 8.5 },
  { name: 'Segment Trees', difficulty: 8.3 },
];

export default function Challenges() {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesTopic = selectedTopic === 'All' || challenge.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
      const matchesSearch = 
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [selectedTopic, selectedDifficulty, searchQuery]);

  const dailyChallenges = useMemo(() => 
    filteredChallenges.filter(c => c.type === 'daily'),
    [filteredChallenges]
  );

  const weeklyChallenges = useMemo(() => 
    filteredChallenges.filter(c => c.type === 'weekly'),
    [filteredChallenges]
  );

  const regularChallenges = useMemo(() => 
    filteredChallenges.filter(c => c.type === 'regular'),
    [filteredChallenges]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DSA Challenges</h1>
          <ThemeToggle />
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex flex-wrap gap-4">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTopic === topic
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges Section */}
          <div className="lg:col-span-2 space-y-8">
            {dailyChallenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Daily Challenges</h2>
                <div className="grid gap-6">
                  {dailyChallenges.map(challenge => (
                    <Link key={challenge.id} to={`/dashboard/challenges/${challenge.id}`}>
                      <ChallengeCard
                        title={challenge.title}
                        topic={challenge.topic}
                        difficulty={challenge.difficulty}
                        description={challenge.description}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {weeklyChallenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Weekly Challenges</h2>
                <div className="grid gap-6">
                  {weeklyChallenges.map(challenge => (
                    <Link key={challenge.id} to={`/dashboard/challenges/${challenge.id}`}>
                      <ChallengeCard
                        title={challenge.title}
                        topic={challenge.topic}
                        difficulty={challenge.difficulty}
                        description={challenge.description}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {regularChallenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">All Challenges</h2>
                <div className="grid gap-6">
                  {regularChallenges.map(challenge => (
                    <Link key={challenge.id} to={`/dashboard/challenges/${challenge.id}`}>
                      <ChallengeCard
                        title={challenge.title}
                        topic={challenge.topic}
                        difficulty={challenge.difficulty}
                        description={challenge.description}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Trending Topics</h2>
              </div>
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                    <span className="text-green-500 font-medium">{topic.count} solved</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Hard Topics */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Hard Topics</h2>
              </div>
              <div className="space-y-4">
                {hardTopics.map((topic) => (
                  <div key={topic.name} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                    <span className="text-red-500 font-medium">{topic.difficulty}/10</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
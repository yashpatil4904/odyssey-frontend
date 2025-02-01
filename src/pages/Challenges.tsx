import { useState, useMemo } from 'react';
import { TrendingUp, Brain, ArrowRight, Timer, Calendar } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">DSA Challenges</h1>
        </div>

        {/* Challenge Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Daily Challenges Card */}
          <Link 
            to="/dashboard/challenges/daily"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Daily Challenges</h2>
              <Timer className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Solve a new coding challenge every day to improve your skills.
            </p>
            <span className="text-green-500 hover:text-green-600 inline-flex items-center">
              View Daily Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>

          {/* Weekly Challenges Card */}
          <Link 
            to="/dashboard/challenges/weekly"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Weekly Challenges</h2>
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Take on more complex challenges updated weekly.
            </p>
            <span className="text-green-500 hover:text-green-600 inline-flex items-center">
              View Weekly Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Topics and Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trending Topics Card */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
            </div>
            <div className="grid gap-3">
              {trendingTopics.map((topic) => (
                <div key={topic.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{topic.name}</span>
                  <span className="text-green-500 font-medium">{topic.count} solved</span>
                </div>
              ))}
            </div>
          </section>

          {/* Hard Topics Card */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Hard Topics</h2>
            </div>
            <div className="grid gap-3">
              {hardTopics.map((topic) => (
                <div key={topic.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{topic.name}</span>
                  <span className="text-red-500 font-medium">{topic.difficulty}/10</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* View All Challenges Button */}
        <div className="flex justify-center">
          <Link
            to="/dashboard/challenges/all"
            className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            View All Challenges
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
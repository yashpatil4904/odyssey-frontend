import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChallengeCard from '../components/ChallengesCard';
import SearchBar from '../components/SearchBar';
import { challenges } from '../data/challanges';

export default function DailyChallenges() {
  const [searchQuery, setSearchQuery] = useState('');

  const dailyChallenges = useMemo(() => {
    return challenges
      .filter(challenge => 
        challenge.type === 'daily' &&
        (challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Link
                to="/dashboard/challenges"
                className="text-green-500 hover:text-green-600 mb-2 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Challenges
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daily Challenges</h1>
            </div>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyChallenges.map(challenge => (
            <Link 
              key={challenge.id} 
              to={`/dashboard/challenges/${challenge.id}`}
              className="transform transition-transform hover:scale-[1.02]"
            >
              <ChallengeCard {...challenge} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
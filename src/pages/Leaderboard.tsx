import React, { useState, useCallback } from 'react';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Star, 
  Zap, 
  Award,
  Crown,
  Target,
  TrendingUp,
  Users,
  Gift,
  Filter,
  Search,
  ArrowUpDown,
  Heart
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface User {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  streak: number;
  badges: Badge[];
  level: number;
  problemsSolved: number;
  contestsWon: number;
}

interface Badge {
  id: number;
  icon: any;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const badges: Badge[] = [
  { 
    id: 1, 
    icon: Flame, 
    name: '7-Day Streak', 
    description: 'Maintained a 7-day learning streak',
    rarity: 'common'
  },
  { 
    id: 2, 
    icon: Trophy, 
    name: 'Contest Winner', 
    description: 'Won a coding contest',
    rarity: 'rare'
  },
  { 
    id: 3, 
    icon: Star, 
    name: 'Problem Solver', 
    description: 'Solved 100 problems',
    rarity: 'epic'
  },
  { 
    id: 4, 
    icon: Crown, 
    name: 'DSA Master', 
    description: 'Completed all DSA courses',
    rarity: 'legendary'
  },
  { 
    id: 5, 
    icon: Heart, 
    name: 'Community Hero', 
    description: 'Gifted XP to 10 different users',
    rarity: 'rare'
  },
  { 
    id: 6, 
    icon: Target, 
    name: 'Sharp Shooter', 
    description: 'Solved 10 hard problems in a row',
    rarity: 'epic'
  },
  { 
    id: 7, 
    icon: TrendingUp, 
    name: 'Rising Star', 
    description: 'Maintained top 10 position for a month',
    rarity: 'legendary'
  },
];

const users: User[] = [
    {
      id: 1,
      name: "Rachit Chheda",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      xp: 15750,
      rank: 1,
      streak: 45,
      badges: badges.slice(0, 4),
      level: 42,
      problemsSolved: 387,
      contestsWon: 5,
    },
    {
      id: 2,
      name: "Ronit Sonawane",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      xp: 14500,
      rank: 2,
      streak: 30,
      badges: badges.slice(2, 6),
      level: 38,
      problemsSolved: 342,
      contestsWon: 4,
    },
    {
      id: 3,
      name: "Yash Patil",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
      xp: 13200,
      rank: 3,
      streak: 25,
      badges: badges.slice(1, 5),
      level: 35,
      problemsSolved: 298,
      contestsWon: 3,
    },
    {
      id: 4,
      name: "Sofia Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      xp: 12600,
      rank: 4,
      streak: 20,
      badges: badges.slice(3, 7),
      level: 32,
      problemsSolved: 275,
      contestsWon: 2,
    },
    {
        id: 5,
        name: "David Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        xp: 11850,
        rank: 5,
        streak: 18,
        badges: badges.slice(2, 6),
        level: 30,
        problemsSolved: 250,
        contestsWon: 2,
      },
      {
        id: 6,
        name: "Ava Martinez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
        xp: 11200,
        rank: 6,
        streak: 15,
        badges: badges.slice(1, 4),
        level: 28,
        problemsSolved: 235,
        contestsWon: 1,
      },
      {
        id: 7,
        name: "Noah Thompson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
        xp: 10500,
        rank: 7,
        streak: 12,
        badges: badges.slice(0, 3),
        level: 26,
        problemsSolved: 210,
        contestsWon: 1,
      },
      {
        id: 8,
        name: "Olivia Scott",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
        xp: 9800,
        rank: 8,
        streak: 10,
        badges: badges.slice(2, 5),
        level: 24,
        problemsSolved: 190,
        contestsWon: 1,
      },
      {
        id: 9,
        name: "William Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
        xp: 9200,
        rank: 9,
        streak: 8,
        badges: badges.slice(1, 5),
        level: 22,
        problemsSolved: 175,
        contestsWon: 0,
      },
      {
        id: 10,
        name: "Mia Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
        xp: 8600,
        rank: 10,
        streak: 6,
        badges: badges.slice(0, 3),
        level: 20,
        problemsSolved: 160,
        contestsWon: 0,
      }
  ];
  

const rarityColors = {
  common: 'text-gray-500',
  rare: 'text-blue-500',
  epic: 'text-purple-500',
  legendary: 'text-yellow-500'
};

interface Filters {
  search: string;
  minLevel: number;
  minStreak: number;
  badges: string[];
  sortBy: 'rank' | 'xp' | 'streak' | 'level';
  sortOrder: 'asc' | 'desc';
}

export default function Leaderboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    minLevel: 0,
    minStreak: 0,
    badges: [],
    sortBy: 'rank',
    sortOrder: 'desc'
  });
  const [giftXP, setGiftXP] = useState({ show: false, amount: 100, userId: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const filteredUsers = users
    .filter(user => {
      const searchMatch = user.name.toLowerCase().includes(filters.search.toLowerCase());
      const levelMatch = user.level >= filters.minLevel;
      const streakMatch = user.streak >= filters.minStreak;
      const badgeMatch = filters.badges.length === 0 || 
        user.badges.some(badge => filters.badges.includes(badge.name));
      
      let timeframeMatch = true;
      if (timeframe === 'weekly') {
        timeframeMatch = user.rank <= 50;
      } else if (timeframe === 'monthly') {
        timeframeMatch = user.rank <= 100;
      }

      return searchMatch && levelMatch && streakMatch && badgeMatch && timeframeMatch;
    })
    .sort((a, b) => {
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      switch (filters.sortBy) {
        case 'xp': return (a.xp - b.xp) * order;
        case 'streak': return (a.streak - b.streak) * order;
        case 'level': return (a.level - b.level) * order;
        default: return (a.rank - b.rank) * order;
      }
    });

  const handleGiftXP = (userId: number) => {
    setShowConfetti(true);
    
    const recipient = users.find(u => u.id === userId);
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold text-lg">🎉 XP Gifted!</span>
        <span>You gifted {giftXP.amount} XP to {recipient?.name}</span>
      </div>,
      {
        duration: 4000,
        className: "bg-green-50"
      }
    );

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    setGiftXP({ show: false, amount: 100, userId: 0 });
  };

  const UserProfile = ({ user }: { user: User }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-green-600">Level {user.level}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedUser(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900">{user.xp}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900">{user.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900">{user.problemsSolved}</div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-gray-900">{user.contestsWon}</div>
            <div className="text-sm text-gray-600">Contests Won</div>
          </div>
        </div>

        {/* Badges */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div 
                key={badge.id} 
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className={`inline-block p-3 rounded-full ${rarityColors[badge.rarity]} bg-opacity-10 mb-2`}>
                  <Icon className={`w-6 h-6 ${rarityColors[badge.rarity]}`} />
                </div>
                <div className="font-semibold text-gray-900">{badge.name}</div>
                <div className="text-xs text-gray-500">{badge.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const GiftXPModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="flex items-center space-x-3 mb-4">
          <Gift className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold">Gift XP</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount of XP
            </label>
            <div className="flex space-x-2">
              {[100, 250, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setGiftXP(prev => ({ ...prev, amount }))}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    giftXP.amount === amount
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setGiftXP({ show: false, amount: 100, userId: 0 })}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => handleGiftXP(giftXP.userId)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                transition-all duration-300 transform hover:scale-105"
            >
              Gift XP
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FiltersPanel = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">Filters</h3>
          <span className="text-sm text-gray-500">
            {filteredUsers.length} users found
          </span>
        </div>
        <button
          onClick={() => setFilters({
            search: '',
            minLevel: 0,
            minStreak: 0,
            badges: [],
            sortBy: 'rank',
            sortOrder: 'desc'
          })}
          className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
        >
          <span>Reset All</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Users
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  search: e.target.value
                }))
              }              
              className="pl-10 w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Level
          </label>
          <input
            type="number"
            min="0"
            value={filters.minLevel}
            onChange={(e) => setFilters({ ...filters, minLevel: parseInt(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Streak
          </label>
          <input
            type="number"
            min="0"
            value={filters.minStreak}
            onChange={(e) => setFilters({ ...filters, minStreak: parseInt(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Badge Filters
        </label>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => {
                const newBadges = filters.badges.includes(badge.name)
                  ? filters.badges.filter(b => b !== badge.name)
                  : [...filters.badges, badge.name];
                setFilters({ ...filters, badges: newBadges });
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
                filters.badges.includes(badge.name)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <badge.icon className="w-4 h-4" />
              <span>{badge.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 relative">
      <Toaster richColors position="top-right" />
      
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0']}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-2">Compete with fellow developers</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {['weekly', 'monthly', 'allTime'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`px-4 py-2 rounded-lg transition ${
                timeframe === t 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && <FiltersPanel />}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          {['rank', 'xp', 'streak', 'level'].map((sort) => (
            <button
              key={sort}
              onClick={() => {
                if (filters.sortBy === sort) {
                  setFilters({
                    ...filters,
                    sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                  });
                } else {
                  setFilters({ ...filters, sortBy: sort as any, sortOrder: 'desc' });
                }
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                filters.sortBy === sort
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
              {filters.sortBy === sort && (
                <ArrowUpDown className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">XP</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Streak</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Badges</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4">
                    {user.rank === 1 && <Crown className="w-6 h-6 text-yellow-500" />}
                    {user.rank === 2 && <Award className="w-6 h-6 text-gray-400" />}
                    {user.rank === 3 && <Award className="w-6 h-6 text-amber-600" />}
                    {user.rank > 3 && <span className="text-gray-900">{user.rank}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-green-600" />
                      <span>{user.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.xp.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{user.streak}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {user.badges.slice(0, 3).map((badge) => {
                        const Icon = badge.icon;
                        return (
                          <div 
                            key={badge.id}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              rarityColors[badge.rarity]
                            } bg-opacity-10 border-2 border-white`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        );
                      })}
                      {user.badges.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white text-xs text-gray-600">
                          +{user.badges.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGiftXP({ show: true, amount: 100, userId: user.id });
                      }}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-700 
                        transition-all duration-300 transform hover:scale-105"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Gift XP</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && <UserProfile user={selectedUser} />}
      {giftXP.show && <GiftXPModal />}
    </div>
  );
} 
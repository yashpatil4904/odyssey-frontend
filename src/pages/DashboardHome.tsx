<<<<<<< HEAD
import React from 'react';
import { BookOpen, Code2, Trophy, Timer } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
=======
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Timer, 
  Flame, 
  Star, 
  Award, 
  Target,
  Github,
  ExternalLink,
  CheckCircle2,
  Medal,
  TrendingUp,
  Zap,
  Coffee,
  Brain
} from 'lucide-react';
import axios from 'axios';
>>>>>>> a1fea3ff3e8d156cb92687405d5a2e9f4dde0f2c

interface PlatformStats {
  [key: string]: any;  // This allows dynamic access to platform stats
  leetcode?: {
    solved: number;
    ranking: number;
    contestRating: number;
    submissions: number;
  };
  codeforces?: {
    rating: number;
    rank: string;
    problemsSolved: number;
    contests: number;
  };
}

interface LeetCodeStats {
  totalSolved: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: {
    [key: string]: number;
  };
}

interface CodeForcesStats {
  result: [{
    handle: string;
    rating: number;
    rank: string;
    maxRating: number;
    maxRank: string;
  }];
}

interface PlatformError {
  platform: string;
  message: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  increase: string;
}

interface Achievement {
  name: string;
  progress: number;
  icon: React.ElementType;
}

const stats: StatItem[] = [
  { 
    label: 'Problems Solved', 
    value: '150', 
    icon: Code2, 
    gradient: 'from-green-400 to-emerald-600',
    increase: '+12 this week'
  },
  { 
    label: 'Learning Hours', 
    value: '45', 
    icon: Timer, 
    gradient: 'from-gray-700 to-gray-900',
    increase: '+5 today'
  },
  { 
    label: 'Current Streak', 
    value: '7 days', 
    icon: Flame, 
    gradient: 'from-green-600 to-emerald-800',
    increase: 'Best: 15 days'
  },
  { 
    label: 'Total XP', 
    value: '2,450', 
    icon: Star, 
    gradient: 'from-gray-800 to-black',
    increase: '+350 today'
  },
];

const achievements: Achievement[] = [
  { name: '7 Day Streak', progress: 70, icon: Flame },
  { name: 'Problem Solver', progress: 45, icon: Code2 },
  { name: 'Quick Learner', progress: 90, icon: Timer },
];

export default function DashboardHome() {
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    leetcode: {
      solved: 125,
      ranking: 45892,
      contestRating: 1654,
      submissions: 342
    },
    codeforces: {
      rating: 1432,
      rank: "Specialist",
      problemsSolved: 89,
      contests: 15
    }
  });

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PlatformError[]>([]);

  const fetchLeetCodeStats = async (username: string): Promise<void> => {
    try {
      const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data: LeetCodeStats = response.data;

      setPlatformStats(prev => ({
        ...prev,
        leetcode: {
          solved: data.totalSolved,
          ranking: data.ranking,
          contestRating: data.contributionPoints,
          submissions: Object.values(data.submissionCalendar || {}).reduce((a, b) => a + b, 0)
        }
      }));

      setErrors(prev => prev.filter(error => error.platform !== 'leetcode'));
    } catch (error) {
      setErrors(prev => [
        ...prev.filter(e => e.platform !== 'leetcode'),
        { platform: 'leetcode', message: 'Failed to fetch LeetCode stats' }
      ]);
    }
  };

  const fetchCodeforcesStats = async (handle: string): Promise<void> => {
    try {
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
      const data: CodeForcesStats = response.data;
      const userInfo = data.result[0];

      setPlatformStats(prev => ({
        ...prev,
        codeforces: {
          rating: userInfo.rating,
          rank: userInfo.rank,
          problemsSolved: 0, // Need separate API call for this
          contests: userInfo.maxRating
        }
      }));

      // Fetch solved problems count
      const submissionsResponse = await axios.get(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
      );
      const solvedProblems = new Set(
        submissionsResponse.data.result
          .filter((sub: any) => sub.verdict === 'OK')
          .map((sub: any) => `${sub.problem.contestId}${sub.problem.index}`)
      );

      setPlatformStats(prev => ({
        ...prev,
        codeforces: {
          ...prev.codeforces!,
          problemsSolved: solvedProblems.size
        }
      }));

      setErrors(prev => prev.filter(error => error.platform !== 'codeforces'));
    } catch (error) {
      setErrors(prev => [
        ...prev.filter(e => e.platform !== 'codeforces'),
        { platform: 'codeforces', message: 'Failed to fetch CodeForces stats' }
      ]);
    }
  };

  const handleConnectPlatform = async (platform: string): Promise<void> => {
    setIsLoading(true);
    try {
      if (platform === 'leetcode') {
        // You would typically get this from user input or settings
        const leetcodeUsername = 'rachitst';
        await fetchLeetCodeStats(leetcodeUsername);
      } else if (platform === 'codeforces') {
        // You would typically get this from user input or settings
        const codeforcesHandle = 'rachitst';
        await fetchCodeforcesStats(codeforcesHandle);
      }
    } catch (error) {
      console.error(`Failed to connect to ${platform}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (platform: string): JSX.Element | null => {
    const error = errors.find(e => e.platform === platform);
    if (error) {
      return (
        <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error.message}
        </div>
      );
    }
    return null;
  };

  const renderConnectButton = (platform: string): JSX.Element => (
    <button
      onClick={() => handleConnectPlatform(platform)}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
        isLoading 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : platformStats[platform] 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      ) : platformStats[platform] ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Connected
        </>
      ) : (
        <>
          <ExternalLink className="w-4 h-4" />
          Connect
        </>
      )}
    </button>
  );

  useEffect(() => {
    // Auto-fetch stats if usernames are available
    const leetcodeUsername = localStorage.getItem('leetcode_username');
    const codeforcesHandle = localStorage.getItem('codeforces_handle');

    if (leetcodeUsername) {
      fetchLeetCodeStats(leetcodeUsername);
    }
    if (codeforcesHandle) {
      fetchCodeforcesStats(codeforcesHandle);
    }
  }, []);

  return (
<<<<<<< HEAD
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-gray-900">Master DSA with </span>
          <TypeAnimation
            sequence={[
              'Confidence',
              1000,
              'Excellence',
              1000,
              'Precision',
              1000,
              'Purpose',
              1000,
              'Passion',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700"
          />
        </h1>
        <p className="text-gray-600 mt-2">Track your progress and keep learning</p>
=======
    <div className="space-y-8 p-8 bg-gray-50/[0.02] min-h-screen">
      {/* Header Section with Grid Pattern */}
      <div className="relative overflow-hidden bg-gray-50/[0.02] rounded-2xl shadow-lg p-8">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-black">Welcome back, Rachit! 👋</h1>
              <p className="text-gray-800">Ready to tackle today's coding challenges?</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="mr-3">
                  <div className="text-sm text-gray-900">Current Level</div>
                  <div className="text-2xl font-bold text-black">Level 15</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to Level 16</span>
              <span>2,450 / 3,000 XP</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-300"
                style={{ width: '82%' }}
              >
                <div className="w-full h-full grid-pattern opacity-30" />
              </div>
            </div>
          </div>
        </div>
>>>>>>> a1fea3ff3e8d156cb92687405d5a2e9f4dde0f2c
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="group relative bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 overflow-hidden border border-black/5"
            >
              <div className="absolute inset-0 grid-pattern opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300" />
              <div className="relative">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                    {stat.increase}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Platform Integration Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LeetCode Stats */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg overflow-hidden">
          <div className="relative backdrop-blur-sm bg-white/[0.98] p-6 h-full">
            <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FFA116] rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">LeetCode</h2>
              </div>
              {renderConnectButton('leetcode')}
            </div>
            
            {platformStats.leetcode && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-orange-500" />
                    <div className="text-sm font-medium text-gray-600">Problems Solved</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.leetcode.solved}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <div className="text-sm font-medium text-gray-600">Global Ranking</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">#{platformStats.leetcode.ranking}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <div className="text-sm font-medium text-gray-600">Contest Rating</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.leetcode.contestRating}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-green-500" />
                    <div className="text-sm font-medium text-gray-600">Submissions</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.leetcode.submissions}</div>
                </div>
              </div>
            )}
            {renderError('leetcode')}
          </div>
        </div>

        {/* CodeForces Stats */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative backdrop-blur-sm bg-white/[0.98] p-6 h-full">
            <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#1E88E5] rounded-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">CodeForces</h2>
              </div>
              {renderConnectButton('codeforces')}
            </div>
            
            {platformStats.codeforces && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-orange-500" />
                    <div className="text-sm font-medium text-gray-600">Rating</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.codeforces.rating}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <div className="text-sm font-medium text-gray-600">Rank</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.codeforces.rank}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <div className="text-sm font-medium text-gray-600">Problems Solved</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.codeforces.problemsSolved}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <div className="text-sm font-medium text-gray-600">Contests</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{platformStats.codeforces.contests}</div>
                </div>
              </div>
            )}
            {renderError('codeforces')}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden border border-black/5">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-500" />
              Current Achievements
            </h2>
            <button className="text-sm px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">{achievement.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-gray-600">{achievement.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 border border-black/5">
        <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Coffee className="w-6 h-6 text-blue-500" />
            Recent Activity
          </h2>
          <button className="text-sm px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Solved "Two Sum" on LeetCode</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Achieved 7-day streak!</p>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Medal className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Completed CodeForces Round #789</p>
              <p className="text-sm text-gray-600">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
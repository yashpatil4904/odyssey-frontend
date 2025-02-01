import React from 'react';
import { BookOpen, Code2, Trophy, Timer } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const stats = [
  { label: 'Problems Solved', value: '150', icon: Code2 },
  { label: 'Learning Hours', value: '45', icon: Timer },
  { label: 'Current Streak', value: '7 days', icon: Trophy },
  { label: 'Completion Rate', value: '85%', icon: BookOpen },
];

export default function DashboardHome() {
  return (
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add activity items here */}
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
} 
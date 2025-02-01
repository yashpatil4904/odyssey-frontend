// import React from 'react';
import { Challenge } from '../types';

export default function ChallengeCard(challenge: Challenge) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      {/* Title and Difficulty */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
          challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {challenge.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        {challenge.description}
      </p>

      {/* Topic */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{challenge.topic}</span>
        <span className="text-sm font-medium text-green-600 hover:text-green-700">
          Solve Challenge →
        </span>
      </div>
    </div>
  );
}
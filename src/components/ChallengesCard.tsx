// import React from 'react';
import { Difficulty } from '../types';

type ChallengeCardProps = {
  title: string;
  topic: string;
  difficulty: Difficulty;
  description: string;
};

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export default function ChallengeCard({ title, topic, difficulty, description }: ChallengeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      <div className="mb-4">
        <span className="inline-block bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100 px-3 py-1 rounded-full text-sm">
          {topic}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
    </div>
  );
}
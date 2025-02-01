import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const rewards = [
  { value: 100, label: '100 XP', color: '#10B981' },
  { value: 200, label: '200 XP', color: '#3B82F6' },
  { value: 500, label: '500 XP', color: '#8B5CF6' },
  { value: 1000, label: '1000 XP', color: '#EC4899' },
  { value: 50, label: '50 XP', color: '#6B7280' },
  { value: 300, label: '300 XP', color: '#F59E0B' },
];

interface Props {
  onClose: () => void;
  isSpinning: boolean;
  spinDegrees: number;
}

export default function LuckSpinModal({ onClose, isSpinning, spinDegrees }: Props) {
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (!isSpinning && spinDegrees > 0) {
      setTimeout(() => {
        setShowReward(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  }, [isSpinning, spinDegrees]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Daily Luck Spin</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative aspect-square max-w-md mx-auto mb-6">
          {/* Spinning Wheel */}
          <div 
            className="w-full h-full rounded-full border-8 border-purple-600 relative transition-transform duration-[3s] ease-out"
            style={{ 
              transform: `rotate(${spinDegrees}deg)`,
              backgroundImage: `conic-gradient(
                ${rewards.map((reward, index) => 
                  `${reward.color} ${index * (360/rewards.length)}deg ${(index + 1) * (360/rewards.length)}deg`
                ).join(', ')}
              )`
            }}
          >
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="absolute w-full h-full flex items-center justify-center text-white font-bold"
                style={{ 
                  transform: `rotate(${index * (360/rewards.length) + (360/rewards.length/2)}deg)`
                }}
              >
                <div className="transform -rotate-[60deg] flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{reward.label}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Center Pin */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
            <div className="w-4 h-8 bg-yellow-400" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
          </div>
        </div>

        <button
          onClick={() => {}}
          disabled={isSpinning}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            isSpinning 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin Now!'}
        </button>
      </div>
    </div>
  );
} 
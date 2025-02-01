import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

// Add type for reward
interface Reward {
  value: number;
  label: string;
  color: string;
}

const rewards: Reward[] = [
  { value: 1000, label: '1000 XP', color: '#EC4899' }, // Pink
  { value: 500, label: '500 XP', color: '#8B5CF6' },   // Purple
  { value: 300, label: '300 XP', color: '#F59E0B' },   // Orange
  { value: 200, label: '200 XP', color: '#3B82F6' },   // Blue
  { value: 100, label: '100 XP', color: '#10B981' },   // Green
  { value: 50, label: '50 XP', color: '#6B7280' },     // Gray
];

// Add props interface
interface LuckSpinModalProps {
  onClose: () => void;
}

const LuckSpinModal = ({ onClose }: LuckSpinModalProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowReward(false);
    
    // Generate random number of full rotations (5-10) plus random ending position
    const fullRotations = Math.floor(Math.random() * 5) + 5;  // 5-10 rotations
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = fullRotations * 360 + extraDegrees;
    
    // Apply the rotation with CSS transition
    setSpinDegrees(prev => prev + totalDegrees);
    
    // Calculate final reward after spin
    setTimeout(() => {
      const normalizedDegrees = extraDegrees;
      const rewardIndex = Math.floor((normalizedDegrees / (360 / rewards.length)));
      setCurrentReward(rewards[rewardIndex]);
      setShowReward(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [rewards[rewardIndex].color, '#FFD700', '#ffffff'],
      });
      
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">Daily Luck Spin</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <div className="relative aspect-square">
              <div 
                className="w-full h-full rounded-full border-8 border-gray-200 relative shadow-lg transition-transform duration-[3000ms] ease-out"
                style={{ 
                  transform: `rotate(${spinDegrees}deg)`,
                  backgroundImage: `conic-gradient(${
                    rewards
                      .map(
                        (reward, index) =>
                          `${reward.color} ${index * (360 / rewards.length)}deg ${(
                            index + 1
                          ) * (360 / rewards.length)}deg`
                      )
                      .join(', ')
                  })`
                }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                <div 
                  className="w-4 h-8 bg-yellow-500 shadow-lg" 
                  style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} 
                />
              </div>
            </div>
          </div>

          <div className="w-48 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Rewards</h3>
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div 
                  key={reward.value} 
                  className="flex items-center space-x-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: reward.color }}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {reward.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showReward && currentReward && (
          <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl mt-6 animate-bounce">
            <h3 className="text-xl font-bold text-gray-800">🎉 Congratulations!</h3>
            <p className="text-gray-600">
              You won <span className="font-bold" style={{ color: currentReward.color }}>
                {currentReward.label}
              </span>!
            </p>
          </div>
        )}

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`w-full py-3 rounded-lg font-semibold mt-6 transition-all duration-300 ${
            isSpinning 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin Now!'}
        </button>
      </div>
    </div>
  );
};

export default LuckSpinModal;
import Spline from '@splinetool/react-spline';
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Sparkles, 
  Zap, 
  Trophy, 
  Rocket,
  Brain,
  Timer,
  RotateCcw,
  Gamepad2
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import confetti from 'canvas-confetti';
import ClutchModeModal from '../components/games/ClutchModeModal';
import LuckSpinModal from '../components/games/LuckSpinModal';
import ReverseGameModal from '../components/games/ReverseGameModal';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: any;
  reward: string;
  status: 'available' | 'locked' | 'cooldown';
  cooldownTime?: number;
  type: 'clutch' | 'spin' | 'reverse';
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([
    {
      id: 'clutch',
      title: 'Clutch Mode',
      description: 'One attempt, double XP. Do you have what it takes? Solve coding challenges with just one shot for maximum rewards.',
      icon: Target,
      reward: '2x XP',
      status: 'available',
      type: 'clutch'
    },
    {
      id: 'spin',
      title: 'Luck Spin',
      description: 'Daily spin for random XP rewards! Try your luck and win big with our daily reward spinner. Come back every day for more chances.',
      icon: Sparkles,
      reward: 'Random XP',
      status: 'available',
      cooldownTime: 24,
      type: 'spin'
    },
    {
      id: 'reverse',
      title: 'Reverse Challenge',
      description: 'Create and challenge others with your own problems. Design unique coding challenges and earn rewards when others solve them.',
      icon: RotateCcw,
      reward: 'Creator XP',
      status: 'available',
      type: 'reverse'
    }
  ]);

  const handleGameClick = (game: Game) => {
    if (game.status !== 'available') return;
    setSelectedGame(game.id);
  };

  return (
    <div className=" relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="relative z-20 p-8">
        <div className="flex items-center space-x-3">
          <Gamepad2 className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-white">Arcade Zone</h1>
        </div>
        <p className="text-gray-300 mt-2">Challenge yourself and earn rewards!</p>
      </div>

      {/* Spline Background - Adjusted z-index and pointer-events */}
      <div className="fixed inset-0 z-10 h-screen w-full pointer-events-none">
        <Spline 
          className="w-full h-full object-cover"
          scene="https://prod.spline.design/cy3KY8DkWO65R2qQ/scene.splinecode"
        />
      </div>

      {/* Game Cards - Increased z-index */}
      <div className="relative z-20 p-8 pt-0 mt-[290px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-0">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 
                hover:transform hover:scale-105 transition-all duration-300 cursor-pointer
                relative overflow-hidden group h-[320px] flex flex-col justify-between"
              onClick={() => handleGameClick(game)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <game.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{game.reward}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300">{game.description}</p>
              </div>
              
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mt-4
                  ${game.status === 'available' 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                disabled={game.status !== 'available'}
              >
                {game.status === 'available' ? 'Play Now' : 
                 `Cooldown: ${game.cooldownTime}h`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Game Modals - Highest z-index */}
      <div className="z-50">
        {selectedGame === 'clutch' && (
          <ClutchModeModal onClose={() => setSelectedGame(null)} />
        )}
        {selectedGame === 'spin' && (
          <LuckSpinModal 
            onClose={() => setSelectedGame(null)} 
          />
        )}
        {selectedGame === 'reverse' && (
          <ReverseGameModal onClose={() => setSelectedGame(null)} />
        )}
      </div>
    </div>
  );
} 
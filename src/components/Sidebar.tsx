import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  Trophy,
  Settings,
  User,
  Users,
  Gamepad2,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Code2, label: 'Simulations', path: '/dashboard/simulations' },
  { icon: Users, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  { icon: Gamepad2, label: 'Arcade', path: '/dashboard/games' },

  { icon: BookOpen, label: 'Learning Path', path: '/dsa-learning' },
  { 
    icon: MessageSquare, 
    label: 'AI Assistant', 
    onClick: () => {
      const chatbotToggler = document.getElementById('chatbot-toggler');
      if (chatbotToggler) {
        chatbotToggler.click();
      }
    }
  }
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      } fixed left-0 top-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && <span className="text-xl font-bold text-green-600">CodeCore</span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path || item.label}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="flex items-center space-x-2 p-3 rounded-lg transition-colors w-full text-gray-600 hover:bg-gray-50 hover:text-green-600"
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Updated Footer */}
        <div className="p-4 border-t border-gray-200">
          <div 
            onClick={handleProfileClick}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group"
          >
            <UserButton />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
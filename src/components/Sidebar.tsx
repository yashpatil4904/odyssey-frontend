import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  Trophy,
  Settings,
  User,
  Brain
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Learning Path', path: '/dashboard/learning' },
  { icon: Code2, label: 'Practice', path: '/dashboard/practice' },
  { icon: Trophy, label: 'Contests', path: '/dashboard/contests' },
  { icon: Brain, label: 'Challenges', path: '/dashboard/challenges' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

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
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <UserButton />
            {!isCollapsed && (
              <div className="flex-1">
                <Link
                  to="/dashboard/settings"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import {
  BookOpen,
  Code2,
  Trophy,
  Users,
  Target,
  Brain,
  Timer,
  MessageSquare,
  Award,
  GitBranch,
  Rocket,
  Building2
} from 'lucide-react';
import { ClerkProvider, SignIn, SignUp, useAuth, UserButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Learn from './pages/Learn';
import DashboardHome from './pages/DashboardHome';
import Challenges from './pages/Challenges';
import ProblemPage from './pages/ProblemPage';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import Leaderboard from './pages/Leaderboard';
import Games from './pages/Games';
import AllChallenges from './pages/AllChallenges';
import DailyChallenges from './pages/DailyChallenges';
import WeeklyChallenges from './pages/WeeklyChallenges';
import { TypeAnimation } from 'react-type-animation';
import logo from './assets/images/CodeCore logo_Black Background.png';

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function NavigationBar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="CodeCore Logo" 
                className="h-10 w-10 object-contain rounded-full"
              />
              <div className="text-xl font-bold">
                <TypeAnimation
                  sequence={[
                    'CodeCore',
                    1000,
                    'Code Better',
                    1000,
                    'Code Smarter',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/dashboard"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Go to Dashboard
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Code2 className="w-96 h-96 text-green-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative">
            Master DSA with
            <span className="text-green-600"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your structured path to Data Structures and Algorithms mastery. From beginner to FAANG-ready professional.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Start Learning
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
              View Roadmap
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h2 className="text-4xl font-bold text-green-600 mb-2">10,000+</h2>
              <p className="text-gray-600">Active Learners</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-green-600 mb-2">500+</h2>
              <p className="text-gray-600">Curated Problems</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-green-600 mb-2">95%</h2>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Excel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={GitBranch}
            title="Structured Roadmap"
            description="Follow a carefully crafted path from basics to advanced algorithms"
          />
          <FeatureCard
            icon={Code2}
            title="Live Coding Environment"
            description="Write and test code in multiple languages with real-time feedback"
          />
          <FeatureCard
            icon={Trophy}
            title="Mock Contests"
            description="Practice with timed challenges and compete with peers"
          />
          <FeatureCard
            icon={Brain}
            title="FAANG Preparation"
            description="Company-specific problem sets and interview preparation"
          />
          <FeatureCard
            icon={Users}
            title="Community Support"
            description="Learn together with peer discussions and expert guidance"
          />
          <FeatureCard
            icon={Award}
            title="Gamified Learning"
            description="Earn badges and climb the leaderboard as you progress"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your DSA Journey?</h2>
          <p className="mb-8 text-green-100">Join thousands of successful developers who mastered DSA with us.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CodeCore</h3>
              <p className="text-gray-600">Your path to algorithmic excellence</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Roadmap</li>
                <li>Problems</li>
                <li>Contests</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Forums</li>
                <li>Discord</li>
                <li>Events</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>© 2024 CodeCore . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <>
      {showNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="learning" element={<Learn />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="challenges/all" element={<AllChallenges />} />
          <Route path="challenges/daily" element={<DailyChallenges />} />
          <Route path="challenges/weekly" element={<WeeklyChallenges />} />
          <Route path="challenges/:id" element={<ProblemPage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="games" element={<Games />} />
          {/* Add other dashboard routes here */}
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
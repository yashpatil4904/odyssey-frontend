import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import logo from '../assets/images/CodeCore logo_Black Background.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logo} 
              alt="CodeCore Logo" 
              className="h-16 w-16 mx-auto object-contain rounded-full"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
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

          <p className="text-xl text-gray-600 mb-8">
            Your structured path to Data Structures and Algorithms mastery. From beginner to FAANG-ready professional.
          </p>

          {/* ... rest of the landing page content ... */}
        </div>
      </div>
    </div>
  );
} 
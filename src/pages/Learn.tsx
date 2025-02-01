// import React from 'react';
import { BookOpen, CheckCircle2, Lock, PlayCircle, Timer } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Arrays and Strings',
    description: 'Master the fundamentals of array manipulation and string algorithms',
    duration: '2.5 hours',
    lessons: 12,
    progress: 100,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Linked Lists',
    description: 'Understanding linked lists and their applications',
    duration: '3 hours',
    lessons: 15,
    progress: 60,
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Trees and Graphs',
    description: 'Explore tree structures and graph algorithms',
    duration: '4 hours',
    lessons: 20,
    progress: 0,
    status: 'locked'
  },
  {
    id: 4,
    title: 'Dynamic Programming',
    description: 'Learn to solve complex problems using dynamic programming',
    duration: '5 hours',
    lessons: 25,
    progress: 0,
    status: 'locked'
  }
];

export default function Learn() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learning Path</h1>
        <p className="text-gray-600 mt-2">Master DSA with our structured curriculum</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Progress</h2>
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-green-600" />
            <span className="text-gray-600">12.5 hours completed</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }} />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>45% Complete</span>
          <span>20 of 72 lessons completed</span>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden ${
              course.status === 'locked' ? 'opacity-75' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                {course.status === 'completed' && (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
                {course.status === 'locked' && (
                  <Lock className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
              {course.status !== 'locked' && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full" 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
              )}
              <button
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition ${
                  course.status === 'locked'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={course.status === 'locked'}
              >
                <PlayCircle className="w-5 h-5" />
                <span>
                  {course.status === 'completed' && 'Review Course'}
                  {course.status === 'in-progress' && 'Continue Learning'}
                  {course.status === 'locked' && 'Coming Soon'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

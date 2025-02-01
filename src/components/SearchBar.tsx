// import React from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search challenges by title, topic, or description..."
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
        text-gray-900 placeholder-gray-500"
      />
    </div>
  );
}
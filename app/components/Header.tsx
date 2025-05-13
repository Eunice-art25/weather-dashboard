import { Form } from '@remix-run/react';
import { useState } from 'react';

interface HeaderProps {
  onDarkModeToggle: () => void;
  isDarkMode: boolean;
  onLocationRequest: () => void;
}

export default function Header({ onDarkModeToggle, isDarkMode, onLocationRequest }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Weather Dashboard
        </h1>
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Form 
          method="get" 
          className="flex-1"
          onSubmit={(e) => {
            if (!searchQuery.trim()) {
              e.preventDefault();
            }
          }}
        >
          <div className="relative">
            <input
              type="search"
              name="city"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              🔍
            </button>
          </div>
        </Form>
        
        <button
          onClick={onLocationRequest}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>📍</span>
          <span>Use My Location</span>
        </button>
      </div>
    </header>
  );
} 
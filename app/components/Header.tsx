import { Form } from '@remix-run/react';
import { useState } from 'react';

interface HeaderProps {
  onDarkModeToggle: () => void;
  isDarkMode: boolean;
  onLocationRequest: (city: string) => void;
}

export default function Header({ onDarkModeToggle, isDarkMode, onLocationRequest }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationClick = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For now, just use London as the default city
          onLocationRequest('london');
        },
        (error) => {
          console.error('Error getting location:', error);
          onLocationRequest('london');
        }
      );
    }
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLocationClick}
          className="px-4 py-2 bg-weather-primary text-white rounded-lg hover:bg-weather-secondary transition-colors"
        >
          Use My Location
        </button>
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
} 
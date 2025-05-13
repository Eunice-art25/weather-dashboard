import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

interface FavoriteLocation {
  city: string;
  label?: string;
}

interface FavoriteLocationsProps {
  currentCity: string;
  onSelectLocation: (city: string) => void;
}

const STORAGE_KEY = 'favorite_locations';

export default function FavoriteLocations({ currentCity, onSelectLocation }: FavoriteLocationsProps) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteLocation[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addToFavorites = () => {
    if (!favorites.some(f => f.city.toLowerCase() === currentCity.toLowerCase())) {
      const newFavorites = [...favorites, { city: currentCity, label: newLabel }];
      saveFavorites(newFavorites);
      setNewLabel('');
      setIsEditing(false);
    }
  };

  const removeFromFavorites = (city: string) => {
    const newFavorites = favorites.filter(f => f.city.toLowerCase() !== city.toLowerCase());
    saveFavorites(newFavorites);
  };

  const updateLabel = (city: string, newLabel: string) => {
    const newFavorites = favorites.map(f =>
      f.city.toLowerCase() === city.toLowerCase() ? { ...f, label: newLabel } : f
    );
    saveFavorites(newFavorites);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Favorite Locations
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="space-y-2">
        {favorites.map((favorite) => (
          <div
            key={favorite.city}
            className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={favorite.label || favorite.city}
                  onChange={(e) => updateLabel(favorite.city, e.target.value)}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => removeFromFavorites(favorite.city)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </>
            ) : (
              <Link
                to={`?city=${encodeURIComponent(favorite.city)}`}
                className="flex-1 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => onSelectLocation(favorite.city)}
              >
                {favorite.label || favorite.city}
              </Link>
            )}
          </div>
        ))}
      </div>

      {!favorites.some(f => f.city.toLowerCase() === currentCity.toLowerCase()) && (
        <div className="mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>★</span>
            <span>Add Current Location</span>
          </button>
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Location label (optional)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            />
            <button
              onClick={addToFavorites}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
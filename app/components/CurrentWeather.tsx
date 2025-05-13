import type { WeatherData } from '~/types/weather';

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading?: boolean;
}

export default function CurrentWeather({ weather, isLoading = false }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {weather.city}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="text-5xl">
          {weather.condition === 'Clear' && '☀️'}
          {weather.condition === 'Clouds' && '☁️'}
          {weather.condition === 'Rain' && '🌧️'}
          {weather.condition === 'Snow' && '❄️'}
          {weather.condition === 'Thunderstorm' && '⛈️'}
          {!['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'].includes(weather.condition) && '🌤️'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-6xl font-bold text-gray-900 dark:text-white">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-gray-600 dark:text-gray-300 capitalize">
            {weather.condition}
          </div>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-300 mr-2">💧</span>
            <span className="text-gray-900 dark:text-white">
              {weather.humidity}% Humidity
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-300 mr-2">💨</span>
            <span className="text-gray-900 dark:text-white">
              {weather.windSpeed} km/h Wind
            </span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        Feels like {Math.round(weather.feelsLike)}°C • 
        Min {Math.round(weather.tempMin)}°C • 
        Max {Math.round(weather.tempMax)}°C
      </div>
    </div>
  );
} 
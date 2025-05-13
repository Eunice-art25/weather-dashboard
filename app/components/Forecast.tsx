import type { ForecastData } from '~/types/weather';

interface ForecastProps {
  forecast: ForecastData[];
  isLoading?: boolean;
}

export default function Forecast({ forecast, isLoading = false }: ForecastProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div className="text-3xl mb-2">
            {day.condition === 'Clear' && '☀️'}
            {day.condition === 'Clouds' && '☁️'}
            {day.condition === 'Rain' && '🌧️'}
            {day.condition === 'Snow' && '❄️'}
            {day.condition === 'Thunderstorm' && '⛈️'}
            {!['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'].includes(day.condition) && '🌤️'}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round(day.temperature)}°C
            </span>
            <div className="flex flex-col text-xs text-gray-600 dark:text-gray-400">
              <span>H: {Math.round(day.tempMax)}°</span>
              <span>L: {Math.round(day.tempMin)}°</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <span>💧</span>
            <span>{day.humidity}%</span>
          </div>
        </div>
      ))}
    </div>
  );
} 
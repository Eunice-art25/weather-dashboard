import type { WeatherData } from '~/types/weather';

interface HourlyForecastProps {
  hourlyData: WeatherData[];
  isLoading?: boolean;
}

export default function HourlyForecast({ hourlyData, isLoading = false }: HourlyForecastProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl p-4"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4 min-w-full">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-24 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
          >
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {new Date(hour.timestamp).toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true,
              })}
            </div>
            <div className="text-3xl mb-2">
              {hour.condition === 'Clear' && '☀️'}
              {hour.condition === 'Clouds' && '☁️'}
              {hour.condition === 'Rain' && '🌧️'}
              {hour.condition === 'Snow' && '❄️'}
              {hour.condition === 'Thunderstorm' && '⛈️'}
              {!['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'].includes(hour.condition) && '🌤️'}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {Math.round(hour.temperature)}°C
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <span>💧</span>
              <span>{hour.humidity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
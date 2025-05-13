import type { WeatherData } from '~/types/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
  isLoading?: boolean;
}

export default function WeatherDetails({ weather, isLoading = false }: WeatherDetailsProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const details = [
    {
      label: 'Feels Like',
      value: `${Math.round(weather.feelsLike)}°C`,
      icon: '🌡️'
    },
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: '💧'
    },
    {
      label: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      icon: '💨'
    },
    {
      label: 'Condition',
      value: weather.description,
      icon: '🌤️'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((detail, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{detail.icon}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {detail.label}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {detail.value}
          </div>
        </div>
      ))}
    </div>
  );
} 
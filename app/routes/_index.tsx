import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useState, useEffect } from 'react';
import Header from '~/components/Header';
import CurrentWeather from '~/components/CurrentWeather';
import WeatherDetails from '~/components/WeatherDetails';
import Forecast from '~/components/Forecast';
import HourlyForecast from '~/components/HourlyForecast';
import WeatherAlerts from '~/components/WeatherAlerts';
import FavoriteLocations from '~/components/FavoriteLocations';
import type { WeatherResponse } from '~/types/weather';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const apiUrl = new URL('/api/weather', url.origin);
  apiUrl.searchParams.set('city', url.searchParams.get('city') || 'london');
  apiUrl.searchParams.set('units', url.searchParams.get('units') || 'metric');
  
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response('Error fetching weather data', { status: response.status });
  }
  return json(await response.json());
};

export default function Index() {
  const { weatherData, city, units } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleUnitToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setSearchParams(prev => {
      prev.set('units', newUnits);
      return prev;
    });
  };

  const handleSelectLocation = (city: string) => {
    setIsLoading(true);
    setSearchParams(prev => {
      prev.set('city', city);
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleUnitToggle}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium"
          >
            {units === 'metric' ? '°C' : '°F'}
          </button>
        </div>

        <Header
          onDarkModeToggle={handleDarkModeToggle}
          isDarkMode={isDarkMode}
          onLocationRequest={handleSelectLocation}
        />
        
        <main className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <CurrentWeather
                weather={weatherData.current}
                isLoading={isLoading}
              />
              
              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Weather Alerts
                  </h2>
                  <WeatherAlerts
                    alerts={weatherData.alerts}
                    isLoading={isLoading}
                  />
                </section>
              )}
              
              <WeatherDetails
                weather={weatherData.current}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-1">
              <FavoriteLocations
                currentCity={city}
                onSelectLocation={handleSelectLocation}
              />
            </div>
          </div>

          {weatherData.hourly && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Hourly Forecast
              </h2>
              <HourlyForecast
                hourlyData={weatherData.hourly}
                isLoading={isLoading}
              />
            </section>
          )}
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              5-Day Forecast
            </h2>
            <Forecast
              forecast={weatherData.forecast}
              isLoading={isLoading}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

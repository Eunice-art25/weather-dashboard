import type { WeatherResponse } from '~/types/weather';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

interface CachedData {
  data: WeatherResponse;
  timestamp: number;
}

export function getCachedWeather(city: string): WeatherResponse | null {
  if (typeof window === 'undefined') return null; // Skip on server-side

  try {
    const cached = localStorage.getItem(`weather_${city.toLowerCase()}`);
    if (!cached) return null;

    const { data, timestamp }: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(`weather_${city.toLowerCase()}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

export function cacheWeather(city: string, data: WeatherResponse): void {
  if (typeof window === 'undefined') return; // Skip on server-side

  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(
      `weather_${city.toLowerCase()}`,
      JSON.stringify(cacheData)
    );
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

export function clearWeatherCache(city?: string): void {
  if (typeof window === 'undefined') return; // Skip on server-side

  try {
    if (city) {
      localStorage.removeItem(`weather_${city.toLowerCase()}`);
    } else {
      // Clear all weather cache entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('weather_')) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
} 
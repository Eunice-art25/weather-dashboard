import type { WeatherResponse } from '~/types/weather';
import { getMockWeatherData } from '~/data/mockWeather';

// This is a server-side only file that should not be imported directly in components
export async function getWeatherData(
  city: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherResponse> {
  try {
    // For now, return mock data
    // In production, this would make an API call to OpenWeatherMap
    const data = await getMockWeatherData(city, units);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
} 
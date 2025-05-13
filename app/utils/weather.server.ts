import type { WeatherResponse } from '~/types/weather';
import { getMockWeatherData } from '~/data/mockWeather';

export async function getWeatherData(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherResponse> {
  return getMockWeatherData(city, units);
} 
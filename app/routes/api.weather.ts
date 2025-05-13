import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { getWeatherData } from '~/utils/weather.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const city = url.searchParams.get('city')?.toLowerCase() || 'london';
  const units = url.searchParams.get('units') as 'metric' | 'imperial' || 'metric';
  
  try {
    const weatherData = await getWeatherData(city, units);
    return json({ weatherData, city, units });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Response('Error fetching weather data', { status: 500 });
  }
}; 
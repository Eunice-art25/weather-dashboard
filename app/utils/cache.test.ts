import { describe, it, expect, beforeEach } from 'vitest';
import { getCachedWeather, cacheWeather, clearWeatherCache } from './cache';
import type { WeatherResponse } from '~/types/weather';

describe('Cache Utils', () => {
  const mockWeatherData: WeatherResponse = {
    current: {
      city: 'London',
      temperature: 20,
      feelsLike: 18,
      tempMin: 15,
      tempMax: 25,
      humidity: 65,
      windSpeed: 10,
      condition: 'Clear',
      description: 'Clear sky',
      icon: '01d',
      timestamp: Date.now()
    },
    forecast: []
  };

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should cache and retrieve weather data', () => {
    cacheWeather('London', mockWeatherData);
    const cached = getCachedWeather('London');
    expect(cached).toEqual(mockWeatherData);
  });

  it('should return null for non-existent cache', () => {
    const cached = getCachedWeather('NonExistent');
    expect(cached).toBeNull();
  });

  it('should clear specific city cache', () => {
    cacheWeather('London', mockWeatherData);
    cacheWeather('Paris', mockWeatherData);
    
    clearWeatherCache('London');
    
    expect(getCachedWeather('London')).toBeNull();
    expect(getCachedWeather('Paris')).not.toBeNull();
  });

  it('should clear all weather cache', () => {
    cacheWeather('London', mockWeatherData);
    cacheWeather('Paris', mockWeatherData);
    
    clearWeatherCache();
    
    expect(getCachedWeather('London')).toBeNull();
    expect(getCachedWeather('Paris')).toBeNull();
  });

  it('should handle expired cache', async () => {
    cacheWeather('London', mockWeatherData);
    
    // Mock Date.now to return a future timestamp
    const realDateNow = Date.now;
    Date.now = vi.fn(() => realDateNow() + (11 * 60 * 1000)); // 11 minutes later
    
    const cached = getCachedWeather('London');
    expect(cached).toBeNull();
    
    // Restore Date.now
    Date.now = realDateNow;
  });
}); 
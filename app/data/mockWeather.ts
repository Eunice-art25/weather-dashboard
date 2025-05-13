import type { WeatherResponse, WeatherAlert } from '~/types/weather';

const cities = ['London', 'New York', 'Tokyo', 'Sydney', 'Dubai'];

const mockAlerts: WeatherAlert[] = [
  {
    type: 'Heat Advisory',
    severity: 'moderate',
    description: 'High temperatures expected between 12:00 PM and 6:00 PM. Stay hydrated and avoid prolonged exposure to sun.',
    start: Date.now(),
    end: Date.now() + (6 * 60 * 60 * 1000), // 6 hours from now
  },
  {
    type: 'Strong Wind Warning',
    severity: 'minor',
    description: 'Strong winds expected with gusts up to 40 mph.',
    start: Date.now() + (2 * 60 * 60 * 1000), // 2 hours from now
    end: Date.now() + (8 * 60 * 60 * 1000), // 8 hours from now
  },
];

export function getMockWeatherData(city: string = 'London', units: 'metric' | 'imperial' = 'metric'): WeatherResponse {
  const currentTemp = 15 + Math.random() * 20;
  const currentTime = Date.now();
  
  // Generate hourly data for the next 24 hours
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const temp = currentTemp + (Math.random() * 10 - 5);
    return {
      city,
      temperature: temp,
      feelsLike: temp - 2,
      tempMin: temp - 3,
      tempMax: temp + 3,
      humidity: Math.round(60 + Math.random() * 20),
      windSpeed: Math.round(5 + Math.random() * 15),
      condition: ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'][Math.floor(Math.random() * 5)],
      description: 'Partly cloudy with a chance of rain',
      icon: '10d',
      timestamp: currentTime + (i * 60 * 60 * 1000), // Add hours
    };
  });

  return {
    current: {
      city,
      temperature: currentTemp,
      feelsLike: currentTemp - 2,
      tempMin: currentTemp - 5,
      tempMax: currentTemp + 5,
      humidity: Math.round(60 + Math.random() * 20),
      windSpeed: Math.round(5 + Math.random() * 15),
      condition: ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'][Math.floor(Math.random() * 5)],
      description: 'Partly cloudy with a chance of rain',
      icon: '10d',
      timestamp: currentTime
    },
    forecast: Array.from({ length: 5 }, (_, i) => {
      const temp = currentTemp + (Math.random() * 10 - 5);
      return {
        city,
        temperature: temp,
        feelsLike: temp - 2,
        tempMin: temp - 3,
        tempMax: temp + 3,
        humidity: Math.round(60 + Math.random() * 20),
        windSpeed: Math.round(5 + Math.random() * 15),
        condition: ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'][Math.floor(Math.random() * 5)],
        description: 'Partly cloudy with a chance of rain',
        icon: '10d',
        timestamp: currentTime + ((i + 1) * 24 * 60 * 60 * 1000),
        date: new Date(currentTime + ((i + 1) * 24 * 60 * 60 * 1000)).toISOString()
      };
    }),
    hourly,
    alerts: Math.random() > 0.7 ? mockAlerts : [], // 30% chance of having alerts
    units
  };
}

export function getAllCitiesWeather(): Record<string, WeatherResponse> {
  return cities.reduce((acc, city) => {
    acc[city.toLowerCase()] = getMockWeatherData(city);
    return acc;
  }, {} as Record<string, WeatherResponse>);
} 